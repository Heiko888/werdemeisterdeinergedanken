import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Check } from "@/components/ui/Icon";
import { EbookForm } from "./EbookForm";

const bullets = [
  "Die 7 Stufen kompakt erklärt",
  "Erste Übungen für mehr Klarheit",
  "Sofort per E-Mail – 100 % kostenlos",
];

export function LeadMagnet() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-25" />
      <div className="pointer-events-none absolute -left-20 top-1/2 -z-10 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-brand-600/15 blur-[110px]" />

      <Container>
        <div className="glass-strong grid items-center gap-10 rounded-3xl p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Buch-Mockup */}
          <div className="flex justify-center">
            <div className="relative animate-float">
              <div className="absolute -inset-6 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="relative h-72 w-56 rounded-r-lg rounded-l-sm bg-gradient-to-br from-navy-700 to-navy-950 shadow-2xl ring-1 ring-white/10">
                <div className="absolute left-0 top-0 h-full w-2.5 rounded-l-sm bg-gradient-to-b from-gold-300 to-cosmic-violet" />
                <div className="flex h-full flex-col items-center justify-between p-6 text-center">
                  <span className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-brand-200">
                    Kostenloses E-Book
                  </span>
                  <div className="flex flex-col items-center gap-3">
                    <span className="h-14 w-14 rounded-full bg-gradient-to-br from-gold-300 via-cosmic-cyan to-cosmic-violet" />
                    <h3 className="font-display text-lg font-bold leading-tight text-white">
                      Werde Meister deiner Gedanken
                    </h3>
                  </div>
                  <span className="text-[0.65rem] text-mist-300/60">
                    Heiko Schwaninger
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text + Formular */}
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Gratis-Einstieg</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Werde du selbst zum bewussten Gestalter deiner Gedanken
            </h2>
            <p className="prose-lead">
              Sichere dir das kostenlose E-Book und mach den ersten Schritt.
              Kompakt, klar und sofort umsetzbar.
            </p>

            <ul className="flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-mist-100/85">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-cosmic-cyan">
                    <Check className="text-xs" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <EbookForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
