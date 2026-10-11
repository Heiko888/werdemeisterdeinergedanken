/**
 * Widerrufsfunktion (elektronischer Widerruf von online geschlossenen
 * Verträgen – EU-Richtlinie 2023/2673, anwendbar seit 19.06.2026).
 *
 * Ablauf: /widerruf → Angaben → eigene Bestätigungsansicht mit
 * „Widerruf bestätigen“ → /api/widerruf speichert den Widerruf mit Zeitstempel
 * und schickt eine Eingangsbestätigung per E-Mail (dauerhafter Datenträger).
 *
 * Ohne Laufzeit-Importe, damit `npm test` Prüfung und Texte testen kann.
 * Hintergrund: docs/AENDERUNGEN.md (Eintrag 2026-10-11).
 */

/** Pfad der Widerrufsfunktion (Footer-Link, E-Mails). */
export const WIDERRUF_HREF = "/widerruf";

/** Beschriftung der Einstiegs-Schaltfläche (eindeutig, wie gefordert). */
export const WIDERRUF_BUTTON = "Vertrag hier widerrufen";

/** Beschriftung der Bestätigungs-Schaltfläche. */
export const WIDERRUF_BESTAETIGEN = "Widerruf bestätigen";

/** Verträge, die über die Website geschlossen werden (können). */
export const WIDERRUF_PRODUKTE = {
  "buch-pdf": "Buch „Werde Meister deiner Gedanken“ – PDF",
  "buch-print": "Buch „Werde Meister deiner Gedanken“ – gedruckte Ausgabe",
  mitgliedschaft: "Mitgliedschaft",
  sonstiges: "Anderer Vertrag",
} as const;

export type WiderrufProdukt = keyof typeof WIDERRUF_PRODUKTE;

export type WiderrufEingabe = {
  name: string;
  email: string;
  produkt: WiderrufProdukt;
  /** Bestellnummer, Bestelldatum o. Ä. – freiwillig. */
  bestellung: string;
  /** Freiwillige Anmerkung. */
  nachricht: string;
};

export const WIDERRUF_GRENZEN = {
  name: 120,
  email: 200,
  bestellung: 200,
  nachricht: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type PruefErgebnis =
  | { ok: true; eingabe: WiderrufEingabe }
  | { ok: false; fehler: string };

/** Prüft und normalisiert die Formulardaten (Client und Server nutzen dieselbe Prüfung). */
export function pruefeWiderruf(roh: Record<string, unknown>): PruefErgebnis {
  const text = (v: unknown) => String(v ?? "").trim();
  const name = text(roh.name);
  const email = text(roh.email);
  const produkt = text(roh.produkt);
  const bestellung = text(roh.bestellung);
  const nachricht = text(roh.nachricht);

  if (!name) return { ok: false, fehler: "Bitte gib deinen Namen an." };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, fehler: "Bitte gib eine gültige E-Mail-Adresse an." };
  }
  if (!(produkt in WIDERRUF_PRODUKTE)) {
    return { ok: false, fehler: "Bitte wähle aus, welchen Vertrag du widerrufen möchtest." };
  }
  if (
    name.length > WIDERRUF_GRENZEN.name ||
    email.length > WIDERRUF_GRENZEN.email ||
    bestellung.length > WIDERRUF_GRENZEN.bestellung ||
    nachricht.length > WIDERRUF_GRENZEN.nachricht
  ) {
    return { ok: false, fehler: "Eine deiner Angaben ist zu lang." };
  }

  return {
    ok: true,
    eingabe: { name, email, produkt: produkt as WiderrufProdukt, bestellung, nachricht },
  };
}

/** Kurze, gut lesbare Referenz für Rückfragen, z. B. „WR-3F9A2C71“. */
export function neueReferenz(zufall: string): string {
  return `WR-${zufall.replace(/[^0-9a-f]/gi, "").slice(0, 8).toUpperCase()}`;
}

/** Datum und Uhrzeit des Eingangs in deutscher Ortszeit. */
export function formatEingang(iso: string): { datum: string; uhrzeit: string } {
  const d = new Date(iso);
  const tz = "Europe/Berlin";
  return {
    datum: new Intl.DateTimeFormat("de-DE", { dateStyle: "long", timeZone: tz }).format(d),
    uhrzeit: new Intl.DateTimeFormat("de-DE", { timeStyle: "short", timeZone: tz }).format(d),
  };
}

/** Zeilen mit den Angaben – für Bestätigungsansicht und E-Mails. */
export function angabenZeilen(e: WiderrufEingabe): [string, string][] {
  return [
    ["Name", e.name],
    ["E-Mail", e.email],
    ["Vertrag", WIDERRUF_PRODUKTE[e.produkt]],
    ["Bestellung", e.bestellung || "–"],
    ...(e.nachricht ? ([["Anmerkung", e.nachricht]] as [string, string][]) : []),
  ];
}

/** Eingangsbestätigung an die Person, die widerrufen hat (Text-Mail). */
export function bestaetigungsText(
  e: WiderrufEingabe,
  referenz: string,
  eingangIso: string,
  kontaktEmail: string,
): string {
  const { datum, uhrzeit } = formatEingang(eingangIso);
  const zeilen = angabenZeilen(e)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `Hallo ${e.name},

hiermit bestätigen wir den Eingang deines Widerrufs.

Eingegangen am: ${datum} um ${uhrzeit} Uhr
Referenz: ${referenz}

Deine Angaben:
${zeilen}

Bitte bewahre diese E-Mail auf. Wir melden uns bei dir zur weiteren
Abwicklung. Bei Fragen erreichst du uns unter ${kontaktEmail} – gib dabei
bitte die Referenz ${referenz} an.

— Werde Meister deiner Gedanken`;
}
