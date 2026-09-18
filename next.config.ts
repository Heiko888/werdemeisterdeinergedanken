import type { NextConfig } from "next";

/**
 * Sicherheits-Header für alle Routen. Bewusst in Next gesetzt (nicht nur in
 * nginx), damit der Schutz auch bei anderem Hosting/Proxy greift.
 * - HSTS: erzwingt künftige HTTPS-Aufrufe (verhindert SSL-Stripping).
 * - X-Frame-Options / frame-ancestors: verhindert Einbetten per iframe
 *   (Clickjacking) – wichtig für den eingeloggten Mitgliederbereich.
 * - X-Content-Type-Options: kein MIME-Sniffing.
 * - Referrer/Permissions-Policy: sparsame Datenweitergabe.
 * Die CSP ist bewusst konservativ gehalten; 'unsafe-inline' für Styles, weil
 * Next/Tailwind Inline-Styles nutzt. Bei Bedarf weiter verschärfen.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // www.facebook.com: Tracking-Pixel des Meta-Pixels (nur nach Einwilligung).
      "img-src 'self' data: blob: https: https://www.facebook.com",
      "style-src 'self' 'unsafe-inline'",
      // googletagmanager.com: Google-Analytics-Script (lädt erst nach Einwilligung).
      // connect.facebook.net: Meta-Pixel-Script (fbevents.js, nur nach Einwilligung).
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
      "font-src 'self' data:",
      // https: deckt die GA-Beacons (google-analytics.com) und Meta (www.facebook.com) mit ab.
      "connect-src 'self' https: https://www.facebook.com",
      "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  /**
   * Die Wissensdatenbank liegt jetzt im geschützten Mitgliederbereich unter
   * /mitglieder/wissensdatenbank. Alte öffentliche /wissen-Links dauerhaft
   * dorthin umleiten (der Mitgliederbereich erzwingt anschließend den Login).
   */
  async redirects() {
    return [
      {
        source: "/wissen",
        destination: "/mitglieder/wissensdatenbank",
        permanent: true,
      },
      {
        source: "/wissen/:slug",
        destination: "/mitglieder/wissensdatenbank/:slug",
        permanent: true,
      },
      /**
       * Die Seitenuebersicht ist in den Admin-Bereich gewandert. Die kurz
       * oeffentlich erreichbare /seiten-Adresse dorthin umleiten, statt 404 zu
       * liefern (der Admin-Bereich erzwingt anschliessend den Login).
       */
      {
        source: "/seiten",
        destination: "/admin/seiten",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
