"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Meldet einen abgeschlossenen Kauf als `purchase`-Event (GA4 + Meta), sobald
 * die Erfolgsseite nach dem Stripe-Checkout geladen ist. Rendert nichts.
 *
 * Doppelzählung vermeiden: die Stripe-Session-ID wird nach dem ersten Feuern
 * in sessionStorage gemerkt – ein Reload der Erfolgsseite zählt nicht erneut.
 * Feuert wie alle Events nur mit erteilter Einwilligung.
 */
export function PurchaseTracker({
  transactionId,
  value,
  currency = "EUR",
  item,
}: {
  /** Stripe-Checkout-Session-ID (Idempotenz-Schlüssel). */
  transactionId: string;
  /** Betrag in Euro (nicht Cent); undefined, wenn nicht ermittelbar. */
  value?: number;
  currency?: string;
  /** Kurzbezeichnung des Produkts, z. B. "buch-pdf" oder "mitgliedschaft-monat". */
  item: string;
}) {
  useEffect(() => {
    const key = `wmdg:purchase:${transactionId}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // Speicher nicht verfügbar → trotzdem einmal melden.
    }
    trackEvent("purchase", {
      transaction_id: transactionId,
      value,
      currency,
      item,
    });
  }, [transactionId, value, currency, item]);

  return null;
}
