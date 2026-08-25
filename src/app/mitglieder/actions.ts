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

export type JournalEntry = {
  itemType: NoteItemType;
  itemKey: string;
  ref: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Alle (nicht-leeren) Journal-Einträge der Person – neueste zuerst.
 * Grundlage für die zentrale „Mein Journal"-Übersicht.
 */
export async function getJournalEntries(): Promise<JournalEntry[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("notes")
    .select("item_type, item_key, ref, body, created_at, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return (data ?? [])
    .filter((row) => String(row.body ?? "").trim().length > 0)
    .map((row) => ({
      itemType: row.item_type as NoteItemType,
      itemKey: row.item_key as string,
      ref: row.ref as string,
      body: row.body as string,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    }));
}

export type TestPoint = { topStage: number; takenAt: string };

/**
 * Verlauf der Bewusstseinstests (älteste zuerst) für die Wachstumskurve.
 * Leer, falls Migration 0006 noch nicht eingespielt ist oder niemand
 * angemeldet ist – die Journal-Seite blendet die Kurve dann einfach aus.
 */
export async function getTestHistory(): Promise<TestPoint[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("test_results")
    .select("top_stage, taken_at")
    .eq("user_id", user.id)
    .order("taken_at", { ascending: true });

  if (error) return [];
  return (data ?? []).map((row) => ({
    topStage: row.top_stage as number,
    takenAt: row.taken_at as string,
  }));
}

/** Startstufe aus dem Bewusstseinstest (oder null). Für das Cockpit. */
export async function getStartStage(): Promise<number | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("start_stage")
    .eq("id", user.id)
    .maybeSingle();

  return (data?.start_stage as number | null) ?? null;
}

export type TestProfile = {
  /** Schwerpunkt-Stufe (1–7) oder null. */
  startStage: number | null;
  /** Punkte je Stufe (Index 0 = Stufe 1), 0–12; null wenn kein Test. */
  scores: number[] | null;
};

/**
 * Schwerpunkt-Stufe + Punktzahl je Stufe aus dem letzten Test (Spalten aus
 * Migration 0002). Grundlage für das Gedankenprofil. Ohne Test/Anmeldung
 * bleiben beide Felder null – die Seite zeigt dann eine Einladung.
 */
export async function getTestProfile(): Promise<TestProfile> {
  if (!isSupabaseConfigured) return { startStage: null, scores: null };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { startStage: null, scores: null };

  const { data } = await supabase
    .from("profiles")
    .select("start_stage, test_scores")
    .eq("id", user.id)
    .maybeSingle();

  const rawScores = data?.test_scores as number[] | null | undefined;
  const scores =
    Array.isArray(rawScores) && rawScores.length === 7
      ? rawScores.map((n) => Math.max(0, Math.round(Number(n) || 0)))
      : null;

  return {
    startStage: (data?.start_stage as number | null) ?? null,
    scores,
  };
}

// ------------------------------------------------------------
// E-Mail-Impulse: Abo an-/abschalten
// ------------------------------------------------------------

/** Wöchentliche E-Mail-Impulse abonnieren bzw. abbestellen. */
export async function setNewsletterOptIn(
  optIn: boolean,
): Promise<{ optIn: boolean }> {
  if (!isSupabaseConfigured) return { optIn: false };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { optIn: false };

  const { error } = await supabase
    .from("profiles")
    .update({
      newsletter_opt_in: optIn,
      newsletter_opted_in_at: optIn ? new Date().toISOString() : null,
    })
    .eq("id", user.id);

  if (error) return { optIn: !optIn };

  revalidatePath("/mitglieder");
  return { optIn };
}

/**
 * Anzeigenamen setzen. Schreibt profiles.full_name (RLS: nur eigene Zeile) und
 * zieht die Auth-Metadaten mit, damit beide Quellen konsistent sind.
 */
export async function updateDisplayName(
  rawName: string,
): Promise<{ ok: boolean; name?: string; error?: string }> {
  if (!isSupabaseConfigured)
    return { ok: false, error: "Der Mitgliederbereich ist noch nicht konfiguriert." };

  const name = rawName.trim();
  if (!name) return { ok: false, error: "Bitte gib deinen Namen an." };
  if (name.length > 80) return { ok: false, error: "Der Name ist zu lang." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Du bist nicht angemeldet." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: name })
    .eq("id", user.id);
  if (error) return { ok: false, error: "Konnte nicht gespeichert werden." };

  // Metadaten mitziehen (Fallback-Quelle im Dashboard).
  await supabase.auth.updateUser({ data: { full_name: name } });

  revalidatePath("/mitglieder");
  revalidatePath("/mitglieder/einstellungen");
  return { ok: true, name };
}

/**
 * Passwort der angemeldeten Person ändern (session-basiert über Supabase Auth –
 * das alte Passwort ist dafür nicht nötig, da die Sitzung bereits geprüft ist).
 */
export async function updatePassword(
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured)
    return { ok: false, error: "Der Mitgliederbereich ist noch nicht konfiguriert." };
  if (password.length < 8)
    return { ok: false, error: "Das Passwort muss mindestens 8 Zeichen lang sein." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Du bist nicht angemeldet." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { ok: false, error: error.message };

  return { ok: true };
}
