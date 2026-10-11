/**
 * Kündigungsbutton nach § 312k BGB für Verträge, die über die Website
 * geschlossen werden und laufend bezahlt werden (hier: die Mitgliedschaft).
 *
 * Ablauf: Footer-Schaltfläche „Verträge hier kündigen“ → Bestätigungsseite
 * /kuendigen (ohne Login) mit Art der Kündigung, Identifizierung, Vertrag und
 * Zeitpunkt → „Jetzt kündigen“ → /api/kuendigung speichert die Kündigung mit
 * Zeitstempel und schickt sofort eine Bestätigung in Textform (E-Mail).
 *
 * Nur sichtbar und erreichbar, solange MITGLIEDSCHAFT_AKTIV gilt – vorher kann
 * kein kündbarer Vertrag über die Website entstehen.
 *
 * Ohne Laufzeit-Importe, damit `npm test` Prüfung und Texte testen kann.
 * Hintergrund: docs/AENDERUNGEN.md (Eintrag 2026-10-11, Kündigungsbutton).
 */

/** Pfad der Bestätigungsseite (Footer-Link, E-Mails). */
export const KUENDIGUNG_HREF = "/kuendigen";

/** Beschriftung der Einstiegs-Schaltfläche (Wortlaut aus § 312k Abs. 2 BGB). */
export const KUENDIGUNG_BUTTON = "Verträge hier kündigen";

/** Beschriftung der Bestätigungs-Schaltfläche (Wortlaut aus § 312k Abs. 2 BGB). */
export const KUENDIGUNG_BESTAETIGEN = "Jetzt kündigen";

/** Kündbare Verträge, die über die Website geschlossen werden (können). */
export const KUENDIGUNG_VERTRAEGE = {
  mitgliedschaft: "Mitgliedschaft „Werde Meister deiner Gedanken“ (Abo)",
} as const;

export type KuendigungVertrag = keyof typeof KUENDIGUNG_VERTRAEGE;

export const KUENDIGUNG_ARTEN = {
  ordentlich: "Ordentliche Kündigung",
  ausserordentlich: "Außerordentliche Kündigung (aus wichtigem Grund)",
} as const;

export type KuendigungArt = keyof typeof KUENDIGUNG_ARTEN;

export const KUENDIGUNG_ZEITPUNKTE = {
  naechstmoeglich: "Zum nächstmöglichen Zeitpunkt",
  datum: "Zu einem bestimmten Datum",
} as const;

export type KuendigungZeitpunkt = keyof typeof KUENDIGUNG_ZEITPUNKTE;

export type KuendigungEingabe = {
  name: string;
  /** E-Mail-Adresse der Mitgliedschaft – dorthin geht die Bestätigung. */
  email: string;
  vertrag: KuendigungVertrag;
  /** Kunden-/Vertragsnummer o. Ä. – freiwillig. */
  vertragsnummer: string;
  art: KuendigungArt;
  /** Nur bei außerordentlicher Kündigung (dann Pflicht). */
  grund: string;
  zeitpunkt: KuendigungZeitpunkt;
  /** YYYY-MM-DD, nur bei zeitpunkt = "datum". */
  wunschdatum: string;
};

export const KUENDIGUNG_GRENZEN = {
  name: 120,
  email: 200,
  vertragsnummer: 200,
  grund: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATUM_RE = /^\d{4}-\d{2}-\d{2}$/;

export type PruefErgebnis =
  | { ok: true; eingabe: KuendigungEingabe }
  | { ok: false; fehler: string };

/** Heutiges Datum in deutscher Ortszeit als YYYY-MM-DD. */
export function heuteBerlin(jetzt: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(jetzt);
}

function gueltigesDatum(s: string): boolean {
  if (!DATUM_RE.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

/**
 * Prüft und normalisiert die Formulardaten (Client und Server nutzen dieselbe
 * Prüfung). `heute` als YYYY-MM-DD – ein Wunschdatum darf nicht davor liegen.
 */
export function pruefeKuendigung(
  roh: Record<string, unknown>,
  heute: string = heuteBerlin(),
): PruefErgebnis {
  const text = (v: unknown) => String(v ?? "").trim();
  const name = text(roh.name);
  const email = text(roh.email);
  const vertrag = text(roh.vertrag) || "mitgliedschaft";
  const vertragsnummer = text(roh.vertragsnummer);
  const art = text(roh.art) || "ordentlich";
  const grund = text(roh.grund);
  const zeitpunkt = text(roh.zeitpunkt) || "naechstmoeglich";
  const wunschdatum = text(roh.wunschdatum);

  if (!name) return { ok: false, fehler: "Bitte gib deinen Namen an." };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, fehler: "Bitte gib eine gültige E-Mail-Adresse an." };
  }
  if (!(vertrag in KUENDIGUNG_VERTRAEGE)) {
    return { ok: false, fehler: "Bitte wähle aus, welchen Vertrag du kündigen möchtest." };
  }
  if (!(art in KUENDIGUNG_ARTEN)) {
    return { ok: false, fehler: "Bitte wähle die Art der Kündigung." };
  }
  if (art === "ausserordentlich" && !grund) {
    return {
      ok: false,
      fehler: "Bitte nenne bei einer außerordentlichen Kündigung den wichtigen Grund.",
    };
  }
  if (!(zeitpunkt in KUENDIGUNG_ZEITPUNKTE)) {
    return { ok: false, fehler: "Bitte wähle, zu wann du kündigen möchtest." };
  }
  if (zeitpunkt === "datum") {
    if (!gueltigesDatum(wunschdatum)) {
      return { ok: false, fehler: "Bitte gib das gewünschte Datum an." };
    }
    if (wunschdatum < heute) {
      return { ok: false, fehler: "Das gewünschte Datum darf nicht in der Vergangenheit liegen." };
    }
  }
  if (
    name.length > KUENDIGUNG_GRENZEN.name ||
    email.length > KUENDIGUNG_GRENZEN.email ||
    vertragsnummer.length > KUENDIGUNG_GRENZEN.vertragsnummer ||
    grund.length > KUENDIGUNG_GRENZEN.grund
  ) {
    return { ok: false, fehler: "Eine deiner Angaben ist zu lang." };
  }

  return {
    ok: true,
    eingabe: {
      name,
      email,
      vertrag: vertrag as KuendigungVertrag,
      vertragsnummer,
      art: art as KuendigungArt,
      grund: art === "ausserordentlich" ? grund : "",
      zeitpunkt: zeitpunkt as KuendigungZeitpunkt,
      wunschdatum: zeitpunkt === "datum" ? wunschdatum : "",
    },
  };
}

/** Kurze, gut lesbare Referenz für Rückfragen, z. B. „KU-3F9A2C71“. */
export function neueReferenz(zufall: string): string {
  return `KU-${zufall.replace(/[^0-9a-f]/gi, "").slice(0, 8).toUpperCase()}`;
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

/** YYYY-MM-DD (oder ISO-Zeitpunkt) → „31. Oktober 2026“. */
export function formatDatum(wert: string): string {
  const iso = DATUM_RE.test(wert) ? `${wert}T12:00:00Z` : wert;
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "long", timeZone: "Europe/Berlin" }).format(
    new Date(iso),
  );
}

