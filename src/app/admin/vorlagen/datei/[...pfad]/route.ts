import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { resolveVorlagenFile } from "@/lib/vorlagen-datei";

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
  // Pfad-Sicherheit (Directory-Traversal-Schutz + Typ-Whitelist) in einer
  // reinen, separat getesteten Funktion – siehe src/lib/vorlagen-datei.ts.
  const resolved = resolveVorlagenFile(pfad, ROOT);
  if (!resolved) return notFound();

  let bytes: Uint8Array;
  try {
    bytes = new Uint8Array(await readFile(resolved.file));
  } catch {
    return notFound();
  }

  return new Response(bytes as BodyInit, {
    headers: {
      "Content-Type": resolved.type,
      "Content-Disposition": `${resolved.disposition}; filename="${resolved.name}"`,
      // `private`, damit Proxys/CDN die Datei nicht für andere zwischenspeichern.
      "Cache-Control": "private, no-store",
    },
  });
}
