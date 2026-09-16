/**
 * Regelbasiertes „Gedankenprofil" mit Bedarfsanalyse.
 *
 * Nimmt die bereits gespeicherten Daten der Person (Bewusstseinstest-Ergebnis
 * pro Stufe + abgeschlossene Stufen) und macht daraus zwei Dinge:
 *
 *   1. ein Profil über alle 7 Stufen (wie verankert ist jede Stufe?)
 *   2. eine Bedarfsanalyse: wo lohnt es sich, noch einmal dranzugehen?
 *
 * Deterministisch und serverseitig – es verlässt nichts den Server, und es ist
 * bewusst KEINE Vorhersage, sondern nur ein Zusammenfassen dessen, was die
 * Person selbst eingebracht hat.
 */
import {
  testStages,
  MAX_PER_STAGE,
  type TestStage,
} from "@/lib/consciousness-test";
import { practicesForStage } from "@/lib/practices";
import { deepDivesForStage } from "@/lib/deep-dives";

/** Wie stark ist eine Stufe laut Selbsteinschätzung ausgeprägt? */
export type StageLevel = "verankert" | "im-aufbau" | "entwicklungsraum";

/** Schwellen (in %) für die Einordnung der Stufen-Punktzahl. */
const ANCHORED_MIN = 66; // ab hier „verankert"
const BUILDING_MIN = 33; // ab hier „im Aufbau", darunter „Entwicklungsraum"

export type StageProfile = {
  nr: number;
  name: string;
  tagline: string;
  /** Punktzahl der Stufe aus dem Test, in Prozent (0–100). */
  pct: number;
  /** Als abgeschlossen markiert? */
  done: boolean;
  level: StageLevel;
};

export type BedarfItem = {
  nr: number;
  name: string;
  tagline: string;
  /** Warum hier noch Bedarf besteht. */
  reason: string;
  /** Konkreter nächster Schritt in Worten. */
  suggestion: string;
  /** Link zur Stufe. */
  href: string;
  /** Passende Praxis (optional). */
  practice?: { title: string; slug: string };
  /** Passende Vertiefung (optional). */
  deepDive?: { title: string; slug: string };
};

/**
 * Ein testabhängiger nächster-Schritt-Vorschlag (B7): je nach Schwerpunkt-Stufe
 * und Programm-Fortschritt entweder ins 21-Tage-Programm, in die tägliche
 * Rückkehr oder in die Vertiefungen.
 */
export type StartEmpfehlung = {
  kind: "programm" | "rueckkehr" | "vertiefen";
  title: string;
  text: string;
  href: string;
  cta: string;
};

export type Gedankenprofil = {
  /** Liegen verwertbare Testdaten vor? */
  hasTest: boolean;
  /** Einladungstext, falls noch kein Test gemacht wurde. */
  invite?: string;
  /** Profil über alle 7 Stufen (Stufe 1 → 7). */
  profile: StageProfile[];
  /** Schwerpunkt-Stufe aus dem Test (1–7) oder null. */
  focusStage: number | null;
  /** Stufen mit dem größten Bedarf, priorisiert (höchster zuerst). */
  bedarf: BedarfItem[];
  /** Nummern der bereits gut verankerten Stufen. */
  strengths: number[];
  /** Ein zusammenfassender Absatz. */
  summary: string;
  /** Testabhängige Empfehlung für den nächsten Schritt (oder null). */
  empfehlung: StartEmpfehlung | null;
};

export type GedankenprofilInput = {
  /** Schwerpunkt-Stufe aus dem Test (1–7) oder null. */
  startStage: number | null;
  /** Punkte je Stufe (Index 0 = Stufe 1), 0–12; null wenn kein Test. */
  scores: number[] | null;
  /** Als abgeschlossen markierte Stufen-Nummern (1–7). */
  completedNumbers: number[];
  /** Abgeschlossene Tage im 21-Tage-Programm (0–21). Für die Empfehlung. */
  programmDone?: number;
};

/**
 * Leitet den konkretesten nächsten Schritt aus Schwerpunkt-Stufe und
 * Programm-Fortschritt ab. Deterministisch, ohne Datenbankzugriff.
 */
