import { cn } from "@/lib/cn";

/**
 * Dekorativer kosmischer Hintergrund: Verläufe, Sternenfeld und
 * driftende Leucht-Orbs – vollständig per CSS/SVG, ohne externe Bilder.
 */
export function CosmicBackground({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "subtle" | "hero";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-cosmic",
        className,
      )}
    >
      {/* Sternenfeld */}
      <div className="absolute inset-0 bg-stars opacity-70" />
      <div className="absolute inset-0 bg-stars scale-150 opacity-40 animate-drift" />

      {/* Raster */}
      {variant !== "subtle" && (
        <div className="absolute inset-0 bg-grid mask-fade-y opacity-60" />
      )}

      {/* Leucht-Orbs */}
      <div className="absolute -left-24 top-[-10%] h-[28rem] w-[28rem] rounded-full bg-cosmic-violet/25 blur-[90px] animate-pulse-slow" />
      <div className="absolute right-[-10%] top-[6%] h-[26rem] w-[26rem] rounded-full bg-brand-500/25 blur-[100px] animate-pulse-slow" />
      {variant === "hero" && (
        <div className="absolute left-1/2 bottom-[-20%] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cosmic-cyan/15 blur-[110px]" />
      )}

      {/* unterer Abschluss zum Body */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-950" />
    </div>
  );
}
