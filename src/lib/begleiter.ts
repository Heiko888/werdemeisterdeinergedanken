/**
 * KI-Begleiter – gemeinsame Typen, Grenzen und Texte.
 *
 * Bewusst frei von Server-Abhängigkeiten (kein `node:fs`, kein Supabase),
 * damit sowohl die Client-Komponente als auch die Route diese Datei
 * importieren können. Der eigentliche System-Prompt samt Inhaltsverzeichnis
 * liegt server-only in `lib/begleiter-prompt.ts`.
 */

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  body: string;
  createdAt: string;
};

/** Modell für die Antworten des Begleiters (wie beim Reading zum Gedankenprofil). */
export const BEGLEITER_MODEL = "claude-opus-5";

/**
 * Längstmögliche Frage. Verhindert, dass ganze Dokumente hineinkopiert werden –
 * das würde die Antwort verwässern und unnötig Tokens kosten.
 */
export const MAX_INPUT_CHARS = 2000;

/**
 * So viele der letzten Nachrichten gehen als Gesprächskontext an die KI.
 * Ältere bleiben gespeichert und sichtbar, zählen aber nicht mehr zum Kontext.
 */
export const HISTORY_LIMIT = 24;

/**
 * Nachrichten pro Person und Tag (rollierende 24 Stunden).
 * Schützt vor Ausreißern bei den API-Kosten; Admins sind ausgenommen.
 */
export const DAILY_MESSAGE_LIMIT = 40;

/** Begrüßung, solange noch kein Gespräch läuft (kein KI-Aufruf nötig). */
export const BEGLEITER_WELCOME =
  "Schön, dass du da bist. Ich bin dein Begleiter durch die 7 Stufen – frag mich, was dich gerade beschäftigt, oder such dir unten einen Einstieg aus.";

/** Vorschläge für den Einstieg, wenn das Gespräch noch leer ist. */
export const BEGLEITER_SUGGESTIONS = [
  "Wo stehe ich gerade – und was wäre mein nächster Schritt?",
  "Meine Gedanken kreisen abends. Welche Übung passt dazu?",
  "Erklär mir die Stufe, an der ich gerade arbeite.",
  "Ich komme seit Wochen nicht weiter. Woran kann das liegen?",
];

/** Fehlerfälle, die Route und Oberfläche gemeinsam kennen. */
export type BegleiterError =
  | "not_configured"
  | "unauthenticated"
  | "empty"
  | "too_long"
  | "rate_limited"
  | "error";

/** Verständlicher Text zu jedem Fehlerfall – an einer Stelle gepflegt. */
export const begleiterErrorText: Record<BegleiterError, string> = {
  not_configured:
    "Der Begleiter ist gerade nicht verfügbar. Melde dich gern über das Kontaktformular, dann schauen wir uns das an.",
  unauthenticated:
    "Deine Sitzung ist abgelaufen. Melde dich neu an, dann geht das Gespräch weiter.",
  empty: "Schreib mir kurz, worum es geht – dann antworte ich dir.",
  too_long: `Das ist etwas viel auf einmal. Fasse es bitte auf höchstens ${MAX_INPUT_CHARS} Zeichen zusammen.`,
  rate_limited: `Du hast heute schon ${DAILY_MESSAGE_LIMIT} Nachrichten geschrieben. Morgen geht es weiter – bis dahin ist vielleicht ohnehin ein guter Moment, das Gelesene wirken zu lassen.`,
  error:
    "Die Antwort konnte gerade nicht erzeugt werden. Versuch es in einem Moment noch einmal.",
};
