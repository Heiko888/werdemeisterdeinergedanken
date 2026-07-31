import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section
      id="stimmen"
      className="relative border-y border-ink/10 bg-white py-16 sm:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Stimmen"
            title={
              <>
                Menschen, die den Weg{" "}
                <em className="accent">gegangen sind</em>
              </>
            }
            intro="Echte Erfahrungen von Menschen, die gelernt haben, ihre Gedanken zu meistern."
          />
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex min-w-0 flex-col gap-5 border-t border-ink/10 pt-6">
                <span
                  className="font-display text-5xl italic leading-none text-accent/50"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1 font-display text-lg italic leading-relaxed text-ink/90">
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-center justify-between gap-3 pt-2">
                  <span>
                    <span className="block text-sm font-medium text-ink">
                      {t.name}
                    </span>
                    <span className="block text-xs text-ink-muted">
                      {t.role}
                    </span>
                  </span>
                  <StarRating rating={t.rating} className="text-sm" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-ink-muted">
          Namen geändert · Erfahrungsberichte sind individuell und keine Garantie
          für ein bestimmtes Ergebnis.
        </p>
      </Container>
    </section>
  );
}
