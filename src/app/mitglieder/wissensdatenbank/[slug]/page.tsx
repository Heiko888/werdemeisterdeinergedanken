import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { MarkdownDoc } from "@/components/wissen/MarkdownDoc";
import { chapterSlugs, getDoc } from "@/lib/wissensdatenbank";

// Optionale Titelbilder pro Kapitel – nur Kapitel mit einem Eintrag bekommen
// ein vollflächiges Hero-Bild, alle anderen den reinen Verlauf-Hero.
const CHAPTER_HERO_IMAGES: Record<string, string> = {
  "01-neuroanatomie-aufbau-des-gehirns": "/hero-anatomie.webp",
  "02-neuronen-synapsen-neurotransmitter": "/hero-neuronen.webp",
  "03-neuroplastizitaet": "/hero-neuroplastizitaet.webp",
  "04-theorien-des-bewusstseins": "/hero-bewusstsein.webp",
  "05-neuronale-korrelate-des-bewusstseins": "/hero-ncc.webp",
  "06-aufmerksamkeit-und-wahrnehmung": "/hero-wahrnehmung.webp",
  "27-das-unbewusste": "/hero-unbewusste.webp",
};

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
    // Geschützter Mitgliederbereich – nicht indexieren.
    robots: { index: false, follow: false },
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
        image={CHAPTER_HERO_IMAGES[slug]}
      />

      <article className="py-14 sm:py-18">
        <Container size="narrow">
          <Link
            href="/mitglieder/wissensdatenbank"
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
                  href={`/mitglieder/wissensdatenbank/${prev.slug}`}
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
                  href={`/mitglieder/wissensdatenbank/${next.slug}`}
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
              Theorie ist der Anfang. Bring das Gelesene auf deinen Weg – über die
              7 Stufen und die passenden Praxisübungen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/mitglieder/praxis" variant="accent" size="lg">
                Zur Praxis
                <ArrowRight />
              </Button>
              <Button href="/mitglieder" variant="secondary" size="lg">
                Zu meinem Bereich
              </Button>
            </div>
          </aside>
        </Container>
      </article>
    </>
  );
}
