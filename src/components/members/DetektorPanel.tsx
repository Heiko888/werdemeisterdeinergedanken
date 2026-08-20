"use client";

import { useState } from "react";
import Link from "next/link";
import {
  analyzeText,
  type DetektorErgebnis,
} from "@/app/mitglieder/detektor-actions";
import { ArrowRight } from "@/components/ui/Icon";

const MAX_CHARS = 5000;

/**
 * Manipulations-Detektor: Text einfügen, auf Klick von der KI gegen die 16
 * Techniken der „Mentalen Selbstverteidigung" prüfen lassen. Der Aufruf
 * passiert ausschließlich per Klick; nichts läuft automatisch.
 */
export function DetektorPanel() {
  const [text, setText] = useState("");
  const [ergebnis, setErgebnis] = useState<DetektorErgebnis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tooLong = text.length > MAX_CHARS;

  async function onAnalyze() {
    setLoading(true);
    setError(null);
    setErgebnis(null);
    try {
      const res = await analyzeText(text);
      if (res.status === "ok") {
        setErgebnis(res.ergebnis);
      } else if (res.status === "too_short") {
        setError(
          `Füg noch etwas mehr Text ein – mindestens ${res.min} Zeichen, damit sich die Mechanik überhaupt zeigen kann.`,
        );
      } else if (res.status === "too_long") {
        setError(
          `Der Text ist zu lang (höchstens ${res.max} Zeichen). Kürze ihn auf die entscheidende Passage.`,
        );
      } else if (res.status === "not_configured") {
        setError("Der Detektor ist gerade nicht verfügbar.");
      } else if (res.status === "unauthenticated") {
        setError("Bitte melde dich an, um den Detektor zu nutzen.");
      } else {
        setError(
          "Die Analyse hat gerade nicht geklappt. Versuch es in einem Moment noch einmal.",
        );
      }
    } catch {
      setError(
        "Die Analyse hat gerade nicht geklappt. Versuch es in einem Moment noch einmal.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <label
          htmlFor="detektor-text"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent"
        >
          Text zum Prüfen
        </label>
        <textarea
          id="detektor-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          placeholder="Füg hier eine Schlagzeile, eine Werbung oder einen Post ein …"
          className="w-full resize-y rounded-xl border border-ink/15 bg-paper/50 p-4 text-[1rem] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-accent/50"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`text-xs ${tooLong ? "text-red-600" : "text-ink-muted"}`}
          >
            {text.length} / {MAX_CHARS} Zeichen
          </span>
          <button
            type="button"
            onClick={onAnalyze}
            disabled={loading || tooLong || text.trim().length === 0}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-card transition-all hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Wird geprüft …" : "Text prüfen"}
          </button>
        </div>
        <p className="text-xs leading-relaxed text-ink-muted">
          Der Text geht erst beim Klick an die KI. Geprüft wird die Mechanik,
          nicht die Meinung – auch ein Text, dem du zustimmst, kann Techniken
          nutzen.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-ink/10 bg-paper/60 px-4 py-3 text-sm leading-relaxed text-ink-mid">
          {error}
        </p>
      )}

      {ergebnis && (
        <div className="flex flex-col gap-4">
          <p className="text-[1.02rem] leading-relaxed text-ink-soft/90">
            {ergebnis.gesamt}
          </p>

          {ergebnis.funde.length === 0 ? (
            <div className="rounded-2xl border border-leaf-500/30 bg-leaf-500/[0.06] p-6">
              <p className="text-[1rem] leading-relaxed text-ink-mid">
                Keine der bekannten Techniken ist hier deutlich erkennbar. Das
                heißt nicht, dass der Text „neutral“ ist – nur, dass die
                typischen Hebel nicht klar greifen.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {ergebnis.funde.map((f) => (
                <li
                  key={f.slug}
                  className="flex flex-col gap-3 rounded-2xl border border-accent/25 bg-white p-6 shadow-card"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-medium text-ink">
                      {f.title}
                    </h3>
                    <Link
                      href={f.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-2 hover:underline"
                    >
                      Vertiefung lesen
                      <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  {f.zitat && (
                    <blockquote className="border-l-2 border-accent/40 pl-4 text-[1rem] italic leading-relaxed text-ink-mid">
                      „{f.zitat}“
                    </blockquote>
                  )}
                  <p className="text-[1rem] leading-relaxed text-ink-soft/90">
                    {f.erklaerung}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
