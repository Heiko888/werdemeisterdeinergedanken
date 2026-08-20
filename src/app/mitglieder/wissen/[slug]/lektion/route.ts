import { getDeepDive } from "@/lib/deep-dives";
import { worksheetSlug } from "@/lib/pdf/slug";
import { getStaticPdf } from "@/lib/pdf/static-pdf";
import { guardMemberDownload } from "@/lib/members/download-guard";

// Session-abhängiger Zugriffsschutz → nicht statisch vorrendern.
export const dynamic = "force-dynamic";

/**
 * Vertiefung (Deep-Dive) als gestaltetes PDF im Markendesign
 * (content/pdf/vertiefung-<slug>.pdf).
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const denied = await guardMemberDownload(request);
  if (denied) return denied;

  const { slug } = await params;
  const dive = getDeepDive(slug);
  if (!dive) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  const pdf = getStaticPdf(`vertiefung-${slug}`);
  if (!pdf) return new Response("Nicht gefunden", { status: 404 });

  const filename = `Vertiefung-${worksheetSlug(dive.title)}.pdf`;

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
