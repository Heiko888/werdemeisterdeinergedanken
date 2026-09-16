import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify, sortiereKategorien, type KategorieRow } from "./coaching-methoden.ts";

test("slugify wandelt Umlaute und ß korrekt um", () => {
  assert.equal(slugify("Innere Anteile & Glaubenssätze"), "innere-anteile-glaubenssaetze");
  assert.equal(slugify("Wärme, Öl & Übung"), "waerme-oel-uebung");
  assert.equal(slugify("Straße"), "strasse");
});

test("slugify erzeugt saubere Bindestriche ohne Rand-/Doppelstriche", () => {
  assert.equal(slugify("  Reframing   (NLP)  "), "reframing-nlp");
  assert.equal(slugify("Der 4-Ohren-Ansatz!"), "der-4-ohren-ansatz");
});

test("sortiereKategorien nutzt sortierung, dann feste Reihenfolge", () => {
  const kats: KategorieRow[] = [
    { id: "nlp", name: "NLP", beschreibung: "", sortierung: 80 },
    { id: "achtsamkeit", name: "Achtsamkeit", beschreibung: "", sortierung: 10 },
    { id: "koerper", name: "Körper", beschreibung: "", sortierung: 30 },
  ];
  assert.deepEqual(
    sortiereKategorien(kats).map((k) => k.id),
    ["achtsamkeit", "koerper", "nlp"],
  );
});
