"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { sendTestImpulse } from "@/lib/impulse-mailer";

/**
 * Server-Action hinter dem Button „Testimpuls senden" (/admin/impulse).
 *
 * Der Versand selbst liegt in `sendTestImpulse` (src/lib/impulse-mailer.ts) und
 * ist mit dem Serienversand identisch, schreibt aber KEINE Zähler fort und liest
 * KEINE Empfängerlisten. Zugriff nur für angemeldete Admins – der öffentliche
 * Cron-Weg braucht weiterhin das CRON_SECRET.
 */

export type SendResult =
  | { ok: true; to: string; subject: string; impulseIndex: number }
  | { ok: false; error: string };

export async function sendTestImpulseAction(
  email: string,
  impulseIndex: number,
): Promise<SendResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "Supabase ist nicht konfiguriert." };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht angemeldet." };
  if (!isAdminEmail(user.email)) return { ok: false, error: "Kein Admin-Zugriff." };

  const res = await sendTestImpulse(email, impulseIndex);
  if (!res.ok) return { ok: false, error: res.error };
  return {
    ok: true,
    to: res.to,
    subject: res.subject,
    impulseIndex: res.impulseIndex,
  };
}
