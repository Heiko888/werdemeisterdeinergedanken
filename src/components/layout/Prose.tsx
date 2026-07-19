import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Typografischer Wrapper für Fließtext-Seiten (Impressum, Datenschutz).
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 text-[0.95rem] leading-relaxed text-mist-200/80",
        "[&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white",
        "[&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white",
        "[&_a]:text-brand-200 [&_a]:underline hover:[&_a]:text-white",
        "[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-5 [&_ul]:list-disc",
        "[&_strong]:text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
