import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import brainLogo from "../../../public/logo-brain.png";

/** Original-Marken-Emblem (freigestelltes Gehirn aus dem Logo). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={brainLogo}
      alt="Werde Meister deiner Gedanken – Logo"
      priority
      className={cn("h-10 w-auto", className)}
    />
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3 rounded-xl", className)}
      aria-label="Werde Meister deiner Gedanken – Startseite"
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cream/90">
            Werde Meister deiner
          </span>
          <span className="font-sans text-[1.02rem] font-bold uppercase leading-none tracking-[0.12em] text-gradient-leaf">
            Gedanken
          </span>
        </span>
      )}
    </Link>
  );
}
