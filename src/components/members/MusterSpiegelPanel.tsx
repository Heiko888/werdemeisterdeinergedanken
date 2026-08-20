"use client";

import { useState } from "react";
import {
  generateMusterSpiegel,
  type MusterSpiegel,
} from "@/app/mitglieder/muster-actions";

/**
 * Muster-Spiegel zum Journal.
 *
 * Der Spiegel wird ausschließlich auf ausdrückliche Freigabe erzeugt: erst ein
 * Klick auf „Meine Muster spiegeln" übergibt die Reflexionen einmalig an die
 * KI. Ein bereits gespeicherter Spiegel wird angezeigt und kann neu erzeugt
 * werden – auch das nur per Klick.
 */
export function MusterSpiegelPanel({
  initialSpiegel,
}: {
  initialSpiegel: MusterSpiegel | null;
}) {
  const [spiegel, setSpiegel] = useState<MusterSpiegel | null>(initialSpiegel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await generateMusterSpiegel();
      if (res.status === "ok") {
        setSpiegel(res.spiegel);
      } else if (res.status === "too_little_data") {
        setError(
          "Für einen Spiegel braucht es noch etwas mehr: Beantworte ein paar Reflexionsfragen in den Stufen oder Vertiefungen, dann zeigen sich hier deine Muster.",
        );
      } else if (res.status === "not_configured") {
        setError("Der Muster-Spiegel ist gerade nicht verfügbar.");
      } else if (res.status === "unauthenticated") {
        setError("Bitte melde dich an, um deinen Muster-Spiegel zu erzeugen.");
      } else {
        setError(
          "Der Spiegel konnte gerade nicht erzeugt werden. Versuch es in einem Moment noch einmal.",
        );
      }
    } catch {
      setError(
        "Der Spiegel konnte gerade nicht erzeugt werden. Versuch es in einem Moment noch einmal.",
      );
    } finally {
      setLoading(false);
    }
  }

  const dateLabel = spiegel
    ? new Date(spiegel.createdAt).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 rounded-2xl border border-accent/25 bg-white p-7 shadow-card sm:p-9">
      <div className="flex flex-col gap-1">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
          Dein Muster-Spiegel
        </span>
        <h2 className="font-display text-2xl font-medium text-ink">
          Was sich wiederholt
        </h2>
        <p className="max-w-xl text-[1rem] leading-relaxed text-ink-mid">
          Auf deinen Wunsch liest eine KI deine gesammelten Reflexionen und
          benennt behutsam ein bis zwei wiederkehrende Muster – belegt mit
          deinen eigenen Worten. Ein Spiegel, kein Urteil.
        </p>
      </div>

      {spiegel && (
        <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper/60 p-6">
          {spiegel.body.split(/\n{2,}/).map((para, i) => (
            <p
              key={i}
              className="whitespace-pre-wrap text-[1.02rem] leading-relaxed text-ink-soft/90"
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
        <p className="rounded-xl border border-ink/10 bg-paper/60 px-4 py-3 text-sm leading-relaxed text-ink-mid">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-card transition-all hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Spiegel wird erzeugt …"
            : spiegel
              ? "Neu spiegeln"
              : "Meine Muster spiegeln"}
        </button>
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">
        Dein Journal bleibt privat. Erst wenn du hier klickst, werden deine
        Reflexionen einmalig an die KI übergeben, um daraus deinen Spiegel zu
        schreiben – es läuft nichts automatisch. Deine Reflexionstexte selbst
        werden dabei nicht gespeichert.
      </p>
    </div>
  );
}
