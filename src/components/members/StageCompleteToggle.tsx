"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  getNotes,
  isStageCompleted,
  isStageStarted,
  setStageCompleted,
} from "@/app/mitglieder/actions";

type NextStage = { nr: number; title: string } | null;

/** Erste nicht-leere eigene Reflexion (Anker "reflection-0", "-1", …). */
function ersteReflexion(notes: Record<string, string>): string | null {
  const eintraege = Object.entries(notes)
    .map(([ref, body]) => ({
      idx: Number(ref.replace(/^\D+/, "")),
      body: body.trim(),
    }))
    .filter((e) => e.body.length > 0)
    .sort((a, b) => a.idx - b.idx);
  return eintraege[0]?.body ?? null;
}

/**
 * Abschluss-Baustein am ENDE der Stufen-Detailseite (nach Lektion, Übungen und
 * Reflexion – nicht mehr davor, damit man nicht abhakt, bevor man etwas
 * gesehen hat).
 *
 * Ehrliche Sprache („Ich habe mit dieser Stufe gearbeitet") statt „abgeschlossen".
 * Nach dem Klick gibt es einen ruhigen Abschluss-Moment: der eigene Leitsatz,
 * die eigene erste Reflexion zu dieser Stufe und der nächste Schritt.
 */
export function StageCompleteToggle({
  stageKey,
  stageNr,
  affirmation,
  nextStage,
}: {
  stageKey: string;
  stageNr: number;
  affirmation?: string;
  nextStage: NextStage;
}) {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  // Nur direkt nach dem eigenen Klick feiern – nicht bei jedem Seitenaufruf.
  const [justCompleted, setJustCompleted] = useState(false);
  const [reflexion, setReflexion] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    Promise.all([isStageCompleted(stageKey), isStageStarted(stageKey)])
      .then(([completed, inArbeit]) => {
        if (active) {
          setDone(completed);
          setStarted(inArbeit);
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [stageKey]);

  function toggle() {
    const next = !done;
    setDone(next); // optimistisch
    setFailed(false);
    startTransition(async () => {
      try {
        const result = await setStageCompleted(stageKey, next);
        setDone(result.completed);
        if (result.completed !== next) setFailed(true);
        if (result.completed && next) {
          setJustCompleted(true);
          try {
            setReflexion(ersteReflexion(await getNotes("stage", stageKey)));
          } catch {
            setReflexion(null);
          }
        } else {
          setJustCompleted(false);
        }
      } catch {
        setDone(!next);
        setFailed(true);
      }
    });
  }

  // Platzhalter gegen Layout-Sprung, solange der Status geladen wird.
  if (!ready) {
    return <div className="h-[140px]" aria-hidden />;
  }

  const naechsterSchritt = nextStage ? (
    <Link
      href={`/mitglieder/stufe/${nextStage.nr}`}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-card transition-all hover:opacity-95"
    >
      Weiter mit Stufe {nextStage.nr}: {nextStage.title}
      <ArrowRight />
    </Link>
  ) : (
    <Link
      href="/mitglieder#abschluss"
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-card transition-all hover:opacity-95"
    >
      Zu meinem Weg
      <ArrowRight />
    </Link>
  );

  // Abschluss-Moment direkt nach dem Klick
  if (done && justCompleted) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 rounded-2xl border border-gold-500/35 bg-gradient-to-br from-gold-500/[0.07] to-white p-7 shadow-card sm:p-9"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-xl text-navy-950">
          <Check />
        </span>
        <h2 className="font-display text-2xl font-medium text-ink">
          Stufe {stageNr} liegt hinter dir.
        </h2>
        {reflexion ? (
          <div className="flex flex-col gap-2">
            <p className="text-[1.02rem] leading-relaxed text-ink-mid">
              Vor einer Weile hast du hier geschrieben:
            </p>
            <blockquote className="border-l-2 border-accent/40 pl-4 font-display text-lg italic leading-snug text-ink">
              „{reflexion.length > 280 ? `${reflexion.slice(0, 280)} …` : reflexion}“
            </blockquote>
            <p className="text-[1.02rem] leading-relaxed text-ink-mid">
              Lies es heute noch einmal. Was ist anders?
            </p>
          </div>
        ) : (
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Eine Stufe ist nicht „erledigt“ – sie begleitet dich jetzt. Du
            kannst jederzeit hierher zurückkehren.
          </p>
        )}
        {affirmation && (
          <p className="text-sm text-ink-muted">
            Dein Leitsatz: <span className="italic text-ink">„{affirmation}“</span>
          </p>
        )}
        {nextStage && (
          <p className="text-sm text-ink-muted">
            Tipp: Nimm dir ein paar Tage für die Übungen, bevor du weitergehst.
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          {naechsterSchritt}
          <button
            type="button"
            onClick={toggle}
            disabled={pending}
            className="min-h-11 px-2 text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline disabled:opacity-60"
          >
            Markierung zurücknehmen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-white p-7 shadow-card sm:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-xl font-medium text-ink">
          {done ? "Diese Stufe begleitet dich" : "Mit dieser Stufe gearbeitet?"}
        </h2>
        <p className="max-w-xl text-[0.98rem] leading-relaxed text-ink-mid">
          {done
            ? "Du hast diese Stufe für dich abgeschlossen. Komm gern zurück, wann immer du magst."
            : started
              ? "Du hast hier schon gearbeitet. Wenn es sich rund anfühlt, halte es fest."
              : "Tipp: Mach zuerst eine Übung oder schreib ein paar Zeilen in die Reflexion – dann bleibt mehr hängen."}
        </p>
      </div>
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        aria-pressed={done}
        className={cn(
          "inline-flex min-h-11 items-center gap-3 rounded-full border px-5 py-3 text-left text-sm font-medium transition-all disabled:opacity-60",
          done
            ? "border-accent/40 bg-accent/[0.08] text-ink"
            : "border-ink/20 bg-white text-ink hover:border-accent/40 hover:text-accent",
        )}
      >
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] transition-colors",
            done
              ? "border-accent bg-gradient-to-br from-gold-400 to-gold-500 text-navy-950"
              : "border-ink/25 text-transparent",
          )}
        >
          <Check />
        </span>
        Ich habe mit dieser Stufe gearbeitet
      </button>
      {done && (
        <span className="text-xs text-ink-muted">
          Erneut tippen, um die Markierung zurückzunehmen.
        </span>
      )}
      {failed && (
        <span role="status" className="text-sm text-danger">
          Konnte gerade nicht gespeichert werden – bitte noch einmal versuchen.
        </span>
      )}
    </div>
  );
}
