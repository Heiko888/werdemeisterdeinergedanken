import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight, Check, Star } from "@/components/ui/Icon";
import { BuchKaufenButton } from "@/components/sections/BuchKaufenButton";
import { withCanonical } from "@/lib/seo";
import { HERO_GLOW } from "@/lib/gradients";
import { stages, testimonials } from "@/lib/content";
import buchCover from "../../../public/buch-cover.webp";
import heikoPortrait from "../../../public/heiko-avatar.webp";

export const metadata: Metadata = withCanonical("/buch", {
  title: "Das Buch: Werde Meister deiner Gedanken",
  description:
    "Das Buch „Werde Meister deiner Gedanken“ von Heiko Schwaninger – der Weg vom Autopilot zur Meisterschaft in 7 Stufen. Jetzt für 29,90 € bestellen.",
});

// Preis des Buchs. Zentral hier gepflegt, damit Hero, Angebot und CTA
// garantiert denselben Betrag zeigen.
const PRICE = "29,90 €";

// Der goldene Hero-Verlauf – identisch zur Startseite/Mitgliedschaft.
const NAVY_GLOW = HERO_GLOW;

const promises = [
  [
    "Endlich verstehen, warum du reagierst",
    "Woher deine automatischen Gedanken kommen – und wie du den Raum zwischen Reiz und Reaktion zurückgewinnst.",
  ],
  [
    "Ein Weg statt loser Tipps",
    "Die 7 Stufen bauen aufeinander auf: vom ersten Bemerken bis zur ruhigen inneren Meisterschaft.",
  ],
  [
    "Übungen für den Alltag",
    "Konkrete, alltagstaugliche Schritte am Ende jeder Stufe – kein Guru-Getue, nichts, was du nicht sofort ausprobieren kannst.",
  ],
  [
    "In deinem Tempo",
    "Zum Lesen, Innehalten und Wiederkommen. Ein Buch, das mit dir wächst, statt dich zu überfordern.",
  ],
];

const forWhom = [
  "Du lebst oft im Autopilot und willst wieder bewusst wählen.",
  "Du kennst dieselben Muster, Konflikte und Gefühle – und willst sie durchbrechen.",
  "Du suchst einen bodenständigen Weg ohne Esoterik und erhobenen Zeigefinger.",
  "Du willst nicht nur verstehen, sondern konkret üben.",
];

const buchFaqs = [
  {
    question: "In welcher Form bekomme ich das Buch?",
    answer:
      "Du erhältst das gedruckte Buch „Werde Meister deiner Gedanken“ bequem nach Hause geliefert. Nach der Bestellung führen wir dich sicher durch die Bezahlung.",
  },
  {
    question: "Muss ich an Esoterik glauben?",
    answer:
      "Nein. Das Buch ist bodenständig und ehrlich geschrieben – es verbindet klare Psychologie mit alltagstauglicher Praxis, ohne esoterisches Blabla.",
  },
  {
    question: "Brauche ich Vorwissen?",
    answer:
      "Nein. Du startest genau dort, wo du gerade stehst. Die 7 Stufen führen dich Schritt für Schritt, verständlich und ohne Druck.",
  },
  {
    question: "Passt das Buch zur Mitgliedschaft?",
    answer:
      "Ja. Das Buch ist der ideale Einstieg und die perfekte Ergänzung. Wenn du tiefer gehen willst, findest du im Mitgliederbereich zu jeder Stufe Videos, Praxis und Begleitung.",
  },
  {
    question: "Kann ich mit einem Gutschein bezahlen?",
    answer:
      "Ja. Im Bezahlvorgang kannst du einen Gutschein- bzw. Aktionscode eingeben, falls du einen hast.",
  },
];

const NOTICES: Record<string, { tone: "info" | "warn" | "success"; text: string }> = {
  erfolg: {
    tone: "success",
    text: "Vielen Dank für deine Bestellung! Du bekommst gleich eine Bestätigung per E-Mail. Dein Buch macht sich auf den Weg zu dir.",
  },
  abgebrochen: {
    tone: "info",
    text: "Die Bestellung wurde abgebrochen – kein Problem. Du kannst jederzeit fortfahren, wenn du bereit bist.",
  },
  fehler: {
    tone: "warn",
    text: "Bei der Bestellung ist leider etwas schiefgelaufen. Bitte versuch es erneut – oder melde dich über die Kontaktseite, dann kümmern wir uns persönlich.",
  },
};

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
      className={`on-dark relative overflow-hidden bg-navy-900 py-20 text-cream sm:py-28 ${className}`}
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

