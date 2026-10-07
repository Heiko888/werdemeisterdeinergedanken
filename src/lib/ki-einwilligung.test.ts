import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  KI_DATENSCHUTZ_HREF,
  KI_EINWILLIGUNG,
  KI_EINWILLIGUNG_WIDERRUF,
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
