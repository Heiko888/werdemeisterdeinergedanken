import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { Faq } from "@/components/sections/Faq";
import { stages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Die 7 Stufen der Bewusstseinsentwicklung",
  description:
    "Der strukturierte Weg vom Autopilot bis zur Meisterschaft über deine Gedanken – die 7 Stufen der Bewusstseinsentwicklung im Detail.",
};

export default function SevenStagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Der Weg"
        title={
          <>
            Die 7 Stufen der{" "}
            <em className="accent">Bewusstseinsentwicklung</em>
          </>
        }
        intro="Ein klarer, aufeinander aufbauender Weg. Jede Stufe bringt dich näher an einen Zustand, in dem du deine Gedanken nicht mehr erleidest, sondern bewusst gestaltest."
        image="/hero-7-stufen.webp"
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/bewusstseinstest" variant="accent" size="lg">
            Wo stehe ich gerade?
            <ArrowRight />
          </Button>
        </div>
      </PageHero>

      <section className="py-8 sm:py-12">
        <Container size="narrow">
          <ol className="relative flex flex-col before:absolute before:left-[1.35rem] before:top-6 before:bottom-6 before:w-px before:bg-gradient-to-b before:from-leaf-400/50 before:via-teal-500/30 before:to-transparent">
            {stages.map((stage, i) => (
              <Reveal key={stage.number} delay={(i % 3) * 60}>
                <li className="relative flex gap-6 border-t border-ink/10 py-7 first:border-t-0">
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper font-display text-base italic text-accent">
                    {stage.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="text-xl font-medium text-ink sm:text-2xl">
                        {stage.title}
                      </h2>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        {stage.subtitle}
                      </span>
                    </div>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-mid sm:text-base">
                      {stage.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-14 flex flex-col items-center gap-5 border-t border-accent/25 pt-14 text-center">
            <h2 className="font-display text-2xl italic text-ink sm:text-3xl">
              Bereit, deine Stufe zu bestimmen?
            </h2>
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink-mid">
              In einem kostenlosen Erstgespräch finden wir gemeinsam heraus, wo du
              gerade stehst und welcher Schritt für dich als Nächstes dran ist.
            </p>
            <Button href="/kontakt" variant="accent" size="lg">
              Kostenloses Erstgespräch
              <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>

      <Faq />
    </>
  );
}
