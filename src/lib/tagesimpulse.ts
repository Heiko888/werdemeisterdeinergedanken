/**
 * Sanfte, nicht bestrafende Tages-Impulse der „täglichen Rückkehr".
 * Eine Quelle für die Rückkehr-Seite und die „Heute"-Karte im Dashboard.
 */
export const TAGES_IMPULSE = [
  "Es geht nicht ums Nie-mehr-Abschweifen. Es geht ums Zurückkommen.",
  "Der Weg zurück ist kurz – oft nur ein Atemzug.",
  "Du musst nicht ruhig sein, um zurückzukehren. Du kehrst zurück, und dann wird es ruhig.",
  "Ein ausgelassener Tag ist kein Bruch. Er ist eine neue Gelegenheit.",
  "Zurückkehren ist keine Leistung. Es ist eine Freundlichkeit dir gegenüber.",
  "Je öfter du den Weg zurück gehst, desto vertrauter wird er.",
  "Nicht das Fallen zählt, sondern wie sanft du wieder aufstehst.",
];

/** Date → "YYYY-MM-DD" in LOKALER Zeit (nicht UTC). */
export function lokalesDatum(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const t = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${t}`;
}

/** Deterministisch nach Kalendertag – gleicher Impuls für den ganzen Tag. */
export function impulsFuer(datum: string): string {
  const tagZahl = Number(datum.replaceAll("-", ""));
  return TAGES_IMPULSE[tagZahl % TAGES_IMPULSE.length];
}
