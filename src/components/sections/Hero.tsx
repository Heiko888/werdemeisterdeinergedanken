import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CosmicBackground } from "@/components/visuals/CosmicBackground";
import { NeuralOrb } from "@/components/visuals/NeuralOrb";
import { ArrowRight, Check } from "@/components/ui/Icon";

const proofPoints = ["7-Stufen-Modell", "Ohne Esoterik-Blabla", "Auf Augenhöhe"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <CosmicBackground variant="hero" />

      <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cosmic-cyan animate-pulse-slow" />
            Bewusstseinsentwicklung in 7 Stufen
          </span>

          <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            Dein Bewusstsein ist der{" "}
            <span className="text-gradient">Schlüssel</span>.
            <br />
            Deine Gedanken sind der{" "}
            <span className="text-gradient-leaf">Code</span>.
          </h1>

          <p className="prose-lead max-w-xl">
            Die meisten Menschen werden von ihren Gedanken gelebt. Lerne, sie zu
            durchschauen, alte Muster zu entprogrammieren und deinen inneren
            Code bewusst neu zu schreiben – Schritt für Schritt.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/#angebot" variant="primary" size="lg">
              Die 7 Stufen entdecken
              <ArrowRight />
            </Button>
            <Button href="/kontakt" variant="secondary" size="lg">
              Kostenloses Erstgespräch
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {proofPoints.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2 text-sm text-mist-200/80"
              >
                <Check className="text-base text-cosmic-cyan" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <NeuralOrb />
        </div>
      </Container>
    </section>
  );
}
