import { NextResponse } from "next/server";
import { getStripe, STRIPE_BOOK_PRICE_ID } from "@/lib/stripe";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Basis-URL für die Rückkehr-Links (Stripe success/cancel und Fallbacks).
 *
 * Wie bei /api/checkout: Hinter dem Reverse-Proxy ist `request.url` die INTERNE
 * Adresse (http://localhost:3000). In Produktion deshalb die kanonische Domain
 * aus site.ts, lokal die echte Request-Herkunft (damit `next dev` nutzbar
 * bleibt). Bewusst NICHT aus `x-forwarded-host` gebaut – der Header wäre
 * clientseitig setzbar und die Links damit manipulierbar.
 */
function baseUrl(request: Request): string {
  if (process.env.NODE_ENV === "production") return site.url;
  return new URL(request.url).origin;
}

/**
 * Startet den Stripe-Checkout für den EINMALKAUF des Buchs
 * „Werde Meister deiner Gedanken" (29,90 €).
 *
 * Ablauf:
 *   1. Ist Stripe nicht eingerichtet (kein Key/Buchpreis) → sanfter Fallback
 *      aufs Kontaktformular, damit der Bestell-Button nie ins Leere läuft.
 *   2. Einmalzahlung (`mode: "payment"`) statt Abo – Adress- und
 *      E-Mail-Erfassung überlässt Stripe der gehosteten Bezahlseite.
 *   3. Weiterleitung (303) auf die gehostete Stripe-Bezahlseite.
 */
export async function POST(request: Request) {
  const origin = baseUrl(request);
  const stripe = getStripe();

  if (!stripe || !STRIPE_BOOK_PRICE_ID) {
    return NextResponse.redirect(`${origin}/kontakt?thema=buch`, 303);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: STRIPE_BOOK_PRICE_ID, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "required",
      // Physisches Buch → Lieferadresse mit erfassen (Versand nach DE/AT/CH).
      shipping_address_collection: { allowed_countries: ["DE", "AT", "CH"] },
      metadata: { produkt: "buch-werde-meister-deiner-gedanken" },
      success_url: `${origin}/buch?checkout=erfolg&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/buch?checkout=abgebrochen`,
    });

    if (!session.url) {
      return NextResponse.redirect(`${origin}/buch?checkout=fehler`, 303);
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("stripe buch-checkout error", err);
    return NextResponse.redirect(`${origin}/buch?checkout=fehler`, 303);
  }
}

/** Direkter Aufruf per GET → zurück zur Verkaufsseite. */
export function GET(request: Request) {
  return NextResponse.redirect(`${baseUrl(request)}/buch`, 303);
}
