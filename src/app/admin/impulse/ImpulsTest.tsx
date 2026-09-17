"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/cn";
import { Mail } from "@/components/ui/Icon";
import { sendTestImpulseAction, type SendResult } from "./actions";

/** Für die Vorschau nötige Felder eines Impulses (ohne interne Pfade). */
export type ImpulsVorschau = {
  subject: string;
  heading: string;
  body: string[];
  ctaLabel: string;
};

/**
 * Formular hinter dem Button „Testimpuls senden" – mit Live-Vorschau.
 *
 * Schickt genau EINEN Impuls an EINE Adresse – ohne Verteiler oder Zähler zu
 * berühren. Der eigentliche Versand läuft über die Server-Action
 * `sendTestImpulseAction` (Admin-geschützt).
 */
export function ImpulsTest({
  defaultEmail,
  vorschauen,
}: {
  defaultEmail: string;
  /** Alle Impulse (Betreff, Überschrift, Text, CTA) für Auswahl + Vorschau. */
  vorschauen: ImpulsVorschau[];
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<SendResult | null>(null);
  const [pending, startTransition] = useTransition();

  const aktuell = vorschauen[index] ?? vorschauen[0];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    startTransition(async () => {
      setResult(await sendTestImpulseAction(email.trim(), index));
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Empfänger-Adresse</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="min-h-11 rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent/50"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink">Welcher Impuls?</span>
        <select
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="min-h-11 rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent/50"
        >
          {vorschauen.map((v, i) => (
            <option key={i} value={i}>
              {i + 1}. {v.subject}
            </option>
          ))}
        </select>
      </label>

      {/* Live-Vorschau des gewählten Impulses (so kommt er – bis auf [TEST]) */}
      {aktuell && (
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Vorschau</span>
          <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-card">
            <p className="text-xs uppercase tracking-[0.15em] text-ink-muted">
              Betreff: <span className="normal-case">[TEST] {aktuell.subject}</span>
            </p>
            <h3 className="mt-3 font-display text-lg font-medium leading-snug text-ink">
              {aktuell.heading}
            </h3>
            <div className="mt-2 flex flex-col gap-2">
              {aktuell.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink-mid">
                  {p}
                </p>
              ))}
            </div>
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">
              {aktuell.ctaLabel}
            </span>
            <p className="mt-4 border-t border-ink/10 pt-3 text-xs leading-relaxed text-ink-muted">
              Dies ist eine Testsendung – sie geht nur an diese eine Adresse, kein
              Verteiler wird angeschrieben. <span className="underline">Jederzeit
              abmelden</span>.
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60",
        )}
      >
        <Mail />
        {pending ? "Sende …" : "Testimpuls senden"}
      </button>

      {result && (
        <div
          role="status"
          className={cn(
            "rounded-xl border px-4 py-3 text-sm",
            result.ok
              ? "border-accent/30 bg-accent/[0.06] text-ink"
              : "border-red-300 bg-red-50 text-red-800",
          )}
        >
          {result.ok ? (
            <>
              <strong className="font-semibold">Verschickt.</strong> Impuls{" "}
              {result.impulseIndex + 1} („{result.subject}“) ging an{" "}
              <span className="font-medium">{result.to}</span>. Verteiler und
              Zähler wurden nicht berührt.
            </>
          ) : (
            <>
              <strong className="font-semibold">Nicht gesendet.</strong>{" "}
              {result.error}
            </>
          )}
        </div>
      )}
    </form>
  );
}
