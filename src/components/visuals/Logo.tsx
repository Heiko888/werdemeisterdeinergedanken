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
      // Das Logo erscheint nur ~44 px breit (h-10). Ohne sizes erzeugt Next ein
      // 1x/2x-Srcset aus der vollen Bildbreite (640 px, 78 KB) – mit sizes holt
      // der Browser eine passend kleine Variante.
      sizes="44px"
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
          className={cn(
            "flex flex-col leading-none",
            tone === "onDark" ? "text-cream" : "text-ink",
          )}
        >
          <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em]">
            Werde Meister deiner
          </span>
          <span className="font-sans text-[1.02rem] font-bold uppercase leading-none tracking-[0.12em]">
            Gedanken
          </span>
        </span>
      )}
    </Link>
  );
}
