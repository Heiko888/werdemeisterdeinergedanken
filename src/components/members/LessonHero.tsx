import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { APP_GLOW } from "@/lib/gradients";
import { heroImageAspect } from "@/lib/hero-image";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icon";

/**
 * Kopf einer Lektion – Stufe, Vertiefung oder Praxis.
 *
 * Übernimmt die Bildsprache der Video-Thumbnails
 * (docs/marketing/video-thumbnails.mjs): Eyebrow im Grün→Teal-Verlauf, Titel
 * in Fraunces und – wo es eine Nummer gibt – die große Geister-Ziffer als
 * Wasserzeichen. Das Brain-Emblem bleibt dem Thumbnail vorbehalten; auf der
 * Seite trägt es der Header schon. Anders als das PNG ist hier alles
 * Text: scharf auf jedem Display, markierbar, ohne zusätzliche Ladezeit.
 */
export function LessonHero({
  eyebrow,
  title,
  subtitle,
  watermark,
  image,
  imagePosition,
  children,
}: {
  eyebrow: ReactNode;
  title: string;
  /** Ruhige Zeile unter dem Titel – wie die `.sub` im Thumbnail. */
  subtitle?: string;
  /** Ziffer als Wasserzeichen; nur die Stufen haben eine. */
  watermark?: string;
  /**
   * Optionales Titelbild. Ab `lg` vollflächig hinter dem Text (mit Navy-
   * Schleier), auf Mobile als vollflächiges Bildband im Fluss über dem Text –
   * wie bei {@link PageHero}, damit das Querformat mobil ganz sichtbar bleibt.
   * Reine Dekoration – deshalb `alt=""`.
   */
  image?: string;
  /**
   * Optionaler `object-position`-Wert (z. B. "center 20%"), damit bei
   * hohen Motiven der Kopf nicht vom object-cover-Zuschnitt abgeschnitten
   * wird. Standard ist "center".
   */
  imagePosition?: string;
  /** Zusätzliche Elemente unter dem Titel, z. B. die Dauer-Plakette. */
  children?: ReactNode;
}) {
  // Gemeinsamer Kopf-Inhalt (Zurück-Link, Eyebrow, Titel, …) – in beiden
  // Layout-Varianten identisch.
  const content = (
    <>
      <Link
        href="/mitglieder"
        className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
      >
        <ArrowRight className="rotate-180" />
        Mein Bereich
      </Link>
      <span className="text-gradient-leaf text-[0.7rem] font-bold uppercase tracking-[0.2em] sm:text-xs">
        {eyebrow}
      </span>
      <h1 className="font-display text-[2rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
          {subtitle}
        </p>
      )}
      {children}
    </>
  );

  // Mit Bildband auf Mobile: das Bild liegt als eigenes Band im Fluss und wird
  // erst ab lg zum Hintergrund. Seitenverhältnis automatisch aus der Datei.
  const bandAspect = image ? heroImageAspect(image) : undefined;
  if (image && bandAspect) {
    return (
      <section className="member-hero flex flex-col overflow-hidden lg:min-h-[34rem] lg:justify-center">
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
            className="z-0 object-cover object-center"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          {/* Unterkante mobil ins Navy blenden, damit Bildband und Textblock
              weich ineinander übergehen. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950 to-transparent lg:hidden"
          />
        </div>
        {/* Navy-Schleier für Lesbarkeit über dem Bild – erst ab lg. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden bg-gradient-to-r from-navy-950/92 via-navy-950/80 to-navy-950/62 lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: APP_GLOW }}
        />
        {watermark && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-2 top-1/2 z-0 hidden -translate-y-1/2 select-none font-display text-[9rem] font-semibold leading-[0.8] text-white/[0.06] sm:right-8 sm:text-[15rem] md:text-[19rem] lg:block"
          >
            {watermark}
          </span>
        )}
        <Container
          size="narrow"
          className="relative z-10 flex flex-col items-start gap-4 pb-14 pt-8 sm:pb-16 sm:pt-10 lg:py-16"
        >
          {content}
        </Container>
      </section>
    );
  }

  return (
    <section
      className={`member-hero overflow-hidden ${
        image
          ? // Mit Hintergrundbild: feste Mindesthöhe und vertikal zentrierter
            // Inhalt, damit das querformatige Motiv als vollwertiges Herobild
            // wirkt und nicht auf einen schmalen Streifen zusammenschrumpft –
            // wie bei PageHero.
            "flex flex-col justify-center min-h-[22rem] py-14 sm:min-h-[34rem] sm:py-16"
          : "py-14 sm:py-16"
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
            className="z-0 object-cover object-center"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-navy-950/92 via-navy-950/80 to-navy-950/62"
          />
        </>
      )}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${image ? "z-0" : "-z-10"}`}
        style={{ background: APP_GLOW }}
      />
      {watermark && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[9rem] font-semibold leading-[0.8] text-white/[0.06] sm:right-8 sm:text-[15rem] md:text-[19rem]"
        >
          {watermark}
        </span>
      )}
      <Container
        size="narrow"
        className={`${image ? "relative z-10 " : ""}flex flex-col items-start gap-4`}
      >
        {content}
      </Container>
    </section>
  );
}
