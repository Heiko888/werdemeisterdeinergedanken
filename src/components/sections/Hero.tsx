import { HERO_GLOW } from "@/lib/gradients";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import heikoHero from "../../../public/heiko-hero.webp";

const proof = ["7-Stufen-Modell", "Ohne Esoterik-Floskeln", "Auf Augenhöhe"];

export function Hero() {
  return (
    <section className="on-dark grain relative overflow-hidden bg-navy-900 text-cream">
      {/* Navy-Grund mit Glow (wie /mitgliedschaft) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            HERO_GLOW,
        }}
      />

      {/* Weicher Übergang zur hellen Folge-Sektion: Navy-Grund und Porträt lösen
          sich zum unteren Rand hin in den Papierton auf, damit der Wechsel
          dunkel→hell nicht als harte Kante bricht. Die Ausblende sitzt bewusst
          nur im unteren Bereich, damit Text und „7 Stufen"-Kennzahl klar bleiben. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 sm:h-48 lg:h-56"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 44%, color-mix(in oklab, var(--color-paper) 42%, transparent) 74%, var(--color-paper) 100%)",
        }}
      />

      <Container className="grid gap-8 pt-14 pb-16 sm:gap-10 sm:pt-28 sm:pb-20 lg:grid-cols-[0.95fr_1fr] lg:items-end lg:pb-0">
        <div className="flex flex-col items-start gap-7 sm:gap-8 lg:self-center lg:pb-28">
          <Reveal>
            <Eyebrow>Bewusstseinsentwicklung in 7 Stufen</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="max-w-2xl text-[2.15rem] font-medium leading-[1.08] text-cream sm:text-5xl md:text-6xl">
              Nicht die <em className="accent">Umstände</em> formen dich,
              sondern was du darüber <em className="accent">denkst</em>.
            </h1>
          </Reveal>

          {/* Mobil: Porträt direkt unter der Überschrift (Desktop nutzt die rechte Spalte) */}
          <Reveal delay={120} className="relative mx-auto w-fit self-center lg:hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[104%] w-[100%] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 46%, color-mix(in oklab, var(--color-gold-500) 34%, transparent), transparent 70%)",
              }}
            />
            <Image
              src={heikoHero}
              alt="Heiko Schwaninger – Begleiter für Bewusstseinsentwicklung"
              priority
              className="block w-[min(280px,68vw)] [filter:drop-shadow(0_0_8px_rgba(217,169,58,0.6))_drop-shadow(0_0_20px_rgba(217,169,58,0.4))] [-webkit-mask-image:linear-gradient(to_bottom,#000_62%,rgba(0,0,0,0.55)_82%,transparent_100%)] [mask-image:linear-gradient(to_bottom,#000_62%,rgba(0,0,0,0.55)_82%,transparent_100%)]"
            />
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
              <Button href="/kontakt" variant="secondary" size="lg">
                Kostenloses Erstgespräch
              </Button>
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

        <Reveal delay={200} className="relative hidden w-full self-end lg:block">
          <div className="relative mx-auto w-fit">
            {/* Gold-Glow hinter Kopf/Oberkörper: weiche Aura, die Kopf und
                Schulter umhüllt und diffus in den Navy-Grund ausläuft.
                Wichtig: inset-0 (bleibt im Bild) + Blur – der Glow darf NICHT
                über die Sektions-Oberkante hinausragen, sonst kappt das
                overflow-hidden der Section ihn als harte Kante über dem Kopf. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-85 blur-[80px]"
              style={{
                background:
                  "radial-gradient(46% 42% at 50% 34%, color-mix(in oklab, var(--color-gold-500) 34%, transparent) 0%, color-mix(in oklab, var(--color-gold-500) 16%, transparent) 40%, color-mix(in oklab, var(--color-gold-500) 5%, transparent) 66%, transparent 92%)",
              }}
            />
            <Image
              src={heikoHero}
              alt="Heiko Schwaninger – Begleiter für Bewusstseinsentwicklung"
              priority
              className="mx-auto block w-[min(320px,74vw)] [filter:drop-shadow(0_0_32px_rgba(217,169,58,0.14))_drop-shadow(0_0_80px_rgba(217,169,58,0.12))] [-webkit-mask-image:linear-gradient(to_bottom,#000_66%,rgba(0,0,0,0.55)_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,#000_66%,rgba(0,0,0,0.55)_85%,transparent_100%)] lg:w-[min(560px,100%)]"
            />
            {/* editoriales Detail: kleine Kennzahl, für dunklen Grund neu gestylt */}
            <div
              className="absolute bottom-16 right-0 rounded-xl px-5 py-4 backdrop-blur sm:bottom-20 lg:bottom-28"
              style={{
                background:
                  "linear-gradient(rgba(8,16,42,.85),rgba(8,16,42,.85)) padding-box, linear-gradient(120deg,#e8c15f,#d9a93a) border-box",
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
