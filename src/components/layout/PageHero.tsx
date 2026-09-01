import { HERO_GLOW } from "@/lib/gradients";
import { heroImageAspect } from "@/lib/hero-image";
import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Kopfbereich der Unterseiten. Optional mit `image`: das Bild liegt dann
 * vollflächig hinter dem Text, darüber ein Navy-Schleier für den Kontrast
 * und zuletzt der übliche HERO_GLOW, damit der Farbton zum Rest passt.
 * Das Bild ist reine Dekoration hinter der H1 – deshalb bewusst `alt=""`.
 *
 * Optional mit `fadeToColor` (eine CSS-Farbe): erzeugt am unteren Rand einen
 * langen, weichen Verlauf, der das Hero-Ende exakt in die Hintergrundfarbe der
 * folgenden Sektion überführt – so entsteht kein harter horizontaler Schnitt.
 * Auf Mobile ist der Verlauf bewusst länger als auf Desktop.
 *
 * Optional mit `imagePosition` (ein CSS-`object-position`-Wert, z. B. "left"
 * oder "30% center"): steuert, welcher Bildausschnitt beim `object-cover`-Zuschnitt
 * erhalten bleibt. Nützlich, wenn das Motiv nicht mittig sitzt (z. B. ein Arm am
 * linken Rand), der sonst auf schmalen/hohen Containern weggeschnitten würde.
 * Standard ist "center".
 *
 * Optional mit `imageClassName` (zusätzliche Klassen aufs Bild, z. B.
 * `saturate-125 brightness-110`): lässt ein dunkles/blasses Motiv kräftiger
 * wirken. Optional mit `overlayClassName`: ersetzt den Standard-Navy-Schleier,
 * um bei einem farbigen Motiv weniger abzudunkeln (Text bleibt hell auf dunkel).
 *
 * Mobile Bildband (Standard, sobald `image` gesetzt ist): Das Herobild liegt auf
 * Mobile – wie auf der Mitgliedschaftsseite – als vollflächiges Bildband im Fluss
 * (unbeschnitten, in voller Höhe) mit dem Text darunter auf Navy. Ab `lg` bleibt
 * alles beim gewohnten Verhalten: das Bild liegt als Hintergrund hinter dem Text.
 * Nur so ist auf schmalen Displays das ganze Querformat-Motiv sichtbar, statt
 * links und rechts weggeschnitten zu werden. Das dafür nötige Seitenverhältnis
 * wird automatisch aus der Bilddatei gelesen – jedes künftige Herobild bekommt
 * die Mobilansicht also von selbst.
 *
 * Optional mit `mobileBand`: überschreibt das Seitenverhältnis von Hand (CSS-Wert,
 * z. B. "1672 / 941"), falls das Bild einmal nicht automatisch gelesen werden kann.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imagePosition,
  imageClassName,
  overlayClassName = "from-navy-900/85 via-navy-900/82 to-navy-900/90",
  fadeToColor,
  mobileBand,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imagePosition?: string;
  imageClassName?: string;
  overlayClassName?: string;
  fadeToColor?: string;
  mobileBand?: string;
  children?: ReactNode;
}) {
  // Mit Bildband auf Mobile: das Bild liegt als eigenes Band im Fluss und wird
  // erst ab lg zum Hintergrund. Dafür ist der Aufbau der Sektion ein anderer.
  // Das Seitenverhältnis kommt automatisch aus der Datei; `mobileBand` kann es
  // überschreiben. Fehlt beides (z. B. externe URL), greift der klassische Aufbau.
  const bandAspect = image ? (mobileBand ?? heroImageAspect(image)) : undefined;
  if (image && bandAspect) {
    return (
      <section className="on-dark grain relative flex flex-col overflow-hidden bg-navy-900 text-cream lg:min-h-[34rem] lg:justify-center">
        {/* Bild: bis lg als Band im Fluss (volle Höhe, unbeschnitten),
            ab lg als vollflächiger Hintergrund hinter dem Text. */}
        <div
          className="relative w-full shrink-0 lg:absolute lg:inset-0 lg:z-0"
          style={{ aspectRatio: bandAspect }}
        >
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className={`pointer-events-none z-0 object-cover${imageClassName ? ` ${imageClassName}` : ""}`}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          {/* Unterkante mobil ins Navy blenden, damit Bildband und Textblock
              weich ineinander übergehen statt hart abzusetzen. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900 to-transparent lg:hidden"
          />
        </div>
        {/* Navy-Schleier für Lesbarkeit über dem Bild – erst ab lg, darunter
            steht der Text ohnehin auf reinem Navy unter dem Band. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-0 hidden bg-gradient-to-b lg:block ${overlayClassName}`}
        />
        {/* Gold-Glow wie auf den übrigen Seiten, damit der Farbton passt. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: HERO_GLOW }}
        />
        <Container className="relative z-10 flex flex-col items-center gap-6 pb-14 pt-8 text-center sm:pb-16 sm:pt-10 lg:py-24">
          {eyebrow && (
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h1 className="max-w-3xl text-[1.7rem] font-medium leading-[1.1] text-cream sm:[hyphens:none] sm:[overflow-wrap:normal] sm:text-5xl md:text-[3.4rem]">
              {title}
            </h1>
          </Reveal>
          {intro && (
            <Reveal delay={140}>
              <p className="max-w-2xl text-[1.05rem] leading-relaxed text-cream/75">
                {intro}
              </p>
            </Reveal>
          )}
          {children && <Reveal delay={200}>{children}</Reveal>}
        </Container>
      </section>
    );
  }

  return (
    <section
      className={`on-dark grain relative overflow-hidden bg-navy-900 text-cream ${
        image
          ? // Mit Hintergrundbild: feste Mindesthöhe und vertikal zentrierter
            // Inhalt, damit das (querformatige) Motiv als vollwertiges Herobild
            // wirkt und nicht auf einen schmalen Streifen zusammenschrumpft.
            "flex flex-col justify-center min-h-[22rem] py-16 sm:min-h-[34rem] sm:py-24"
          : "pt-16 pb-14 sm:pt-32 sm:pb-24"
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className={`z-0 object-cover${imageClassName ? ` ${imageClassName}` : ""}`}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 z-0 bg-gradient-to-b ${overlayClassName}`}
          />
        </>
      )}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${image ? "z-0" : "-z-10"}`}
        style={{
          background:
            HERO_GLOW,
        }}
      />
      {fadeToColor && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-3/4 sm:h-3/5"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, color-mix(in oklab, ${fadeToColor} 45%, transparent) 45%, color-mix(in oklab, ${fadeToColor} 85%, transparent) 75%, ${fadeToColor} 100%)`,
          }}
        />
      )}
      <Container className="relative z-10 flex flex-col items-center gap-6 text-center">
        {eyebrow && (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h1 className="max-w-3xl text-[1.7rem] font-medium leading-[1.1] text-cream sm:[hyphens:none] sm:[overflow-wrap:normal] sm:text-5xl md:text-[3.4rem]">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={140}>
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-cream/75">
              {intro}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={200}>{children}</Reveal>}
      </Container>
    </section>
  );
}
