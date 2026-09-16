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
  user_id: string | null;
};

const SELECT_COLS =
  "email, status, stripe_customer_id, stripe_subscription_id, current_period_end, user_id";

/** Liest die Mitgliedschaft zu einer E-Mail – `null`, wenn nicht vorhanden/konfiguriert. */
export async function getMembership(
  email: string | null | undefined,
): Promise<MembershipRow | null> {
  if (!email) return null;
  const admin = createAdminClient();
  if (!admin) return null;

  const { data } = await admin
    .from("memberships")
    .select(SELECT_COLS)
    .eq("email", email.toLowerCase())
    .maybeSingle();

  return (data as MembershipRow) ?? null;
}

/**
 * Liest die Mitgliedschaft eines Kontos – stabil über `user_id`, mit Fallback
 * auf die E-Mail. So bleibt der Zugang erhalten, wenn der Kunde später eine
 * andere/geänderte E-Mail nutzt (B3).
 */
export async function getMembershipForUser(user: {
  id?: string | null;
  email?: string | null;
}): Promise<MembershipRow | null> {
  const admin = createAdminClient();
  if (!admin) return null;

  if (user.id) {
    const { data } = await admin
      .from("memberships")
      .select(SELECT_COLS)
      .eq("user_id", user.id)
      .maybeSingle();
    if (data) return data as MembershipRow;
  }

  return getMembership(user.email);
}

/** True, wenn zur E-Mail eine aktive (oder Test-)Mitgliedschaft vorliegt. */
export async function isActiveMember(
  email: string | null | undefined,
): Promise<boolean> {
  const m = await getMembership(email);
  return Boolean(m && ACTIVE_MEMBERSHIP_STATES.has(m.status));
}

/** Wie `isActiveMember`, aber kontostabil über `user_id` (Fallback E-Mail). */
export async function isActiveMemberForUser(user: {
  id?: string | null;
  email?: string | null;
}): Promise<boolean> {
  const m = await getMembershipForUser(user);
  return Boolean(m && ACTIVE_MEMBERSHIP_STATES.has(m.status));
}
