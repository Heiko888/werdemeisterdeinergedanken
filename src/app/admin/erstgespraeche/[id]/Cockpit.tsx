"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Close } from "@/components/ui/Icon";
import {
  ANGEBOTE,
  EINWAENDE,
  EINWAND_GRUNDMUSTER,
  EMPFEHLUNG_OPTIONEN,
  ERGEBNIS_OPTIONEN,
  GRUNDREGELN,
  PHASEN,
  STUFEN,
  baueFollowup,
  stufeLabel,
  type Empfehlung,
  type Ergebnis,
  type Phase,
} from "@/lib/erstgespraech/phasen";
import type {
  FragebogenRow,
  GespraechRow,
  ZitatRow,
} from "@/lib/erstgespraech/types";
import {
  abgehaktSpeichern,
  abschlussSpeichern,
  gespraechBeenden,
  notizenSpeichern,
  stufeSpeichern,
  uhrStarten,
  zitatLoeschen,
  zitatSichern,
} from "../actions";

type Props = {
  gespraech: GespraechRow;
  fragebogen: FragebogenRow | null;
  zitateInitial: ZitatRow[];
};

const NOTIZ_DEBOUNCE = 800;

// ---------------------------------------------------------------------------
// Platzhalter in den Phasentexten aus dem Fragebogen füllen
// ---------------------------------------------------------------------------

/**
 * Welche `{Platzhalter}` sich direkt aus dem Fragebogen befüllen lassen.
 * Alles andere (z. B. `{Zeitraum}`, `{Situation}`) wird im Gespräch mündlich
 * ergänzt und als dezente Lücke angezeigt – nie als roher `{…}`-Code.
 */
const VORLAGEN_FELDER: Record<string, keyof FragebogenRow> = {
  "Zitat aus dem Fragebogen": "anlass",
  "Schon versucht": "versucht",
  Versuche: "versucht",
  Selbsteinschätzung: "stufe",
};

/** Baut die Ersetzungen für die Phasentexte aus dem Fragebogen. */
function baueVorlagenWerte(
  fragebogen: FragebogenRow | null,
): Record<string, string> {
  const werte: Record<string, string> = {};
  if (!fragebogen) return werte;
  for (const [platzhalter, feld] of Object.entries(VORLAGEN_FELDER)) {
    const roh = fragebogen[feld];
    if (roh == null) continue;
    const wert = String(roh).trim();
    if (wert) werte[platzhalter] = wert;
  }
  return werte;
}

/**
 * Rendert einen Text mit `{Platzhalter}`. Bekannte Platzhalter werden mit dem
 * Fragebogen-Inhalt gefüllt und hervorgehoben; unbekannte erscheinen als
 * dezente Lücke zum mündlichen Ergänzen.
 */
function Vorlage({
  text,
  werte,
}: {
  text: string;
  werte: Record<string, string>;
}) {
  const teile = text.split(/(\{[^}]+\})/g);
  return (
    <>
      {teile.map((teil, i) => {
        const treffer = /^\{([^}]+)\}$/.exec(teil);
        if (!treffer) return teil;
        const name = treffer[1].trim();
        const wert = werte[name];
        if (wert) {
          return (
            <mark
              key={i}
              className="rounded bg-accent/12 px-1 font-medium text-ink"
            >
              {wert}
            </mark>
          );
        }
        return (
          <span
            key={i}
            className="rounded bg-ink/[0.06] px-1 italic text-ink-muted"
          >
            {name}
          </span>
        );
      })}
    </>
  );
}

