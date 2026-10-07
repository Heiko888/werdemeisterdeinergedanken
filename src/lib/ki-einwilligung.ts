/**
 * Einwilligungshinweise der KI-Werkzeuge – eine Quelle für alle vier.
 *
 * Datenschutzerklärung Punkt 14 stützt die Übertragung an Anthropic auf eine
 * Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, bei möglichen Gesundheitsangaben
 * Art. 9 Abs. 2 lit. a). Ausdrücklich wird sie, weil der Hinweis direkt am
 * Start-Element steht und die Person dann selbst sendet bzw. klickt
 * („Button-Einwilligung“). Ohne Klick wird nichts übertragen.
 *
 * Ohne Laufzeit-Importe, damit `npm test` die Texte prüfen kann.
 * Hintergrund: docs/DATENSCHUTZ-TODO.md (Abschnitt 2026-10-07).
 */

export type KiWerkzeug = "begleiter" | "reading" | "muster" | "detektor";

/** Sprungziel auf Punkt 14 der Datenschutzerklärung. */
export const KI_DATENSCHUTZ_HREF = "/datenschutz#ki-werkzeuge";

/** Der eigentliche Einwilligungssatz je Werkzeug. */
export const KI_EINWILLIGUNG: Record<KiWerkzeug, string> = {
  begleiter:
    "Mit dem Senden willigst du ein, dass deine Nachricht samt Gesprächskontext (u. a. Auszüge aus deinem Journal und deine Selbsteinschätzung) zur Erstellung der Antwort an unseren KI-Dienstleister Anthropic übertragen wird – auch soweit darin Angaben zu deiner Gesundheit stehen.",
  reading:
    "Mit dem Klick willigst du ein, dass die Werte deiner Selbsteinschätzung zur Erstellung des Texts an unseren KI-Dienstleister Anthropic übertragen werden.",
  muster:
    "Mit dem Klick willigst du ein, dass deine Journal-Reflexionen zur Erstellung des Spiegels an unseren KI-Dienstleister Anthropic übertragen werden – auch soweit darin Angaben zu deiner Gesundheit stehen.",
  detektor:
    "Mit dem Klick willigst du ein, dass der eingefügte Text zur Analyse an unseren KI-Dienstleister Anthropic übertragen wird.",
};

/** Gemeinsamer Nachsatz: Widerruf und Verweis. */
export const KI_EINWILLIGUNG_WIDERRUF =
  "Die Einwilligung kannst du jederzeit widerrufen.";
