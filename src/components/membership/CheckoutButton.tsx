import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

/**
 * „Mitglied werden“-Button, der den Stripe-Checkout startet.
 *
 * Als echtes HTML-Formular umgesetzt (POST → /api/checkout): funktioniert ohne
 * Client-JavaScript und leitet serverseitig zur Stripe-Bezahlseite weiter.
 * Ist Stripe noch nicht eingerichtet, führt die Route sanft zum Kontaktformular.
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
    <form action="/api/checkout" method="POST" className="contents">
      <input type="hidden" name="plan" value={plan} />
      <Button type="submit" variant={variant} size={size} className={className}>
        {children}
      </Button>
    </form>
  );
}
