import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Metadaten für das Vorschaubild (Social Shares: WhatsApp, LinkedIn, X, …)
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Programmatisch erzeugtes Open-Graph-/Twitter-Vorschaubild im Markendesign.
 * Wird zur Build-Zeit statisch generiert (kein externes Bild nötig).
 */
export default function Image() {
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
            color: "#8cc63f",
          }}
        >
          <span
            style={{
              display: "flex",
              width: "42px",
              height: "6px",
              borderRadius: "999px",
              backgroundImage: "linear-gradient(90deg, #8cc63f, #21b2bd)",
            }}
          />
          7 Stufen
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "82px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-1px",
            maxWidth: "900px",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "36px",
            lineHeight: 1.3,
            color: "rgba(244,242,236,0.82)",
            maxWidth: "820px",
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "56px",
            fontSize: "26px",
            color: "rgba(244,242,236,0.6)",
          }}
        >
          werdemeisterdeinergedanken.de
        </div>
      </div>
    ),
    { ...size },
  );
}