function startEmpfehlung(
  focusStage: number | null,
  programmDone: number,
): StartEmpfehlung {
  if (programmDone >= 21) {
    return {
      kind: "rueckkehr",
      title: "Vom Programm in den Alltag",
      text: "Du hast die 21 Tage durch – jetzt hält die tägliche Rückkehr das, was du aufgebaut hast, lebendig. Ein bewusster Moment pro Tag genügt.",
      href: "/mitglieder/rueckkehr",
      cta: "Zur täglichen Rückkehr",
    };
  }

  if (programmDone > 0) {
    return {
      kind: "programm",
      title: "Bleib am Programm dran",
      text: `Du bist bei Tag ${programmDone} von 21 im „Autopilot-Ausstieg". Der nächste kleine Schritt wartet schon.`,
      href: "/mitglieder/programm",
      cta: "Programm fortsetzen",
    };
  }

  // Noch nicht gestartet: niedriger Schwerpunkt → Programm, höherer → vertiefen.
  if (focusStage == null || focusStage <= 3) {
    return {
      kind: "programm",
      title: "Dein konkretester Startpunkt",
      text: "Für deinen Schwerpunkt ist der geführte Bogen „21 Tage Autopilot-Ausstieg“ der klarste nächste Schritt – ein kleiner Impuls und eine 2–5-Minuten-Übung pro Tag.",
      href: "/mitglieder/programm",
      cta: "Programm starten",
    };
  }

  return {
    kind: "vertiefen",
    title: "Vertiefen, wo du schon stehst",
    text: "Dein Schwerpunkt liegt weiter oben – statt bei null anzufangen, vertief die Stufen gezielt mit den passenden Vertiefungen und der Wissensdatenbank.",
    href: "/mitglieder/wissen",
    cta: "Zu den Vertiefungen",
  };
}

function levelOf(pct: number): StageLevel {
  if (pct >= ANCHORED_MIN) return "verankert";
  if (pct >= BUILDING_MIN) return "im-aufbau";
  return "entwicklungsraum";
}

/** Erste passende Praxis für eine Stufe (schlank aufs Nötige reduziert). */
function practiceFor(nr: number): BedarfItem["practice"] {
  const p = practicesForStage(nr)[0];
  return p ? { title: p.title, slug: p.slug } : undefined;
}

/** Erste passende Vertiefung für eine Stufe. */
function deepDiveFor(nr: number): BedarfItem["deepDive"] {
  const d = deepDivesForStage(nr)[0];
  return d ? { title: d.title, slug: d.slug } : undefined;
}

/**
 * Bedarfs-Gewicht einer Stufe. Höher = dringender noch einmal dranzugehen.
 * Gibt 0 zurück, wenn hier gerade kein sinnvoller Bedarf besteht.
 *
 * Die Idee: Bedarf entsteht dort, wo eine Stufe noch nicht verankert ist –
 * besonders, wenn sie unter oder auf dem aktuellen Schwerpunkt liegt (eine
 * Grundlage, die noch wackelt) oder der Schwerpunkt selbst noch nicht
 * abgeschlossen ist.
 */
function bedarfWeight(
  p: StageProfile,
  focusStage: number | null,
): number {
  // Voll verankert und abgeschlossen → hier ist erst mal kein Bedarf.
  if (p.level === "verankert" && p.done) return 0;

  let w = 0;

  // Grundgewicht aus dem, was zur Verankerung noch fehlt.
  w += 100 - p.pct;

  // Noch nicht abgeschlossen → deutlich relevanter, hier weiterzumachen.
  if (!p.done) w += 30;

  // Grundlagen unter dem Schwerpunkt, die noch schwach sind, wiegen schwer:
  // Wer weiter „oben" steht, aber eine frühe Stufe kaum ausgeprägt hat, hat
  // dort eine wacklige Basis.
  if (focusStage && p.nr < focusStage && p.level === "entwicklungsraum") {
    w += 40;
  }

  // Der aktuelle Schwerpunkt selbst ist der natürlichste Ort weiterzuarbeiten.
  if (focusStage && p.nr === focusStage && !p.done) {
    w += 25;
  }

  // Stufen deutlich über dem Schwerpunkt sind noch nicht „dran" – kein echter
  // Bedarf, nur weil die Punktzahl (erwartbar) niedrig ist.
  if (focusStage && p.nr > focusStage + 1) {
    w = Math.max(0, w - 60);
  }

  return Math.round(w);
}

