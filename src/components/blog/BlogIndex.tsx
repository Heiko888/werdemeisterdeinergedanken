"use client";
import { HERO_GLOW } from "@/lib/gradients";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { BlogCover } from "@/components/blog/BlogCover";
import { accentFor, type AccentKey } from "@/lib/blog-accent";
import brainLogo from "../../../public/logo-brain.png";

/** Schlanke Artikel-Form (ohne `content`) – reicht für die Übersicht. */
export type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateLabel: string;
  readingMinutes: number;
  /** Optionaler Farb-Override fürs Cover; sonst aus der Kategorie. */
  accent?: AccentKey;
  /** Optionaler Cover-Seed; sonst = slug. */
  coverSeed?: string;
  /** Optionales redaktionelles Titelbild; ersetzt das generative Cover. */
  image?: { src: string; alt: string };
};

const ALL = "Alle";

export function BlogIndex({ posts }: { posts: BlogCard[] }) {
  const [active, setActive] = useState<string>(ALL);

  // Kategorien nach Häufigkeit (größte zuerst), plus „Alle“ vorn.
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    const cats = [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([label, count]) => ({ label, count }));
    return [{ label: ALL, count: posts.length }, ...cats];
  }, [posts]);

  const featured = posts[0];
  const showFeatured = active === ALL;

  const grid = useMemo(() => {
    if (active === ALL) return posts.slice(1); // Featured nicht doppeln
    return posts.filter((p) => p.category === active);
  }, [posts, active]);

  return (
    <>
      {/* Neuester Beitrag – herausgehoben */}
      {showFeatured && featured && (
        <section className="bg-paper-aura grain-soft relative pt-4 pb-2 sm:pt-6">
          <Container>
            <Reveal>
              <FeaturedCard post={featured} />
            </Reveal>
          </Container>
        </section>
      )}

      {/* Filter nach Themen */}
      <section className="bg-surface-aura grain-soft relative pt-10 pb-4 sm:pt-14">
        <Container>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Nach Thema filtern
            </span>
            <div className="-mx-1 flex flex-wrap gap-2">
              {filters.map((f) => {
                const on = f.label === active;
                return (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => setActive(f.label)}
                    aria-pressed={on}
                    className={[
                      "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
                      on
                        ? "bg-navy-900 text-cream shadow-card"
                        : "border border-ink/10 bg-white/70 text-ink-mid hover:border-accent/40 hover:text-ink",
                    ].join(" ")}
                  >
                    {f.label}
                    <span aria-hidden className={on ? "text-cream/35" : "text-ink-muted/50"}>
                      ·
                    </span>
                    <span
                      className={`tabular-nums ${on ? "text-cream/60" : "text-ink-muted"}`}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Artikel-Raster */}
      <section className="bg-surface-aura grain-soft relative pb-16 sm:pb-20">
        <Container>
          <div aria-live="polite" className="sr-only">
            {active === ALL
              ? `Alle ${posts.length} Artikel`
              : `${grid.length} Artikel in „${active}“`}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 70}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function Meta({ post, tone }: { post: BlogCard; tone: "light" | "dark" }) {
  const cls = tone === "dark" ? "text-cream/55" : "text-ink-muted";
  return (
    <div className={`flex items-center gap-2 text-xs ${cls}`}>
      <time dateTime={post.date}>{post.dateLabel}</time>
      <span aria-hidden>·</span>
      <span>{post.readingMinutes} Min. Lesezeit</span>
    </div>
  );
}

function FeaturedCard({ post }: { post: BlogCard }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="grain group relative block overflow-hidden rounded-3xl bg-navy-900 text-cream shadow-xl ring-1 ring-white/5"
    >
      <div className="pointer-events-none absolute inset-0 bg-stars opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            HERO_GLOW,
        }}
      />

      <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.5fr_0.9fr] lg:p-14">
        <div className="flex flex-col items-start gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
            Neuester Beitrag
          </span>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/55">
            {post.category}
          </span>
          <h2 className="max-w-xl text-[1.7rem] font-medium leading-[1.12] text-cream transition-colors group-hover:text-gold-300 sm:text-3xl md:text-[2.4rem]">
            {post.title}
          </h2>
          <p className="max-w-lg text-[1.02rem] leading-relaxed text-cream/75">
            {post.excerpt}
          </p>
          <Meta post={post} tone="dark" />
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
            Weiterlesen
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>

        {/* Rechtes Panel: echtes Titelbild, sonst das leuchtende Marken-Gehirn */}
        {post.image ? (
          <div className="relative hidden lg:block">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-gold-500) 28%, transparent), transparent 68%)",
              }}
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                sizes="(min-width: 1024px) 420px, 0px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        ) : (
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-fit">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full opacity-70 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-gold-500) 34%, transparent), transparent 66%)",
                }}
              />
              <Image
                src={brainLogo}
                alt=""
                aria-hidden
                className="relative z-10 mx-auto w-[min(320px,80%)] drop-shadow-[0_12px_60px_rgba(217,169,58,0.4)]"
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogCard }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
    >
      {post.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <BlogCover
          seed={post.coverSeed ?? post.slug}
          accent={accentFor(post)}
          className="aspect-[16/10] w-full"
        />
      )}

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
          {post.category}
        </span>
        <h2 className="mt-3 font-display text-xl font-medium leading-snug text-ink transition-colors group-hover:text-accent">
          {post.title}
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-mid">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Meta post={post} tone="light" />
          <ArrowRight className="text-accent transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
