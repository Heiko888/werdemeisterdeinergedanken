import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  KI_ZFU_GRENZEN,
  BEGLEITER_KEINE_LERNKONTROLLE,
  selbsteinschaetzungFacts,
  bearbeitungsstandFacts,
  behaviorFacts,
  readingSystemPrompt,
  musterSystemPrompt,
} from "./ki-grenzen.ts";
import type { Gedankenprofil } from "./gedankenprofil.ts";

/**
 * Prompt- und Kontextregeln gegen individuelle Lernkontrolle
 * (docs/ZFU-KI-PRUEFUNG.md). Keine Anthropic-Aufrufe – geprüft wird, was an
 * die KI ginge, nicht ihre Antwort.
 */

const src = (pfad: string) =>
  readFileSync(new URL(`../${pfad}`, import.meta.url), "utf8");

/** Kritische Beispielanfragen aus der Prüfung. */
const KRITISCHE_ANFRAGEN = [
  "Habe ich Stufe 3 richtig verstanden?",
  "Prüfe, ob meine Antwort stimmt.",
  "Bin ich bereit für die nächste Stufe?",
  "Bewerte bitte, ob ich das Konzept richtig angewendet habe.",
  "Teste mein Wissen zu Stufe 4.",
];

/** Wörter, die im KI-KONTEXT (nicht im Regeltext) nie auftauchen dürfen. */
const LERNSTAND_WOERTER =
  /abgeschlossen|verankert|Entwicklungsraum|Bedarf|beherrsch|geschafft|bestanden|Lernziel|durch!/i;

const profil: Gedankenprofil = {
  hasTest: true,
  profile: [1, 2, 3, 4, 5, 6, 7].map((nr) => ({
    nr,
    name: `Name ${nr}`,
    tagline: `Tagline ${nr}`,
    pct: [90, 70, 50, 40, 20, 10, 60][nr - 1],
    // Selbst wenn markierte Stufen im Profil stecken, darf nichts davon in
    // den KI-Kontext durchsickern.
    done: nr <= 3,
    level: "verankert",
  })),
  focusStage: 2,
  bedarf: [],
  strengths: [1],
  summary: "",
  empfehlung: null,
};

test("gemeinsame Grenze deckt alle roten Linien ab", () => {
  for (const muss of [
    /Wissen und kein Verständnis/,
    /richtig oder falsch/,
    /„richtigen Lösung"/,
    /richtig anwendet/,
    /keine Note, kein bestanden\/nicht bestanden/,
    /Lernziele/,
    /beherrscht/,
    /bereit für die nächste Stufe/,
    /reine Orientierung/,
  ]) {
    assert.match(KI_ZFU_GRENZEN, muss);
  }
});

test("Begleiter-Regel nennt jede kritische Anfrage und die Ersatzreaktion", () => {
  const regel = BEGLEITER_KEINE_LERNKONTROLLE.replace(/\s+/g, " ");
  for (const anfrage of KRITISCHE_ANFRAGEN) {
    assert.ok(regel.includes(anfrage), `Begleiter-Regel deckt nicht ab: ${anfrage}`);
  }
  assert.match(BEGLEITER_KEINE_LERNKONTROLLE, /Führe keine Kontrolle durch/);
  assert.match(BEGLEITER_KEINE_LERNKONTROLLE, /Ich bewerte\s+nicht, ob du das richtig verstanden hast/);
  assert.match(BEGLEITER_KEINE_LERNKONTROLLE, /noch einmal erklären/);
  assert.match(BEGLEITER_KEINE_LERNKONTROLLE, /Reflexionsfrage/);
  // Kein Dauer-Disclaimer bei normalen Fragen.
  assert.match(BEGLEITER_KEINE_LERNKONTROLLE, /NUR, wenn ausdrücklich/);
});

test("Begleiter stellt keine Quizfragen, Reflexionsfragen bleiben erlaubt", () => {
  assert.match(BEGLEITER_KEINE_LERNKONTROLLE, /KEIN QUIZ/);
  assert.match(BEGLEITER_KEINE_LERNKONTROLLE, /keine Fragen, um Wissen abzufragen/);
  assert.match(BEGLEITER_KEINE_LERNKONTROLLE, /Was davon erkennst du in\s+deinem Alltag wieder/);
});

