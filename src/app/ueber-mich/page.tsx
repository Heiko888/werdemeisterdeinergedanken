import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { values } from "@/lib/content";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/ueber-mich", {
  title: "Über mich",
  description:
    "Heiko Schwaninger – Begleiter für mentale Entprogrammierung. Meine Geschichte, meine Haltung und warum ich Menschen helfe, ihre Gedanken zu meistern.",
});

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
            Hallo, ich bin <em className="accent">Heiko</em>
          </>
        }
        intro="Begleiter für mentale Entprogrammierung. Ich helfe Menschen, den Lärm im Kopf zu verstehen, alte Programme zu lösen und wieder selbst am Steuer zu sitzen."
        image="/ueber-heiko-berg.webp"
        imagePosition="30% 15%"
      />

      <section className="py-12 sm:py-16">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <div className="flex flex-col items-start gap-5">
              <Eyebrow>Meine Geschichte</Eyebrow>
              <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
                Ich kenne den Kopf, der{" "}
                <em className="accent">nie zur Ruhe kommt</em>
              </h2>
              <div className="flex flex-col gap-4 text-[1.05rem] leading-relaxed text-ink-mid">
                <p>
                  Ich rede nicht über etwas, das ich in Büchern gelesen habe. Ich
                  war selbst jahrelang gefangen in Gedankenschleifen, Anspannung
                  und dem Gefühl, mir ständig selbst im Weg zu stehen.
                </p>
                <p>
                  Der Weg heraus war kein Wochenendseminar, sondern echte Arbeit
                  an der Wurzel. Genau diese Erfahrung – und ein klares,
                  wiederholbares Modell – gebe ich heute weiter.
                </p>
              </div>
              <Button href="/kontakt" variant="accent" className="mt-1 w-fit">
                Lern mich kennen
                <ArrowRight />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <figure className="mx-auto w-full max-w-xs">
              <PhotoFrame
                src="/ueber-heiko-hund.webp"
                alt="Heiko mit seinem Hund draußen in der Natur"
                aspect="square"
              />
              <figcaption className="mt-5 border-l-2 border-accent/40 pl-4">
                <p className="font-display text-[1.05rem] italic leading-snug text-ink">
                  „Ein Hund holt dich sofort in den Moment.“
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-mid">
                  Meine persönliche Überzeugung: Hunde stärken dein Bewusstsein.
                  Sie kennen kein Gestern und kein Morgen – nur das Jetzt. Diese
                  Präsenz steckt an, wenn du dich darauf einlässt.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Meilensteine – vertikale Timeline mit gefüllten Markern */}
      <section className="bg-surface-2 py-16 sm:py-24">
        <Container size="narrow">
          <Eyebrow>Mein Weg</Eyebrow>
          <ol className="relative mt-10">
            <span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-3 w-px bg-gradient-to-b from-leaf-500/60 via-teal-500/40 to-transparent"
            />
            {milestones.map((m) => (
              <Reveal key={m.year}>
                <li className="relative flex gap-6 pb-9 last:pb-0">
                  <span
                    aria-hidden
                    className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-leaf-500 to-teal-500 ring-4 ring-surface-2"
                  />
                  <div className="-mt-1 min-w-0">
                    <span className="font-display text-sm italic text-accent/80">
                      {m.year}
                    </span>
                    <h3 className="mt-0.5 text-lg font-medium text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-mid">
                      {m.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Werte – dunkles Kontrast-Band, die Zahlen leuchten auf Navy */}
      <section className="relative isolate overflow-hidden bg-cosmic on-dark py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-70"
        />
        <Container>
          <Eyebrow>Was mich leitet</Eyebrow>
          <h2 className="mt-4 text-[2rem] font-medium text-ink sm:text-4xl">
            Meine Werte
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 70}>
                <div className="flex flex-col gap-2 border-t border-white/15 pt-5">
                  <span className="font-display text-3xl italic text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium text-ink">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-mid">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
