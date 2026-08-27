"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Hydration-sicheres „läuft im Browser": liefert serverseitig und beim ersten
 * Client-Render `false`, danach `true`. So wird die zeitzonenabhängige Serie
 * erst nach der Hydration berechnet – ohne Server/Client-Konflikt.
 */
function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Date → "YYYY-MM-DD" in LOKALER Zeit (nicht UTC) – wie in TaeglicheRueckkehr. */
function lokalesDatum(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const t = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${t}`;
}

/** Gestern als lokales YYYY-MM-DD. */
function gesternLokal(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return lokalesDatum(d);
}

/** Kompakte, freundliche Datumsangabe: heute / gestern / „3. Sept.". */
function relTag(iso: string): string {
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso);
  const tag = lokalesDatum(d);
  if (tag === lokalesDatum(new Date())) return "heute";
  if (tag === gesternLokal()) return "gestern";
  return d.toLocaleDateString("de-DE", { day: "numeric", month: "short" });
}

/**
 * „Momentum"-Reihe im Dashboard-Kopf: Serie (Rückkehr-Streak), Programm-
 * Fortschritt und letzte Aktivität auf einen Blick. Die stärksten Motivations-
 * signale lebten bisher nur auf den jeweiligen Unterseiten.
 *
 * Die Serie hängt von der LOKALEN Zeitzone der Person ab (die Rückkehr-Tage sind
 * lokale Kalendertage). Deshalb wird sie erst nach dem Mount im Browser berechnet
 * – so stimmt „heute" dort, wo die Person lebt, und es gibt keinen Hydration-
 * Konflikt mit der Server-Zeit.
 */
export function MomentumRow({
  rueckkehrTage,
  programmDone,
  programmTotal,
  lastActivity,
}: {
  rueckkehrTage: string[];
  programmDone: number;
  programmTotal: number;
  lastActivity: string | null;
}) {
  const mounted = useMounted();

  const serie = useMemo(() => {
    if (!mounted) return 0;
    const tage = new Set(rueckkehrTage);
    const heute = lokalesDatum(new Date());
    const gestern = gesternLokal();
    const anker = tage.has(heute) ? heute : tage.has(gestern) ? gestern : null;
    if (!anker) return 0;
    let count = 0;
    const d = new Date(`${anker}T00:00:00`);
    while (tage.has(lokalesDatum(d))) {
      count += 1;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [mounted, rueckkehrTage]);

  // Vor dem Mount nichts rendern (Serie noch nicht lokal berechenbar).
  if (!mounted) return null;

  const chips: { label: string; value: string; href: string }[] = [];
  if (serie > 0) {
    chips.push({
      label: "Serie",
      value: `${serie} ${serie === 1 ? "Tag" : "Tage"}`,
      href: "/mitglieder/rueckkehr",
    });
  }
  if (programmDone > 0) {
    chips.push({
      label: "21-Tage-Programm",
      value: `${programmDone}/${programmTotal}`,
      href: "/mitglieder/programm",
    });
  }
  if (lastActivity) {
    chips.push({
      label: "Zuletzt aktiv",
      value: relTag(lastActivity),
      href: "/mitglieder/journal",
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((c) => (
        <a
          key={c.label}
          href={c.href}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm backdrop-blur-sm transition-colors hover:border-teal-300/50 hover:bg-white/15"
        >
          <span className="text-ink-muted">{c.label}</span>
          <span className="font-semibold tabular-nums text-ink">{c.value}</span>
        </a>
      ))}
    </div>
  );
}
