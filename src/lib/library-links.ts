/**
 * Themen-Brücken zwischen den beiden Wissens-Bibliotheken.
 *
 * Einige Themen kommen in beiden Bibliotheken vor – einmal als interaktive
 * Vertiefung (anwenden & üben zur Stufe) und einmal als Wissensdatenbank-Kapitel
 * (nachschlagen & wissenschaftlich vertiefen). Diese Paare verlinken die beiden
 * Blickwinkel gegenseitig. Bewusst nur eindeutige, geprüfte Zuordnungen –
 * keine vagen thematischen Nachbarschaften.
 */
import { getDeepDive } from "@/lib/deep-dives";
import { chapters } from "@/lib/wissensdatenbank";

const PAARE: readonly { dive: string; chapter: string }[] = [
  { dive: "neuroplastizitaet", chapter: "03-neuroplastizitaet" },
  {
    dive: "kognitive-verzerrungen",
    chapter: "13-kognitive-verzerrungen-und-selbsttaeuschung",
  },
  { dive: "konditionierung", chapter: "18-konditionierung-und-lernen" },
  { dive: "sprache-und-etiketten", chapter: "23-sprache-und-denken" },
];

export type Bruecke = { slug: string; title: string };

/** Passendes Wissensdatenbank-Kapitel zu einer Vertiefung (oder null). */
export function kapitelZuVertiefung(diveSlug: string): Bruecke | null {
  const paar = PAARE.find((p) => p.dive === diveSlug);
  if (!paar) return null;
  const ch = chapters().find((c) => c.slug === paar.chapter);
  return ch ? { slug: ch.slug, title: ch.title } : null;
}

/** Passende Vertiefung zu einem Wissensdatenbank-Kapitel (oder null). */
export function vertiefungZuKapitel(chapterSlug: string): Bruecke | null {
  const paar = PAARE.find((p) => p.chapter === chapterSlug);
  if (!paar) return null;
  const d = getDeepDive(paar.dive);
  return d ? { slug: d.slug, title: d.title } : null;
}
