import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { HERO_GLOW } from "@/lib/gradients";
import { getPost, isPublished, posts, publishedPosts } from "@/lib/blog";

// Auch vorausdatierte Artikel werden gebaut: die Seite bleibt über ihre URL
// erreichbar (praktisch zum Gegenlesen), sie ist nur nirgends verlinkt und
// wird bis zum Erscheinungstag auf noindex gesetzt.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Stündlich nachziehen, damit ein Artikel an seinem Erscheinungstag von selbst
// indexierbar wird.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artikel nicht gefunden" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
    // Noch nicht erschienen: erreichbar, aber nicht für Suchmaschinen.
    ...(isPublished(post) ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = publishedPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      {/* Artikel-Kopf: dunkler Marken-Header als Akzent */}
      <header className="grain relative overflow-hidden bg-navy-900 pt-20 pb-16 text-cream sm:pt-24 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: HERO_GLOW }}
        />
        <Container size="narrow" className="flex flex-col items-start gap-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-cream-dim/70 transition-colors hover:text-cream"
          >
            <ArrowRight className="rotate-180" />
            Alle Artikel
          </Link>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-leaf-400">
            {post.category}
          </span>
          <h1 className="text-[2rem] font-medium leading-[1.1] text-cream sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-cream-dim/60">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} Min. Lesezeit</span>
            <span aria-hidden>·</span>
            <span>Heiko Schwaninger</span>
          </div>
        </Container>
      </header>

      {/* Artikel-Inhalt */}
      <article className="py-16 sm:py-20">
        <Container size="narrow">
          <div className="flex flex-col gap-7 sm:gap-8">
            <p className="prose-lead">{post.excerpt}</p>
            <span aria-hidden className="rule block h-px w-16" />
            {post.content.map((block, i) => {
              if (block.type === "h2")
                return (
                  <div key={i} className="mt-4 flex flex-col gap-3">
                    <span aria-hidden className="rule block h-px w-12" />
                    <h2 className="font-display text-2xl font-medium text-ink">
                      {block.text}
                    </h2>
                  </div>
                );
              if (block.type === "quote")
                return (
                  <blockquote
                    key={i}
                    className="relative my-4 pl-9 font-display text-[1.5rem] italic leading-snug text-ink sm:text-[1.7rem]"
                  >
                    <span
                      aria-hidden
                      className="absolute -top-2 left-0 select-none font-display text-6xl not-italic leading-none text-accent/25"
                    >
                      „
                    </span>
                    {block.text}
                  </blockquote>
                );
              if (block.type === "ul")
                return (
                  <ul key={i} className="flex flex-col gap-2.5 pl-1">
                    {block.items.map((it, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-ink-soft/85"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              return (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-[1.05rem] leading-[1.75] text-ink-soft/85 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:leading-[0.7] first-letter:text-accent"
                      : "text-[1.05rem] leading-[1.75] text-ink-soft/85"
                  }
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Autor-Signatur – Gesicht schafft Vertrauen und Handschrift */}
          <div className="mt-14 flex items-center gap-4 border-t border-ink/10 pt-8">
            <Image
              src="/heiko-portrait.webp"
              alt="Heiko Schwaninger"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-1 ring-ink/10"
            />
            <div className="flex flex-col">
              <span className="font-display text-base font-medium text-ink">
                Heiko Schwaninger
              </span>
              <span className="text-sm text-ink-mid">
                Begleiter für Bewusstseinsentwicklung
              </span>
            </div>
          </div>

          {/* CTA – eigenes Landmark, damit die Überschriften-Gliederung des
              Artikels sauber bleibt */}
          <aside
            aria-labelledby="artikel-cta"
            className="mt-10 flex flex-col items-start gap-5 rounded-2xl border border-accent/25 bg-white p-8 shadow-card"
          >
            <h2
              id="artikel-cta"
              className="font-display text-xl italic text-ink"
            >
              Bereit, es selbst zu erleben?
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-ink-mid">
              Wenn dich dieser Impuls angesprochen hat, lass uns unverbindlich
              sprechen – und herausfinden, wo du gerade stehst.
            </p>
            <Button href="/kontakt" variant="accent" size="lg">
              Kostenloses Erstgespräch
              <ArrowRight />
            </Button>
          </aside>
        </Container>
      </article>

      {/* Weitere Artikel */}
      {more.length > 0 && (
        <section className="border-t border-ink/10 bg-white py-16 sm:py-20">
          <Container>
            <h2 className="mb-8 font-display text-2xl font-medium text-ink">
              Weitere Impulse
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {more.map((p) => (
                <Reveal key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col gap-3 border-t border-ink/10 pt-6"
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      {p.category}
                    </span>
                    <h3 className="font-display text-xl font-medium text-ink transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-mid">
                      {p.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
