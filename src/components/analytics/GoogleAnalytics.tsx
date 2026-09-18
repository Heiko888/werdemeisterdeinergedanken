"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  GA_ID,
  META_PIXEL_ID,
  TRACKING_ENABLED,
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_EVENT,
  clearGaCookies,
  subscribeConsent,
  notifyConsentChanged,
  getStoredConsent,
  getServerConsent,
  type ConsentValue,
} from "@/lib/analytics";

// Der Consent-Store (localStorage + Listener) liegt in src/lib/analytics.ts,
// damit auch der Meta-Pixel (MetaPixel.tsx) und `trackEvent` dieselbe
// Einwilligung lesen. Über useSyncExternalStore gelesen – so bleibt die
// Server-/Client-Hydration korrekt und wir vermeiden synchrones setState im
// Effect.

/**
 * DSGVO-konforme Google-Analytics-Einbindung mit Opt-in-Consent.
 *
 * Kernprinzip: Vor einer aktiven Einwilligung wird KEIN GA-Script geladen und
 * KEIN Analyse-Cookie gesetzt. Erst nach Klick auf „Akzeptieren" injizieren wir
 * gtag.js (Consent Mode v2). Die Entscheidung wird in localStorage gemerkt und
 * lässt sich jederzeit über den Footer-Link „Cookie-Einstellungen" widerrufen.
 *
 * Der Banner hier gilt zugleich für den optionalen Meta-Pixel (MetaPixel.tsx):
 * er erscheint, sobald mindestens einer der beiden Dienste konfiguriert ist,
 * und beide lesen dieselbe gespeicherte Entscheidung.
 */
export function GoogleAnalytics() {
  const stored = useSyncExternalStore(
    subscribeConsent,
    getStoredConsent,
    getServerConsent,
  );
  // Erneutes Öffnen des Banners über den Footer-Link, ohne die gespeicherte
  // Entscheidung sofort zu verwerfen.
  const [reopened, setReopened] = useState(false);
  const pathname = usePathname();
  // Der erste page_view kommt bereits aus der gtag-config; diesen Effektlauf
  // überspringen wir, damit der Aufruf nicht doppelt zählt.
  const skipFirstPageView = useRef(true);

  // Footer-Link „Cookie-Einstellungen" öffnet den Banner erneut.
  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Client-seitige Navigationen als page_view melden (SPA-Routing sendet sonst
  // keinen weiteren Seitenaufruf an GA).
  useEffect(() => {
    if (stored !== "granted" || !GA_ID) return;
    if (skipFirstPageView.current) {
      skipFirstPageView.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, stored]);

  const choose = useCallback(
    (value: ConsentValue) => {
      const wasLoaded =
        stored === "granted" ||
        typeof window.gtag === "function" ||
        typeof window.fbq === "function";
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
      notifyConsentChanged();
      setReopened(false);

      // Widerruf einer bereits aktiven Einwilligung: Cookies entfernen und neu
      // laden, damit GA im laufenden Tab nichts mehr sendet.
      if (value === "denied" && wasLoaded) {
        clearGaCookies();
        window.location.reload();
      }
    },
    [stored],
  );

  // Ohne Measurement-ID (und ohne Pixel-ID) bleibt das Feature komplett inaktiv.
  if (!TRACKING_ENABLED) return null;

  const showBanner = stored === null || reopened;

  return (
    <>
      {stored === "granted" && GA_ID && (
        <>
          <Script
            id="ga-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied'
              });
              gtag('consent', 'update', { analytics_storage: 'granted' });
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <ConsentBanner
          withMeta={Boolean(META_PIXEL_ID)}
          onAccept={() => choose("granted")}
          onDecline={() => choose("denied")}
        />
      )}
    </>
  );
}

function ConsentBanner({
  withMeta,
  onAccept,
  onDecline,
}: {
  /** Meta-Pixel konfiguriert → im Text mit nennen. */
  withMeta: boolean;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Hinweis zu Cookies und Analyse"
      className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-ink/10 bg-white/95 p-5 shadow-card backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm leading-relaxed text-ink/80">
          Wir würden gern anonymisierte Statistiken mit{" "}
          <span className="font-medium text-ink">Google Analytics</span>
          {withMeta && (
            <>
              {" "}
              und den Erfolg unserer Beiträge mit dem{" "}
              <span className="font-medium text-ink">Meta-Pixel</span>
            </>
          )}{" "}
          erheben, um die Seite zu verbessern. Das geschieht nur mit deiner
          Einwilligung. Technisch notwendige Cookies bleiben davon unberührt.{" "}
          <Link
            href="/datenschutz"
            className="text-accent underline underline-offset-2 hover:text-ink"
          >
            Mehr im Datenschutz
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={onDecline}
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-full border border-ink/20 px-5 text-sm font-medium text-ink transition-all hover:border-ink/40 hover:bg-ink/[0.03]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            )}
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={onAccept}
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-5 text-sm font-semibold text-navy-950 shadow-sm transition-all hover:brightness-[1.03]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            )}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
