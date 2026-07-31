import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-navy-900 pt-16 pb-14 text-cream sm:pt-32 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 55% at 50% -5%, color-mix(in oklab, var(--color-teal-500) 22%, transparent), transparent 62%), radial-gradient(45% 40% at 6% 100%, color-mix(in oklab, var(--color-brand-500) 20%, transparent), transparent 62%)",
        }}
      />
      <Container className="flex flex-col items-center gap-6 text-center">
        {eyebrow && (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h1 className="max-w-3xl text-[1.7rem] font-medium leading-[1.1] text-cream [hyphens:none] [overflow-wrap:normal] sm:text-5xl md:text-[3.4rem]">
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
