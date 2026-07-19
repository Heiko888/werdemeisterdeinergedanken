import Link from "next/link";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-10 w-10", className)} aria-hidden>
      <defs>
        <linearGradient id="lm-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2d489" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id="lm-core" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#8bb2ff" />
          <stop offset="100%" stopColor="#2457d6" />
        </radialGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="url(#lm-ring)"
        strokeWidth="2.5"
      />
      {/* stilisierter Kopf / Bewusstsein */}
      <path
        d="M24 11c-6 0-10 4.6-10 10.5 0 3.4 1.7 5.7 3.4 7.4 1.2 1.2 1.8 2 1.9 3.6l.1 2.5h9l.1-2.5c.1-1.6.7-2.4 1.9-3.6 1.7-1.7 3.4-4 3.4-7.4C34 15.6 30 11 24 11z"
        fill="url(#lm-core)"
        opacity="0.9"
      />
      {/* neuronale Linien */}
      <g stroke="#eaf0fb" strokeWidth="1" strokeLinecap="round" opacity="0.85">
        <path d="M24 16v11M20 19l4 3 4-3M21 24h6" fill="none" />
      </g>
      <circle cx="24" cy="16" r="1.4" fill="#f2d489" />
      <circle cx="20" cy="19" r="1.1" fill="#22d3ee" />
      <circle cx="28" cy="19" r="1.1" fill="#22d3ee" />
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
      className={cn(
        "group inline-flex items-center gap-3 rounded-xl",
        className,
      )}
      aria-label="Werde Meister deiner Gedanken – Startseite"
    >
      <LogoMark className="transition-transform duration-300 group-hover:rotate-6" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-bold tracking-tight text-white">
            Werde Meister
          </span>
          <span className="font-display text-[0.78rem] font-medium tracking-tight text-brand-200">
            deiner Gedanken
          </span>
        </span>
      )}
    </Link>
  );
}
