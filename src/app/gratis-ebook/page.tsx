import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Check, Download, Mail, Spark } from "@/components/ui/Icon";
import { EbookForm } from "@/components/sections/EbookForm";
import { Faq } from "@/components/sections/Faq";
import { HERO_GLOW } from "@/lib/gradients";
import { stages } from "@/lib/content";
import { withCanonical } from "@/lib/seo";
import ebookMockup from "../../../public/ebook-mockup.webp";
import heikoPortrait from "../../../public/heiko-portrait.webp";

export const metadata: Metadata = withCanonical("/gratis-ebook", {
  title: "Kostenloses E-Book: Die 7 Stufen der Bewusstseinsentwicklung",
  description:
    "Sichere dir das kostenlose E-Book „Die 7 Stufen der Bewusstseinsentwicklung“ – kompakt erklärt, mit einer ersten Übung für jede Stufe. Sofort per E-Mail, 100 % gratis.",
});

// Das bekommt jede*r sofort nach der Anmeldung – die Kernversprechen
// des Lead-Magneten, kurz und konkret.
const bullets = [
  "Die 7 Stufen der Bewusstseinsentwicklung im Überblick",
  "Eine erste, sofort umsetzbare Übung für jede Stufe",
  "Erkenne, auf welcher Stufe du gerade stehst",
  "In deinem Tempo – ohne Guru-Getue, 100 % kostenlos",
];

// So kommt das E-Book zur Leserin / zum Leser (Double-Opt-in-Ablauf,
// bewusst transparent gemacht, damit klar ist, was nach dem Klick passiert).
const steps = [
  {
    icon: Mail,
    title: "E-Mail eintragen",
    text: "Trag oben deine E-Mail-Adresse ein und klick auf „E-Book sichern“.",
  },
  {
    icon: Check,
    title: "Anmeldung bestätigen",
    text: "Du bekommst eine kurze Bestätigungsmail. Ein Klick darin genügt – das schützt dich und uns vor Spam.",
  },
  {
    icon: Download,
    title: "Sofort loslegen",
    text: "Direkt danach landet dein E-Book als PDF in deinem Postfach. Lesen, ausprobieren, wacher werden.",
  },
];

// Landingpage-eigene FAQ – beantwortet die typischen Hürden vor der Anmeldung.
const ebookFaqs = [
  {
    question: "Ist das E-Book wirklich kostenlos?",
    answer:
      "Ja, komplett. Es ist mein Geschenk an dich für den Einstieg – ohne versteckte Kosten und ohne Kreditkarte.",
  },
  {
    question: "Was passiert mit meiner E-Mail-Adresse?",
    answer:
      "Ich schicke dir das E-Book und gelegentlich Impulse rund um Bewusstseinsentwicklung. Kein Spam, keine Weitergabe an Dritte – und du kannst dich jederzeit mit einem Klick wieder abmelden.",
  },
  {
    question: "Wie bekomme ich das E-Book?",
    answer:
      "Nach dem Eintragen deiner E-Mail bestätigst du kurz per Klick deine Anmeldung. Direkt danach kommt das E-Book als PDF zu dir – schau bei Bedarf auch im Spam-Ordner nach.",
  },
  {
    question: "In welchem Format ist das E-Book?",
    answer:
      "Als PDF – du kannst es am Computer, Tablet oder Smartphone lesen und dir bei Bedarf ausdrucken.",
  },
  {
    question: "Für wen ist das E-Book gedacht?",
    answer:
      "Für alle, die spüren, dass sie oft im Autopilot leben, und den ersten bewussten Schritt gehen möchten – ganz gleich, ob du neu einsteigst oder schon länger auf dem Weg bist.",
  },
];

