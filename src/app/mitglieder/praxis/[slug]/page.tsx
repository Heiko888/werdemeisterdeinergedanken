import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Play } from "@/components/ui/Icon";
import { practices, getPractice } from "@/lib/practices";
import { stages } from "@/lib/content";

export function generateStaticParams() {
  return practices.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) return { title: "Praxis nicht gefunden" };
  return {
    title: `${practice.title} – Praxis`,
    robots: { index: false, follow: false },
  };
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practice = getPractice(slug);
  if (!practice) notFound();

  const stage = stages[practice.relatedStage - 1];

  return (
    <>
      {/* Kopf */}
      <section className="grain relative overflow-hidden border-b border-ink/10 py-14 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              APP_GLOW,
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
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Praxis · {practice.category}
          </span>
          <h1 className="text-[2rem] font-medium leading-[1.1] text-ink sm:text-4xl md:text-5xl">
            {practice.title}
          </h1>
          <span className="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-mid">
            {practice.duration}
          </span>
        </Container>
      </section>

      {/* Inhalt */}
      <section className="py-14 sm:py-20">
        <Container size="narrow" className="flex flex-col gap-10">
          {/* Wofür / Wann */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent">
                Wofür
              </h2>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-soft/85">
                {practice.purpose}
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent">
                Wann
              </h2>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-soft/85">
                {practice.when}
              </p>
            </div>
          </div>

          {/* Einführung */}
          <p className="text-lg leading-relaxed text-ink-soft/85">
            {practice.intro}
          </p>

          {/* Audio / Video */}
          <div>
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
              Geführte Aufnahme
            </span>
            {practice.audio ? (
              <div className="mt-3 flex flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
                  <Play />
                </span>
                <p className="text-sm font-medium text-ink">
                  {practice.title} – zum Anhören
                </p>
                <audio
                  controls
                  preload="none"
                  className="w-full"
                  src={practice.audio}
                >
                  Dein Browser kann diese Audiodatei nicht abspielen.
                </audio>
              </div>
            ) : practice.video ? (
              <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 shadow-card">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${practice.video}`}
                  title={`Geführte Praxis: ${practice.title}`}
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
                  Die geführte Audio-/Video-Version folgt in Kürze. Bis dahin
                  leitet dich die Anleitung unten Schritt für Schritt.
                </p>
              </div>
            )}
          </div>

          {/* Anleitung */}
          <div className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-medium text-ink">
              So geht&apos;s
            </h2>
            <ol className="flex flex-col gap-4">
              {practice.steps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-card"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/12 text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span className="text-[1.02rem] leading-relaxed text-ink-soft/85">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tipp */}
          {practice.tip && (
            <div className="flex flex-col gap-2 rounded-2xl border border-accent/25 bg-white p-7 shadow-card">
              <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent">
                Tipp
              </h2>
              <p className="text-[1.02rem] leading-relaxed text-ink-soft/85">
                {practice.tip}
              </p>
            </div>
          )}

          {/* Querverweis zur Stufe */}
          {stage && (
            <Link
              href={`/mitglieder/stufe/${practice.relatedStage}`}
              className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                Passt zu · Stufe {stage.number}
              </span>
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  {stage.title} – {stage.subtitle}
                </span>
                <ArrowRight className="shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </span>
            </Link>
          )}

          {/* Zurück */}
          <div className="border-t border-ink/10 pt-8">
            <Link
              href="/mitglieder"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowRight className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
              Zur Übersicht
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
