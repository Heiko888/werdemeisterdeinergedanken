"use client";

import { useEffect, useState, useTransition } from "react";
import { Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  isStageCompleted,
  isStageStarted,
  setStageCompleted,
} from "@/app/mitglieder/actions";

/**
 * Kleiner Client-Baustein auf der Stufen-Detailseite.
 * Die Seite selbst bleibt statisch – der persönliche Fortschritt wird beim
 * Laden per Server-Action nachgeholt und getoggelt.
 */
export function StageCompleteToggle({ stageKey }: { stageKey: string }) {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    Promise.all([isStageCompleted(stageKey), isStageStarted(stageKey)])
      .then(([completed, inArbeit]) => {
        if (active) {
          setDone(completed);
          setStarted(inArbeit);
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [stageKey]);

  function toggle() {
    const next = !done;
    setDone(next); // optimistisch
    startTransition(async () => {
      const result = await setStageCompleted(stageKey, next);
      setDone(result.completed);
    });
  }

  // Platzhalter gegen Layout-Sprung, solange der Status geladen wird.
  if (!ready) {
    return <div className="h-[52px]" aria-hidden />;
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        aria-pressed={done}
        className={cn(
          "inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium transition-all disabled:opacity-60",
          done
            ? "border-accent/40 bg-accent/[0.08] text-ink"
            : "border-ink/20 bg-white text-ink hover:border-accent/40 hover:text-accent",
        )}
      >
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] transition-colors",
            done
              ? "border-accent bg-gradient-to-br from-leaf-500 to-teal-500 text-navy-950"
              : "border-ink/25 text-transparent",
          )}
        >
          <Check />
        </span>
        {done ? "Stufe abgeschlossen" : "Als abgeschlossen markieren"}
      </button>

      {/* Leiser Hinweis: an dieser Stufe wurde schon gearbeitet (z. B. eine
          Reflexion geschrieben), sie ist aber noch nicht abgeschlossen. */}
      {!done && started && (
        <span className="text-sm text-teal-700">
          Du hast an dieser Stufe schon gearbeitet.
        </span>
      )}
    </div>
  );
}
