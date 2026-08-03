"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Persönliche Videobotschaft.
 *
 * Zeigt zunächst nur eine leichte Vorschau (YouTube-Thumbnail + Play-Button).
 * Erst beim Klick wird der eigentliche Player geladen – so werden vor der
 * bewussten Interaktion keine Daten an YouTube übertragen (datenschutz-
 * freundlich über youtube-nocookie, vgl. CSP frame-src in next.config.ts).
 */
export function VideoMessage({
  youtubeId,
  title,
  aspect = "landscape",
  className,
}: {
  youtubeId: string;
  title: string;
  aspect?: "video" | "landscape" | "square" | "portrait";
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  const ratio =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
        ? "aspect-[4/5]"
        : aspect === "landscape"
          ? "aspect-[4/3]"
          : "aspect-video";

  // hqdefault ist bei allen Videos vorhanden und wird über die CSP (img-src
  // https:) geladen.
  const poster = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const embed = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[2px] border border-ink/10 bg-surface-2 shadow-soft",
        ratio,
        className,
      )}
    >
      {playing ? (
        <iframe
          src={embed}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Video abspielen: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* Vorschaubild */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* dezente Abdunklung für Kontrast */}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
          />
          {/* feiner Innenrahmen */}
          <span
            aria-hidden
            className="absolute inset-3 rounded-[2px] border border-paper/20"
          />
          {/* Play-Button */}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 bg-paper/80 backdrop-blur transition duration-300 group-hover:scale-105 group-hover:bg-paper">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 translate-x-0.5 fill-ink"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {/* Caption */}
          <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-paper">
            <span className="h-px w-6 bg-accent/70" />
            Videobotschaft
          </figcaption>
        </button>
      )}
    </figure>
  );
}
