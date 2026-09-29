"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { SuchEintrag, SuchTyp } from "@/lib/suchindex";

const TYPEN: SuchTyp[] = [
  "Stufe",
  "Praxis",
  "Vertiefung",
  "Wissensdatenbank",
  "Soforthilfe",
  "Journal",
];

/** Treffer-Relevanz: Titel schlägt Teaser schlägt Volltext. */
function punkte(e: SuchEintrag, woerter: string[]): number {
  const titel = e.titel.toLowerCase();
  const teaser = e.teaser.toLowerCase();
  let score = 0;
  for (const w of woerter) {
    if (titel.includes(w)) score += 10;
    else if (teaser.includes(w)) score += 4;
    else if (e.text.includes(w)) score += 1;
    else return 0; // alle Wörter müssen irgendwo vorkommen
  }
  return score;
}

/**
 * Client-Suche über alle Inhalte des Mitgliederbereichs (und die eigenen
 * Journal-Einträge). Filtert lokal – keine Serveranfrage pro Tastendruck.
 */
export function MitgliederSuche({ index }: { index: SuchEintrag[] }) {
  const [query, setQuery] = useState("");
  const [typ, setTyp] = useState<SuchTyp | null>(null);
  const deferred = useDeferredValue(query);

  const vorhandeneTypen = useMemo(
    () => TYPEN.filter((t) => index.some((e) => e.typ === t)),
    [index],
  );

  const treffer = useMemo(() => {
    const woerter = deferred
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 2);
    if (woerter.length === 0) return [];
    return index
      .filter((e) => !typ || e.typ === typ)
      .map((e) => ({ e, score: punkte(e, woerter) }))
      .filter((t) => t.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40)
      .map((t) => t.e);
  }, [deferred, index, typ]);

  const aktiv = deferred.trim().length >= 2;

  return (
    <div className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="sr-only">Suchbegriff</span>
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder="Wonach suchst du? z. B. Atem, Grübeln, Kritiker …"
          className="min-h-13 w-full rounded-2xl border border-ink/15 bg-white px-5 py-3.5 text-base text-ink shadow-card outline-none transition-colors placeholder:text-ink-muted focus:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/30"
        />
      </label>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Bereich filtern">
        {[null, ...vorhandeneTypen].map((t) => (
          <button
            key={t ?? "alle"}
            type="button"
            onClick={() => setTyp(t)}
            aria-pressed={typ === t}
            className={cn(
              "min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              typ === t
                ? "border-accent/40 bg-accent/[0.08] text-ink"
                : "border-ink/15 bg-white text-ink-mid hover:border-accent/35 hover:text-ink",
            )}
          >
            {t ?? "Alles"}
          </button>
        ))}
      </div>

      <p className="text-sm text-ink-muted" aria-live="polite">
        {aktiv
          ? treffer.length === 0
            ? "Nichts gefunden. Versuch es mit einem anderen Wort."
            : `${treffer.length}${treffer.length === 40 ? "+" : ""} Treffer`
          : "Mindestens zwei Buchstaben eingeben."}
      </p>

      {treffer.length > 0 && (
        <ul className="flex flex-col gap-3">
          {treffer.map((e) => (
            <li key={`${e.typ}-${e.href}-${e.titel}`}>
              <Link
                href={e.href}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/30"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {e.typ}
                  </span>
                  <span className="font-medium text-ink group-hover:text-accent">
                    {e.titel}
                  </span>
                  {e.teaser && (
                    <span className="line-clamp-2 text-sm leading-relaxed text-ink-mid">
                      {e.teaser}
                    </span>
                  )}
                </span>
                <ArrowRight className="mt-1 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
