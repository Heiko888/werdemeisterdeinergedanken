import { HERO_GLOW } from "@/lib/gradients";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";

export function FinalCta() {
  return (
    <section className="on-dark grain relative overflow-hidden bg-navy-900 py-24 text-cream sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            HERO_GLOW,
        }}
      />
      <Container size="narrow" className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="max-w-2xl text-[2rem] font-medium leading-[1.1] text-cream sm:text-4xl md:text-[2.9rem]">
            Bereit für deinen{" "}
            <em className="accent">nächsten Schritt</em>?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto max-w-xl text-[1.05rem] leading-relaxed text-cream/75">
            Dein Bewusstsein wartet nicht. Jeder Tag, an dem du deine Gedanken
            bewusster wählst, verändert dein Leben ein Stück. Fang heute an.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/kontakt" variant="accent" size="lg">
              Kostenloses Erstgespräch
              <ArrowRight />
            </Button>
            <Button href="/die-7-stufen" variant="secondary" size="lg">
              Die 7 Stufen ansehen
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
