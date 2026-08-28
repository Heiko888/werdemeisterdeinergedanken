"use client";
import { useEffect, useState } from "react";

/**
 * Schmaler Lesefortschritts-Balken am oberen Rand der Artikelseite.
 * Signalisiert „langer, wertiger Text" und gibt beim Scrollen Orientierung.
 * Rein dekorativ → `aria-hidden`; nutzt `scaleX` statt Breite, damit der
 * Browser nicht bei jedem Scroll-Tick neu layouten muss.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
    >
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(100deg, var(--color-gold-400), var(--color-gold-500))",
        }}
      />
    </div>
  );
}
