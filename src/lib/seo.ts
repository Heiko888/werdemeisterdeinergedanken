import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Ergänzt die Metadaten einer öffentlichen Seite um eine kanonische URL und
 * ein seiten-eigenes Open-Graph-/Twitter-Objekt (og:url, og:title,
 * og:description).
 *
 * Hintergrund: Next merged verschachtelte Metadata-Felder wie `openGraph`
 * NICHT feldweise, sondern ersetzt sie je Segment. Da das Root-Layout ein
 * vollständiges `openGraph` setzt, würde jede öffentliche Seite ohne eigenes
 * `openGraph` die og:url/og:title/og:description der Startseite erben – die
 * Linkvorschau zeigte dann überall den Startseiten-Text und die Startseiten-URL.
 * Dieser Helper setzt beides pro Seite konsistent und lässt bereits gesetzte
 * Felder (z. B. `robots`) unangetastet.
 */
export function withCanonical(path: string, meta: Metadata): Metadata {
  const title = typeof meta.title === "string" ? meta.title : undefined;
  const description =
    typeof meta.description === "string" ? meta.description : undefined;

  return {
    ...meta,
    alternates: { canonical: path, ...meta.alternates },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      url: `${site.url}${path}`,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...meta.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...meta.twitter,
    },
  };
}
