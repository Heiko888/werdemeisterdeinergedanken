import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
      <span className="h-1.5 w-1.5 rounded-full bg-cosmic-cyan animate-pulse-slow" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-[1.6rem] sm:text-4xl md:text-[2.75rem] font-bold text-white [overflow-wrap:anywhere]">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "prose-lead",
            align === "center" ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
