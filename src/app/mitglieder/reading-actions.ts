"use server";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getTestProfile } from "@/app/mitglieder/actions";
import { buildGedankenprofil } from "@/lib/gedankenprofil";
import { KI_MODELL, mitErsatzmodell } from "@/lib/ki-modell";
import { isKiReadingEnabled } from "@/lib/ki-features";
import { readingSystemPrompt, selbsteinschaetzungFacts } from "@/lib/ki-grenzen";

/**
 * KI-Readings zum Gedankenprofil.
 *
 * WICHTIG: Ein Reading wird NIE automatisch erzeugt, sondern ausschließlich auf
 * ausdrückliche Freigabe (Button-Klick → `generateReading`). Das regelbasierte
 * Gedankenprofil bleibt davon unberührt und funktioniert ohne KI weiter.
 *
 * Ist kein ANTHROPIC_API_KEY gesetzt ODER der Schalter KI_READING_ENABLED
 * nicht auf "true" (Standard: aus, siehe src/lib/ki-features.ts), meldet die
 * Funktion `not_configured` – die Seite blendet die Reading-Option dann einfach
 * aus.
 */

const MODEL = KI_MODELL;

/** Ist die KI-Reading-Funktion serverseitig konfiguriert? */
export async function isReadingConfigured(): Promise<boolean> {
  return isKiReadingEnabled() && Boolean(process.env.ANTHROPIC_API_KEY);
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
 * Erzeugt eine KI-gestützte Reflexion auf Basis der eigenen Selbsteinschätzung,
 * speichert es und gibt es zurück. Nur nach ausdrücklicher Freigabe aufrufen.
 */
export async function generateReading(): Promise<GenerateResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!isKiReadingEnabled() || !apiKey) return { status: "not_configured" };
  if (!isSupabaseConfigured) return { status: "unauthenticated" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "unauthenticated" };

  // Datengrundlage: ausschließlich die eigene Selbsteinschätzung aus dem
  // Bewusstseinstest. Als bearbeitet markierte Stufen gehen bewusst NICHT ein
  // (früher `getCompletedStages()`): Das Reading ist eine Reflexion der
  // eigenen Angaben, keine Lernstands- oder Fortschrittsauswertung – siehe
  // docs/ZFU-KI-PRUEFUNG.md.
  const { startStage, scores } = await getTestProfile();
  const profil = buildGedankenprofil({ startStage, scores, completedNumbers: [] });
  if (!profil.hasTest) return { status: "no_test" };

  // Kompakte, faktische Zusammenfassung – die KI deutet nur diese Angaben.
  const profileFacts = selbsteinschaetzungFacts(profil);
  const system = readingSystemPrompt();

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await mitErsatzmodell((modell) =>
      anthropic.messages.create({
        model: modell,
        // Deckelt Denk- UND Antworttokens zusammen: Thinking ist bei
        // Opus standardmäßig an. Ein Reading braucht nur ~400 Tokens,
        // der Rest ist Puffer, damit nichts mitten im Satz abbricht.
        max_tokens: 8000,
        output_config: { effort: "low" },
        system,
        messages: [
          {
            role: "user",
            content: `Hier ist meine Selbsteinschätzung aus dem Bewusstseinstest. Schreib mir eine Reflexion dazu.\n\n${profileFacts}`,
          },
        ],
      }),
    );

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
  } catch (err) {
    // Den echten Fehler in die Server-Logs schreiben – ohne ihn ist im Betrieb
    // nicht zu erkennen, WORAN der Aufruf scheitert (Key, Guthaben, Kapazität).
    // Der Text an die Person bleibt bewusst allgemein.
    console.error("[reading] KI-Aufruf fehlgeschlagen:", err);
    return { status: "error" };
  }
}
