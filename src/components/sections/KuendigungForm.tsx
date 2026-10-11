"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import {
  KUENDIGUNG_ARTEN,
  KUENDIGUNG_BESTAETIGEN,
  KUENDIGUNG_GRENZEN,
  KUENDIGUNG_VERTRAEGE,
  KUENDIGUNG_ZEITPUNKTE,
  angabenZeilen,
  formatEingang,
  heuteBerlin,
  pruefeKuendigung,
  type KuendigungArt,
  type KuendigungEingabe,
  type KuendigungVertrag,
  type KuendigungZeitpunkt,
} from "@/lib/kuendigung";

/**
 * Bestätigungsseite des Kündigungsbuttons (§ 312k BGB): Art der Kündigung,
 * Identifizierung, Vertrag und Zeitpunkt angeben und mit „Jetzt kündigen“
 * absenden. Ohne Login. Danach zeigt die Seite Inhalt, Datum und Uhrzeit des
 * Eingangs und lässt sich speichern/drucken; die Bestätigung kommt
 * zusätzlich per E-Mail.
 */

type Status = "idle" | "sending" | "done" | "error";
type Ergebnis = {
  referenz: string;
  eingang: string;
  bestaetigungGesendet: boolean;
  eingabe: KuendigungEingabe;
};

export function KuendigungForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    vertrag: "mitgliedschaft" as KuendigungVertrag,
    vertragsnummer: "",
    art: "ordentlich" as KuendigungArt,
    grund: "",
    zeitpunkt: "naechstmoeglich" as KuendigungZeitpunkt,
    wunschdatum: "",
    company: "",
  });

  function update(key: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const pruefung = pruefeKuendigung(form);
    if (!pruefung.ok) {
      setStatus("error");
      setError(pruefung.fehler);
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/kuendigung", {
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
          eingabe: pruefung.eingabe,
        });
        setStatus("done");
        window.scrollTo({ top: 0 });
      } else {
        setStatus("error");
        setError(
          data.error ||
            `Etwas ist schiefgelaufen. Bitte sende deine Kündigung per E-Mail an ${site.email}.`,
        );
      }
    } catch {
      setStatus("error");
      setError(
        `Verbindung fehlgeschlagen. Bitte versuch es erneut oder sende deine Kündigung per E-Mail an ${site.email}.`,
      );
    }
  }

  if (status === "done" && ergebnis) {
    const { datum, uhrzeit } = formatEingang(ergebnis.eingang);
    const e = ergebnis.eingabe;
    const ende =
      e.art === "ausserordentlich"
        ? "Wir prüfen den genannten Grund und bestätigen dir das Vertragsende gesondert per E-Mail."
        : e.zeitpunkt === "datum"
          ? "Dein Vertrag endet zum gewünschten Datum, frühestens aber zum Ende des laufenden Abrechnungszeitraums. Das genaue Datum steht in deiner Bestätigungs-E-Mail."
          : "Dein Vertrag endet zum Ende des laufenden Abrechnungszeitraums. Bis dahin behältst du deinen Zugang. Das genaue Datum steht in deiner Bestätigungs-E-Mail.";
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-accent/30 bg-accent/10 p-8 text-center sm:p-10"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl text-accent print:hidden">
          <Check />
        </span>
        <h2 className="text-xl font-bold text-ink">Deine Kündigung ist eingegangen</h2>
        <p className="max-w-md leading-relaxed text-ink-mid">
          Eingegangen am <strong className="text-ink">{datum}</strong> um{" "}
          <strong className="text-ink">{uhrzeit} Uhr</strong>.
          <br />
          Referenz: <strong className="text-ink">{ergebnis.referenz}</strong>
        </p>

        <dl className="w-full max-w-md rounded-2xl border border-ink/10 bg-white p-5 text-left text-sm">
          {angabenZeilen(e).map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-3">
              <dt className="shrink-0 font-medium text-ink sm:w-44">{k}</dt>
              <dd className="whitespace-pre-wrap break-words text-ink-mid">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="max-w-md text-sm leading-relaxed text-ink-mid">{ende}</p>

        {ergebnis.bestaetigungGesendet ? (
          <p className="max-w-md text-sm leading-relaxed text-ink-mid">
            Die Kündigungsbestätigung haben wir an <strong>{e.email}</strong>{" "}
            geschickt. Bitte bewahre sie auf – und schau ggf. im Spam-Ordner nach.
          </p>
        ) : (
          <p className="max-w-md rounded-xl border border-gold-500/40 bg-white px-4 py-3 text-sm leading-relaxed text-ink-mid">
            Die Bestätigungs-E-Mail konnte gerade nicht verschickt werden. Deine
            Kündigung ist trotzdem eingegangen. Bitte speichere oder drucke diese
            Seite als Nachweis; wir senden die Bestätigung nach.
          </p>
        )}

        <Button
          type="button"
          variant="secondary"
          size="md"
          className="print:hidden"
          onClick={() => window.print()}
        >
          Diese Bestätigung speichern oder drucken
        </Button>
      </div>
    );
  }

  const sending = status === "sending";
  const inputClass =
    "w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const radioClass = "h-4 w-4 accent-[var(--color-accent)]";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-8"
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium text-ink">Art der Kündigung</legend>
        {(Object.entries(KUENDIGUNG_ARTEN) as [KuendigungArt, string][]).map(([key, label]) => (
          <label key={key} className="flex items-center gap-2.5 text-sm text-ink-mid">
            <input
              type="radio"
              name="art"
              value={key}
              checked={form.art === key}
              onChange={update("art")}
              className={radioClass}
            />
            {label}
          </label>
        ))}
      </fieldset>

      {form.art === "ausserordentlich" && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ku-grund" className="text-sm font-medium text-ink">
            Kündigungsgrund
          </label>
          <textarea
            id="ku-grund"
            rows={3}
            required
            maxLength={KUENDIGUNG_GRENZEN.grund}
            value={form.grund}
            onChange={update("grund")}
            className={inputClass}
          />
          <span className="text-xs text-ink-muted">
            Bei einer außerordentlichen Kündigung brauchen wir den wichtigen Grund.
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ku-name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="ku-name"
            required
            autoComplete="name"
            maxLength={KUENDIGUNG_GRENZEN.name}
            value={form.name}
            onChange={update("name")}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ku-email" className="text-sm font-medium text-ink">
            E-Mail-Adresse
          </label>
          <input
            id="ku-email"
            type="email"
            required
            autoComplete="email"
            maxLength={KUENDIGUNG_GRENZEN.email}
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
          <span className="text-xs text-ink-muted">
            Die Adresse, mit der du die Mitgliedschaft abgeschlossen hast.
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ku-vertrag" className="text-sm font-medium text-ink">
            Vertrag
          </label>
          <select
            id="ku-vertrag"
            required
            value={form.vertrag}
            onChange={update("vertrag")}
            className={inputClass}
          >
            {(Object.entries(KUENDIGUNG_VERTRAEGE) as [KuendigungVertrag, string][]).map(
              ([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ku-nummer" className="text-sm font-medium text-ink">
            Kunden- oder Vertragsnummer{" "}
            <span className="font-normal text-ink-muted">(freiwillig)</span>
          </label>
          <input
            id="ku-nummer"
            maxLength={KUENDIGUNG_GRENZEN.vertragsnummer}
            value={form.vertragsnummer}
            onChange={update("vertragsnummer")}
            className={inputClass}
          />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium text-ink">Zeitpunkt der Kündigung</legend>
        {(Object.entries(KUENDIGUNG_ZEITPUNKTE) as [KuendigungZeitpunkt, string][]).map(
          ([key, label]) => (
            <label key={key} className="flex items-center gap-2.5 text-sm text-ink-mid">
              <input
                type="radio"
                name="zeitpunkt"
                value={key}
                checked={form.zeitpunkt === key}
                onChange={update("zeitpunkt")}
                className={radioClass}
              />
              {label}
            </label>
          ),
        )}
        {form.zeitpunkt === "datum" && (
          <div className="mt-1 flex flex-col gap-1.5 sm:max-w-xs">
            <label htmlFor="ku-datum" className="text-sm font-medium text-ink">
              Gewünschtes Datum
            </label>
            <input
              id="ku-datum"
              type="date"
              required
              min={heuteBerlin()}
              value={form.wunschdatum}
              onChange={update("wunschdatum")}
              className={inputClass}
            />
            <span className="text-xs text-ink-muted">
              Liegt das Datum vor dem Ende des laufenden Abrechnungszeitraums,
              endet der Vertrag zum nächstmöglichen Zeitpunkt.
            </span>
          </div>
        )}
      </fieldset>

      {/* Honeypot gegen Spam – für echte Nutzer unsichtbar */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ku-company">Firma (bitte leer lassen)</label>
        <input
          id="ku-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        Mit dem Klick auf „{KUENDIGUNG_BESTAETIGEN}“ kündigst du den ausgewählten
        Vertrag. Deine Angaben verwenden wir, um die Kündigung zu bearbeiten und
        nachzuweisen – siehe{" "}
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
        {sending ? "Wird übermittelt …" : KUENDIGUNG_BESTAETIGEN}
      </Button>
    </form>
  );
}
