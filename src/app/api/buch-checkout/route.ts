import { NextResponse } from "next/server";
import { getStripe, bookPriceIdForEdition, type BookEdition } from "@/lib/stripe";
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
 * „Werde Meister deiner Gedanken" – als PDF (29,90 €) oder gedruckt (39,90 €).
 *
 * Ablauf:
 *   1. Gewählte Edition (`edition=pdf|print`) aus dem Formular lesen (Standard PDF).
 *   2. Ist Stripe nicht eingerichtet oder der Preis der Edition (noch) nicht
 *      angelegt → sanfter Fallback aufs Kontaktformular, damit der Bestell-
 *      Button nie ins Leere läuft.
 *   3. Einmalzahlung (`mode: "payment"`). Nur die gedruckte Edition erfasst eine
 *      Lieferadresse (Versand DE/AT/CH); die PDF-Edition ist ein reiner Download.
 *   4. Weiterleitung (303) auf die gehostete Stripe-Bezahlseite.
 */
export async function POST(request: Request) {
  const origin = baseUrl(request);
  const stripe = getStripe();

  // Gewählte Edition aus dem Formular lesen (Standard: PDF).
  let edition: BookEdition = "pdf";
  try {
    const form = await request.formData();
    const e = String(form.get("edition") || "");
    if (e === "print" || e === "pdf") edition = e;
  } catch {
    // Kein Formular (z. B. direkter Aufruf) → Standard (PDF).
  }

  const priceId = bookPriceIdForEdition(edition);

  if (!stripe || !priceId) {
    return NextResponse.redirect(`${origin}/kontakt?thema=buch`, 303);
  }

  const isPrint = edition === "print";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "required",
      // Nur die gedruckte Edition braucht eine Lieferadresse (Versand DE/AT/CH).
      ...(isPrint
        ? { shipping_address_collection: { allowed_countries: ["DE", "AT", "CH"] } }
        : {}),
      metadata: { produkt: "buch-werde-meister-deiner-gedanken", edition },
      success_url: `${origin}/buch?checkout=erfolg&edition=${edition}&session_id={CHECKOUT_SESSION_ID}`,
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
