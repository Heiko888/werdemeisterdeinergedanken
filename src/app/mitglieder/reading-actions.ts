"use server";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getTestProfile, getCompletedStages } from "@/app/mitglieder/actions";
import { buildGedankenprofil } from "@/lib/gedankenprofil";

/**
 * KI-Readings zum Gedankenprofil.
 *
 * WICHTIG: Ein Reading wird NIE automatisch erzeugt, sondern ausschließlich auf
 * ausdrückliche Freigabe (Button-Klick → `generateReading`). Das regelbasierte
 * Gedankenprofil bleibt davon unberührt und funktioniert ohne KI weiter.
 *
 * Ist kein ANTHROPIC_API_KEY gesetzt, meldet die Funktion `not_configured` –
 * die Seite blendet die Reading-Option dann einfach aus.
 */

const MODEL = "claude-opus-5";

/** Ist die KI-Reading-Funktion serverseitig konfiguriert? */
export async function isReadingConfigured(): Promise<boolean> {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export type Reading = { body: string; createdAt: string; model: string | null };

/** Das zuletzt gespeicherte Reading der angemeldeten Person (oder null). */
export async function getLatestReading(): Promise<Reading | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("gedanken_readings")
    .select("body, created_at, model")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) return null;
  return {
    body: data.body as string,
    createdAt: data.created_at as string,
    model: (data.model as string | null) ?? null,
  };
}

export type GenerateResult =
  | { status: "ok"; reading: Reading }
  | { status: "not_configured" }
  | { status: "no_test" }
  | { status: "unauthenticated" }
  | { status: "error" };

/**
 * Erzeugt ein persönliches Reading aus dem (deterministischen) Gedankenprofil,
 * speichert es und gibt es zurück. Nur nach ausdrücklicher Freigabe aufrufen.
 */
export async function generateReading(): Promise<GenerateResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { status: "not_configured" };
  if (!isSupabaseConfigured) return { status: "unauthenticated" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "unauthenticated" };

  // Datengrundlage laden und das deterministische Profil bauen.
  const [{ startStage, scores }, completedKeys] = await Promise.all([
    getTestProfile(),
    getCompletedStages(),
  ]);
  const completedNumbers = completedKeys
    .map((k) => Number(k))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 7);

  const profil = buildGedankenprofil({ startStage, scores, completedNumbers });
  if (!profil.hasTest) return { status: "no_test" };

  // Kompakte, faktische Zusammenfassung als Grundlage für das Reading –
  // damit die KI nur die vorhandenen Daten deutet und nichts erfindet.
  const profileFacts = [
    profil.focusStage ? `Schwerpunkt-Stufe: ${profil.focusStage}` : null,
    "Stufen (Ausprägung laut Selbsteinschätzung, Status):",
    ...profil.profile.map(
      (p) =>
        `- Stufe ${p.nr} „${p.name}" (${p.tagline}): ${p.pct}% – ${
          p.level === "verankert"
            ? "verankert"
            : p.level === "im-aufbau"
              ? "im Aufbau"
              : "Entwicklungsraum"
        }${p.done ? ", abgeschlossen" : ""}`,
    ),
    profil.bedarf.length > 0
      ? `Größter Bedarf (dranbleiben): Stufen ${profil.bedarf
          .map((b) => b.nr)
          .join(", ")}`
      : "Aktuell kein dringender Bedarf.",
  ]
    .filter(Boolean)
    .join("\n");

  const system = `Du schreibst für „Werde Meister deiner Gedanken" von Heiko Schwaninger –
ein Begleitangebot zur Bewusstseinsentwicklung in 7 Stufen.
Verfasse ein persönliches, warmes und geerdetes „Reading" zum Gedankenprofil
einer Person, ausschließlich auf Basis der übergebenen Daten.

Regeln:
- Sprich die Person mit „du" an.
- Deute nur die vorhandenen Werte; erfinde keine Zahlen, keine Biografie,
  keine Diagnosen und keine Vorhersagen.
- Kein esoterisches Übertreiben, keine Heilsversprechen. Ruhig, klar, ermutigend.
- Struktur: (1) kurze Spiegelung des aktuellen Schwerpunkts, (2) was schon
  trägt, (3) wo es sich lohnt, noch einmal dranzugehen, (4) ein konkreter,
  sanfter nächster Schritt.
- 200–300 Wörter, Fließtext in kurzen Absätzen, kein Markdown, keine Überschriften.`;

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: MODEL,
      // Deckelt Denk- UND Antworttokens zusammen: Thinking ist bei
      // claude-opus-5 standardmäßig an. Ein Reading braucht nur ~400 Tokens,
      // der Rest ist Puffer, damit nichts mitten im Satz abbricht.
      max_tokens: 8000,
      output_config: { effort: "low" },
      system,
      messages: [
        {
          role: "user",
          content: `Hier ist mein Gedankenprofil. Schreib mir mein persönliches Reading dazu.\n\n${profileFacts}`,
        },
      ],
    });

    if (response.stop_reason === "refusal") return { status: "error" };
    // Abgeschnitten – lieber gar kein Reading als ein halbes, das gespeichert
    // und später als fertig angezeigt wird.
    if (response.stop_reason === "max_tokens") return { status: "error" };

    const body = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    if (!body) return { status: "error" };

    const createdAt = new Date().toISOString();
    // Snapshot mitspeichern (nicht-fatal, falls Migration 0008 noch fehlt).
    const { error } = await supabase.from("gedanken_readings").insert({
      user_id: user.id,
      body,
      source_stage: profil.focusStage,
      source_scores: scores,
      model: response.model ?? MODEL,
      created_at: createdAt,
    });
    if (error) {
      // Speichern fehlgeschlagen – Reading trotzdem anzeigen.
      return {
        status: "ok",
        reading: { body, createdAt, model: response.model ?? MODEL },
      };
    }

    return {
      status: "ok",
      reading: { body, createdAt, model: response.model ?? MODEL },
    };
  } catch {
    return { status: "error" };
  }
}
