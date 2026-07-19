import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";

const benefits = [
  "Du erkennst, welche Gedanken dich unbewusst steuern",
  "Du löst alte Prägungen und Glaubenssätze an der Wurzel",
  "Du entwickelst einen ruhigen, klaren inneren Zustand",
  "Du triffst Entscheidungen aus Präsenz statt aus Angst",
  "Du gestaltest dein Denken bewusst – statt es zu erleiden",
];

export function Compass() {
  return (
    <section className="relative border-t border-white/10 bg-navy-900 py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-sm">
            <PhotoFrame aspect="square" caption="Stimmungsbild folgt" />
          </div>
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm italic text-cream-dim/70">
                02
              </span>
              <Eyebrow>Dein energetischer Kompass</Eyebrow>
            </div>
            <h2 className="text-[2rem] font-medium leading-[1.12] text-cream sm:text-4xl">
              Durchlaufe alle 7 Stufen –{" "}
              <em className="accent">bewusst und geführt</em>
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-cream-dim/75">
              Der Kompass zeigt dir jederzeit, wo du gerade stehst und was dein
              nächster Schritt ist. So wird aus einem diffusen Gefühl ein
              greifbarer Weg.
            </p>

            <ul className="flex w-full flex-col">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-4 border-t border-white/10 py-3.5 text-sm leading-relaxed text-cream-dim/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-400" />
                  {b}
                </li>
              ))}
            </ul>

            <Button href="/kontakt" variant="accent" size="lg" className="mt-2">
              Meinen Standort bestimmen
              <ArrowRight />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
