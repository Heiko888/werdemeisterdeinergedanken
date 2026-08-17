/**
 * Zentrale Konfiguration für Google Analytics 4 (GA4).
 *
 * Die Measurement-ID ist client-seitig ohnehin öffentlich (sie steht im
 * Seitenquelltext) und darf daher mit NEXT_PUBLIC_ ausgeliefert werden.
 * Die Measurement-ID wird ausschließlich über die Env-Variable
 * NEXT_PUBLIC_GA_ID gesetzt. Es gibt bewusst KEINEN Code-Default mehr:
 * ohne gesetzte Variable bleibt das Tracking komplett inaktiv. In Produktion
 * daher NEXT_PUBLIC_GA_ID setzen (z. B. G-XF5D83V7HD), sonst wird kein
 * Analytics-Skript geladen.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** localStorage-Schlüssel, unter dem die Einwilligung gemerkt wird. */
export const CONSENT_STORAGE_KEY = "wmdg-analytics-consent";

/** Custom-Event, mit dem der Footer-Link den Banner erneut öffnet. */
export const OPEN_CONSENT_EVENT = "wmdg:open-consent";

export type ConsentValue = "granted" | "denied";

/**
 * Entfernt die von Google Analytics gesetzten Cookies (_ga, _ga_*, _gid, _gat).
 * Wird aufgerufen, wenn eine erteilte Einwilligung widerrufen wird, damit im
 * Browser keine Analyse-Cookies zurückbleiben.
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
