"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { markiereRueckkehr } from "@/app/mitglieder/rueckkehr-actions";
import { impulsFuer, lokalesDatum } from "@/lib/tagesimpulse";

/** Hydration-sicher: serverseitig false, im Browser true (lokale Zeitzone). */
function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type NaechsterTag = { tag: number; titel: string } | null;

/**
 * „Heute" – der tägliche Anker ganz oben im Dashboard.
 *
 * Zwei Dinge, beide unter fünf Minuten: der Impuls des Tages mit einem Klick
 * „Heute zurückkehren" (nutzt dieselbe Server-Action wie /mitglieder/rueckkehr)
 * und – solange das 21-Tage-Programm läuft – der nächste Programm-Tag. Wer das
 * Programm noch nicht begonnen hat, wird freundlich eingeladen.
 *
 * „Heute" ist ein lokaler Kalendertag, deshalb wird der Status erst nach dem
 * Mount im Browser berechnet (keine Server/Client-Abweichung).
 */
export function HeuteKarte({
  rueckkehrTage,
  naechsterTag,
  programmDone,
  programmTotal,
}: {
  rueckkehrTage: string[];
  naechsterTag: NaechsterTag;
  programmDone: number;
  programmTotal: number;
}) {
  const mounted = useMounted();
  const heute = mounted ? lokalesDatum(new Date()) : null;
  const [extraTag, setExtraTag] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [fehler, setFehler] = useState(false);

  const heuteSchon =
    heute != null && (rueckkehrTage.includes(heute) || extraTag === heute);

  async function zurueckkehren() {
    if (!heute || pending || heuteSchon) return;
    setPending(true);
    setFehler(false);
    setExtraTag(heute); // optimistisch
    try {
      const res = await markiereRueckkehr(heute);
      if (res.status !== "ok") {
        setExtraTag(null);
        setFehler(true);
      }
    } catch {
      setExtraTag(null);
      setFehler(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Tagesimpuls + Rückkehr */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-7">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
          Heute · 1 Minute
        </span>
        <p className="font-display text-lg italic leading-snug text-ink">
          {heute ? `„${impulsFuer(heute)}“` : " "}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-3">
          {heuteSchon ? (
            <span
              role="status"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-500/12 px-4 text-sm font-medium text-gold-700"
            >
              <Check /> Heute schon zurückgekehrt
            </span>
          ) : (
            <button
              type="button"
              onClick={zurueckkehren}
              disabled={!heute || pending}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 bg-white px-5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent disabled:opacity-60"
            >
              Heute zurückkehren
            </button>
          )}
          <Link
            href="/mitglieder/rueckkehr"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Was ist das?
          </Link>
        </div>
        {fehler && (
          <span role="status" className="text-sm text-danger">
            Konnte gerade nicht gespeichert werden – bitte noch einmal versuchen.
          </span>
        )}
      </div>

      {/* 21-Tage-Programm: nächster Tag bzw. Einladung */}
      {naechsterTag ? (
        <Link
          href="/mitglieder/programm"
          className="group flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/30 sm:p-7"
        >
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
            {programmDone === 0
              ? "21 Tage · 2–5 Min. am Tag"
              : `21 Tage · Tag ${naechsterTag.tag} von ${programmTotal}`}
          </span>
          <p className="font-display text-lg font-medium leading-snug text-ink group-hover:text-accent">
            {programmDone === 0
              ? "Dein Tagesrhythmus: 21 Tage Autopilot-Ausstieg"
              : naechsterTag.titel}
          </p>
          <p className="text-sm leading-relaxed text-ink-mid">
            {programmDone === 0
              ? "Pro Tag ein Gedanke und eine kleine Übung – ideal neben deiner aktuellen Stufe. Ein verpasster Tag ist kein Bruch."
              : "Ein Gedanke und eine kleine Übung für heute."}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
            {programmDone === 0 ? "Mit Tag 1 beginnen" : `Tag ${naechsterTag.tag} öffnen`}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ) : (
        <Link
          href="/mitglieder/soforthilfe"
          className="group flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/30 sm:p-7"
        >
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Soforthilfe
          </span>
          <p className="font-display text-lg font-medium leading-snug text-ink group-hover:text-accent">
            Was ist gerade los?
          </p>
          <p className="text-sm leading-relaxed text-ink-mid">
            Grübeln, Stress, Wut, Schlaflosigkeit – ein kleiner Schritt für
            genau jetzt.
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
            Soforthilfe öffnen
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}
    </div>
  );
}
