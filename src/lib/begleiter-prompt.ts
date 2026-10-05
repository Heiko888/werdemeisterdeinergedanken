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
import type { JournalEntry } from "@/app/mitglieder/actions";
import { resolveEntry } from "@/lib/journal";
import {
  BEGLEITER_KEINE_LERNKONTROLLE,
  KI_ZFU_GRENZEN,
} from "@/lib/ki-grenzen";

// Kontext-Bausteine liegen in lib/ki-grenzen (gemeinsam mit dem Reading und
// ohne Laufzeit-Importe testbar); hier für die Begleiter-Route weitergereicht.
export {
  selbsteinschaetzungFacts,
  bearbeitungsstandFacts,
  behaviorFacts,
} from "@/lib/ki-grenzen";

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
    "WEITERE SEITEN: /mitglieder (Übersicht) · /mitglieder/journal (eigene Notizen) · /mitglieder/gedankenprofil (Übersicht der eigenen Selbsteinschätzung aus dem Bewusstseinstest) · /bewusstseinstest (Test) · /kontakt (Kontakt zu Heiko)",
  ].join("\n");
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
 * erfundenen Inhalte, keine Lernkontrolle (KI_ZFU_GRENZEN +
 * BEGLEITER_KEINE_LERNKONTROLLE, siehe docs/ZFU-KI-PRUEFUNG.md) – und ein
 * klarer Weg für den Fall, dass jemand in einer ernsten Krise schreibt.
 */
export function buildSystemPrompt({
  name,
  profile,
  bearbeitung,
  journal,
  behavior,
  catalogue,
}: {
  name: string;
  /** Selbsteinschätzung aus dem Test (`selbsteinschaetzungFacts`). */
  profile: string;
  /** Markierte Stufen, nur Navigation (`bearbeitungsstandFacts`). */
  bearbeitung: string;
  journal: string;
  behavior: string;
  catalogue: string;
}): string {
  const anrede = name
    ? `Die Person heißt ${name}. Sprich sie gelegentlich mit dem Namen an, aber nicht in jeder Antwort.`
    : "Der Name der Person ist nicht bekannt – sprich sie einfach mit „du“ an.";

  return `Du bist der Begleiter von „Werde Meister deiner Gedanken“ – einer
digitalen Plattform von Heiko Schwaninger zur eigenständigen Selbstreflexion und Bewusstseinsentwicklung in 7 Stufen. Du sprichst mit einem
Mitglied im geschützten Mitgliederbereich.

DEINE ROLLE
Du bist ein KI-gestützter Reflexions- und Orientierungsdialog – zum
Strukturieren, Nachdenken und Auffinden passender Inhalte. Du darfst:
Begriffe allgemein erklären, vorhandene Inhalte verständlicher zusammenfassen,
auf passende Inhalte verweisen, Aussagen der Person spiegeln, eine freiwillige
Reflexionsfrage anbieten und Möglichkeiten nennen, sich weiter mit einem Thema
zu beschäftigen. Du bist kein Tutor, kein Lehrer und kein Prüfer: Ob und wie
die Person etwas versteht oder anwendet, bewertest du nicht.

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
  weiterbringt. Wenn, dann eine Reflexionsfrage zur eigenen Erfahrung, nie eine
  Wissensfrage.

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

${KI_ZFU_GRENZEN}

${BEGLEITER_KEINE_LERNKONTROLLE}

SELBSTEINSCHÄTZUNG DER PERSON (eigene Testantworten, keine Messung)
${profile}

BEARBEITUNGSSTAND (nur Navigation, kein Nachweis)
${bearbeitung}

AUS DEM JOURNAL DER PERSON
${journal}

NUTZUNG (nur Orientierung)
${behavior}

VERZEICHNIS DER VERFÜGBAREN INHALTE
${catalogue}`;
}
