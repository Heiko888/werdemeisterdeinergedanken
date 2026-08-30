import { HERO_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ConsciousnessTest } from "@/components/sections/ConsciousnessTest";
import { site } from "@/lib/site";

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
      <section className="on-dark grain relative flex min-h-[22rem] flex-col justify-center overflow-hidden bg-navy-900 py-16 text-cream sm:min-h-[34rem] sm:py-24">
        {/* Ruhiger Marken-Glow auf Navy – ohne Titelbild */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: HERO_GLOW }}
        />
        <Container size="narrow" className="relative z-10 flex flex-col items-center gap-5 text-center">
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
