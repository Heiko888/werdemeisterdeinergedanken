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
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-navy-900 pt-16 pb-14 text-cream sm:pt-32 sm:pb-24">
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
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-navy-900/80 via-navy-900/70 to-navy-900/85"
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
