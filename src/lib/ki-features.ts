/**
 * Serverseitige Schalter für einzelne KI-Funktionen im Mitgliederbereich.
 *
 * Standard ist AUS: Eine Funktion ist nur aktiv, wenn die Umgebungsvariable
 * exakt "true" ist (kein "TRUE", "1" oder " true"). Fehlt sie oder steht sie
 * auf etwas anderem,
 * bleibt die Funktion verborgen – kein Launcher, kein Link, keine Seite, keine
 * Fehlermeldung an Mitglieder. Der Code der Funktionen bleibt vollständig
 * erhalten und lässt sich ohne Codeänderung wieder einschalten.
 *
 *   KI_BEGLEITER_ENABLED=true        → interaktiver KI-Begleiter (Chat)
 *   KI_READING_ENABLED=true          → persönliches KI-Reading zum Gedankenprofil
 *   KI_MUSTER_SPIEGEL_ENABLED=true   → Muster-Spiegel aus Journal-Reflexionen
 *   KI_DETEKTOR_ENABLED=true         → Manipulations-Detektor
 *
 * Solange alle vier aus sind, gehen KEINE Nutzereingaben an Anthropic.
 * Bewusst ohne NEXT_PUBLIC_-Präfix: Die Werte sind nur auf dem Server lesbar.
 * Hintergrund: docs/RECHTLICHE-PRODUKTABGRENZUNG.md
 */

function flag(name: string): boolean {
  return process.env[name] === "true";
}

/** Ist der interaktive KI-Begleiter freigeschaltet? (Standard: nein) */
export function isKiBegleiterEnabled(): boolean {
  return flag("KI_BEGLEITER_ENABLED");
}

/** Ist das persönliche KI-Reading zum Gedankenprofil freigeschaltet? (Standard: nein) */
export function isKiReadingEnabled(): boolean {
  return flag("KI_READING_ENABLED");
}

/** Ist der Muster-Spiegel (Journal-Reflexionen → KI) freigeschaltet? (Standard: nein) */
export function isKiMusterSpiegelEnabled(): boolean {
  return flag("KI_MUSTER_SPIEGEL_ENABLED");
}

/** Ist der Manipulations-Detektor (eingefügter Text → KI) freigeschaltet? (Standard: nein) */
export function isKiDetektorEnabled(): boolean {
  return flag("KI_DETEKTOR_ENABLED");
}
