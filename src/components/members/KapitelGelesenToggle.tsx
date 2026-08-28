"use client";

import { useEffect, useState, useTransition } from "react";
import { Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  istKapitelGelesen,
  setKapitelGelesen,
} from "@/app/mitglieder/wissenskapitel-actions";

/**
 * „Als gelesen markieren" für ein Wissensdatenbank-Kapitel.
 *
 * Die Kapitelseite bleibt statisch – der persönliche Lese-Status wird beim Laden
 * per Server-Action nachgeholt und getoggelt. Schlägt das Speichern fehl (z. B.
 * weil Migration 0014 noch nicht eingespielt ist), wird der optimistische
 * Zustand sauber zurückgenommen.
 */
export function KapitelGelesenToggle({ slug }: { slug: string }) {
  const [ready, setReady] = useState(false);
  const [gelesen, setGelesen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    istKapitelGelesen(slug)
      .then((value) => {
        if (active) {
          setGelesen(value);
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
    const next = !gelesen;
    setGelesen(next); // optimistisch
    startTransition(async () => {
      const result = await setKapitelGelesen(slug, next);
      // Bei Fehlschlag den tatsächlichen (unveränderten) Zustand wiederherstellen.
      setGelesen(result.ok ? result.gelesen : !next);
    });
  }

  // Platzhalter gegen Layout-Sprung, solange der Status geladen wird.
  if (!ready) {
    return <div className="h-[52px]" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={gelesen}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium transition-all disabled:opacity-60",
        gelesen
          ? "border-accent/40 bg-accent/[0.08] text-ink"
          : "border-ink/20 bg-white text-ink hover:border-accent/40 hover:text-accent",
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] transition-colors",
          gelesen
            ? "border-accent bg-gradient-to-br from-gold-400 to-gold-500 text-navy-950"
            : "border-ink/25 text-transparent",
        )}
      >
        <Check />
      </span>
      {gelesen ? "Als gelesen markiert" : "Als gelesen markieren"}
    </button>
  );
}
