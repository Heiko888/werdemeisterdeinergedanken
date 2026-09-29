import type Stripe from "stripe";
import { getStripe, ACTIVE_MEMBERSHIP_STATES } from "@/lib/stripe";
import { getMembershipForUser } from "@/lib/membership";
import { isAdminEmail } from "@/lib/admin";

/**
 * Abo-Übersicht für die Karte „Mitgliedschaft“ in den Einstellungen.
 *
 * Nur serverseitig verwenden (liest per Service-Role-Client und Stripe-Secret).
 * Grundlage ist die Zeile in `memberships` des eingeloggten Kontos; ist Stripe
 * konfiguriert, wird die Subscription zusätzlich live gelesen – nur so ist eine
 * zum Laufzeitende vorgemerkte Kündigung (`cancel_at_period_end`) erkennbar,
 * denn der Status bleibt bis dahin `active`. Jeder Fehler fällt still auf die
 * DB-Werte zurück: Die Seite darf hier nie abstürzen.
 */

export type AboZustand =
  | "aktiv"
  | "testphase"
  | "gekuendigt" // gekündigt, läuft aber noch bis zum Periodenende
  | "zahlung-offen"
  | "beendet"
  | "in-bearbeitung"
  | "keine";

export type AboUebersicht = {
  zustand: AboZustand;
  /** Periodenende bzw. Kündigungsdatum (ISO) – `null`, wenn unbekannt. */
  datum: string | null;
  /** True, wenn ein Stripe-Kunde hinterlegt UND Stripe konfiguriert ist. */
  portalMoeglich: boolean;
  /** True, wenn der Direkt-Kündigen-Flow sinnvoll ist (laufendes, ungekündigtes Abo). */
  kuendigenMoeglich: boolean;
  istAdmin: boolean;
};

function tsToIso(ts: unknown): string | null {
  return typeof ts === "number" ? new Date(ts * 1000).toISOString() : null;
}

/** Periodenende – je nach API-Version am Abo oder am ersten Abo-Item. */
function periodEndOf(sub: Stripe.Subscription): string | null {
  const top = (sub as unknown as { current_period_end?: number }).current_period_end;
  if (typeof top === "number") return tsToIso(top);
  const item = sub.items?.data?.[0] as unknown as
    | { current_period_end?: number }
    | undefined;
  return tsToIso(item?.current_period_end);
}

export async function getAboUebersicht(user: {
  id: string;
  email?: string | null;
}): Promise<AboUebersicht> {
  const istAdmin = isAdminEmail(user.email);
  let row: Awaited<ReturnType<typeof getMembershipForUser>> = null;
  try {
    row = await getMembershipForUser(user);
  } catch (err) {
    console.error("abo-status: membership lookup failed", err);
  }

  if (!row) {
    return {
      zustand: "keine",
      datum: null,
      portalMoeglich: false,
      kuendigenMoeglich: false,
      istAdmin,
    };
  }

  const stripe = getStripe();
  let status = row.status;
  let datum = row.current_period_end;
  let vorgemerkt = false;

  if (stripe && row.stripe_subscription_id) {
    try {
      const sub = await stripe.subscriptions.retrieve(row.stripe_subscription_id);
      status = sub.status;
      datum = periodEndOf(sub) ?? datum;
      if (sub.cancel_at_period_end || sub.cancel_at) {
        vorgemerkt = true;
        datum = tsToIso(sub.cancel_at) ?? datum;
      }
    } catch (err) {
      console.error("abo-status: subscription retrieve failed", err);
    }
  }

  let zustand: AboZustand;
  if (ACTIVE_MEMBERSHIP_STATES.has(status)) {
    zustand = vorgemerkt ? "gekuendigt" : status === "trialing" ? "testphase" : "aktiv";
  } else if (status === "past_due" || status === "unpaid") {
    zustand = "zahlung-offen";
  } else if (status === "canceled" || status === "incomplete_expired") {
    zustand = "beendet";
  } else {
    zustand = "in-bearbeitung";
  }

  const portalMoeglich = Boolean(stripe && row.stripe_customer_id);
  return {
    zustand,
    datum,
    portalMoeglich,
    kuendigenMoeglich:
      portalMoeglich &&
      Boolean(row.stripe_subscription_id) &&
      (zustand === "aktiv" || zustand === "testphase" || zustand === "zahlung-offen"),
    istAdmin,
  };
}
