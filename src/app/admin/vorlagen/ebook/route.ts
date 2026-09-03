import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getEbookPdfBytes, EBOOK_FILE_NAME } from "@/lib/pdf/ebook-file";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Liefert das Lead-Magnet-E-Book an Admins – für die Vorlagen-Übersicht unter
 * /admin/vorlagen, die das erzeugte PDF zum Nachsehen verlinkt.
 *
 * Nötig, seit das PDF unter content/pdf/ statt public/ liegt (sonst wäre es
 * für alle frei abrufbar, siehe src/lib/pdf/ebook-file.ts). Der öffentliche
 * Weg /ebook verlangt ein Lead-Token – das hat ein Admin nicht, deshalb hier
 * eine eigene, an die Anmeldung gebundene Route. Anders als die Vorlagen-
 * Route nimmt sie keinen Pfad entgegen: es gibt genau diese eine Datei, damit
 * stellt sich die Frage nach Directory-Traversal gar nicht erst.
 *
 * Bewusst 404 statt 403: Nicht-Admins erfahren nicht, dass es die Datei gibt.
 */
function notFound() {
  return new Response("Nicht gefunden", { status: 404 });
}

export async function GET() {
  // Ohne Supabase gibt es keine Anmeldung – dann lieber gar nichts ausliefern.
  if (!isSupabaseConfigured) return notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) return notFound();

  let pdf: Uint8Array;
  try {
    pdf = getEbookPdfBytes();
  } catch {
    return notFound();
  }

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${EBOOK_FILE_NAME}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
