"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { getNotes, saveNote } from "@/app/mitglieder/actions";

type SaveState = "idle" | "saving" | "saved" | "error";
type LoadState = "loading" | "ready" | "error";

/** Wie lange „Gespeichert ✓" sichtbar bleibt, bevor es leise verschwindet. */
const SAVED_VISIBLE_MS = 3000;
/** Autosave-Verzögerung nach dem letzten Tastendruck. */
const AUTOSAVE_DELAY_MS = 800;

/**
 * Beschreibbarer Reflexions-Block ("Zum Innehalten") mit Autosave.
 * Die umgebende Seite bleibt statisch; Laden/Speichern der persönlichen
 * Notizen läuft über Server-Actions.
 *
 * Fehlerzustände:
 * - Laden fehlgeschlagen → Felder bleiben gesperrt (sonst würde Tippen in
 *   leere Felder die gespeicherten Antworten überschreiben), Hinweis + Neu laden.
 * - Speichern fehlgeschlagen → sichtbare Meldung mit „Erneut versuchen".
 */
export function JournalReflection({
  itemType,
  itemKey,
  questions,
}: {
  itemType: "stage" | "deep_dive" | "practice";
  itemKey: string;
  questions: string[];
}) {
  const baseId = useId();
  const [values, setValues] = useState<string[]>(() => questions.map(() => ""));
  const [states, setStates] = useState<SaveState[]>(() =>
    questions.map(() => "idle" as SaveState),
  );
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const ready = loadState === "ready";

  const timers = useRef<Array<ReturnType<typeof setTimeout> | null>>(
    questions.map(() => null),
  );
  const savedTimers = useRef<Array<ReturnType<typeof setTimeout> | null>>(
    questions.map(() => null),
  );
  // Laufende Nummer je Feld: nur das Ergebnis des jüngsten Speicherversuchs
  // darf den Status setzen (ältere, spät zurückkommende Antworten nicht).
  const saveSeq = useRef<number[]>(questions.map(() => 0));

  useEffect(() => {
    let active = true;
    getNotes(itemType, itemKey)
      .then((map) => {
        if (!active) return;
        setValues(questions.map((_, i) => map[`reflection-${i}`] ?? ""));
        setLoadState("ready");
      })
      .catch((err: unknown) => {
        if (!active) return;
        console.error(err);
        setLoadState("error");
      });
    return () => {
      active = false;
    };
    // questions ist pro Seite konstant – bewusst nur an den Inhalt gekoppelt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemType, itemKey, loadAttempt]);

  // Ausstehende Timer beim Unmount aufräumen.
  useEffect(() => {
    const t = timers.current;
    const s = savedTimers.current;
    return () => {
      t.forEach((timer) => timer && clearTimeout(timer));
      s.forEach((timer) => timer && clearTimeout(timer));
    };
  }, []);

  function setStateAt(index: number, state: SaveState) {
    setStates((prev) => {
      const next = [...prev];
      next[index] = state;
      return next;
    });
  }

  async function save(index: number, value: string) {
    const seq = ++saveSeq.current[index];
    const savedTimer = savedTimers.current[index];
    if (savedTimer) clearTimeout(savedTimer);
    setStateAt(index, "saving");

    let ok = false;
    try {
      const res = await saveNote(itemType, itemKey, `reflection-${index}`, value);
      ok = res.ok;
    } catch (err) {
      console.error(err);
      ok = false;
    }
    if (seq !== saveSeq.current[index]) return;

    setStateAt(index, ok ? "saved" : "error");
    if (ok) {
      savedTimers.current[index] = setTimeout(() => {
        if (seq !== saveSeq.current[index]) return;
        setStateAt(index, "idle");
      }, SAVED_VISIBLE_MS);
    }
  }

  function handleChange(index: number, value: string) {
    if (!ready) return;
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setStateAt(index, "saving");

    const timer = timers.current[index];
    if (timer) clearTimeout(timer);
    timers.current[index] = setTimeout(() => {
      timers.current[index] = null;
      void save(index, value);
    }, AUTOSAVE_DELAY_MS);
  }

  function retrySave(index: number) {
    const timer = timers.current[index];
    if (timer) clearTimeout(timer);
    timers.current[index] = null;
    void save(index, values[index]);
  }

  function reload() {
    setLoadState("loading");
    setLoadAttempt((n) => n + 1);
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-xl font-medium text-ink">
          Zum Innehalten
        </h2>
        <p className="text-sm text-ink-muted">
          Schreib deine Gedanken direkt hierher – sie werden automatisch in
          deinem Bereich gespeichert und sind nur für dich sichtbar.
        </p>
      </div>

      {loadState === "error" && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-danger/25 bg-danger/[0.05] px-4 py-3 text-sm text-danger sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            Deine Antworten konnten gerade nicht geladen werden. Damit nichts
            überschrieben wird, sind die Felder so lange gesperrt.
          </p>
          <button
            type="button"
            onClick={reload}
            className="shrink-0 self-start rounded-lg border border-danger/30 px-3 py-1.5 font-medium text-danger transition-colors hover:bg-danger/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger sm:self-auto"
          >
            Neu laden
          </button>
        </div>
      )}

      <ul className="flex flex-col gap-6">
        {questions.map((question, i) => {
          const fieldId = `${baseId}-reflection-${i}`;
          const statusId = `${fieldId}-status`;
          return (
            <li key={question} className="flex flex-col gap-2">
              <label
                htmlFor={fieldId}
                className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-ink-mid"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-xs text-accent"
                >
                  <Check />
                </span>
                {question}
              </label>
              <textarea
                id={fieldId}
                value={values[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder={
                  loadState === "ready"
                    ? "Deine Gedanken dazu …"
                    : loadState === "loading"
                      ? "Lädt …"
                      : ""
                }
                readOnly={!ready}
                disabled={loadState === "error"}
                aria-busy={loadState === "loading"}
                aria-describedby={statusId}
                rows={5}
                className="ml-8 w-[calc(100%-2rem)] resize-y rounded-xl border border-ink/12 bg-paper/40 px-4 py-3 text-base leading-relaxed text-ink placeholder:text-ink-muted focus:border-accent/50 focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
              />
              {states[i] === "error" ? (
                <div
                  id={statusId}
                  role="alert"
                  className="ml-8 flex flex-wrap items-center gap-x-3 gap-y-1 self-start text-xs text-danger"
                >
                  <span>Nicht gespeichert – erneut versuchen</span>
                  <button
                    type="button"
                    onClick={() => retrySave(i)}
                    className="rounded-md border border-danger/30 px-2 py-1 font-medium text-danger transition-colors hover:bg-danger/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
                  >
                    Erneut speichern
                  </button>
                </div>
              ) : (
                <span
                  id={statusId}
                  aria-live="polite"
                  className={cn(
                    "ml-8 h-4 self-start text-xs transition-colors",
                    states[i] === "saved" ? "text-accent" : "text-ink-muted",
                  )}
                >
                  {states[i] === "saving"
                    ? "Speichert …"
                    : states[i] === "saved"
                      ? "Gespeichert ✓"
                      : ""}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
