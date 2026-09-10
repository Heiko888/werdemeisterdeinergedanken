import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Lädt das fertige HTML der Bewusstseinsbibliothek (content/admin/…). Es ist
 * ein in sich geschlossenes Artifact mit eigenem Layout, eigenen Styles und
 * eigenem Filter-/Such-Script – deshalb liefern wir es als komplettes HTML-
 * Dokument aus (siehe Route unter /admin/bewusstseinsbibliothek) statt es in
 * die React-Seitenstruktur einzubetten.
 *
 * WICHTIG: Die Datei liegt bewusst unter `content/` und NICHT unter `public/`.
 * Alles unter public/ liefert Next.js zusätzlich direkt unter seinem Dateipfad
 * aus – an jeder Anmelde-/Admin-Prüfung vorbei. Unter content/ ist die Datei
 * nur über die geschützte Route erreichbar (analog zu den Mitglieder-PDFs,
 * siehe src/lib/pdf/ebook-file.ts). Das Verzeichnis wird im Dockerfile mit ins
 * Laufzeit-Image kopiert (COPY --from=builder /app/content ./content).
 */
const FILE_PATH = ["content", "admin", "bewusstseinsbibliothek.html"] as const;

let cache: string | undefined;

export function getBewusstseinsbibliothekHtml(): string {
  if (cache) return cache;
  cache = readFileSync(join(process.cwd(), ...FILE_PATH), "utf8");
  return cache;
}
