import { getBuchPdfBytes, BUCH_FILE_NAME } from "@/lib/pdf/buch-file";
import { verifyBuchDownloadToken } from "@/lib/buch-download";

export const runtime = "nodejs";
// Dynamisch: die Antwort hängt vom Token in der URL ab.
export const dynamic = "force-dynamic";

/**
 * Download der gekauften Buch-PDF „Werde Meister deiner Gedanken".
 *
 * Nur mit gültigem, signiertem Token aus der Liefermail abrufbar
 * (siehe src/lib/buch-download.ts). Ohne oder mit ungültigem/abgelaufenem
 * Token bewusst 404 statt 403: Unbefugte erfahren nicht, dass es hier etwas
 * zu holen gäbe.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");

  if (!verifyBuchDownloadToken(token)) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  let pdf: Uint8Array;
  try {
    pdf = getBuchPdfBytes();
  } catch {
    return new Response("Nicht gefunden", { status: 404 });
  }

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${BUCH_FILE_NAME}"`,
      // Persönlicher Download – nicht in Zwischenspeichern ablegen.
      "Cache-Control": "private, no-store",
    },
  });
}
