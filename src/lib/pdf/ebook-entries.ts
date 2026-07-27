import { stages, type Stage } from "@/lib/content";
import { getStageLesson, type StageLesson } from "@/lib/stage-lessons";

export type EbookEntry = { stage: Stage; lesson: StageLesson };

/**
 * Stellt die Stufen mit ihren Lektionen für das E-Book zusammen.
 * Wird sowohl von der statischen Download-Route (`/ebook`) als auch vom
 * E-Mail-Versand (`/api/ebook`) genutzt, damit beide dasselbe PDF erzeugen.
 */
export function getEbookEntries(): EbookEntry[] {
  return stages
    .map((stage) => {
      const lesson = getStageLesson(stage.number);
      return lesson ? { stage, lesson } : null;
    })
    .filter((entry): entry is EbookEntry => entry !== null);
}
