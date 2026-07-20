import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { stages } from "@/lib/content";

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
        <Container size="narrow" className="flex flex-col gap-10">
          <p className="text-lg leading-relaxed text-ink-soft/85">
            {stage.description}
          </p>

          <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-card">
            <h2 className="font-display text-xl font-medium text-ink">
              Was dich in dieser Stufe erwartet
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {[
                "Eine klare Einführung in das Thema dieser Stufe",
                "Praktische Übungen für den Alltag",
                "Reflexionsfragen, die in die Tiefe gehen",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-ink-soft/85"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-xs text-accent">
                    <Check />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Platzhalter für die eigentliche Lektion */}
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
              dieser Stelle. Bei Fragen bin ich jederzeit für dich da.
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
