"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { UtmHiddenFields } from "@/components/analytics/UtmHiddenFields";
import { trackEvent } from "@/lib/analytics";

/**
 * „Mitglied werden“-Button, der den Stripe-Checkout startet.
 *
 * Als echtes HTML-Formular umgesetzt (POST → /api/checkout): funktioniert ohne
 * Client-JavaScript und leitet serverseitig zur Stripe-Bezahlseite weiter.
 * Ist Stripe noch nicht eingerichtet, führt die Route sanft zum Kontaktformular.
 *
 * Client-Komponente nur für zwei Extras, die ohne JavaScript still entfallen:
 * das `begin_checkout`-Event (GA4/Meta, nur mit Einwilligung) und die
 * gemerkten UTM-Parameter als versteckte Felder (→ Stripe-Metadaten).
 */
export function CheckoutButton({
  children,
  size = "lg",
  className,
  plan = "monat",
  variant = "accent",
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
  /** Gewählter Abo-Takt: Monats- oder Jahresabo. */
  plan?: "monat" | "jahr";
  variant?: "accent" | "secondary";
}) {
  return (
    <form
      action="/api/checkout"
      method="POST"
      className="contents"
      onSubmit={() =>
        trackEvent("begin_checkout", { item: `mitgliedschaft-${plan}`, currency: "EUR" })
      }
    >
      <input type="hidden" name="plan" value={plan} />
      <UtmHiddenFields />
      <Button type="submit" variant={variant} size={size} className={className}>
        {children}
      </Button>
    </form>
  );
}
