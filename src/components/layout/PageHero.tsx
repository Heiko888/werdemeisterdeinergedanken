import { HERO_GLOW } from "@/lib/gradients";
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
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imagePosition,
  fadeToColor,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imagePosition?: string;
  fadeToColor?: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark grain relative overflow-hidden bg-navy-900 pt-16 pb-14 text-cream sm:pt-32 sm:pb-24">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="z-0 object-cover"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-navy-900/85 via-navy-900/82 to-navy-900/90"
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
