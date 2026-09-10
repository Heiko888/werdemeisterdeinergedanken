import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getBewusstseinsbibliothekHtml } from "@/lib/bewusstseinsbibliothek-file";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Liefert die Bewusstseinsbibliothek als eigenständiges HTML-Dokument – nur für
 * Admins. Es ist ein in sich geschlossenes Artifact (eigenes Layout, Sidebar,
 * Suche, Quellenfilter), daher als vollständige Seite statt eingebettet in die
 * React-Struktur des Mitgliederbereichs.
 *
 * Zugriffsschutz analog zur E-Book-Route (src/app/admin/vorlagen/ebook/route.ts):
 * zusätzlich zum /admin-Schutz im Proxy (src/proxy.ts) wird hier direkt geprüft.
 * Bewusst 404 statt 403: Nicht-Admins erfahren nicht, dass es die Seite gibt.
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

  let html: string;
  try {
    html = getBewusstseinsbibliothekHtml();
  } catch {
    return notFound();
  }

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Interne Admin-Seite – niemals cachen oder ausliefern lassen.
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
