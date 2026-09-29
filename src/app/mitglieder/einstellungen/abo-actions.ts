"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getStripe } from "@/lib/stripe";
import { getMembershipForUser } from "@/lib/membership";
import { site } from "@/lib/site";

/**
 * Öffnet das Stripe-Kundenportal (Kündigen, Rechnungen, Zahlungsart).
 *
 * Sicherheit: Die Stripe-Customer-ID (und Subscription-ID) wird AUSSCHLIESSLICH
 * serverseitig aus `memberships` des eingeloggten Kontos gelesen – nie aus
 * Formulardaten. Das einzige Argument `ziel` wählt nur den Einstieg im Portal
 * (Übersicht oder direkt der Kündigungs-Dialog) und wird gegen eine Whitelist
 * geprüft.
 *
 * Fehler führen zurück auf die Einstellungen mit `?abo=<code>`; die Seite zeigt
 * dazu einen freundlichen Hinweis. `redirect` wirft und steht daher bewusst
 * außerhalb von try/catch.
 */

const RETURN_PATH = "/mitglieder/einstellungen";

function zurueck(code: "nicht-konfiguriert" | "kein-kunde" | "fehler"): never {
  redirect(`${RETURN_PATH}?abo=${code}#mitgliedschaft`);
}

export async function openAboPortal(ziel: "uebersicht" | "kuendigen"): Promise<void> {
  if (!isSupabaseConfigured) zurueck("nicht-konfiguriert");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirect=${RETURN_PATH}`);

  const stripe = getStripe();
  if (!stripe) zurueck("nicht-konfiguriert");

  const membership = await getMembershipForUser({ id: user.id, email: user.email });
  const customer = membership?.stripe_customer_id;
  if (!customer) zurueck("kein-kunde");

  const returnUrl = `${site.url}${RETURN_PATH}`;
  const subscription = membership?.stripe_subscription_id ?? null;
  let url: string | null = null;

  // Direkt in den Kündigungs-Dialog – fällt auf die Portal-Übersicht zurück,
  // falls der Flow nicht möglich ist (z. B. Abo schon gekündigt oder Kündigung
  // im Portal nicht freigeschaltet).
  if (ziel === "kuendigen" && subscription) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer,
        return_url: returnUrl,
        flow_data: {
          type: "subscription_cancel",
          subscription_cancel: { subscription },
          after_completion: {
            type: "redirect",
            redirect: { return_url: returnUrl },
          },
        },
      });
      url = session.url;
    } catch (err) {
      console.warn("billing portal cancel flow failed, fallback to overview", err);
    }
  }

  if (!url) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer,
        return_url: returnUrl,
      });
      url = session.url;
    } catch (err) {
      console.error("billing portal session failed", err);
    }
  }

  if (!url) zurueck("fehler");
  redirect(url);
}
