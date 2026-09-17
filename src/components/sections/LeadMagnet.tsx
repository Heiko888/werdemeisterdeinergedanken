import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "@/components/ui/Icon";
import { StarRating } from "@/components/ui/StarRating";
import { EbookForm } from "./EbookForm";
import ebookMockup from "../../../public/ebook-mockup.webp";
import ebookSunrise from "../../../public/ebook-sonnenaufgang.png";

const bullets = [
  "Die 7 Stufen im Überblick",
  "Erste Übungen für mehr Klarheit",
  "Sofort per E-Mail – 100 % kostenlos",
];

export function LeadMagnet() {
  return (
    <section
      id="ebook"
      className="on-dark grain relative isolate scroll-mt-24 overflow-hidden bg-navy-900 py-16 sm:py-32"
    >
      {/* Atmosphärischer Hintergrund: goldener Sonnenaufgang über den Bergen.
          Liegt hinter dem Inhalt, sanft gedimmt und nach unten ausgeblendet,
          damit Überschrift und Formular klar lesbar bleiben. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src={ebookSunrise}
          alt=""
          priority={false}
          sizes="100vw"
          className="h-full w-full object-cover object-center opacity-70 [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.6)_62%,transparent_100%)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.6)_62%,transparent_100%)]"
        />
      </div>
      {/* Navy-Verlauf über dem Bild – hält den dunklen Grundton der Sektion und
          sorgt für ruhigen Kontrast hinter Text und Karte. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-navy-900) 38%, transparent) 0%, color-mix(in oklab, var(--color-navy-900) 64%, transparent) 100%)",
        }}
      />

      {/* Drei Blöcke in DOM-Reihenfolge Überschrift → Buch → Formular. Auf
          Mobile stapeln sie genau so (Buch sitzt zwischen Überschrift und
          Formular). Auf Desktop rückt das Buch per Grid in die linke Spalte
          über beide Zeilen, Überschrift und Formular stehen rechts.
          `size="wide"` (max-w-7xl) setzt Hero und Header auf dasselbe
          horizontale Raster – gleiche Außenkanten links wie rechts. Die
          Spalten stehen im Verhältnis 46/54 (fr statt %, damit der
          Spaltenabstand nicht zum horizontalen Überlauf führt) und rücken mit
          56px Spaltenabstand näher zusammen. */}
      <Container
        size="wide"
        className="grid items-center gap-10 lg:grid-cols-[46fr_54fr] lg:grid-rows-[auto_auto] lg:gap-x-14 lg:gap-y-8"
      >
        {/* Überschrift + Intro – Mobile oben, Desktop oben rechts. Der Block
            teilt sich mit dem Formular dieselbe linke Achse und dieselbe
            Zielbreite (~560px), damit der rechte Bereich als eine Einheit
            wirkt. */}
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <div className="flex flex-col items-start gap-5 lg:max-w-[560px]">
            <Eyebrow>Gratis-Einstieg</Eyebrow>
            {/* hyphens/overflow-wrap/word-break überschreiben die globalen
                Heading-Regeln (hyphens:auto + overflow-wrap:anywhere), damit
                „bewussten" nie getrennt wird. Ab sm bricht die goldene
                Italic-Phrase per `sm:block` sauber in die zweite Zeile:
                „Werde zum bewussten" / „Gestalter deiner Gedanken". Auf sehr
                schmalem Mobile bleibt sie inline und fließt kompakt weiter –
                immer nur an Wortgrenzen, nie innerhalb eines Wortes. */}
            <h2 className="text-[2rem] font-medium leading-[1.12] text-ink [hyphens:none] [overflow-wrap:normal] [word-break:normal] sm:text-4xl md:text-[2.9rem]">
              Werde zum bewussten{" "}
              <em className="accent sm:block">Gestalter deiner Gedanken</em>
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-ink-mid">
              Sichere dir das kostenlose E-Book und mach den ersten Schritt.
              Kompakt, klar und sofort umsetzbar.
            </p>
          </div>
        </Reveal>

        {/* Buch-Cover – Mobile zwischen Überschrift und Formular, Desktop linke
            Spalte über beide Zeilen. Warmer Gold-Schein und echter
            Schlagschatten, damit es steht statt zu schweben. */}
        <Reveal
          delay={100}
          className="lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center"
        >
          {/* Auf Desktop rechtsbündig (justify-end): das Buch rückt an die
              Spaltenkante zum Content und gehört so optisch zum Contentblock,
              statt links zu schweben. `translate-y` setzt es ~16px tiefer,
              die etwas kleinere Breite (27rem statt 28rem) schafft unten mehr
              Luft. */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative lg:translate-y-4">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-gold-400) 42%, transparent), transparent 70%)",
                }}
              />
              <Image
                src={ebookMockup}
                alt="Kostenloses E-Book „Die 7 Stufen der Bewusstseinsentwicklung“ von Heiko Schwaninger"
                priority
                className="h-auto w-64 drop-shadow-2xl sm:w-72 lg:w-[27rem]"
              />
              {/* Feine goldene Standlinie – gibt dem Cover einen Boden, dicht
                  unter dem Buch, damit keine zweite optische Achse entsteht. */}
              <div
                aria-hidden
                className="mx-auto mt-2 h-px w-40 max-w-[70%]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, color-mix(in oklab, var(--color-gold-500) 70%, transparent), transparent)",
                }}
              />
            </div>
          </div>
        </Reveal>

        {/* Formular – Mobile unter dem Buch, Desktop unten rechts */}
        <Reveal delay={150} className="lg:col-start-2 lg:row-start-2">
          {/* Erhöhte Karte mit Gold-Ring – macht das Formular zum edlen
              Fokuspunkt, statt es nackt auf die Fläche zu legen. Dieselbe
              Zielbreite (~560px) und linke Achse wie der Textblock darüber. */}
          <div className="glow-gold on-light w-full rounded-3xl border border-gold-400/30 bg-surface p-6 sm:p-7 lg:max-w-[560px]">
            <ul className="flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-sm text-ink-mid"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-[0.8rem] text-gold-700">
                    <Check />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <EbookForm source="startseite" />
            </div>

            {/* Trust-Zeile – Social Proof, der auf Hell bisher fehlte. */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/10 pt-4 text-xs text-ink-muted">
              <StarRating />
              <span>
                Von hunderten Leser:innen geladen · kein Spam, jederzeit
                abbestellbar
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
