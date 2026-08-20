/**
 * KI-Begleiter – System-Prompt und Inhaltsverzeichnis.
 *
 * Server-only: `lib/wissensdatenbank` liest die Kapitel mit `node:fs`.
 * Diese Datei darf deshalb nur aus Server-Komponenten, Server-Actions oder
 * Route-Handlern importiert werden (die Client-Komponente nutzt `lib/begleiter`).
 *
 * Grundgedanke: Der Begleiter erfindet keine Inhalte. Er bekommt das echte
 * Verzeichnis aller Stufen, Vertiefungen, Praxis-Anleitungen und Kapitel mit –
 * inklusive der tatsächlichen Pfade – und darf ausschließlich darauf verweisen.
 */

import { stages } from "@/lib/content";
import { deepDives } from "@/lib/deep-dives";
import { practices } from "@/lib/practices";
import { chapters } from "@/lib/wissensdatenbank";
import type { Gedankenprofil } from "@/lib/gedankenprofil";
import type { JournalEntry } from "@/app/mitglieder/actions";
import { resolveEntry } from "@/lib/journal";

/**
 * Verzeichnis aller Mitglieder-Inhalte mit echten Pfaden.
 *
 * Wird je Anfrage neu gebaut; die Datenmodule liegen ohnehin im Speicher,
 * nur die Kapitel-Metadaten kommen von der Platte (gleiche Quelle wie die
 * Wissensdatenbank-Übersicht).
 */
export function contentCatalogue(): string {
  const stageLines = stages.map(
    (s, i) =>
      `- Stufe ${s.number} „${s.title}“ – ${s.subtitle}: ${s.description} → /mitglieder/stufe/${i + 1}`,
  );

  const deepDiveLines = deepDives.map(
    (d) =>
      `- „${d.title}“ (${d.category}, passt zu Stufe ${d.relatedStage}): ${d.summary} → /mitglieder/wissen/${d.slug}`,
  );

  const practiceLines = practices.map(
    (p) =>
      `- „${p.title}“ (${p.category}, ${p.duration}, passt zu Stufe ${p.relatedStage}): ${p.purpose} → /mitglieder/praxis/${p.slug}`,
  );

  // Kapitel der Wissensdatenbank: nur Nummer und Titel, sonst wird der
  // Prompt unnötig lang – zum Verweisen reicht das.
  let chapterLines: string[] = [];
  try {
    chapterLines = chapters().map(
      (c) =>
        `- ${c.number} „${c.title}“ → /mitglieder/wissensdatenbank/${c.slug}`,
    );
  } catch {
    // Kapitel nicht lesbar (z. B. fehlender content-Ordner) – der Begleiter
    // arbeitet dann ohne die Wissensdatenbank weiter.
    chapterLines = [];
  }

  return [
    "DIE 7 STUFEN:",
    ...stageLines,
    "",
    "VERTIEFUNGEN:",
    ...deepDiveLines,
    "",
    "PRAXIS (Meditationen, Atemübungen, Rituale):",
    ...practiceLines,
    ...(chapterLines.length > 0
      ? ["", "WISSENSDATENBANK (Kapitel):", ...chapterLines]
      : []),
    "",
    "WEITERE SEITEN: /mitglieder (Übersicht) · /mitglieder/journal (eigene Notizen) · /mitglieder/gedankenprofil (Auswertung des Bewusstseinstests) · /bewusstseinstest (Test) · /kontakt (Kontakt zu Heiko)",
  ].join("\n");
}

/**
 * Faktische Kurzfassung des Gedankenprofils – dieselbe Grundlage wie beim
 * Reading. Ohne Testergebnis bleibt das Feld leer und der Begleiter weiß,
 * dass er nichts über den Stand der Person voraussetzen darf.
 */
