import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper font-semibold hover:bg-ink/90",
  secondary:
    "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
  ghost: "text-accent hover:text-ink",
  accent:
    "bg-gradient-to-r from-leaf-500 to-teal-500 text-navy-950 font-semibold shadow-sm hover:brightness-[1.03]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base py-3.5",
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
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60",
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
