import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
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
        "group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-navy-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-navy-800/70",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, var(--color-brand-500) 16%, transparent), transparent 60%)",
        }}
      />
      <div className="relative flex items-center gap-3">
        <span className="font-display text-3xl font-bold text-gradient">
          {number}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
      <h3 className="relative text-xl font-bold text-white">{title}</h3>
      <p className="relative text-xs font-semibold uppercase tracking-wider text-brand-200">
        {subtitle}
      </p>
      <p className="relative text-sm leading-relaxed text-mist-200/70">
        {description}
      </p>
    </article>
  );
}

export function SevenStages() {
  return (
    <section id="angebot" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[24rem] w-[40rem] -translate-x-1/2 rounded-full bg-cosmic-violet/10 blur-[120px]" />

      <Container>
        <SectionHeading
          eyebrow="Der Weg"
          title={
            <>
              Die 7 Stufen der{" "}
              <span className="text-gradient">Bewusstseinsentwicklung</span>
            </>
          }
          intro="Kein loser Werkzeugkasten, sondern ein klarer Weg. Jede Stufe baut auf der vorherigen auf – von der ersten Ahnung bis zur echten Meisterschaft über deine Gedanken."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage) => (
            <StageCard key={stage.number} {...stage} />
          ))}

          {/* Abschluss-Karte */}
          <article className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-brand-400/30 bg-gradient-to-br from-brand-600/30 to-cosmic-violet/20 p-6">
            <div className="pointer-events-none absolute inset-0 bg-stars opacity-40" />
            <div className="relative">
              <h3 className="text-xl font-bold text-white">
                Bereit, deinen Weg zu gehen?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-100/80">
                Sieh dir die 7 Stufen im Detail an und finde heraus, wo du gerade
                stehst.
              </p>
            </div>
            <Button href="/die-7-stufen" variant="secondary" className="relative w-fit">
              Stufen im Detail
              <ArrowRight />
            </Button>
          </article>
        </div>
      </Container>
    </section>
  );
}
