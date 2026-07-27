import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Liest ein fertig gestaltetes Mitglieder-PDF aus public/pdf/<name>.pdf.
 *
 * Die Mitglieder-Dokumente (Arbeitsheft, Lektionen, Übungsblätter,
 * Vertiefungen) sind im Markendesign gestaltete, feste Dateien – daher
 * werden sie ausgeliefert statt zur Laufzeit erzeugt. Ergebnis wird gecacht.
 * Gibt null zurück, falls die Datei fehlt (Route antwortet dann mit 404).
 */
const cache = new Map<string, Uint8Array>();

export function getStaticPdf(name: string): Uint8Array | null {
  const cached = cache.get(name);
  if (cached) return cached;
  try {
    const buf = readFileSync(join(process.cwd(), "public", "pdf", `${name}.pdf`));
    const bytes = new Uint8Array(buf);
    cache.set(name, bytes);
    return bytes;
  } catch {
    return null;
  }
}
