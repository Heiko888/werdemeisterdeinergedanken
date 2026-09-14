"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { STUFEN } from "@/lib/erstgespraech/phasen";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

type FeldFehler = { feld: string; text: string };

type Props = {
  /**
   * Herkunft, die im Fragebogen gespeichert wird (Spalte `quelle`). So lässt
   * sich später unterscheiden, über welchen Weg jemand kam. Default „direktlink".
   */
  quelle?: string;
};

type Feld =
  | "name"
  | "email"
  | "anlass"
  | "muster"
  | "versucht"
  | "veraenderung"
  | "sonstiges"
  | "einwilligung";

export function KlarheitsgespraechForm({ quelle = "direktlink" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fehlerFelder, setFehlerFelder] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({
    name: "",
    email: "",
    anlass: "",
    muster: "",
    versucht: "",
    veraenderung: "",
    sonstiges: "",
    stufe: "",
    einwilligung: false,
    company: "", // Honeypot
  });

  function updateText(
    key: Exclude<Feld, "einwilligung"> | "stufe" | "company",
  ) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    setFehlerFelder(new Set());
    try {
      const res = await fetch("/api/klarheitsgespraech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          anlass: form.anlass,
          muster: form.muster,
          versucht: form.versucht,
          veraenderung: form.veraenderung,
          sonstiges: form.sonstiges,
          stufe: form.stufe ? Number(form.stufe) : null,
          einwilligung: form.einwilligung,
          company: form.company,
          quelle,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus("error");
        setError(
          data.error ||
            `Etwas ist schiefgelaufen. Bitte versuch es erneut oder schreib mir direkt an ${site.email}.`,
        );
        if (Array.isArray(data.felder)) {
          setFehlerFelder(
            new Set((data.felder as FeldFehler[]).map((f) => f.feld)),
          );
        }
      }
    } catch {
      setStatus("error");
      setError(
        `Verbindung fehlgeschlagen. Bitte versuch es erneut oder schreib mir direkt an ${site.email}.`,
      );
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const cls = (feld: string) =>
    `${inputBase} ${fehlerFelder.has(feld) ? "border-red-400" : "border-ink/15"}`;

  if (status === "done") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-accent/30 bg-accent/10 p-10 text-center"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl text-accent">
          <Check />
        </span>
        <h3 className="text-xl font-bold text-ink">Danke – dein Fragebogen ist da!</h3>
        <p className="prose-lead max-w-md">
          Ich habe deine Antworten erhalten und bereite mich damit auf unser
          Gespräch vor. Du musst nichts weiter tun.
        </p>
        <p className="text-sm text-ink-muted">
          Eine Frage vorab?{" "}
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
      className="flex flex-col gap-5 rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-8"
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
            onChange={updateText("name")}
            placeholder="Dein Name"
            className={cls("name")}
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
            onChange={updateText("email")}
            placeholder="du@beispiel.de"
            className={cls("email")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="anlass" className="text-sm font-medium text-ink">
          Warum jetzt? Was ist der Anlass?
        </label>
        <textarea
          id="anlass"
          required
          rows={4}
          value={form.anlass}
          onChange={updateText("anlass")}
          placeholder="Was hat dich gerade jetzt hierher gebracht?"
          className={cls("anlass")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="muster" className="text-sm font-medium text-ink">
          Welches Muster oder Thema beschäftigt dich?
        </label>
        <textarea
          id="muster"
          required
          rows={3}
          value={form.muster}
          onChange={updateText("muster")}
          placeholder="Was wiederholt sich bei dir – im Denken, Fühlen oder Handeln?"
          className={cls("muster")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="versucht" className="text-sm font-medium text-ink">
          Was hast du schon versucht?
        </label>
        <textarea
          id="versucht"
          required
          rows={3}
          value={form.versucht}
          onChange={updateText("versucht")}
          placeholder="Was hat geholfen, was nicht?"
          className={cls("versucht")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="veraenderung" className="text-sm font-medium text-ink">
          Was soll sich für dich verändern?
        </label>
        <textarea
          id="veraenderung"
          required
          rows={3}
          value={form.veraenderung}
          onChange={updateText("veraenderung")}
          placeholder="Woran würdest du merken, dass sich etwas zum Guten gewandelt hat?"
          className={cls("veraenderung")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="stufe" className="text-sm font-medium text-ink">
          Wo würdest du dich einordnen?{" "}
          <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <select
          id="stufe"
          value={form.stufe}
          onChange={updateText("stufe")}
          className={cls("stufe")}
        >
          <option value="">Weiß ich nicht / lieber nicht</option>
          {STUFEN.map((s) => (
            <option key={s.nr} value={s.nr}>
              Stufe {s.nr} · {s.name} – {s.halbsatz}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="sonstiges" className="text-sm font-medium text-ink">
          Möchtest du mir sonst noch etwas mitgeben?{" "}
          <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea
          id="sonstiges"
          rows={2}
          value={form.sonstiges}
          onChange={updateText("sonstiges")}
          placeholder="Alles, was du wichtig findest."
          className={cls("sonstiges")}
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
          onChange={updateText("company")}
        />
      </div>

      <label
        className={`flex items-start gap-2 text-xs ${
          fehlerFelder.has("einwilligung") ? "text-red-700" : "text-ink-muted"
        }`}
      >
        <input
          type="checkbox"
          required
          checked={form.einwilligung}
          onChange={(e) =>
            setForm((f) => ({ ...f, einwilligung: e.target.checked }))
          }
          className="mt-0.5 h-5 w-5 shrink-0 accent-gold-500"
        />
        <span>
          Ich habe die{" "}
          <a href="/datenschutz" className="underline hover:text-ink">
            Datenschutzerklärung
          </a>{" "}
          gelesen und stimme zu, dass meine Angaben zur Vorbereitung des
          Gesprächs gespeichert und verarbeitet werden.
        </span>
      </label>

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
        {sending ? "Wird gesendet …" : "Fragebogen absenden"}
        {!sending && <ArrowRight />}
      </Button>
    </form>
  );
}
