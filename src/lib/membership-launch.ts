/**
 * Startschalter der Bezahl-Mitgliedschaft.
 *
 * Solange `false`:
 *   • /mitgliedschaft zeigt „Demnächst“, keine Preise und keine Kauf-Buttons –
 *     der Weg läuft über das kostenlose Erstgespräch (/kontakt?thema=erstgespraech).
 *   • /api/checkout legt KEINE Stripe-Session an, auch nicht bei direktem POST
 *     (z. B. per curl), sondern leitet aufs Erstgespräch um.
 *
 * Bewusst eine Konstante im Code und keine Umgebungsvariable: Freigeschaltet
 * wird nur mit einem bewussten Commit, nachdem die rechtlichen Punkte
 * (AGB, Widerrufsbelehrung, Preisangaben, Kündigungsbutton) geklärt sind.
 * Siehe docs/AENDERUNGEN.md, Eintrag 2026-10-03.
 */
export const MITGLIEDSCHAFT_AKTIV = false;

/** Ziel aller „Mitglied werden“-Wege, solange die Mitgliedschaft nicht aktiv ist. */
export const ERSTGESPRAECH_HREF = "/kontakt?thema=erstgespraech";
