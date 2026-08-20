import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { safeInternalPath } from "@/lib/safe-redirect";

/** Verarbeitet den Link aus der Bestätigungs-E-Mail und setzt die Session. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Nur interne Pfade zulassen – schützt vor Open-Redirect-Phishing über
  // einen präparierten `next`-Parameter im Bestätigungslink.
  const next = safeInternalPath(searchParams.get("next"));

  if (code && isSupabaseConfigured) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=bestaetigung`);
}
