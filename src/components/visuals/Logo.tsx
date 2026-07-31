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
  tone = "onLight",
}: {
  className?: string;
  compact?: boolean;
  tone?: "onLight" | "onDark";
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3 rounded-xl", className)}
      aria-label="Werde Meister deiner Gedanken – Startseite"
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      {!compact && (
        <span
          className="flex flex-col leading-none"
          style={{
            filter:
              tone === "onDark"
                ? "drop-shadow(0 1px 8px rgba(33,178,189,0.55)) drop-shadow(0 0 18px rgba(140,198,63,0.35))"
                : "drop-shadow(0 1px 6px rgba(33,178,189,0.35)) drop-shadow(0 0 14px rgba(140,198,63,0.22))",
          }}
        >
          <span className="text-gradient-leaf font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em]">
            Werde Meister deiner
          </span>
          <span className="text-gradient-leaf font-sans text-[1.02rem] font-bold uppercase leading-none tracking-[0.12em]">
            Gedanken
          </span>
        </span>
      )}
    </Link>
  );
}