/** Gewünschter Zeitpunkt in Worten. */
export function zeitpunktText(e: KuendigungEingabe): string {
  if (e.art === "ausserordentlich" && e.zeitpunkt === "naechstmoeglich") {
    return "Sofort (außerordentlich)";
  }
  return e.zeitpunkt === "datum"
    ? `Zum ${formatDatum(e.wunschdatum)}`
    : KUENDIGUNG_ZEITPUNKTE.naechstmoeglich;
}

/** Zeilen mit den Angaben – für Bestätigungsansicht und E-Mails. */
export function angabenZeilen(e: KuendigungEingabe): [string, string][] {
  return [
    ["Name", e.name],
    ["E-Mail", e.email],
    ["Vertrag", KUENDIGUNG_VERTRAEGE[e.vertrag]],
    ["Vertragsnummer", e.vertragsnummer || "–"],
    ["Art der Kündigung", KUENDIGUNG_ARTEN[e.art]],
    ...(e.grund ? ([["Grund", e.grund]] as [string, string][]) : []),
    ["Gewünschter Zeitpunkt", zeitpunktText(e)],
  ];
}

/**
 * Satz zum voraussichtlichen Vertragsende für die Bestätigung.
 * `periodeEnde` = Ende des laufenden Abrechnungszeitraums laut unseren
 * Unterlagen (ISO), falls zur E-Mail-Adresse eine Mitgliedschaft gefunden
 * wurde. Ohne Fund wird das Vertragsende nicht geraten.
 */
export function vertragsendeText(e: KuendigungEingabe, periodeEnde: string | null): string {
  if (e.art === "ausserordentlich") {
    return "Du hast außerordentlich gekündigt. Wir prüfen den genannten Grund und bestätigen dir das Vertragsende gesondert per E-Mail.";
  }
  if (periodeEnde) {
    const ende = formatDatum(periodeEnde);
    if (e.zeitpunkt === "datum" && e.wunschdatum > periodeEnde.slice(0, 10)) {
      return `Dein Vertrag endet nach unseren Unterlagen frühestens am ${ende} (Ende des laufenden Abrechnungszeitraums). Wie gewünscht beenden wir ihn zum ${formatDatum(e.wunschdatum)}.`;
    }
    return `Dein Vertrag endet zum Ende des laufenden Abrechnungszeitraums, nach unseren Unterlagen am ${ende}. Bis dahin behältst du deinen Zugang; danach wird nichts mehr abgebucht.`;
  }
  return "Dein Vertrag endet zum nächstmöglichen Zeitpunkt. Zu dieser E-Mail-Adresse haben wir auf Anhieb keine Mitgliedschaft gefunden – wir ordnen deine Kündigung manuell zu und teilen dir das genaue Vertragsende per E-Mail mit.";
}

/** Kündigungsbestätigung an die Person (Text-Mail = Textform). */
export function bestaetigungsText(
  e: KuendigungEingabe,
  referenz: string,
  eingangIso: string,
  periodeEnde: string | null,
  kontaktEmail: string,
): string {
  const { datum, uhrzeit } = formatEingang(eingangIso);
  const zeilen = angabenZeilen(e)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `Hallo ${e.name},

hiermit bestätigen wir den Eingang deiner Kündigung.

Eingegangen am: ${datum} um ${uhrzeit} Uhr
Referenz: ${referenz}

Inhalt deiner Kündigung:
${zeilen}

Vertragsende:
${vertragsendeText(e, periodeEnde)}

Bitte bewahre diese E-Mail auf. Bei Fragen erreichst du uns unter
${kontaktEmail} – gib dabei bitte die Referenz ${referenz} an.

— Werde Meister deiner Gedanken`;
}
