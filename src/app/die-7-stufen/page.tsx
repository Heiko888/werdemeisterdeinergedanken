import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { Faq } from "@/components/sections/Faq";
import { stages } from "@/lib/content";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/die-7-stufen", {
  title: "Die 7 Stufen der Bewusstseinsentwicklung",
  description:
    "Der strukturierte Weg vom Autopilot bis zur Meisterschaft über deine Gedanken – die 7 Stufen der Bewusstseinsentwicklung im Detail.",
});

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
        imageClassName="saturate-[1.35] brightness-110 contrast-105"
        overlayClassName="from-navy-900/70 via-navy-900/58 to-navy-900/78"
        fadeToColor="var(--color-navy-950)"
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/bewusstseinstest" variant="accent" size="lg">
            Wo stehe ich gerade?
            <ArrowRight />
          </Button>
        </div>
      </PageHero>

      {/* Der leuchtende Pfad – dunkles Kontrast-Band (das Herzstück der Seite) */}
      <section className="relative isolate overflow-hidden bg-cosmic py-16 text-cream sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-70"
        />
        {/* Nahtloser Anschluss an den Hero: die oberen Sektions-Glows blenden
            erst unterhalb der Kante ein (navy-950 → transparent), damit Hero
            und Stufen-Band als eine zusammenhängende Fläche wirken. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 sm:h-56"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-navy-950), transparent)",
          }}
        />
        <Container size="narrow">
          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-7 top-10 bottom-10 w-0.5 -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(140,198,63,.1), #8cc63f, #21b2bd, rgba(33,178,189,.1))",
              }}
            />
            {stages.map((stage, i) => (
              <Reveal key={stage.number} delay={(i % 3) * 60}>
                <li className="relative flex gap-6 py-5">
                  <span
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-medium text-cream"
                    style={{
                      background:
                        "linear-gradient(#08102a,#08102a) padding-box, linear-gradient(120deg,#8cc63f,#21b2bd) border-box",
                      border: "1.5px solid transparent",
                      boxShadow: "0 0 22px -4px rgba(52,196,196,.5)",
                    }}
                  >
                    {stage.number}
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="text-xl font-medium text-cream sm:text-2xl">
                        {stage.title}
                      </h2>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-teal-300/80">
                        {stage.subtitle}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/70 sm:text-base">
                      {stage.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Abschluss-CTA – heller Release nach dem dunklen Pfad */}
      <section className="bg-surface-2 py-16 sm:py-24">
        <Container size="narrow">
          <div className="flex flex-col items-center gap-5 text-center">
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
