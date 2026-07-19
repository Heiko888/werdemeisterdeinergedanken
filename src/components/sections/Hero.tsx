import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ArrowRight } from "@/components/ui/Icon";

const proof = ["7-Stufen-Modell", "Ohne Esoterik-Floskeln", "Auf Augenhöhe"];

export function Hero() {
  return (
    <section className="grain relative overflow-hidden">
      {/* sehr dezenter Grundton */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, color-mix(in oklab, var(--color-teal-500) 14%, transparent), transparent 60%), radial-gradient(50% 45% at 100% 20%, color-mix(in oklab, var(--color-brand-700) 16%, transparent), transparent 55%)",
        }}
      />

      <Container className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-start gap-8">
          <Reveal>
            <Eyebrow>Bewusstseinsentwicklung in 7 Stufen</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="max-w-2xl text-[2.6rem] font-medium leading-[1.08] text-ink sm:text-5xl md:text-6xl">
              Dein Bewusstsein ist der{" "}
              <em className="accent">Schlüssel</em>. Deine Gedanken sind der{" "}
              <em className="accent">Code</em>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft/75">
              Die meisten Menschen werden von ihren Gedanken gelebt. Lerne, sie zu
              durchschauen, alte Muster zu entprogrammieren und deinen inneren
              Code bewusst neu zu schreiben – Schritt für Schritt.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/#angebot" variant="accent" size="lg">
                Die 7 Stufen entdecken
                <ArrowRight />
              </Button>
              <Button href="/kontakt" variant="secondary" size="lg">
                Kostenloses Erstgespräch
              </Button>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-ink-soft/70">
              {proof.map((p, i) => (
                <li key={p} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="hidden h-3 w-px bg-ink/15 sm:inline-block" />
                  )}
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-teal-500) 30%, transparent), transparent 70%)",
              }}
            />
            <PhotoFrame caption="Porträt Heiko" />
            {/* editoriales Detail: kleine Kennzahl */}
            <div className="absolute -bottom-5 -right-5 hidden rounded-[2px] border border-ink/10 bg-white/95 px-5 py-4 backdrop-blur lg:block">
              <p className="font-display text-3xl italic text-ink">7</p>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft/60">
                Stufen
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
