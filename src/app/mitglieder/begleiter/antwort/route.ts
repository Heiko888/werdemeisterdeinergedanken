import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getTestProfile, getCompletedStages } from "@/app/mitglieder/actions";
import { buildGedankenprofil } from "@/lib/gedankenprofil";
import {
  buildSystemPrompt,
  contentCatalogue,
  profileFacts,
} from "@/lib/begleiter-prompt";
import {
  BEGLEITER_MODEL,
  DAILY_MESSAGE_LIMIT,
  HISTORY_LIMIT,
  MAX_INPUT_CHARS,
  type BegleiterError,
} from "@/lib/begleiter";

/**
 * KI-Begleiter – Antwort erzeugen (gestreamt).
 *
 * Warum ein Route-Handler statt einer Server-Action: Nur so lässt sich die
 * Antwort Wort für Wort ausliefern, statt die Person zehn Sekunden vor einem
 * Ladepunkt warten zu lassen.
 *
 * Schutz: Der Pfad liegt unter /mitglieder und wird deshalb schon vom Proxy
 * (`src/proxy.ts`) abgesichert. Zusätzlich prüft dieser Handler die Anmeldung
 * selbst – Route-Handler werden von keinem Layout umschlossen, hier gibt es
 * also keine zweite Schicht, die das sonst übernähme.
 *
 * Der Verlauf kommt bewusst aus der Datenbank und nicht aus dem Request:
 * So kann niemand dem Begleiter eine erfundene Vorgeschichte unterschieben.
 */

export const dynamic = "force-dynamic";
// Antworten samt Denkzeit brauchen mehr als die üblichen Sekunden.
export const maxDuration = 60;

/** Fehler als JSON – die Oberfläche macht daraus einen verständlichen Satz. */
function fail(error: BegleiterError, status: number): Response {
  return Response.json({ error }, { status });
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || !isSupabaseConfigured) return fail("not_configured", 503);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return fail("unauthenticated", 401);

  // ---- Eingabe prüfen ----
  let message = "";
  try {
    const body = (await request.json()) as { message?: unknown };
    message = typeof body.message === "string" ? body.message.trim() : "";
  } catch {
    return fail("empty", 400);
  }
  if (!message) return fail("empty", 400);
  if (message.length > MAX_INPUT_CHARS) return fail("too_long", 400);

  // ---- Tageslimit (rollierende 24 Stunden), Admins ausgenommen ----
  if (!isAdminEmail(user.email)) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("begleiter_messages")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("role", "user")
      .gte("created_at", since);
    if ((count ?? 0) >= DAILY_MESSAGE_LIMIT) return fail("rate_limited", 429);
  }

  // ---- Gesprächskontext: die letzten Nachrichten aus der Datenbank ----
  const { data: historyRows, error: historyError } = await supabase
    .from("begleiter_messages")
    .select("role, body")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(HISTORY_LIMIT);

  // Fehlt die Tabelle (Migration 0009 nicht eingespielt), kann der Begleiter
  // weder Kontext lesen noch etwas speichern – dann lieber ehrlich melden.
  if (historyError) return fail("not_configured", 503);

  const history: Anthropic.MessageParam[] = (historyRows ?? [])
    .slice()
    .reverse()
    .map((row) => ({
      role: row.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: row.body as string,
    }));

  // ---- Wer schreibt hier? Name und Stand aus dem eigenen Profil ----
  const { data: profileRow } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();
  const name =
    (profileRow?.full_name as string | null) ||
    (user.user_metadata?.full_name as string | undefined) ||
    "";

  const [{ startStage, scores }, completedKeys] = await Promise.all([
    getTestProfile(),
    getCompletedStages(),
  ]);
  const completedNumbers = completedKeys
    .map((k) => Number(k))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 7);
  const profil = buildGedankenprofil({ startStage, scores, completedNumbers });

  const system = buildSystemPrompt({
    name,
    profile: profileFacts(profil),
    catalogue: contentCatalogue(),
  });

  // ---- Frage speichern, bevor geantwortet wird ----
  const { error: insertError } = await supabase
    .from("begleiter_messages")
    .insert({ user_id: user.id, role: "user", body: message });
  if (insertError) return fail("not_configured", 503);

  // ---- Antwort streamen ----
  const anthropic = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answer = "";
      try {
        const events = anthropic.messages.stream({
          model: BEGLEITER_MODEL,
          // Deckelt Denk- UND Antworttokens zusammen: Thinking ist bei
          // claude-opus-5 standardmäßig an. Eine Antwort braucht ~300 Tokens,
          // der Rest ist Puffer, damit nichts mitten im Satz abbricht.
          max_tokens: 8000,
          output_config: { effort: "low" },
          system,
          messages: [...history, { role: "user", content: message }],
        });

        for await (const event of events) {
          // Nur den sichtbaren Text weitergeben – Denkschritte bleiben intern.
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            answer += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch {
        // Abbruch mitten im Stream: Der Status steht schon auf 200, deshalb
        // kommt der Hinweis als Text – und die Antwort wird nicht gespeichert.
        if (!answer) {
          controller.enqueue(
            encoder.encode(
              "Die Antwort konnte gerade nicht erzeugt werden. Versuch es in einem Moment noch einmal.",
            ),
          );
        }
        controller.close();
        return;
      }

      // Nur vollständige Antworten in den Verlauf aufnehmen.
      if (answer.trim()) {
        await supabase.from("begleiter_messages").insert({
          user_id: user.id,
          role: "assistant",
          body: answer.trim(),
          model: BEGLEITER_MODEL,
        });
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      // Zwischenspeicher (nginx) davon abhalten, den Stream zu puffern.
      "X-Accel-Buffering": "no",
    },
  });
}
