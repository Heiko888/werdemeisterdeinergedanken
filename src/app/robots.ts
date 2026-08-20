import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /impressum und /datenschutz werden NICHT gesperrt: sie steuern ihre
      // Nicht-Indexierung über das `noindex`-Meta-Tag – ein Crawl-Verbot würde
      // verhindern, dass Suchmaschinen dieses Tag überhaupt lesen. Nur die
      // wirklich privaten Bereiche werden vom Crawling ausgeschlossen.
      disallow: ["/mitglieder", "/login"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
