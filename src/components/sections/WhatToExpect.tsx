import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Compass, Spark, Shield } from "@/components/ui/Icon";
import { expectations } from "@/lib/content";

const iconMap = {
  compass: Compass,
  spark: Spark,
  shield: Shield,
} as const;

export function WhatToExpect() {
  return (
    <section className="relative border-t border-white/10 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Was dich hier erwartet"
            title={
              <>
                Klarheit statt weiterer{" "}
                <em className="accent">Ratgeber-Tipps</em>
              </>
            }
            intro="Du bekommst keinen weiteren Motivationsspruch, sondern einen strukturierten Weg mit echten Werkzeugen."
          />
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {expectations.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={item.title} delay={i * 90}>
                <article className="flex min-w-0 flex-col gap-4 border-t border-white/10 pt-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-leaf-400/30 text-xl text-leaf-400">
                    {Icon && <Icon />}
                  </span>
                  <h3 className="text-xl font-medium text-cream">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-cream-dim/70">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
