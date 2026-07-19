import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";

export function MaybeNotYou() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm italic text-ink-soft/70">
                06
              </span>
              <Eyebrow>Ein anderer Blickwinkel</Eyebrow>
            </div>
            <h2 className="text-[2.1rem] font-medium leading-[1.1] text-ink sm:text-5xl">
              Was, wenn es{" "}
              <em className="accent">nicht an dir</em> liegt?
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-ink-soft/75">
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
            <PhotoFrame aspect="landscape" caption="Videobotschaft folgt" />
            {/* dezenter Play-Hinweis */}
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 bg-paper/70 backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-0.5 fill-ink" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
