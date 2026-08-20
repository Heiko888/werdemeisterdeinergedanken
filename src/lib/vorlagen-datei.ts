import { basename, extname, join, normalize } from "node:path";

/**
 * Sicheres Auflösen eines angeforderten Vorlagen-Pfads.
 *
 * Diese reine Funktion enthält die sicherheitskritische Logik der Route
 * `/admin/vorlagen/datei/[...pfad]`: Sie verhindert den Ausbruch aus dem
 * Vorlagen-Verzeichnis (Directory Traversal) und lässt nur erlaubte Dateitypen
 * zu. Bewusst ohne IO/Next-Abhängigkeiten, damit sie unabhängig testbar ist
 * (siehe vorlagen-datei.test.ts).
 */

/** Nur diese Typen werden ausgeliefert – alles andere gibt es nicht. */
export const VORLAGEN_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".zip": "application/zip",
};

/** Bilder direkt anzeigen, Dokumente herunterladen. */
const INLINE = new Set([".webp", ".png", ".jpg", ".jpeg", ".svg"]);

export type ResolvedVorlage = {
  /** Absoluter Pfad der aufzulösenden Datei (garantiert unterhalb von `root`). */
  file: string;
  /** Reiner Dateiname für den Content-Disposition-Header. */
  name: string;
  /** MIME-Typ. */
  type: string;
  /** Ob die Datei inline angezeigt oder heruntergeladen wird. */
  disposition: "inline" | "attachment";
};

/**
 * Prüft die angeforderten Pfad-Segmente gegen das Wurzelverzeichnis `root`.
 * Gibt die aufzulösende Datei zurück – oder `null`, wenn der Pfad unzulässig
 * ist (Ausbruch via `../`, absoluter Pfad, Nullbyte) oder der Dateityp nicht
 * erlaubt ist. `root` muss ein absoluter Pfad ohne abschließenden Slash sein.
 */
export function resolveVorlagenFile(
  pfadSegmente: string[],
  root: string,
): ResolvedVorlage | null {
  const relative = normalize(pfadSegmente.join("/"));

  // Ausbruch aus dem Verzeichnis verhindern (../, absolute Pfade, Nullbytes).
  if (
    relative.startsWith(".") ||
    relative.startsWith("/") ||
    relative.includes("\0")
  ) {
    return null;
  }

  const ext = extname(relative).toLowerCase();
  const type = VORLAGEN_TYPES[ext];
  if (!type) return null;

  const file = join(root, relative);
  // Zweiter Sicherheitsgurt: Die aufgelöste Datei muss echt unterhalb von root
  // liegen.
  if (!file.startsWith(`${root}/`)) return null;

  return {
    file,
    name: basename(relative),
    type,
    disposition: INLINE.has(ext) ? "inline" : "attachment",
  };
}
