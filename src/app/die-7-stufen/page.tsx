import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Faq } from "@/components/sections/Faq";
import { stages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Die 7 Stufen der Bewusstseinsentwicklung",
  description:
    "Der strukturierte Weg vom ersten Erwachen bis zur Meisterschaft über deine Gedanken – die 7 Stufen der Bewusstseinsentwicklung im Detail.",
};

export default function SevenStagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Der Weg"
        title={
          <>
            Die 7 Stufen der{" "}
            <span className="text-gradient">Bewusstseinsentwicklung</span>
          </>
        }
        intro="Ein klarer, aufeinander aufbauender Weg. Jede Stufe bringt dich näher an einen Zustand, in dem du deine Gedanken nicht mehr erleidest, sondern bewusst gestaltest."
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakt" variant="primary" size="lg">
            Wo stehe ich gerade?
            <ArrowRight />
          </Button>
        </div>
      </PageHero>

      <section className="py-8 sm:py-12">
        <Container size="narrow">
          <ol className="relative flex flex-col gap-6 before:absolute before:left-[1.6rem] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-brand-400/60 before:via-cosmic-violet/40 before:to-transparent sm:before:left-[1.85rem]">
            {stages.map((stage) => (
              <li key={stage.number} className="relative flex gap-5 sm:gap-7">
                <span className="relative z-10 flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-white/15 bg-navy-900 font-display text-lg font-bold text-gradient">
                  {stage.number}
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-navy-800/40 p-6 transition-colors hover:border-brand-400/30">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                      {stage.title}
                    </h2>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-200">
                      {stage.subtitle}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mist-200/75 sm:text-base">
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl border border-brand-400/25 bg-gradient-to-br from-brand-600/25 to-cosmic-violet/15 p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Bereit, deine Stufe zu bestimmen?
            </h2>
            <p className="prose-lead max-w-xl">
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
