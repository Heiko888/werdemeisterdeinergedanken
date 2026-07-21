import { stages } from "@/lib/content";
import { getStageLesson } from "@/lib/stage-lessons";
import { buildWorkbookPdf } from "@/lib/pdf/worksheet";
import { getLogoBytes } from "@/lib/pdf/assets";

export const dynamic = "force-static";

export async function GET() {
  const entries = stages
    .map((stage) => {
      const lesson = getStageLesson(stage.number);
      return lesson ? { stage, lesson } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const pdf = await buildWorkbookPdf(entries, getLogoBytes());

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Arbeitsheft-Die-7-Stufen.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
