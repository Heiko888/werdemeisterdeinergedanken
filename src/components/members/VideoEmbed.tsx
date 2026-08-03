/**
 * Video-Einbettung im Mitgliederbereich.
 *
 * Bricht bewusst aus der schmalen Lesespalte aus und zentriert das Video auf
 * eine größere Breite (max-w-5xl), damit es – wie auf der Startseite –
 * prominent und „cinematisch" wirkt. Der «Full-Bleed»-Trick ist gefahrlos,
 * weil `body { overflow-x: clip }` horizontales Scrollen verhindert
 * (siehe globals.css). Eingebettet wird datenschutzfreundlich über
 * youtube-nocookie (CSP siehe next.config.ts).
 */
export function VideoEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <div className="relative left-1/2 mt-3 w-screen -translate-x-1/2">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 shadow-card">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
