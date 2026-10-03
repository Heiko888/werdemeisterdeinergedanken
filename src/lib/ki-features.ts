/**
 * Serverseitige Schalter für einzelne KI-Funktionen im Mitgliederbereich.
 *
 * Standard ist AUS: Eine Funktion ist nur aktiv, wenn die Umgebungsvariable
 * ausdrücklich auf "true" steht. Fehlt sie oder steht sie auf etwas anderem,
 * bleibt die Funktion verborgen – kein Launcher, kein Link, keine Seite, keine
 * Fehlermeldung an Mitglieder. Der Code der Funktionen bleibt vollständig
 * erhalten und lässt sich ohne Codeänderung wieder einschalten.
 *
 *   KI_BEGLEITER_ENABLED=true  → interaktiver KI-Begleiter (Chat)
 *   KI_READING_ENABLED=true    → persönliches KI-Reading zum Gedankenprofil
 *
 * Bewusst ohne NEXT_PUBLIC_-Präfix: Die Werte sind nur auf dem Server lesbar.
 * Der Muster-Spiegel (Journal) hat keinen eigenen Schalter.
 * Hintergrund: docs/RECHTLICHE-PRODUKTABGRENZUNG.md
 */

function flag(name: string): boolean {
  return process.env[name]?.trim().toLowerCase() === "true";
}

/** Ist der interaktive KI-Begleiter freigeschaltet? (Standard: nein) */
export function isKiBegleiterEnabled(): boolean {
  return flag("KI_BEGLEITER_ENABLED");
}

/** Ist das persönliche KI-Reading zum Gedankenprofil freigeschaltet? (Standard: nein) */
export function isKiReadingEnabled(): boolean {
  return flag("KI_READING_ENABLED");
}
