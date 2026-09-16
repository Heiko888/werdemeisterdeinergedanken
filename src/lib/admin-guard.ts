/**
 * Admin-Schutz für Server-Komponenten und Route-Handler.
 *
 * Zweistufig – wie in den bestehenden Admin-Seiten:
 *   1. Supabase muss konfiguriert sein (sonst kein Login möglich).
 *   2. Der angemeldete Nutzer muss eine Admin-Adresse haben (isAdminEmail).
 * Der zusätzliche DB-Check (RLS `ist_admin()`) bleibt in den Seiten, die auf
 * RLS-geschützte Tabellen zugreifen.
 */
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";

/** true, wenn der aktuelle Request von einem Admin kommt (für Route-Handler). */
export async function isRequestAdmin(): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return isAdminEmail(user?.email);
}
