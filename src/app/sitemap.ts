import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedPosts } from "@/lib/blog";

// Stündlich nachziehen, damit vorausdatierte Artikel an ihrem Erscheinungstag
// ohne Deploy in die Sitemap kommen.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/die-7-stufen",
    "/ueber-mich",
    "/bewusstseinstest",
    "/blog",
    "/kontakt",
    "/impressum",
    "/datenschutz",
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
