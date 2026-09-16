"use client";

import { useEffect, useState, useTransition } from "react";
import { Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  isPracticeCompleted,
  setPracticeCompleted,
} from "@/app/mitglieder/actions";

/**
 * „Übung gemacht"-Schalter auf der Praxis-Detailseite – gleiches Muster wie
 * StageCompleteToggle. Die Seite bleibt statisch; der persönliche Status wird
 * beim Laden per Server-Action nachgeholt und getoggelt.
 */
export function PracticeCompleteToggle({ slug }: { slug: string }) {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    isPracticeCompleted(slug)
      .then((completed) => {
        if (active) {
          setDone(completed);
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  function toggle() {
    const next = !done;
    setDone(next); // optimistisch
    startTransition(async () => {
      const result = await setPracticeCompleted(slug, next);
      setDone(result.completed);
    });
  }

  if (!ready) {
    return <div className="h-[52px]" aria-hidden />;
  }

  return (
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
            ? "border-accent bg-gradient-to-br from-gold-400 to-gold-500 text-navy-950"
            : "border-ink/25 text-transparent",
        )}
      >
        <Check />
      </span>
      {done ? "Übung gemacht" : "Als gemacht markieren"}
    </button>
  );
}
