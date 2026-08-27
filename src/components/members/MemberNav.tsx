"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

/**
 * Persistente Navigation des Mitgliederbereichs.
 *
 * Liegt als schlanke Kontext-Leiste direkt unter dem globalen Header und macht
 * die Kernbereiche von jeder Unterseite aus erreichbar (bisher führte der Weg
 * zwischen den Werkzeugen immer über das Dashboard). Bewusst reduziert auf
 * wenige, klare Ziele – kein zweiter „Marketing-Header", sondern ein ruhiges
 * Orientierungsband, das den eigenen Weg in den Vordergrund stellt.
 *
 * „Einstellungen" ist bewusst dabei: bisher war es nur aus der Dashboard-
 * Kopfzeile erreichbar, nicht aus den Unterseiten.
 */
const items = [
  { href: "/mitglieder", label: "Mein Bereich" },
  { href: "/mitglieder/praxis", label: "Praxis" },
  { href: "/mitglieder/journal", label: "Journal" },
  { href: "/mitglieder/wissensdatenbank", label: "Wissen" },
  { href: "/mitglieder/programm", label: "Programm" },
  { href: "/mitglieder/einstellungen", label: "Einstellungen" },
] as const;

export function MemberNav() {
  const pathname = usePathname();

  // „Mein Bereich" ist nur auf dem Dashboard selbst aktiv; alle anderen Einträge
  // auch auf ihren Unterseiten (z. B. eine einzelne Praxis unter /praxis/…).
  const isActive = (href: string) =>
    href === "/mitglieder"
      ? pathname === "/mitglieder"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Mitglieder-Navigation"
      className="sticky top-[4.5rem] z-40 border-b border-ink/10 bg-white/85 backdrop-blur-sm"
    >
      <Container size="wide">
        <ul
          className="-mx-1 flex items-center gap-1 overflow-x-auto py-2.5"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-teal-500/12 text-teal-700"
                      : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
