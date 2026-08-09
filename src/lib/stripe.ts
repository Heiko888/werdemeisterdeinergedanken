import Stripe from "stripe";

/**
 * Zentrale Stripe-Konfiguration (nur serverseitig verwenden).
 *
 * Alle Werte kommen aus Umgebungsvariablen. Ohne Keys bleibt die Seite
 * lauffähig: `getStripe()` gibt dann `null` zurück und die „Mitglied werden“-
 * Buttons fallen sanft auf das Kontaktformular zurück, bis Stripe eingerichtet
 * ist. Der Secret-Key darf niemals mit NEXT_PUBLIC_ geprefixt werden.
 *
 * Benötigte Variablen (siehe .env.local.example & docs/STRIPE-MITGLIEDSCHAFT.md):
 *   STRIPE_SECRET_KEY        – geheimer API-Key (sk_live_… / sk_test_…)
 *   STRIPE_PRICE_ID          – Preis-ID des Abo-Produkts (price_…)
 *   STRIPE_WEBHOOK_SECRET    – Signatur-Geheimnis des Webhooks (whsec_…)
 */
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID; // Monatsabo (Standard)
export const STRIPE_PRICE_ID_YEARLY = process.env.STRIPE_PRICE_ID_YEARLY; // Jahresabo (optional)
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const SECRET = process.env.STRIPE_SECRET_KEY;

/** True, wenn Checkout starten kann (Key + mind. Monatspreis vorhanden). */
export const isStripeConfigured = Boolean(SECRET && STRIPE_PRICE_ID);

/** True, wenn zusätzlich ein Jahresabo hinterlegt ist. */
export const hasYearlyPlan = Boolean(STRIPE_PRICE_ID_YEARLY);

export type Plan = "monat" | "jahr";

/**
 * Preis-ID zu einem Plan auflösen. „jahr“ nutzt das Jahresabo, fällt aber auf
 * das Monatsabo zurück, falls STRIPE_PRICE_ID_YEARLY (noch) nicht gesetzt ist.
 */
export function priceIdForPlan(plan: Plan | undefined): string | undefined {
  if (plan === "jahr" && STRIPE_PRICE_ID_YEARLY) return STRIPE_PRICE_ID_YEARLY;
  return STRIPE_PRICE_ID;
}

let cached: Stripe | null = null;

/** Gibt den Stripe-Client zurück – oder `null`, wenn kein Secret-Key gesetzt ist. */
export function getStripe(): Stripe | null {
  if (!SECRET) return null;
  if (!cached) {
    cached = new Stripe(SECRET, {
      // apiVersion bewusst nicht gepinnt → nutzt die im Konto eingestellte
      // Standardversion und vermeidet Typ-Konflikte bei SDK-Updates.
      appInfo: { name: "Werde Meister deiner Gedanken" },
    });
  }
  return cached;
}

/** Abo-Status, die als „aktive Mitgliedschaft“ gelten. */
export const ACTIVE_MEMBERSHIP_STATES = new Set(["active", "trialing"]);
