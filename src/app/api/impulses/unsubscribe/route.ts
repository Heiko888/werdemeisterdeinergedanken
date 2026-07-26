import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 1-Klick-Abmeldung von den E-Mail-Impulsen (DSGVO).
 * Öffentlich erreichbar über den Token aus dem Abmeldelink der E-Mail –
 * keine Anmeldung nötig. Setzt newsletter_opt_in via Service-Role-Key.
 */

function htmlPage(title: string, message: string, status = 200) {
  const body = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1.5rem;line-height:1.6;color:#1a2233"><h1 style="font-size:1.4rem;margin-bottom:.75rem">${title}</h1><p style="color:#4a5568">${message}</p></body></html>`;
  return new NextResponse(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return htmlPage(
      "Link unvollständig",
      "Der Abmeldelink ist nicht vollständig. Bitte nutze den Link aus der E-Mail unverändert.",
      400,
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return htmlPage(
      "Gerade nicht möglich",
      "Die Abmeldung ist momentan nicht möglich. Bitte versuch es später noch einmal.",
      503,
    );
  }

  const { data, error } = await admin
    .from("profiles")
    .update({ newsletter_opt_in: false, newsletter_opted_in_at: null })
    .eq("unsubscribe_token", token)
    .select("id");

  if (error || !data || data.length === 0) {
    return htmlPage(
      "Link ungültig oder bereits abgemeldet",
      "Wir konnten kein passendes Abo finden – möglicherweise bist du bereits abgemeldet.",
      404,
    );
  }

  return htmlPage(
    "Erfolgreich abgemeldet",
    "Du erhältst keine wöchentlichen Impulse mehr. Du kannst sie jederzeit wieder in deinem Bereich aktivieren.",
  );
}
