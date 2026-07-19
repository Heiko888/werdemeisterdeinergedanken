import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Edler Bild-Rahmen. Ohne `src` wird ein hochwertiger Platzhalter gezeigt,
 * der später 1:1 durch ein echtes Foto ersetzt werden kann:
 *   <PhotoFrame src="/portrait.jpg" alt="Heiko Schwaninger" />
 */
export function PhotoFrame({
  src,
  alt = "",
  caption = "Porträt folgt",
  aspect = "portrait",
  className,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  aspect?: "portrait" | "square" | "landscape";
  className?: string;
}) {
  const ratio =
    aspect === "square"
      ? "aspect-square"
      : aspect === "landscape"
        ? "aspect-[4/3]"
        : "aspect-[4/5]";

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[2px] border border-white/10 bg-navy-900",
        ratio,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
      ) : (
        <>
          {/* Duotone-Verlauf + Grain */}
          <div className="grain absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 30%, color-mix(in oklab, var(--color-teal-500) 35%, transparent), transparent 70%)",
            }}
          />
          {/* Porträt-Silhouette */}
          <svg
            viewBox="0 0 100 125"
            className="absolute inset-0 h-full w-full text-white/12"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden
          >
            <circle cx="50" cy="45" r="18" fill="currentColor" />
            <path
              d="M18 118c0-19 14-32 32-32s32 13 32 32z"
              fill="currentColor"
            />
          </svg>
          {/* feiner Innenrahmen */}
          <div className="absolute inset-3 rounded-[2px] border border-white/10" />
          {/* Caption */}
          <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-cream-dim/60">
            <span className="h-px w-6 bg-leaf-400/50" />
            {caption}
          </figcaption>
        </>
      )}
    </figure>
  );
}
