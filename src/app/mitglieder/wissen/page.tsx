import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Brain } from "@/components/ui/Icon";
import { deepDivesByCategory } from "@/lib/deep-dives";
import { stages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Vertiefungen – die Mechanismen hinter den 7 Stufen",
  description:
    "Die psychologischen Mechanismen hinter den 7 Stufen – zum Nachschlagen und Vertiefen. Jedes Thema mit Übungen und Reflexionsfragen.",
  // Geschützter Mitgliederbereich – nicht indexieren.
  robots: { index: false, follow: false },
};

/** Kurzlabel „Stufe X" zu einer relatedStage-Nummer (1–7). */
function stageLabel(nr: number): string | null {
  const stage = stages[nr - 1];
  return stage ? `Stufe ${stage.number}` : null;
}

export default function VertiefungenPage() {
  const groups = deepDivesByCategory();

  return (
    <>
      <PageHero
        eyebrow="Wissens-Bibliothek"
        title={
          <>
            Die <em className="accent">Vertiefungen</em>
          </>
        }
        intro="Die psychologischen Mechanismen hinter den 7 Stufen – zum Nachschlagen und Vertiefen. Jedes Thema mit klarer Einordnung, Übungen und Reflexionsfragen, die direkt in dein Journal fließen."
        image="/hero-vertiefungen.webp"
      />

      {/* Zurück zu meinem Bereich – einheitliche Orientierung wie in Praxis */}
      <section className="pt-8">
        <Container>
          <Link
            href="/mitglieder"
            className="-mx-2 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Zu meinem Bereich
          </Link>
        </Container>
      </section>

      {/* Querverweis auf die reine Nachschlage-Bibliothek (klare Rollen-Trennung:
          Vertiefungen = anwenden & üben zur Stufe · Wissensdatenbank = nachschlagen) */}
      <section className="pt-2">
        <Container>
          <Link
            href="/mitglieder/wissensdatenbank"
            className="group flex flex-col items-start gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/30 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/15 to-gold-500/15 text-lg text-accent">
                <Brain />
              </span>
              <div>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Zum Nachschlagen · 27 Kapitel
                </span>
                <p className="font-display text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  Wissensdatenbank: Gehirn, Bewusstsein & Gedanken
                </p>
              </div>
            </div>
            <ArrowRight className="shrink-0 text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </Container>
      </section>

      {/* Vertiefungen nach Kategorie */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-12">
            {groups.map((group) => (
              <div key={group.category} className="flex flex-col gap-5">
                <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                  {group.category}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((dive) => {
                    const label = stageLabel(dive.relatedStage);
                    return (
                      <Reveal key={dive.slug}>
                        <Link
                          href={`/mitglieder/wissen/${dive.slug}`}
                          className="group flex h-full flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                        >
                          {label && (
                            <span className="w-fit rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-gold-700">
                              {label}
                            </span>
                          )}
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                              {dive.title}
                            </h3>
                            <ArrowRight className="mt-1 shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                          </div>
                          <p className="text-sm leading-relaxed text-ink-mid">
                            {dive.summary}
                          </p>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Thema fehlt? */}
          <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
            <h2 className="font-display text-xl italic text-ink">
              Ein Thema fehlt dir?
            </h2>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
              Die Bibliothek wächst Schritt für Schritt. Wenn dich ein bestimmter
              psychologischer Mechanismus beschäftigt, schreib mir – oft wird
              daraus die nächste Vertiefung.
            </p>
            <Button href="/kontakt" variant="accent">
              Thema vorschlagen
              <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
