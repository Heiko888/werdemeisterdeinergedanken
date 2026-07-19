import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[130px]" />

      <Container size="narrow" className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Bereit für deinen{" "}
          <span className="text-gradient">nächsten Schritt</span>?
        </h2>
        <p className="prose-lead max-w-2xl">
          Dein Bewusstsein wartet nicht. Jeder Tag, an dem du deine Gedanken
          bewusster wählst, verändert dein Leben ein Stück. Fang heute an.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/kontakt" variant="accent" size="lg">
            Kostenloses Erstgespräch
            <ArrowRight />
          </Button>
          <Button href="/die-7-stufen" variant="secondary" size="lg">
            Die 7 Stufen ansehen
          </Button>
        </div>
      </Container>
    </section>
  );
}
