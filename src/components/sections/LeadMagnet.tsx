import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icon";
import { EbookForm } from "./EbookForm";

const bullets = [
  "Die 7 Stufen kompakt erklärt",
  "Erste Übungen für mehr Klarheit",
  "Sofort per E-Mail – 100 % kostenlos",
];

export function LeadMagnet() {
  return (
    <section className="relative border-t border-ink/10 bg-white py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[0.8fr_1fr]">
        {/* Buch-Mockup */}
        <Reveal className="order-2 lg:order-1">
          <div className="flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-leaf-500) 26%, transparent), transparent 70%)",
                }}
              />
              <div className="relative h-80 w-60 overflow-hidden rounded-[2px] bg-gradient-to-br from-navy-800 to-navy-950 shadow-2xl ring-1 ring-white/10">
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-leaf-400 to-teal-500" />
                <div className="flex h-full flex-col items-center justify-between p-7 text-center">
                  <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-leaf-400/90">
                    Kostenloses E-Book
                  </span>
                  <div className="flex flex-col items-center gap-4">
                    <span className="h-12 w-12 rounded-full bg-gradient-to-br from-leaf-400 via-teal-400 to-brand-500" />
                    <h3 className="font-display text-xl italic leading-tight text-cream">
                      Werde Meister deiner Gedanken
                    </h3>
                  </div>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-cream-dim/60">
                    Heiko Schwaninger
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text + Formular */}
        <Reveal delay={100} className="order-1 lg:order-2">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Gratis-Einstieg</Eyebrow>
            <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
              Werde zum bewussten{" "}
              <em className="accent">Gestalter deiner Gedanken</em>
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-ink-soft/75">
              Sichere dir das kostenlose E-Book und mach den ersten Schritt.
              Kompakt, klar und sofort umsetzbar.
            </p>

            <ul className="flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-sm text-ink-soft/80"
                >
                  <Check className="text-base text-accent" />
                  {b}
                </li>
              ))}
            </ul>

            <EbookForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
