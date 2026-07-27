import { buildEbookPdf } from "@/lib/pdf/worksheet";
import { getEbookEntries } from "@/lib/pdf/ebook-entries";
import { getLogoBytes } from "@/lib/pdf/assets";

export const dynamic = "force-static";

/**
 * Kostenloses Lead-Magnet-E-Book „Die 7 Stufen kompakt erklärt –
 * Erste Übungen für mehr Klarheit". Wird zur Build-Zeit statisch als PDF
 * erzeugt und direkt zum Download ausgeliefert.
 */
export async function GET() {
  const pdf = await buildEbookPdf(getEbookEntries(), getLogoBytes());

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Die-7-Stufen-kompakt.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
