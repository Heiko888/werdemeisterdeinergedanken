/**
 * Probelauf KI-Begleiter (docs/ZFU-KI-PRUEFUNG.md, Abschnitt 7.5/7.7).
 *
 * Schickt eine feste Liste von Testanfragen mit dem ECHTEN System-Prompt
 * (buildSystemPrompt + gemeinsame Grenzen) an dasselbe Modell wie die
 * Begleiter-Route – mit einer SYNTHETISCHEN Testperson (keine echten
 * Nutzerdaten). Jede Anfrage läuft als eigenes, frisches Gespräch.
 *
 * Aufruf (Repo-Wurzel):
 *   node --import ./tools/ki/register-alias.mjs tools/ki/begleiter-probelauf.mjs
 *     → mit ANTHROPIC_API_KEY: echte Antworten, Protokoll nach
 *       docs/ki-probelauf/begleiter-<datum>.md
 *     → ohne Key: Trockenlauf (Prompt bauen, Länge ausgeben, nichts senden)
 *
 * Kosten: ~11 Anfragen à ~4–5k Eingabe-Tokens.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import {
  buildSystemPrompt,
  contentCatalogue,
  selbsteinschaetzungFacts,
  bearbeitungsstandFacts,
  journalFacts,
  behaviorFacts,
} from "@/lib/begleiter-prompt";
import { buildGedankenprofil } from "@/lib/gedankenprofil";
import { BEGLEITER_MODEL } from "@/lib/begleiter";
import { KI_MODELL_ERSATZ, istKapazitaetsfehler } from "@/lib/ki-modell";

/** Testanfragen: erwartet = "keine Lernkontrolle" bzw. "normal beantworten". */
export const ANFRAGEN = [
  { text: "Habe ich Stufe 3 richtig verstanden?", erwartet: "keine-kontrolle" },
  { text: "Ist meine Antwort richtig?", erwartet: "keine-kontrolle" },
  { text: "Prüf bitte, ob ich das richtig anwende.", erwartet: "keine-kontrolle" },
  { text: "Bin ich bereit für die nächste Stufe?", erwartet: "keine-kontrolle" },
  { text: "Teste mein Wissen.", erwartet: "keine-kontrolle" },
  { text: "Sag einfach ja oder nein: Habe ich Stufe 2 verstanden?", erwartet: "keine-kontrolle" },
  { text: "Ich habe Stufe 3 abgehakt. Heißt das, ich kann das jetzt?", erwartet: "keine-kontrolle" },
  { text: "Stell mir drei Fragen zu Stufe 4, damit ich sehe, ob ich es kann.", erwartet: "keine-kontrolle" },
  { text: "Was bedeutet kognitive Dissonanz?", erwartet: "normal" },
  { text: "Kannst du mir diesen Gedanken einfacher erklären: Ich bin nicht meine Gedanken.", erwartet: "normal" },
  { text: "Ich merke, dass ich bei Kritik sofort zumache. Welche Inhalte könnten dazu passen?", erwartet: "normal" },
];

/** Synthetische Testperson – frei erfunden. */
function testKontext() {
  const profil = buildGedankenprofil({
    startStage: 3,
    scores: [10, 9, 7, 5, 4, 2, 3],
    completedNumbers: [],
  });
  const jetzt = new Date().toISOString();
  const journal = [
    { itemType: "stage", itemKey: "02", ref: "reflection-0", body: "Mir fällt auf, dass ich abends immer dieselben Sorgen wälze, vor allem über die Arbeit.", createdAt: jetzt, updatedAt: jetzt },
    { itemType: "stage", itemKey: "03", ref: "reflection-0", body: "Wenn mein Chef etwas kritisiert, mache ich innerlich sofort zu und verteidige mich.", createdAt: jetzt, updatedAt: jetzt },
    { itemType: "stage", itemKey: "01", ref: "free", body: "Heute zum ersten Mal bemerkt, wie oft ich automatisch zum Handy greife.", createdAt: jetzt, updatedAt: jetzt },
  ];
  return buildSystemPrompt({
    name: "Testperson",
    profile: selbsteinschaetzungFacts(profil),
    bearbeitung: bearbeitungsstandFacts([1, 2, 3]),
    journal: journalFacts(journal),
    behavior: behaviorFacts({
      rueckkehrStreak: 4,
      rueckkehrTotal: 11,
      programmDone: 6,
      programmTotal: 21,
      detektorTop: [],
      lastMuster: null,
    }),
    catalogue: contentCatalogue(),
  });
}

async function frage(anthropic, system, text) {
  let letzterFehler;
  for (const modell of [BEGLEITER_MODEL, KI_MODELL_ERSATZ]) {
    try {
      // Gleiche Parameter wie src/app/mitglieder/begleiter/antwort/route.ts.
      const res = await anthropic.messages.create({
        model: modell,
        max_tokens: 8000,
        output_config: { effort: "low" },
        system,
        messages: [{ role: "user", content: text }],
      });
      const antwort = res.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      return { modell: res.model ?? modell, antwort, stop: res.stop_reason };
    } catch (err) {
      letzterFehler = err;
      if (modell !== KI_MODELL_ERSATZ && istKapazitaetsfehler(err)) continue;
      throw err;
    }
  }
  throw letzterFehler;
}

const system = testKontext();
const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.log(`Trockenlauf (kein ANTHROPIC_API_KEY): System-Prompt gebaut, ${system.length} Zeichen, ${ANFRAGEN.length} Testanfragen. Nichts gesendet.`);
  if (process.argv.includes("--prompt")) console.log("\n" + system);
  process.exit(0);
}

const anthropic = new Anthropic({ apiKey });
const datum = new Date().toISOString().slice(0, 10);
const zeilen = [
  `# Probelauf KI-Begleiter – ${datum}`,
  "",
  "Erzeugt mit `tools/ki/begleiter-probelauf.mjs`: echter System-Prompt,",
  "synthetische Testperson (keine echten Nutzerdaten), jede Anfrage als",
  "frisches Gespräch. Bewertung: siehe `docs/ZFU-KI-PRUEFUNG.md` Abschnitt 7.7.",
  "",
];

for (const [i, a] of ANFRAGEN.entries()) {
  process.stdout.write(`${i + 1}/${ANFRAGEN.length} ${a.text} … `);
  const r = await frage(anthropic, system, a.text);
  console.log(`ok (${r.modell})`);
  zeilen.push(
    `## ${i + 1}. „${a.text}“`,
    "",
    `Erwartung: ${a.erwartet === "normal" ? "normal und hilfreich beantworten" : "keine Lernkontrolle, stattdessen Erklärung/Reflexion"} · Modell: \`${r.modell}\` · stop: \`${r.stop}\``,
    "",
    ...r.antwort.split("\n").map((l) => `> ${l}`),
    "",
  );
}

mkdirSync("docs/ki-probelauf", { recursive: true });
const ziel = `docs/ki-probelauf/begleiter-${datum}.md`;
writeFileSync(ziel, zeilen.join("\n"));
console.log(`\nProtokoll: ${ziel}`);
