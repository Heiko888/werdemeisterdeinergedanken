import { getEbookPdfBytes } from "@/lib/pdf/ebook-file";

export const dynamic = "force-static";

/**
 * Kostenloses Lead-Magnet-E-Book „Die 7 Stufen der Bewusstseinsentwicklung".
 * Liefert das fertige, gestaltete PDF (public/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf)
 * direkt zum Download aus.
 */
export async function GET() {
  let pdf: Uint8Array;
  try {
    pdf = getEbookPdfBytes();
  } catch {
    // Datei fehlt o. Ä. → sauberes 404 statt 500.
    return new Response("Nicht gefunden", { status: 404 });
  }

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Die-7-Stufen-der-Bewusstseinsentwicklung.pdf"',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
