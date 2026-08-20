import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveVorlagenFile } from "./vorlagen-datei.ts";

const ROOT = "/srv/app/content/vorlagen";

test("erlaubt eine gültige Datei innerhalb des Wurzelverzeichnisses", () => {
  const res = resolveVorlagenFile(["workshop", "plan.pdf"], ROOT);
  assert.ok(res, "sollte aufgelöst werden");
  assert.equal(res.file, `${ROOT}/workshop/plan.pdf`);
  assert.equal(res.name, "plan.pdf");
  assert.equal(res.type, "application/pdf");
  assert.equal(res.disposition, "attachment");
});

test("liefert Bilder inline aus", () => {
  const res = resolveVorlagenFile(["vorschau.webp"], ROOT);
  assert.ok(res);
  assert.equal(res.type, "image/webp");
  assert.equal(res.disposition, "inline");
});

test("blockt ../-Traversal (relativer Ausbruch)", () => {
  assert.equal(resolveVorlagenFile(["..", "geheim.pdf"], ROOT), null);
  assert.equal(
    resolveVorlagenFile(["a", "..", "..", "etc", "passwd.pdf"], ROOT),
    null,
  );
  assert.equal(resolveVorlagenFile(["..%2f..", "x.pdf"], ROOT), null);
});

test("blockt absolute Pfade", () => {
  assert.equal(resolveVorlagenFile(["/etc/passwd.pdf"], ROOT), null);
  assert.equal(resolveVorlagenFile(["/", "etc", "passwd.pdf"], ROOT), null);
});

test("blockt Nullbytes", () => {
  assert.equal(resolveVorlagenFile(["datei\0.pdf"], ROOT), null);
});

test("blockt nicht erlaubte Dateitypen", () => {
  assert.equal(resolveVorlagenFile(["notiz.txt"], ROOT), null);
  assert.equal(resolveVorlagenFile(["skript.js"], ROOT), null);
  assert.equal(resolveVorlagenFile(["ohne-endung"], ROOT), null);
  assert.equal(resolveVorlagenFile([".env"], ROOT), null);
});

test("blockt doppelt kodierte Traversal-Reste (bleiben ohne gültige Endung)", () => {
  // Käme so nur bei fehlerhaftem Decoding an – landet mangels erlaubter
  // Endung ohnehin bei null.
  assert.equal(resolveVorlagenFile(["%2e%2e%2fgeheim"], ROOT), null);
});

test("normalisiert harmlose Pfade korrekt", () => {
  const res = resolveVorlagenFile(["a", ".", "b", "bild.png"], ROOT);
  assert.ok(res);
  assert.equal(res.file, `${ROOT}/a/b/bild.png`);
  assert.equal(res.type, "image/png");
});
