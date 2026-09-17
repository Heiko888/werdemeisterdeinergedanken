"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";

type Status = "idle" | "sending" | "confirm" | "sent" | "fallback";

/**
 * Front-end-Formular für den Lead-Magneten.
 * Sendet die E-Mail an /api/ebook. Mit Double-Opt-in kommt zunächst eine
 * Bestätigungsmail (Status „confirm"); erst nach dem Klick wird das E-Book
 * geliefert. Bereits bestätigte Adressen bekommen es direkt („sent") und dazu
 * eine downloadUrl mit Token.
 *
 * Bewusst gibt es keinen Download ohne bestätigte Anmeldung mehr: /ebook
 * liefert nur noch mit gültigem Token aus. Klemmt der Versand („fallback"),
 * wird deshalb um einen erneuten Versuch gebeten statt das PDF freizugeben –
 * sonst wäre die Lead-Erfassung mit einem Klick zu umgehen.
 */
export function EbookForm({ source = "lead-magnet" }: { source?: string } = {}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // Honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        if (typeof data?.downloadUrl === "string") setDownloadUrl(data.downloadUrl);
        setStatus(data?.mode === "sent" ? "sent" : "confirm");
        return;
      }
      // Nicht eingerichtet → still auf den Direkt-Download ausweichen.
      if (data?.code === "not_configured") {
        setStatus("fallback");
        return;
      }
      setError(
        data?.error ??
          "Senden fehlgeschlagen. Bitte versuch es später erneut.",
      );
      setStatus("fallback");
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte versuch es später erneut.");
      setStatus("fallback");
    }
  }

  if (status === "confirm") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4 text-sm text-ink">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
          <Check />
        </span>
        <span>
          Fast geschafft! Wir haben dir eine E-Mail geschickt. Bitte bestätige
          darin kurz deine Anmeldung – dann kommt dein E-Book sofort zu dir
          (schau ggf. auch im Spam-Ordner nach).
        </span>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4 text-sm text-ink">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
            <Check />
          </span>
          <span>
            Geschafft! Wir haben dir dein E-Book gerade per E-Mail geschickt.
            Schau in dein Postfach (und ggf. in den Spam-Ordner).
          </span>
        </div>
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-ink-mid underline hover:text-ink"
          >
            E-Mail nicht angekommen? E-Book direkt herunterladen
          </a>
        )}
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4 text-sm text-ink">
        <span>
          {error
            ? `${error} Bitte versuch es in ein paar Minuten noch einmal – dann kommt dein E-Book per E-Mail.`
            : "Der Versand klemmt gerade. Bitte versuch es in ein paar Minuten noch einmal – dann kommt dein E-Book per E-Mail."}
        </span>
        <Button
          type="button"
          variant="accent"
          size="lg"
          className="self-start"
          onClick={() => {
            setError(null);
            setStatus("idle");
          }}
        >
          Erneut versuchen
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
          className="h-13 flex-1 rounded-xl border border-ink/15 bg-paper/60 px-5 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        {/* Honeypot: für echte Nutzer unsichtbar, füllen nur Bots aus. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={status === "sending"}
          className="shrink-0 whitespace-nowrap"
        >
          {status === "sending" ? "Wird gesendet …" : "E-Book sichern"}
          <ArrowRight />
        </Button>
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        Kein Spam. Abmeldung jederzeit möglich. Mit der Anmeldung stimmst du der{" "}
        <a href="/datenschutz" className="underline hover:text-ink">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}
