import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  // Dunkler Button mit Tiefe statt flacher Fläche: feiner Verlauf (oben etwas
  // heller), Lichtkante oben (inset-Highlight), satter Schatten – beim Hover ein
  // dezenter warmer Gold-Schein, der den Button mit der Marke verbindet.
  primary:
    "bg-gradient-to-b from-[#243731] to-ink text-paper font-semibold shadow-[inset_0_1px_0_rgb(255_255_255_/_0.1),0_2px_6px_-1px_rgb(22_35_31_/_0.35),0_10px_26px_-10px_rgb(22_35_31_/_0.5),0_8px_24px_-12px_rgb(217_169_58_/_0.4)] hover:-translate-y-0.5 hover:from-[#2b423a] hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.14),0_4px_10px_-1px_rgb(22_35_31_/_0.4),0_16px_36px_-10px_rgb(22_35_31_/_0.55),0_14px_34px_-10px_rgb(217_169_58_/_0.6)] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgb(0_0_0_/_0.35)]",
  // Theme-fähiger Umriss: `text-ink`/`border-ink` zeigen auf CSS-Variablen, die
  // in `.on-dark`-Sektionen (Hero, Final-CTA) automatisch auf Hell umschalten –
  // so ist derselbe Sekundär-Button auf hellem wie auf dunklem Grund korrekt.
  // Sanfte Hover-Anhebung + weicher Schatten geben ihm Leben statt platter Fläche.
  secondary:
    "border border-ink/25 text-ink shadow-[0_1px_2px_rgb(22_35_31_/_0.04)] hover:-translate-y-0.5 hover:border-ink/45 hover:bg-ink/[0.04] hover:shadow-[0_8px_20px_-10px_rgb(22_35_31_/_0.28)] active:translate-y-0 active:bg-ink/[0.06]",
  ghost: "text-accent hover:text-ink",
  // Goldener Glow: echter farbiger Schein-Schatten in Gold (nicht nur grau),
  // glänzende Lichtkante oben (inset-Highlight) und ein von oben beleuchteter
  // Verlauf (gold-300 → gold-500). Beim Hover wächst der Glow spürbar.
  accent:
    "bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 text-navy-950 font-semibold shadow-[inset_0_1px_0_rgb(255_255_255_/_0.5),0_2px_6px_-1px_rgb(22_35_31_/_0.2),0_4px_16px_-2px_rgb(217_169_58_/_0.6),0_12px_34px_-6px_rgb(217_169_58_/_0.85)] hover:-translate-y-0.5 hover:brightness-[1.05] hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.6),0_3px_10px_-1px_rgb(22_35_31_/_0.26),0_6px_22px_-2px_rgb(232_193_95_/_0.8),0_22px_60px_-6px_rgb(232_193_95_/_1)] active:translate-y-0 active:shadow-[inset_0_1px_2px_rgb(120_90_20_/_0.35),0_2px_6px_-2px_rgb(22_35_31_/_0.3)]",
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
    // `group` + `[&>svg:last-child]`: ein nachgestelltes Pfeil-Icon (z. B.
    // <ArrowRight/> als letztes Kind) gleitet beim Hover sanft nach rechts –
    // dieselbe Micro-Interaction wie bei ArrowLink. Belebt jeden CTA, ohne dass
    // die Aufrufstellen etwas ergänzen müssen. Ein führendes Icon (nicht als
    // letztes Kind) bleibt unberührt.
    "group inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-out [&>svg:last-child]:transition-transform [&>svg:last-child]:duration-300 [&>svg:last-child]:ease-out group-hover:[&>svg:last-child]:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60",
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
