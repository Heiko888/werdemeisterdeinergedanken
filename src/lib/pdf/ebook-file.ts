import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Lädt das fertige, gestaltete E-Book-PDF (public/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf)
 * als Bytes. Das PDF wird als feste Datei ausgeliefert (Markendesign mit
 * Bildern/Schriften), daher nicht mehr zur Laufzeit erzeugt.
 *
 * Wird zur Build-Zeit (statische /ebook-Route) bzw. im E-Mail-Versand gelesen
 * und danach gecacht.
 */
let cache: Uint8Array | undefined;

export function getEbookPdfBytes(): Uint8Array {
  if (cache) return cache;
  const buf = readFileSync(
    join(process.cwd(), "public", "Die-7-Stufen-der-Bewusstseinsentwicklung.pdf"),
  );
  cache = new Uint8Array(buf);
  return cache;
}
