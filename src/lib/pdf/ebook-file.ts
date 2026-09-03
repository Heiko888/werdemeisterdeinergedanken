import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Lädt das fertige, gestaltete E-Book-PDF (content/pdf/…) als Bytes. Das PDF
 * wird als feste Datei ausgeliefert (Markendesign mit Bildern/Schriften),
 * daher nicht mehr zur Laufzeit erzeugt.
 *
 * WICHTIG: Die Datei liegt bewusst unter `content/` und NICHT unter `public/`.
 * Alles unter public/ liefert Next.js zusätzlich direkt unter seinem
 * Dateipfad aus – an jeder Prüfung vorbei. Solange sie dort lag, war das
 * E-Book unter /Die-7-Stufen-der-Bewusstseinsentwicklung.pdf frei abrufbar
 * und die Lead-Erfassung ließ sich schlicht umgehen. Siehe auch
 * src/lib/pdf/static-pdf.ts, wo dieselbe Falle für die Mitglieder-PDFs
 * beschrieben ist. Das Verzeichnis wird im Dockerfile mit ins Laufzeit-Image
 * kopiert (COPY --from=builder /app/content ./content).
 *
 * Wird von der Download-Route /ebook und vom E-Mail-Versand gelesen und
 * danach gecacht.
 */
const FILE_NAME = "Die-7-Stufen-der-Bewusstseinsentwicklung.pdf";

let cache: Uint8Array | undefined;

export function getEbookPdfBytes(): Uint8Array {
  if (cache) return cache;
  const buf = readFileSync(join(process.cwd(), "content", "pdf", FILE_NAME));
  cache = new Uint8Array(buf);
  return cache;
}

/** Dateiname für Content-Disposition und E-Mail-Anhang. */
export const EBOOK_FILE_NAME = FILE_NAME;
