import { deepDives, getDeepDive } from "@/lib/deep-dives";
import { buildDeepDivePdf, worksheetSlug } from "@/lib/pdf/worksheet";
import { getLogoBytes } from "@/lib/pdf/assets";

export function generateStaticParams() {
  return deepDives.map((d) => ({ slug: d.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const dive = getDeepDive(slug);
  if (!dive) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  const pdf = await buildDeepDivePdf(dive, getLogoBytes());
  const filename = `Vertiefung-${worksheetSlug(dive.title)}.pdf`;

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
