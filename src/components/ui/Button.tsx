import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper font-semibold shadow-sm hover:bg-ink/90 hover:-translate-y-0.5 hover:shadow-card active:translate-y-0",
  // Theme-fähiger Umriss: `text-ink`/`border-ink` zeigen auf CSS-Variablen, die
  // in `.on-dark`-Sektionen (Hero, Final-CTA) automatisch auf Hell umschalten –
  // so ist derselbe Sekundär-Button auf hellem wie auf dunklem Grund korrekt.
  secondary:
    "border border-ink/25 text-ink hover:border-ink/45 hover:bg-ink/[0.04] active:bg-ink/[0.06]",
  ghost: "text-accent hover:text-ink",
  accent:
    "bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-semibold shadow-[0_1px_2px_-1px_rgb(22_35_31_/_0.2),0_10px_26px_-14px_rgb(168_132_42_/_0.7)] hover:-translate-y-0.5 hover:brightness-[1.04] hover:shadow-[0_2px_4px_-1px_rgb(22_35_31_/_0.24),0_16px_34px_-14px_rgb(168_132_42_/_0.85)] active:translate-y-0",
};

// Feste, saubere Höhen – so sind ein Akzent- und ein Sekundär-Button im selben
// CTA-Paar garantiert exakt gleich groß (früher mischte `lg` min-h + py).
const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  // Vergleich gegen undefined statt Wahrheitsprüfung: nur so grenzt
  // TypeScript die Union unten zuverlässig auf ButtonAsButton ein.
  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={props.onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
