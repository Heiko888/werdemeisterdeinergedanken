"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setError(
          data.error ||
            `Etwas ist schiefgelaufen. Bitte schreib mir direkt an ${site.email}.`,
        );
      }
    } catch {
      setStatus("error");
      setError(
        `Verbindung fehlgeschlagen. Bitte versuch es erneut oder schreib mir direkt an ${site.email}.`,
      );
    }
  }

  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/40 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-accent/30 bg-accent/10 p-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl text-accent">
          <Check />
        </span>
        <h3 className="text-xl font-bold text-ink">Danke für deine Nachricht!</h3>
        <p className="prose-lead max-w-md">
          Ich melde mich so bald wie möglich bei dir. Bis dahin: Bleib bewusst.
        </p>
        <p className="text-sm text-ink-soft/60">
          Lieber direkt?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline hover:text-ink"
          >
            {site.email}
          </a>
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-ink">
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
          <label htmlFor="email" className="text-sm font-medium text-ink">
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
        <label htmlFor="message" className="text-sm font-medium text-ink">
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

      {/* Honeypot gegen Spam – für echte Nutzer unsichtbar */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Firma (bitte leer lassen)</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-ink-soft/60">
        <input type="checkbox" required className="mt-0.5 accent-brand-500" />
        <span>
          Ich habe die{" "}
          <a href="/datenschutz" className="underline hover:text-ink">
            Datenschutzerklärung
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Daten zu.
        </span>
      </label>

      {status === "error" && (
        <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full sm:w-fit"
        disabled={sending}
      >
        {sending ? "Wird gesendet …" : "Nachricht senden"}
        {!sending && <ArrowRight />}
      </Button>
    </form>
  );
}
