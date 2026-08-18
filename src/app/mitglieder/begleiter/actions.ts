"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { ChatMessage, ChatRole } from "@/lib/begleiter";

/**
 * KI-Begleiter – Verlauf laden und löschen.
 *
 * Das Erzeugen einer Antwort läuft nicht über eine Server-Action, sondern über
 * den Route-Handler `begleiter/antwort/route.ts`: Nur so kann die Antwort
 * gestreamt werden (Wort für Wort statt zehn Sekunden Warten).
 */

/** Ist der Begleiter serverseitig einsatzbereit? */
export async function isBegleiterConfigured(): Promise<boolean> {
  return Boolean(process.env.ANTHROPIC_API_KEY) && isSupabaseConfigured;
}

/**
 * Der gespeicherte Gesprächsverlauf der angemeldeten Person, chronologisch.
 *
 * Fehlt die Tabelle noch (Migration 0009 nicht eingespielt), kommt einfach ein
 * leerer Verlauf zurück – die Seite bleibt bedienbar.
 */
export async function getConversation(): Promise<ChatMessage[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("begleiter_messages")
    .select("id, role, body, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id as string,
    role: row.role as ChatRole,
    body: row.body as string,
    createdAt: row.created_at as string,
  }));
}

/**
 * Löscht das gesamte Gespräch der angemeldeten Person.
 * Row-Level-Security stellt sicher, dass nur eigene Zeilen betroffen sind.
 */
export async function clearConversation(): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured) return { ok: false };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { error } = await supabase
    .from("begleiter_messages")
    .delete()
    .eq("user_id", user.id);

  return { ok: !error };
}
