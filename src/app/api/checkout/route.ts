import { NextResponse } from "next/server";
import { getStripe, STRIPE_PRICE_ID } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Startet den Stripe-Checkout für die Abo-Mitgliedschaft.
 *
 * Ablauf:
 *   1. Ist Stripe nicht eingerichtet (kein Key/Preis) → sanfter Fallback aufs
 *      Kontaktformular, damit der Button nie ins Leere läuft.
 *   2. Eine bestehende Anmeldung wird – falls vorhanden – mit der Checkout-
 *      Session verknüpft (customer_email + Metadaten), ist aber nicht Pflicht:
 *      Wer noch kein Konto hat, kann trotzdem bezahlen; der Webhook legt danach
 *      den Zugang an.
 *   3. Weiterleitung (303) auf die gehostete Stripe-Bezahlseite.
 */
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const stripe = getStripe();

  if (!stripe || !STRIPE_PRICE_ID) {
    return NextResponse.redirect(`${origin}/kontakt?thema=mitgliedschaft`, 303);
  }

  // Optionale Verknüpfung mit einer bestehenden Anmeldung.
  let email: string | undefined;
  let userId: string | undefined;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      email = user.email ?? undefined;
      userId = user.id;
    }
  } catch {
    // Ohne Supabase-Session ist Gast-Checkout weiterhin möglich.
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_email: email,
      client_reference_id: userId,
      metadata: userId ? { supabase_user_id: userId } : {},
      subscription_data: userId
        ? { metadata: { supabase_user_id: userId } }
        : undefined,
      success_url: `${origin}/mitgliedschaft/willkommen?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/mitgliedschaft?checkout=abgebrochen`,
    });

    if (!session.url) {
      return NextResponse.redirect(`${origin}/mitgliedschaft?checkout=fehler`, 303);
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("stripe checkout error", err);
    return NextResponse.redirect(`${origin}/mitgliedschaft?checkout=fehler`, 303);
  }
}

/** Direkter Aufruf per GET → zurück zur Verkaufsseite. */
export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  return NextResponse.redirect(`${origin}/mitgliedschaft`, 303);
}
