import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icon";
import { StarRating } from "@/components/ui/StarRating";
import { EbookForm } from "./EbookForm";
import ebookMockup from "../../../public/ebook-mockup.webp";

const bullets = [
  "Die 7 Stufen im Überblick",
  "Erste Übungen für mehr Klarheit",
  "Sofort per E-Mail – 100 % kostenlos",
];

export function LeadMagnet() {
  return (
    <section
      id="ebook"
      className="on-dark grain relative isolate scroll-mt-24 overflow-hidden bg-navy-900 py-16 sm:py-32"
    >
      {/* Drei Blöcke in DOM-Reihenfolge Überschrift → Buch → Formular. Auf
          Mobile stapeln sie genau so (Buch sitzt zwischen Überschrift und
          Formular). Auf Desktop rückt das Buch per Grid in die linke Spalte
          über beide Zeilen, Überschrift und Formular stehen rechts. */}
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-6">
        {/* Überschrift + Intro – Mobile oben, Desktop oben rechts */}
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Gratis-Einstieg</Eyebrow>
            <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
              Werde zum bewussten{" "}
              <em className="accent">Gestalter deiner Gedanken</em>
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-ink-mid">
              Sichere dir das kostenlose E-Book und mach den ersten Schritt.
              Kompakt, klar und sofort umsetzbar.
            </p>
          </div>
        </Reveal>

        {/* Buch-Cover – Mobile zwischen Überschrift und Formular, Desktop linke
            Spalte über beide Zeilen. Warmer Gold-Schein und echter
            Schlagschatten, damit es steht statt zu schweben. */}
        <Reveal
          delay={100}
          className="lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center"
        >
          <div className="flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-gold-400) 42%, transparent), transparent 70%)",
                }}
              />
              <Image
                src={ebookMockup}
                alt="Kostenloses E-Book „Die 7 Stufen der Bewusstseinsentwicklung“ von Heiko Schwaninger"
                priority
                className="h-auto w-64 drop-shadow-2xl sm:w-72 lg:w-[28rem]"
              />
              {/* Feine goldene Standlinie – gibt dem Cover einen Boden. */}
              <div
                aria-hidden
                className="mx-auto mt-5 h-px w-40 max-w-[70%]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, color-mix(in oklab, var(--color-gold-500) 70%, transparent), transparent)",
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* Formular – Mobile unter dem Buch, Desktop unten rechts */}
        <Reveal delay={150} className="lg:col-start-2 lg:row-start-2">
          {/* Erhöhte Karte mit Gold-Ring – macht das Formular zum edlen
              Fokuspunkt, statt es nackt auf die Fläche zu legen. */}
          <div className="glow-gold on-light w-full rounded-3xl border border-gold-400/30 bg-surface p-6 sm:p-7">
            <ul className="flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-sm text-ink-mid"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-[0.8rem] text-gold-700">
                    <Check />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <EbookForm />
            </div>

            {/* Trust-Zeile – Social Proof, der auf Hell bisher fehlte. */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/10 pt-4 text-xs text-ink-muted">
              <StarRating />
              <span>
                Von hunderten Leser:innen geladen · kein Spam, jederzeit
                abbestellbar
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
