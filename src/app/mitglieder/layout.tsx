import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
  REQUIRE_ACTIVE_MEMBERSHIP,
} from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { isActiveMember } from "@/lib/membership";

/**
 * Zweite Schutzschicht für den Mitgliederbereich (Defense-in-Depth).
 *
 * Der eigentliche Login-Schutz liegt zentral in `src/proxy.ts`. Dieses Layout
 * prüft die Anmeldung zusätzlich direkt auf Seiten-Ebene – falls der Proxy
 * durch eine spätere Änderung einmal nicht greift, bleiben die Inhalte trotzdem
 * geschützt. Empfehlung aus dem Next.js-Sicherheitsleitfaden: Autorisierung
 * nicht allein der Middleware/dem Proxy überlassen.
 *
 * Bezahlschranke (optional, über REQUIRE_ACTIVE_MEMBERSHIP=true): Zusätzlich
 * zum Login ist dann eine aktive Stripe-Mitgliedschaft nötig. Admins kommen
 * immer rein. Standardmäßig aus, damit bestehende Zugänge nicht brechen.
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

    // Optionale Bezahlschranke: aktive Mitgliedschaft oder Admin.
    if (REQUIRE_ACTIVE_MEMBERSHIP && !isAdminEmail(user.email)) {
      const active = await isActiveMember(user.email);
      if (!active) redirect("/mitgliedschaft?zugang=abo");
    }
  }

  return <>{children}</>;
}
