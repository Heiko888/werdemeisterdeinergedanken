import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Play } from "@/components/ui/Icon";
import { stages } from "@/lib/content";
import { getStageLesson } from "@/lib/stage-lessons";

export function generateStaticParams() {
  return stages.map((_, i) => ({ nr: String(i + 1) }));
}

function getStage(nr: string) {
  const idx = Number(nr) - 1;
  if (!Number.isInteger(idx) || idx < 0 || idx >= stages.length) return null;
  return { idx, stage: stages[idx] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nr: string }>;
}): Promise<Metadata> {
  const { nr } = await params;
  const found = getStage(nr);
  if (!found) return { title: "Stufe nicht gefunden" };
  return {
    title: `Stufe ${found.stage.number} – ${found.stage.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ nr: string }>;
}) {
  const { nr } = await params;
  const found = getStage(nr);
  if (!found) notFound();

  const { idx, stage } = found;
  const lesson = getStageLesson(stage.number);
  const prev = idx > 0 ? idx : null; // 0-basiert → Nummer = idx
  const next = idx < stages.length - 1 ? idx + 2 : null;

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
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl italic text-accent sm:text-5xl">
              {stage.number}
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-soft/50">
              Stufe {idx + 1} von {stages.length}
            </span>
          </div>
          <h1 className="text-[2rem] font-medium leading-[1.1] text-ink sm:text-4xl md:text-5xl">
            {stage.title}
          </h1>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {stage.subtitle}
          </p>
        </Container>
      </section>

      {/* Inhalt */}
      <section className="py-14 sm:py-20">
        <Container size="narrow" className="flex flex-col gap-12">
          {/* Kerngedanke */}
          {lesson && (
            <blockquote className="border-l-2 border-accent/40 pl-5 sm:pl-6">
              <p className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
                {lesson.keyIdea}
              </p>
            </blockquote>
          )}

          {/* Einführung */}
          <p className="text-lg leading-relaxed text-ink-soft/85">
            {lesson?.intro ?? stage.description}
          </p>

          {/* Video */}
          <div>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-soft/50">
              Video zur Stufe
            </span>
            {lesson?.video ? (
              <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 shadow-card">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${lesson.video}`}
                  title={`Video zu Stufe ${stage.number} – ${stage.title}`}
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
                  Das Video zu dieser Stufe folgt in Kürze.
                </p>
              </div>
            )}
          </div>

          {/* Lektion */}
          {lesson && (
            <div className="flex flex-col gap-8">
              <h2 className="font-display text-2xl font-medium text-ink">
                Die Lektion
              </h2>
              {lesson.sections.map((section) => (
                <article key={section.heading} className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium text-ink">
                    {section.heading}
                  </h3>
                  <p className="leading-relaxed text-ink-soft/85">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          )}

          {/* Übungen */}
          {lesson && lesson.exercises.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-2xl font-medium text-ink">
                Deine Übungen
              </h2>
              <div className="grid gap-5">
                {lesson.exercises.map((exercise) => (
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
          {lesson && lesson.reflection.length > 0 && (
            <div className="flex flex-col gap-5 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
              <h2 className="font-display text-xl font-medium text-ink">
                Zum Innehalten
              </h2>
              <ul className="flex flex-col gap-4">
                {lesson.reflection.map((question) => (
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

          {/* Verankerung */}
          {lesson?.affirmation && (
            <div className="rounded-2xl border border-ink/10 bg-paper/50 p-8 text-center">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-soft/50">
                Dein Leitsatz
              </span>
              <p className="mt-3 font-display text-xl italic leading-snug text-ink sm:text-2xl">
                „{lesson.affirmation}“
              </p>
            </div>
          )}

          {/* Fallback, falls (noch) keine Lektion hinterlegt ist */}
          {!lesson && (
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-ink/20 bg-paper/40 p-8">
              <span className="rounded-full border border-ink/10 bg-white px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-soft/60">
                In Vorbereitung
              </span>
              <h2 className="font-display text-xl italic text-ink">
                Die Lektion zu dieser Stufe wird gerade erstellt
              </h2>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/75">
                Hier entstehen die Inhalte, Übungen und Materialien für „
                {stage.title}“. Sobald sie fertig sind, findest du sie an genau
                dieser Stelle.
              </p>
            </div>
          )}

          {/* Kontakt-Hinweis */}
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-white p-8 shadow-card">
            <h2 className="font-display text-xl italic text-ink">
              Fragen zu dieser Stufe?
            </h2>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/75">
              Wenn etwas in dir aufkommt oder du nicht weiterweißt – ich bin
              jederzeit für dich da. Schreib mir einfach.
            </p>
            <Button href="/kontakt" variant="accent">
              Kontakt aufnehmen
              <ArrowRight />
            </Button>
          </div>

          {/* Vor / Zurück */}
          <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-8">
            {prev ? (
              <Link
                href={`/mitglieder/stufe/${prev}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <ArrowRight className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                Vorherige Stufe
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/mitglieder/stufe/${next}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-ink"
              >
                Nächste Stufe
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