function mmss(total: number): string {
  const s = Math.max(0, Math.floor(total));
  const m = Math.floor(s / 60);
  const rest = s % 60;
  return `${String(m).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

/** Welche Phase man laut Plan (nach verstrichenen Minuten) sein sollte. */
function planPhasenIndex(elapsedSek: number): number {
  const min = elapsedSek / 60;
  for (let i = PHASEN.length - 1; i >= 0; i--) {
    if (min >= PHASEN[i].vonMin) return i;
  }
  return 0;
}

/**
 * Startzustand der Uhr beim Laden – aus localStorage (übersteht Reload) oder,
 * falls nicht vorhanden, aus `gestartet_am`. Läuft nur clientseitig; auf dem
 * Server (kein window) gibt es den ruhenden Grundzustand.
 */
function leseUhrStart(g: GespraechRow): { elapsed: number; laeuft: boolean } {
  if (g.beendet_am) return { elapsed: g.dauer_sekunden ?? 0, laeuft: false };
  if (typeof window === "undefined") return { elapsed: 0, laeuft: true };
  try {
    const raw = localStorage.getItem(`erstgespraech:uhr:${g.id}`);
    if (raw) {
      const s = JSON.parse(raw) as {
        elapsed?: number;
        running?: boolean;
        ts?: number;
      };
      let elapsed = s.elapsed ?? 0;
      const laeuft = s.running ?? true;
      if (laeuft && s.ts) elapsed += Math.floor((Date.now() - s.ts) / 1000);
      return { elapsed: Math.max(0, elapsed), laeuft };
    }
    if (g.gestartet_am) {
      return {
        elapsed: Math.max(
          0,
          Math.floor((Date.now() - Date.parse(g.gestartet_am)) / 1000),
        ),
        laeuft: true,
      };
    }
  } catch {
    // localStorage nicht verfügbar – ruhiger Grundzustand.
  }
  return { elapsed: 0, laeuft: true };
}

export function Cockpit({ gespraech, fragebogen, zitateInitial }: Props) {
  const id = gespraech.id;

  // Platzhalter der Phasentexte aus dem Fragebogen füllen (z. B. das Zitat).
  const vorlagenWerte = useMemo(
    () => baueVorlagenWerte(fragebogen),
    [fragebogen],
  );

  // --- Notizen (Auto-Speichern + localStorage-Entwurf) ---------------------
  const [notizen, setNotizen] = useState<Record<string, string>>(
    () => gespraech.notizen ?? {},
  );
  const [abgehakt, setAbgehakt] = useState<Record<string, string[]>>(
    () => gespraech.abgehakt ?? {},
  );
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const dirtyRef = useRef(false);
  const notizKey = `erstgespraech:notizen:${id}`;

  // Entwurf aus localStorage: nach dem Mount abgleichen, neuere Fassung nehmen
  // und einmalig in die Datenbank nachziehen (Verbindungsabbruch im Gespräch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(notizKey);
      if (!raw) return;
      const draft = JSON.parse(raw) as {
        notizen?: Record<string, string>;
        savedAt?: number;
      };
      const dbTime = Date.parse(gespraech.updated_at) || 0;
      if (draft.savedAt && draft.savedAt > dbTime && draft.notizen) {
        const neuer = draft.notizen;
        // Bewusster einmaliger Abgleich beim Mount – der neuere Entwurf gewinnt.
        /* eslint-disable react-hooks/set-state-in-effect */
        setNotizen(neuer);
        /* eslint-enable react-hooks/set-state-in-effect */
        void notizenSpeichern(id, neuer);
      }
    } catch {
      // localStorage nicht verfügbar – kein Problem, DB-Stand gilt.
    }
    // Nur einmal beim Laden.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Eine Notiz ändern: „dirty“ + „speichert“ setzen, State aktualisieren.
  // Das eigentliche Sichern übernimmt der Effekt unten (immer der frische Stand).
  const setNotiz = useCallback((key: string, wert: string) => {
    dirtyRef.current = true;
    setSaveState("saving");
    setNotizen((prev) => ({ ...prev, [key]: wert }));
  }, []);

  // Auto-Speichern: localStorage sofort, Datenbank nach ~800 ms Tipppause.
  // Läuft nur nach echten Änderungen (dirtyRef), nicht beim ersten Laden.
  useEffect(() => {
    if (!dirtyRef.current) return;
    try {
      localStorage.setItem(
        notizKey,
        JSON.stringify({ notizen, savedAt: Date.now() }),
      );
    } catch {
      // ignorieren
    }
    const t = setTimeout(async () => {
      const res = await notizenSpeichern(id, notizen);
      if (res.ok) {
        dirtyRef.current = false;
        setSaveState("saved");
        window.setTimeout(() => setSaveState("idle"), 2000);
      } else {
        setSaveState("idle");
      }
    }, NOTIZ_DEBOUNCE);
    return () => clearTimeout(t);
  }, [notizen, id, notizKey]);

  // Warnung beim Verlassen mit ungespeicherter Änderung.
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // --- Abhaken -------------------------------------------------------------
  const toggleFrage = useCallback(
    (phaseKey: string, frageId: string) => {
      setAbgehakt((prev) => {
        const aktuell = prev[phaseKey] ?? [];
        const drin = aktuell.includes(frageId);
        const next = {
          ...prev,
          [phaseKey]: drin
            ? aktuell.filter((x) => x !== frageId)
            : [...aktuell, frageId],
        };
        void abgehaktSpeichern(id, next);
        return next;
      });
    },
    [id],
  );

  // --- Offene Phase + Tastatur + Scroll ------------------------------------
  const [offen, setOffen] = useState<string>(PHASEN[0].key);
  const phaseRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const wechsle = useCallback((richtung: 1 | -1) => {
    setOffen((cur) => {
      const i = PHASEN.findIndex((p) => p.key === cur);
      const next = Math.min(PHASEN.length - 1, Math.max(0, i + richtung));
      return PHASEN[next].key;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        wechsle(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        wechsle(-1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [wechsle]);

  useEffect(() => {
    const el = phaseRefs.current[offen];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [offen]);

  // --- Zitate --------------------------------------------------------------
  const [zitate, setZitate] = useState<ZitatRow[]>(zitateInitial);
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  const zitatAusMarkierung = useCallback(
    async (phaseKey: string) => {
      const ta = textareaRefs.current[phaseKey];
      if (!ta) return;
      const sel = ta.value.slice(ta.selectionStart, ta.selectionEnd).trim();
      if (!sel) {
        window.alert("Bitte zuerst im Notizfeld einen Text markieren.");
        return;
      }
      const res = await zitatSichern(id, sel, phaseKey);
      if (res.ok) setZitate((z) => [res.data, ...z]);
    },
    [id],
  );

  const zitatAusText = useCallback(
    async (text: string, phase: string | null) => {
      const res = await zitatSichern(id, text, phase);
      if (res.ok) setZitate((z) => [res.data, ...z]);
    },
    [id],
  );

  const loescheZitat = useCallback(async (zid: string) => {
    const res = await zitatLoeschen(zid);
    if (res.ok) setZitate((z) => z.filter((x) => x.id !== zid));
  }, []);

  // --- Gesprächsuhr --------------------------------------------------------
  const [elapsed, setElapsed] = useState(0);
  const [laeuft, setLaeuft] = useState(false);
  const [beendet, setBeendet] = useState<boolean>(!!gespraech.beendet_am);
  const [mounted, setMounted] = useState(false);
  const uhrKey = `erstgespraech:uhr:${id}`;

  // Startzustand einmalig beim Mount setzen. Die Quelle (localStorage + aktuelle
  // Uhrzeit) steht auf dem Server nicht zur Verfügung, ein Lazy-Init im useState
  // würde einen Hydration-Mismatch erzeugen – deshalb bewusst hier per Effekt.
  useEffect(() => {
    const r = leseUhrStart(gespraech);
    /* eslint-disable react-hooks/set-state-in-effect */
    setElapsed(r.elapsed);
    setLaeuft(r.laeuft);
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    // Startzeit in der DB festhalten (nur beim ersten Mal).
    if (!gespraech.beendet_am && !gespraech.gestartet_am) void uhrStarten(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ticken.
  useEffect(() => {
    if (!laeuft || beendet) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [laeuft, beendet]);

  // Uhrzustand lokal sichern (übersteht einen Reload).
  useEffect(() => {
    if (!mounted || beendet) return;
    try {
      localStorage.setItem(
        uhrKey,
        JSON.stringify({ elapsed, running: laeuft, ts: Date.now() }),
      );
    } catch {
      // ignorieren
    }
  }, [elapsed, laeuft, mounted, beendet, uhrKey]);

  const planIndex = planPhasenIndex(elapsed);
  const offenIndex = PHASEN.findIndex((p) => p.key === offen);
  const hinterPlan = !beendet && offenIndex < planIndex;

  const beende = useCallback(async () => {
    setLaeuft(false);
    setBeendet(true);
    try {
      localStorage.removeItem(uhrKey);
    } catch {
      // ignorieren
    }
    await gespraechBeenden(id, elapsed);
    // Zum Abschluss scrollen.
    setTimeout(() => {
      document
        .getElementById("abschluss")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [id, elapsed, uhrKey]);

  return (
    <div className="pb-24">
      {/* Kopfzeile: Gesprächsuhr */}
      <div className="sticky top-0 z-20 border-b border-ink/10 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 sm:px-8">
          <div className="flex items-baseline gap-3">
            <span
              className={`font-mono text-3xl font-semibold tabular-nums ${
                hinterPlan ? "text-gold-700" : "text-ink"
              }`}
            >
              {mounted ? mmss(elapsed) : "00:00"}
            </span>
            {beendet && (
              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-ink-mid">
                beendet
              </span>
            )}
          </div>

          <div className="text-sm">
            <span className="text-ink-muted">Laut Plan: </span>
            <span className={hinterPlan ? "font-medium text-gold-700" : "text-ink"}>
              Phase {PHASEN[planIndex].nummer} · {PHASEN[planIndex].name}
            </span>
            {hinterPlan && (
              <span className="ml-2 text-xs text-gold-700">
                (du bist noch bei Phase {PHASEN[offenIndex].nummer})
              </span>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {!beendet && (
              <button
                type="button"
                onClick={() => setLaeuft((l) => !l)}
                className="rounded-full border border-ink/15 px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                {laeuft ? "Pause" : "Weiter"}
              </button>
            )}
            {!beendet && (
              <button
                type="button"
                onClick={beende}
                className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Gespräch beenden
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grundregeln */}
      <div className="mx-auto w-full max-w-7xl px-5 pt-4 sm:px-8">
        <p className="text-xs text-ink-muted">
          {GRUNDREGELN.join("  ·  ")}
        </p>
      </div>

      {/* Dreispaltiges Layout */}
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,20rem)]">
        {/* Mitte zuerst auf schmalen Bildschirmen */}
        <div className="order-2 lg:order-1">
          <FragebogenSpalte
            fragebogen={fragebogen}
            onZitat={(text) => zitatAusText(text, "Fragebogen")}
          />
        </div>

        <div className="order-1 lg:order-2">
          <PhasenSpalte
            offen={offen}
            setOffen={setOffen}
            notizen={notizen}
            setNotiz={setNotiz}
            abgehakt={abgehakt}
            toggleFrage={toggleFrage}
            saveState={saveState}
            phaseRefs={phaseRefs}
            textareaRefs={textareaRefs}
            onZitatMarkierung={zitatAusMarkierung}
            vorlagenWerte={vorlagenWerte}
          />
        </div>

        <div className="order-3">
          <Schnellzugriffe
            zitate={zitate}
            onLoeschen={loescheZitat}
            vorlagenWerte={vorlagenWerte}
          />
        </div>
      </div>

      {/* Abschluss */}
      <div id="abschluss" className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <Abschluss
          gespraech={gespraech}
          notizen={notizen}
          sichtbar={beendet}
          onStufeSelbst={(w) => void stufeSpeichern(id, "stufe_selbst", w)}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Links: Fragebogen
// ---------------------------------------------------------------------------

const FB_FELDER: { key: keyof FragebogenRow; label: string }[] = [
  { key: "anlass", label: "Anlass – warum jetzt?" },
  { key: "muster", label: "Muster / Thema" },
  { key: "versucht", label: "Schon versucht" },
  { key: "veraenderung", label: "Gewünschte Veränderung" },
  { key: "sonstiges", label: "Sonstiges" },
];

function FragebogenSpalte({
  fragebogen,
  onZitat,
}: {
  fragebogen: FragebogenRow | null;
  onZitat: (text: string) => void;
}) {
  return (
    <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
        Fragebogen
      </h2>
      {!fragebogen ? (
        <p className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4 text-sm text-ink-mid">
          Dieser Interessent hat keinen Fragebogen ausgefüllt.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-4">
            <p className="text-sm font-medium text-ink">{fragebogen.name}</p>
            <p className="text-xs text-ink-mid">{fragebogen.email}</p>
            <p className="mt-1 text-xs text-ink-muted">
              Selbst: {stufeLabel(fragebogen.stufe)}
            </p>
          </div>
          {FB_FELDER.map(({ key, label }) => {
            const wert = fragebogen[key];
            if (!wert || typeof wert !== "string") return null;
            return (
              <div
                key={key}
                className="group rounded-xl border border-ink/10 bg-ink/[0.02] p-4"
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                    {label}
                  </span>
                  <button
                    type="button"
                    onClick={() => onZitat(wert)}
                    className="shrink-0 text-xs text-accent opacity-0 transition-opacity hover:underline group-hover:opacity-100"
                  >
                    als Zitat merken
                  </button>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                  {wert}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Mitte: die sechs Phasen
// ---------------------------------------------------------------------------

function PhasenSpalte({
  offen,
  setOffen,
  notizen,
  setNotiz,
  abgehakt,
  toggleFrage,
  saveState,
  phaseRefs,
  textareaRefs,
  onZitatMarkierung,
  vorlagenWerte,
}: {
  offen: string;
  setOffen: (k: string) => void;
  notizen: Record<string, string>;
  setNotiz: (k: string, v: string) => void;
  abgehakt: Record<string, string[]>;
  toggleFrage: (phaseKey: string, frageId: string) => void;
  saveState: "idle" | "saving" | "saved";
  phaseRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  textareaRefs: MutableRefObject<
    Record<string, HTMLTextAreaElement | null>
  >;
  onZitatMarkierung: (phaseKey: string) => void;
  vorlagenWerte: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-3">
      {PHASEN.map((phase) => (
        <PhaseCard
          key={phase.key}
          phase={phase}
          offen={offen === phase.key}
          onToggle={() => setOffen(offen === phase.key ? "" : phase.key)}
          notiz={notizen[phase.key] ?? ""}
          setNotiz={(v) => setNotiz(phase.key, v)}
          abgehakt={abgehakt[phase.key] ?? []}
          toggleFrage={(fid) => toggleFrage(phase.key, fid)}
          saveState={saveState}
          setRef={(el) => {
            phaseRefs.current[phase.key] = el;
          }}
          setTextareaRef={(el) => {
            textareaRefs.current[phase.key] = el;
          }}
          onZitatMarkierung={() => onZitatMarkierung(phase.key)}
          vorlagenWerte={vorlagenWerte}
        />
      ))}
    </div>
  );
}

function PhaseCard({
  phase,
  offen,
  onToggle,
  notiz,
  setNotiz,
  abgehakt,
  toggleFrage,
  saveState,
  setRef,
  setTextareaRef,
  onZitatMarkierung,
  vorlagenWerte,
}: {
  phase: Phase;
  offen: boolean;
  onToggle: () => void;
  notiz: string;
  setNotiz: (v: string) => void;
  abgehakt: string[];
  toggleFrage: (frageId: string) => void;
  saveState: "idle" | "saving" | "saved";
  setRef: (el: HTMLDivElement | null) => void;
  setTextareaRef: (el: HTMLTextAreaElement | null) => void;
  onZitatMarkierung: () => void;
  vorlagenWerte: Record<string, string>;
}) {
  return (
    <section
      ref={setRef}
      className={`scroll-mt-24 rounded-2xl border transition-colors ${
        offen ? "border-accent/40 bg-ink/[0.02]" : "border-ink/10 bg-ink/[0.01]"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-sm font-semibold text-ink">
          {phase.nummer}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-ink">{phase.name}</span>
          <span className="block text-xs text-ink-muted">
            {phase.zeitfenster} · {phase.ziel}
          </span>
        </span>
        <span className="text-xs text-ink-muted">{offen ? "▲" : "▼"}</span>
      </button>

      {offen && (
        <div className="flex flex-col gap-4 px-5 pb-5">
          {/* Wortlaut */}
          {phase.wortlaut.length > 0 && (
            <div className="rounded-xl border-l-2 border-accent/50 bg-paper/60 py-2 pl-4 pr-2">
              {phase.wortlaut.map((satz, i) => (
                <p
                  key={i}
                  className="font-display mb-2 text-[1.02rem] leading-relaxed text-ink last:mb-0"
                >
                  <Vorlage text={satz} werte={vorlagenWerte} />
                </p>
              ))}
            </div>
          )}

          {phase.einstieg && (
            <p className="font-display text-[1.02rem] leading-relaxed text-ink">
              <Vorlage text={phase.einstieg} werte={vorlagenWerte} />
            </p>
          )}

          {/* Fragen zum Abhaken */}
          {phase.fragen.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {phase.fragen.map((f) => {
                const drin = abgehakt.includes(f.id);
                return (
                  <li key={f.id}>
                    <button
                      type="button"
                      onClick={() => toggleFrage(f.id)}
                      className="flex w-full items-start gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-ink/[0.03]"
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                          drin
                            ? "border-accent bg-accent text-white"
                            : "border-ink/25"
                        }`}
                      >
                        {drin ? "✓" : ""}
                      </span>
                      <span
                        className={`text-sm leading-snug ${
                          drin ? "text-ink-muted line-through" : "text-ink-soft"
                        }`}
                      >
                        <Vorlage text={f.text} werte={vorlagenWerte} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Hinweise */}
          {phase.hinweise.map((h, i) => (
            <div
              key={i}
              className="rounded-xl bg-ink/[0.03] px-4 py-3 text-sm text-ink-mid"
            >
              <span className="font-semibold text-ink">{h.titel}: </span>
              {h.text}
            </div>
          ))}

          {/* Notizfeld */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                Notiz
              </label>
              <span className="text-xs text-ink-muted">
                {saveState === "saving" && "speichert …"}
                {saveState === "saved" && (
                  <span className="text-accent">gespeichert</span>
                )}
              </span>
            </div>
            <textarea
              ref={setTextareaRef}
              value={notiz}
              onChange={(e) => setNotiz(e.target.value)}
              rows={4}
              placeholder="Die exakten Worte mitschreiben – nicht die eigene Übersetzung."
              className="w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm leading-relaxed text-ink outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={onZitatMarkierung}
              className="mt-1.5 text-xs text-accent hover:underline"
            >
              Markiertes als Zitat sichern
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Rechts: Zitate, Einwände, Angebote
// ---------------------------------------------------------------------------

function Schnellzugriffe({
  zitate,
  onLoeschen,
  vorlagenWerte,
}: {
  zitate: ZitatRow[];
  onLoeschen: (id: string) => void;
  vorlagenWerte: Record<string, string>;
}) {
  const [offenerEinwand, setOffenerEinwand] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-20">
      {/* Zitate */}
      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Zitate ({zitate.length})
        </h2>
        {zitate.length === 0 ? (
          <p className="text-xs text-ink-muted">
            Markiere Antworten oder Notizen und sichere sie als Zitat – deine
            „Sprache der Zielgruppe“.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {zitate.map((z) => (
              <li
                key={z.id}
                className="group rounded-xl border border-ink/10 bg-ink/[0.02] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm leading-snug text-ink-soft">
                    „{z.zitat}“
                  </p>
                  <button
                    type="button"
                    onClick={() => onLoeschen(z.id)}
                    aria-label="Zitat löschen"
                    className="shrink-0 text-ink-muted opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100"
                  >
                    <Close className="h-4 w-4" />
                  </button>
                </div>
                {z.phase && (
                  <span className="mt-1 inline-block rounded-full bg-ink/5 px-2 py-0.5 text-[10px] text-ink-muted">
                    {z.phase}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Einwände */}
      <div>
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Einwände
        </h2>
        <p className="mb-2 text-[11px] leading-snug text-ink-muted">
          {EINWAND_GRUNDMUSTER}
        </p>
        <ul className="flex flex-col gap-1.5">
          {EINWAENDE.map((e) => {
            const auf = offenerEinwand === e.id;
            return (
              <li key={e.id} className="rounded-xl border border-ink/10 bg-ink/[0.02]">
                <button
                  type="button"
                  onClick={() => setOffenerEinwand(auf ? null : e.id)}
                  className="w-full px-3 py-2 text-left text-sm font-medium text-ink"
                >
                  {e.titel}
                </button>
                {auf && (
                  <div className="px-3 pb-3">
                    {e.antwort.map((a, i) => (
                      <p
                        key={i}
                        className="mb-2 text-sm leading-relaxed text-ink-mid last:mb-0"
                      >
                        <Vorlage text={a} werte={vorlagenWerte} />
                      </p>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Angebote */}
      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Angebote
        </h2>
        <ul className="flex flex-col gap-2">
          {ANGEBOTE.map((a) => (
            <li
              key={a.id}
              className="rounded-xl border border-ink/10 bg-ink/[0.02] p-3"
            >
              <p className="text-sm font-medium text-ink">{a.name}</p>
              <p className="text-xs text-accent">{a.preis}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Abschluss
// ---------------------------------------------------------------------------

function heutePlus(tage: number): string {
  const d = new Date();
  d.setDate(d.getDate() + tage);
  return d.toISOString().slice(0, 10);
}

function Abschluss({
  gespraech,
  notizen,
  sichtbar,
  onStufeSelbst,
}: {
  gespraech: GespraechRow;
  notizen: Record<string, string>;
  sichtbar: boolean;
  onStufeSelbst: (w: number | null) => void;
}) {
  const id = gespraech.id;
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(
    gespraech.ergebnis && gespraech.ergebnis !== "offen"
      ? gespraech.ergebnis
      : null,
  );
  const [empfehlung, setEmpfehlung] = useState<Empfehlung | null>(
    gespraech.empfehlung,
  );
  const [einwand, setEinwand] = useState(gespraech.einwand ?? "");
  const [stufeEing, setStufeEing] = useState<number | null>(
    gespraech.stufe_eingeschaetzt,
  );
  const [wertvollstes, setWertvollstes] = useState(
    gespraech.wertvollstes ?? "",
  );
  const [naechster, setNaechster] = useState(gespraech.naechster_schritt ?? "");
  const [naechsterAm, setNaechsterAm] = useState(
    gespraech.naechster_schritt_am ?? "",
  );
  const [freitext, setFreitext] = useState(gespraech.freitext ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [fehler, setFehler] = useState<string | null>(null);

  // Ergebnis wählen – bei „Bedenkzeit“ das Datum mit heute + 8 Tagen vorbelegen.
  const waehleErgebnis = (wert: Ergebnis) => {
    setErgebnis(wert);
    if (wert === "bedenkzeit" && !naechsterAm) setNaechsterAm(heutePlus(8));
  };

  const followup = useMemo(
    () =>
      baueFollowup({
        interessentName: gespraech.interessent_name,
        notizP2: notizen.p2 ?? "",
        notizP3: notizen.p3 ?? "",
        stufeEingeschaetzt: stufeEing,
        empfehlung,
        ergebnis,
        naechsterSchrittAm: naechsterAm || null,
      }),
    [
      gespraech.interessent_name,
      notizen.p2,
      notizen.p3,
      stufeEing,
      empfehlung,
      ergebnis,
      naechsterAm,
    ],
  );

  const [kopiert, setKopiert] = useState(false);
  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(followup);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch {
      // Fallback: Textbereich markieren lassen.
    }
  };

  const speichern = async () => {
    setStatus("saving");
    setFehler(null);
    const res = await abschlussSpeichern(id, {
      ergebnis,
      empfehlung,
      einwand,
      stufe_eingeschaetzt: stufeEing,
      wertvollstes,
      naechster_schritt: naechster,
      naechster_schritt_am: naechsterAm,
      freitext,
    });
    if (res.ok) {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("error");
      setFehler(res.error);
    }
  };

  if (!sichtbar) return null;

  return (
    <div className="mt-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
      <h2 className="text-lg font-medium text-ink">Abschluss</h2>
      <p className="mt-1 text-sm text-ink-mid">
        Halte das Ergebnis fest – daraus entsteht der Follow-up-Text.
      </p>

      {/* Ergebnis */}
      <fieldset className="mt-5">
        <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
          Ergebnis
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ERGEBNIS_OPTIONEN.map((o) => (
            <button
              key={o.wert}
              type="button"
              onClick={() => waehleErgebnis(o.wert)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                ergebnis === o.wert
                  ? "border-accent bg-accent/10 text-ink"
                  : "border-ink/15 text-ink-mid hover:border-ink/30"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Empfehlung */}
      <fieldset className="mt-5">
        <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
          Empfehlung
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {EMPFEHLUNG_OPTIONEN.map((o) => (
            <button
              key={o.wert}
              type="button"
              onClick={() => setEmpfehlung(o.wert)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                empfehlung === o.wert
                  ? "border-accent bg-accent/10 text-ink"
                  : "border-ink/15 text-ink-mid hover:border-ink/30"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Einwand + Stufe */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-muted">
            Welcher Einwand kam?
          </label>
          <input
            list="einwand-vorschlaege"
            value={einwand}
            onChange={(e) => setEinwand(e.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            placeholder="frei oder aus der Liste"
          />
          <datalist id="einwand-vorschlaege">
            {EINWAENDE.map((e) => (
              <option key={e.id} value={e.titel} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-muted">
            Stufe von außen
          </label>
          <select
            value={stufeEing ?? ""}
            onChange={(e) =>
              setStufeEing(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          >
            <option value="">—</option>
            {STUFEN.map((s) => (
              <option key={s.nr} value={s.nr}>
                {s.nr} · {s.name} – {s.halbsatz}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Wertvollstes */}
      <div className="mt-5">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-muted">
          „Was war für dich das Wertvollste?“
        </label>
        <textarea
          value={wertvollstes}
          onChange={(e) => setWertvollstes(e.target.value)}
          rows={2}
          className="w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
      </div>

      {/* Nächster Schritt */}
      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_12rem]">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-muted">
            Nächster Schritt
          </label>
          <input
            value={naechster}
            onChange={(e) => setNaechster(e.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-muted">
            Datum
          </label>
          <input
            type="date"
            value={naechsterAm}
            onChange={(e) => setNaechsterAm(e.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Freitext */}
      <div className="mt-5">
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-muted">
          Freitext
        </label>
        <textarea
          value={freitext}
          onChange={(e) => setFreitext(e.target.value)}
          rows={2}
          className="w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
      </div>

      {/* Speichern */}
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={speichern}
          disabled={status === "saving"}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "saving" ? "Speichert …" : "Ergebnis speichern"}
        </button>
        {status === "saved" && (
          <span className="text-sm text-accent">gespeichert</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-600">{fehler}</span>
        )}
      </div>

      {/* Follow-up-Text */}
      <div className="mt-8">
        <div className="mb-1 flex items-center justify-between">
          <label className="text-xs font-medium uppercase tracking-wide text-ink-muted">
            Follow-up-Text
          </label>
          <button
            type="button"
            onClick={kopieren}
            className="text-xs font-medium text-accent hover:underline"
          >
            {kopiert ? "kopiert ✓" : "kopieren"}
          </button>
        </div>
        <textarea
          readOnly
          value={followup}
          rows={16}
          onFocus={(e) => e.currentTarget.select()}
          className="w-full resize-y rounded-xl border border-ink/15 bg-paper px-3 py-2 font-mono text-xs leading-relaxed text-ink-soft outline-none"
        />
        <p className="mt-1 text-[11px] text-ink-muted">
          Baut sich aus Namen, Notiz Phase 2 &amp; 3, Stufe und Empfehlung
          zusammen. Vor dem Verschicken kurz gegenlesen.
        </p>
      </div>

      {/* Selbst-Stufe nachtragen (falls ohne Fragebogen) */}
      {gespraech.stufe_selbst == null && (
        <div className="mt-6 border-t border-ink/10 pt-4">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink-muted">
            Selbsteinschätzung des Interessenten (falls genannt)
          </label>
          <select
            defaultValue=""
            onChange={(e) =>
              onStufeSelbst(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-accent sm:w-72"
          >
            <option value="">—</option>
            {STUFEN.map((s) => (
              <option key={s.nr} value={s.nr}>
                {s.nr} · {s.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
