import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Liest ein fertig gestaltetes Mitglieder-PDF aus content/pdf/<name>.pdf.
 *
 * Die Mitglieder-Dokumente (Arbeitsheft, Lektionen, Übungsblätter,
 * Vertiefungen) sind im Markendesign gestaltete, feste Dateien – daher
 * werden sie ausgeliefert statt zur Laufzeit erzeugt. Ergebnis wird gecacht.
 * Gibt null zurück, falls die Datei fehlt (Route antwortet dann mit 404).
 *
 * WICHTIG: Das Verzeichnis heißt bewusst `content/` und NICHT `public/`.
 * Alles unter public/ liefert Next.js zusätzlich direkt unter seinem
 * Dateipfad aus – an der Middleware vorbei. Lägen die Dateien dort, wäre
 * der Login-Schutz wirkungslos: /pdf/arbeitsheft.pdf wäre frei abrufbar.
 * Das Verzeichnis muss im Dockerfile mit ins Laufzeit-Image kopiert werden.
 */
const cache = new Map<string, Uint8Array>();

function pdfPath(name: string): string {
  return join(process.cwd(), "content", "pdf", `${name}.pdf`);
}

export function getStaticPdf(name: string): Uint8Array | null {
  const cached = cache.get(name);
  if (cached) return cached;
  try {
    const buf = readFileSync(pdfPath(name));
    const bytes = new Uint8Array(buf);
    cache.set(name, bytes);
    return bytes;
  } catch {
    return null;
  }
}

/**
 * Prüft, ob es das PDF gibt – ohne es zu laden.
 *
 * Nötig, weil Inhalte (z. B. neue Vertiefungen) im Code stehen können, bevor
 * das gestaltete PDF erzeugt wurde. Seiten blenden den Download-Knopf sonst
 * ein und der Klick landet auf einem 404.
 */
export function hasStaticPdf(name: string): boolean {
  return cache.has(name) || existsSync(pdfPath(name));
}
