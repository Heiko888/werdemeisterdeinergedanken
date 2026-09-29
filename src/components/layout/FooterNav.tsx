"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-mist-300/70 transition-colors hover:text-white";

/**
 * Navigations-Spalte im Footer.
 *
 * Im Mitgliederbereich (wie im Header: Pfad-Präfix /mitglieder) zeigt sie keine
 * Marketing-Navigation (inkl. „Mitgliedschaft") mehr, sondern die Wege, die ein
 * zahlendes Mitglied braucht: den eigenen Bereich, Soforthilfe, Hilfe/Kontakt
 * und den Weg zurück zur Website.
 */
export function FooterNav() {
  const pathname = usePathname();
  const imMitgliederbereich = pathname.startsWith("/mitglieder");

  if (imMitgliederbereich) {
    const items = [
      { href: "/mitglieder", label: "Mein Bereich" },
      { href: "/mitglieder/soforthilfe", label: "Soforthilfe" },
      { href: "/mitglieder/einstellungen", label: "Einstellungen & Mitgliedschaft" },
      { href: "/kontakt?thema=mitgliedschaft", label: "Hilfe & Kontakt" },
      { href: "/", label: "Zur Website" },
    ];
    return (
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
          Mitgliederbereich
        </h3>
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
        Navigation
      </h3>
      <ul className="flex flex-col gap-0.5">
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClass}>
              {item.label}
            </Link>
          </li>
        ))}
        {/* Kontakt als eigenständiger Nav-Eintrag (bislang nur als
            Header-Button erreichbar). */}
        <li>
          <Link href="/kontakt" className={linkClass}>
            Kontakt
          </Link>
        </li>
      </ul>
    </div>
  );
}
