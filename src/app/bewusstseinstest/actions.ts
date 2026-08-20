"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  answerScale,
  testQuestions,
  scoreByStage,
  topStage,
} from "@/lib/consciousness-test";

const MAX_ANSWER = answerScale[answerScale.length - 1].value; // 4

/**
 * Speichert das Ergebnis des Bewusstseinstests am Profil der aktuell
 * angemeldeten Person – damit der Mitgliederbereich personalisiert begrüßen
 * kann ("Deine Startstufe: …").
 *
 * Es werden bewusst die ROHEN Antworten (0–4 je Frage) übergeben und Score
 * sowie Stufe hier serverseitig neu berechnet. So lässt sich über die
 * Client-Schnittstelle kein frei erfundenes Ergebnis (z. B. Maximalstufe)
 * ins eigene Profil schreiben.
 *
 * Ist niemand angemeldet (der Test ist auch öffentlich nutzbar), passiert
 * bewusst nichts: `{ saved: false }`.
 */
export async function saveStartStage(
  answers: unknown,
): Promise<{ saved: boolean }> {
  if (!isSupabaseConfigured) return { saved: false };

  // Rohe Antworten validieren – Länge und Wertebereich müssen passen.
  if (!Array.isArray(answers) || answers.length !== testQuestions.length) {
    return { saved: false };
  }
  const cleanAnswers = answers.map((a) => {
    const n = Number(a);
    return Number.isInteger(n) && n >= 0 && n <= MAX_ANSWER ? n : null;
  });

  // Score und Stufe serverseitig aus den Antworten ableiten (nicht vom Client).
  const scores = scoreByStage(cleanAnswers);
  const startStage = topStage(scores);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { saved: false };

  const { error } = await supabase
    .from("profiles")
    .update({
      start_stage: startStage,
      test_scores: scores,
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
    scores,
  });

  revalidatePath("/mitglieder");
  return { saved: true };
}

