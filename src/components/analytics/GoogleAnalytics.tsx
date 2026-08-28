"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  GA_ID,
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_EVENT,
  clearGaCookies,
  type ConsentValue,
} from "@/lib/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Externer Store für die gespeicherte Einwilligung (localStorage). Über
 * useSyncExternalStore gelesen – so bleibt die Server-/Client-Hydration korrekt
 * und wir vermeiden synchrones setState im Effect.
 */
const consentListeners = new Set<() => void>();

function subscribeConsent(callback: () => void): () => void {
  consentListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    consentListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function notifyConsentChanged(): void {
  for (const listener of consentListeners) listener();
}

function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

/** Auf dem Server ist noch keine Entscheidung bekannt → Banner-Zustand. */
function getServerConsent(): ConsentValue | null {
  return null;
}

/**
 * DSGVO-konforme Google-Analytics-Einbindung mit Opt-in-Consent.
 *
 * Kernprinzip: Vor einer aktiven Einwilligung wird KEIN GA-Script geladen und
 * KEIN Analyse-Cookie gesetzt. Erst nach Klick auf „Akzeptieren" injizieren wir
 * gtag.js (Consent Mode v2). Die Entscheidung wird in localStorage gemerkt und
 * lässt sich jederzeit über den Footer-Link „Cookie-Einstellungen" widerrufen.
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
    if (!GA_ID) return;
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
        stored === "granted" || typeof window.gtag === "function";
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

  // Ohne Measurement-ID bleibt das Feature komplett inaktiv.
  if (!GA_ID) return null;

  const showBanner = stored === null || reopened;

  return (
    <>
      {stored === "granted" && (
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
          onAccept={() => choose("granted")}
          onDecline={() => choose("denied")}
        />
      )}
    </>
  );
}

function ConsentBanner({
  onAccept,
  onDecline,
}: {
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
          <span className="font-medium text-ink">Google Analytics</span>{" "}
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
