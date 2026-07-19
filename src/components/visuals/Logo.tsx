import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Marken-Emblem nach dem Original-Logo: stilisiertes Gehirn mit
 * Neuro-Schaltkreisen, Verlauf Lindgrün → Teal, weiße Knotenpunkte.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-10 w-10", className)} aria-hidden>
      <defs>
        <linearGradient id="lm-brain" x1="6" y1="58" x2="58" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a6d64c" />
          <stop offset="45%" stopColor="#4bc79b" />
          <stop offset="100%" stopColor="#2ab7d0" />
        </linearGradient>
      </defs>

      {/* Gehirn-Silhouette mit Sprechblasen-Fortsatz */}
      <path
        fill="url(#lm-brain)"
        d="M23 15.5c2.2-3 6.8-3.4 9.4-1 3-.9 6.4.2 8 2.8 4.6-.3 8.6 3 9 7.4.3 3-.9 5.6-3 7.3.5 3.4-1.7 6.7-5.1 7.6-1.7 2.6-5 3.7-8 2.7-1.6 1.3-3.8 1.7-5.8 1l-1.9 5.2c-.3.8-1.5.6-1.5-.3l.2-6.4c-3-1-5.2-3.6-5.5-6.8-3-1.2-4.9-4.3-4.4-7.6-2.3-2-3-5.4-1.6-8.2 1.4-2.8 4.6-4.2 7.6-3.4.3-1.4 1.2-2.6 2.6-3.1z"
      />

      {/* Schaltkreise + Knoten (weiß) */}
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M25 24v-4M25 24c0 3 4 2 4 5M33 18v6c0 2 3 2 3 4M41 22v5c0 2-3 2-3 5M30 33c0 2-3 3-6 3M44 30c-2 0-4 1-4 3" />
      </g>
      <g fill="#ffffff">
        <circle cx="25" cy="19.5" r="1.7" />
        <circle cx="33" cy="17.5" r="1.7" />
        <circle cx="41" cy="21.5" r="1.7" />
        <circle cx="29" cy="29.5" r="1.6" />
        <circle cx="36" cy="28.5" r="1.6" />
        <circle cx="23.5" cy="37" r="1.6" />
        <circle cx="40" cy="33.5" r="1.6" />
        <circle cx="44.5" cy="29.5" r="1.5" />
      </g>
    </svg>
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
      <LogoMark className="transition-transform duration-300 group-hover:rotate-6" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white">
            Werde Meister deiner
          </span>
          <span className="font-display text-[1.05rem] font-extrabold uppercase leading-none tracking-tight text-gradient-leaf">
            Gedanken
          </span>
        </span>
      )}
    </Link>
  );
}
