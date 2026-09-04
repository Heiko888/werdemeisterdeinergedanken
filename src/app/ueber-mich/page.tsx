import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
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
    text: "Beruflich brach vieles weg, innerlich verlor ich den Halt. Ich funktionierte einfach weiter – und merkte lange nicht, wie sehr alte Muster meine Entscheidungen bestimmten.",
  },
  {
    year: "Die ersten Fragen",
    title: "Vom Kämpfen zum Wahrnehmen",
    text: "Über die Meditation lernte ich, nicht mehr gegen jeden Gedanken anzukämpfen, sondern ihn wahrzunehmen – und mir endlich die richtigen Fragen zu stellen.",
  },
  {
    year: "Der schwerste Verlust",
    title: "Tiefer schauen",
    text: "Als ein Mensch, der mir alles bedeutete, plötzlich nicht mehr da war, trugen einfache Antworten nicht mehr. Erst ehrliche Fragen schufen Klarheit und Bewusstsein.",
  },
  {
    year: "Heute",
    title: "Die 7 Stufen weitergeben",
    text: "Aus dem Weg, den ich selbst gegangen bin, wurde eine Landkarte – die 7 Stufen der Bewusstseinsentwicklung, die ich heute an andere weitergebe.",
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
        spotlight="left"
      />

      <section className="bg-paper-aura grain-soft relative py-12 sm:py-16">
        <Container size="narrow">
          <Reveal>
            <div className="flex flex-col items-start gap-5">
              <Eyebrow>Meine Geschichte</Eyebrow>
              <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
                Ich kenne den Kopf, der{" "}
                <em className="accent">nie zur Ruhe kommt</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-5 text-[1.05rem] leading-relaxed text-ink-mid">
              <p>
                Ich rede nicht über etwas, das ich irgendwann in Büchern gelesen
                habe. Ich habe diesen Weg selbst durchlaufen.
              </p>
              <p>
                Es gab eine Zeit, in der mein Leben komplett auf den Kopf gestellt
                war. Beruflich brach vieles weg, innerlich verlor ich zunehmend
                den Halt. Ich funktionierte, reagierte, versuchte irgendwie
                weiterzumachen – und merkte lange nicht, wie sehr Ängste, Gedanken
                und alte Muster meine Entscheidungen bestimmten.
              </p>
              <p>
                Auf meiner Suche nach Antworten beschäftigte ich mich mit vielen
                Dingen. Meditation war eines davon.
              </p>
              <p>
                Meine ersten Versuche waren alles andere als ruhig. Sobald ich die
                Augen schloss, wurde es im Kopf erst richtig laut. Irgendwann
                lernte ich, nicht mehr gegen jeden Gedanken anzukämpfen, sondern
                ihn wahrzunehmen.
              </p>
              <p className="font-medium text-ink">Das war wichtig.</p>
              <p>Aber der eigentliche Wendepunkt kam durch etwas anderes:</p>
              <p className="font-display text-xl italic text-ink">
                Ich begann, mir die richtigen Fragen zu stellen.
              </p>

              <aside className="rounded-2xl border border-accent/25 bg-accent/[0.04] px-6 py-5">
                <p className="text-sm text-ink-mid">Nicht mehr nur:</p>
                <p className="mt-1 font-medium text-ink">
                  Warum passiert mir das alles?
                </p>
                <p className="mt-4 text-sm text-ink-mid">Sondern:</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {[
                    "Was passiert hier eigentlich gerade in mir?",
                    "Warum reagiere ich immer wieder auf dieselbe Weise?",
                    "Ist das, was ich denke, wirklich wahr?",
                    "Woher kommt diese Überzeugung überhaupt?",
                    "Was davon habe ich übernommen, ohne es jemals zu hinterfragen?",
                  ].map((q) => (
                    <li key={q} className="flex gap-3 font-medium text-ink">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ink-mid">Und vor allem:</p>
                <p className="mt-1 font-medium text-ink">
                  Wer bin ich, wenn ich nicht automatisch jedem Gedanken glaube?
                </p>
              </aside>

              <p>Diese Fragen haben mein Leben verändert.</p>
              <p>
                Denn plötzlich begann ich Dinge zu erkennen, die vorher unsichtbar
                gewesen waren. Muster. Ängste. Automatismen. Überzeugungen. Die
                Art, wie ich Situationen bewertete – und wie diese Bewertungen
                wiederum mein Handeln bestimmten.
              </p>
              <p>
                Dann kam der schwerste Verlust meines Lebens. Ein Mensch, der mir
                alles bedeutete, war plötzlich nicht mehr da.
              </p>
              <p>Und spätestens dort funktionierten einfache Antworten nicht mehr.</p>
              <p>
                Ich konnte den Schmerz nicht wegdenken. Ich konnte ihn auch nicht
                mit irgendwelchen positiven Gedanken überdecken.
              </p>
              <p className="font-medium text-ink">Ich musste tiefer schauen.</p>

              <aside className="rounded-2xl border border-accent/25 bg-accent/[0.04] px-6 py-5">
                <ul className="flex flex-col gap-2">
                  {[
                    "Was geschieht in mir?",
                    "Wovor habe ich Angst?",
                    "Woran halte ich fest?",
                    "Was kann ich beeinflussen – und was nicht?",
                    "Was bleibt, wenn etwas wegbricht, worüber ich mich bisher definiert habe?",
                  ].map((q) => (
                    <li key={q} className="flex gap-3 font-medium text-ink">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </aside>

              <p>Mit jeder ehrlichen Frage entstand ein Stück mehr Klarheit.</p>
              <p>
                Nicht immer sofort eine Antwort. Aber{" "}
                <em className="accent not-italic font-medium">Bewusstsein</em>.
              </p>
              <p>Und genau das ist für mich der entscheidende Punkt:</p>
              <p>
                Bewusstseinsentwicklung beginnt nicht damit, dass dir jemand sagt,
                was du denken sollst. Sie beginnt in dem Moment, in dem du
                anfängst, das zu hinterfragen, was du bisher für selbstverständlich
                gehalten hast.
              </p>

              <ul className="my-1 flex flex-col gap-2.5">
                {[
                  "Du beginnst zu beobachten.",
                  "Du erkennst Muster.",
                  "Du verstehst Zusammenhänge.",
                  "Du übernimmst Verantwortung für deine Reaktionen.",
                  "Du beginnst bewusst zu entscheiden, worauf du deine Aufmerksamkeit richtest.",
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-ink">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-500" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <p>
                Und irgendwann verändert sich nicht nur dein Denken. Deine gesamte
                Art, durchs Leben zu gehen, verändert sich.
              </p>
              <p>
                Rückblickend erkenne ich darin einen Entwicklungsweg mit
                verschiedenen Stufen.
              </p>

              <aside className="glow-gold rounded-2xl border border-gold-400/25 bg-surface p-6 shadow-card">
                <p className="text-ink">
                  Genau daraus sind für mich die{" "}
                  <Link
                    href="/die-7-stufen"
                    className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                  >
                    7 Stufen der Bewusstseinsentwicklung
                  </Link>{" "}
                  entstanden.
                </p>
                <p className="mt-2 text-ink-mid">
                  Nicht als theoretisches Modell. Sondern als Landkarte für einen
                  Weg, den ich selbst gegangen bin.
                </p>
              </aside>

              <p>Heute weiß ich:</p>
              <blockquote className="border-l-2 border-accent/40 pl-5">
                <p className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
                  Wir sind nicht unsere Gedanken. Wir sind die, die sie bemerken,
                  hinterfragen und entscheiden können, welchen Gedanken wir weiter
                  folgen.
                </p>
              </blockquote>
              <p>
                Und manchmal beginnt eine tiefgreifende Veränderung nicht mit einer
                neuen Antwort.{" "}
                <em className="accent not-italic font-medium">
                  Sondern mit einer besseren Frage.
                </em>
              </p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/die-7-stufen" variant="accent" className="w-fit">
                Die 7 Stufen ansehen
                <ArrowRight />
              </Button>
              <Button href="/kontakt" variant="secondary" className="w-fit">
                Lern mich kennen
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Meilensteine – vertikale Timeline mit gefüllten Markern */}
      <section className="bg-surface-aura grain-soft relative py-16 sm:py-24">
        <Container size="narrow">
          <Eyebrow>Mein Weg</Eyebrow>
          <ol className="relative mt-10">
            <span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-3 w-px bg-gradient-to-b from-gold-500/55 via-gold-400/35 to-transparent"
            />
            {milestones.map((m) => (
              <Reveal key={m.year}>
                <li className="relative flex gap-6 pb-9 last:pb-0">
                  <span
                    aria-hidden
                    className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 ring-4 ring-surface-2"
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
