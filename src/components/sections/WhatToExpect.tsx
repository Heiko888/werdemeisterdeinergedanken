import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Compass, Spark, Shield } from "@/components/ui/Icon";
import { expectations } from "@/lib/content";

const iconMap = {
  compass: Compass,
  spark: Spark,
  shield: Shield,
} as const;

export function WhatToExpect() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Was dich hier erwartet"
          title="Klarheit statt weiterer Ratgeber-Tipps"
          intro="Du bekommst keinen weiteren Motivationsspruch, sondern einen strukturierten Weg mit echten Werkzeugen."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {expectations.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <article
                key={item.title}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-navy-800/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl transition-opacity duration-300 group-hover:bg-brand-500/20" />
                <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-500/30 to-cosmic-violet/20 text-2xl text-cosmic-cyan">
                  {Icon && <Icon />}
                </span>
                <h3 className="relative text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-mist-200/70">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
