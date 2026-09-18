/**
 * UTM-Parameter des ersten Seitenaufrufs (Client-Utility).
 *
 * Reels, Stories und Anzeigen verlinken mit `?utm_source=…&utm_medium=…`.
 * Beim ersten Aufruf mit solchen Parametern werden sie in `sessionStorage`
 * gemerkt (nur dieser Tab, keine Cookies, keine Weitergabe an Dritte) und
 * später vom E-Book- und Test-Formular sowie vom Stripe-Checkout mitgeschickt.
 * So lässt sich ein Lead oder Kauf der Kampagne zuordnen, über die die
 * Person gekommen ist – auch wenn sie sich erst auf einer anderen Seite
 * einträgt.
 *
 * Bewusst „first touch": ein späterer Aufruf mit anderen UTMs überschreibt
 * den gemerkten Satz nicht.
 */

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

const STORAGE_KEY = "wmdg:utm";

/** Wert auf einen harmlosen, kurzen String begrenzen (für Speicherung + DB). */
export function cleanUtmValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim().slice(0, 80);
  return v ? v : undefined;
}

/** Liest UTMs aus einem beliebigen Objekt (Query, Formular, JSON) heraus. */
export function pickUtm(input: Record<string, unknown> | URLSearchParams): UtmParams {
  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    const raw =
      input instanceof URLSearchParams ? input.get(key) : input[key];
    const v = cleanUtmValue(raw);
    if (v) out[key] = v;
  }
  return out;
}

/**
 * Beim Seitenaufruf aufrufen (Client): merkt UTMs aus der URL, falls noch
 * keine gespeichert sind. Fehler (privater Modus, Speicher gesperrt) werden
 * still ignoriert – die Seite funktioniert auch ohne.
 */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const found = pickUtm(new URLSearchParams(window.location.search));
    if (Object.keys(found).length === 0) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Speicher nicht verfügbar → unkritisch.
  }
}

/** Gemerkte UTMs (leeres Objekt, wenn keine vorhanden). */
export function getUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? pickUtm(parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}
