"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Lese-Status der Wissensdatenbank-Kapitel.
 *
 * Nutzt die bestehende `progress`-Tabelle (item_type = 'wissenskapitel',
 * item_key = Kapitel-Slug) – dieselbe Mechanik wie Stufen und Programm; siehe
 * Migration 0014. Ist die Migration noch nicht eingespielt, schlägt nur das
 * Schreiben fehl (der CHECK-Constraint) – die Leseabfragen bleiben leer statt
 * zu brechen, und das Schreiben wird sauber als Fehlschlag gemeldet.
 */

/** Slugs aller als gelesen markierten Kapitel. */
export async function getGeleseneKapitel(): Promise<string[]> {
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
    .eq("item_type", "wissenskapitel")
    .eq("status", "completed");

  return (data ?? []).map((row) => row.item_key as string);
}

/** Ist ein einzelnes Kapitel als gelesen markiert? */
export async function istKapitelGelesen(slug: string): Promise<boolean> {
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
    .eq("item_type", "wissenskapitel")
    .eq("item_key", slug)
    .maybeSingle();

  return Boolean(data);
}

/** Ein Kapitel als gelesen markieren oder die Markierung zurücknehmen. */
export async function setKapitelGelesen(
  slug: string,
  gelesen: boolean,
): Promise<{ ok: boolean; gelesen: boolean }> {
  if (!isSupabaseConfigured) return { ok: false, gelesen: false };
  if (typeof slug !== "string" || slug.length === 0) {
    return { ok: false, gelesen: false };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, gelesen: false };

  if (gelesen) {
    const { error } = await supabase.from("progress").upsert(
      {
        user_id: user.id,
        item_type: "wissenskapitel",
        item_key: slug,
        status: "completed",
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,item_type,item_key" },
    );
    // Fehler (z. B. noch fehlende Migration 0014) sauber melden → UI kann den
    // optimistischen Zustand zurücknehmen, statt „gelesen" fälschlich zu zeigen.
    if (error) return { ok: false, gelesen: false };
  } else {
    const { error } = await supabase
      .from("progress")
      .delete()
      .eq("user_id", user.id)
      .eq("item_type", "wissenskapitel")
      .eq("item_key", slug);
    if (error) return { ok: false, gelesen: true };
  }

  revalidatePath("/mitglieder/wissensdatenbank");
  revalidatePath(`/mitglieder/wissensdatenbank/${slug}`);
  return { ok: true, gelesen };
}
