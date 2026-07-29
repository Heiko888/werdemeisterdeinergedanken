import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, REQUIRE_MEMBER_LOGIN } from "@/lib/supabase/config";

/**
 * Zweite Schutzschicht für den Mitgliederbereich (Defense-in-Depth).
 *
 * Der eigentliche Login-Schutz liegt zentral in `src/proxy.ts`. Dieses Layout
 * prüft die Anmeldung zusätzlich direkt auf Seiten-Ebene – falls der Proxy
 * durch eine spätere Änderung einmal nicht greift, bleiben die Inhalte trotzdem
 * geschützt. Empfehlung aus dem Next.js-Sicherheitsleitfaden: Autorisierung
 * nicht allein der Middleware/dem Proxy überlassen.
 *
 * Hinweis: Reine Datei-Downloads liegen als Route-Handler (`route.ts`) und
 * werden von einem Layout nicht umschlossen – deren Schutz bleibt beim Proxy.
 */
export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isSupabaseConfigured && REQUIRE_MEMBER_LOGIN) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login?redirect=/mitglieder");
  }

  return <>{children}</>;
}
