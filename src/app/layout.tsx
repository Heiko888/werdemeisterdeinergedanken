import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { site } from "@/lib/site";

// Fonts bewusst selbst-gehostet (next/font/local) statt next/font/google:
// - Kein Download von Google zur Build-Zeit → deterministische, robuste Builds
//   (der Google-Fetch schlug auf Vercel/Turbopack sporadisch fehl).
// - Kein Google-Fonts-Request im Browser → besser für Datenschutz (DSGVO).
// Es sind die variablen Schnitte (latin); die Dateien liegen in ./fonts/
// (Inter & Fraunces, SIL Open Font License – siehe *-OFL.txt).
const inter = localFont({
  src: "./fonts/Inter-latin-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

// Edle Serife für Überschriften (editorial, hochwertig)
const fraunces = localFont({
  src: [
    {
      path: "./fonts/Fraunces-latin-variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/Fraunces-latin-italic-variable.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Bewusstsein",
    "Bewusstseinsentwicklung",
    "mentale Entprogrammierung",
    "Gedanken meistern",
    "Mindset Coaching",
    "Persönlichkeitsentwicklung",
    "Heiko Schwaninger",
    "7 Stufen",
  ],
  authors: [{ name: site.author }],
  creator: site.author,
  // Feed-Autodiscovery: Browser und Feedreader finden /rss.xml damit von selbst.
  alternates: {
    types: {
      "application/rss+xml": [
        { url: `${site.url}/rss.xml`, title: `${site.name} — Blog` },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-paper text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-ink"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
