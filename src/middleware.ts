import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
} from "@/lib/supabase/config";

export async function middleware(request: NextRequest) {
  // Login-Schutz deaktiviert oder Supabase nicht konfiguriert → nichts tun.
  if (!REQUIRE_MEMBER_LOGIN || !isSupabaseConfigured) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // Geschützt: /mitglieder → ohne Login weiter zur Anmeldung
  if (!user && path.startsWith("/mitglieder")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // Bereits eingeloggt und auf /login → direkt ins Dashboard
  if (user && path === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/mitglieder";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/mitglieder/:path*", "/login"],
};
