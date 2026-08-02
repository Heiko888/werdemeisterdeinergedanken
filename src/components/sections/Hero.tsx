import { HERO_GLOW } from "@/lib/gradients";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import brainLogo from "../../../public/logo-brain.png";

const proof = ["7-Stufen-Modell", "Ohne Esoterik-Floskeln", "Auf Augenhöhe"];

export function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-navy-900 text-cream">
      {/* Navy-Grund mit Glow (wie /mitgliedschaft) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            HERO_GLOW,
        }}
      />

      <Container className="grid items-center gap-14 pt-14 pb-16 sm:pt-28 sm:pb-32 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start gap-8">
          <Reveal>
            <Eyebrow>Bewusstseinsentwicklung in 7 Stufen</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="max-w-2xl text-[2.15rem] font-medium leading-[1.08] text-cream sm:text-5xl md:text-6xl">
              Dein Bewusstsein ist der{" "}
              <em className="accent">Schlüssel</em>. Deine Gedanken sind der{" "}
              <em className="accent">Code</em>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-xl text-lg leading-relaxed text-cream/75">
              Die meisten Menschen werden von ihren Gedanken gelebt. Lerne, sie zu
              durchschauen, alte Muster zu entprogrammieren und deinen inneren
              Code bewusst neu zu schreiben – Schritt für Schritt.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/die-7-stufen" variant="accent" size="lg">
                Die 7 Stufen entdecken
                <ArrowRight />
              </Button>
              <Link
                href="/kontakt"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-cream/30 px-7 text-base font-medium text-cream transition-colors hover:border-cream/60 hover:bg-cream/5"
              >
                Kostenloses Erstgespräch
              </Link>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-cream/60">
              {proof.map((p, i) => (
                <li key={p} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="hidden h-3 w-px bg-cream/20 sm:inline-block" />
                  )}
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative mx-auto w-fit">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-teal-500) 34%, transparent), transparent 66%)",
              }}
            />
            <Image
              src={brainLogo}
              alt="Leuchtendes Gehirn aus Datenpunkten – dein Bewusstsein als Schlüssel, deine Gedanken als Code"
              priority
              className="mx-auto w-[min(420px,80vw)] drop-shadow-[0_12px_60px_rgba(52,196,196,0.4)]"
            />
            {/* editoriales Detail: kleine Kennzahl, für dunklen Grund neu gestylt */}
            <div
              className="absolute -bottom-3 -right-2 hidden rounded-xl px-5 py-4 backdrop-blur lg:block"
              style={{
                background:
                  "linear-gradient(rgba(8,16,42,.85),rgba(8,16,42,.85)) padding-box, linear-gradient(120deg,#8cc63f,#21b2bd) border-box",
                border: "1.5px solid transparent",
                boxShadow: "0 0 26px -6px rgba(52,196,196,.5)",
              }}
            >
              <p className="font-display text-3xl italic text-cream">7</p>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/60">
                Stufen
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
