import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NeuralOrb } from "@/components/visuals/NeuralOrb";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";

const benefits = [
  "Du erkennst, welche Gedanken dich unbewusst steuern",
  "Du löst alte Prägungen und Glaubenssätze an der Wurzel",
  "Du entwickelst einen ruhigen, klaren inneren Zustand",
  "Du triffst Entscheidungen aus Präsenz statt aus Angst",
  "Du gestaltest dein Denken bewusst – statt es zu erleiden",
];

export function Compass() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic opacity-90" />
      <Container>
        <div className="glass-strong grid items-center gap-10 rounded-3xl p-8 sm:p-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Dein energetischer Kompass</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Durchlaufe alle 7 Stufen –{" "}
              <span className="text-gradient">bewusst und geführt</span>
            </h2>
            <p className="prose-lead">
              Der Kompass zeigt dir jederzeit, wo du gerade stehst und was dein
              nächster Schritt ist. So wird aus einem diffusen Gefühl ein
              greifbarer Weg.
            </p>

            <ul className="flex flex-col gap-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-sm text-cosmic-cyan">
                    <Check />
                  </span>
                  <span className="text-sm leading-relaxed text-mist-100/85">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <Button href="/kontakt" variant="primary" size="lg" className="mt-2">
              Meinen Standort bestimmen
              <ArrowRight />
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <NeuralOrb />
          </div>
        </div>
      </Container>
    </section>
  );
}
