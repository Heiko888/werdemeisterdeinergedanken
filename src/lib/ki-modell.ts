import Anthropic from "@anthropic-ai/sdk";

/**
 * Modellwahl für die KI-Funktionen (Reading zum Gedankenprofil, Begleiter).
 *
 * Beide laufen auf Claude Opus 5. Ist dort gerade keine Kapazität frei,
 * antwortet die API mit 529 „Overloaded" – der Aufruf scheitert, obwohl Key
 * und Anfrage einwandfrei sind. Genau das ist am 18.08.2026 passiert: Opus 5
 * lieferte über Stunden 529, während Opus 4.8, Sonnet 5 und Haiku 4.5 auf
 * demselben Key normal antworteten. Reading und Begleiter standen still.
 *
 * Deshalb weichen beide bei Kapazitäts- und Serverfehlern einmalig auf
 * Opus 4.8 aus – gleiche Preisklasse, gleicher Aufrufumfang, keine Änderung
 * an Parametern nötig. Fachliche Fehler (falscher Key, ungültige Anfrage)
 * werden bewusst NICHT wiederholt: die scheitern beim Ersatzmodell genauso.
 */

export const KI_MODELL = "claude-opus-5";
export const KI_MODELL_ERSATZ = "claude-opus-4-8";

/**
 * Lohnt für diesen Fehler ein zweiter Versuch mit dem Ersatzmodell?
 *
 * Ja bei 429 (Rate Limit) und allen 5xx – dazu zählt 529 „Overloaded".
 * Nein bei 401/403 (Key) und 400 (Anfrage) – die sind modellunabhängig.
 */
export function istKapazitaetsfehler(err: unknown): boolean {
  if (!(err instanceof Anthropic.APIError)) return false;
  const status = err.status ?? 0;
  return status === 429 || status >= 500;
}

/**
 * Führt `aufruf` mit dem Hauptmodell aus und wiederholt ihn bei einem
 * Kapazitätsfehler genau einmal mit dem Ersatzmodell.
 *
 * Nur für Aufrufe geeignet, deren Fehler im zurückgegebenen Promise landen –
 * beim gestreamten Begleiter tauchen sie erst beim Durchlaufen der Events auf,
 * dort steht die Umschaltung deshalb direkt im Route-Handler.
 */
export async function mitErsatzmodell<T>(
  aufruf: (modell: string) => Promise<T>,
): Promise<T> {
  try {
    return await aufruf(KI_MODELL);
  } catch (err) {
    if (!istKapazitaetsfehler(err)) throw err;
    console.warn(
      `[ki] ${KI_MODELL} nicht verfügbar – weiche auf ${KI_MODELL_ERSATZ} aus:`,
      err,
    );
    return await aufruf(KI_MODELL_ERSATZ);
  }
}
