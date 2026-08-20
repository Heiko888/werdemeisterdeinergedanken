import { stages } from "@/lib/content";
import { worksheetSlug } from "@/lib/pdf/slug";
import { getStaticPdf } from "@/lib/pdf/static-pdf";
import { guardMemberDownload } from "@/lib/members/download-guard";

// Session-abhängiger Zugriffsschutz → nicht statisch vorrendern.
export const dynamic = "force-dynamic";

/**
 * Komplette Lektion einer Stufe – gestaltetes PDF im Markendesign
 * (content/pdf/stufe-<nr>-lektion.pdf).
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ nr: string }> },
) {
  const denied = await guardMemberDownload(request);
  if (denied) return denied;

  const { nr } = await params;
  const idx = Number(nr) - 1;

  if (!Number.isInteger(idx) || idx < 0 || idx >= stages.length) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  const stage = stages[idx];
  const pdf = getStaticPdf(`stufe-${idx + 1}-lektion`);
  if (!pdf) return new Response("Nicht gefunden", { status: 404 });

  const filename = `Lektion-Stufe-${stage.number}-${worksheetSlug(stage.title)}.pdf`;

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
