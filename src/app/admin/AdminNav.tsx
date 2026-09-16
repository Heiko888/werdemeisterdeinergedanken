"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/**
 * Gemeinsame Navigation über alle Admin-Sektionen.
 *
 * Sitzt als sticky Leiste über jeder /admin-Seite (via admin/layout.tsx), damit
 * man direkt zwischen den Bereichen springen kann – ohne Umweg übers Cockpit.
 * Die aktive Sektion wird anhand des Pfades hervorgehoben.
 */
const SECTIONS: { href: string; label: string }[] = [
  { href: "/admin", label: "Übersicht" },
  { href: "/admin/mitglieder", label: "Mitglieder" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/kontakt", label: "Kontakt" },
  { href: "/admin/bestellungen", label: "Bestellungen" },
  { href: "/admin/erstgespraeche", label: "Erstgespräche" },
  { href: "/admin/methoden", label: "Methoden" },
  { href: "/admin/redaktionsplan", label: "Redaktionsplan" },
  { href: "/admin/vorlagen", label: "Vorlagen" },
  { href: "/admin/marken-uebersicht", label: "Marken" },
  { href: "/admin/bewusstseinsbibliothek", label: "Bibliothek" },
  { href: "/admin/seiten", label: "Seiten" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin-Bereiche"
      className="sticky top-0 z-30 border-b border-ink/10 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SECTIONS.map((s) => {
          const active = isActive(pathname, s.href);
          return (
            <Link
              key={s.href}
              href={s.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-ink text-white"
                  : "text-ink-mid hover:bg-ink/5 hover:text-ink",
              )}
            >
              {s.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
