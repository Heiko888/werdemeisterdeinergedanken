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
  // „Wissen" führt auf die Vertiefungen (interaktiv, an die Stufe gekoppelt) und
  // bleibt auch auf der reinen Nachschlage-Wissensdatenbank aktiv – beide liegen
  // unter dem Pfad-Präfix /mitglieder/wissen…
  { href: "/mitglieder/wissen", label: "Wissen", match: "/mitglieder/wissen" },
  { href: "/mitglieder/programm", label: "Programm" },
  { href: "/mitglieder/einstellungen", label: "Einstellungen" },
] as const;

export function MemberNav() {
  const pathname = usePathname();

  // „Mein Bereich" ist nur auf dem Dashboard selbst aktiv; Einträge mit `match`
  // gelten für einen ganzen Pfad-Präfix (z. B. „Wissen" für Vertiefungen UND
  // Wissensdatenbank); alle übrigen auch auf ihren Unterseiten.
  const isActive = (item: (typeof items)[number]) => {
    if (item.href === "/mitglieder") return pathname === "/mitglieder";
    if ("match" in item && item.match) return pathname.startsWith(item.match);
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

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
            const active = isActive(item);
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
