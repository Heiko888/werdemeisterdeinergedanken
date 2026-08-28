import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Stripe-Webhook: hält die Mitgliedschaft in Supabase aktuell.
 *
 *   checkout.session.completed   → Mitgliedschaft anlegen/aktivieren,
 *                                  Zugang bereitstellen (Konto + Setzen-Mail).
 *   customer.subscription.*      → Status spiegeln (aktiv / gekündigt / fällig).
 *
 * Signatur wird mit STRIPE_WEBHOOK_SECRET geprüft. Ohne Service-Role-Key wird
 * nur geloggt (kein Schreiben möglich). Der Endpoint muss in Stripe unter
 * „Developers → Webhooks“ auf …/api/stripe/webhook zeigen.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature ?? "", STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("stripe webhook signature error", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await onCheckoutCompleted(stripe, event.data.object);
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await onSubscriptionChanged(event.data.object);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(`stripe webhook handler error (${event.type})`, err);
    return NextResponse.json({ error: "handler_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

/** Neue oder erneuerte Mitgliedschaft nach erfolgreichem Checkout. */
async function onCheckoutCompleted(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
) {
  const email = (
    session.customer_details?.email ??
    session.customer_email ??
    ""
  ).toLowerCase();
  if (!email) return;

  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;

  let status = "active";
  let periodEnd: string | null = null;
  if (subscriptionId) {
    try {
      const sub = await stripe.subscriptions.retrieve(subscriptionId);
      status = sub.status;
      periodEnd = periodEndIso(sub);
    } catch (err) {
      console.error("stripe subscription retrieve failed", err);
    }
  }

  await upsertMembership({
    email,
    status,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    current_period_end: periodEnd,
  });

  // Zugang bereitstellen: Konto anlegen (falls neu) und Setzen-Passwort-Mail
  // schicken. Best-effort – Fehler hier dürfen den Webhook nicht scheitern lassen.
  try {
    await provisionAccess(email);
  } catch (err) {
    console.error("membership provisioning failed", err);
  }
}

/** Status einer Subscription spiegeln (Kündigung, Zahlungsausfall, Reaktivierung). */
async function onSubscriptionChanged(sub: Stripe.Subscription) {
  const admin = createAdminClient();
  if (!admin) return;

  await admin
    .from("memberships")
    .update({
      status: sub.status,
      current_period_end: periodEndIso(sub),
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", sub.id);
}

type MembershipUpsert = {
  email: string;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
};

async function upsertMembership(row: MembershipUpsert) {
  const admin = createAdminClient();
  if (!admin) {
    console.warn("memberships: kein Service-Role-Key – Status nicht gespeichert");
    return;
  }
  const { error } = await admin
    .from("memberships")
    .upsert(
      { ...row, updated_at: new Date().toISOString() },
      { onConflict: "email" },
    );
  if (error) console.error("memberships upsert error", error);
}

/**
 * Legt bei Bedarf ein Supabase-Konto an und schickt eine Mail zum Setzen des
 * Passworts, damit die zahlende Person sich einloggen kann.
 */
async function provisionAccess(email: string) {
  const admin = createAdminClient();
  if (!admin) return;

  // Konto anlegen (idempotent: „already registered“ wird ignoriert).
  const { error: createErr } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  if (createErr && !/(already|exists|registered)/i.test(createErr.message)) {
    console.error("createUser error", createErr);
  }

  // Setzen-/Reset-Link erzeugen und per Resend versenden.
  const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: `${site.url}/login` },
  });
  if (linkErr || !linkData?.properties?.action_link) {
    console.error("generateLink error", linkErr);
    return;
  }

  await sendWelcomeMail(email, linkData.properties.action_link);
}

async function sendWelcomeMail(email: string, actionLink: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from =
    process.env.MEMBERSHIP_FROM ||
    process.env.CONTACT_FROM ||
    "Werde Meister deiner Gedanken <onboarding@resend.dev>";

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: email,
    subject: "Willkommen im Mitgliederbereich – so kommst du rein",
    html: `
      <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;color:#1a2233">
        <h1 style="font-size:22px;margin:0 0 12px">Schön, dass du dabei bist.</h1>
        <p style="line-height:1.6">Deine Mitgliedschaft ist aktiv. Setze jetzt dein Passwort,
        dann kommst du direkt in deinen Bereich mit allen 7 Stufen, Übungen und Vertiefungen.</p>
        <p style="margin:24px 0">
          <a href="${actionLink}" style="display:inline-block;background:#e8c15f;color:#08102a;
          text-decoration:none;padding:12px 22px;border-radius:9999px;font-weight:600">
            Passwort setzen &amp; einloggen
          </a>
        </p>
        <p style="line-height:1.6;color:#626b67;font-size:14px">
        Falls der Button nicht funktioniert, öffne diesen Link:<br>
        <a href="${actionLink}">${actionLink}</a></p>
        <p style="line-height:1.6;color:#626b67;font-size:14px">Herzlich, Heiko</p>
      </div>`,
  });
}

/** ISO-Zeit des Periodenendes – tolerant gegenüber SDK-Feldunterschieden. */
function periodEndIso(sub: Stripe.Subscription): string | null {
  const ts = (sub as unknown as { current_period_end?: number }).current_period_end;
  return typeof ts === "number" ? new Date(ts * 1000).toISOString() : null;
}
