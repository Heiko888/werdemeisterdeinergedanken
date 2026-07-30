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
        "Deine Standortbestimmung entsteht aus dem, was du selbst einbringst – Stück für Stück. Mach den Bewusstseinstest und halte deine ersten Reflexionen fest; dann wächst hier nach und nach ein ehrliches Bild davon, wo du gerade stehst.",
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
      `Gerade jetzt scheint dein Schwerpunkt bei Stufe ${startStage} zu liegen – ${stage.name}, „${stage.tagline}". ${stage.result.summary}`,
    );
  } else {
    paragraphs.push(
      "Den Bewusstseinstest hast du noch nicht gemacht – deine Standortbestimmung lebt daher ganz von deinen Reflexionen. Ein Test würde das Bild schärfen, aber eilen musst du nichts.",
    );
  }

  // 2. Was sich in den Reflexionen zeigt
  if (reflectionCount > 0) {
    const { title, unique } = topTheme(entryTitles);
    let s = `In deinem Journal haben sich schon ${reflectionCount} ${
      reflectionCount === 1 ? "Reflexion" : "Reflexionen"
    } gesammelt, bei denen du innegehalten hast`;
    s += unique > 1 ? ` – über ${unique} verschiedene Themen hinweg.` : ".";
    if (title) {
      s += ` Eines kehrt dabei besonders oft wieder: „${title}". Dort scheint gerade etwas in Bewegung zu sein.`;
    }
    paragraphs.push(s);
  } else {
    paragraphs.push(
      "Reflexionen hast du noch keine festgehalten. Sobald du zu einer Frage etwas notierst – und sei es ein einziger Satz – wird dieses Bild persönlicher und feiner.",
    );
  }

  // 3. Fortschritt
  if (completedCount > 0) {
    paragraphs.push(
      `${completedCount} von 7 Stufen hast du für dich als abgeschlossen markiert. Und doch geht es hier nie ums Abhaken, sondern ums Wiederkommen – jede Stufe darf dich mehr als einmal begleiten.`,
    );
  }

  // 4. Entwicklung über die Zeit
  if (testHistory.length >= 2) {
    const first = testHistory[0].topStage;
    const last = testHistory[testHistory.length - 1].topStage;
    if (last > first) {
      paragraphs.push(
        `Zwischen deinen Tests hat sich dein Schwerpunkt von Stufe ${first} zu Stufe ${last} verschoben. Etwas ist in dir in Bewegung gekommen – das darf dich ruhig freuen.`,
      );
    } else if (last === first) {
      paragraphs.push(
        `Über deine Tests hinweg ist dein Schwerpunkt bei Stufe ${first} geblieben. Kein Stillstand – eher ein Boden, auf dem du gerade tiefer wurzelst.`,
      );
    } else {
      paragraphs.push(
        `Dein Schwerpunkt liegt gerade wieder näher bei Stufe ${last}. Auch das gehört dazu – ein Weg nach innen verläuft selten schnurgerade, und Zurückkehren ist kein Rückschritt.`,
      );
    }
  }

  // Nächster Schritt
  let nextStep: Standort["nextStep"] = null;
  if (stage && startStage) {
    paragraphs.push(
      `Wenn du magst, wartet hier ein guter nächster Schritt: ${stage.result.nextStep}`,
    );
    nextStep = {
      label: `Zu Stufe ${startStage} – ${stage.name}`,
      href: `/mitglieder/stufe/${startStage}`,
    };
  } else {
    nextStep = { label: "Bewusstseinstest starten", href: "/bewusstseinstest" };
  }

  return { hasData: true, paragraphs, nextStep };
}
