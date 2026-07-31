import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BlogIndex, type BlogCard } from "@/components/blog/BlogIndex";
import { postsSorted } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Impulse zu Bewusstsein, mentaler Entprogrammierung und einem klaren Kopf – kurze, ehrliche Artikel von Heiko Schwaninger.",
};

export default function BlogPage() {
  // Schlanke Karten-Daten an die Client-Komponente übergeben (ohne `content`).
  const cards: BlogCard[] = postsSorted.map(
    ({ slug, title, excerpt, category, date, dateLabel, readingMinutes }) => ({
      slug,
      title,
      excerpt,
      category,
      date,
      dateLabel,
      readingMinutes,
    }),
  );

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

      <BlogIndex posts={cards} />
    </>
  );
}
