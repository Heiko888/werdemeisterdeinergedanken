/**
 * Auflösung von Journal-Notizen zu ihrem Kontext.
 * Notizen sind in der DB nur über item_type + item_key + ref (z. B.
 * "reflection-2") referenziert; hier wird daraus die menschenlesbare
 * Herkunft (Titel, Frage, Link) rekonstruiert – aus denselben Inhalts-
 * quellen wie die Seiten selbst. Wird von der Journal-Seite und dem
 * PDF-Export genutzt.
 */
import { stages } from "@/lib/content";
import { stageLessons } from "@/lib/stage-lessons";
import { deepDives } from "@/lib/deep-dives";
import { getPractice, practiceReflection } from "@/lib/practices";

export type JournalItemType = "stage" | "deep_dive" | "practice";

export type ResolvedEntry = {
  /** Überschrift der Herkunft, z. B. „Selbstbeobachtung" */
  title: string;
  /** Kurz-Label, z. B. „Stufe 03" oder „Vertiefung · Selbstbild" */
  label: string;
  /** Interner Link zurück zum Inhalt */
  href: string;
  /** Die zugehörige Reflexionsfrage (oder null, wenn nicht auflösbar) */
  question: string | null;
};

/** Index aus einem ref wie "reflection-2" ziehen (sonst null). */
export function refIndex(ref: string): number | null {
  const m = /^reflection-(\d+)$/.exec(ref);
  return m ? Number(m[1]) : null;
}

/**
 * Löst eine Notiz (item_type/item_key/ref) in ihren Anzeige-Kontext auf.
 * Gibt null zurück, wenn die Herkunft nicht mehr existiert (z. B. gelöschter
 * Inhalt) – die aufrufende Seite kann solche Einträge dann überspringen.
 */
export function resolveEntry(
  itemType: JournalItemType,
  itemKey: string,
  ref: string,
): ResolvedEntry | null {
  const idx = refIndex(ref);

  if (itemType === "stage") {
    const stage = stages.find((s) => s.number === itemKey);
    if (!stage) return null;
    const lesson = stageLessons.find((l) => l.number === itemKey);
    const question =
      idx != null && lesson?.reflection[idx] ? lesson.reflection[idx] : null;
    return {
      title: stage.title,
      label: `Stufe ${stage.number}`,
      href: `/mitglieder/stufe/${Number(stage.number)}`,
      question,
    };
  }

  if (itemType === "deep_dive") {
    const dive = deepDives.find((d) => d.slug === itemKey);
    if (!dive) return null;
    const question =
      idx != null && dive.reflection[idx] ? dive.reflection[idx] : null;
    return {
      title: dive.title,
      label: `Vertiefung · ${dive.category}`,
      href: `/mitglieder/wissen/${dive.slug}`,
      question,
    };
  }

  // practice: Titel und Reflexionsfrage aus der Praxis-Bibliothek auflösen.
  const practice = getPractice(itemKey);
  if (!practice) return null;
  const questions = practiceReflection(practice);
  return {
    title: practice.title,
    label: `Praxis · ${practice.category}`,
    href: `/mitglieder/praxis/${practice.slug}`,
    question: idx != null && questions[idx] ? questions[idx] : null,
  };
}

/** Deutsches Datum, z. B. „28. Juli 2026". */
export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
