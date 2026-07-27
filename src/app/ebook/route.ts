import { stages } from "@/lib/content";
import { getStageLesson } from "@/lib/stage-lessons";
import { buildEbookPdf } from "@/lib/pdf/worksheet";
import { getLogoBytes } from "@/lib/pdf/assets";

export const dynamic = "force-static";

/**
 * Kostenloses Lead-Magnet-E-Book „Die 7 Stufen kompakt erklärt –
 * Erste Übungen für mehr Klarheit". Wird zur Build-Zeit statisch als PDF
 * erzeugt und direkt zum Download ausgeliefert.
 */
export async function GET() {
  const entries = stages
    .map((stage) => {
      const lesson = getStageLesson(stage.number);
      return lesson ? { stage, lesson } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const pdf = await buildEbookPdf(entries, getLogoBytes());

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Die-7-Stufen-kompakt.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
