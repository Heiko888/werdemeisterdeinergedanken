import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play, Download } from "@/components/ui/Icon";
import { deepDives, getDeepDive } from "@/lib/deep-dives";
import { stages } from "@/lib/content";
import { hasStaticPdf } from "@/lib/pdf/static-pdf";
import { JournalReflection } from "@/components/members/JournalReflection";
import { VideoEmbed } from "@/components/members/VideoEmbed";
import { LessonHero } from "@/components/members/LessonHero";
import { site } from "@/lib/site";

// Optionale Titelbilder pro Vertiefung – nur Vertiefungen mit einem Eintrag
// bekommen ein vollflächiges Hero-Bild, alle anderen den reinen Verlauf-Hero.
const DEEPDIVE_HERO_IMAGES: Record<string, string> = {
  "automatische-gedanken": "/hero-automatische-gedanken.webp",
  "kognitive-verzerrungen": "/hero-vertiefung-verzerrungen.webp",
  "reiz-reaktions-luecke": "/hero-reiz-reaktion.webp",
  "gruebeln": "/hero-gruebeln.webp",
  "konditionierung": "/hero-vertiefung-konditionierung.webp",
  "kernueberzeugungen": "/hero-kernueberzeugungen.webp",
  "innerer-kritiker": "/hero-innerer-kritiker.webp",
  "selbstmitgefuehl": "/hero-selbstmitgefuehl.webp",
  "neuroplastizitaet": "/hero-vertiefung-neuroplastizitaet.webp",
  "emotionsregulation": "/hero-emotionsregulation.webp",
  "werte-und-ziele": "/hero-werte-ziele.webp",
  "integration-und-weitergabe": "/hero-integration.webp",
  "muster-und-koerper": "/hero-muster-koerper.webp",
  "propaganda": "/hero-propaganda.webp",
  "framing": "/hero-framing.webp",
  "sprache-und-etiketten": "/hero-sprache-etiketten.webp",
  "medien-agenda": "/hero-medien-agenda.webp",
  "algorithmen": "/hero-algorithmen.webp",
  "werbung-und-mangel": "/hero-werbung-mangel.webp",
  "gruppendruck": "/hero-gruppendruck.webp",
  "autoritaetshoerigkeit": "/hero-autoritaet.webp",
  "angst-steuerung": "/hero-angst-steuerung.webp",
  "wiederholung-wahrheit": "/hero-wiederholung.webp",
};

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
      <LessonHero
        eyebrow={`Vertiefung · ${dive.category}`}
        title={dive.title}
        subtitle={dive.subtitle}
        image={DEEPDIVE_HERO_IMAGES[dive.slug]}
      />

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
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Video zur Vertiefung
            </span>
            {(dive.video ?? site.placeholderVideoId) ? (
              <VideoEmbed
                videoId={(dive.video ?? site.placeholderVideoId)!}
                title={`Video zu ${dive.title}`}
                poster={`/video-thumbnails/vertiefungen/${dive.slug}.png`}
              />
            ) : (
              <div className="mt-3 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-paper/50 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
                  <Play />
                </span>
                <p className="max-w-xs px-6 text-sm leading-relaxed text-ink-muted">
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

              {hasStaticPdf(`vertiefung-${dive.slug}`) && (
                <a
                  href={`/mitglieder/wissen/${dive.slug}/lektion`}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent"
                >
                  <Download />
                  Diese Vertiefung als PDF
                </a>
              )}
            </div>
          )}

          {/* Reflexion (beschreibbar, mit Autosave) */}
          {dive.reflection.length > 0 && (
            <JournalReflection
              itemType="deep_dive"
              itemKey={dive.slug}
              questions={dive.reflection}
            />
          )}

          {/* Kernbotschaft */}
          <div className="rounded-2xl border border-ink/10 bg-paper/50 p-8 text-center">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Kernbotschaft
            </span>
            <p className="mt-3 font-display text-xl italic leading-snug text-ink sm:text-2xl">
              „{dive.takeaway}“
            </p>
          </div>

          {/* Wissenschaftlicher Hintergrund */}
          {dive.sources && dive.sources.length > 0 && (
            <div className="rounded-2xl border border-ink/10 bg-white p-7 shadow-card sm:p-8">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                Wissenschaftlicher Hintergrund
              </span>
              <ul className="mt-5 flex flex-col gap-5">
                {dive.sources.map((s) => (
                  <li key={s.ref} className="flex flex-col gap-1 border-t border-ink/10 pt-4 first:border-t-0 first:pt-0">
                    <span className="text-sm font-semibold text-ink">{s.ref}</span>
                    <span className="text-sm leading-relaxed text-ink-mid">{s.finding}</span>
                    {s.note && (
                      <span className="mt-1 text-xs leading-relaxed text-ink-muted">
                        <span className="font-semibold uppercase tracking-wide">Einordnung:</span>{" "}
                        {s.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-ink-muted">
                Eine einzelne Studie ist ein Hinweis, kein Beweis. Wo Befunde
                umstritten oder populärwissenschaftlich sind, ist das bewusst
                gekennzeichnet.
              </p>
            </div>
          )}

          {/* Querverweis zur Stufe */}
          {stage && (
            <Link
              href={`/mitglieder/stufe/${dive.relatedStage}`}
              className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                Passend dazu · Stufe {stage.number}
              </span>
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  {stage.title} – {stage.subtitle}
                </span>
                <ArrowRight className="shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
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
