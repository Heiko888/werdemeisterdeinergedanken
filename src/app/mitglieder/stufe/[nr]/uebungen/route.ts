import { stages } from "@/lib/content";
import { getStageLesson } from "@/lib/stage-lessons";
import { buildWorksheetPdf, worksheetSlug } from "@/lib/pdf/worksheet";

export function generateStaticParams() {
  return stages.map((_, i) => ({ nr: String(i + 1) }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ nr: string }> },
) {
  const { nr } = await params;
  const idx = Number(nr) - 1;

  if (!Number.isInteger(idx) || idx < 0 || idx >= stages.length) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  const stage = stages[idx];
  const lesson = getStageLesson(stage.number);
  if (!lesson) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  const pdf = await buildWorksheetPdf(stage, lesson);
  const filename = `Uebungen-Stufe-${stage.number}-${worksheetSlug(stage.title)}.pdf`;

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
