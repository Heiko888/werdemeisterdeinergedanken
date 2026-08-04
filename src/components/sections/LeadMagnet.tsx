import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icon";
import { EbookForm } from "./EbookForm";
import ebookMockup from "../../../public/ebook-mockup.webp";

const bullets = [
  "Die 7 Stufen kompakt erklärt",
  "Erste Übungen für mehr Klarheit",
  "Sofort per E-Mail – 100 % kostenlos",
];

export function LeadMagnet() {
  return (
    <section
      id="ebook"
      className="relative scroll-mt-24 border-t border-ink/10 bg-paper py-16 sm:py-32"
    >
      <Container className="grid items-center gap-16 lg:grid-cols-[0.8fr_1fr]">
        {/* Buch-Cover */}
        <Reveal className="order-2 lg:order-1">
          <div className="flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-leaf-500) 30%, transparent), transparent 70%)",
                }}
              />
              <Image
                src={ebookMockup}
                alt="Kostenloses E-Book „Die 7 Stufen der Bewusstseinsentwicklung“ von Heiko Schwaninger"
                priority
                className="h-auto w-64 sm:w-72"
              />
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
            <p className="text-[1.05rem] leading-relaxed text-ink-mid">
              Sichere dir das kostenlose E-Book und mach den ersten Schritt.
              Kompakt, klar und sofort umsetzbar.
            </p>

            <ul className="flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-sm text-ink-mid"
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