export default async function BuchPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await searchParams;
  const notice = (checkout && NOTICES[checkout]) || null;

  return (
    <>
      {notice && (
        <div
          className={`border-b px-4 py-3 text-center text-sm leading-relaxed ${
            notice.tone === "warn"
              ? "border-red-500/30 bg-red-500/10 text-red-900"
              : notice.tone === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900"
                : "border-accent/30 bg-accent/10 text-ink"
          }`}
        >
          <Container>{notice.text}</Container>
        </div>
      )}

      {/* Hero: Cover + Angebot */}
      <section className="on-dark relative overflow-hidden bg-navy-900 py-14 text-cream sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: NAVY_GLOW }}
        />
        <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          {/* Buch-Cover mit warmem Gold-Schein */}
          <div className="flex justify-center lg:order-last">
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
                src={buchCover}
                alt="Buchcover „Werde Meister deiner Gedanken“ von Heiko Schwaninger"
                priority
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 18rem, 14rem"
                className="h-auto w-56 rounded-md shadow-2xl ring-1 ring-cream/10 sm:w-72 lg:w-[24rem]"
              />
            </div>
          </div>

          <div className="max-w-xl [text-shadow:0_1px_18px_rgba(8,16,42,0.6)]">
            <Eyebrow>Das Buch</Eyebrow>
            <h1 className="mt-4 text-[2.15rem] font-medium leading-[1.03] text-cream sm:text-6xl">
              Werde Meister deiner <em className="accent">Gedanken</em>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/90">
              Der Weg vom Autopilot zur Meisterschaft – in 7 klaren Stufen.
              Raus aus alten Mustern, rein in echte innere Klarheit. Ehrlich,
              bodenständig und Schritt für Schritt zum Mitgehen.
            </p>
            <div className="mt-8 flex flex-col gap-3 [text-shadow:none] sm:flex-row sm:flex-wrap sm:items-center">
              <BuchKaufenButton size="lg" className="w-full sm:w-auto">
                Jetzt für {PRICE} bestellen
              </BuchKaufenButton>
              <Button
                href="#inhalt"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Was drin steckt
              </Button>
            </div>
            <p className="mt-4 text-sm text-cream/80">
              {PRICE} inkl. MwSt. · gedruckt · sichere Bezahlung
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm text-cream/75">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500" />
              Von Heiko Schwaninger · ohne esoterisches Blabla, in deinem Tempo.
            </p>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <section className="bg-paper-aura grain-soft relative py-14 sm:py-28">
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
              <Card key={t}>
                <h3 className="text-lg font-medium text-ink">{t}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-mid">{d}</p>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-xl text-center font-display text-xl italic text-ink">
            Das ist keine Schwäche. Es ist Autopilot – und dieses Buch zeigt dir,
            wie du ihn abschaltest.
          </p>
        </Container>
      </section>

      {/* Was das Buch dir gibt */}
      <section className="bg-surface-aura grain-soft relative border-t border-ink/10 py-14 sm:py-28">
        <Container>
          <div className="max-w-xl">
            <Eyebrow>Was dich erwartet</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
              Kein Ratgeber-Einerlei, sondern ein <em className="accent">Weg</em>.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {promises.map(([t, d]) => (
              <article
                key={t}
                className="rounded-2xl border border-ink/10 bg-white p-7 shadow-card transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 shadow-sm">
                  <Check />
                </span>
                <h3 className="mt-4 text-xl font-medium text-ink">{t}</h3>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-mid">{d}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Inhalt: die 7 Stufen */}
      <DarkSection id="inhalt">
        <div className="max-w-2xl">
          <Eyebrow>Der Inhalt</Eyebrow>
          <h2 className="mt-3 text-[2rem] font-medium text-cream sm:text-4xl">
            Sieben Stufen. Ein <em className="accent">klarer</em> Aufstieg.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/70">
            Jedes Kapitel ist eine Stufe – kein Sprung ins Ungewisse, sondern
            ein Schritt nach dem anderen. Jede Stufe baut auf der vorigen auf.
          </p>
        </div>
        <ol className="relative mt-14 max-w-2xl">
          <span
            aria-hidden
            className="absolute bottom-6 left-8 top-6 w-0.5"
            style={{
              background:
                "linear-gradient(180deg, rgba(232,193,95,.12), #e8c15f, #d9a93a, rgba(217,169,58,.12))",
            }}
          />
          {stages.map((s) => (
            <li key={s.number} className="relative flex items-center gap-6 py-4">
              <span
                className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-xl font-medium text-cream"
                style={{
                  background:
                    "linear-gradient(#08102a,#08102a) padding-box, linear-gradient(120deg,#e8c15f,#d9a93a) border-box",
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

      {/* Für wen */}
      <section className="bg-paper-aura grain-soft relative py-14 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Für wen dieses Buch ist</Eyebrow>
              <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
                Für dich, wenn du <em className="accent">bereit</em> bist.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-mid">
                Du musst nicht „kaputt“ sein, um zu wachsen. Es reicht der
                leise Wunsch, wacher und freier zu leben.
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {forWhom.map((li) => (
                <li
                  key={li}
                  className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-5 text-[1.02rem] leading-relaxed text-ink shadow-card"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Autor */}
      <section className="bg-surface-aura grain-soft relative border-t border-ink/10 py-14 sm:py-28">
        <Container size="narrow">
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
                Wer dahintersteht
              </Eyebrow>
              <p className="text-[1.05rem] leading-relaxed text-ink-mid">
                „Ich habe dieses Buch geschrieben, weil ich selbst weiß, wie es
                sich anfühlt, von den eigenen Gedanken gelebt zu werden – und
                wie befreiend der erste bewusste Schritt ist. Es ist der Weg,
                den ich gegangen bin, in klare Stufen gebracht.“
              </p>
              <span className="text-sm font-medium text-ink">
                Heiko Schwaninger{" "}
                <span className="font-normal text-ink-muted">
                  · Begleiter für mentale Entprogrammierung
                </span>
              </span>
            </div>
          </Card>
        </Container>
      </section>

      {/* Stimmen */}
      <section className="bg-paper-aura grain-soft relative py-14 sm:py-28">
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
                  „{t.quote}&ldquo;
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

      {/* Angebot / Preis */}
      <DarkSection id="bestellen">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
          <div
            className="relative rounded-3xl border border-cream/15 p-9 sm:p-10"
            style={{
              background:
                "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
            }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-cream/60">
              Das Buch
            </span>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl font-medium text-cream">
                {PRICE}
              </span>
              <span className="text-sm text-cream/60">inkl. MwSt.</span>
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Gedrucktes Buch, zu dir nach Hause geliefert",
                "Alle 7 Stufen mit Übungen zum Mitgehen",
                "Bodenständig & ehrlich – ohne Esoterik",
                "Sichere Bezahlung über Stripe",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-[0.98rem] text-cream/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950">
                    <Check className="h-3 w-3" />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
            <BuchKaufenButton size="lg" className="mt-7 w-full">
              Jetzt für {PRICE} bestellen
            </BuchKaufenButton>
            <p className="mt-3 text-center text-xs text-cream/55">
              Weiter zur sicheren Bezahlseite
            </p>
          </div>
          <div>
            <Eyebrow>Dein erster Schritt</Eyebrow>
            <h2 className="mt-3 text-[1.9rem] font-medium text-cream sm:text-4xl">
              Bereit, wenn <em className="accent">du</em> es bist.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/70">
              Kein Druck, keine Deadlines. Du beginnst, wo du stehst, und liest
              in deinem Tempo – Stufe für Stufe.
            </p>
            <Button href="#faq" variant="secondary" size="md" className="mt-6">
              Häufige Fragen ansehen
              <ArrowRight />
            </Button>
            <p className="mt-5 text-sm text-cream/55">
              Du willst tiefer gehen? Entdecke die{" "}
              <Link href="/mitgliedschaft" className="text-gradient-leaf font-medium">
                Mitgliedschaft
              </Link>{" "}
              mit Videos, Praxis und Begleitung zu jeder Stufe.
            </p>
          </div>
        </div>
      </DarkSection>

      {/* FAQ */}
      <section id="faq" className="bg-paper-aura grain-soft relative py-14 sm:py-28">
        <Container>
          <div className="max-w-xl">
            <Eyebrow>Häufige Fragen</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
              Gut zu <em className="accent">wissen</em>.
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            {buchFaqs.map((f) => (
              <details key={f.question} className="group border-b border-ink/10 py-1">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-xl font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span className="shrink-0 text-gold-700 transition-transform duration-200 group-open:rotate-45">
                    <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden>
                      <path fill="currentColor" d="M9 3h2v6h6v2h-6v6H9v-6H3V9h6z" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-ink-mid">{f.answer}</p>
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
          <BuchKaufenButton size="lg">Jetzt für {PRICE} bestellen</BuchKaufenButton>
        </div>
        <p className="text-gradient-leaf mt-7 text-sm font-semibold tracking-wide">
          www.werdemeisterdeinergedanken.de
        </p>
      </DarkSection>
    </>
  );
}
