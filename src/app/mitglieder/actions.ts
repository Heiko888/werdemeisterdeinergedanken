"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Fortschritts-Actions für den Mitgliederbereich.
 * Alle Schreibvorgänge sind zusätzlich per Row-Level-Security abgesichert
 * (siehe supabase/migrations/0002_progress_and_test.sql) – die Prüfung hier
 * ist die UX-Ebene, die eigentliche Autorisierung passiert in der Datenbank.
 */

/** Schlüssel aller abgeschlossenen Stufen der aktuellen Person ("01" … "07"). */
export async function getCompletedStages(): Promise<string[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("progress")
    .select("item_key")
    .eq("user_id", user.id)
    .eq("item_type", "stage")
    .eq("status", "completed");

  return (data ?? []).map((row) => row.item_key as string);
}

/** Ist eine einzelne Stufe abgeschlossen? (für die Detailseite) */
export async function isStageCompleted(stageKey: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from("progress")
    .select("item_key")
    .eq("user_id", user.id)
    .eq("item_type", "stage")
    .eq("item_key", stageKey)
    .eq("status", "completed")
    .maybeSingle();

  return Boolean(data);
}

/** Stufe als abgeschlossen markieren bzw. die Markierung entfernen. */
export async function setStageCompleted(
  stageKey: string,
  completed: boolean,
): Promise<{ completed: boolean }> {
  if (!isSupabaseConfigured) return { completed: false };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { completed: false };

  if (completed) {
    await supabase.from("progress").upsert(
      {
        user_id: user.id,
        item_type: "stage",
        item_key: stageKey,
        status: "completed",
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,item_type,item_key" },
    );
  } else {
    await supabase
      .from("progress")
      .delete()
      .eq("user_id", user.id)
      .eq("item_type", "stage")
      .eq("item_key", stageKey);
  }

  revalidatePath("/mitglieder");
  return { completed };
}

// ------------------------------------------------------------
// Journal / Notizen zu Reflexionsfragen
// ------------------------------------------------------------

type NoteItemType = "stage" | "deep_dive" | "practice";

/** Alle Notizen zu einem Inhalt als { ref: body }-Map. */
export async function getNotes(
  itemType: NoteItemType,
  itemKey: string,
): Promise<Record<string, string>> {
  if (!isSupabaseConfigured) return {};
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return {};

  const { data } = await supabase
    .from("notes")
    .select("ref, body")
    .eq("user_id", user.id)
    .eq("item_type", itemType)
    .eq("item_key", itemKey);

  const map: Record<string, string> = {};
  for (const row of data ?? []) {
    map[row.ref as string] = (row.body as string) ?? "";
  }
  return map;
}

/** Eine Notiz speichern (Upsert pro Anker). */
export async function saveNote(
  itemType: NoteItemType,
  itemKey: string,
  ref: string,
  body: string,
): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured) return { ok: false };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { error } = await supabase.from("notes").upsert(
    {
      user_id: user.id,
      item_type: itemType,
      item_key: itemKey,
      ref,
      body: body ?? "",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,item_type,item_key,ref" },
  );

  return { ok: !error };
}
