import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

/**
 * „Buch bestellen"-Button, der den Stripe-Einmalkauf startet.
 *
 * Wie der CheckoutButton als echtes HTML-Formular umgesetzt (POST →
 * /api/buch-checkout): funktioniert ohne Client-JavaScript und leitet
 * serverseitig zur Stripe-Bezahlseite weiter. Ist Stripe noch nicht
 * eingerichtet, führt die Route sanft zum Kontaktformular.
 */
export function BuchKaufenButton({
  children,
  size = "lg",
  className,
  variant = "accent",
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
  variant?: "accent" | "secondary" | "primary";
}) {
  return (
    <form action="/api/buch-checkout" method="POST" className="contents">
      <Button type="submit" variant={variant} size={size} className={className}>
        {children}
      </Button>
    </form>
  );
}
