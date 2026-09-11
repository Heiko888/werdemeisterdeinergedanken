"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/visuals/Logo";
import { Button } from "@/components/ui/Button";
import { Menu, Close, User } from "@/components/ui/Icon";
import { mainNav } from "@/lib/site";
import { signOut } from "@/app/auth/actions";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);

  // Im (login-geschützten) Mitgliederbereich ist das Publikum ein zahlendes
  // Mitglied. Der öffentliche Marketing-Header gehört dort nicht hin: Er zeigte
  // Links, die aus dem geschützten Bereich hinausführen (Die 7 Stufen,
  // Bewusstseinstest …), während ausgerechnet „Mitgliedschaft" fehlte – das
  // wirkte inkonsistent, weil ein Klick auf eine öffentliche Seite das volle
  // Menü (inkl. „Mitgliedschaft") zurückbrachte. Deshalb blenden wir im
  // Mitgliederbereich die gesamte Marketing-Navigation aus und zeigen nur noch
  // „Zur Website" und „Abmelden". Die inhaltliche Navigation übernimmt die
  // separate `MemberNav` direkt unter dem Header. Der Bereich selbst ist per
  // Proxy/Layout auth-geschützt, sodass der Pfad hier ein verlässlicher
  // Stellvertreter für „eingeloggtes Mitglied" ist.
  const imMitgliederbereich = pathname.startsWith("/mitglieder");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll sperren, wenn Menü offen
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Menü per Escape schließen (Tastaturbedienung)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Beim Öffnen den Fokus auf den ersten Menülink setzen, damit Tastatur- und
  // Screenreader-Nutzer direkt im Menü landen (preventScroll verhindert einen
  // Sprung auf Mobil, da das Menü direkt unter dem Button aufklappt).
  useEffect(() => {
    if (!open) return;
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus({ preventScroll: true });
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-all duration-300",
        scrolled
          ? "border-ink/10 shadow-[0_1px_12px_-6px_rgba(0,0,0,0.15)]"
          : "border-ink/5",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo className="shrink-0" />

        {/* Marketing-Navigation nur außerhalb des Mitgliederbereichs. Innerhalb
            übernimmt die MemberNav die Orientierung. */}
        {!imMitgliederbereich && (
          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Hauptmenü"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink",
                  pathname === item.href &&
                    "font-semibold text-gold-700 hover:text-gold-700 after:absolute after:-bottom-0.5 after:inset-x-3 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-gold-400 after:to-gold-500 after:content-['']",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="hidden items-center gap-3 xl:flex">
          {imMitgliederbereich ? (
            <>
              <Link
                href="/"
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Zur Website
              </Link>
              <form action={signOut}>
                <Button type="submit" variant="secondary" size="md">
                  Abmelden
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* „Mitglieder" als eigenständige, gold-getönte Pill mit Personen-
                  Icon – hebt den Login zum exklusiven Bereich klar vom übrigen
                  Menü ab, bleibt aber neben dem neutralen Erstgespräch-Button
                  die ruhigere der beiden Aktionen. `h-11` = gleiche Höhe wie der
                  Button, damit das Aktionspaar sauber ausgerichtet ist. */}
              <Link
                href="/mitglieder"
                className="inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full border border-gold-600/40 bg-gold-500/10 px-3.5 text-sm font-semibold text-gold-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-600/60 hover:bg-gold-500/[0.16] hover:shadow-[0_8px_20px_-12px_rgb(168_132_42_/_0.55)]"
              >
                <User className="text-base" />
                Mitglieder
              </Link>
              <Button href="/kontakt" variant="secondary" size="md" className="whitespace-nowrap">
                Erstgespräch
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink/15 bg-ink/[0.03] text-2xl text-ink xl:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobiles-menue"
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Mobiles Menü. `inert` im geschlossenen Zustand nimmt die (unsichtbaren)
          Links aus dem Tab-Fluss und blendet sie für Screenreader aus, ohne die
          Auf-/Zu-Animation zu verlieren. */}
      <div
        id="mobiles-menue"
        inert={!open}
        className={cn(
          "xl:hidden overflow-hidden border-t border-ink/10 bg-white transition-[max-height,opacity] duration-300",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          ref={menuRef}
          className="flex flex-col gap-1 px-5 py-5"
          aria-label="Mobiles Menü"
        >
          {imMitgliederbereich ? (
            <>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
              >
                Zur Website
              </Link>
              <form action={signOut} className="mt-3">
                <Button type="submit" variant="secondary" size="lg" className="w-full">
                  Abmelden
                </Button>
              </form>
            </>
          ) : (
            <>
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink",
                    pathname === item.href &&
                      "border-l-2 border-gold-600 font-semibold text-gold-700",
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobil dieselbe gold-getönte Identität wie im Desktop-Header,
                  damit „Mitglieder" sich auch hier vom Content-Menü abhebt. */}
              <Link
                href="/mitglieder"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center gap-2 rounded-xl border border-gold-600/40 bg-gold-500/10 px-4 py-3 text-base font-semibold text-gold-700 hover:bg-gold-500/[0.16]"
              >
                <User className="text-lg" />
                Mitglieder
              </Link>
              <div className="mt-3">
                <Button
                  href="/kontakt"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Kostenloses Erstgespräch
                </Button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