test("Selbsteinschätzung enthält weder Häkchen noch Lernstandsbegriffe", () => {
  const facts = selbsteinschaetzungFacts(profil);
  assert.doesNotMatch(facts, LERNSTAND_WOERTER);
  assert.match(facts, /Selbsteinschätzung/);
  assert.match(facts, /kein Defizit/);
  assert.match(facts, /Schwerpunkt der aktuellen Selbsteinschätzung: Stufe 2/);
  // Ohne Test: nichts voraussetzen.
  const ohne = selbsteinschaetzungFacts({ ...profil, hasTest: false, profile: [] });
  assert.match(ohne, /noch keine Selbsteinschätzung/);
});

test("Bearbeitungsstand ist reine Navigation, kein Nachweis", () => {
  const facts = bearbeitungsstandFacts([2, 1, 2]);
  assert.match(facts, /als bearbeitet markierte Stufen: 1, 2\./);
  assert.match(facts, /kein Abschluss, kein Nachweis/);
  assert.doesNotMatch(facts, /erfolgreich|geschafft|bereit/i);
  assert.match(bearbeitungsstandFacts([]), /noch keine Stufe/);
});

test("Nutzungsdaten klingen nicht nach Leistung", () => {
  const facts = behaviorFacts({
    rueckkehrStreak: 5,
    rueckkehrTotal: 12,
    programmDone: 21,
    programmTotal: 21,
    practicesDone: 4,
    detektorTop: ["Knappheit"],
  });
  assert.doesNotMatch(facts, LERNSTAND_WOERTER);
  assert.match(facts, /21 von 21 Tagen als erledigt markiert/);
  assert.match(facts, /kein Leistungsnachweis/);
});

test("Reading- und Spiegel-Prompt binden die gemeinsame Grenze ein", () => {
  for (const prompt of [readingSystemPrompt(), musterSystemPrompt()]) {
    assert.ok(prompt.includes(KI_ZFU_GRENZEN));
  }
  assert.match(readingSystemPrompt(), /keine objektive Bewertung/);
  assert.match(readingSystemPrompt(), /Nachholbedarf/); // als Verbot genannt
  assert.doesNotMatch(readingSystemPrompt(), /noch einmal dranzugehen/);
  assert.match(musterSystemPrompt(), /Du hast offensichtlich gelernt/); // als Verbot
});

test("KI-Aufrufe nutzen die zentralen Prompts und Kontexte", () => {
  const begleiter = src("lib/begleiter-prompt.ts");
  assert.match(begleiter, /\$\{KI_ZFU_GRENZEN\}/);
  assert.match(begleiter, /\$\{BEGLEITER_KEINE_LERNKONTROLLE\}/);
  assert.doesNotMatch(begleiter, /Du hilfst beim Einordnen, Vertiefen und Dranbleiben/);

  const route = src("app/mitglieder/begleiter/antwort/route.ts");
  assert.match(route, /selbsteinschaetzungFacts\(profil\)/);
  assert.match(route, /completedNumbers: \[\] \}/);

  const reading = src("app/mitglieder/reading-actions.ts");
  assert.match(reading, /readingSystemPrompt\(\)/);
  // Das Reading bekommt keine markierten Stufen mehr.
  assert.doesNotMatch(reading, /await getCompletedStages\(/);

  assert.match(src("app/mitglieder/muster-actions.ts"), /musterSystemPrompt\(\)/);

  const detektor = src("app/mitglieder/detektor-actions.ts");
  assert.match(detektor, /nicht die Person/);
});

test("Einstiegsvorschläge laden nicht zur Selbstbewertung ein", () => {
  const begleiter = src("lib/begleiter.ts");
  assert.doesNotMatch(begleiter, /Wo stehe ich gerade/);
  assert.doesNotMatch(begleiter, /Woran kann das liegen/);
});
