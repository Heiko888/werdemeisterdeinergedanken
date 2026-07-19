import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icon";
import { cn } from "@/lib/cn";

/** Dezenter Text-Link mit Pfeil, der beim Hover leicht wandert. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-ink",
        className,
      )}
    >
      {children}
      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
