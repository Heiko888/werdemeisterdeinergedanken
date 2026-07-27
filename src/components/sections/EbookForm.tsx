"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";

/**
 * Front-end-Formular für den Lead-Magneten.
 * TODO: An einen E-Mail-/Newsletter-Dienst anbinden
 * (z. B. Brevo, Mailchimp, ConvertKit) oder eine Route-Handler-API.
 */
export function EbookForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Platzhalter: hier später den Versand/Double-Opt-in auslösen.
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4 text-sm text-ink">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
            <Check />
          </span>
          <span>
            Fast geschafft! Bitte bestätige deine Anmeldung in der E-Mail, die
            wir dir gerade geschickt haben. Dein E-Book kannst du direkt hier
            laden:
          </span>
        </div>
        <Button
          href="/ebook"
          external
          variant="accent"
          size="lg"
          className="self-start"
        >
          E-Book herunterladen
          <ArrowRight />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="ebook-email" className="sr-only">
          Deine E-Mail-Adresse
        </label>
        <input
          id="ebook-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Deine E-Mail-Adresse"
          className="h-13 flex-1 rounded-full border border-ink/15 bg-paper/60 px-5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-accent focus:outline-none"
        />
        <Button type="submit" variant="accent" size="lg">
          E-Book sichern
          <ArrowRight />
        </Button>
      </div>
      <p className="mt-3 text-xs text-ink-soft/50">
        Kein Spam. Abmeldung jederzeit möglich. Mit der Anmeldung stimmst du der{" "}
        <a href="/datenschutz" className="underline hover:text-ink">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}
