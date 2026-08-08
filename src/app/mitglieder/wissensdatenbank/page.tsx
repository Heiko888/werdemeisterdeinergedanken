import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { chapters, PARTS, type ChapterMeta } from "@/lib/wissensdatenbank";

export const metadata: Metadata = {
  title: "Wissensdatenbank – Gehirn, Bewusstsein & Gedanken",
  description:
    "Eine wissenschaftlich fundierte Wissensdatenbank zu Gehirn, Bewusstsein und Gedanken: 27 Kapitel von Neuroanatomie über Bewusstseinstheorien bis zu Gewohnheiten – ehrlich, mit Evidenz-Einordnung.",
  // Geschützter Mitgliederbereich – nicht indexieren.
  robots: { index: false, follow: false },
};

export default function WissenPage() {
  const all = chapters();
  const bySlug = new Map<string, ChapterMeta>(all.map((c) => [c.slug, c]));

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
      />

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
                          <span className="font-display text-sm italic text-accent">
                            {c.number}
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
