"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { getNotes, saveNote } from "@/app/mitglieder/actions";

type SaveState = "idle" | "saving" | "saved";

/**
 * Beschreibbarer Reflexions-Block ("Zum Innehalten") mit Autosave.
 * Die umgebende Seite bleibt statisch; Laden/Speichern der persönlichen
 * Notizen läuft über Server-Actions.
 */
export function JournalReflection({
  itemType,
  itemKey,
  questions,
}: {
  itemType: "stage" | "deep_dive";
  itemKey: string;
  questions: string[];
}) {
  const [values, setValues] = useState<string[]>(() => questions.map(() => ""));
  const [states, setStates] = useState<SaveState[]>(() =>
    questions.map(() => "idle" as SaveState),
  );
  const [ready, setReady] = useState(false);
  const timers = useRef<Array<ReturnType<typeof setTimeout> | null>>(
    questions.map(() => null),
  );

  useEffect(() => {
    let active = true;
    getNotes(itemType, itemKey)
      .then((map) => {
        if (!active) return;
        setValues(questions.map((_, i) => map[`reflection-${i}`] ?? ""));
        setReady(true);
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
    // questions ist pro Seite konstant – bewusst nur an den Inhalt gekoppelt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemType, itemKey]);

  // Ausstehende Speichervorgänge beim Unmount aufräumen.
  useEffect(() => {
    const t = timers.current;
    return () => {
      t.forEach((timer) => timer && clearTimeout(timer));
    };
  }, []);

  function handleChange(index: number, value: string) {
    setValues((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setStates((prev) => {
      const next = [...prev];
      next[index] = "saving";
      return next;
    });

    const timer = timers.current[index];
    if (timer) clearTimeout(timer);
    timers.current[index] = setTimeout(async () => {
      const res = await saveNote(itemType, itemKey, `reflection-${index}`, value);
      setStates((prev) => {
        const next = [...prev];
        next[index] = res.ok ? "saved" : "idle";
        return next;
      });
    }, 800);
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-xl font-medium text-ink">
          Zum Innehalten
        </h2>
        <p className="text-sm text-ink-soft/60">
          Schreib deine Gedanken direkt hierher – sie werden automatisch in
          deinem Bereich gespeichert und sind nur für dich sichtbar.
        </p>
      </div>
      <ul className="flex flex-col gap-6">
        {questions.map((question, i) => (
          <li key={question} className="flex flex-col gap-2">
            <div className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-ink-soft/85">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-xs text-accent">
                <Check />
              </span>
              {question}
            </div>
            <textarea
              value={values[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={ready ? "Deine Gedanken dazu …" : "Lädt …"}
              readOnly={!ready}
              rows={3}
              className="ml-8 w-[calc(100%-2rem)] resize-y rounded-xl border border-ink/12 bg-paper/40 px-4 py-3 text-[0.98rem] leading-relaxed text-ink placeholder:text-ink-soft/40 focus:border-accent/50 focus:bg-white focus:outline-none"
            />
            <span
              className={cn(
                "ml-8 h-4 self-start text-xs transition-colors",
                states[i] === "saved" ? "text-accent" : "text-ink-soft/40",
              )}
            >
              {states[i] === "saving"
                ? "Speichert …"
                : states[i] === "saved"
                  ? "Gespeichert ✓"
                  : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
