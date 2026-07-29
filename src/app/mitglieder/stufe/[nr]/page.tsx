import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play, Download } from "@/components/ui/Icon";
import { stages } from "@/lib/content";
import { getStageLesson } from "@/lib/stage-lessons";
import { deepDivesForStage } from "@/lib/deep-dives";
import { StageCompleteToggle } from "@/components/members/StageCompleteToggle";
import { JournalReflection } from "@/components/members/JournalReflection";

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
  const related = deepDivesForStage(idx + 1);
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
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Mein Bereich
          </Link>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl italic text-accent sm:text-5xl">
              {stage.number}
            </span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
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

          {/* Fortschritt: Stufe als abgeschlossen markieren */}
          <StageCompleteToggle stageKey={stage.number} />

          {/* Video */}
          <div>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
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
                <p className="max-w-xs px-6 text-sm leading-relaxed text-ink-muted">
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

              <div className="flex flex-wrap gap-3">
                <a
                  href={`/mitglieder/stufe/${idx + 1}/lektion`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent"
                >
                  <Download />
                  Komplette Lektion als PDF
                </a>
                <a
                  href={`/mitglieder/stufe/${idx + 1}/uebungen`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent"
                >
                  <Download />
                  Übungen als PDF
                </a>
              </div>
            </div>
          )}

          {/* Reflexion (beschreibbar, mit Autosave) */}
          {lesson && lesson.reflection.length > 0 && (
            <JournalReflection
              itemType="stage"
              itemKey={stage.number}
              questions={lesson.reflection}
            />
          )}

          {/* Verankerung */}
          {lesson?.affirmation && (
            <div className="rounded-2xl border border-ink/10 bg-paper/50 p-8 text-center">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
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
              <span className="rounded-full border border-ink/10 bg-white px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-muted">
                In Vorbereitung
              </span>
              <h2 className="font-display text-xl italic text-ink">
                Die Lektion zu dieser Stufe wird gerade erstellt
              </h2>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                Hier entstehen die Inhalte, Übungen und Materialien für „
                {stage.title}“. Sobald sie fertig sind, findest du sie an genau
                dieser Stelle.
              </p>
            </div>
          )}

          {/* Vertiefungen zu dieser Stufe */}
          {related.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Wissens-Bibliothek
                </span>
                <h2 className="font-display text-xl font-medium text-ink">
                  Passende Vertiefungen
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((dive) => (
                  <Link
                    key={dive.slug}
                    href={`/mitglieder/wissen/${dive.slug}`}
                    className="group flex flex-col gap-1.5 rounded-2xl border border-ink/10 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-medium text-ink transition-colors group-hover:text-accent">
                        {dive.title}
                      </span>
                      <ArrowRight className="shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-mid">
                      {dive.summary}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Kontakt-Hinweis */}
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-white p-8 shadow-card">
            <h2 className="font-display text-xl italic text-ink">
              Fragen zu dieser Stufe?
            </h2>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
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
