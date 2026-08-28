import type { Metadata } from "next";
import Image from "next/image";
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
        imageClassName="saturate-[1.55] brightness-[1.18] contrast-[1.08]"
        overlayClassName="from-navy-900/52 via-navy-900/38 to-navy-900/62"
        fadeToColor="var(--color-navy-950)"
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href="/bewusstseinstest" variant="accent" size="lg">
            Wo stehe ich gerade?
            <ArrowRight />
          </Button>
        </div>
      </PageHero>

      {/* Der leuchtende Pfad – dunkles Kontrast-Band (das Herzstück der Seite).
          Seitenspezifisch kräftigere Glows als das globale .bg-cosmic: die
          Teal-/Blau-/Lind-Schimmer sind hier bewusst gesättigter, damit der
          Hintergrund auf dieser Kern-Seite lebendiger wirkt. */}
      <section
        className="relative isolate overflow-hidden py-16 text-cream sm:py-24"
        style={{
          background:
            "radial-gradient(62% 52% at 12% 4%, color-mix(in oklab, var(--color-teal-500) 36%, transparent) 0%, transparent 62%)," +
            "radial-gradient(58% 48% at 90% 8%, color-mix(in oklab, var(--color-brand-500) 38%, transparent) 0%, transparent 58%)," +
            "radial-gradient(56% 48% at 60% 100%, color-mix(in oklab, var(--color-leaf-500) 26%, transparent) 0%, transparent 60%)," +
            "var(--color-navy-950)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-70"
        />
        {/* Sternbilder-Fortsetzung: Das Hero-Motiv läuft weich in die Stufen-
            Sektion hinein, damit die Konstellationen nicht am Hero-Rand hart
            enden, sondern sichtbar „in die nächste Sektion laufen". Am oberen
            Rand setzt es (wo der Hero noch dunkel ausklingt) erst dezent ein,
            steigt kurz darunter auf und blendet nach unten in die farbigen
            Glows der Sektion aus. `object-bottom` zeigt den unteren Bildbereich,
            sodass es als Fortsetzung wirkt und nicht als Wiederholung. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] overflow-hidden sm:h-[46rem]"
        >
          <Image
            src="/hero-7-stufen.webp"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-[0.5] saturate-[1.45] brightness-[1.1]"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 18%, #000 40%, transparent 94%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 18%, #000 40%, transparent 94%)",
            }}
          />
        </div>
        {/* Weicher Anschluss an den Hero: Navy-Deckel über dem obersten Rand,
            damit weder der harte Hero-Ausklang noch die farbigen Sektions-Glows
            eine sichtbare Kante bilden. Die Konstellationen tauchen dadurch
            langsam aus dem Dunkel auf, statt am Rand hart zu beginnen. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 sm:h-64"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-navy-950) 0%, color-mix(in oklab, var(--color-navy-950) 55%, transparent) 55%, transparent 100%)",
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

      {/* Abschluss-CTA – heller Release nach dem dunklen Pfad.
          Seitenspezifisch kräftigere Aura als das globale .bg-surface-aura,
          damit der Farbklang zum verstärkten Stufen-Band passt. */}
      <section
        className="grain-soft relative py-16 sm:py-24"
        style={{
          background:
            "radial-gradient(66% 56% at 90% -8%, color-mix(in oklab, var(--color-brand-500) 24%, transparent), transparent 62%)," +
            "radial-gradient(58% 52% at 8% 108%, color-mix(in oklab, var(--color-teal-500) 20%, transparent), transparent 60%)," +
            "var(--color-surface-2)",
        }}
      >
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
