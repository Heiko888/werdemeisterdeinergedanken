import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Play } from "@/components/ui/Icon";
import { deepDives, getDeepDive } from "@/lib/deep-dives";
import { stages } from "@/lib/content";

export function generateStaticParams() {
  return deepDives.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dive = getDeepDive(slug);
  if (!dive) return { title: "Vertiefung nicht gefunden" };
  return {
    title: `${dive.title} – Vertiefung`,
    robots: { index: false, follow: false },
  };
}

export default async function DeepDivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dive = getDeepDive(slug);
  if (!dive) notFound();

  const stage = stages[dive.relatedStage - 1];

  return (
    <>
      {/* Kopf */}
      <section className="grain relative overflow-hidden border-b border-ink/10 py-14 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 60% at 20% 0%, color-mix(in oklab, var(--color-teal-500) 12%, transparent), transparent 65%)",
          }}
        />
        <Container size="narrow" className="flex flex-col items-start gap-4">
          <Link
            href="/mitglieder"
            className="inline-flex items-center gap-2 text-sm text-ink-soft/70 transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Mein Bereich
          </Link>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Vertiefung · {dive.category}
          </span>
          <h1 className="text-[2rem] font-medium leading-[1.1] text-ink sm:text-4xl md:text-5xl">
            {dive.title}
          </h1>
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-soft/60">
            {dive.subtitle}
          </p>
        </Container>
      </section>

      {/* Inhalt */}
      <section className="py-14 sm:py-20">
        <Container size="narrow" className="flex flex-col gap-12">
          {/* Kerngedanke */}
          <blockquote className="border-l-2 border-accent/40 pl-5 sm:pl-6">
            <p className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
              {dive.keyIdea}
            </p>
          </blockquote>

          {/* Einführung */}
          <p className="text-lg leading-relaxed text-ink-soft/85">{dive.intro}</p>

          {/* Video */}
          <div>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-soft/50">
              Video zur Vertiefung
            </span>
            {dive.video ? (
              <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 shadow-card">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${dive.video}`}
                  title={`Video zu ${dive.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="mt-3 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-paper/50 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
                  <Play />
                </span>
                <p className="max-w-xs px-6 text-sm leading-relaxed text-ink-soft/60">
                  Das Video zu dieser Vertiefung folgt in Kürze.
                </p>
              </div>
            )}
          </div>

          {/* Lektion */}
          <div className="flex flex-col gap-8">
            {dive.sections.map((section) => (
              <article key={section.heading} className="flex flex-col gap-2">
                <h2 className="text-lg font-medium text-ink">
                  {section.heading}
                </h2>
                <p className="leading-relaxed text-ink-soft/85">
                  {section.body}
                </p>
              </article>
            ))}
          </div>

          {/* Übungen */}
          {dive.exercises.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-2xl font-medium text-ink">
                Deine Übungen
              </h2>
              <div className="grid gap-5">
                {dive.exercises.map((exercise) => (
                  <div
                    key={exercise.title}
                    className="rounded-2xl border border-ink/10 bg-white p-7 shadow-card"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl font-medium text-ink">
                        {exercise.title}
                      </h3>
                      {exercise.duration && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                          {exercise.duration}
                        </span>
                      )}
                    </div>
                    <ol className="mt-5 flex flex-col gap-3">
                      {exercise.steps.map((step, i) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-ink-soft/85"
                        >
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-xs font-semibold text-accent">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reflexion */}
          {dive.reflection.length > 0 && (
            <div className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
              <h2 className="font-display text-xl font-medium text-ink">
                Zum Innehalten
              </h2>
              <ul className="flex flex-col gap-4">
                {dive.reflection.map((question) => (
                  <li
                    key={question}
                    className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-ink-soft/85"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-xs text-accent">
                      <Check />
                    </span>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Kernbotschaft */}
          <div className="rounded-2xl border border-ink/10 bg-paper/50 p-8 text-center">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-soft/50">
              Kernbotschaft
            </span>
            <p className="mt-3 font-display text-xl italic leading-snug text-ink sm:text-2xl">
              „{dive.takeaway}“
            </p>
          </div>

          {/* Querverweis zur Stufe */}
          {stage && (
            <Link
              href={`/mitglieder/stufe/${dive.relatedStage}`}
              className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-soft/50">
                Passend dazu · Stufe {stage.number}
              </span>
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  {stage.title} – {stage.subtitle}
                </span>
                <ArrowRight className="shrink-0 text-ink-soft/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </span>
            </Link>
          )}

          {/* Fragen */}
          <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-8">
            <Link
              href="/mitglieder"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowRight className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
              Zur Übersicht
            </Link>
            <Button href="/kontakt" variant="ghost">
              Frage stellen
              <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
