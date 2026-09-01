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
      // 1x/2x-Srcset aus der vollen Bildbreite – mit sizes holt der Browser eine
      // passend kleine Variante.
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
      className={cn(
        "group inline-flex min-h-11 items-center gap-3 rounded-xl py-1",
        className,
      )}
      aria-label="Werde Meister deiner Gedanken – Startseite"
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      {!compact && (
        <span
          className={cn(
            "flex flex-col gap-[0.32rem] leading-none",
            tone === "onDark" ? "text-cream" : "text-ink",
          )}
        >
          {/* Zeile 1: „WERDE MEISTER“ – schlank & gesperrt, „Meister“ in Gold */}
          <span className="font-display text-[1.12rem] font-normal uppercase leading-none tracking-[0.1em]">
            Werde{" "}
            <span
              className={cn(
                "bg-clip-text",
                tone === "onDark" ? "text-gradient-gold-bright" : "text-gradient-gold-deep",
              )}
            >
              Meister
            </span>
          </span>
          {/* Zeile 2: „DEINER GEDANKEN“ – kleiner, weit gesperrt, mit goldenen
              Flankier-Strichen (rein dekorativ). */}
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className={cn(
                "h-px w-3 shrink-0",
                tone === "onDark" ? "bg-gold-300/80" : "bg-gold-500/80",
              )}
            />
            <span className="font-display text-[0.54rem] font-normal uppercase leading-none tracking-[0.24em]">
              Deiner Gedanken
            </span>
            <span
              aria-hidden
              className={cn(
                "h-px w-3 shrink-0",
                tone === "onDark" ? "bg-gold-300/80" : "bg-gold-500/80",
              )}
            />
          </span>
        </span>
      )}
    </Link>
  );
}
