import { deepDives, getDeepDive } from "@/lib/deep-dives";
import { worksheetSlug } from "@/lib/pdf/slug";
import { getStaticPdf } from "@/lib/pdf/static-pdf";

export const dynamic = "force-static";

export function generateStaticParams() {
  return deepDives.map((d) => ({ slug: d.slug }));
}

/**
 * Vertiefung (Deep-Dive) als gestaltetes PDF im Markendesign
 * (content/pdf/vertiefung-<slug>.pdf).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
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
