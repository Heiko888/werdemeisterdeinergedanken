import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VideoMessage } from "@/components/ui/VideoMessage";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export function MaybeNotYou() {
  // Solange kein eigenes «Ein anderer Blickwinkel»-Video existiert, läuft das
  // globale Platzhalter-Video – aber mit dem gebrandeten Marken-Thumbnail
  // (gleiches Layout wie die Mitgliederbereich-Thumbnails, erzeugt von
  // docs/marketing/video-thumbnails.mjs) statt seines unpassenden YouTube-
  // Vorschaubilds. Sobald videoMessage.youtubeId gesetzt ist, greift dessen
  // echtes Thumbnail automatisch.
  const videoId = site.videoMessage.youtubeId ?? site.placeholderVideoId;
  const poster = site.videoMessage.youtubeId
    ? undefined
    : "/video-thumbnails/landing/ein-anderer-blickwinkel.png";

  return (
    <section className="bg-paper-aura seam-gold grain-soft relative py-16 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm italic text-ink-mid">
                06
              </span>
              <Eyebrow>Ein anderer Blickwinkel</Eyebrow>
            </div>
            <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl md:text-[2.9rem]">
              Was, wenn es{" "}
              <em className="accent">nicht an dir</em> liegt?
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-ink-mid">
              Vielleicht hast du dir schon oft die Schuld gegeben – zu wenig
              Disziplin, zu wenig Willenskraft. Doch was, wenn das Problem nie
              deine Schwäche war, sondern ein Programm, das nie hinterfragt wurde?
              Genau da setzen wir an.
            </p>
            <Button href="/kontakt" variant="secondary" size="lg" className="mt-2">
              Lass uns darüber sprechen
              <ArrowRight />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto w-full">
            {videoId ? (
              <VideoMessage
                youtubeId={videoId}
                title={site.videoMessage.title}
                aspect="video"
                poster={poster}
              />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-[2px] border border-ink/10 bg-surface-2 shadow-soft">
                <p className="px-6 text-center text-[0.95rem] leading-relaxed text-ink-mid">
                  Die persönliche Videobotschaft folgt in Kürze.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
