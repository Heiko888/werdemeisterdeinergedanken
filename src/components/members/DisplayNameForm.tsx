"use client";

import { useState, useTransition } from "react";
import { updateDisplayName } from "@/app/mitglieder/actions";
import { cn } from "@/lib/cn";

/**
 * Anzeigenamen ändern. Startwert kommt serverseitig aus dem Profil.
 */
export function DisplayNameForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    startTransition(async () => {
      const res = await updateDisplayName(name);
      if (res.ok && res.name) setName(res.name);
      setStatus({ ok: res.ok, msg: res.ok ? "Gespeichert." : res.error ?? "Fehler." });
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="display-name" className="text-sm font-medium text-ink">
        Dein Name
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id="display-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          placeholder="z. B. Heiko"
          className="min-h-11 w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none transition-colors focus:border-accent/50"
        />
        <button
          type="submit"
          disabled={pending || name.trim() === initialName.trim() || !name.trim()}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-leaf-500 to-teal-500 px-6 py-2.5 text-sm font-semibold text-navy-950 shadow-card transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Speichern …" : "Speichern"}
        </button>
      </div>
      <p className="text-sm text-ink-muted">
        So wirst du in deinem Bereich begrüßt – angezeigt wird nur dein Vorname.
      </p>
      {status && (
        <p
          className={cn(
            "text-sm font-medium",
            status.ok ? "text-accent" : "text-red-600",
          )}
          role="status"
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
