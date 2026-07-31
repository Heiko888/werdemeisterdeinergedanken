"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
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
        <section className="pt-4 pb-2 sm:pt-6">
          <Container>
            <Reveal>
              <FeaturedCard post={featured} />
            </Reveal>
          </Container>
        </section>
      )}

      {/* Filter nach Themen */}
      <section className="pt-8 pb-4 sm:pt-12">
        <Container>
          <div className="flex flex-col gap-3">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
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
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      on
                        ? "bg-navy-900 text-cream shadow-card"
                        : "border border-ink/15 bg-white text-ink-mid hover:border-accent/40 hover:text-ink",
                    ].join(" ")}
                  >
                    {f.label}
                    <span
                      className={
                        on
                          ? "text-cream/55"
                          : "text-ink-muted"
                      }
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
      <section className="pb-8">
        <Container>
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
            "radial-gradient(60% 60% at 88% 12%, color-mix(in oklab, var(--color-teal-500) 24%, transparent), transparent 60%), radial-gradient(55% 55% at 4% 100%, color-mix(in oklab, var(--color-brand-500) 22%, transparent), transparent 60%)",
        }}
      />

      <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.5fr_0.9fr] lg:p-14">
        <div className="flex flex-col items-start gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-leaf-400">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf-400" />
            Neuester Beitrag
          </span>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/55">
            {post.category}
          </span>
          <h2 className="max-w-xl text-[1.7rem] font-medium leading-[1.12] text-cream transition-colors group-hover:text-leaf-400 sm:text-3xl md:text-[2.4rem]">
            {post.title}
          </h2>
          <p className="max-w-lg text-[1.02rem] leading-relaxed text-cream/75">
            {post.excerpt}
          </p>
          <Meta post={post} tone="dark" />
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-leaf-400">
            Weiterlesen
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>

        {/* Marken-Motiv statt leerer Fläche */}
        <div className="relative hidden lg:block">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--color-teal-500) 34%, transparent), transparent 66%)",
            }}
          />
          <Image
            src={brainLogo}
            alt=""
            aria-hidden
            className="mx-auto w-[min(260px,80%)] drop-shadow-[0_12px_50px_rgba(52,196,196,0.35)]"
          />
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogCard }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
    >
      {/* Marken-Haarlinie oben, erscheint beim Hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(100deg, var(--color-leaf-500), var(--color-teal-500))",
        }}
      />

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
    </Link>
  );
}
