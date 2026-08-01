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
    <section className="relative border-y border-ink/10 bg-white py-16 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-sm">
            <PhotoFrame
              src="/kompass-weg.webp"
              alt="Der Weg der Bewusstseinsentwicklung: sieben Wegweiser entlang eines Waldpfads – von „Erkenne deine Gedanken“ bis „Entfalte dein Potenzial“ – mit einem energetischen Kompass im Vordergrund"
              aspect="portrait"
            />
          </div>
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm italic text-ink-mid">
                02
              </span>
              <Eyebrow>Dein energetischer Kompass</Eyebrow>
            </div>
            <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
              Durchlaufe alle 7 Stufen –{" "}
              <em className="accent">bewusst und geführt</em>
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-ink-mid">
              Der Kompass zeigt dir jederzeit, wo du gerade stehst und was dein
              nächster Schritt ist. So wird aus einem diffusen Gefühl ein
              greifbarer Weg.
            </p>

            <ul className="flex w-full flex-col">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-4 border-t border-ink/10 py-3.5 text-sm leading-relaxed text-ink-mid"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>

            <Button
              href="/bewusstseinstest"
              variant="accent"
              size="lg"
              className="mt-2"
            >
              Wo stehe ich gerade
              <ArrowRight />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
