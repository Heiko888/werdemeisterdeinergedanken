import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VideoMessage } from "@/components/ui/VideoMessage";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export function MaybeNotYou() {
  return (
    <section className="relative border-t border-ink/10 py-16 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm italic text-ink-mid">
                06
              </span>
              <Eyebrow>Ein anderer Blickwinkel</Eyebrow>
            </div>
            <h2 className="text-[2.1rem] font-medium leading-[1.1] text-ink sm:text-5xl">
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
          <div className="relative mx-auto w-full max-w-md">
            <VideoMessage
              youtubeId={site.videoMessage.youtubeId}
              title={site.videoMessage.title}
              aspect="landscape"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
