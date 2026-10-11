import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  WIDERRUF_BESTAETIGEN,
  WIDERRUF_BUTTON,
  WIDERRUF_HREF,
  bestaetigungsText,
  formatEingang,
  neueReferenz,
  pruefeWiderruf,
} from "./widerruf.ts";

/** Widerrufsfunktion: Prüfung, Texte und Einbindung (keine API-Aufrufe). */

const src = (pfad: string) =>
  readFileSync(new URL(`../${pfad}`, import.meta.url), "utf8");

const gueltig = {
  name: "Erika Muster",
  email: "erika@example.de",
  produkt: "buch-pdf",
  bestellung: "",
  nachricht: "",
};

test("gültige Angaben werden angenommen und getrimmt", () => {
  const r = pruefeWiderruf({ ...gueltig, name: "  Erika Muster  " });
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.eingabe.name, "Erika Muster");
});

test("Pflichtangaben, E-Mail und Vertrag werden geprüft", () => {
  assert.equal(pruefeWiderruf({ ...gueltig, name: "" }).ok, false);
  assert.equal(pruefeWiderruf({ ...gueltig, email: "keine-mail" }).ok, false);
  assert.equal(pruefeWiderruf({ ...gueltig, produkt: "unbekannt" }).ok, false);
  assert.equal(pruefeWiderruf({ ...gueltig, nachricht: "x".repeat(2001) }).ok, false);
});

test("Bestellung und Anmerkung sind freiwillig", () => {
  assert.equal(pruefeWiderruf({ name: "A", email: "a@b.de", produkt: "sonstiges" }).ok, true);
});

test("Referenz ist kurz und eindeutig formatiert", () => {
  assert.equal(neueReferenz("3f9a2c71-aaaa-bbbb"), "WR-3F9A2C71");
});

test("Eingang wird in deutscher Ortszeit formatiert", () => {
  const { datum, uhrzeit } = formatEingang("2026-10-11T08:05:00Z");
  assert.equal(datum, "11. Oktober 2026");
  assert.equal(uhrzeit, "10:05");
});

test("Eingangsbestätigung nennt Zeitpunkt, Referenz und Angaben", () => {
  const r = pruefeWiderruf(gueltig);
  assert.ok(r.ok);
  if (!r.ok) return;
  const text = bestaetigungsText(r.eingabe, "WR-ABCDEF12", "2026-10-11T08:05:00Z", "info@example.de");
  assert.match(text, /Eingang deines Widerrufs/);
  assert.match(text, /11\. Oktober 2026 um 10:05 Uhr/);
  assert.match(text, /WR-ABCDEF12/);
  assert.match(text, /PDF/);
});

test("Schaltflächen sind eindeutig beschriftet und eingebunden", () => {
  assert.equal(WIDERRUF_BUTTON, "Vertrag hier widerrufen");
  assert.equal(WIDERRUF_BESTAETIGEN, "Widerruf bestätigen");
  assert.match(src("components/sections/WiderrufForm.tsx"), /WIDERRUF_BESTAETIGEN/);
  // Dauerhaft erreichbar: im Footer (legalNav) verlinkt, ohne Login.
  assert.match(src("lib/site.ts"), new RegExp(`href: "${WIDERRUF_HREF}"`));
  assert.doesNotMatch(src("app/widerruf/page.tsx"), /getUser|redirect\(/);
});
