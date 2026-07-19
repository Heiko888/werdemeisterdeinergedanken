import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { postsSorted } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Impulse zu Bewusstsein, mentaler Entprogrammierung und einem klaren Kopf – kurze, ehrliche Artikel von Heiko Schwaninger.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Impulse"
        title={
          <>
            Gedanken über <em className="accent">Gedanken</em>
          </>
        }
        intro="Kurze, ehrliche Impulse zu Bewusstsein, alten Mustern und einem klareren Kopf. Kein Ratgeber-Lärm – nur das, was wirklich weiterbringt."
      />

      <section className="pb-8">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {postsSorted.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                >
                  {/* Karten-Kopf (ohne Foto: Marken-Verlauf + Kategorie) */}
                  <div className="relative flex h-28 items-end overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950 p-5">
                    <div className="pointer-events-none absolute inset-0 bg-stars opacity-40" />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full opacity-60 blur-2xl"
                      style={{
                        background:
                          "radial-gradient(circle, color-mix(in oklab, var(--color-leaf-500) 45%, transparent), transparent 70%)",
                      }}
                    />
                    <span className="relative rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-leaf-400">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-2 text-xs text-ink-soft/55">
                      <time dateTime={post.date}>{post.dateLabel}</time>
                      <span aria-hidden>·</span>
                      <span>{post.readingMinutes} Min. Lesezeit</span>
                    </div>
                    <h2 className="font-display text-xl font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-ink-soft/75">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent">
                      Weiterlesen
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
