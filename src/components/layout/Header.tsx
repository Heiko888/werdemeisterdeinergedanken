"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/visuals/Logo";
import { Button } from "@/components/ui/Button";
import { Menu, Close } from "@/components/ui/Icon";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);

  // Im (login-geschützten) Mitgliederbereich ist das Publikum ein zahlendes
  // Mitglied – Verkaufs-Einladungen gehören dort nicht hin. Wir blenden deshalb
  // „Mitgliedschaft" aus der Navigation und den „Erstgespräch"-CTA aus. Der
  // Bereich selbst ist per Proxy/Layout auth-geschützt, sodass der Pfad hier ein
  // verlässlicher Stellvertreter für „eingeloggtes Mitglied" ist.
  const imMitgliederbereich = pathname.startsWith("/mitglieder");
  const navItems = imMitgliederbereich
    ? mainNav.filter((item) => item.href !== "/mitgliedschaft")
    : mainNav;

  // Der öffentliche Header trägt mehr Inhalt als der Mitglieder-Header
  // (zusätzlicher Nav-Punkt „Mitgliedschaft" plus der CTA-Button „Kostenloses
  // Erstgespräch"). Ohne Gegenmaßnahme überläuft die Zeile den Container um
  // ~23 px; da das Logo keinen festen Platz beansprucht, staucht der Flexbox es
  // und „WERDE MEISTER" bricht auf zwei Zeilen um (wirkt „verschoben"). Deshalb
  // ist die Navigation im öffentlichen Bereich etwas kompakter (px-3 statt
  // px-4, engerer Abstand). Der Mitgliederbereich hat reichlich Platz und
  // bleibt daher unverändert (px-4).
  const navGap = imMitgliederbereich ? "gap-1" : "gap-0.5";
  const navItemPad = imMitgliederbereich ? "px-4" : "px-3";
  const navUnderlineInset = imMitgliederbereich
    ? "after:inset-x-4"
    : "after:inset-x-3";

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
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo className="shrink-0" />

        <nav
          className={cn("hidden items-center lg:flex", navGap)}
          aria-label="Hauptmenü"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative whitespace-nowrap rounded-full py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink",
                navItemPad,
                pathname === item.href &&
                  cn(
                    "font-semibold text-gold-700 hover:text-gold-700 after:absolute after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-gold-400 after:to-gold-500 after:content-['']",
                    navUnderlineInset,
                  ),
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/mitglieder"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            Mitglieder
          </Link>
          {!imMitgliederbereich && (
            <Button href="/kontakt" variant="secondary" size="md" className="whitespace-nowrap">
              Kostenloses Erstgespräch
            </Button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink/15 bg-ink/[0.03] text-2xl text-ink lg:hidden"
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
          "lg:hidden overflow-hidden border-t border-ink/10 bg-white transition-[max-height,opacity] duration-300",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          ref={menuRef}
          className="flex flex-col gap-1 px-5 py-5"
          aria-label="Mobiles Menü"
        >
          {navItems.map((item) => (
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
          <Link
            href="/mitglieder"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-3 text-base font-medium text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
          >
            Mitglieder
          </Link>
          {!imMitgliederbereich && (
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
          )}
        </nav>
      </div>
    </header>
  );
}
