import { HERO_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ConsciousnessTest } from "@/components/sections/ConsciousnessTest";
import { site } from "@/lib/site";
import heroBild from "../../../public/hero-bewusstseinstest.webp";

export const metadata: Metadata = {
  title: "Bewusstseinstest – Wo findest du dich gerade?",
  description:
    "Der kostenlose Bewusstseinstest: 21 Fragen zeigen dir, auf welcher der 7 Stufen der Bewusstseinsentwicklung du gerade stehst – und was dein nächster Schritt ist.",
  alternates: { canonical: `${site.url}/bewusstseinstest` },
};

export default function BewusstseinstestPage() {
  return (
    <>
      {/* Kopf */}
      <section className="on-dark grain relative flex flex-col overflow-hidden bg-navy-900 text-cream lg:min-h-[34rem] lg:justify-center">
        {/* Bild – Kompass & Treppe ins Licht. Bis lg als eigenes Band im Fluss
            (volle Höhe, unbeschnitten) wie auf der Mitgliedschaftsseite, damit
            auf schmalen Displays das ganze Motiv sichtbar bleibt; ab lg liegt es
            wie bisher dezent als Hintergrund hinter dem Text. */}
        <div className="relative w-full shrink-0 aspect-[3/2] lg:absolute lg:inset-0 lg:z-0 lg:aspect-auto">
          <Image
            src={heroBild}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="pointer-events-none z-0 object-cover object-center lg:opacity-55"
          />
          {/* Unterkante mobil ins Navy blenden, damit Bildband und Textblock
              weich ineinander übergehen statt hart abzusetzen. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900 to-transparent lg:hidden"
          />
        </div>
        {/* Glow (hält den Farbton konsistent) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: HERO_GLOW }}
        />
        {/* Navy-Schleier für Lesbarkeit über dem Bild – erst ab lg, darunter
            steht der Text ohnehin auf reinem Navy unter dem Band. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          style={{
            background: `linear-gradient(to right, color-mix(in oklab, var(--color-navy-900) 80%, transparent), color-mix(in oklab, var(--color-navy-900) 45%, transparent) 55%, color-mix(in oklab, var(--color-navy-900) 72%, transparent))`,
          }}
        />
        <Container size="narrow" className="relative z-10 flex flex-col items-center gap-5 pb-14 pt-8 text-center sm:pb-16 sm:pt-10 lg:py-24">
          <Eyebrow>Bewusstseinstest</Eyebrow>
          <h1 className="text-[1.9rem] font-medium leading-[1.1] text-cream sm:[hyphens:none] sm:[overflow-wrap:normal] sm:text-5xl">
            Wo findest du dich <em className="accent">gerade</em>?
          </h1>
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-cream/75">
            21 ehrliche Fragen zeigen dir, auf welcher der 7 Stufen der
            Bewusstseinsentwicklung du aktuell stehst – und welcher nächste
            Schritt für dich möglich ist. Antworte spontan; es gibt kein Richtig
            oder Falsch. Dauer: etwa 5 Minuten.
          </p>
        </Container>
      </section>

      {/* Test */}
      <section className="bg-paper-aura grain-soft relative py-12 sm:py-16">
        <ConsciousnessTest />
      </section>
    </>
  );
}
