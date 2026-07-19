import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { CosmicBackground } from "@/components/visuals/CosmicBackground";
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
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
      <CosmicBackground />
      <Container className="flex flex-col items-center gap-6 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {intro && <p className="prose-lead max-w-2xl">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
