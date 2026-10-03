import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ConsciousnessTest } from "@/components/sections/ConsciousnessTest";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bewusstseinstest – Wo findest du dich gerade?",
  description:
    "Der kostenlose Bewusstseinstest: 21 Aussagen zur persönlichen Selbsteinschätzung – als Orientierung, wo du dich in den 7 Stufen der Bewusstseinsentwicklung gerade wiederfindest.",
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
        intro="21 Aussagen zur persönlichen Selbsteinschätzung: Du schätzt selbst ein, was auf dich zutrifft – und erhältst eine Orientierung, in welcher der 7 Stufen der Bewusstseinsentwicklung du dich gerade wiederfindest. Keine Diagnose, kein Wissenstest, kein Richtig oder Falsch. Antworte spontan. Dauer: etwa 5 Minuten."
        image="/hero-bewusstseinstest.webp"
        spotlight="right"
        foreground="/heiko-bewusstseinstest-zeigt.png"
        foregroundAlt="Heiko Schwaninger deutet einladend auf dich – jetzt den Bewusstseinstest starten"
      />

      {/* Test */}
      <section className="bg-paper-aura grain-soft relative py-12 sm:py-16">
        <ConsciousnessTest />
      </section>
    </>
  );
}
