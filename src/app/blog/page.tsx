import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BlogIndex, type BlogCard } from "@/components/blog/BlogIndex";
import { publishedPosts } from "@/lib/blog";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/blog", {
  title: "Blog",
  description:
    "Impulse zu Bewusstsein, mentaler Entprogrammierung und einem klaren Kopf – kurze, ehrliche Artikel von Heiko Schwaninger.",
});

// Stündlich neu erzeugen, damit vorausdatierte Artikel an ihrem Erscheinungstag
// von selbst auftauchen und nicht auf den nächsten Deploy warten müssen.
export const revalidate = 3600;

export default function BlogPage() {
  // Schlanke Karten-Daten an die Client-Komponente übergeben (ohne `content`).
  const cards: BlogCard[] = publishedPosts().map(
    ({
      slug,
      title,
      excerpt,
      category,
      date,
      dateLabel,
      readingMinutes,
      accent,
      coverSeed,
      image,
    }) => ({
      slug,
      title,
      excerpt,
      category,
      date,
      dateLabel,
      readingMinutes,
      accent,
      coverSeed,
      image,
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
        image="/hero-blog-gipfel.webp"
        imagePosition="center"
        mobileBand="1672 / 941"
      />

      <BlogIndex posts={cards} />
    </>
  );
}
