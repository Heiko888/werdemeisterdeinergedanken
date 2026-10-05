"use server";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getJournalEntries } from "@/app/mitglieder/actions";
import { resolveEntry } from "@/lib/journal";
import { KI_MODELL, mitErsatzmodell } from "@/lib/ki-modell";
import { isKiMusterSpiegelEnabled } from "@/lib/ki-features";
import { musterSystemPrompt } from "@/lib/ki-grenzen";

/**
 * Muster-Spiegel: Spiegelung wiederkehrender Themen aus den eigenen
 * Journal-Reflexionen (keine Bewertung, keine Lernkontrolle).
 *
 * WICHTIG: Ein Spiegel wird NIE automatisch erzeugt, sondern ausschließlich auf
 * ausdrückliche Freigabe (Button-Klick → `generateMusterSpiegel`). Erst dann
 * werden die Reflexionstexte einmalig an die KI übergeben; im Hintergrund läuft
 * nichts. Die regelbasierte Standortbestimmung bleibt davon unberührt.
 *
 * Ist kein ANTHROPIC_API_KEY gesetzt ODER der Schalter KI_MUSTER_SPIEGEL_ENABLED
 * nicht auf "true" (Standard: aus, src/lib/ki-features.ts), meldet die Funktion
 * `not_configured` – die Journal-Seite blendet die Spiegel-Option dann aus und
 * es werden keine Journaltexte an die KI übertragen. Gespeicherte Spiegel
 * bleiben in der Datenbank erhalten.
 */

const MODEL = KI_MODELL;

/** Mindestsubstanz, damit die KI überhaupt ein Muster erkennen kann. */
const MIN_ENTRIES = 3;
const MIN_DISTINCT_ITEMS = 2;
/** Obergrenze an Reflexionstext, die an die KI geht (jüngste zuerst). */
const MAX_INPUT_CHARS = 6000;

/** Ist die Muster-Spiegel-Funktion serverseitig konfiguriert? */
export async function isMusterSpiegelConfigured(): Promise<boolean> {
  return isKiMusterSpiegelEnabled() && Boolean(process.env.ANTHROPIC_API_KEY);
}

export type MusterSpiegel = {
  body: string;
  createdAt: string;
  model: string | null;
};

/** Der zuletzt gespeicherte Spiegel der angemeldeten Person (oder null). */
export async function getLatestMusterSpiegel(): Promise<MusterSpiegel | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("muster_spiegel")
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

export type GenerateMusterResult =
  | { status: "ok"; spiegel: MusterSpiegel }
  | { status: "not_configured" }
  | { status: "too_little_data"; have: number; need: number }
  | { status: "unauthenticated" }
  | { status: "error" };

/**
 * Erzeugt einen Muster-Spiegel aus den eigenen Journal-Reflexionen, speichert
 * ihn und gibt ihn zurück. Nur nach ausdrücklicher Freigabe aufrufen.
 */
export async function generateMusterSpiegel(): Promise<GenerateMusterResult> {
  // Schalter zuerst – auch ein direkter Aufruf der Server-Action überträgt
  // bei ausgeschalteter Funktion keine Journaltexte.
  if (!isKiMusterSpiegelEnabled()) return { status: "not_configured" };
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { status: "not_configured" };
  if (!isSupabaseConfigured) return { status: "unauthenticated" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "unauthenticated" };

  const entries = await getJournalEntries();

  // Zu jeder Notiz den lesbaren Kontext (Titel, Reflexionsfrage) auflösen;
  // Einträge ohne auflösbare Herkunft überspringen.
  const resolved = entries
    .map((e) => ({ entry: e, ctx: resolveEntry(e.itemType, e.itemKey, e.ref) }))
    .filter(
      (x): x is { entry: (typeof entries)[number]; ctx: NonNullable<ReturnType<typeof resolveEntry>> } =>
        x.ctx !== null,
    );

  // Mindestsubstanz prüfen: genug Reflexionen über genug verschiedene Themen.
  const distinctItems = new Set(
    resolved.map((r) => `${r.entry.itemType}:${r.entry.itemKey}`),
  );
  if (resolved.length < MIN_ENTRIES || distinctItems.size < MIN_DISTINCT_ITEMS) {
    return { status: "too_little_data", have: resolved.length, need: MIN_ENTRIES };
  }

  // Reflexionen als beschrifteten Text aufbereiten – jüngste zuerst, bis das
  // Zeichenbudget erreicht ist, damit auch volle Journale sicher durchlaufen.
  const lines: string[] = [];
  let used = 0;
  for (const { entry, ctx } of resolved) {
    const frage = ctx.question ? `Frage: „${ctx.question}"` : "Freie Notiz";
    const block = `[${ctx.label} · ${ctx.title}] ${frage}\nEintrag: „${entry.body.trim()}"`;
    if (used + block.length > MAX_INPUT_CHARS && lines.length > 0) break;
    lines.push(block);
    used += block.length;
  }
  const reflections = lines.join("\n\n");

  // Zeitraum-Momentaufnahme für die Nachvollziehbarkeit (ohne Texte).
  const dates = resolved.map((r) => r.entry.updatedAt).filter(Boolean).sort();
  const sourceFrom = dates[0] ?? null;
  const sourceTo = dates[dates.length - 1] ?? null;

  // Prompt samt gemeinsamer Grenzen (KI_ZFU_GRENZEN) in lib/ki-grenzen.
  const system = musterSystemPrompt();

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await mitErsatzmodell((modell) =>
      anthropic.messages.create({
        model: modell,
        // Deckelt Denk- und Antworttokens zusammen (Thinking ist bei Opus an).
        // Ein Spiegel braucht ~350 Wörter; der Rest ist Puffer gegen Abbruch.
        max_tokens: 8000,
        output_config: { effort: "low" },
        system,
        messages: [
          {
            role: "user",
            content: `Hier sind meine Journal-Reflexionen. Spiegle mir, welche Themen darin wiederkehren.\n\n${reflections}`,
          },
        ],
      }),
    );

    if (response.stop_reason === "refusal") return { status: "error" };
    // Abgeschnitten – lieber kein Spiegel als ein halber, der als fertig gilt.
    if (response.stop_reason === "max_tokens") return { status: "error" };

    const body = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    if (!body) return { status: "error" };

    const createdAt = new Date().toISOString();
    // Snapshot mitspeichern (nicht-fatal, falls Migration 0010 noch fehlt).
    const { error } = await supabase.from("muster_spiegel").insert({
      user_id: user.id,
      body,
      source_entry_count: resolved.length,
      source_from: sourceFrom,
      source_to: sourceTo,
      model: response.model ?? MODEL,
      created_at: createdAt,
    });
    if (error) {
      // Speichern fehlgeschlagen – Spiegel trotzdem anzeigen.
      return {
        status: "ok",
        spiegel: { body, createdAt, model: response.model ?? MODEL },
      };
    }

    return {
      status: "ok",
      spiegel: { body, createdAt, model: response.model ?? MODEL },
    };
  } catch (err) {
    // Den echten Fehler in die Server-Logs schreiben (Key, Guthaben, Kapazität).
    // Der Text an die Person bleibt bewusst allgemein.
    console.error("[muster-spiegel] KI-Aufruf fehlgeschlagen:", err);
    return { status: "error" };
  }
}
