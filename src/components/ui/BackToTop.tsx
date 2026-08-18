"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Schwebender „Nach oben“-Button. Erscheint, sobald der Nutzer ein gutes Stück
 * gescrollt hat, und bringt die Seite per Klick sanft zurück zum Anfang.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Im Mitgliederbereich schwebt zusätzlich der Chat-Avatar (BegleiterLauncher)
  // in derselben Ecke. Damit sich beide nicht überdecken, stapelt sich dieser
  // Knopf dort ÜBER dem Avatar (mittig gleiche Spalte). Auf der Begleiter-Seite
  // selbst gibt es keinen Avatar – dort bleibt die normale Eck-Position.
  const ueberAvatar =
    (pathname?.startsWith("/mitglieder") ?? false) &&
    !(pathname?.startsWith("/mitglieder/begleiter") ?? false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Zum Seitenanfang"
      title="Zum Seitenanfang"
      className={cn(
        "fixed z-40 inline-flex h-12 w-12 items-center justify-center rounded-full",
        "bg-gradient-to-r from-leaf-500 to-teal-400 text-white shadow-soft ring-1 ring-white/20",
        "transition-all duration-300 hover:from-leaf-600 hover:to-teal-500 hover:-translate-y-0.5",
        // Position: im Mitgliederbereich über dem Chat-Avatar stapeln (mittig
        // dieselbe Spalte), sonst wie gehabt in der unteren rechten Ecke.
        ueberAvatar
          ? "bottom-24 right-5 sm:right-7"
          : "bottom-6 right-5 sm:bottom-8 sm:right-8",
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="text-xl" />
    </button>
  );
}
