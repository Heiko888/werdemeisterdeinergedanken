import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

/**
 * Supabase-Client mit Service-Role-Key – umgeht Row-Level-Security.
 *
 * NUR serverseitig und ausschließlich in geschützten Routen verwenden
 * (z. B. der Cron-Route für den Impuls-Versand). Der Key darf niemals an den
 * Browser gelangen: er steht bewusst nicht unter NEXT_PUBLIC_*.
 *
 * Gibt `null` zurück, wenn die nötigen Variablen fehlen – die Aufrufer
 * behandeln das als „nicht konfiguriert".
 */
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !serviceKey) return null;

  return createClient(SUPABASE_URL, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
