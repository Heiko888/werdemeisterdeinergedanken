import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedPosts } from "@/lib/blog";

// Stündlich nachziehen, damit vorausdatierte Artikel an ihrem Erscheinungstag
// ohne Deploy in die Sitemap kommen.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  // Nur öffentlich indexierbare Seiten. /impressum und /datenschutz stehen
  // bewusst NICHT hier: sie tragen `noindex` und gehören daher nicht in die
  // Sitemap (eine Sitemap listet Seiten, die indexiert werden sollen).
  const routes = [
    "",
    "/die-7-stufen",
    "/mitgliedschaft",
    "/ueber-mich",
    "/bewusstseinstest",
    "/blog",
    "/kontakt",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = publishedPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
