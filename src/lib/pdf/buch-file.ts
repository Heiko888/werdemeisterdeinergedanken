import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Lädt das fertige, gestaltete Buch-PDF „Werde Meister deiner Gedanken"
 * (content/pdf/…) als Bytes – für die automatische Zustellung nach dem Kauf
 * der PDF-Edition (siehe src/lib/buch-mail.ts, ausgelöst vom Stripe-Webhook).
 *
 * WICHTIG: Die Datei liegt bewusst unter `content/` und NICHT unter `public/`.
 * Alles unter public/ liefert Next.js zusätzlich direkt unter seinem Dateipfad
 * aus – an jeder Prüfung vorbei. Das (bezahlte) Buch wäre dort frei abrufbar.
 * Siehe auch src/lib/pdf/ebook-file.ts. Das Verzeichnis wird im Dockerfile mit
 * ins Laufzeit-Image kopiert (COPY --from=builder /app/content ./content).
 */
const FILE_NAME = "Werde-Meister-deiner-Gedanken.pdf";

let cache: Uint8Array | undefined;

export function getBuchPdfBytes(): Uint8Array {
  if (cache) return cache;
  const buf = readFileSync(join(process.cwd(), "content", "pdf", FILE_NAME));
  cache = new Uint8Array(buf);
  return cache;
}

/** Dateiname für den E-Mail-Anhang. */
export const BUCH_FILE_NAME = FILE_NAME;
