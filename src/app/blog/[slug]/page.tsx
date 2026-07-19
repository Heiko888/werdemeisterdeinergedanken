import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { CosmicBackground } from "@/components/visuals/CosmicBackground";
import { getPost, posts, postsSorted } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

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

  const more = postsSorted.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Artikel-Kopf: dunkler Marken-Header als Akzent */}
      <header className="relative overflow-hidden bg-navy-950 pt-20 pb-16 text-cream sm:pt-24 sm:pb-20">
        <CosmicBackground variant="subtle" />
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
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-ink-soft/85">
              {post.excerpt}
            </p>
            {post.content.map((block, i) => {
              if (block.type === "h2")
                return (
                  <h2
                    key={i}
                    className="mt-6 font-display text-2xl font-medium text-ink"
                  >
                    {block.text}
                  </h2>
                );
              if (block.type === "quote")
                return (
                  <blockquote
                    key={i}
                    className="my-2 border-l-2 border-accent/60 pl-5 font-display text-xl italic leading-relaxed text-ink/90"
                  >
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
                  className="text-[1.05rem] leading-[1.75] text-ink-soft/85"
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-start gap-5 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
            <h2 className="font-display text-xl italic text-ink">
              Bereit, es selbst zu erleben?
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-ink-soft/75">
              Wenn dich dieser Impuls angesprochen hat, lass uns unverbindlich
              sprechen – und herausfinden, wo du gerade stehst.
            </p>
            <Button href="/kontakt" variant="accent" size="lg">
              Kostenloses Erstgespräch
              <ArrowRight />
            </Button>
          </div>
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
                    <p className="text-sm leading-relaxed text-ink-soft/75">
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
