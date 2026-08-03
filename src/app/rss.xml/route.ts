/**
 * RSS-Feed für den Blog unter /rss.xml.
 *
 * Quelle ist dieselbe Liste wie Blog und Sitemap (`src/lib/blog.ts`), damit ein
 * neuer Artikel automatisch im Feed landet, ohne dass hier etwas nachgezogen
 * werden muss. Der Feed enthält neben dem Anrisstext (`description`) auch den
 * kompletten Artikel als HTML in `content:encoded` — Feedreader zeigen den
 * Beitrag damit vollständig an.
 */

import type { Block } from "@/lib/blog";
import { postsSorted } from "@/lib/blog";
import { site } from "@/lib/site";

// Der Feed hängt an keiner Anfrage, darf also beim Build erzeugt werden.
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Text in ein CDATA-Feld packen, ohne dass ein „]]>“ es vorzeitig schließt. */
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

/** Die Blocklisten des Blogs in schlichtes HTML übersetzen. */
function blocksToHtml(content: Block[]): string {
  return content
    .map((block) => {
      switch (block.type) {
        case "h2":
          return `<h2>${escapeXml(block.text)}</h2>`;
        case "quote":
          return `<blockquote><p>${escapeXml(block.text)}</p></blockquote>`;
        case "ul":
          return `<ul>${block.items
            .map((item) => `<li>${escapeXml(item)}</li>`)
            .join("")}</ul>`;
        case "p":
        default:
          return `<p>${escapeXml(block.text)}</p>`;
      }
    })
    .join("\n");
}

/** ISO-Datum („2026-07-27“) in das von RSS verlangte RFC-822-Format. */
function toRfc822(isoDate: string): string {
  return new Date(`${isoDate}T08:00:00Z`).toUTCString();
}

export function GET(): Response {
  const items = postsSorted
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      return `    <item>
      <title>${cdata(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <category>${cdata(post.category)}</category>
      <description>${cdata(post.excerpt)}</description>
      <content:encoded>${cdata(blocksToHtml(post.content))}</content:encoded>
    </item>`;
    })
    .join("\n");

  // Kein Build-Zeitstempel, sondern das Datum des neuesten Artikels: so ändert
  // sich der Feed nur, wenn sich inhaltlich etwas geändert hat.
  const lastBuildDate = postsSorted[0]
    ? toRfc822(postsSorted[0].date)
    : toRfc822("2026-01-01");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${cdata(`${site.name} — Blog`)}</title>
    <link>${escapeXml(`${site.url}/blog`)}</link>
    <description>${cdata(site.description)}</description>
    <language>de-DE</language>
    <copyright>${cdata(site.author)}</copyright>
    <managingEditor>${escapeXml(`${site.email} (${site.author})`)}</managingEditor>
    <webMaster>${escapeXml(`${site.email} (${site.author})`)}</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${site.url}/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