export default function GratisEbookPage() {
  return (
    <>
      {/* Hero: Cover + Formular (der eine Zweck dieser Seite – die Anmeldung) */}
      <section className="on-dark grain relative overflow-hidden bg-navy-900 pt-16 pb-16 text-cream sm:pt-28 sm:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: HERO_GLOW }}
        />
        <Container className="grid items-center gap-14 lg:grid-cols-[0.85fr_1fr]">
          {/* Buch-Cover */}
          <Reveal className="order-2 lg:order-1">
            <div className="flex justify-center">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--color-gold-500) 35%, transparent), transparent 70%)",
                  }}
                />
                <Image
                  src={ebookMockup}
                  alt="Kostenloses E-Book „Die 7 Stufen der Bewusstseinsentwicklung“ von Heiko Schwaninger"
                  priority
                  className="h-auto w-56 drop-shadow-2xl sm:w-72"
                />
              </div>
            </div>
          </Reveal>

          {/* Text + Formular */}
          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow className="text-gold-300/90">Kostenloses E-Book</Eyebrow>
              <h1 className="max-w-2xl text-[1.8rem] font-medium leading-[1.1] text-cream sm:[hyphens:none] sm:text-5xl">
                Die 7 Stufen der{" "}
                <em className="accent">Bewusstseinsentwicklung</em>
              </h1>
              <p className="max-w-xl text-[1.05rem] leading-relaxed text-cream/75">
                Der Weg vom Autopilot zur Meisterschaft deiner Gedanken –
                kompakt erklärt, mit einer ersten Übung für jede Stufe. Trag
                dich ein und du bekommst dein E-Book sofort per E-Mail.
              </p>

              <ul className="flex flex-col gap-2.5">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[0.95rem] text-cream/80"
                  >
                    <Check className="mt-0.5 shrink-0 text-base text-gold-300" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Formular auf hellem Grund für maximalen Kontrast/Fokus */}
              <div className="mt-2 w-full rounded-3xl border border-cream/10 bg-paper/95 p-5 shadow-xl sm:p-6">
                <EbookForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Das steckt drin: die 7 Stufen als Vorschau */}
      <section className="bg-paper-aura seam-gold grain-soft relative py-16 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Das steckt drin"
            title={
              <>
                Sieben Stufen, ein klarer{" "}
                <em className="accent">Weg</em>
              </>
            }
            intro="Zu jeder Stufe bekommst du drei Erkennungsmerkmale, einen Kerngedanken und eine erste Übung, die du sofort ausprobieren kannst."
            className="mx-auto items-center"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage, i) => (
              <Reveal key={stage.number} delay={(i % 3) * 60}>
                <Card as="article" className="h-full">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-2xl italic text-accent">
                      {stage.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium text-ink">
                        {stage.title}
                      </h3>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        {stage.subtitle}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-mid">
                    {stage.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* So kommst du an dein E-Book: der Ablauf in 3 Schritten */}
      <section className="bg-surface-aura grain-soft relative border-t border-ink/10 py-16 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="So einfach geht's"
            title="In drei Schritten zu deinem E-Book"
            className="mx-auto items-center"
          />

          <ol className="mt-12 grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 80}>
                  <li className="flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-surface p-6 shadow-card">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon className="text-xl" />
                    </span>
                    <div>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                        Schritt {i + 1}
                      </span>
                      <h3 className="mt-1 text-lg font-medium text-ink">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[0.95rem] leading-relaxed text-ink-mid">
                      {step.text}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Wer dahintersteht – kurze Vertrauensbrücke */}
      <section className="bg-paper-aura grain-soft relative py-16 sm:py-28">
        <Container size="narrow">
          <Reveal>
            <Card className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <Image
                src={heikoPortrait}
                alt="Heiko Schwaninger"
                width={112}
                height={112}
                className="h-28 w-28 shrink-0 rounded-full object-cover"
              />
              <div className="flex flex-col gap-3">
                <Eyebrow className="justify-center sm:justify-start">
                  Von Herzen für dich
                </Eyebrow>
                <p className="text-[1.05rem] leading-relaxed text-ink-mid">
                  „Ich habe dieses E-Book geschrieben, weil ich weiß, wie es
                  sich anfühlt, von den eigenen Gedanken gelebt zu werden – und
                  wie befreiend der erste bewusste Schritt ist. Es ist kompakt,
                  ehrlich und ohne erhobenen Zeigefinger.“
                </p>
                <span className="text-sm font-medium text-ink">
                  Heiko Schwaninger{" "}
                  <span className="font-normal text-ink-muted">
                    · Begleiter für Bewusstseinsentwicklung
                  </span>
                </span>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* FAQ – nimmt die letzten Zweifel vor der Anmeldung */}
      <Faq
        items={ebookFaqs}
        eyebrow="Häufige Fragen"
        title="Gut zu wissen, bevor du dich einträgst"
      />

      {/* Abschluss-CTA: zweiter Anmelde-Anlauf am Seitenende */}
      <section className="on-dark grain relative overflow-hidden bg-navy-900 py-16 text-cream sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: HERO_GLOW }}
        />
        <Container size="narrow">
          <Reveal className="flex flex-col items-center gap-6 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
              <Spark className="text-xl" />
            </span>
            <h2 className="max-w-2xl text-[1.6rem] font-medium leading-[1.12] text-cream sm:text-4xl">
              Mach jetzt den ersten Schritt –{" "}
              <em className="accent">wacher als gestern</em>
            </h2>
            <p className="max-w-xl text-[1.05rem] leading-relaxed text-cream/75">
              Sichere dir das kostenlose E-Book und starte in deinem Tempo.
              Sofort per E-Mail, jederzeit abbestellbar.
            </p>
            <div className="mt-2 w-full max-w-xl rounded-3xl border border-cream/10 bg-paper/95 p-5 text-left shadow-xl sm:p-6">
              <EbookForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
