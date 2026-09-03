"use client";

import { useMemo, useState } from "react";
import { pillCta } from "./panelStyles";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icon";
import { markiereRueckkehr } from "@/app/mitglieder/rueckkehr-actions";

/** Date → "YYYY-MM-DD" in LOKALER Zeit (nicht UTC). */
function lokalesDatum(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const t = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${t}`;
}

/** n Tage vor `basis` als lokales YYYY-MM-DD. */
function tageVor(basis: Date, n: number): string {
  const d = new Date(basis);
  d.setDate(d.getDate() - n);
  return lokalesDatum(d);
}

/** Sanfte, nicht bestrafende Impulse – deterministisch nach Tag gewählt. */
const IMPULSE = [
  "Es geht nicht ums Nie-mehr-Abschweifen. Es geht ums Zurückkommen.",
  "Der Weg zurück ist kurz – oft nur ein Atemzug.",
  "Du musst nicht ruhig sein, um zurückzukehren. Du kehrst zurück, und dann wird es ruhig.",
  "Ein ausgelassener Tag ist kein Bruch. Er ist eine neue Gelegenheit.",
  "Zurückkehren ist keine Leistung. Es ist eine Freundlichkeit dir gegenüber.",
  "Je öfter du den Weg zurück gehst, desto vertrauter wird er.",
  "Nicht das Fallen zählt, sondern wie sanft du wieder aufstehst.",
];

/**
 * „Die tägliche Rückkehr" – offene Tages-Praxis mit sanftem Rhythmus.
 *
 * Bewusst nicht bestrafend: die große Zahl ist die Gesamtsumme (die nie
 * schrumpft), die Serie bleibt am aktuellen Tag „lebendig", bis der Tag vorbei
 * ist. Ein ausgelassener Tag setzt nichts hart zurück.
 */
export function TaeglicheRueckkehr({ initialTage }: { initialTage: string[] }) {
  const [tage, setTage] = useState<Set<string>>(new Set(initialTage));
  const [pending, setPending] = useState(false);

  const heute = useMemo(() => lokalesDatum(new Date()), []);
  const gestern = useMemo(() => tageVor(new Date(), 1), []);
  const heuteSchon = tage.has(heute);

  // Serie: zählt zusammenhängende Tage ab heute (wenn heute schon) bzw. ab
  // gestern (heute wartet noch). Erst wenn auch gestern fehlt, ist sie 0.
  const serie = useMemo(() => {
    const anker = heuteSchon ? heute : tage.has(gestern) ? gestern : null;
    if (!anker) return 0;
    let count = 0;
    const d = new Date(`${anker}T00:00:00`);
    while (tage.has(lokalesDatum(d))) {
      count += 1;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [tage, heute, gestern, heuteSchon]);

  const gesamt = tage.size;

  // Rhythmus der letzten 28 Tage (älteste zuerst, heute rechts unten).
  const rhythmus = useMemo(() => {
    const now = new Date();
    const felder: { datum: string; done: boolean; istHeute: boolean }[] = [];
    for (let i = 27; i >= 0; i--) {
      const datum = tageVor(now, i);
      felder.push({ datum, done: tage.has(datum), istHeute: datum === heute });
    }
    return felder;
  }, [tage, heute]);

  const impuls = useMemo(() => {
    // Deterministisch nach Kalendertag – gleicher Impuls für den ganzen Tag.
    const tagZahl = Number(heute.replaceAll("-", ""));
    return IMPULSE[tagZahl % IMPULSE.length];
  }, [heute]);

  async function zurueckkehren() {
    if (pending || heuteSchon) return;
    setPending(true);
    setTage((prev) => new Set(prev).add(heute)); // optimistisch
    try {
      const res = await markiereRueckkehr(heute);
      if (res.status === "ok") setTage(new Set(res.tage));
      else setTage((prev) => {
        const next = new Set(prev);
        next.delete(heute);
        return next;
      });
    } catch {
      setTage((prev) => {
        const next = new Set(prev);
        next.delete(heute);
        return next;
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Kennzahlen */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
          <span className="font-display text-3xl font-medium text-accent tabular-nums">
            {gesamt}
          </span>
          <span className="text-sm text-ink-mid">
            {gesamt === 1 ? "Rückkehr insgesamt" : "Rückkehren insgesamt"}
          </span>
        </div>
        <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
          <span className="font-display text-3xl font-medium text-accent tabular-nums">
            {serie}
          </span>
          <span className="text-sm text-ink-mid">
            {serie === 1 ? "Tag in Folge" : "Tage in Folge"}
          </span>
        </div>
      </div>

      {/* Heute zurückkehren */}
      <article className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-white p-7 shadow-card sm:p-9">
        <p className="font-display text-xl font-medium leading-snug text-ink">
          {impuls}
        </p>

        <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-paper/60 p-5">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-mid">
            So kehrst du zurück
          </span>
          <p className="text-[1.02rem] leading-relaxed text-ink">
            Halte einen Moment inne, atme ein paar Mal bewusst und komm in deine
            Mitte zurück. Ein, zwei Minuten reichen – die kurze Praxis führt dich.
          </p>
          <Link
            href="/mitglieder/praxis/taegliche-rueckkehr"
            className="group mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            Die tägliche Rückkehr
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {heuteSchon ? (
          <div className="flex items-center gap-2 rounded-full border border-gold-500/45 bg-gold-500/[0.08] px-5 py-3 text-sm font-semibold text-gold-700">
            ✓ Du bist heute zurückgekehrt. Schön, dass du da warst.
          </div>
        ) : (
          <button
            type="button"
            onClick={zurueckkehren}
            disabled={pending}
            className={`${pillCta} w-fit`}
          >
            {pending ? "Einen Moment …" : "Heute zurückkehren"}
          </button>
        )}
      </article>

      {/* Rhythmus der letzten vier Wochen */}
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Dein Rhythmus
          </span>
          <span className="text-sm text-ink-mid">letzte 4 Wochen</span>
        </div>
        <div
          role="img"
          aria-label={`Rhythmus der letzten ${rhythmus.length} Tage: an ${
            rhythmus.filter((f) => f.done).length
          } Tagen zurückgekehrt.`}
          className="grid gap-1.5"
          style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
        >
          {rhythmus.map((f) => (
            <div
              key={f.datum}
              title={f.datum}
              aria-hidden
              className={`aspect-square rounded-md border ${
                f.done
                  ? "border-accent/40 bg-accent/70"
                  : "border-ink/10 bg-ink/[0.04]"
              } ${f.istHeute ? "ring-2 ring-accent ring-offset-1" : ""}`}
            />
          ))}
        </div>
        <p className="text-xs leading-relaxed text-ink-muted">
          Jedes Feld ein Tag. Ein ausgelassener Tag ist kein Fehler – das
          Zurückkehren ist die Übung, nicht das Nie-Auslassen.
        </p>
      </div>
    </div>
  );
}
