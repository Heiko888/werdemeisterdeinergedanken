import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Feines editoriales Label: kurze Haarlinie + gesperrter Text. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-accent/90",
        className,
      )}
    >
      <span className="h-px w-8 bg-accent/50" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {(eyebrow || index) && (
        <div className="flex items-baseline gap-3">
          {index && (
            <span className="font-display text-sm italic text-ink-mid">
              {index}
            </span>
          )}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </div>
      )}
      <h2 className="max-w-3xl text-[1.55rem] font-medium leading-[1.12] text-ink sm:[hyphens:none] sm:[overflow-wrap:normal] sm:text-4xl md:text-[2.9rem]">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "max-w-2xl text-[1.05rem] leading-relaxed text-ink-mid",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
