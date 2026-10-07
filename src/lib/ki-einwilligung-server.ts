import { createHash } from "node:crypto";
import type { createClient } from "@/lib/supabase/server";
import {
  KI_EINWILLIGUNG_VERSION,
  einwilligungsWortlaut,
  type KiWerkzeug,
} from "@/lib/ki-einwilligung";

/**
 * Nachweis der Einwilligung (Art. 7 Abs. 1 DSGVO) – server-only.
 *
 * Schreibt VOR jeder Übertragung an Anthropic einen Eintrag in das
 * Append-only-Protokoll `ki_einwilligungen` (Zeitpunkt, Werkzeug,
 * Textversion, SHA-256 des Wortlauts). Die user_id setzt die Datenbank selbst
 * (auth.uid() in `ki_einwilligung_erfassen`), nicht dieser Code.
 *
 * Gibt `false` zurück, wenn der Eintrag nicht geschrieben werden konnte – dann
 * darf NICHTS an die KI gehen (fehlender Nachweis = keine Übertragung).
 * Migration: supabase/migrations/20261007120000_ki_einwilligungen.sql
 */
export async function erfasseKiEinwilligung(
  supabase: Awaited<ReturnType<typeof createClient>>,
  werkzeug: KiWerkzeug,
): Promise<boolean> {
  const textSha256 = createHash("sha256")
    .update(einwilligungsWortlaut(werkzeug), "utf8")
    .digest("hex");

  const { error } = await supabase.rpc("ki_einwilligung_erfassen", {
    p_werkzeug: werkzeug,
    p_text_version: KI_EINWILLIGUNG_VERSION,
    p_text_sha256: textSha256,
  });

  if (error) {
    console.error(`[ki-einwilligung] Nachweis (${werkzeug}) nicht gespeichert:`, error);
    return false;
  }
  return true;
}
