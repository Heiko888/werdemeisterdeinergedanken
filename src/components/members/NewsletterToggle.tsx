"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/cn";
import { setNewsletterOptIn } from "@/app/mitglieder/actions";

/**
 * Opt-in-Schalter für die wöchentlichen E-Mail-Impulse.
 * Der Anfangszustand kommt serverseitig aus dem Profil.
 */
export function NewsletterToggle({ initialOptIn }: { initialOptIn: boolean }) {
  const [optIn, setOptIn] = useState(initialOptIn);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !optIn;
    setOptIn(next); // optimistisch
    startTransition(async () => {
      const res = await setNewsletterOptIn(next);
      setOptIn(res.optIn);
    });
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={optIn}
      onClick={toggle}
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-medium transition-all disabled:opacity-60",
        optIn
          ? "border-accent/40 bg-accent/[0.08] text-ink"
          : "border-ink/20 bg-white text-ink hover:border-accent/40",
      )}
    >
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          optIn ? "bg-gradient-to-r from-leaf-500 to-teal-500" : "bg-ink/20",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
            optIn ? "left-[1.125rem]" : "left-0.5",
          )}
        />
      </span>
      {optIn ? "Impulse abonniert" : "Impulse abonnieren"}
    </button>
  );
}
