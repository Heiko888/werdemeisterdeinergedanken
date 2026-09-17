"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/cn";
import { Mail } from "@/components/ui/Icon";
import { sendTestImpulseAction, type SendResult } from "./actions";

/**
 * Formular hinter dem Button „Testimpuls senden".
 *
 * Schickt genau EINEN Impuls an EINE Adresse – ohne Verteiler oder Zähler zu
 * berühren. Der eigentliche Versand läuft über die Server-Action
 * `sendTestImpulseAction` (Admin-geschützt).
 */
export function ImpulsTest({
  defaultEmail,
  betreffe,
}: {
  defaultEmail: string;
  /** Betreffzeilen aller Impulse – für die Auswahl im Dropdown. */
  betreffe: string[];
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<SendResult | null>(null);
  const [pending, startTransition] = useTransition();

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
          {betreffe.map((betreff, i) => (
            <option key={i} value={i}>
              {i + 1}. {betreff}
            </option>
          ))}
        </select>
      </label>

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
