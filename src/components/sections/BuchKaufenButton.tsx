"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { UtmHiddenFields } from "@/components/analytics/UtmHiddenFields";
import { trackEvent } from "@/lib/analytics";

/**
 * „Buch bestellen"-Button, der den Stripe-Einmalkauf startet.
 *
 * Wie der CheckoutButton als echtes HTML-Formular umgesetzt (POST →
 * /api/buch-checkout): funktioniert ohne Client-JavaScript und leitet
 * serverseitig zur Stripe-Bezahlseite weiter. Ist Stripe noch nicht
 * eingerichtet, führt die Route sanft zum Kontaktformular.
 *
 * Client-Komponente nur für das `begin_checkout`-Event (nur mit Einwilligung)
 * und die gemerkten UTM-Parameter als versteckte Felder (→ Stripe-Metadaten).
 */
export function BuchKaufenButton({
  children,
  size = "lg",
  className,
  variant = "accent",
  edition = "pdf",
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
  variant?: "accent" | "secondary" | "primary";
  /** Gewählte Buch-Edition: als PDF (Download) oder gedruckt (Versand). */
  edition?: "pdf" | "print";
}) {
  return (
    <form
      action="/api/buch-checkout"
      method="POST"
      className="contents"
      onSubmit={() =>
        trackEvent("begin_checkout", {
          item: `buch-${edition}`,
          value: edition === "print" ? 39.9 : 29.9,
          currency: "EUR",
        })
      }
    >
      <input type="hidden" name="edition" value={edition} />
      <UtmHiddenFields />
      <Button type="submit" variant={variant} size={size} className={className}>
        {children}
      </Button>
    </form>
  );
}
