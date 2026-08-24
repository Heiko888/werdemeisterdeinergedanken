import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { APP_GLOW } from "@/lib/gradients";
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
  children,
}: {
  eyebrow: ReactNode;
  title: string;
  /** Ruhige Zeile unter dem Titel – wie die `.sub` im Thumbnail. */
  subtitle?: string;
  /** Ziffer als Wasserzeichen; nur die Stufen haben eine. */
  watermark?: string;
  /**
   * Optionales Titelbild: vollflächig hinter dem Text, darüber ein Navy-
   * Schleier für den Kontrast. Reine Dekoration – deshalb `alt=""`.
   */
  image?: string;
  /** Zusätzliche Elemente unter dem Titel, z. B. die Dauer-Plakette. */
  children?: ReactNode;
}) {
  return (
    <section className="member-hero overflow-hidden py-14 sm:py-16">
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
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/55"
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
      </Container>
    </section>
  );
}
