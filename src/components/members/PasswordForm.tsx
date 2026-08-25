"use client";

import { useState, useTransition } from "react";
import { updatePassword } from "@/app/mitglieder/actions";
import { cn } from "@/lib/cn";

const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-ink outline-none transition-colors focus:border-accent/50";

/**
 * Passwort ändern – neues Passwort zweimal eingeben. Die Prüfung auf
 * Übereinstimmung passiert im Browser, Länge & Speichern serverseitig.
 */
export function PasswordForm() {
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (pw1.length < 8) {
      setStatus({ ok: false, msg: "Das Passwort muss mindestens 8 Zeichen lang sein." });
      return;
    }
    if (pw1 !== pw2) {
      setStatus({ ok: false, msg: "Die beiden Passwörter stimmen nicht überein." });
      return;
    }
    startTransition(async () => {
      const res = await updatePassword(pw1);
      if (res.ok) {
        setPw1("");
        setPw2("");
      }
      setStatus({
        ok: res.ok,
        msg: res.ok ? "Passwort geändert." : res.error ?? "Fehler.",
      });
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="pw-new" className="text-sm font-medium text-ink">
            Neues Passwort
          </label>
          <input
            id="pw-new"
            type="password"
            autoComplete="new-password"
            value={pw1}
            onChange={(e) => setPw1(e.target.value)}
            placeholder="Mind. 8 Zeichen"
            className={inputClass}
          />
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="pw-confirm" className="text-sm font-medium text-ink">
            Wiederholen
          </label>
          <input
            id="pw-confirm"
            type="password"
            autoComplete="new-password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            placeholder="Nochmal eingeben"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending || !pw1 || !pw2}
          className="shrink-0 rounded-full border border-ink/20 bg-white px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Ändern …" : "Passwort ändern"}
        </button>
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
      </div>
    </form>
  );
}
