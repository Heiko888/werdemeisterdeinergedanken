import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { Faq } from "@/components/sections/Faq";
import { stages } from "@/lib/content";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/die-7-stufen", {
  title: "Die 7 Stufen der Bewusstseinsentwicklung",
  description:
    "Der strukturierte Weg vom Autopilot bis zur Meisterschaft über deine Gedanken – die 7 Stufen der Bewusstseinsentwicklung im Detail.",
});

export default function SevenStagesPage() {
  return (
    <>
      {/* Hero UND der leuchtende Pfad teilen sich EINE zusammenhängende dunkle
          Fläche mit EINEM durchlaufenden Hintergrundbild. So beginnt das Motiv
          nicht bei „Autopilot" neu, sondern läuft vom Kopf der Seite ohne Bruch
          bis in die Timeline weiter und blendet dort ins farbige Kosmos-Feld aus.
          Seitenspezifisch kräftigere Glows als das globale .bg-cosmic, damit der
          Pfad lebendig wirkt. */}
      <section
        className="on-dark grain relative isolate overflow-hidden text-cream"
        style={{
          background:
            // Warme Bildwelt: der goldene Pfad + Sonnenuntergang des Fotos setzt
            // sich in warmen Glows fort (Champagner → Sonnengold → Antikgold),
            // statt in türkis/blaue Flächen zu brechen.
            "radial-gradient(52% 26% at 14% 30%, color-mix(in oklab, var(--color-gold-400) 22%, transparent) 0%, transparent 62%)," +
            "radial-gradient(54% 26% at 88% 40%, color-mix(in oklab, var(--color-gold-500) 30%, transparent) 0%, transparent 58%)," +
            "radial-gradient(54% 22% at 18% 72%, color-mix(in oklab, var(--color-gold-600) 20%, transparent) 0%, transparent 60%)," +
            "radial-gradient(52% 24% at 82% 92%, color-mix(in oklab, var(--color-gold-500) 22%, transparent) 0%, transparent 60%)," +
            "var(--color-navy-950)",
        }}
      >
        {/* Das durchlaufende Bild (Hochformat): oben verankert, deckt Hero +
            Anfang der Timeline und blendet nach unten weich ins Kosmos-Feld aus.
            Ein einziges Bild – kein zweiter, neu ansetzender Ausschnitt. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] overflow-hidden sm:h-[64rem]"
        >
          <Image
            src="/kompass-weg.webp"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-top saturate-[1.05] brightness-[1.02] contrast-[1.02]"
            style={{
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Feine Sterne über die gesamte Fläche – auch dort, wo das Bild schon
            ausgeblendet ist, damit die Timeline im selben Kosmos bleibt. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-60"
        />

        {/* Hero-Scrim: dezenter Navy-Schleier über dem Kopfbereich für den
            Textkontrast (ersetzt den früheren PageHero-Overlay). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] sm:h-[42rem]"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-navy-900) 52%, transparent) 0%, color-mix(in oklab, var(--color-navy-900) 30%, transparent) 45%, transparent 100%)",
          }}
        />

        {/* Kopfbereich */}
        <Container className="relative z-10 flex flex-col items-center gap-6 pt-16 pb-14 text-center sm:pt-28 sm:pb-20">
          <Reveal>
            <Eyebrow>Der Weg</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-3xl text-[1.7rem] font-medium leading-[1.1] text-cream sm:text-5xl sm:[hyphens:none] sm:[overflow-wrap:normal] md:text-[3.4rem]">
              Die 7 Stufen der{" "}
              <em className="accent">Bewusstseinsentwicklung</em>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-cream/75">
              Ein klarer, aufeinander aufbauender Weg. Jede Stufe bringt dich
              näher an einen Zustand, in dem du deine Gedanken nicht mehr
              erleidest, sondern bewusst gestaltest.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button href="/bewusstseinstest" variant="accent" size="lg">
                Wo stehe ich gerade?
                <ArrowRight />
              </Button>
            </div>
          </Reveal>
        </Container>

        {/* Der leuchtende Pfad */}
        <Container size="narrow" className="relative z-10 pb-16 sm:pb-24">
          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-7 top-10 bottom-10 w-0.5 -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(232,193,95,.12), #e8c15f, #d9a93a, rgba(217,169,58,.12))",
              }}
            />
            {stages.map((stage, i) => (
              <Reveal key={stage.number} delay={(i % 3) * 60}>
                <li className="relative flex gap-6 py-5">
                  <span
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-medium text-cream"
                    style={{
                      background:
                        "linear-gradient(#08102a,#08102a) padding-box, linear-gradient(120deg,#e8c15f,#d9a93a) border-box",
                      border: "1.5px solid transparent",
                      boxShadow: "0 0 22px -4px rgba(232,193,95,.5)",
                    }}
                  >
                    {stage.number}
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="text-xl font-medium text-cream sm:text-2xl">
                        {stage.title}
                      </h2>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-300/80">
                        {stage.subtitle}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/70 sm:text-base">
                      {stage.description}
                    </p>

                    {stage.detail && (
                      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                        {[
                          {
                            label: "Woran du sie erkennst",
                            text: stage.detail.recognize,
                            accent: false,
                          },
                          {
                            label: "Was dich hier festhält",
                            text: stage.detail.stuck,
                            accent: false,
                          },
                          {
                            label: "Was hier entsteht",
                            text: stage.detail.skill,
                            accent: false,
                          },
                          {
                            label: "Dein nächster Schritt",
                            text: stage.detail.next,
                            accent: true,
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="border-t border-cream/12 pt-3"
                          >
                            <dt
                              className={`text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${
                                item.accent
                                  ? "text-gold-300/90"
                                  : "text-teal-300/80"
                              }`}
                            >
                              {item.label}
                            </dt>
                            <dd className="mt-1.5 text-[0.9rem] leading-relaxed text-cream/70">
                              {item.text}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Abschluss-CTA – heller Release nach dem dunklen Pfad.
          Seitenspezifisch kräftigere Aura als das globale .bg-surface-aura,
          damit der Farbklang zum verstärkten Stufen-Band passt. */}
      <section
        className="grain-soft relative py-16 sm:py-24"
        style={{
          background:
            // Warmer Nachklang zum Stufen-Band – gold statt blau/türkis, aber
            // auf der hellen Fläche bewusst zurückhaltender als der Hero.
            "radial-gradient(66% 56% at 90% -8%, color-mix(in oklab, var(--color-gold-400) 22%, transparent), transparent 62%)," +
            "radial-gradient(58% 52% at 8% 108%, color-mix(in oklab, var(--color-gold-500) 14%, transparent), transparent 60%)," +
            "var(--color-surface-2)",
        }}
      >
        <Container size="narrow">
          <div className="flex flex-col items-center gap-5 text-center">
            <h2 className="font-display text-2xl italic text-ink sm:text-3xl">
              Finde heraus, wo du gerade stehst.
            </h2>
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink-mid">
              Der Bewusstseinstest zeigt dir in wenigen Minuten deine aktuelle
              Stufe – und welcher Schritt als Nächstes dran ist. Willst du danach
              persönlich draufschauen, ist das kostenlose Erstgespräch dein
              zweiter Schritt.
            </p>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
              <Button href="/bewusstseinstest" variant="accent" size="lg">
                Bewusstseinstest starten
                <ArrowRight />
              </Button>
              <Button href="/kontakt" variant="secondary" size="lg">
                Kostenloses Erstgespräch
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Faq />
    </>
  );
}
