import { stages } from "@/lib/content";
import { worksheetSlug } from "@/lib/pdf/slug";
import { getStaticPdf } from "@/lib/pdf/static-pdf";

export const dynamic = "force-static";

export function generateStaticParams() {
  return stages.map((_, i) => ({ nr: String(i + 1) }));
}

/**
 * Übungs-Arbeitsblatt einer Stufe (mit Ausfüll-Linien) – gestaltetes PDF
 * im Markendesign (content/pdf/stufe-<nr>-uebungen.pdf).
 */
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
  const pdf = getStaticPdf(`stufe-${idx + 1}-uebungen`);
  if (!pdf) return new Response("Nicht gefunden", { status: 404 });

  const filename = `Uebungen-Stufe-${stage.number}-${worksheetSlug(stage.title)}.pdf`;

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
