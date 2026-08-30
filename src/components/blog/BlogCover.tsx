import type { AccentKey } from "@/lib/blog-accent";

/**
 * Generatives Artikel-Cover – ganz ohne Fotomaterial.
 *
 * Die Farbwelt kommt aus der Kategorie (`accent`), die Geometrie
 * deterministisch aus dem Slug (`seed`). Dadurch bekommt jeder Artikel ein
 * individuelles, markentreues Motiv (Verläufe + Sternenfeld + feiner
 * Orbit-Ring), und zwei Artikel derselben Kategorie sehen trotzdem
 * unterschiedlich aus. Rein dekorativ → `aria-hidden`.
 */

// Alle Farbwelten liegen im warmen Gold-Spektrum – so bleiben die generativen
// Cover untereinander unterscheidbar (je Kategorie ein anderes Gold-Paar) und
// zugleich stimmig zum durchgehend warmen Marken-Look (kein Blau/Türkis mehr).
const PAIRS: Record<AccentKey, [string, string]> = {
  leaf: ["var(--color-gold-400)", "var(--color-gold-500)"],
  teal: ["var(--color-gold-500)", "var(--color-gold-300)"],
  brand: ["var(--color-gold-400)", "var(--color-gold-600)"],
  cosmic: ["var(--color-gold-300)", "var(--color-gold-500)"],
  navy: ["var(--color-gold-500)", "var(--color-gold-400)"],
};

/** Stabiler 32-bit-Hash (FNV-1a). Gleicher Seed → gleiches Motiv. */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function BlogCover({
  seed,
  accent,
  className = "",
}: {
  seed: string;
  accent: AccentKey;
  className?: string;
}) {
  const [c1, c2] = PAIRS[accent];
  const h = hash(seed);

  // Positionen der beiden weichen Farbglows (in %).
  const x1 = 12 + (h % 34);
  const y1 = 8 + ((h >> 4) % 30);
  const x2 = 54 + ((h >> 8) % 34);
  const y2 = 56 + ((h >> 12) % 34);

  // Feiner Orbit-Ring mit wanderndem Punkt.
  const cx = 58 + ((h >> 18) % 34);
  const cy = 8 + ((h >> 22) % 30);
  const r = 20 + ((h >> 6) % 18);
  const angle = ((h >> 16) % 360) * (Math.PI / 180);
  const dotX = cx + Math.cos(angle) * r;
  const dotY = cy + Math.sin(angle) * r;

  const background =
    `radial-gradient(46% 42% at ${x1}% ${y1}%, color-mix(in oklab, ${c1} 60%, transparent), transparent 62%),` +
    `radial-gradient(48% 44% at ${x2}% ${y2}%, color-mix(in oklab, ${c2} 46%, transparent), transparent 60%),` +
    `var(--color-navy-900)`;

  return (
    <div
      aria-hidden
      className={`grain relative overflow-hidden bg-navy-900 ${className}`}
      style={{ background }}
    >
      <div className="pointer-events-none absolute inset-0 bg-stars opacity-40" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="0.4"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r * 0.6}
          fill="none"
          stroke="white"
          strokeOpacity="0.07"
          strokeWidth="0.4"
        />
        <circle cx={dotX} cy={dotY} r="1.6" fill={c1} />
      </svg>
      {/* Sanfte Abdunklung unten für Tiefe */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
    </div>
  );
}
