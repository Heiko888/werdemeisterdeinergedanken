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
  poster: posterOverride,
}: {
  youtubeId: string;
  title: string;
  aspect?: "video" | "landscape" | "square" | "portrait";
  className?: string;
  /**
   * Eigenes Vorschaubild statt des automatisch aus der YouTube-ID abgeleiteten.
   * Nötig z. B. für das Platzhalter-Video, dessen YouTube-Thumbnail nicht zur
   * Sektion passt – hier wird stattdessen ein gebrandetes Marken-Cover gezeigt.
   */
  poster?: string;
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

  // maxresdefault ist das native 16:9-Vorschaubild (1280×720, scharf, ohne
  // schwarze Balken) und passt damit exakt in den Video-Rahmen. Es ist nur bei
  // Videos mit HD-Quelle vorhanden – fehlt es, liefert YouTube 404 und wir
  // fallen auf hqdefault zurück, das bei allen Videos existiert. Beide werden
  // über die CSP (img-src https:) geladen.
  const posterMax = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
  const posterFallback = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  // Ein übergebenes Cover hat Vorrang; sonst das native YouTube-Vorschaubild.
  const initialPoster = posterOverride ?? posterMax;
  const [poster, setPoster] = useState(initialPoster);
  const embed = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  // Bei einem Video-/Cover-Wechsel wieder mit dem Ausgangsbild starten – ohne
  // Effekt: React empfiehlt, abgeleiteten Zustand direkt beim Render zu
  // korrigieren. Der gemerkte vorige Ausgangswert verhindert eine Schleife.
  const [prevInitial, setPrevInitial] = useState(initialPoster);
  if (initialPoster !== prevInitial) {
    setPrevInitial(initialPoster);
    setPoster(initialPoster);
  }

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
            onError={() => {
              // Nur beim YouTube-Vorschaubild auf hqdefault zurückfallen –
              // ein eigenes Cover existiert lokal und braucht keinen Fallback.
              if (!posterOverride && poster !== posterFallback)
                setPoster(posterFallback);
            }}
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
