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
import { bookTestimonials } from "@/lib/content";
import buchCover from "../../../public/buch-cover-3d.webp";
import heikoPortrait from "../../../public/heiko-avatar.webp";
import heroBg from "../../../public/buch-hero-bg.webp";

export const metadata: Metadata = withCanonical("/buch", {
  title: "Das Buch: Werde Meister deiner Gedanken",
  description:
    "Das Buch „Werde Meister deiner Gedanken“ von Heiko Schwaninger – erkenne die Gedanken, die nicht deine sind: Reizüberflutung, Framing, Sprachmuster, Propaganda und Algorithmen. In fünf Teilen und 24 Kapiteln. Als PDF für 29,90 € oder gedruckt für 39,90 €.",
});

// Preise der beiden Editionen. Zentral hier gepflegt, damit Hero, Angebot und
// CTA garantiert dieselben Beträge zeigen.
const PRICE_PDF = "29,90 €";
const PRICE_PRINT = "39,90 €";

// Der goldene Hero-Verlauf – identisch zur Startseite/Mitgliedschaft.
const NAVY_GLOW = HERO_GLOW;

// Foto-Hero (Sonnenaufgang über Wald & See) braucht eine Abdunklung, damit
// Creme-Text und Cover AA-lesbar bleiben. Drei Ebenen über dem Foto:
//  BASE  – dezentes Gold-Rimlight oben rechts + gleichmäßige, leichte Abdunklung
//  DESKTOP – links satt dunkel → rechts offener (Text-Ruhe links, Foto rechts)
//  MOBILE  – oben dunkler, weil sich Text dort über das Foto stapelt
const HERO_PHOTO_BASE =
  "radial-gradient(50% 42% at 80% 4%, color-mix(in oklab, var(--color-gold-400) 16%, transparent), transparent 60%)," +
  "linear-gradient(0deg, rgba(9,11,16,0.32), rgba(9,11,16,0.12))";
const HERO_PHOTO_DESKTOP =
  "linear-gradient(90deg, rgba(9,11,16,0.90) 0%, rgba(9,11,16,0.70) 34%, rgba(9,11,16,0.26) 70%, rgba(9,11,16,0.44) 100%)";
const HERO_PHOTO_MOBILE =
  "linear-gradient(180deg, rgba(9,11,16,0.88) 0%, rgba(9,11,16,0.55) 46%, rgba(9,11,16,0.60) 100%)";

// Sieben goldene Wegpunkte (die 7 Stufen) als aufsteigender Pfad im Tal –
// verbindet Buch, „7 Stufen" und Marke. Bewusst sehr dezent, nur auf Desktop.
// Tupel: [left %, top %, Größe px, Deckkraft].
const HERO_WAYPOINTS: [number, number, number, number][] = [
  [44, 80, 15, 0.55],
  [48, 73, 13, 0.5],
  [52, 66, 11, 0.44],
  [56, 60, 9.5, 0.38],
  [59, 55, 8, 0.32],
  [62, 51, 6.5, 0.27],
  [65, 47, 5.5, 0.22],
];

const promises = [
  [
    "Erkenne, was nicht von dir kommt",
    "Reizüberflutung, Framing, Sprachmuster und Algorithmen setzen dir Gedanken, die sich wie deine eigenen anfühlen. Das Buch macht sie sichtbar.",
  ],
  [
    "Ein Weg statt loser Tipps",
    "Fünf Teile, die aufeinander aufbauen – von den Mechanismen der Beeinflussung bis zur ruhigen, klaren inneren Meisterschaft.",
  ],
  [
    "Durchschaue die Muster",
    "Propaganda, Gruppendruck und die personalisierte Realität – konkret erklärt, damit du sie im Alltag erkennst, statt ihnen zu folgen.",
  ],
  [
    "In deinem Tempo",
    "Zum Lesen, Innehalten und Wiederkommen. Ein Buch, das mit dir wächst, statt dich zu überfordern.",
  ],
];

const forWhom = [
  "Du spürst, dass vieles, was du denkst, gar nicht von dir kommt.",
  "Du fühlst dich von Nachrichten, Werbung und Feeds überflutet und getrieben.",
  "Du willst wieder selbst denken – klar, unabhängig und wach.",
  "Du suchst einen bodenständigen Weg ohne Esoterik und erhobenen Zeigefinger.",
];

