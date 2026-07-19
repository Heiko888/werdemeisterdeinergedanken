import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { NeuralOrb } from "@/components/visuals/NeuralOrb";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Heiko Schwaninger – Begleiter für mentale Entprogrammierung. Meine Geschichte, meine Haltung und warum ich Menschen helfe, ihre Gedanken zu meistern.",
};

const milestones = [
  {
    year: "Der Anfang",
    title: "Funktionieren statt leben",
    text: "Nach außen lief alles – innen herrschte Dauerlärm aus Grübeln und Selbstzweifel. Ich dachte lange, das sei einfach mein Charakter.",
  },
  {
    year: "Der Wendepunkt",
    title: "Die entscheidende Erkenntnis",
    text: "Irgendwann verstand ich: Ich bin nicht meine Gedanken. Ich bin der, der sie bemerkt. Ab da wurde alles anders.",
  },
  {
    year: "Der Weg",
    title: "Entprogrammieren und neu ausrichten",
    text: "Ich habe alte Muster Stück für Stück durchschaut, gelöst und durch bewusste ersetzt. Aus Theorie wurde gelebte Praxis.",
  },
  {
    year: "Heute",
    title: "Andere auf ihrem Weg begleiten",
    text: "Was mir geholfen hat, gebe ich heute strukturiert weiter – bodenständig, ehrlich und auf Augenhöhe.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Über mich"
        title={
          <>
            Hallo, ich bin{" "}
            <span className="text-gradient">Heiko Schwaninger</span>
          </>
        }
        intro="Begleiter für mentale Entprogrammierung. Ich helfe Menschen, den Lärm im Kopf zu verstehen, alte Programme zu lösen und wieder selbst am Steuer zu sitzen."
      />

      <section className="py-8 sm:py-12">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>Meine Geschichte</Eyebrow>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ich kenne den Kopf, der nie zur Ruhe kommt
            </h2>
            <div className="flex flex-col gap-4 prose-lead">
              <p>
                Ich rede nicht über etwas, das ich in Büchern gelesen habe. Ich
                war selbst jahrelang gefangen in Gedankenschleifen, Anspannung und
                dem Gefühl, mir ständig selbst im Weg zu stehen.
              </p>
              <p>
                Der Weg heraus war kein Wochenendseminar, sondern echte Arbeit an
                der Wurzel. Genau diese Erfahrung – und ein klares, wiederholbares
                Modell – gebe ich heute weiter.
              </p>
            </div>
            <Button href="/kontakt" variant="primary" className="mt-1 w-fit">
              Lern mich kennen
              <ArrowRight />
            </Button>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <NeuralOrb />
          </div>
        </Container>
      </section>

      {/* Meilensteine */}
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <div className="flex flex-col gap-5">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-navy-800/40 p-6 sm:flex-row sm:gap-6"
              >
                <span className="w-32 shrink-0 text-sm font-semibold uppercase tracking-wider text-brand-200">
                  {m.year}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{m.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mist-200/75">
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Werte */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <Container>
          <Eyebrow>Was mich leitet</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Meine Werte
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-navy-800/50 p-6"
              >
                <span className="font-display text-sm font-bold text-gradient">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-white">{v.title}</h3>
                <p className="text-sm leading-relaxed text-mist-200/70">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
