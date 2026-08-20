"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { tagKey } from "@/lib/programm";

/**
 * Fortschritt im Programm „21 Tage Autopilot-Ausstieg".
 *
 * Nutzt die bestehende `progress`-Tabelle (item_type = 'programm',
 * item_key = '01'…'21'); siehe Migration 0011. Bewusst dieselbe Mechanik wie
 * `setStageCompleted` – ein abgeschlossener Tag ist eine Zeile, ein Widerruf
 * löscht sie wieder.
 */

/** Die Tages-Schlüssel ('01'…'21'), die bereits abgeschlossen sind. */
export async function getProgrammFortschritt(): Promise<string[]> {
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
    .eq("item_type", "programm")
    .eq("status", "completed");

  return (data ?? []).map((row) => row.item_key as string);
}

/** Einen Programm-Tag als abgeschlossen markieren oder den Haken zurücknehmen. */
export async function setProgrammTag(
  tag: number,
  completed: boolean,
): Promise<{ completed: boolean }> {
  if (!isSupabaseConfigured) return { completed: false };
  if (!Number.isInteger(tag) || tag < 1 || tag > 21) {
    return { completed: false };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { completed: false };

  const key = tagKey(tag);

  if (completed) {
    await supabase.from("progress").upsert(
      {
        user_id: user.id,
        item_type: "programm",
        item_key: key,
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
      .eq("item_type", "programm")
      .eq("item_key", key);
  }

  revalidatePath("/mitglieder/programm");
  return { completed };
}
