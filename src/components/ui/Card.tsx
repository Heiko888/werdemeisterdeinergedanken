import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Gefüllte Karte – eine Quelle der Wahrheit für den Karten-Look auf hellen
 * Flächen. Ersetzt die vielfach kopierten
 * `rounded-2xl border border-ink/10 bg-surface p-6 shadow-card`-Strings.
 *
 * - `tone="accent"` hebt die Karte leicht hervor (Akzent-Rand) – z. B. für CTAs.
 * - `interactive` fügt den konsistenten Hover-Lift hinzu (für klickbare Karten).
 * - `as` erlaubt semantische Elemente (article, figure, li …).
 */
export function Card({
  as = "div",
  tone = "plain",
  interactive = false,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  tone?: "plain" | "accent";
  interactive?: boolean;
  className?: string;
  children: ReactNode;
  // Übrige Props (z. B. `key`, `action`, `href`, `onClick`) werden an das
  // gewählte Element weitergereicht, damit die Karte auch als Formular,
  // Link oder Listeneintrag genutzt werden kann.
} & Record<string, unknown>) {
  return createElement(
    as,
    {
      ...rest,
      className: cn(
        "rounded-2xl border bg-surface p-6 shadow-card",
        tone === "accent" ? "border-accent/25" : "border-ink/10",
        interactive &&
          "transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft",
        className,
      ),
    },
    children,
  );
}
