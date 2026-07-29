import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { stages } from "@/lib/content";
import { cn } from "@/lib/cn";

export function StageCard({
  number,
  title,
  subtitle,
  description,
  className,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-col gap-3 border-t border-ink/10 pt-6 transition-colors duration-300 hover:border-accent/40",
        className,
      )}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-display text-4xl italic text-accent/80">
          {number}
        </span>
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
          {subtitle}
        </span>
      </div>
      <h3 className="text-xl font-medium text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-mid">{description}</p>
    </article>
  );
}

export function SevenStages() {
  return (
    <section id="angebot" className="relative py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Der Weg"
            title={
              <>
                Die 7 Stufen der{" "}
                <em className="accent">Bewusstseinsentwicklung</em>
              </>
            }
            intro="Kein loser Werkzeugkasten, sondern ein klarer Weg. Jede Stufe baut auf der vorherigen auf – von der ersten Ahnung bis zur echten Meisterschaft über deine Gedanken."
          />
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage, i) => (
            <Reveal key={stage.number} delay={(i % 3) * 80}>
              <StageCard {...stage} />
            </Reveal>
          ))}

          <Reveal delay={80} className="sm:col-span-2 lg:col-span-1">
            <div className="flex h-full flex-col justify-between gap-6 border-t border-accent/30 pt-6">
              <div>
                <h3 className="font-display text-xl italic text-ink">
                  Bereit, deinen Weg zu gehen?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-mid">
                  Sieh dir die 7 Stufen im Detail an und finde heraus, wo du
                  gerade stehst.
                </p>
              </div>
              <ArrowLink href="/die-7-stufen">Stufen im Detail</ArrowLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
