import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  KI_DATENSCHUTZ_HREF,
  KI_EINWILLIGUNG,
  KI_EINWILLIGUNG_VERSION,
  KI_EINWILLIGUNG_WIDERRUF,
  einwilligungsWortlaut,
  type KiWerkzeug,
} from "./ki-einwilligung.ts";

/**
 * Einwilligungshinweise der KI-Werkzeuge (Datenschutz Punkt 14,
 * docs/DATENSCHUTZ-TODO.md). Prüft Texte und Einbindung, keine API-Aufrufe.
 */

const src = (pfad: string) =>
  readFileSync(new URL(`../${pfad}`, import.meta.url), "utf8");

test("jeder Hinweis nennt Einwilligung, Anbieter und Zweck", () => {
  for (const [werkzeug, text] of Object.entries(KI_EINWILLIGUNG)) {
    assert.match(text, /willigst du ein/, werkzeug);
    assert.match(text, /Anthropic/, werkzeug);
    assert.match(text, /übertragen/, werkzeug);
  }
  assert.match(KI_EINWILLIGUNG_WIDERRUF, /widerrufen/);
});

test("Werkzeuge mit Journal-Inhalten nennen mögliche Gesundheitsangaben (Art. 9)", () => {
  assert.match(KI_EINWILLIGUNG.begleiter, /Gesundheit/);
  assert.match(KI_EINWILLIGUNG.muster, /Gesundheit/);
  assert.match(KI_EINWILLIGUNG.begleiter, /Journal/);
});

test("Hinweis steht an allen vier Start-Elementen", () => {
  const stellen: Record<string, string> = {
    begleiter: "components/members/BegleiterChat.tsx",
    reading: "components/members/ReadingPanel.tsx",
    muster: "components/members/MusterSpiegelPanel.tsx",
    detektor: "components/members/DetektorPanel.tsx",
  };
  for (const [werkzeug, datei] of Object.entries(stellen)) {
    assert.match(
      src(datei),
      new RegExp(`<KiEinwilligungsHinweis[\\s\\S]*?werkzeug="${werkzeug}"`),
      datei,
    );
  }
});

test("Verweis zeigt auf Punkt 14 der Datenschutzerklärung", () => {
  const [pfad, anker] = KI_DATENSCHUTZ_HREF.split("#");
  assert.equal(pfad, "/datenschutz");
  const seite = src("app/datenschutz/page.tsx");
  assert.match(seite, new RegExp(`<h2 id="${anker}">14\\.`));
  assert.match(seite, /Art\. 9\s+Abs\. 2 lit\. a DSGVO/);
});

/**
 * Fingerabdrücke des Wortlauts je Version. Ändert sich ein Einwilligungstext,
 * muss KI_EINWILLIGUNG_VERSION erhöht und hier eine neue Zeile ergänzt werden –
 * sonst stünde im Nachweis eine Version, die nicht zum angezeigten Text passt.
 */
const WORTLAUT_JE_VERSION: Record<string, Record<KiWerkzeug, string>> = {
  "2026-10-07": {
    begleiter: "91575d94b01f68058e5f420fec3f018829921785dfedcf67502e39fe5819b07e",
    reading: "7d1097b93ee13c524d46fa39a592ab30a7e40350ee662520ea8380e4eab55574",
    muster: "cb6522209d9416de2d7fbf4edcbfb39c49dea07bd0a6a6805eb868b702ae6770",
    detektor: "517d38ee718f9c7c3ab7f881a450c5e5e21fdb64782d7e1d266b0c4566d72346",
  },
};

test("Textänderung ohne neue Einwilligungs-Version fällt auf", () => {
  const erwartet = WORTLAUT_JE_VERSION[KI_EINWILLIGUNG_VERSION];
  assert.ok(erwartet, `Version ${KI_EINWILLIGUNG_VERSION} fehlt in WORTLAUT_JE_VERSION`);
  for (const werkzeug of Object.keys(KI_EINWILLIGUNG) as KiWerkzeug[]) {
    const hash = createHash("sha256")
      .update(einwilligungsWortlaut(werkzeug), "utf8")
      .digest("hex");
    assert.equal(
      hash,
      erwartet[werkzeug],
      `Einwilligungstext „${werkzeug}" geändert → KI_EINWILLIGUNG_VERSION erhöhen und Hash ergänzen`,
    );
  }
});

test("jeder KI-Aufruf speichert vorher den Nachweis der Einwilligung", () => {
  const stellen: Record<KiWerkzeug, string> = {
    begleiter: "app/mitglieder/begleiter/antwort/route.ts",
    reading: "app/mitglieder/reading-actions.ts",
    muster: "app/mitglieder/muster-actions.ts",
    detektor: "app/mitglieder/detektor-actions.ts",
  };
  for (const [werkzeug, datei] of Object.entries(stellen)) {
    const code = src(datei);
    const nachweis = code.indexOf(`erfasseKiEinwilligung(supabase, "${werkzeug}")`);
    const aufruf = code.indexOf("new Anthropic(");
    assert.ok(nachweis > -1, `${datei}: kein Einwilligungsnachweis`);
    assert.ok(nachweis < aufruf, `${datei}: Nachweis muss VOR dem KI-Aufruf stehen`);
  }
  // Scheitert der Nachweis, bricht der Server ab (kein KI-Aufruf).
  assert.match(src("lib/ki-einwilligung-server.ts"), /return false;/);
});

test("Migration: Protokoll nur lesbar, Schreiben nur über die Funktion", () => {
  const sql = readFileSync(
    new URL("../../supabase/migrations/20261007120000_ki_einwilligungen.sql", import.meta.url),
    "utf8",
  );
  assert.match(sql, /enable row level security/);
  assert.match(sql, /for select\s+using \(auth\.uid\(\) = user_id\)/);
  assert.doesNotMatch(sql, /for (insert|update|delete|all)/);
  assert.match(sql, /security definer/);
  assert.match(sql, /values \(auth\.uid\(\),/);
  assert.match(sql, /grant execute on function public\.ki_einwilligung_erfassen\(text, text, text\) to authenticated/);
});
