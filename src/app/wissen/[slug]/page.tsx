import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { MarkdownDoc } from "@/components/wissen/MarkdownDoc";
import { chapterSlugs, getDoc } from "@/lib/wissensdatenbank";

// Alle Kapitel plus die Glossar-Sonderseite werden zur Build-Zeit erzeugt.
export function generateStaticParams() {
  return [...chapterSlugs(), "glossar"].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return { title: "Nicht gefunden" };
  const description = (doc.lead || doc.title).slice(0, 300);
  return {
    title: `${doc.title} – Wissensdatenbank`,
    description,
    openGraph: { title: doc.title, description, type: "article" },
  };
}

export default async function WissenDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  // Vor/Zurück nur unter den nummerierten Kapiteln (nicht für das Glossar).
  const slugs = chapterSlugs();
  const idx = slugs.indexOf(slug);
  const prev = idx > 0 ? getDoc(slugs[idx - 1]) : null;
  const next = idx >= 0 && idx < slugs.length - 1 ? getDoc(slugs[idx + 1]) : null;

  return (
    <>
      <PageHero
        eyebrow={
          doc.number ? `Kapitel ${doc.number} · Wissensdatenbank` : "Wissensdatenbank"
        }
        title={doc.title}
        intro={doc.lead || undefined}
      />

      <article className="py-14 sm:py-18">
        <Container size="narrow">
          <Link
            href="/wissen"
            className="-mx-2 mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Alle Kapitel
          </Link>

          <MarkdownDoc blocks={doc.blocks} />

          {/* Vor/Zurück zwischen Kapiteln */}
          {(prev || next) && (
            <nav
              aria-label="Weitere Kapitel"
              className="mt-14 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`/wissen/${prev.slug}`}
                  className="group flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-accent/30"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-mid">
                    <ArrowRight className="rotate-180" />
                    Kapitel {prev.number}
                  </span>
                  <span className="font-display text-base font-medium text-ink transition-colors group-hover:text-accent">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/wissen/${next.slug}`}
                  className="group flex flex-col items-end gap-1 rounded-2xl border border-ink/10 bg-white p-5 text-right transition-colors hover:border-accent/30"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-mid">
                    Kapitel {next.number}
                    <ArrowRight />
                  </span>
                  <span className="font-display text-base font-medium text-ink transition-colors group-hover:text-accent">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}

          {/* Mitglieder-CTA */}
          <aside
            aria-labelledby="wissen-cta"
            className="mt-12 flex flex-col items-start gap-5 rounded-2xl border border-accent/25 bg-white p-8 shadow-card"
          >
            <h2 id="wissen-cta" className="font-display text-xl italic text-ink">
              Vom Wissen zur Praxis
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-ink-mid">
              Theorie ist der Anfang. Im Mitgliederbereich wird daraus ein Weg –
              die 7 Stufen, Praxisübungen und Vertiefungen, die dir helfen, das
              Gelesene wirklich zu leben.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/mitgliedschaft" variant="accent" size="lg">
                Mitglied werden
                <ArrowRight />
              </Button>
              <Button href="/bewusstseinstest" variant="secondary" size="lg">
                Bewusstseinstest starten
              </Button>
            </div>
          </aside>
        </Container>
      </article>
    </>
  );
}
