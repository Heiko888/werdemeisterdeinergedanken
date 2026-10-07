"use client";

import { useState } from "react";
import { memberEyebrow } from "@/lib/uiClasses";
import { pillCta } from "./panelStyles";
import { KiEinwilligungsHinweis } from "./KiEinwilligungsHinweis";
import { generateReading, type Reading } from "@/app/mitglieder/reading-actions";

/**
 * KI-Reading: KI-gestützte Reflexion auf Basis der eigenen Angaben im
 * Bewusstseinstest (keine Lernstands- oder Leistungsauswertung).
 *
 * Das Reading wird ausschließlich auf ausdrückliche Freigabe erzeugt: erst ein
 * Klick auf „Reading erzeugen" ruft die KI auf. Ein bereits gespeichertes
 * Reading wird angezeigt und kann neu erzeugt werden – auch das nur per Klick.
 */
export function ReadingPanel({
  initialReading,
}: {
  initialReading: Reading | null;
}) {
  const [reading, setReading] = useState<Reading | null>(initialReading);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await generateReading();
      if (res.status === "ok") {
        setReading(res.reading);
      } else if (res.status === "no_test") {
        setError(
          "Für ein Reading brauchst du zuerst ein Testergebnis. Mach den Bewusstseinstest, dann geht es hier weiter.",
        );
      } else if (res.status === "not_configured") {
        setError("Die Reading-Funktion ist gerade nicht verfügbar.");
      } else if (res.status === "unauthenticated") {
        setError("Bitte melde dich an, um ein Reading zu erzeugen.");
      } else {
        setError(
          "Das Reading konnte gerade nicht erzeugt werden. Versuch es in einem Moment noch einmal.",
        );
      }
    } catch {
      setError(
        "Das Reading konnte gerade nicht erzeugt werden. Versuch es in einem Moment noch einmal.",
      );
    } finally {
      setLoading(false);
    }
  }

  const dateLabel = reading
    ? new Date(reading.createdAt).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-1">
        <span className={memberEyebrow}>
          KI-gestützte Reflexion
        </span>
        <h2 className="font-display text-2xl font-medium text-ink">
          Deine Selbsteinschätzung in Worten
        </h2>
        <p className="max-w-xl text-[1rem] leading-relaxed text-ink-mid">
          Auf deinen Wunsch formuliert eine KI aus deinen eigenen Antworten im
          Bewusstseinstest eine mögliche Perspektive – als Ergänzung zur
          Übersicht oben, ohne Bewertung. Nichts wird automatisch erzeugt; du
          gibst es mit einem Klick frei.
        </p>
      </div>

      {loading && <ErgebnisSkeleton />}

      {!loading && reading && (
        <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper/60 p-6">
          {reading.body.split(/\n{2,}/).map((para, i) => (
            <p
              key={i}
              className="whitespace-pre-wrap text-[1.02rem] leading-relaxed text-ink-mid"
            >
              {para.trim()}
            </p>
          ))}
          {dateLabel && (
            <p className="mt-1 text-xs text-ink-muted">
              KI-generiert · {dateLabel}
            </p>
          )}
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-danger/25 bg-danger/[0.05] px-4 py-3 text-sm leading-relaxed text-danger"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className={pillCta}
        >
          {loading
            ? "Reading wird erzeugt …"
            : reading
              ? "Reading neu erzeugen"
              : "Reading erzeugen"}
        </button>
        {!reading && !loading && (
          <span className="text-xs text-ink-muted">
            Nur aus deiner eigenen Selbsteinschätzung – keine Bewertung, keine
            Vorhersage.
          </span>
        )}
      </div>

      <KiEinwilligungsHinweis werkzeug="reading" />
    </div>
  );
}

/**
 * Ruhiger Platzhalter im Ergebnisbereich, solange die KI arbeitet. Rein
 * dekorativ (aria-hidden) – der Button-Text meldet den Ladezustand.
 */
function ErgebnisSkeleton() {
  return (
    <div
      aria-hidden
      className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper/60 p-6 animate-pulse motion-reduce:animate-none"
    >
      <div className="h-3.5 w-full rounded-full bg-ink/10" />
      <div className="h-3.5 w-11/12 rounded-full bg-ink/10" />
      <div className="h-3.5 w-4/5 rounded-full bg-ink/10" />
      <div className="mt-2 h-3.5 w-full rounded-full bg-ink/10" />
      <div className="h-3.5 w-2/3 rounded-full bg-ink/10" />
    </div>
  );
}
