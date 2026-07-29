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
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "connect-src 'self' https:",
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
};

export default nextConfig;
