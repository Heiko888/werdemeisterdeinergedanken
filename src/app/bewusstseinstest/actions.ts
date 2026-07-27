"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Speichert das Ergebnis des Bewusstseinstests am Profil der aktuell
 * angemeldeten Person – damit der Mitgliederbereich personalisiert begrüßen
 * kann ("Deine Startstufe: …").
 *
 * Ist niemand angemeldet (der Test ist auch öffentlich nutzbar), passiert
 * bewusst nichts: `{ saved: false }`.
 */
export async function saveStartStage(
  stage: number,
  scores: number[],
): Promise<{ saved: boolean }> {
  if (!isSupabaseConfigured) return { saved: false };

  // Eingaben defensiv normalisieren.
  const startStage = Math.round(stage);
  if (!Number.isInteger(startStage) || startStage < 1 || startStage > 7) {
    return { saved: false };
  }
  const safeScores = Array.isArray(scores)
    ? scores.slice(0, 7).map((n) => Math.max(0, Math.round(Number(n) || 0)))
    : null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { saved: false };

  const takenAt = new Date().toISOString();

  const { error } = await supabase
    .from("profiles")
    .update({
      start_stage: startStage,
      test_scores: safeScores,
      test_taken_at: takenAt,
    })
    .eq("id", user.id);

  if (error) return { saved: false };

  // Verlauf: jedes Ergebnis als eigene Zeile festhalten (Migration 0005).
  // Fehler hier sind unkritisch – das aktuelle Ergebnis ist bereits gespeichert.
  await supabase.from("test_results").insert({
    user_id: user.id,
    top_stage: startStage,
    scores: safeScores ?? [],
    taken_at: takenAt,
  });

  revalidatePath("/mitglieder");
  revalidatePath("/mitglieder/standortbestimmung");
  return { saved: true };
}

export type TestHistoryEntry = {
  topStage: number;
  scores: number[];
  takenAt: string;
};

/** Verlauf der Testergebnisse der aktuellen Person (neueste zuerst). */
export async function getTestHistory(): Promise<TestHistoryEntry[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("test_results")
    .select("top_stage, scores, taken_at")
    .eq("user_id", user.id)
    .order("taken_at", { ascending: false })
    .limit(20);

  return (data ?? []).map((row) => ({
    topStage: row.top_stage as number,
    scores: (row.scores as number[]) ?? [],
    takenAt: row.taken_at as string,
  }));
}
