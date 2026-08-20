/**
 * Lässt ausschließlich seiten-INTERNE Pfade als Weiterleitungsziel zu und
 * schützt so vor Open-Redirect-Phishing.
 *
 * Abgelehnt werden (→ Fallback):
 *  - alles, was nicht mit "/" beginnt (absolute URLs wie https://…),
 *  - "//host" (protokoll-relativ → fremde Domain),
 *  - "/\\host" (Backslash wird von Browsern wie "/" behandelt → fremde Domain).
 */
export function safeInternalPath(
  target: unknown,
  fallback = "/mitglieder",
): string {
  const t = typeof target === "string" ? target : "";
  if (!t.startsWith("/")) return fallback;
  if (t.startsWith("//") || t.startsWith("/\\")) return fallback;
  return t;
}
