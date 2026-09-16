import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendBuchPdfMail, sendBuchPrintOrderMail } from "@/lib/buch-mail";
import { createBuchDownloadToken, buchDownloadUrl } from "@/lib/buch-download";
import { site } from "@/lib/site";

/** Metadaten-Kennung des Buch-Einmalkaufs (siehe /api/buch-checkout). */
const BUCH_PRODUKT = "buch-werde-meister-deiner-gedanken";

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

  // Buch-Einmalkauf: eigener Zweig – KEINE Mitgliedschaft, KEIN Konto anlegen.
  if (session.metadata?.produkt === BUCH_PRODUKT) {
    await onBookPurchase(session, email);
    return;
  }

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
    const userId = await provisionAccess(email);
    // Mitgliedschaft fest ans Konto koppeln (B3): so bleibt der Zugang auch bei
    // späterer E-Mail-Änderung erhalten.
    if (userId) await linkMembershipUser(email, userId);
  } catch (err) {
    console.error("membership provisioning failed", err);
  }
}

/** Verknüpft die (per E-Mail angelegte) Mitgliedschaft mit dem auth-Konto. */
async function linkMembershipUser(email: string, userId: string) {
  const admin = createAdminClient();
  if (!admin) return;
  const { error } = await admin
    .from("memberships")
    .update({ user_id: userId })
    .eq("email", email);
  if (error) console.error("membership user link error", error);
}

/**
 * Zustellung nach einem Buch-Einmalkauf.
 *   • edition „pdf"  → Buch als PDF-Anhang per E-Mail (automatische Lieferung).
 *   • edition „print" → Bestellbestätigung (Versand erfolgt manuell).
 *
 * Fehler werden bewusst NICHT verschluckt: schlägt der Versand fehl, endet der
 * Webhook mit 500 und Stripe stellt erneut zu – so geht keine Lieferung verloren.
 */
async function onBookPurchase(session: Stripe.Checkout.Session, email: string) {
  // Nur bei tatsächlich bezahltem Kauf ausliefern (z. B. nicht bei noch
  // offenen, asynchronen Zahlungsmethoden).
  const paid =
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required";
  if (!paid) return;

  const edition = session.metadata?.edition === "print" ? "print" : "pdf";

  // Bestellung protokollieren (Übersicht unter /admin/bestellungen).
  // Best effort und idempotent – darf die Auslieferung niemals blockieren.
  await recordBookOrder(session, email, edition);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("buch delivery: kein RESEND_API_KEY – Zustellung übersprungen");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  if (edition === "print") {
    await sendBuchPrintOrderMail(resend, email);
  } else {
    // Signierter, 30 Tage gültiger Download-Link (null, falls kein Secret gesetzt
    // → Mail fällt auf den PDF-Anhang zurück).
    const token = createBuchDownloadToken();
    const url = token ? buchDownloadUrl(token) : null;
    await sendBuchPdfMail(resend, email, url);
  }
}

/**
 * Buch-Bestellung in Supabase protokollieren (Übersicht unter
 * /admin/bestellungen). Idempotent über die Stripe-Session-ID: eine erneute
 * Zustellung desselben Events legt keinen zweiten Eintrag an. Best effort –
 * Fehler (fehlende Tabelle / kein Service-Role-Key) werden nur geloggt und
 * dürfen die Auslieferung nicht verhindern.
 */
async function recordBookOrder(
  session: Stripe.Checkout.Session,
  email: string,
  edition: "pdf" | "print",
) {
  const admin = createAdminClient();
  if (!admin) return;

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id ?? null;

  // Lieferadresse (nur Print) tolerant auslesen – je nach Stripe-SDK-Version
  // unter shipping_details oder collected_information.shipping_details.
  const shipping =
    (session as unknown as { shipping_details?: ShippingLike }).shipping_details ??
    (
      session as unknown as {
        collected_information?: { shipping_details?: ShippingLike };
      }
    ).collected_information?.shipping_details ??
    null;

  try {
    const { error } = await admin.from("book_orders").upsert(
      {
        email,
        edition,
        amount_total: session.amount_total ?? null,
        currency: session.currency ?? null,
        stripe_session_id: session.id,
        stripe_customer_id: customerId,
        status: "bezahlt",
        shipping_name: shipping?.name ?? null,
        shipping_address: formatAddress(shipping?.address),
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true },
    );
    if (error) console.error("book_orders insert error", error);
  } catch (err) {
    console.error("book_orders insert failed", err);
  }
}

type ShippingLike = {
  name?: string | null;
  address?: {
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
  } | null;
};

function formatAddress(a?: ShippingLike["address"]): string | null {
  if (!a) return null;
  const parts = [
    a.line1,
    a.line2,
    [a.postal_code, a.city].filter(Boolean).join(" "),
    a.state,
    a.country,
  ].filter((p) => p && String(p).trim());
  return parts.length ? parts.join(", ") : null;
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
 *
 * Gibt die auth-User-ID zurück (für die Kopplung der Mitgliedschaft, B3) –
 * `null`, wenn nicht konfiguriert oder die ID nicht ermittelbar war.
 */
async function provisionAccess(email: string): Promise<string | null> {
  const admin = createAdminClient();
  if (!admin) return null;

  // Konto anlegen (idempotent: „already registered“ wird ignoriert).
  const { error: createErr } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  if (createErr && !/(already|exists|registered)/i.test(createErr.message)) {
    console.error("createUser error", createErr);
  }

  // Setzen-/Reset-Link erzeugen und per Resend versenden. Die Antwort enthält
  // auch das User-Objekt – unabhängig davon, ob das Konto neu oder schon da war.
  const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
    type: "recovery",
    email,
    options: { redirectTo: `${site.url}/login` },
  });
  if (linkErr || !linkData?.properties?.action_link) {
    console.error("generateLink error", linkErr);
    return linkData?.user?.id ?? null;
  }

  await sendWelcomeMail(email, linkData.properties.action_link);
  return linkData.user?.id ?? null;
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
