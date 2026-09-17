import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import {
  getTestProfile,
  getCompletedStages,
  getCompletedPractices,
  getJournalEntries,
} from "@/app/mitglieder/actions";
import { getProgrammFortschritt } from "@/app/mitglieder/programm-actions";
import { getRueckkehrDaten } from "@/app/mitglieder/rueckkehr-actions";
import { getDetektorHistory } from "@/app/mitglieder/detektor-actions";
import { getLatestReading } from "@/app/mitglieder/reading-actions";
import { getLatestMusterSpiegel } from "@/app/mitglieder/muster-actions";
import { PROGRAMM_TAGE_GESAMT } from "@/lib/programm";
import { buildGedankenprofil } from "@/lib/gedankenprofil";
import {
  buildSystemPrompt,
  contentCatalogue,
  profileFacts,
  journalFacts,
  behaviorFacts,
} from "@/lib/begleiter-prompt";
import {
  BEGLEITER_MODEL,
  DAILY_MESSAGE_LIMIT,
  HISTORY_LIMIT,
  MAX_INPUT_CHARS,
  type BegleiterError,
} from "@/lib/begleiter";
import { KI_MODELL_ERSATZ, istKapazitaetsfehler } from "@/lib/ki-modell";

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

/** UTC-Datum als YYYY-MM-DD, verschoben um `offset` Tage. */
function utcTag(offset: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}

/**
 * Aktuelle Rückkehr-Serie: aufeinanderfolgende Tage, die bis heute (oder
 * gestern, falls heute noch offen) zurückreichen. `tage` sind YYYY-MM-DD.
 */
function rueckkehrStreak(tage: string[]): number {
  const set = new Set(tage);
  const heute = utcTag(0);
  const gestern = utcTag(-1);
  if (!set.has(heute) && !set.has(gestern)) return 0;

  const cursor = new Date();
  if (!set.has(heute)) cursor.setUTCDate(cursor.getUTCDate() - 1);

  let streak = 0;
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
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

  const [{ startStage, scores }, completedKeys, journalEntries] =
    await Promise.all([
      getTestProfile(),
      getCompletedStages(),
      getJournalEntries(),
    ]);
  const completedNumbers = completedKeys
    .map((k) => Number(k))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 7);
  const profil = buildGedankenprofil({ startStage, scores, completedNumbers });

  // Verhaltens-/Momentum-Kontext (B6): woran die Person tatsächlich dranbleibt.
  const [programmTage, rueckkehr, practices, detektorHist, letztesReading, letzterSpiegel] =
    await Promise.all([
      getProgrammFortschritt(),
      getRueckkehrDaten(),
      getCompletedPractices(),
      getDetektorHistory(20),
      getLatestReading(),
      getLatestMusterSpiegel(),
    ]);
  const detektorZaehler = new Map<string, number>();
  for (const eintrag of detektorHist) {
    for (const f of eintrag.funde) {
      detektorZaehler.set(f.title, (detektorZaehler.get(f.title) ?? 0) + 1);
    }
  }
  const detektorTop = [...detektorZaehler.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([title]) => title);

  const behavior = behaviorFacts({
    rueckkehrStreak: rueckkehrStreak(rueckkehr.tage),
    rueckkehrTotal: rueckkehr.tage.length,
    programmDone: programmTage.length,
    programmTotal: PROGRAMM_TAGE_GESAMT,
    practicesDone: practices.length,
    detektorTop,
    lastReading: letztesReading?.body ?? null,
    lastMuster: letzterSpiegel?.body ?? null,
  });

  const system = buildSystemPrompt({
    name,
    profile: profileFacts(profil),
    journal: journalFacts(journalEntries),
    behavior,
    catalogue: contentCatalogue(),
  });

  // ---- Frage speichern, bevor geantwortet wird ----
  // Die id merken: Scheitert der KI-Aufruf, wird diese Zeile wieder entfernt,
  // damit ein Fehlversuch weder den Verlauf verschmutzt (sonst stünden lauter
  // unbeantwortete Fragen als Kontext im nächsten Aufruf) noch das Tageslimit
  // verbraucht.
  const { data: savedQuestion, error: insertError } = await supabase
    .from("begleiter_messages")
    .insert({ user_id: user.id, role: "user", body: message })
    .select("id")
    .single();
  if (insertError || !savedQuestion) return fail("not_configured", 503);

  // ---- Antwort streamen ----
  const anthropic = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answer = "";
      // Welches Modell tatsächlich geantwortet hat – wandert in den Verlauf.
      let benutztesModell = BEGLEITER_MODEL;

      // Hat das Hauptmodell gerade keine Kapazität (529 „Overloaded"), wird
      // die Frage einmal an das Ersatzmodell weitergereicht. Nur solange noch
      // kein Wort beim Leser angekommen ist – mitten im Text neu anzusetzen
      // würde die halbe Antwort doppeln. Fehler des Ersatzmodells beenden den
      // Versuch endgültig (die Schleife läuft dann aus).
      for (const modell of [BEGLEITER_MODEL, KI_MODELL_ERSATZ]) {
        benutztesModell = modell;
        try {
          const events = anthropic.messages.stream({
            model: modell,
            // Deckelt Denk- UND Antworttokens zusammen: Thinking ist bei
            // Opus standardmäßig an. Eine Antwort braucht ~300 Tokens,
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
          break;
        } catch (err) {
          if (
            modell !== KI_MODELL_ERSATZ &&
            !answer &&
            istKapazitaetsfehler(err)
          ) {
            console.warn(
              `[begleiter] ${modell} nicht verfügbar – weiche auf ${KI_MODELL_ERSATZ} aus:`,
              err,
            );
            continue;
          }
          // Den echten Fehler in die Server-Logs schreiben – nur so lässt sich
          // im Betrieb erkennen, WORAN der KI-Aufruf scheitert (ungültiger Key,
          // fehlendes Guthaben, blockierter Ausgang, Modell nicht verfügbar …).
          // Der Text an die Person bleibt bewusst allgemein.
          console.error("[begleiter] KI-Aufruf fehlgeschlagen:", err);

          // Abbruch mitten im Stream: Der Status steht schon auf 200, deshalb
          // kommt der Hinweis als Text.
          if (!answer) {
            // Ohne Antwort war der Versuch ergebnislos – die gespeicherte Frage
            // wieder entfernen (siehe Kommentar oben beim Speichern).
            await supabase
              .from("begleiter_messages")
              .delete()
              .eq("id", savedQuestion.id);
            controller.enqueue(
              encoder.encode(
                "Die Antwort konnte gerade nicht erzeugt werden. Versuch es in einem Moment noch einmal.",
              ),
            );
          }
          controller.close();
          return;
        }
      }

      // Nur vollständige Antworten in den Verlauf aufnehmen.
      if (answer.trim()) {
        await supabase.from("begleiter_messages").insert({
          user_id: user.id,
          role: "assistant",
          body: answer.trim(),
          model: benutztesModell,
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
