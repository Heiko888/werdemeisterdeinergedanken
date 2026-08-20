"use server";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getJournalEntries } from "@/app/mitglieder/actions";
import { resolveEntry } from "@/lib/journal";
import { KI_MODELL, mitErsatzmodell } from "@/lib/ki-modell";

/**
 * Muster-Spiegel: KI-Auswertung der eigenen Journal-Reflexionen.
 *
 * WICHTIG: Ein Spiegel wird NIE automatisch erzeugt, sondern ausschließlich auf
 * ausdrückliche Freigabe (Button-Klick → `generateMusterSpiegel`). Erst dann
 * werden die Reflexionstexte einmalig an die KI übergeben; im Hintergrund läuft
 * nichts. Die regelbasierte Standortbestimmung bleibt davon unberührt.
 *
 * Ist kein ANTHROPIC_API_KEY gesetzt, meldet die Funktion `not_configured` –
 * die Journal-Seite blendet die Spiegel-Option dann einfach aus.
 */

const MODEL = KI_MODELL;

/** Mindestsubstanz, damit die KI überhaupt ein Muster erkennen kann. */
const MIN_ENTRIES = 3;
const MIN_DISTINCT_ITEMS = 2;
/** Obergrenze an Reflexionstext, die an die KI geht (jüngste zuerst). */
const MAX_INPUT_CHARS = 6000;

/** Ist die Muster-Spiegel-Funktion serverseitig konfiguriert? */
export async function isMusterSpiegelConfigured(): Promise<boolean> {
  return Boolean(process.env.ANTHROPIC_API_KEY);
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

  const system = `Du schreibst für „Werde Meister deiner Gedanken" von Heiko Schwaninger –
ein Begleitangebot zur Bewusstseinsentwicklung in 7 Stufen. Der Kern der
Methode: Gedanken und Muster zu bemerken, statt von ihnen gelebt zu werden.

Deine Aufgabe: Lies die Journal-Reflexionen einer Person und halte ihr einen
behutsamen „Muster-Spiegel" vor – benenne EIN bis ZWEI wiederkehrende Muster,
die sich über mehrere Einträge zeigen (ein Glaubenssatz, eine innere Stimme,
eine Autopilot-Schleife, ein wiederkehrendes Thema).

Du bist ein Spiegel, kein Orakel. Halte dich strikt daran:
- Sprich die Person mit „du" an. Ruhig, warm, geerdet, auf Augenhöhe.
- Deute NUR, was tatsächlich dasteht. Belege jedes benannte Muster mit ihren
  eigenen Worten – kurz zitiert. Erfinde nichts: keine Biografie, keine
  Diagnose, keine Zahlen, keine Vorhersage.
- Kein esoterisches Übertreiben, keine Heilsversprechen, keine Floskeln.
- Ein Muster ist eine Beobachtung, kein Urteil. Formuliere es als etwas, das
  sich zeigt („Über mehrere Einträge taucht … auf"), nicht als Etikett.
- Zeigen die Einträge zu wenig Zusammenhang für ein echtes Muster, sag das
  ehrlich und lade ein, weiterzuschreiben – erfinde kein Muster.
- Schließe mit EINER sanften Frage oder einem kleinen nächsten Schritt zum
  Selber-Nachspüren – keine Vorschrift, keine To-do-Liste.
- 180–280 Wörter, Fließtext in kurzen Absätzen, kein Markdown, keine
  Überschriften.`;

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
            content: `Hier sind meine Journal-Reflexionen. Halte mir meinen Muster-Spiegel vor.\n\n${reflections}`,
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
