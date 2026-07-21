import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Lädt das Logo (public/logo-brain.png) als Bytes für die PDF-Einbettung.
 * Wird zur Build-Zeit gelesen (die PDF-Routen werden statisch vorgeneriert),
 * daher ist die Datei zuverlässig verfügbar. Schlägt das Lesen fehl, wird
 * das PDF einfach ohne Logo erzeugt.
 */
let cache: Uint8Array | null | undefined;

export function getLogoBytes(): Uint8Array | undefined {
  if (cache !== undefined) return cache ?? undefined;
  try {
    const buf = readFileSync(join(process.cwd(), "public", "logo-brain.png"));
    cache = new Uint8Array(buf);
  } catch {
    cache = null;
  }
  return cache ?? undefined;
}
