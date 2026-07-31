import { createAdminClient } from "@/lib/supabase/admin";
import { ACTIVE_MEMBERSHIP_STATES } from "@/lib/stripe";

/**
 * Mitgliedschafts-Status pro E-Mail (wird vom Stripe-Webhook gepflegt).
 * Gelesen über den Service-Role-Client, daher nur serverseitig verwenden.
 */

export type MembershipRow = {
  email: string;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
};

/** Liest die Mitgliedschaft zu einer E-Mail – `null`, wenn nicht vorhanden/konfiguriert. */
export async function getMembership(
  email: string | null | undefined,
): Promise<MembershipRow | null> {
  if (!email) return null;
  const admin = createAdminClient();
  if (!admin) return null;

  const { data } = await admin
    .from("memberships")
    .select("email, status, stripe_customer_id, stripe_subscription_id, current_period_end")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  return (data as MembershipRow) ?? null;
}

/** True, wenn zur E-Mail eine aktive (oder Test-)Mitgliedschaft vorliegt. */
export async function isActiveMember(
  email: string | null | undefined,
): Promise<boolean> {
  const m = await getMembership(email);
  return Boolean(m && ACTIVE_MEMBERSHIP_STATES.has(m.status));
}
