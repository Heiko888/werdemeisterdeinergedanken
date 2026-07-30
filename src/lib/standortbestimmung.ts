/**
 * Regelbasierte „Standortbestimmung" – eine geerdete Spiegelung aus den
 * eigenen Daten der Person (Bewusstseinstest, Fortschritt, Reflexionen).
 * Bewusst KEINE Vorhersage/Manifestation, sondern ein Zusammenfassen dessen,
 * was ohnehin schon da ist – mit einem konkreten nächsten Schritt.
 *
 * Deterministisch und serverseitig: es verlässt nichts den Server.
 */
import { testStages } from "@/lib/consciousness-test";
import type { TestPoint } from "@/app/mitglieder/actions";

export type StandortInput = {
  /** Schwerpunkt-Stufe aus dem Test (1–7) oder null */
  startStage: number | null;
  /** Abgeschlossene Stufen */
  completedCount: number;
  /** Herkunfts-Titel je Reflexion (ein Eintrag pro gespeicherter Reflexion) */
  entryTitles: string[];
  /** Verlauf der Testergebnisse (älteste zuerst) */
  testHistory: TestPoint[];
};

export type Standort = {
  hasData: boolean;
  /** Einladungstext, falls noch keine Daten vorliegen */
  invite?: string;
  paragraphs: string[];
  nextStep: { label: string; href: string } | null;
};

/** Häufigsten Titel + Anzahl unterschiedlicher Titel bestimmen. */
function topTheme(titles: string[]): { title: string | null; unique: number } {
  const counts = new Map<string, number>();
  for (const t of titles) counts.set(t, (counts.get(t) ?? 0) + 1);
  let title: string | null = null;
  let max = 0;
  for (const [t, c] of counts) {
    if (c > max) {
      max = c;
      title = t;
    }
  }
  return { title, unique: counts.size };
}

export function buildStandort(input: StandortInput): Standort {
  const { startStage, completedCount, entryTitles, testHistory } = input;
  const reflectionCount = entryTitles.length;

  // Ganz ohne Daten: freundliche Einladung.
  if (!startStage && reflectionCount === 0) {
    return {
      hasData: false,
      invite:
        "Deine Standortbestimmung entsteht aus dem, was du selbst einbringst. Mach den Bewusstseinstest und schreib deine ersten Reflexionen – dann fasse ich hier für dich zusammen, wo du gerade stehst.",
      paragraphs: [],
      nextStep: { label: "Bewusstseinstest starten", href: "/bewusstseinstest" },
    };
  }

  const paragraphs: string[] = [];
  const stage =
    startStage && startStage >= 1 && startStage <= testStages.length
      ? testStages[startStage - 1]
      : null;

  // 1. Schwerpunkt
  if (stage && startStage) {
    paragraphs.push(
      `Dein Schwerpunkt liegt gerade auf Stufe ${startStage} – ${stage.name}: „${stage.tagline}". ${stage.result.summary}`,
    );
  } else {
    paragraphs.push(
      "Du hast den Bewusstseinstest noch nicht gemacht – deine Standortbestimmung stützt sich daher allein auf deine Reflexionen. Ein Test würde das Bild schärfen.",
    );
  }

  // 2. Was sich in den Reflexionen zeigt
  if (reflectionCount > 0) {
    const { title, unique } = topTheme(entryTitles);
    let s = `Du hast bisher zu ${reflectionCount} ${
      reflectionCount === 1 ? "Frage" : "Fragen"
    } reflektiert`;
    s +=
      unique > 1
        ? `, verteilt über ${unique} Themen.`
        : ".";
    if (title) {
      s += ` Am meisten beschäftigt dich zurzeit „${title}" – dorthin kehrst du am häufigsten zurück.`;
    }
    paragraphs.push(s);
  } else {
    paragraphs.push(
      "Reflexionen hast du noch keine geschrieben. Sobald du zu einer Frage in einer Stufe oder Vertiefung etwas festhältst, wird deine Standortbestimmung persönlicher.",
    );
  }

  // 3. Fortschritt
  if (completedCount > 0) {
    paragraphs.push(
      `Auf deinem Weg hast du ${completedCount} von 7 Stufen als abgeschlossen markiert. Es geht nicht ums Abhaken, sondern ums Wiederkommen – jede Stufe darf dich mehrfach begleiten.`,
    );
  }

  // 4. Entwicklung über die Zeit
  if (testHistory.length >= 2) {
    const first = testHistory[0].topStage;
    const last = testHistory[testHistory.length - 1].topStage;
    if (last > first) {
      paragraphs.push(
        `Über deine Tests hat sich dein Schwerpunkt von Stufe ${first} zu Stufe ${last} bewegt – ein sichtbares Zeichen von Entwicklung.`,
      );
    } else if (last === first) {
      paragraphs.push(
        `Dein Schwerpunkt ist über die Tests stabil bei Stufe ${first} geblieben – ein guter Boden, um genau hier tiefer zu gehen.`,
      );
    } else {
      paragraphs.push(
        `Dein Schwerpunkt liegt aktuell wieder stärker bei Stufe ${last}. Auch das Zurückkehren gehört zum Weg – Entwicklung verläuft selten geradlinig.`,
      );
    }
  }

  // Nächster Schritt
  let nextStep: Standort["nextStep"] = null;
  if (stage && startStage) {
    paragraphs.push(`Dein nächster Schritt: ${stage.result.nextStep}`);
    nextStep = {
      label: `Zu Stufe ${startStage} – ${stage.name}`,
      href: `/mitglieder/stufe/${startStage}`,
    };
  } else {
    nextStep = { label: "Bewusstseinstest starten", href: "/bewusstseinstest" };
  }

  return { hasData: true, paragraphs, nextStep };
}
