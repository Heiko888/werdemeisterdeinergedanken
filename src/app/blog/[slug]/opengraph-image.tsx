import { ImageResponse } from "next/og";
import { getPost, isCategoryDeactivated, posts } from "@/lib/blog";
import { site } from "@/lib/site";

// Metadaten für das Vorschaubild (Social Shares: WhatsApp, LinkedIn, X, …)
export const alt = `${site.name} — Blog`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Für jeden Artikel zur Build-Zeit ein eigenes Vorschaubild erzeugen.
export function generateStaticParams() {
  return posts
    .filter((p) => !isCategoryDeactivated(p))
    .map((p) => ({ slug: p.slug }));
}

/**
 * Programmatisch erzeugtes Open-Graph-/Twitter-Vorschaubild pro Blog-Artikel
 * im Markendesign – mit dem echten Artikeltitel statt eines generischen Bildes.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getPost(slug);
  // Artikel aus ausgeblendeten Kategorien geben nur das generische Motiv
  // zurück – Titel und Kategorie bleiben verborgen.
  const post = found && !isCategoryDeactivated(found) ? found : undefined;
  const title = post?.title ?? site.name;
  const kicker = post?.category ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#08102a",
          backgroundImage:
            "radial-gradient(1000px 500px at 12% 0%, rgba(33,178,189,0.28), transparent 60%), radial-gradient(900px 500px at 100% 100%, rgba(140,198,63,0.20), transparent 55%)",
          color: "#f4f2ec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "26px",
            fontWeight: 600,
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#e8c15f",
          }}
        >
          <span
            style={{
              display: "flex",
              width: "42px",
              height: "6px",
              borderRadius: "999px",
              backgroundImage: "linear-gradient(90deg, #e8c15f, #d9a93a)",
            }}
          />
          {kicker}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-1px",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "56px",
            fontSize: "26px",
            color: "rgba(244,242,236,0.6)",
          }}
        >
          {site.name} · werdemeisterdeinergedanken.de
        </div>
      </div>
    ),
    { ...size },
  );
}
