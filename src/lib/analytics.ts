/**
 * Zentrale Konfiguration für Google Analytics 4 (GA4) und – optional – den
 * Meta-Pixel, plus die Consent-Verwaltung und der Event-Helfer `trackEvent`.
 *
 * Die Measurement-ID ist client-seitig ohnehin öffentlich (sie steht im
 * Seitenquelltext) und darf daher mit NEXT_PUBLIC_ ausgeliefert werden.
 * Die Measurement-ID wird ausschließlich über die Env-Variable
 * NEXT_PUBLIC_GA_ID gesetzt. Es gibt bewusst KEINEN Code-Default mehr:
 * ohne gesetzte Variable bleibt das Tracking komplett inaktiv. In Produktion
 * daher NEXT_PUBLIC_GA_ID setzen (z. B. G-XF5D83V7HD), sonst wird kein
 * Analytics-Skript geladen.
 *
 * Meta-Pixel: NEXT_PUBLIC_META_PIXEL_ID (optional). Ohne Wert wird nichts
 * geladen. Beide Skripte laden erst NACH aktiver Einwilligung im Banner.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** Ist überhaupt ein Tracking-Dienst konfiguriert? (steuert den Banner) */
export const TRACKING_ENABLED = Boolean(GA_ID || META_PIXEL_ID);

/** localStorage-Schlüssel, unter dem die Einwilligung gemerkt wird. */
export const CONSENT_STORAGE_KEY = "wmdg-analytics-consent";

/** Custom-Event, mit dem der Footer-Link den Banner erneut öffnet. */
export const OPEN_CONSENT_EVENT = "wmdg:open-consent";

export type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

/* ---------- Consent-Store (localStorage, für useSyncExternalStore) ---------- */

const consentListeners = new Set<() => void>();

export function subscribeConsent(callback: () => void): () => void {
  consentListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    consentListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function notifyConsentChanged(): void {
  for (const listener of consentListeners) listener();
}

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Auf dem Server ist noch keine Entscheidung bekannt → Banner-Zustand. */
export function getServerConsent(): ConsentValue | null {
  return null;
}

/* ---------- Conversion-Events ---------- */

/**
 * Konversions-Ereignisse des Funnels. Namen folgen den GA4-Empfehlungen
 * (generate_lead, begin_checkout, purchase); `test_complete` ist eigen.
 */
export type TrackEventName =
  | "generate_lead"
  | "test_complete"
  | "begin_checkout"
  | "purchase";

export type TrackEventParams = Record<string, string | number | boolean | undefined>;

/** Zuordnung GA4-Event → Meta-Standard-Event (nur wo es eines gibt). */
const META_EVENT: Partial<Record<TrackEventName, string>> = {
  generate_lead: "Lead",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
};

/**
 * Schickt ein Ereignis an GA4 (gtag) und – falls eingerichtet – an den
 * Meta-Pixel (fbq). Feuert NUR bei erteilter Einwilligung; ohne Consent oder
 * ohne geladene Skripte passiert still nichts. Kann daher überall gefahrlos
 * aufgerufen werden.
 */
export function trackEvent(name: TrackEventName, params: TrackEventParams = {}): void {
  if (typeof window === "undefined") return;
  if (getStoredConsent() !== "granted") return;

  const clean: TrackEventParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) clean[k] = v;
  }

  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("event", name, clean);
  }

  const metaName = META_EVENT[name];
  if (META_PIXEL_ID && metaName && typeof window.fbq === "function") {
    window.fbq("track", metaName, clean);
  } else if (META_PIXEL_ID && typeof window.fbq === "function") {
    // Ereignisse ohne Meta-Standard (z. B. test_complete) als Custom-Event.
    window.fbq("trackCustom", name, clean);
  }
}

/**
 * Entfernt die von Google Analytics und Meta gesetzten Cookies
 * (_ga, _ga_*, _gid, _gat, _fbp, _fbc). Wird aufgerufen, wenn eine erteilte
 * Einwilligung widerrufen wird, damit im Browser keine Analyse-Cookies
 * zurückbleiben.
 */
export function clearGaCookies(): void {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter(
      (n) =>
        n === "_ga" ||
        n === "_gid" ||
        n === "_gat" ||
        n === "_fbp" ||
        n === "_fbc" ||
        n.startsWith("_ga_") ||
        n.startsWith("_gat_"),
    );

  for (const name of names) {
    // Auf verschiedenen Domain-Varianten löschen: GA setzt auf .domain.tld.
    for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}
