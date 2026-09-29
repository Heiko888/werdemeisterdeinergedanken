import { test } from "node:test";
import assert from "node:assert/strict";
import { soforthilfen } from "./soforthilfe.ts";
import { getPractice } from "./practices.ts";
import { getDeepDive } from "./deep-dives.ts";

test("jede Soforthilfe verweist auf existierende Übungen und Vertiefungen", () => {
  for (const s of soforthilfen) {
    assert.ok(getPractice(s.practice), `Übung fehlt: ${s.practice}`);
    if (s.practiceAlt) {
      assert.ok(getPractice(s.practiceAlt), `Übung fehlt: ${s.practiceAlt}`);
    }
    assert.ok(getDeepDive(s.deepDive), `Vertiefung fehlt: ${s.deepDive}`);
  }
});

test("Soforthilfe-Slugs sind eindeutig", () => {
  const slugs = soforthilfen.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});
