import { getEbookPdfBytes } from "@/lib/pdf/ebook-file";

export const dynamic = "force-static";

/**
 * Kostenloses Lead-Magnet-E-Book „Die 7 Stufen kompakt".
 * Liefert das fertige, gestaltete PDF (public/Die-7-Stufen-kompakt.pdf)
 * direkt zum Download aus.
 */
export async function GET() {
  const pdf = getEbookPdfBytes();

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Die-7-Stufen-kompakt.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
