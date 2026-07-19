import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="stimmen" className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cosmic-violet/10 blur-[120px]" />

      <Container>
        <SectionHeading
          eyebrow="Stimmen"
          title="Menschen, die den Weg gegangen sind"
          intro="Echte Erfahrungen von Menschen, die gelernt haben, ihre Gedanken zu meistern."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-800/50 p-7"
            >
              <StarRating rating={t.rating} />
              <blockquote className="flex-1 text-sm leading-relaxed text-mist-100/85">
                „{t.quote}“
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cosmic-violet text-sm font-bold text-white">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {t.name}
                  </span>
                  <span className="block text-xs text-mist-300/60">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-mist-300/50">
          Namen geändert · Erfahrungsberichte sind individuell und keine Garantie
          für ein bestimmtes Ergebnis.
        </p>
      </Container>
    </section>
  );
}
