"use server";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { deepDives } from "@/lib/deep-dives";
import { mitErsatzmodell } from "@/lib/ki-modell";

/**
 * Manipulations-Detektor.
 *
 * Die Person fügt einen Text ein (Werbung, Schlagzeile, Post) – eine KI prüft
 * ihn gegen die 16 Techniken aus der Vertiefungs-Kategorie „Mentale
 * Selbstverteidigung" und benennt, welche darin wirken, mit Zitat und
 * nüchterner Erklärung. Kein Werturteil über das Thema des Textes; es geht um
 * die Mechanik, nicht um Gesinnung.
 *
 * Ein Aufruf passiert ausschließlich auf Klick. Ohne ANTHROPIC_API_KEY meldet
 * die Funktion `not_configured`; die Seite blendet das Werkzeug dann aus.
 */

const MIN_CHARS = 40;
const MAX_CHARS = 5000;

/** Ist der Detektor serverseitig konfiguriert? */
export async function isDetektorConfigured(): Promise<boolean> {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Die 16 Techniken als Klassifikationsgrundlage – Single Source of Truth. */
type Technik = { slug: string; title: string; summary: string };

function taxonomie(): Technik[] {
  return deepDives
    .filter((d) => d.category === "Mentale Selbstverteidigung")
    .map((d) => ({
      slug: d.slug,
      title: d.title,
      summary: d.summary.replace(/\s+/g, " ").trim(),
    }));
}

export type DetektorFund = {
  slug: string;
  title: string;
  href: string;
  /** Kurzes wörtliches Zitat aus dem Text, an dem die Technik greift. */
  zitat: string;
  /** Nüchterne Erklärung, wie die Technik hier wirkt. */
  erklaerung: string;
};

export type DetektorErgebnis = {
  /** Einordnender Satz zum Gesamteindruck. */
  gesamt: string;
  /** Gefundene Techniken (leer = nichts Auffälliges). */
  funde: DetektorFund[];
};

export type AnalyzeResult =
  | { status: "ok"; ergebnis: DetektorErgebnis }
  | { status: "not_configured" }
  | { status: "too_short"; min: number }
  | { status: "too_long"; max: number }
  | { status: "unauthenticated" }
  | { status: "error" };

/** Erste vollständige JSON-Klammer aus einer KI-Antwort herausschneiden. */
function extractJson(text: string): string | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

/**
 * Prüft einen Text gegen die Manipulations-Taxonomie. Nur nach ausdrücklicher
 * Freigabe (Button-Klick) aufrufen.
 */
export async function analyzeText(input: string): Promise<AnalyzeResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { status: "not_configured" };
  if (!isSupabaseConfigured) return { status: "unauthenticated" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "unauthenticated" };

  const text = (input ?? "").trim();
  if (text.length < MIN_CHARS) return { status: "too_short", min: MIN_CHARS };
  if (text.length > MAX_CHARS) return { status: "too_long", max: MAX_CHARS };

  const techniken = taxonomie();
  const byslug = new Map(techniken.map((t) => [t.slug, t]));
  const taxLines = techniken
    .map((t) => `- ${t.slug}: ${t.title} — ${t.summary}`)
    .join("\n");

  const system = `Du bist der „Manipulations-Detektor" von „Werde Meister deiner Gedanken".
Deine Aufgabe: einen von der Person eingefügten Text (z. B. Werbung, Schlagzeile,
Social-Media-Post) nüchtern daraufhin prüfen, welche Beeinflussungs-Techniken
darin wirken – ausschließlich aus dieser festen Liste:

${taxLines}

Regeln:
- Ordne NUR Techniken aus der Liste zu und verwende exakt deren Kürzel (den Teil
  vor dem Doppelpunkt). Erfinde keine neuen.
- Belege jede gefundene Technik mit einem KURZEN, wörtlichen Zitat aus dem Text
  (die Stelle, an der sie greift). Erfinde keine Zitate.
- Erkläre in ein bis zwei Sätzen sachlich, WIE die Technik an dieser Stelle
  wirkt. Kein Alarmismus, keine Empörung, keine Moralpredigt.
- Bewerte nicht die Meinung oder das Thema des Textes – nur die Mechanik. Auch
  ein Text, dem du inhaltlich zustimmst, kann Techniken nutzen.
- Findest du nichts Belastbares, ist das ein gültiges Ergebnis: leere Fund-Liste.
  Erzwinge keine Treffer.
- Antworte AUSSCHLIESSLICH mit einem JSON-Objekt, ohne Text davor oder danach:
  {"gesamt": "<ein nüchterner Satz zum Gesamteindruck>",
   "funde": [{"technik": "<kürzel>", "zitat": "<kurzes Zitat>", "erklaerung": "<1-2 Sätze>"}]}`;

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await mitErsatzmodell((modell) =>
      anthropic.messages.create({
        model: modell,
        max_tokens: 8000,
        output_config: { effort: "low" },
        system,
        messages: [
          {
            role: "user",
            content: `Prüfe diesen Text:\n\n"""${text}"""`,
          },
        ],
      }),
    );

    if (response.stop_reason === "refusal") return { status: "error" };
    if (response.stop_reason === "max_tokens") return { status: "error" };

    const raw = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    const json = extractJson(raw);
    if (!json) return { status: "error" };

    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return { status: "error" };
    }

    const obj = parsed as {
      gesamt?: unknown;
      funde?: unknown;
    };
    const gesamt = typeof obj.gesamt === "string" ? obj.gesamt.trim() : "";

    const rawFunde = Array.isArray(obj.funde) ? obj.funde : [];
    const funde: DetektorFund[] = [];
    for (const f of rawFunde) {
      const item = f as { technik?: unknown; zitat?: unknown; erklaerung?: unknown };
      const slug = typeof item.technik === "string" ? item.technik.trim() : "";
      const tech = byslug.get(slug);
      // Unbekannte Kürzel (Halluzination) werden verworfen.
      if (!tech) continue;
      const zitat = typeof item.zitat === "string" ? item.zitat.trim() : "";
      const erklaerung =
        typeof item.erklaerung === "string" ? item.erklaerung.trim() : "";
      if (!erklaerung) continue;
      // Doppelte Technik nur einmal aufnehmen.
      if (funde.some((x) => x.slug === slug)) continue;
      funde.push({
        slug,
        title: tech.title,
        href: `/mitglieder/wissen/${slug}`,
        zitat,
        erklaerung,
      });
    }

    return {
      status: "ok",
      ergebnis: {
        gesamt: gesamt || (funde.length === 0
          ? "In diesem Text sind keine der bekannten Techniken deutlich erkennbar."
          : "Im Text wirken die folgenden Techniken."),
        funde,
      },
    };
  } catch (err) {
    console.error("[detektor] KI-Aufruf fehlgeschlagen:", err);
    return { status: "error" };
  }
}