/** Begründung + Vorschlag je nach Lage der Stufe formulieren. */
function reasonFor(
  p: StageProfile,
  stage: TestStage,
  focusStage: number | null,
): { reason: string; suggestion: string } {
  const belowFocus = focusStage != null && p.nr < focusStage;
  const isFocus = focusStage != null && p.nr === focusStage;

  if (belowFocus && p.level === "entwicklungsraum") {
    return {
      reason: `Diese Stufe liegt unter deinem Schwerpunkt, ist aber erst schwach ausgeprägt (${p.pct}%). Eine Grundlage, die noch wackelt – und die weiter oben viel trägt.`,
      suggestion: stage.result.nextStep,
    };
  }

  if (isFocus && !p.done) {
    return {
      reason: `Hier liegt gerade dein Schwerpunkt (${p.pct}%), und du hast die Stufe noch nicht als abgeschlossen markiert. Der natürlichste Ort, um dranzubleiben.`,
      suggestion: stage.result.nextStep,
    };
  }

  if (p.level === "entwicklungsraum") {
    return {
      reason: `Diese Stufe ist bislang kaum ausgeprägt (${p.pct}%). Hier ist noch viel Entwicklungsraum.`,
      suggestion: stage.result.nextStep,
    };
  }

  if (p.level === "im-aufbau") {
    return {
      reason: `Diese Stufe ist im Aufbau (${p.pct}%) – ein gutes Fundament ist da, aber noch nicht verankert.`,
      suggestion: stage.result.nextStep,
    };
  }

  // verankert, aber nicht abgeschlossen
  return {
    reason: `Diese Stufe ist gut ausgeprägt (${p.pct}%), aber noch nicht abgeschlossen. Ein Durchgang würde sie verankern.`,
    suggestion: stage.result.nextStep,
  };
}

export function buildGedankenprofil(
  input: GedankenprofilInput,
): Gedankenprofil {
  const { startStage, scores, completedNumbers, programmDone = 0 } = input;

  const completed = new Set(completedNumbers);
  const hasTest =
    Array.isArray(scores) && scores.length === testStages.length;

  // Ohne Testdaten: freundliche Einladung, keine erfundenen Werte.
  if (!hasTest) {
    return {
      hasTest: false,
      invite:
        "Dein Gedankenprofil entsteht aus deinem Bewusstseinstest. Mach den Test – 21 Fragen, etwa 5 Minuten –, dann zeigt sich hier, wie sich deine sieben Stufen verteilen und wo es sich lohnt, noch einmal dranzugehen.",
      profile: [],
      focusStage: startStage,
      bedarf: [],
      strengths: [],
      summary: "",
      empfehlung: null,
    };
  }

  const safeScores = scores as number[];

  const profile: StageProfile[] = testStages.map((stage, i) => {
    const raw = Math.max(0, Math.min(MAX_PER_STAGE, safeScores[i] ?? 0));
    const pct = Math.round((raw / MAX_PER_STAGE) * 100);
    const done = completed.has(stage.nr);
    return {
      nr: stage.nr,
      name: stage.name,
      tagline: stage.tagline,
      pct,
      done,
      level: levelOf(pct),
    };
  });

  const focusStage = startStage ?? null;

  // Bedarfsanalyse: gewichten, sortieren, die stärksten bis zu drei nehmen.
  const bedarf: BedarfItem[] = profile
    .map((p) => ({ p, w: bedarfWeight(p, focusStage) }))
    .filter((x) => x.w > 0)
    .sort((a, b) => b.w - a.w || a.p.nr - b.p.nr)
    .slice(0, 3)
    .map(({ p }) => {
      const stage = testStages[p.nr - 1];
      const { reason, suggestion } = reasonFor(p, stage, focusStage);
      return {
        nr: p.nr,
        name: p.name,
        tagline: p.tagline,
        reason,
        suggestion,
        href: `/mitglieder/stufe/${p.nr}`,
        practice: practiceFor(p.nr),
        deepDive: deepDiveFor(p.nr),
      };
    });

  const strengths = profile.filter((p) => p.level === "verankert").map((p) => p.nr);

  // Zusammenfassung – geerdet, ohne Übertreibung.
  const focus = focusStage ? testStages[focusStage - 1] : null;
  const summaryParts: string[] = [];
  if (focus) {
    summaryParts.push(
      `Dein Schwerpunkt liegt bei Stufe ${focus.nr} – ${focus.name}.`,
    );
  }
  if (strengths.length > 0) {
    summaryParts.push(
      strengths.length === 1
        ? `Gut verankert ist bei dir Stufe ${strengths[0]}.`
        : `Gut verankert sind bei dir die Stufen ${strengths.join(", ")}.`,
    );
  }
  if (bedarf.length > 0) {
    const nrs = bedarf.map((b) => b.nr);
    summaryParts.push(
      nrs.length === 1
        ? `Noch Bedarf zeigt sich bei Stufe ${nrs[0]} – darauf lohnt es sich, den nächsten Blick zu richten.`
        : `Noch Bedarf zeigt sich vor allem bei den Stufen ${nrs.join(", ")}.`,
    );
  } else {
    summaryParts.push(
      "Aktuell zeigt sich kein dringender Bedarf – ein guter Moment, das Erreichte in der täglichen Praxis zu vertiefen.",
    );
  }

  return {
    hasTest: true,
    profile,
    focusStage,
    bedarf,
    strengths,
    summary: summaryParts.join(" "),
    empfehlung: startEmpfehlung(focusStage, programmDone),
  };
}
