"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import {
  WIDERRUF_BESTAETIGEN,
  WIDERRUF_GRENZEN,
  WIDERRUF_PRODUKTE,
  formatEingang,
  pruefeWiderruf,
  type WiderrufProdukt,
} from "@/lib/widerruf";

/**
 * Widerrufsfunktion – Angaben eingeben und mit „Widerruf bestätigen“ absenden.
 * Ohne Login. Nach dem Absenden zeigt die Seite den Eingangszeitpunkt und die
 * Referenz; die Eingangsbestätigung kommt zusätzlich per E-Mail.
 */

type Status = "idle" | "sending" | "done" | "error";
type Ergebnis = { referenz: string; eingang: string; bestaetigungGesendet: boolean };

export function WiderrufForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    produkt: "" as WiderrufProdukt | "",
    bestellung: "",
    nachricht: "",
    company: "",
  });

  function update(key: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const pruefung = pruefeWiderruf(form);
    if (!pruefung.ok) {
      setStatus("error");
      setError(pruefung.fehler);
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/widerruf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setErgebnis({
          referenz: data.referenz,
          eingang: data.eingang,
          bestaetigungGesendet: Boolean(data.bestaetigungGesendet),
        });
        setStatus("done");
        window.scrollTo({ top: 0 });
      } else {
        setStatus("error");
        setError(
          data.error ||
            `Etwas ist schiefgelaufen. Bitte sende deinen Widerruf per E-Mail an ${site.email}.`,
        );
      }
    } catch {
      setStatus("error");
      setError(
        `Verbindung fehlgeschlagen. Bitte versuch es erneut oder sende deinen Widerruf per E-Mail an ${site.email}.`,
      );
    }
  }

  if (status === "done" && ergebnis) {
    const { datum, uhrzeit } = formatEingang(ergebnis.eingang);
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-accent/30 bg-accent/10 p-8 text-center sm:p-10"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl text-accent">
          <Check />
        </span>
        <h2 className="text-xl font-bold text-ink">Dein Widerruf ist eingegangen</h2>
        <p className="max-w-md leading-relaxed text-ink-mid">
          Eingegangen am <strong className="text-ink">{datum}</strong> um{" "}
          <strong className="text-ink">{uhrzeit} Uhr</strong>.
          <br />
          Referenz: <strong className="text-ink">{ergebnis.referenz}</strong>
        </p>
        {ergebnis.bestaetigungGesendet ? (
          <p className="max-w-md text-sm leading-relaxed text-ink-mid">
            Eine Eingangsbestätigung haben wir an <strong>{form.email}</strong>{" "}
            geschickt. Bitte bewahre sie auf – und schau ggf. im Spam-Ordner nach.
          </p>
        ) : (
          <p className="max-w-md rounded-xl border border-gold-500/40 bg-white px-4 py-3 text-sm leading-relaxed text-ink-mid">
            Die Bestätigungs-E-Mail konnte gerade nicht verschickt werden. Dein
            Widerruf ist trotzdem eingegangen. Bitte speichere oder drucke diese
            Seite als Nachweis; wir senden die Bestätigung nach.
          </p>
        )}
      </div>
    );
  }

  const sending = status === "sending";
  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="wr-name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="wr-name"
            required
            autoComplete="name"
            maxLength={WIDERRUF_GRENZEN.name}
            value={form.name}
            onChange={update("name")}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="wr-email" className="text-sm font-medium text-ink">
            E-Mail-Adresse
          </label>
          <input
            id="wr-email"
            type="email"
            required
            autoComplete="email"
            maxLength={WIDERRUF_GRENZEN.email}
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
          <span className="text-xs text-ink-muted">
            Am besten die Adresse, mit der du bestellt hast.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wr-produkt" className="text-sm font-medium text-ink">
          Welchen Vertrag möchtest du widerrufen?
        </label>
        <select
          id="wr-produkt"
          required
          value={form.produkt}
          onChange={update("produkt")}
          className={inputClass}
        >
          <option value="" disabled>
            Bitte auswählen
          </option>
          {(Object.entries(WIDERRUF_PRODUKTE) as [WiderrufProdukt, string][]).map(
            ([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wr-bestellung" className="text-sm font-medium text-ink">
          Bestellnummer oder Bestelldatum <span className="font-normal text-ink-muted">(freiwillig)</span>
        </label>
        <input
          id="wr-bestellung"
          maxLength={WIDERRUF_GRENZEN.bestellung}
          value={form.bestellung}
          onChange={update("bestellung")}
          placeholder="Falls zur Hand – hilft uns, deine Bestellung schneller zu finden"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wr-nachricht" className="text-sm font-medium text-ink">
          Anmerkung <span className="font-normal text-ink-muted">(freiwillig)</span>
        </label>
        <textarea
          id="wr-nachricht"
          rows={3}
          maxLength={WIDERRUF_GRENZEN.nachricht}
          value={form.nachricht}
          onChange={update("nachricht")}
          className={inputClass}
        />
        <span className="text-xs text-ink-muted">
          Einen Grund musst du nicht angeben.
        </span>
      </div>

      {/* Honeypot gegen Spam – für echte Nutzer unsichtbar */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="wr-company">Firma (bitte leer lassen)</label>
        <input
          id="wr-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        Mit dem Klick auf „{WIDERRUF_BESTAETIGEN}“ erklärst du den Widerruf des
        ausgewählten Vertrags. Deine Angaben verwenden wir, um den Widerruf zu
        bearbeiten und nachzuweisen – siehe{" "}
        <a href="/datenschutz" className="underline hover:text-ink">
          Datenschutzerklärung
        </a>
        .
      </p>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
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
        {sending ? "Wird übermittelt …" : WIDERRUF_BESTAETIGEN}
      </Button>
    </form>
  );
}
