import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { HERO_GLOW } from "@/lib/gradients";
import { site } from "@/lib/site";
import {
  getPost,
  isPublished,
  posts,
  publishedPosts,
  type CtaVariant,
  type Post,
} from "@/lib/blog";

/**
 * Rendert Inline-Links im Markdown-Stil `[Text](/pfad)` innerhalb eines
 * Absatzes. So können Artikel echte Querverweise (z. B. auf Vertiefungen im
 * Mitgliederbereich) tragen, ohne ein volles Markdown-Setup.
 */
const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
function renderInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  INLINE_LINK.lastIndex = 0;
  while ((m = INLINE_LINK.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      <Link
        key={m.index}
        href={href}
        className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
      >
        {label}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length <= 1 ? (parts[0] ?? text) : parts;
}

/** Kontextabhängiger Abschluss-CTA – passend zum Thema statt immer gleich. */
type Cta = { title: string; body: string; href: string; label: string };

const CTA_BY_VARIANT: Record<CtaVariant, Cta> = {
  erstgespraech: {
    title: "Bereit, es selbst zu erleben?",
    body: "Wenn dich dieser Impuls angesprochen hat, lass uns unverbindlich sprechen – und herausfinden, wo du gerade stehst.",
    href: "/kontakt",
    label: "Kostenloses Erstgespräch",
  },
  ebook: {
    title: "Der kompakte Einstieg – kostenlos",
    body: "Die wichtigsten Mechanismen und die 7 Stufen auf einen Blick. Hol dir das kostenlose E-Book „Die 7 Stufen kompakt“ – sofort per E-Mail.",
    href: "/#ebook",
    label: "E-Book gratis sichern",
  },
  stufen: {
    title: "Der ganze Weg – Schritt für Schritt",
    body: "Von der ersten Beobachtung bis zur Integration: Sieh dir die 7 Stufen der Bewusstseinsentwicklung im Überblick an.",
    href: "/die-7-stufen",
    label: "Die 7 Stufen entdecken",
  },
  test: {
    title: "Wo stehst du gerade?",
    body: "Ein kurzer Bewusstseinstest zeigt dir, auf welcher Stufe du beginnst – in wenigen Minuten.",
    href: "/bewusstseinstest",
    label: "Bewusstseinstest starten",
  },
};

const CTA_BY_CATEGORY: Record<string, CtaVariant> = {
  "Mentale Selbstverteidigung": "ebook",
  Wissenschaft: "stufen",
  Bewusstsein: "test",
};

function ctaFor(post: Post): Cta {
  const variant = post.cta ?? CTA_BY_CATEGORY[post.category] ?? "erstgespraech";
  return CTA_BY_VARIANT[variant];
}

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
  const url = `${site.url}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    // Kanonische URL, damit Suchmaschinen den Artikel eindeutig zuordnen.
    alternates: { canonical: `/blog/${slug}` },
    // Wichtig: Next merged verschachtelte Felder NICHT feldweise, sondern
    // ersetzt das gesamte openGraph-/twitter-Objekt je Segment. Deshalb hier
    // url, siteName, locale und twitter vollständig setzen – sonst zeigt die
    // Linkvorschau auf die Startseite bzw. verliert Titel/Beschreibung.
    // Das Vorschaubild liefert die dateibasierte opengraph-image.tsx (höhere
    // Priorität, wird automatisch als og:image/twitter:image ergänzt).
    openGraph: {
      type: "article",
      url,
      siteName: site.name,
      locale: "de_DE",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
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

  // „Weitere Impulse": erst thematisch verwandte (gleiche Kategorie), dann
  // mit den neuesten übrigen auffüllen – nie themenfremd wie zuvor.
  const others = publishedPosts().filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const more = [
    ...sameCategory,
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 2);

  const cta = ctaFor(post);

  return (
    <>
      <ReadingProgress />
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
            className="-mx-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream-dim/70 transition-colors hover:text-cream"
          >
            <ArrowRight className="rotate-180" />
            Alle Artikel
          </Link>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
            {post.category}
          </span>
          <h1 className="text-[2rem] font-medium leading-[1.1] text-cream sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-cream-dim/60">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} Min. Lesezeit</span>
            <span aria-hidden>·</span>
            <span>Heiko Schwaninger</span>
          </div>
        </Container>
      </header>

      {/* Titelbild – überlappt den dunklen Header für einen redaktionellen
          Übergang. Nur wenn ein redaktionelles Bild hinterlegt ist. */}
      {post.image && (
        <Container size="narrow" className="relative z-10 -mt-8 sm:-mt-12">
          <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </figure>
        </Container>
      )}

      {/* Artikel-Inhalt */}
      <article className={post.image ? "pt-10 pb-16 sm:pt-14 sm:pb-20" : "py-16 sm:py-20"}>
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
                    {renderInline(block.text)}
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
                        {renderInline(it)}
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
                  {renderInline(block.text)}
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
              {cta.title}
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-ink-mid">
              {cta.body}
            </p>
            <Button href={cta.href} variant="accent" size="lg">
              {cta.label}
              <ArrowRight />
            </Button>
          </aside>
        </Container>
      </article>

      {/* Weitere Artikel */}
      {more.length > 0 && (
        <section className="bg-surface-aura grain-soft relative border-t border-ink/10 py-16 sm:py-20">
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
