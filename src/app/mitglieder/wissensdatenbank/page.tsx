import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Spark, Check } from "@/components/ui/Icon";
import { chapters, PARTS, type ChapterMeta } from "@/lib/wissensdatenbank";
import { getGeleseneKapitel } from "@/app/mitglieder/wissenskapitel-actions";

export const metadata: Metadata = {
  title: "Wissensdatenbank – Gehirn, Bewusstsein & Gedanken",
  description:
    "Eine wissenschaftlich fundierte Wissensdatenbank zu Gehirn, Bewusstsein und Gedanken: 27 Kapitel von Neuroanatomie über Bewusstseinstheorien bis zu Gewohnheiten – ehrlich, mit Evidenz-Einordnung.",
  // Geschützter Mitgliederbereich – nicht indexieren.
  robots: { index: false, follow: false },
};

// Personalisierter Lese-Fortschritt → pro Aufruf serverseitig rendern.
export const dynamic = "force-dynamic";

export default async function WissenPage() {
  const all = chapters();
  const bySlug = new Map<string, ChapterMeta>(all.map((c) => [c.slug, c]));

  // Lese-Status (defensiv: fehlt Migration 0014, bleibt die Menge leer).
  const chapterSlugSet = new Set(all.map((c) => c.slug));
  const gelesen = new Set(
    (await getGeleseneKapitel()).filter((s) => chapterSlugSet.has(s)),
  );
  const gelesenCount = gelesen.size;
  const gesamt = all.length;
  const prozent = gesamt > 0 ? Math.round((gelesenCount / gesamt) * 100) : 0;

  return (
    <>
      <PageHero
        eyebrow="Wissensdatenbank"
        title={
          <>
            Gehirn, Bewusstsein & <em className="accent">Gedanken</em>
          </>
        }
        intro="27 Kapitel, wissenschaftlich fundiert und ehrlich eingeordnet: von der Anatomie des Gehirns über die großen Theorien des Bewusstseins bis zu Gewohnheiten, Emotionen und mentaler Selbstverteidigung. Nur reale Studien – Umstrittenes ist als solches markiert."
        image="/hero-wissensdatenbank.webp"
        imagePosition="center 18%"
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

      {/* Rollen-Trennung sichtbar machen: die Wissensdatenbank ist zum
          Nachschlagen; die Vertiefungen sind zum Anwenden & Üben an der Stufe.
          Gegenstück zum Querverweis auf der Vertiefungen-Seite. */}
      <section className="pt-2">
        <Container>
          <Link
            href="/mitglieder/wissen"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/30"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500/15 to-teal-500/15 text-lg text-accent">
                <Spark />
              </span>
              <div>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Zum Anwenden &amp; Üben · an deiner Stufe
                </span>
                <p className="font-display text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  Vertiefungen: die Mechanismen hinter den 7 Stufen – mit Übungen
                  und Reflexion
                </p>
              </div>
            </div>
            <ArrowRight className="shrink-0 text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </Container>
      </section>

      {/* Evidenz-Legende */}
      <section className="border-b border-ink/10 bg-white py-8">
        <Container>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-mid">
            <span className="font-semibold text-ink">Evidenz-Legende:</span>
            <span>✅ gut repliziert / Konsens</span>
            <span>⚠️ umstritten / vorläufig</span>
            <span>🔬 aktuelle Forschung</span>
            <Link
              href="/mitglieder/wissensdatenbank/glossar"
              className="inline-flex items-center gap-1.5 font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent sm:ml-auto"
            >
              Zum Glossar
              <ArrowRight />
            </Link>
          </div>
        </Container>
      </section>

      {/* Lese-Fortschritt – erscheint, sobald das erste Kapitel gelesen ist */}
      {gelesenCount > 0 && (
        <section className="pt-6">
          <Container>
            <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="font-medium text-ink">Dein Lesefortschritt</span>
                <span className="tabular-nums text-ink-muted">
                  {gelesenCount} / {gesamt} gelesen · {prozent}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-mist-100">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-leaf-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${prozent}%` }}
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Kapitel nach Teilen gruppiert */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-16">
            {PARTS.map((part, pi) => (
              <div key={part.title} className="flex flex-col gap-7">
                <div className="flex flex-col gap-2">
                  <span className="font-display text-sm italic text-ink-mid">
                    Teil {["I", "II", "III", "IV", "V"][pi]}
                  </span>
                  <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                    {part.title}
                  </h2>
                  <p className="text-ink-mid">{part.hint}</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {part.slugs.map((slug) => {
                    const c = bySlug.get(slug);
                    if (!c) return null;
                    return (
                      <Reveal key={slug}>
                        <Link
                          href={`/mitglieder/wissensdatenbank/${slug}`}
                          className="group flex h-full flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/30"
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-display text-sm italic text-accent">
                              {c.number}
                            </span>
                            {gelesen.has(slug) && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-leaf-500/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-accent">
                                <Check />
                                Gelesen
                              </span>
                            )}
                          </span>
                          <h3 className="font-display text-lg font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                            {c.title}
                          </h3>
                          {c.lead && (
                            <p className="text-sm leading-relaxed text-ink-mid line-clamp-4">
                              {c.lead}
                            </p>
                          )}
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-accent">
                            Lesen
                            <ArrowRight />
                          </span>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Abschluss-Hinweis zur wissenschaftlichen Redlichkeit */}
      <section className="border-t border-ink/10 bg-white py-14">
        <Container size="narrow">
          <div className="flex flex-col gap-3">
            <span aria-hidden className="rule block h-px w-12" />
            <h2 className="font-display text-xl italic text-ink">
              Ein Wort zur Vorsicht
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-ink-mid">
              Das Gehirn ist die komplexeste bekannte Struktur des Universums, und
              die Bewusstseinsforschung ist ein junges Feld. Vieles, was populär
              als gesichert gilt, ist stark vereinfacht. Diese Datenbank hält den
              schmalen Grat zwischen verständlich und korrekt – im Zweifel lieber
              eine ehrliche Unsicherheit als eine bequeme Gewissheit. Sie ersetzt
              keine medizinische, psychologische oder therapeutische Beratung.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