// Vollständiges Inhaltsverzeichnis des Buchs: fünf Teile, 24 Kapitel.
// Quelle: docs/ebook/werde-meister-deiner-gedanken.md (die Leserfassung, aus der
// auch das Buch-PDF gebaut wird). Teil V ist der Schwerpunkt der Verkaufsseite.
type BookPart = {
  roman: string;
  title: string;
  highlight?: boolean;
  chapters: [number, string][];
};

const bookParts: BookPart[] = [
  {
    roman: "Teil I",
    title: "Aufwachen aus dem inneren Autopiloten",
    chapters: [
      [1, "Du bist nicht jeder Gedanke, den du denkst"],
      [2, "Die Programme hinter deinem Leben"],
      [3, "Der Beobachter in dir"],
      [4, "Wenn der Körper längst entschieden hat"],
      [5, "Der Zusammenbruch des alten Systems"],
    ],
  },
  {
    roman: "Teil II",
    title: "Werkzeuge der Veränderung",
    chapters: [
      [6, "Meditation ist keine Flucht"],
      [7, "Atem, Zustand und innere Führung"],
      [8, "Mentale Entprogrammierung"],
      [9, "Energie, Frequenz und Gehirnwellen"],
      [10, "Manifestation – realistisch verstanden"],
    ],
  },
  {
    roman: "Teil III",
    title: "Vertrauen, Stille und eine größere Wirklichkeit",
    chapters: [
      [11, "Vertrauen und Hingabe"],
      [12, "Intuition und Zeichen"],
      [13, "Die Kraft der Stille"],
      [14, "Zeit ist nicht, was sie scheint"],
    ],
  },
  {
    roman: "Teil IV",
    title: "Bewusst erschaffen und wirklich leben",
    chapters: [
      [15, "Vom Wunsch zum Handeln"],
      [16, "Wahrer Erfolg"],
      [17, "Dein energetisches Vermächtnis"],
      [18, "Vom Erkennen ins Handeln"],
    ],
  },
  {
    roman: "Teil V",
    title: "Die Gedanken, die nicht deine sind",
    highlight: true,
    chapters: [
      [19, "Wer denkt hier eigentlich?"],
      [20, "Reizüberflutung – wie dein Gehirn in Alarmbereitschaft bleibt"],
      [21, "Framing – wie ein einziges Wort deine Wahrnehmung verändert"],
      [22, "Hypnotische und suggestive Sprachmuster"],
      [23, "Propaganda – wie Gedanken konditioniert werden"],
      [24, "Algorithmen, Gruppendruck und die personalisierte Realität"],
    ],
  },
];

