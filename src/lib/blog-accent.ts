/**
 * Cover-Farbwelten des Blogs – bewusst in einem eigenen, schlanken Modul.
 *
 * `BlogIndex` ist eine Client-Komponente; würde sie diese Helfer aus
 * `blog.ts` beziehen, käme der gesamte Artikel-Content ins Client-Bundle.
 * Hier stehen nur Typ, Map und Funktion – wenige Bytes.
 */

/** Marken-Farbwelt eines Artikel-Covers. */
export type AccentKey = "leaf" | "teal" | "brand" | "cosmic" | "navy";

/**
 * Kategorie → Cover-Farbwelt. Jede Rubrik bekommt eine eigene Palette, damit
 * die Übersicht auf einen Blick geordnet wirkt. Die Geometrie des Covers
 * kommt zusätzlich aus dem Slug – so unterscheiden sich auch Artikel
 * derselben Kategorie deutlich voneinander.
 */
export const CATEGORY_ACCENT: Record<string, AccentKey> = {
  "Mentale Selbstverteidigung": "brand",
  Wissenschaft: "teal",
  Bewusstsein: "leaf",
  Präsenz: "cosmic",
  "Muster lösen": "navy",
  Selbstführung: "cosmic",
};

/** Farbwelt eines Posts: expliziter Override, sonst aus der Kategorie. */
export function accentFor(post: {
  accent?: AccentKey;
  category: string;
}): AccentKey {
  return post.accent ?? CATEGORY_ACCENT[post.category] ?? "navy";
}
