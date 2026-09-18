import { getStripe } from "@/lib/stripe";

/**
 * Kaufdaten für das `purchase`-Konversionsevent auf den Erfolgsseiten
 * (/buch?checkout=erfolg und /mitgliedschaft/willkommen).
 *
 * Liest die Stripe-Checkout-Session anhand der `session_id` aus der
 * success_url nach, um Betrag und Währung zu bekommen. Best effort: ohne
 * Stripe, bei ungültiger ID oder Fehler kommt `null` zurück – die Seite
 * rendert dann ganz normal, nur ohne Umsatzwert im Event. Nur serverseitig.
 */
export type PurchaseInfo = {
  transactionId: string;
  /** Betrag in Euro (nicht Cent). */
  value?: number;
  currency: string;
  /** Kurzbezeichnung aus den Session-Metadaten (z. B. "buch-pdf"). */
  item: string;
};

export async function getPurchaseInfo(
  sessionId: string | undefined,
  fallbackItem: string,
): Promise<PurchaseInfo | null> {
  // Stripe-Session-IDs beginnen mit "cs_" – alles andere gar nicht erst anfragen.
  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  const stripe = getStripe();
  if (!stripe) {
    return { transactionId: sessionId, currency: "EUR", item: fallbackItem };
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const meta = session.metadata ?? {};
    const item = meta.produkt
      ? `buch-${meta.edition === "print" ? "print" : "pdf"}`
      : `mitgliedschaft-${meta.plan ?? "monat"}`;
    return {
      transactionId: session.id,
      value:
        typeof session.amount_total === "number"
          ? Math.round(session.amount_total) / 100
          : undefined,
      currency: (session.currency ?? "eur").toUpperCase(),
      item,
    };
  } catch {
    return { transactionId: sessionId, currency: "EUR", item: fallbackItem };
  }
}
