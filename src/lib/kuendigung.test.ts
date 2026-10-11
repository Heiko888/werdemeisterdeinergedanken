import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  KUENDIGUNG_BESTAETIGEN,
  KUENDIGUNG_BUTTON,
  KUENDIGUNG_HREF,
  bestaetigungsText,
  heuteBerlin,
  neueReferenz,
  pruefeKuendigung,
  vertragsendeText,
} from "./kuendigung.ts";

/** Kündigungsbutton (§ 312k BGB): Prüfung, Texte und Einbindung (keine API-Aufrufe). */

const src = (pfad: string) =>
  readFileSync(new URL(`../${pfad}`, import.meta.url), "utf8");

const HEUTE = "2026-10-11";
const gueltig = {
  name: "Erika Muster",
  email: "erika@example.de",
  vertrag: "mitgliedschaft",
  vertragsnummer: "",
  art: "ordentlich",
  grund: "",
  zeitpunkt: "naechstmoeglich",
  wunschdatum: "",
};

test("gültige Angaben werden angenommen, Standard ist nächstmöglicher Zeitpunkt", () => {
  const r = pruefeKuendigung({ name: " Erika ", email: "e@x.de" }, HEUTE);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.equal(r.eingabe.name, "Erika");
  assert.equal(r.eingabe.art, "ordentlich");
  assert.equal(r.eingabe.zeitpunkt, "naechstmoeglich");
  assert.equal(r.eingabe.vertrag, "mitgliedschaft");
});

test("Pflichtangaben und E-Mail werden geprüft", () => {
  assert.equal(pruefeKuendigung({ ...gueltig, name: "" }, HEUTE).ok, false);
  assert.equal(pruefeKuendigung({ ...gueltig, email: "x" }, HEUTE).ok, false);
  assert.equal(pruefeKuendigung({ ...gueltig, vertrag: "unbekannt" }, HEUTE).ok, false);
  assert.equal(pruefeKuendigung({ ...gueltig, art: "egal" }, HEUTE).ok, false);
});

test("außerordentliche Kündigung braucht einen Grund", () => {
  assert.equal(pruefeKuendigung({ ...gueltig, art: "ausserordentlich" }, HEUTE).ok, false);
  const r = pruefeKuendigung({ ...gueltig, art: "ausserordentlich", grund: "Umzug ins Ausland" }, HEUTE);
  assert.equal(r.ok, true);
});

test("Grund wird bei ordentlicher Kündigung verworfen", () => {
  const r = pruefeKuendigung({ ...gueltig, grund: "egal" }, HEUTE);
  assert.ok(r.ok);
  if (r.ok) assert.equal(r.eingabe.grund, "");
});

test("Wunschdatum muss gültig sein und darf nicht in der Vergangenheit liegen", () => {
  const mit = (wunschdatum: string) =>
    pruefeKuendigung({ ...gueltig, zeitpunkt: "datum", wunschdatum }, HEUTE).ok;
  assert.equal(mit(""), false);
  assert.equal(mit("2026-02-30"), false);
  assert.equal(mit("2026-10-10"), false);
  assert.equal(mit("2026-10-11"), true);
  assert.equal(mit("2026-12-31"), true);
});

test("heutiges Datum in deutscher Ortszeit", () => {
  assert.equal(heuteBerlin(new Date("2026-10-11T22:30:00Z")), "2026-10-12");
});

test("Referenz ist kurz und eindeutig formatiert", () => {
  assert.equal(neueReferenz("3f9a2c71-aaaa"), "KU-3F9A2C71");
});

test("Bestätigung nennt Inhalt, Eingangszeitpunkt und Vertragsende", () => {
  const r = pruefeKuendigung(gueltig, HEUTE);
  assert.ok(r.ok);
  if (!r.ok) return;
  const text = bestaetigungsText(r.eingabe, "KU-ABCDEF12", "2026-10-11T08:05:00Z", "2026-10-31T10:00:00Z", "info@example.de");
  assert.match(text, /Eingang deiner Kündigung/);
  assert.match(text, /11\. Oktober 2026 um 10:05 Uhr/);
  assert.match(text, /KU-ABCDEF12/);
  assert.match(text, /Ordentliche Kündigung/);
  assert.match(text, /31\. Oktober 2026/);
});

test("Vertragsende wird ohne gefundene Mitgliedschaft nicht geraten", () => {
  const r = pruefeKuendigung(gueltig, HEUTE);
  assert.ok(r.ok);
  if (!r.ok) return;
  const satz = vertragsendeText(r.eingabe, null);
  assert.match(satz, /nächstmöglichen Zeitpunkt/);
  assert.doesNotMatch(satz, /\d{4}/);
});

test("Schaltflächen tragen den gesetzlichen Wortlaut und sind eingebunden", () => {
  assert.equal(KUENDIGUNG_BUTTON, "Verträge hier kündigen");
  assert.equal(KUENDIGUNG_BESTAETIGEN, "Jetzt kündigen");
  assert.match(src("components/sections/KuendigungForm.tsx"), /KUENDIGUNG_BESTAETIGEN/);
  // Im Footer (legalNav), sobald die Mitgliedschaft aktiv ist – ohne Login.
  assert.match(src("lib/site.ts"), /KUENDIGUNG_HREF/);
  assert.match(src("lib/site.ts"), /MITGLIEDSCHAFT_AKTIV/);
  assert.equal(KUENDIGUNG_HREF, "/kuendigen");
  assert.doesNotMatch(src("app/kuendigen/page.tsx"), /getUser|redirect\(/);
});
