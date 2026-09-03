import { getEbookPdfBytes, EBOOK_FILE_NAME } from "@/lib/pdf/ebook-file";
import { isValidEbookToken } from "@/lib/ebook-download";

export const runtime = "nodejs";
// Muss dynamisch sein: die Antwort hängt vom Token in der URL ab. Vorher war
// die Route „force-static" – also für jede und jeden gleich und ohne Prüfung.
export const dynamic = "force-dynamic";

/**
 * Download des Lead-Magnet-E-Books „Die 7 Stufen der Bewusstseinsentwicklung".
 *
 * Nur mit gültigem Token aus der Liefermail bzw. der Bestätigungsseite
 * abrufbar – das E-Book ist der Gegenwert für die bestätigte Anmeldung.
 * Ohne oder mit ungültigem Token bewusst 404 statt 403: Unbefugte erfahren
 * nicht einmal, dass es hier etwas zu holen gäbe.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");

  if (!(await isValidEbookToken(token))) {
    return new Response("Nicht gefunden", { status: 404 });
  }

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
      "Content-Disposition": `attachment; filename="${EBOOK_FILE_NAME}"`,
      // Persönlicher Download – nicht in Zwischenspeichern ablegen.
      "Cache-Control": "private, no-store",
    },
  });
}
