import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CheckoutButton } from "@/components/membership/CheckoutButton";
import { ArrowRight, Check, Star } from "@/components/ui/Icon";
import { stages, testimonials, faqs } from "@/lib/content";
import { practices } from "@/lib/practices";
import { deepDives } from "@/lib/deep-dives";
import brainLogo from "../../../public/logo-brain.png";

export const metadata: Metadata = {
  title: "Mitgliedschaft",
  description:
    "Der Mitgliederbereich: ein geführter Weg in 7 Stufen – mit Videos, Praxis und einem System, das mit dir wächst. Vom Autopilot zur Meisterschaft.",
  alternates: { canonical: "/mitgliedschaft" },
};

// Preis-Platzhalter – vor dem Livegang durch das echte Modell ersetzen.
const PRICE = "49 €";
const PRICE_PER = "/ Monat";

const features = [
  ["Geführte Videos", "Zu jeder Stufe ein klarer, ruhiger Impuls zum Mitgehen."],
  [`${practices.length} Praxis-Übungen`, "Atem, Meditationen und Rituale für deinen Alltag."],
  [`${deepDives.length} Vertiefungen`, "Das psychologische Wissen hinter der Veränderung."],
  ["Bewusstseinstest & Kurve", "Finde deinen Startpunkt – und sieh deine Entwicklung über die Zeit."],
  ["Dein Journal", "Alle Reflexionen an einem Ort. Ein Spiegel, der mit dir wächst."],
  ["Arbeitshefte & PDFs", "Zum Ausdrucken, Mitschreiben und Vertiefen."],
];

const steps = [
  ["Bewusstseinstest machen", "In wenigen Minuten findest du heraus, wo du gerade stehst."],
  ["Deiner Stufe folgen", "Geführt, ohne Druck, ganz in deinem Tempo."],
  ["Dranbleiben & wachsen", "Journal und Wachstumskurve halten dich sanft auf Kurs."],
];

// Identisch zur Startseite (Hero.tsx), damit der Hero-Verlauf konsistent ist.
const NAVY_GLOW =
  "radial-gradient(55% 45% at 82% 6%, color-mix(in oklab, var(--color-teal-500) 20%, transparent), transparent 60%), radial-gradient(52% 45% at 6% 98%, color-mix(in oklab, var(--color-brand-500) 22%, transparent), transparent 60%)";

function DarkSection({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-navy-900 py-20 text-cream sm:py-28 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: NAVY_GLOW }}
      />
      <Container>{children}</Container>
    </section>
  );
}

