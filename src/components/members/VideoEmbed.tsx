"use client";

/**
 * Video-Einbettung im Mitgliederbereich.
 *
 * Bricht bewusst aus der schmalen Lesespalte aus und zentriert das Video auf
 * eine größere Breite (max-w-5xl), damit es – wie auf der Startseite –
 * prominent und „cinematisch" wirkt. Der «Full-Bleed»-Trick ist gefahrlos,
 * weil `body { overflow-x: clip }` horizontales Scrollen verhindert
 * (siehe globals.css).
 *
 * Wird ein `poster` übergeben, zeigen wir zuerst das gebrandete Thumbnail mit
 * Play-Button und laden YouTube erst beim Klick (datenschutz- und
 * performancefreundlich, „facade pattern"). Ohne Poster wird das iframe direkt
 * eingebettet. Eingebettet wird stets über youtube-nocookie (CSP siehe
 * next.config.ts).
 */
import { useState } from "react";

export function VideoEmbed({
  videoId,
  title,
  poster,
}: {
  videoId: string;
  title: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const showFacade = Boolean(poster) && !playing;

  return (
    <div className="relative left-1/2 mt-3 w-screen -translate-x-1/2">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 shadow-card">
          {showFacade ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Video abspielen: ${title}`}
              className="group relative block h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster}
                alt={title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/0" />
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25">
                <span className="ml-1.5 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-white" />
              </span>
            </button>
          ) : (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}${poster ? "?autoplay=1" : ""}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}
