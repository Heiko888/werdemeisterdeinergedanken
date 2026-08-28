import { cn } from "@/lib/cn";

/**
 * Weiche Naht zwischen einer hellen und einer angrenzenden dunklen Sektion.
 * Federt die Kante der hellen Sektion ins Navy der Nachbarsektion aus – so
 * „bricht" der Wechsel hell↔dunkel nicht mehr hart, sondern läuft sanft aus.
 *
 * Der Verlauf ist bewusst an die Kante gedrängt (dunkel nur an der Kante),
 * damit kein grauer Mittelton-Streifen entsteht, sondern eine gefederte
 * Kante der dunklen Sektion.
 *
 * `tone` muss zur Zielsektion passen, damit an der Naht keine dunklere Linie
 * entsteht: `deep` (navy-950, z. B. .bg-cosmic der Stimmen), `navy`
 * (navy-900, z. B. Final-CTA, Footer, E-Book-CTA).
 *
 * Liegt per negativem z-index hinter dem Inhalt und nur in der Sektions-
 * Polsterung. Die Sektion muss `relative isolate` sein, damit die Naht
 * über dem Aura-Hintergrund und unter dem Inhalt liegt.
 */
export function SeamFade({
  edge,
  tone = "deep",
}: {
  edge: "top" | "bottom";
  tone?: "deep" | "navy";
}) {
  const dir = edge === "top" ? "to top" : "to bottom";
  const color =
    tone === "navy" ? "var(--color-navy-900)" : "var(--color-navy-950)";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 -z-10 h-10 sm:h-16",
        edge === "top" ? "top-0" : "bottom-0",
      )}
      style={{
        background: `linear-gradient(${dir}, ${color} 0%, color-mix(in oklab, ${color} 55%, transparent) 22%, transparent 62%)`,
      }}
    />
  );
}
