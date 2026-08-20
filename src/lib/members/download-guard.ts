import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
  REQUIRE_ACTIVE_MEMBERSHIP,
} from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { isActiveMember } from "@/lib/membership";

/**
 * Zugriffsschutz für Datei-Downloads (route.ts) im Mitgliederbereich.
 *
 * Zweite Schutzschicht neben dem Proxy (Defense-in-Depth): Route-Handler werden
 * – anders als Seiten – von KEINEM Layout umschlossen. Deshalb greift hier weder
 * der Login-Check noch die optionale Bezahlschranke aus `mitglieder/layout.tsx`.
 * Dieselbe Logik wird darum direkt im Handler ausgeführt, damit die PDFs nicht
 * allein vom Proxy abhängen (dessen Matcher könnte sich künftig ändern) und
 * damit bei aktiver Bezahlschranke kein eingeloggter Nicht-Zahler die Dateien
 * per Direktlink zieht.
 *
 * Rückgabe: `null` → Zugriff erlaubt; sonst eine Redirect-Response, die der
 * Handler unverändert zurückgeben muss.
 */
export async function guardMemberDownload(
  request: Request,
): Promise<Response | null> {
  // Ohne konfigurierte Supabase-Instanz bzw. bei ausgeschaltetem Login-Schutz
  // verhält sich der Download wie bisher (kein Schutz erzwingbar).
  if (!isSupabaseConfigured || !REQUIRE_MEMBER_LOGIN) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = new URL(request.url);
  const here = `${url.pathname}${url.search}`;

  // Nicht angemeldet → zum Login, mit Rücksprung auf die angeforderte Datei.
  if (!user) {
    return Response.redirect(
      new URL(`/login?redirect=${encodeURIComponent(here)}`, request.url),
      303,
    );
  }

  // Optionale Bezahlschranke: aktive Mitgliedschaft oder Admin.
  if (REQUIRE_ACTIVE_MEMBERSHIP && !isAdminEmail(user.email)) {
    const active = await isActiveMember(user.email);
    if (!active) {
      return Response.redirect(
        new URL("/mitgliedschaft?zugang=abo", request.url),
        303,
      );
    }
  }

  return null;
}
