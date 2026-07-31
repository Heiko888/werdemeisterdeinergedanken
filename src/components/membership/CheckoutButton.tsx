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
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <form action="/api/checkout" method="POST" className="contents">
      <Button type="submit" variant="accent" size={size} className={className}>
        {children}
      </Button>
    </form>
  );
}
