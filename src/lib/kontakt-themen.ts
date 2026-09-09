/**
 * Kontakt-Themen für das Kontaktformular (`/kontakt?thema=…`).
 *
 * Manche Wege enden bewusst auf dem Kontaktformular statt im Bezahlvorgang –
 * z. B. der sanfte Fallback aus /api/checkout (Mitgliedschaft) und
 * /api/buch-checkout (Buch), wenn Stripe noch nicht eingerichtet ist. Damit
 * die Person nicht vor einem leeren Formular steht, blendet das Formular
 * anhand von `thema` einen passenden Hinweis ein und füllt die Nachricht vor.
 *
 * Diese Datei ist die eine Quelle der Wahrheit für Client (Formular) und
 * Server (E-Mail-Versand in /api/kontakt) – deshalb bewusst ohne
 * server-only-Importe.
 */

export type KontaktThema = {
  /** Kurzes, lesbares Label – erscheint im Betreff der Benachrichtigung. */
  label: string;
  /** Hinweis über dem Formular, der den Kontext einordnet. */
  hinweis: string;
  /** Vorausgefüllte Nachricht, die die Person nur noch ergänzen muss. */
  vorlage: string;
};

export const KONTAKT_THEMEN: Record<string, KontaktThema> = {
  mitgliedschaft: {
    label: "Mitgliedschaft",
    hinweis:
      "Schön, dass du zur Mitgliedschaft Kontakt aufnimmst. Schreib mir kurz deine Frage – ich melde mich persönlich und helfe dir beim nächsten Schritt.",
    vorlage:
      "Hallo Heiko,\n\nich interessiere mich für die Mitgliedschaft und habe dazu folgende Frage:\n\n",
  },
  buch: {
    label: "Das Buch",
    hinweis:
      "Du hast Interesse am Buch „Werde Meister deiner Gedanken“. Stell mir hier deine Frage – ich melde mich so bald wie möglich bei dir.",
    vorlage:
      "Hallo Heiko,\n\nich habe eine Frage zum Buch „Werde Meister deiner Gedanken“:\n\n",
  },
};

/**
 * Löst einen (potenziell unbekannten) `thema`-Wert aus der URL auf ein
 * bekanntes Thema auf. Gibt `null` zurück, wenn nichts passt – dann verhält
 * sich das Formular wie zuvor (neutral).
 */
export function resolveThema(
  thema: string | string[] | undefined | null,
): KontaktThema | null {
  const key = Array.isArray(thema) ? thema[0] : thema;
  if (!key) return null;
  return KONTAKT_THEMEN[key.toLowerCase()] ?? null;
}