const buchFaqs = [
  {
    question: "Worum geht es in dem Buch?",
    answer:
      "Darum, die Gedanken zu erkennen, die gar nicht deine sind: wie Reizüberflutung, Framing, Sprachmuster, Propaganda und Algorithmen beeinflussen, was du denkst und für wahr hältst – und wie du dir dein eigenes, klares Denken zurückholst. Aufgebaut in fünf Teilen und 24 Kapiteln.",
  },
  {
    question: "Als PDF oder gedruckt – was ist der Unterschied?",
    answer:
      "Inhaltlich sind beide identisch. Das PDF (29,90 €) bekommst du digital per E-Mail und kannst sofort loslegen – am Computer, Tablet oder Smartphone. Die gedruckte Ausgabe (39,90 €) wird dir nach Hause geliefert (Versand nach DE/AT/CH). Wähle einfach beim Bestellen die Edition, die dir lieber ist.",
  },
  {
    question: "Ist das dasselbe wie das kostenlose E-Book?",
    answer:
      "Nein. Das kostenlose E-Book „Die 7 Stufen der Bewusstseinsentwicklung“ ist der kompakte Einstieg – raus aus dem Autopilot. Das Buch geht deutlich tiefer und legt den Schwerpunkt auf die Mechanismen der Beeinflussung von außen. Beides ergänzt sich.",
  },
  {
    question: "Muss ich an Esoterik glauben?",
    answer:
      "Nein. Das Buch ist bodenständig und ehrlich geschrieben – es verbindet klare Psychologie und Medienkompetenz mit alltagstauglicher Praxis, ohne esoterisches Blabla.",
  },
  {
    question: "Brauche ich Vorwissen?",
    answer:
      "Nein. Du startest genau dort, wo du gerade stehst. Die fünf Teile führen dich Kapitel für Kapitel, verständlich und ohne Druck.",
  },
  {
    question: "Passt das Buch zur Mitgliedschaft?",
    answer:
      "Ja – die beiden ergänzen sich, sind aber nicht dasselbe. Das Buch erzählt den Weg in 24 Kapiteln, mit dem Schwerpunkt auf den Gedanken, die von außen kommen. Der Mitgliederbereich führt dich durch die 7 Stufen der Bewusstseinsentwicklung, mit Videos, Praxis und Begleitung zu jeder Stufe.",
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
    text: "Vielen Dank für deine Bestellung! Du bekommst gleich eine Bestätigung per E-Mail.",
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
  searchParams: Promise<{ checkout?: string; edition?: string }>;
}) {
  const { checkout, edition } = await searchParams;
  const baseNotice = (checkout && NOTICES[checkout]) || null;
  // Erfolgsmeldung an die Edition anpassen (Download vs. Versand).
  const notice =
    baseNotice && checkout === "erfolg"
      ? {
          tone: baseNotice.tone,
          text:
            edition === "print"
              ? "Vielen Dank für deine Bestellung! Du bekommst gleich eine Bestätigung per E-Mail – dein gedrucktes Buch macht sich auf den Weg zu dir."
              : "Vielen Dank für deinen Kauf! Du bekommst dein PDF in Kürze per E-Mail – schau bei Bedarf auch im Spam-Ordner nach.",
        }
      : baseNotice;

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

      {/* Hero: Foto-Hintergrund + Cover als dominantes Produkt.
          Niedrigere, definierte Höhe auf Desktop; Inhalt vertikal zentriert.
          Text + Buch stehen als zusammenhängendes, zentriertes Paar. */}
      <section className="on-dark relative isolate flex min-h-[36rem] items-center overflow-hidden py-16 text-cream lg:h-[45rem] lg:py-0">
        {/* Foto-Hintergrund (Next optimiert Auslieferung zu webp/avif) */}
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-[center_42%]"
        />
        {/* Lesbarkeits-Overlays */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20" style={{ background: HERO_PHOTO_BASE }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 hidden lg:block" style={{ background: HERO_PHOTO_DESKTOP }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 lg:hidden" style={{ background: HERO_PHOTO_MOBILE }} />
        {/* 7 Wegpunkte (7 Stufen) – sehr dezent, nur Desktop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
          {HERO_WAYPOINTS.map(([l, t, s, o], i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${l}%`,
                top: `${t}%`,
                width: `${s}px`,
                height: `${s}px`,
                opacity: o,
                background:
                  "radial-gradient(circle, #f2d489, color-mix(in oklab, var(--color-gold-500) 60%, transparent) 45%, transparent 72%)",
                filter: "blur(1.2px)",
                boxShadow: "0 0 14px 3px color-mix(in oklab, var(--color-gold-400) 40%, transparent)",
              }}
            />
          ))}
        </div>

        <Container className="relative z-10">
          <div className="mx-auto grid max-w-[64rem] items-center gap-10 lg:grid-cols-[minmax(0,32rem)_auto] lg:justify-center lg:gap-10">
            {/* Textspalte – bewusst ruhig, keine Grafik dahinter */}
            <div className="max-w-xl [text-shadow:0_2px_22px_rgba(8,16,42,0.9)]">
              <Eyebrow>Das Buch</Eyebrow>
              <h1 className="mt-4 text-[2.15rem] font-medium leading-[1.03] text-cream sm:text-6xl">
                Werde Meister deiner <em className="accent">Gedanken</em>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/90">
                Der Weg vom Autopilot zur Meisterschaft – in fünf Teilen und 24
                Kapiteln. Und die Frage, die das Buch trägt: Wer denkt hier
                eigentlich?
              </p>
              <div className="mt-7 flex flex-col gap-3 [text-shadow:none] sm:flex-row sm:flex-wrap sm:items-center">
                <Button href="#bestellen" size="lg" variant="accent" className="w-full sm:w-auto">
                  Jetzt bestellen
                </Button>
                <Button
                  href="#inhalt"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Was drin steckt
                </Button>
              </div>
              {/* Autor-/Trust-Zeile – direkt an die Buttons gerückt */}
              <div className="mt-5 flex items-center gap-3 [text-shadow:none]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 font-display text-sm font-bold text-navy-950">
                  H
                </span>
                <span className="text-sm leading-snug text-cream/80">
                  <span className="font-semibold text-cream">Von Heiko Schwaninger</span>{" "}
                  · ohne esoterisches Blabla, in deinem Tempo.
                </span>
              </div>
              {/* Preis – dezent strukturiert statt reiner Textzeile */}
              <div
                className="mt-6 inline-flex overflow-hidden rounded-xl border bg-navy-950/35 [text-shadow:none]"
                style={{ borderColor: "color-mix(in oklab, var(--color-gold-400) 34%, transparent)" }}
              >
                <div className="px-4 py-2">
                  <div className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-cream/60">
                    PDF
                  </div>
                  <div className="font-display text-lg font-medium text-cream">{PRICE_PDF}</div>
                </div>
                <div
                  className="border-l px-4 py-2"
                  style={{ borderColor: "color-mix(in oklab, var(--color-gold-400) 22%, transparent)" }}
                >
                  <div className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-cream/60">
                    Hardcover
                  </div>
                  <div className="font-display text-lg font-medium text-gold-300">{PRICE_PRINT}</div>
                </div>
              </div>
            </div>

            {/* Buch – dominantes Produkt, mit Bodenschatten, Reflexion & Halo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-72 lg:w-[21rem]">
                {/* subtiles goldenes Rimlight / Halo hinter dem Buch */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-[44%] -z-10 h-[96%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-lg"
                  style={{
                    background:
                      "radial-gradient(closest-side, color-mix(in oklab, var(--color-gold-400) 26%, transparent), color-mix(in oklab, var(--color-gold-500) 10%, transparent) 58%, transparent 74%)",
                  }}
                />
                {/* weicher Bodenschatten */}
                <div
                  aria-hidden
                  className="absolute bottom-[-1.6rem] left-1/2 -z-10 h-11 w-[78%] -translate-x-1/2 rounded-[50%] blur-lg"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0.55), rgba(0,0,0,0.28) 45%, transparent 72%)",
                  }}
                />
                {/* warmgoldene Reflexion */}
                <div
                  aria-hidden
                  className="absolute bottom-[-0.9rem] left-1/2 -z-10 h-6 w-[56%] -translate-x-1/2 rounded-[50%] blur-md"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-gold-400) 34%, transparent), color-mix(in oklab, var(--color-gold-500) 14%, transparent) 50%, transparent 74%)",
                    mixBlendMode: "screen",
                  }}
                />
                <Image
                  src={buchCover}
                  alt="Buchcover „Werde Meister deiner Gedanken“ von Heiko Schwaninger"
                  priority
                  sizes="(min-width: 1024px) 21rem, (min-width: 640px) 18rem, 16rem"
                  className="relative h-auto w-full drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <section className="bg-paper-aura grain-soft relative py-14 sm:py-28">
        <Container>
          <div className="max-w-xl">
            <Eyebrow>Kennst du das?</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
              Wer denkt hier <em className="accent">eigentlich</em>?
            </h2>
          </div>
          <div className="mt-11 grid gap-5 sm:grid-cols-3">
            {[
              ["Gedanken von außen", "Medien, Werbung und Sprache setzen dir Gedanken, die sich anfühlen wie deine eigenen – es sind aber nicht deine."],
              ["Dauer-Alarm", "Reizüberflutung hält dein Gehirn in Alarmbereitschaft. Kein Raum mehr für klares, ruhiges Denken."],
              ["Unsichtbare Steuerung", "Framing, Algorithmen und Gruppendruck lenken leise, was du für wahr und für normal hältst."],
            ].map(([t, d]) => (
              <Card key={t}>
                <h3 className="text-lg font-medium text-ink">{t}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-mid">{d}</p>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-xl text-center font-display text-xl italic text-ink">
            Das ist keine Schwäche. Es ist Beeinflussung – und dieses Buch zeigt
            dir, wie du sie durchschaust.
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

      {/* Inhalt: vollständiges Inhaltsverzeichnis (5 Teile, 24 Kapitel),
          Teil V als Schwerpunkt hervorgehoben. */}
      <DarkSection id="inhalt">
        <div className="max-w-2xl">
          <Eyebrow>Das Inhaltsverzeichnis</Eyebrow>
          <h2 className="mt-3 text-[2rem] font-medium text-cream sm:text-4xl">
            Fünf Teile, 24 <em className="accent">Kapitel</em>.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/70">
            Ein Weg, kein loser Ratgeber – vom Aufwachen aus dem Autopiloten über
            konkrete Werkzeuge und eine größere Wirklichkeit bis zu den Gedanken,
            die gar nicht deine sind.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {bookParts.map((part) => (
            <div
              key={part.roman}
              className={`rounded-3xl border p-7 sm:p-8 ${
                part.highlight
                  ? "border-gold-500/45 lg:col-span-2"
                  : "border-cream/15"
              }`}
              style={{
                background: part.highlight
                  ? "linear-gradient(165deg, rgba(232,193,95,.14), rgba(255,255,255,.02))"
                  : "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-cream/60">
                  {part.roman}
                </span>
                {part.highlight && (
                  <span className="rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-navy-950">
                    Schwerpunkt
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-display text-2xl font-medium text-cream">
                {part.title}
              </h3>
              <ol className="mt-5 flex flex-col">
                {part.chapters.map(([nr, title]) => (
                  <li
                    key={nr}
                    className="flex items-center gap-4 border-t border-cream/10 py-3 first:border-t-0"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-medium text-cream"
                      style={{
                        background:
                          "linear-gradient(#08102a,#08102a) padding-box, linear-gradient(120deg,#e8c15f,#d9a93a) border-box",
                        border: "1.5px solid transparent",
                      }}
                    >
                      {nr}
                    </span>
                    <span className="text-[1rem] leading-snug text-cream/90">{title}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
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
                den ich gegangen bin, in klare Kapitel gebracht.“
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

      {/* Stimmen zum Buch – nur, wenn es echte gibt (siehe @/lib/content) */}
      {bookTestimonials.length > 0 && (
      <section className="bg-paper-aura grain-soft relative py-14 sm:py-28">
        <Container>
          <div className="max-w-xl">
            <Eyebrow>Stimmen</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-medium text-ink sm:text-4xl">
              Was Leserinnen und Leser <em className="accent">zurückmelden</em>.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {bookTestimonials.map((t) => (
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
      )}

      {/* Angebot / Preis */}
      <DarkSection id="bestellen">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
          <div
            className="relative rounded-3xl border border-cream/15 p-7 sm:p-8"
            style={{
              background:
                "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
            }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-cream/60">
              Wähle deine Edition
            </span>

            <div className="mt-5 flex flex-col gap-3">
              {/* PDF / Download */}
              <div className="rounded-2xl border border-cream/15 p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-cream/60">
                      Als PDF
                    </div>
                    <div className="mt-1 font-display text-3xl font-medium text-cream">
                      {PRICE_PDF}
                      <span className="ml-1 font-sans text-sm font-medium text-cream/60">
                        inkl. MwSt.
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-cream/50">Sofort als Download</span>
                </div>
                <BuchKaufenButton edition="pdf" variant="secondary" size="lg" className="mt-4 w-full">
                  PDF für {PRICE_PDF} kaufen
                </BuchKaufenButton>
              </div>

              {/* Gedruckt / Versand – hervorgehoben */}
              <div className="relative rounded-2xl border border-gold-500/45 bg-gold-500/12 p-5">
                <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-navy-950">
                  Zum Anfassen
                </span>
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-cream/60">
                  Gedruckt
                </div>
                <div className="mt-1 font-display text-4xl font-medium text-cream">
                  {PRICE_PRINT}
                  <span className="ml-1 font-sans text-base font-medium text-cream/60">
                    inkl. MwSt.
                  </span>
                </div>
                <div className="mt-1 text-sm text-cream/60">
                  Gedrucktes Buch, zu dir nach Hause geliefert (DE/AT/CH)
                </div>
                <BuchKaufenButton edition="print" size="lg" className="mt-4 w-full">
                  Gedruckt für {PRICE_PRINT} bestellen
                </BuchKaufenButton>
              </div>
            </div>

            <ul className="mt-6 flex flex-col gap-2.5">
              {[
                "Fünf Teile, 24 Kapitel – Schritt für Schritt zum Mitgehen",
                "Bodenständig & ehrlich – ohne Esoterik",
                "Sichere Bezahlung über Stripe",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-[0.95rem] text-cream/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950">
                    <Check className="h-3 w-3" />
                  </span>
                  {li}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Dein erster Schritt</Eyebrow>
            <h2 className="mt-3 text-[1.9rem] font-medium text-cream sm:text-4xl">
              Bereit, wenn <em className="accent">du</em> es bist.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/70">
              Kein Druck, keine Deadlines. Du beginnst, wo du stehst, und liest
              in deinem Tempo – Kapitel für Kapitel.
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
          Der erste Schritt ist nicht ändern, sondern sehen. Fang heute an –
          als PDF für {PRICE_PDF} oder gedruckt für {PRICE_PRINT}.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="#bestellen" size="lg" variant="accent">
            Jetzt bestellen
          </Button>
        </div>
        <p className="text-gradient-leaf mt-7 text-sm font-semibold tracking-wide">
          www.werdemeisterdeinergedanken.de
        </p>
      </DarkSection>
    </>
  );
}
