import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
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
      {/* Kopf – Spotlight-Aufbau wie auf der Mitgliedschaftsseite: Textspalte
          links, das Motiv (Sonnenuntergang/„Weg ins Licht") bleibt rechts frei. */}
      <PageHero
        eyebrow="Bewusstseinstest"
        title={
          <>
            Wo findest du dich <em className="accent">gerade</em>?
          </>
        }
        intro="21 ehrliche Fragen zeigen dir, auf welcher der 7 Stufen der Bewusstseinsentwicklung du aktuell stehst – und welcher nächste Schritt für dich möglich ist. Antworte spontan; es gibt kein Richtig oder Falsch. Dauer: etwa 5 Minuten."
        image="/hero-bewusstseinstest.webp"
        spotlight="right"
      />

      {/* Test */}
      <section className="bg-paper-aura grain-soft relative py-12 sm:py-16">
        <ConsciousnessTest />
      </section>
    </>
  );
}