export default function MitgliedschaftPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="!py-0">
        <div className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <Eyebrow>Der Mitgliederbereich</Eyebrow>
            <h1 className="mt-4 text-[2.15rem] font-medium leading-[1.03] text-cream sm:text-6xl">
              Vom Autopilot zur <em className="accent">Meisterschaft</em>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">
              Ein geführter Weg in 7 Stufen – mit Videos, Praxis und einem System,
              das mit dir wächst. Raus aus alten Mustern, rein in echte innere Klarheit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CheckoutButton size="lg" className="w-full sm:w-auto">
                Mitglied werden
              </CheckoutButton>
              <Link
                href="/bewusstseinstest"
                className="inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3 text-center text-base font-medium leading-tight text-cream transition-colors hover:border-cream/60 hover:bg-cream/5 sm:w-auto"
              >
                Kostenlosen Bewusstseinstest machen
              </Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-cream/55">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-leaf-500 to-teal-500" />
              Bodenständig, ehrlich, ohne esoterisches Blabla. In deinem Tempo.
            </p>
          </div>
          <div className="relative mx-auto">
            <div
              aria-hidden
              className="absolute inset-[-8%] -z-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-teal-500) 22%, transparent), transparent 62%)",
              }}
            />
            <Image
              src={brainLogo}
              alt="Werde Meister deiner Gedanken – Logo"
              priority
              className="mx-auto w-[min(400px,78vw)] drop-shadow-[0_10px_60px_rgba(52,196,196,0.35)]"
            />
          </div>
        </div>
      </DarkSection>

      {/* Problem */}
      <section className="bg-paper py-14 sm:py-28">
        <Container>
          <div className="max-w-xl">
            <Eyebrow>Kennst du das?</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
              Du wirst <em className="accent">gelebt</em> – statt zu leben.
            </h2>
          </div>
          <div className="mt-11 grid gap-5 sm:grid-cols-3">
            {[
              ["Dieselben Muster", "Dieselben Konflikte, dieselben Gefühle – immer wieder, obwohl du sie längst nicht mehr willst."],
              ["Reagieren statt wählen", "Zwischen Reiz und Reaktion bleibt kein Raum. Du funktionierst, bevor du entscheidest."],
              ["Gedanken als Tatsachen", "Was du denkst, fühlt sich wahr an. Dabei sind es oft nur alte, antrainierte Gewohnheiten."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
                <h3 className="text-lg font-medium text-ink">{t}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-mid">{d}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-xl text-center font-display text-xl italic text-ink">
            Das ist keine Schwäche. Es ist Autopilot – und er lässt sich abschalten.
          </p>
        </Container>
      </section>

      {/* Die 7 Stufen – leuchtender Pfad */}
      <DarkSection>
        <div className="max-w-2xl">
          <Eyebrow>Der Weg</Eyebrow>
          <h2 className="mt-3 text-[2rem] font-medium text-cream sm:text-4xl">
            Sieben Stufen. Ein <em className="accent">klarer</em> Aufstieg.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/70">
            Kein Sprung ins Ungewisse, sondern ein Schritt nach dem anderen – jede
            Stufe baut auf der vorigen auf.
          </p>
        </div>
        <ol className="relative mt-14 max-w-2xl">
          <span
            aria-hidden
            className="absolute bottom-6 left-8 top-6 w-0.5"
            style={{
              background:
                "linear-gradient(180deg, rgba(140,198,63,.1), #8cc63f, #21b2bd, rgba(33,178,189,.1))",
            }}
          />
          {stages.map((s) => (
            <li key={s.number} className="relative flex items-center gap-6 py-4">
              <span
                className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-xl font-medium text-cream"
                style={{
                  background:
                    "linear-gradient(#08102a,#08102a) padding-box, linear-gradient(120deg,#8cc63f,#21b2bd) border-box",
                  border: "1.5px solid transparent",
                  boxShadow: "0 0 22px -4px rgba(52,196,196,.5)",
                }}
              >
                {s.number}
              </span>
              <div>
                <h3 className="text-2xl font-medium text-cream">{s.title}</h3>
                <p className="mt-0.5 text-cream/65">{s.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      </DarkSection>

      {/* Was drin ist */}
      <section className="bg-paper py-14 sm:py-28">
        <Container>
          <div className="max-w-xl">
            <Eyebrow>Deine Mitgliedschaft</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
              Alles, was du für den Weg <em className="accent">brauchst</em>.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([t, d]) => (
              <article
                key={t}
                className="rounded-2xl border border-ink/10 bg-white p-7 shadow-card transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-leaf-500 to-teal-500 text-navy-950 shadow-sm">
                  <Check />
                </span>
                <h3 className="mt-4 text-xl font-medium text-ink">{t}</h3>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-mid">{d}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Wie es funktioniert */}
      <DarkSection>
        <div className="max-w-xl">
          <Eyebrow>So startest du</Eyebrow>
          <h2 className="mt-3 text-[2rem] font-medium text-cream sm:text-4xl">
            In drei Schritten <em className="accent">drin</em>.
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li
              key={t}
              className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-leaf-500 to-teal-500 font-display text-lg font-medium text-navy-950">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-medium text-cream">{t}</h3>
              <p className="mt-1.5 leading-relaxed text-cream/65">{d}</p>
            </li>
          ))}
        </ol>
      </DarkSection>

      {/* Stimmen */}
      <section className="bg-paper py-14 sm:py-28">
        <Container>
          <div className="max-w-xl">
            <Eyebrow>Stimmen</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
              Was Menschen auf dem Weg <em className="accent">erleben</em>.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-ink/10 bg-white p-7 shadow-card"
              >
                <div className="flex gap-0.5 text-gold-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-lg leading-snug text-ink">
                  „{t.quote}"
                </blockquote>
                <figcaption className="mt-5 flex flex-col">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <span className="text-sm text-ink-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Zugang / Preis */}
      <DarkSection id="zugang">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
          <div
            className="relative rounded-3xl border border-cream/15 p-9 sm:p-10"
            style={{
              background:
                "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
            }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-cream/60">
              Mitgliedschaft
            </span>
            <div className="mt-2 font-display text-5xl font-medium text-cream">
              {PRICE}
              <span className="ml-1 font-sans text-base font-medium text-cream/60">
                {PRICE_PER}
              </span>
            </div>
            <ul className="mt-7 flex flex-col gap-3">
              {[
                "Alle 7 Stufen mit geführten Videos",
                `${practices.length} Praxis-Übungen & ${deepDives.length} Vertiefungen`,
                "Bewusstseinstest, Wachstumskurve & Journal",
                "Arbeitshefte & PDFs zum Download",
                "Neue Inhalte & Impulse laufend",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-[0.98rem] text-cream/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-leaf-500 to-teal-500 text-navy-950">
                    <Check className="h-3 w-3" />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
            <CheckoutButton size="lg" className="mt-8 w-full">
              Mitglied werden
            </CheckoutButton>
          </div>
          <div>
            <Eyebrow>Zugang</Eyebrow>
            <h2 className="mt-3 text-[1.9rem] font-medium text-cream sm:text-4xl">
              Bereit, wenn <em className="accent">du</em> es bist.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/70">
              Kein Druck, keine Deadlines. Du beginnst, wo du stehst, und gehst in
              deinem Tempo – begleitet, Schritt für Schritt.
            </p>
            <Link
              href="#faq"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-cream/50"
            >
              Häufige Fragen ansehen
              <ArrowRight />
            </Link>
            <p className="mt-5 text-sm text-cream/55">
              Noch unsicher? Starte kostenlos mit dem{" "}
              <Link href="/bewusstseinstest" className="text-gradient-leaf font-medium">
                Bewusstseinstest
              </Link>{" "}
              und finde deinen Startpunkt.
            </p>
          </div>
        </div>
      </DarkSection>

      {/* FAQ */}
      <section id="faq" className="bg-paper py-14 sm:py-28">
        <Container>
          <div className="max-w-xl">
            <Eyebrow>Häufige Fragen</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
              Gut zu <em className="accent">wissen</em>.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group border-b border-ink/10 py-1"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-xl font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span className="shrink-0 text-teal-500 transition-transform duration-200 group-open:rotate-45">
                    <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden>
                      <path fill="currentColor" d="M9 3h2v6h6v2h-6v6H9v-6H3V9h6z" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-ink-mid">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <DarkSection className="text-center">
        <Eyebrow>Der erste Schritt</Eyebrow>
        <h2 className="mx-auto mt-3 max-w-[16ch] text-[2.2rem] font-medium leading-[1.05] text-cream sm:text-5xl">
          Werde Meister deiner <em className="accent">Gedanken</em>.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-cream/70">
          Der erste Schritt ist nicht ändern, sondern sehen. Fang heute an.
        </p>
        <div className="mt-8 flex justify-center">
          <CheckoutButton size="lg">Jetzt Mitglied werden</CheckoutButton>
        </div>
        <p className="text-gradient-leaf mt-7 text-sm font-semibold tracking-wide">
          www.werdemeisterdeinergedanken.de
        </p>
      </DarkSection>
    </>
  );
}
