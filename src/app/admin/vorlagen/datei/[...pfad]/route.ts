import { readFile } from "node:fs/promises";
import { basename, extname, join, normalize } from "node:path";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";

/**
 * Liefert eine Vorlagen-Datei aus content/vorlagen/ – aber nur an Admins.
 *
 * WICHTIG: Die Dateien liegen bewusst unter `content/` und NICHT unter
 * `public/`. Alles unter public/ liefert Next.js zusätzlich direkt unter
 * seinem Dateipfad aus – an jeder Prüfung vorbei. Lägen die Workshop-
 * Workbooks, Moderationspläne und PPTX-Vorlagen dort, wäre der Admin-Schutz
 * der Galerie wirkungslos. Das Verzeichnis muss im Dockerfile mit ins
 * Laufzeit-Image kopiert werden (das gilt für content/ bereits).
 *
 * Die Galerie unter /admin/vorlagen verlinkt hierher – auch die
 * Vorschaubilder, die als <img src="…"> geladen werden und die Session-
 * Cookies also mitschicken.
 */

const ROOT = join(process.cwd(), "content", "vorlagen");

/** Nur diese Typen werden ausgeliefert – alles andere gibt es nicht. */
const TYPES: Record<string, string> = {
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

/** Einheitliche Antwort für „nicht erlaubt" und „gibt es nicht". */
function notFound() {
  return new Response("Nicht gefunden", { status: 404 });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ pfad: string[] }> },
) {
  // Ohne Supabase gibt es keine Anmeldung – dann lieber gar nichts ausliefern.
  if (!isSupabaseConfigured) return notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Bewusst 404 statt 403: Nicht-Admins erfahren nicht einmal, dass es die
  // Datei gibt.
  if (!user || !isAdminEmail(user.email)) return notFound();

  const { pfad } = await params;
  const relative = normalize(pfad.join("/"));
  // Ausbruch aus dem Verzeichnis verhindern (../, absolute Pfade, Nullbytes).
  if (
    relative.startsWith(".") ||
    relative.startsWith("/") ||
    relative.includes("\0")
  ) {
    return notFound();
  }

  const type = TYPES[extname(relative).toLowerCase()];
  if (!type) return notFound();

  const file = join(ROOT, relative);
  if (!file.startsWith(`${ROOT}/`)) return notFound();

  let bytes: Uint8Array;
  try {
    bytes = new Uint8Array(await readFile(file));
  } catch {
    return notFound();
  }

  const name = basename(relative);
  const disposition = INLINE.has(extname(relative).toLowerCase())
    ? "inline"
    : "attachment";

  return new Response(bytes as BodyInit, {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `${disposition}; filename="${name}"`,
      // `private`, damit Proxys/CDN die Datei nicht für andere zwischenspeichern.
      "Cache-Control": "private, no-store",
    },
  });
}
