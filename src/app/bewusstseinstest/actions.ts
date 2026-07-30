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

  const { error } = await supabase
    .from("profiles")
    .update({
      start_stage: startStage,
      test_scores: safeScores,
      test_taken_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { saved: false };

  // Verlauf für die Wachstumskurve: jedes Ergebnis als eigener Datensatz.
  // Bewusst nicht-fatal – falls Migration 0006 noch nicht eingespielt ist,
  // bleibt das Speichern des Profil-Ergebnisses oben trotzdem gültig.
  await supabase.from("test_results").insert({
    user_id: user.id,
    top_stage: startStage,
    scores: safeScores,
  });

  revalidatePath("/mitglieder");
  return { saved: true };
}

