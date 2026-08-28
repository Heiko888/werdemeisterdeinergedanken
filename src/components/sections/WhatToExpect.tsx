import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { Compass, Spark, Shield } from "@/components/ui/Icon";
import { expectations } from "@/lib/content";

const iconMap = {
  compass: Compass,
  spark: Spark,
  shield: Shield,
} as const;

export function WhatToExpect() {
  return (
    <section className="bg-surface-aura grain-soft relative isolate overflow-hidden py-16 sm:py-32">
      {/* Weicher Auslauf in die folgende dunkle „Stimmen“-Sektion: der untere
          Rand der hellen Fläche löst sich in exakt deren Grundfarbe
          (navy-950) auf, damit Navy auf Navy trifft – keine harte Kante /
          kein sichtbarer Balken am Übergang. Liegt in der leeren unteren
          Sektionszone hinter dem Inhalt. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 sm:h-44"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-navy-950))",
        }}
      />
      <Container className="relative z-10">
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
                <Card
                  as="article"
                  interactive
                  className="flex min-w-0 flex-col gap-4"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500 to-teal-500 text-xl text-cream shadow-card">
                    {Icon && <Icon />}
                  </span>
                  <h3 className="text-xl font-medium text-ink">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-mid">
                    {item.text}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
