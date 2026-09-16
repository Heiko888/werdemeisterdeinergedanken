"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@/components/ui/Icon";
import type { KategorieRow, MethodeRow } from "@/lib/coaching-methoden";
import { setAktiv } from "./actions";

type Props = {
  kategorien: KategorieRow[];
  methoden: MethodeRow[];
};

/** Alles durchsuchbare Text einer Methode – klein geschrieben. */
function suchtext(m: MethodeRow): string {
  return [
    m.name,
    m.herkunft,
    m.kern,
    m.wann_einsetzen,
    m.hinweise,
    m.dauer,
    m.setting,
    m.eigene_notizen,
    ...m.ablauf,
    ...m.beispielfragen,
    ...m.tags,
  ]
    .join(" ")
    .toLowerCase();
}

export function MethodenBrowser({ kategorien, methoden }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [fehler, setFehler] = useState<string | null>(null);

  const [kategorie, setKategorie] = useState<string>("alle");
  const [query, setQuery] = useState("");
  const [zeigeInaktive, setZeigeInaktive] = useState(false);
  const [offen, setOffen] = useState<Set<string>>(new Set());

  const katName = useMemo(() => {
    const map = new Map<string, string>();
    kategorien.forEach((k) => map.set(k.id, k.name));
    return map;
  }, [kategorien]);

  // Vorberechneter Suchindex, damit das Tippen flüssig bleibt.
  const index = useMemo(() => {
    const map = new Map<string, string>();
    methoden.forEach((m) => map.set(m.id, suchtext(m)));
    return map;
  }, [methoden]);

  // Anzahl je Kategorie (respektiert „Inaktive anzeigen").
  const zaehlung = useMemo(() => {
    const map = new Map<string, number>();
    methoden.forEach((m) => {
      if (!zeigeInaktive && !m.aktiv) return;
      map.set(m.kategorie_id, (map.get(m.kategorie_id) ?? 0) + 1);
    });
    return map;
  }, [methoden, zeigeInaktive]);

  const gesamt = useMemo(
    () => methoden.filter((m) => zeigeInaktive || m.aktiv).length,
    [methoden, zeigeInaktive],
  );

  const gefiltert = useMemo(() => {
    const q = query.trim().toLowerCase();
    const worte = q.split(/\s+/).filter(Boolean);
    return methoden.filter((m) => {
      if (!zeigeInaktive && !m.aktiv) return false;
      if (kategorie !== "alle" && m.kategorie_id !== kategorie) return false;
      if (worte.length === 0) return true;
      const t = index.get(m.id) ?? "";
      return worte.every((w) => t.includes(w));
    });
  }, [methoden, kategorie, query, zeigeInaktive, index]);

  const toggle = (id: string) =>
    setOffen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const alleOeffnen = () => setOffen(new Set(gefiltert.map((m) => m.id)));
  const alleSchliessen = () => setOffen(new Set());
  const zuruecksetzen = () => {
    setKategorie("alle");
    setQuery("");
    setZeigeInaktive(false);
    setOffen(new Set());
  };

  const umschalten = (m: MethodeRow) => {
    setFehler(null);
    startTransition(async () => {
      const res = await setAktiv(m.id, !m.aktiv);
      if (!res.ok) setFehler(res.error);
      else router.refresh();
    });
  };

  const chip =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors";

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      {/* Kategorie-Rail (Desktop) / Chips (Mobil) */}
      <aside className="lg:w-64 lg:shrink-0">
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          <button
            type="button"
            onClick={() => setKategorie("alle")}
            className={`${chip} lg:justify-between ${
              kategorie === "alle"
                ? "border-ink bg-ink text-white"
                : "border-ink/10 bg-white text-ink-mid hover:border-ink/25"
            }`}
          >
            <span>Alle</span>
            <span className="text-xs opacity-70 tabular-nums">{gesamt}</span>
          </button>
          {kategorien.map((k) => {
            const anzahl = zaehlung.get(k.id) ?? 0;
            const aktiv = kategorie === k.id;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setKategorie(k.id)}
                className={`${chip} lg:w-full lg:justify-between lg:text-left ${
                  aktiv
                    ? "border-ink bg-ink text-white"
                    : "border-ink/10 bg-white text-ink-mid hover:border-ink/25"
                }`}
                title={k.beschreibung}
              >
                <span className="truncate">{k.name}</span>
                <span className="text-xs opacity-70 tabular-nums">{anzahl}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Hauptspalte */}
      <div className="min-w-0 flex-1">
        {/* Suche + Werkzeuge */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Methoden durchsuchen … (Name, Ablauf, Fragen, Tags, Notizen)"
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold-600"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={alleOeffnen}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-[13px] text-ink-mid transition-colors hover:border-ink/30 hover:text-ink"
            >
              Alle öffnen
            </button>
            <button
              type="button"
              onClick={alleSchliessen}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-[13px] text-ink-mid transition-colors hover:border-ink/30 hover:text-ink"
            >
              Alle schließen
            </button>
            <button
              type="button"
              onClick={zuruecksetzen}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-[13px] text-ink-mid transition-colors hover:border-ink/30 hover:text-ink"
            >
              Filter zurücksetzen
            </button>
            <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-[13px] text-ink-mid">
              <input
                type="checkbox"
                checked={zeigeInaktive}
                onChange={(e) => setZeigeInaktive(e.target.checked)}
              />
              Inaktive anzeigen
            </label>
          </div>
          <p className="text-xs text-ink-muted">
            {gefiltert.length}{" "}
            {gefiltert.length === 1 ? "Methode" : "Methoden"}
            {kategorie !== "alle" && ` · ${katName.get(kategorie) ?? ""}`}
            {query.trim() && ` · Suche „${query.trim()}“`}
          </p>
        </div>

        {fehler && (
          <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            {fehler}
          </div>
        )}

        {/* Karten */}
        <div className="mt-6 flex flex-col gap-3">
          {gefiltert.length === 0 ? (
            <p className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 text-sm text-ink-mid">
              Keine Methode gefunden. Passe die Suche oder den Kategorie-Filter an –
              oder lege über „Neue Methode“ oben einen Eintrag an.
            </p>
          ) : (
            gefiltert.map((m) => (
              <MethodenKarte
                key={m.id}
                methode={m}
                kategorieName={katName.get(m.kategorie_id) ?? m.kategorie_id}
                offen={offen.has(m.id)}
                pending={pending}
                onToggle={() => toggle(m.id)}
                onTag={(tag) => {
                  setQuery(tag);
                  setKategorie("alle");
                }}
                onAktivToggle={() => umschalten(m)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function MethodenKarte({
  methode: m,
  kategorieName,
  offen,
  pending,
  onToggle,
  onTag,
  onAktivToggle,
}: {
  methode: MethodeRow;
  kategorieName: string;
  offen: boolean;
  pending: boolean;
  onToggle: () => void;
  onTag: (tag: string) => void;
  onAktivToggle: () => void;
}) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-card transition-colors ${
        m.aktiv ? "border-ink/10" : "border-ink/10 opacity-60"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={offen}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-ink/[0.02]"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-ink-mid">
              {kategorieName}
            </span>
            {m.herkunft && (
              <span className="text-xs text-ink-muted">{m.herkunft}</span>
            )}
            {!m.aktiv && (
              <span className="rounded-full bg-ink/8 px-2 py-0.5 text-xs font-medium text-ink-muted">
                inaktiv
              </span>
            )}
          </div>
          <h3 className="mt-1.5 font-display text-lg font-medium text-ink">{m.name}</h3>
          {m.kern && <p className="mt-1 text-sm leading-relaxed text-ink-mid">{m.kern}</p>}
        </div>
        <ArrowRight
          className={`mt-1 shrink-0 text-ink-mid transition-transform ${
            offen ? "rotate-90" : ""
          }`}
        />
      </button>

      {offen && (
        <div className="border-t border-ink/10 px-5 pb-5 pt-4">
          {m.wann_einsetzen && (
            <Abschnitt titel="Wann einsetzen">
              <p className="text-sm leading-relaxed text-ink-soft">{m.wann_einsetzen}</p>
            </Abschnitt>
          )}

          {m.ablauf.length > 0 && (
            <Abschnitt titel="Ablauf">
              <ol className="flex flex-col gap-1.5">
                {m.ablauf.map((schritt, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-300/40 text-[11px] font-semibold text-ink tabular-nums">
                      {i + 1}
                    </span>
                    <span>{schritt}</span>
                  </li>
                ))}
              </ol>
            </Abschnitt>
          )}

          {m.beispielfragen.length > 0 && (
            <Abschnitt titel="Beispielfragen">
              <ul className="flex flex-col gap-2">
                {m.beispielfragen.map((frage, i) => (
                  <li
                    key={i}
                    className="border-l-2 border-gold-400 pl-3 text-sm italic leading-relaxed text-ink-soft"
                  >
                    „{frage}“
                  </li>
                ))}
              </ul>
            </Abschnitt>
          )}

          {(m.dauer || m.setting || m.herkunft) && (
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {m.dauer && <Fakt k="Dauer" v={m.dauer} />}
              {m.setting && <Fakt k="Setting" v={m.setting} />}
              {m.herkunft && <Fakt k="Herkunft" v={m.herkunft} />}
            </div>
          )}

          {m.hinweise && (
            <div className="mt-4 rounded-xl border border-gold-400/50 bg-gold-300/15 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-mid">
                Hinweise &amp; Grenzen
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{m.hinweise}</p>
            </div>
          )}

          {m.eigene_notizen && (
            <div className="mt-4 rounded-xl border border-ink/10 bg-ink/[0.02] p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Eigene Notizen
              </div>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">
                {m.eigene_notizen}
              </p>
            </div>
          )}

          {m.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {m.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTag(tag)}
                  className="rounded-full border border-ink/10 bg-white px-2.5 py-1 text-xs text-ink-mid transition-colors hover:border-gold-500 hover:text-ink"
                  title={`Nach „${tag}“ suchen`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-4">
            <Link
              href={`/admin/methoden/${m.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Bearbeiten
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              disabled={pending}
              onClick={onAktivToggle}
              className="rounded-full border border-ink/15 px-4 py-1.5 text-[13px] text-ink-mid transition-colors hover:border-ink/30 hover:text-ink disabled:opacity-50"
            >
              {m.aktiv ? "Deaktivieren" : "Aktivieren"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function Abschnitt({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 first:mt-0">
      <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {titel}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Fakt({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-ink/[0.02] p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
        {k}
      </div>
      <div className="mt-0.5 text-sm text-ink-soft">{v}</div>
    </div>
  );
}