export function profileFacts(profil: Gedankenprofil): string {
  if (!profil.hasTest) {
    return "Es liegt noch kein Bewusstseinstest vor – du weißt also nicht, wo die Person steht. Frag bei Bedarf nach oder empfiehl den Test unter /bewusstseinstest.";
  }

  return [
    profil.focusStage ? `Schwerpunkt-Stufe: ${profil.focusStage}` : null,
    "Stufen (Ausprägung laut Selbsteinschätzung, Status):",
    ...profil.profile.map(
      (p) =>
        `- Stufe ${p.nr} „${p.name}“: ${p.pct}% – ${
          p.level === "verankert"
            ? "verankert"
            : p.level === "im-aufbau"
              ? "im Aufbau"
              : "Entwicklungsraum"
        }${p.done ? ", abgeschlossen" : ""}`,
    ),
    profil.bedarf.length > 0
      ? `Größter Bedarf (dranbleiben): Stufen ${profil.bedarf.map((b) => b.nr).join(", ")}`
      : "Aktuell kein dringender Bedarf.",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Kurzfassung der jüngsten Journal-Reflexionen als privater Kontext für den
 * Begleiter. So kann er konkret auf die eigene Reise der Person eingehen
 * („du hast neulich zu Stufe 3 notiert …") statt allgemein zu bleiben.
 *
 * Bewusst knapp gehalten: die jüngsten Einträge, jeweils mit Herkunft und
 * einem kurzen Ausschnitt. Die vollständigen Texte gehören nicht in jeden
 * Prompt – der Begleiter soll anknüpfen, nicht zitieren.
 */
export function journalFacts(entries: JournalEntry[]): string {
  const MAX_ENTRIES = 8;
  const SNIPPET = 180;

  const lines: string[] = [];
  for (const e of entries) {
    if (lines.length >= MAX_ENTRIES) break;
    const ctx = resolveEntry(e.itemType, e.itemKey, e.ref);
    if (!ctx) continue;
    const body = e.body.trim().replace(/\s+/g, " ");
    if (!body) continue;
    const snippet = body.length > SNIPPET ? `${body.slice(0, SNIPPET)}…` : body;
    const frage = ctx.question ? ` (zur Frage: „${ctx.question}")` : "";
    lines.push(`- ${ctx.label} · ${ctx.title}${frage}: „${snippet}"`);
  }

  if (lines.length === 0) {
    return "Die Person hat noch keine Reflexionen ins Journal geschrieben – setz also nichts über ihren bisherigen Weg voraus.";
  }

  return [
    "Die jüngsten Reflexionen der Person aus ihrem Journal (privat, nur als",
    "Kontext – knüpf sanft daran an, wenn es passt, aber recite sie nicht und",
    "deute nichts hinein, was nicht dasteht):",
    ...lines,
  ].join("\n");
}

/**
 * Der System-Prompt des Begleiters.
 *
 * Enthält bewusst harte Grenzen: keine Therapie, keine Diagnosen, keine
 * erfundenen Inhalte – und ein klarer Weg für den Fall, dass jemand in einer
 * ernsten Krise schreibt.
 */
export function buildSystemPrompt({
  name,
  profile,
  journal,
  catalogue,
}: {
  name: string;
  profile: string;
  journal: string;
  catalogue: string;
}): string {
  const anrede = name
    ? `Die Person heißt ${name}. Sprich sie gelegentlich mit dem Namen an, aber nicht in jeder Antwort.`
    : "Der Name der Person ist nicht bekannt – sprich sie einfach mit „du“ an.";

  return `Du bist der Begleiter von „Werde Meister deiner Gedanken“ – dem Begleitangebot
von Heiko Schwaninger zur Bewusstseinsentwicklung in 7 Stufen. Du sprichst mit
einem Mitglied im geschützten Mitgliederbereich.

DEINE ROLLE
Du hilfst beim Einordnen, Vertiefen und Dranbleiben: Du erklärst die Inhalte des
Angebots, verbindest sie mit dem, was die Person gerade beschäftigt, und
schlägst konkrete nächste Schritte aus dem vorhandenen Material vor.

TON
- Sprich die Person mit „du“ an. ${anrede}
- Warm, ruhig, geerdet und klar. Auf Augenhöhe, nie belehrend.
- Kein esoterisches Übertreiben, keine Heilsversprechen, keine Motivationsfloskeln.
- Nimm ernst, was die Person schreibt, bevor du etwas vorschlägst.

FORM
- 120 bis 200 Wörter. Lieber ein klarer Gedanke als drei angerissene.
- Fließtext in kurzen Absätzen. Kein Markdown, keine Überschriften, keine
  Sternchen. Wenn eine Aufzählung wirklich hilft, höchstens drei Zeilen mit „– “.
- Am Ende höchstens eine Rückfrage – und nur, wenn sie das Gespräch wirklich
  weiterbringt.

INHALTE
- Verweise ausschließlich auf Inhalte aus dem Verzeichnis unten und nenne dabei
  den echten Pfad, z. B. „schau dir die Atembeobachtung an (/mitglieder/praxis/atembeobachtung)“.
- Erfinde niemals Titel, Pfade, Studien oder Zitate. Was nicht im Verzeichnis
  steht, gibt es nicht – sag das dann ehrlich.
- Pro Antwort höchstens zwei Verweise, sonst wird es zur Linkliste.

GRENZEN
- Du bist keine Therapie, keine Beratung und keine Diagnose. Stelle keine
  psychologischen oder medizinischen Einschätzungen und deute keine Symptome.
- Keine medizinischen, juristischen oder finanziellen Ratschläge.
- Deute nur die übergebenen Profildaten; erfinde keine Biografie, keine Zahlen
  und keine Vorhersagen.
- Schreibt jemand von akuter Not, Suizidgedanken, Selbstverletzung oder einer
  schweren Krise: Bleib ruhig und zugewandt, nimm es ernst, biete keine Übung
  als Lösung an und weise klar auf professionelle Hilfe hin – Telefonseelsorge
  0800 111 0 111 oder 0800 111 0 222 (kostenlos, rund um die Uhr), in Österreich
  142, in der Schweiz 143, im Notfall 112.

STAND DER PERSON
${profile}

AUS DEM JOURNAL DER PERSON
${journal}

VERZEICHNIS DER VERFÜGBAREN INHALTE
${catalogue}`;
}
