"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icon";
import { setProgrammTag } from "@/app/mitglieder/programm-actions";
import {
  type ProgrammTag,
  type ProgrammWoche,
  tagKey,
} from "@/lib/programm";

/**
 * Der Begleiter durch das 21-Tage-Programm. Selbst-getaktet: alle Tage sind
 * sichtbar, der erste noch offene Tag steht vorne. Abschließen ist ein Klick;
 * ein verpasster Tag ist kein Bruch.
 */
export function ProgrammBegleiter({
  tage,
  wochen,
  initialDone,
}: {
  tage: ProgrammTag[];
  wochen: ProgrammWoche[];
  initialDone: string[];
}) {
  const [done, setDone] = useState<Set<string>>(new Set(initialDone));
  const [pending, setPending] = useState(false);

  // Erster nicht abgeschlossener Tag – oder der letzte, wenn alles erledigt ist.
  const ersterOffen = useMemo(() => {
    const t = tage.find((d) => !done.has(tagKey(d.tag)));
    return t ? t.tag : tage[tage.length - 1].tag;
  }, [tage, done]);

  const [viewTag, setViewTag] = useState<number>(ersterOffen);

  const tag = tage.find((d) => d.tag === viewTag) ?? tage[0];
  const key = tagKey(tag.tag);
  const istDone = done.has(key);
  const woche = wochen.find((w) => w.nr === tag.woche);
  const erledigt = done.size;
  const alleFertig = erledigt >= tage.length;

  async function toggle() {
    if (pending) return;
    setPending(true);
    const naechster = !istDone;
    // Optimistisch umschalten.
    setDone((prev) => {
      const next = new Set(prev);
      if (naechster) next.add(key);
      else next.delete(key);
      return next;
    });
    try {
      await setProgrammTag(tag.tag, naechster);
      // Nach dem Abschließen sanft zum nächsten offenen Tag weiterführen.
      if (naechster) {
        const folge = tage.find(
          (d) => d.tag > tag.tag && !done.has(tagKey(d.tag)),
        );
        if (folge) setViewTag(folge.tag);
      }
    } catch {
      // Bei Fehler den optimistischen Schritt zurücknehmen.
      setDone((prev) => {
        const next = new Set(prev);
        if (naechster) next.delete(key);
        else next.add(key);
        return next;
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Fortschritt */}
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Dein Weg
          </span>
          <span className="text-sm font-medium text-ink-mid tabular-nums">
            {erledigt} / {tage.length} Tagen
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${(erledigt / tage.length) * 100}%` }}
          />
        </div>
        {alleFertig && (
          <p className="text-sm leading-relaxed text-ink-mid">
            Du hast alle 21 Tage gegangen. Das Wichtigste beginnt jetzt: die
            eine Praxis, die deine bleibt.
          </p>
        )}
      </div>

      {/* Aktueller Tag */}
      <article className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-white p-7 shadow-card sm:p-9">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Tag {tag.tag}
            {woche ? ` · Woche ${woche.nr} – ${woche.titel}` : ""}
          </span>
          {istDone && (
            <span className="rounded-full bg-leaf-500/15 px-3 py-1 text-xs font-semibold text-leaf-600">
              abgeschlossen
            </span>
          )}
        </div>

        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          {tag.titel}
        </h2>

        <p className="text-[1.05rem] leading-relaxed text-ink-soft/90">
          {tag.impuls}
        </p>

        <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-paper/60 p-5">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-mid">
            Deine Übung heute
          </span>
          <p className="text-[1.02rem] leading-relaxed text-ink">
            {tag.uebung}
          </p>
          <Link
            href={tag.bezug.href}
            className="group mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            {tag.bezug.label}
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            disabled={pending}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.8rem] font-semibold leading-tight shadow-card transition-all disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm ${
              istDone
                ? "border border-ink/20 bg-white text-ink hover:border-accent/40 hover:text-accent"
                : "bg-ink text-paper hover:bg-ink/90"
            }`}
          >
            {istDone ? "Als offen markieren" : "Tag abschließen"}
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewTag((t) => Math.max(1, t - 1))}
              disabled={tag.tag <= 1}
              aria-label="Vorheriger Tag"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 bg-white text-ink transition-all hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
            >
              <ArrowRight className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => setViewTag((t) => Math.min(tage.length, t + 1))}
              disabled={tag.tag >= tage.length}
              aria-label="Nächster Tag"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 bg-white text-ink transition-all hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </article>

      {/* Der Bogen über drei Wochen */}
      <div className="flex flex-col gap-6">
        <h3 className="font-display text-xl font-medium text-ink">
          Die drei Wochen
        </h3>
        {wochen.map((w) => (
          <div key={w.nr} className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
                Woche {w.nr} · {w.titel}
              </span>
              <p className="text-sm leading-relaxed text-ink-mid">{w.fokus}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tage
                .filter((d) => d.woche === w.nr)
                .map((d) => {
                  const dKey = tagKey(d.tag);
                  const dDone = done.has(dKey);
                  const aktiv = d.tag === viewTag;
                  return (
                    <button
                      key={d.tag}
                      type="button"
                      onClick={() => setViewTag(d.tag)}
                      aria-current={aktiv ? "true" : undefined}
                      className={`inline-flex min-w-[3.75rem] items-center justify-center gap-1 rounded-full border px-2.5 py-1.5 text-[0.8rem] font-medium leading-tight tabular-nums transition-all sm:min-w-[4.5rem] sm:px-3 sm:text-sm ${
                        aktiv
                          ? "border-accent bg-accent/10 text-ink"
                          : dDone
                            ? "border-leaf-500/40 bg-leaf-500/[0.08] text-leaf-600"
                            : "border-ink/15 bg-white text-ink-mid hover:border-accent/40 hover:text-ink"
                      }`}
                    >
                      {dDone && <span aria-hidden>✓</span>}
                      <span>Tag {d.tag}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
