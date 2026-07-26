import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { site } from "@/lib/site";
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
} from "@/lib/supabase/config";

// In Next.js 16 heißt „Middleware“ jetzt „Proxy“ (gleiche Funktion, neuer Name).
// Diese Datei ersetzt das frühere src/middleware.ts.

/** Kanonischer Host (aus der zentralen Konfiguration): www.werdemeisterdeinergedanken.de */
const CANONICAL_HOST = new URL(site.url).host;

/**
 * Hosts, die dauerhaft (301) auf den kanonischen Host umgeleitet werden.
 * - nackte Domain (Apex) → www
 * - frühere Test-Domain „neu“ → www
 * Erweiterbar, falls weitere Alt-/Test-Hosts hinzukommen.
 */
const REDIRECT_TO_CANONICAL = new Set<string>([
  "werdemeisterdeinergedanken.de",
  "neu.werdemeisterdeinergedanken.de",
]);

/** Reinen Hostnamen (ohne Port) aus den Request-Headern lesen – hinter nginx via x-forwarded-host. */
function requestHost(request: NextRequest): string {
  const raw =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  return raw.split(",")[0].trim().split(":")[0].toLowerCase();
}

/**
 * Erzwingt den kanonischen Host: Apex + Test-Domain → https://www.…
 * Läuft identisch auf Vercel wie auf dem Hetzner-nginx (portabler Sicherheitsgurt
 * zusätzlich zur nginx-Umleitung). Über ENFORCE_CANONICAL_HOST=false abschaltbar,
 * z. B. während der Umbauphase, bevor www live ist.
 */
function canonicalHostRedirect(request: NextRequest): NextResponse | null {
  if (process.env.ENFORCE_CANONICAL_HOST === "false") return null;

  const host = requestHost(request);
  if (!host || !REDIRECT_TO_CANONICAL.has(host)) return null;

  const target = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    `https://${CANONICAL_HOST}`,
  );
  return NextResponse.redirect(target, 301);
}

/**
 * Alles außer dem kanonischen Host aus dem Suchindex halten
 * (z. B. Vercel-Preview *.vercel.app). Verhindert Duplicate Content,
 * bevor die Domain final auf www steht.
 */
function markNonCanonicalNoindex(
  request: NextRequest,
  response: NextResponse,
): void {
  const host = requestHost(request);
  if (host && host !== CANONICAL_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
}

/** Session-Refresh + Schutz von /mitglieder. Supabase wird nur auf den relevanten Pfaden angefragt. */
async function withAuth(request: NextRequest): Promise<NextResponse> {
  const path = request.nextUrl.pathname;
  const isAuthPath = path.startsWith("/mitglieder") || path === "/login";

  // Kein Auth-Pfad, Login-Schutz aus oder Supabase nicht konfiguriert → nichts tun.
  if (!isAuthPath || !REQUIRE_MEMBER_LOGIN || !isSupabaseConfigured) {
    return NextResponse.next({ request });
  }

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

export async function proxy(request: NextRequest) {
  // 1) Kanonischen Host erzwingen (Apex + neu → www)
  const hostRedirect = canonicalHostRedirect(request);
  if (hostRedirect) return hostRedirect;

  // 2) Auth / Session
  const response = await withAuth(request);

  // 3) Nicht-kanonische Hosts (Vercel-Preview o. Ä.) aus dem Index halten
  markNonCanonicalNoindex(request, response);
  return response;
}

export const config = {
  // Läuft auf allen Seiten-Routen (für Host-Kanonisierung + noindex),
  // ausgenommen API, statische Dateien und Metadaten.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
