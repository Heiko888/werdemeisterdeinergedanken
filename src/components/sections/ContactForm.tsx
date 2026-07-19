"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { site } from "@/lib/site";

/**
 * Kontaktformular (Front-end).
 * TODO: An einen Versand-Endpunkt anbinden (Route Handler + Mail-Service
 * wie Resend/Brevo) oder als mailto-Fallback nutzen.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("done");
  }

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-navy-950/60 px-4 py-3 text-sm text-white placeholder:text-mist-300/40 focus:border-brand-400 focus:outline-none";

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-cosmic-teal/30 bg-cosmic-teal/10 p-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cosmic-teal/20 text-2xl text-cosmic-cyan">
          <Check />
        </span>
        <h3 className="text-xl font-bold text-white">Danke für deine Nachricht!</h3>
        <p className="prose-lead max-w-md">
          Ich melde mich so bald wie möglich bei dir. Bis dahin: Bleib bewusst.
        </p>
        <p className="text-sm text-mist-300/60">
          Lieber direkt?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-brand-200 underline hover:text-white"
          >
            {site.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-navy-800/40 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-mist-100">
            Name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Dein Name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-mist-100">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="du@beispiel.de"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-mist-100">
          Nachricht
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Worum geht es? Erzähl mir kurz, wo du gerade stehst."
          className={inputClass}
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-mist-300/60">
        <input type="checkbox" required className="mt-0.5 accent-brand-500" />
        <span>
          Ich habe die{" "}
          <a href="/datenschutz" className="underline hover:text-white">
            Datenschutzerklärung
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Daten zu.
        </span>
      </label>
      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-fit">
        Nachricht senden
        <ArrowRight />
      </Button>
    </form>
  );
}
