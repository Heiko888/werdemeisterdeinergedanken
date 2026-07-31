import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";

export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden bg-navy-900 py-24 text-cream sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 105%, color-mix(in oklab, var(--color-teal-500) 24%, transparent), transparent 65%), radial-gradient(45% 40% at 6% -5%, color-mix(in oklab, var(--color-brand-500) 20%, transparent), transparent 62%)",
        }}
      />
      <Container size="narrow" className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="max-w-2xl text-[2.3rem] font-medium leading-[1.08] text-cream sm:text-5xl">
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
            <Link
              href="/die-7-stufen"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-cream/30 px-7 text-base font-medium text-cream transition-colors hover:border-cream/60 hover:bg-cream/5"
            >
              Die 7 Stufen ansehen
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
