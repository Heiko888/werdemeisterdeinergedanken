"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * „Die tägliche Rückkehr" – offene Tages-Praxis.
 *
 * Jede Rückkehr ist eine Zeile in der `rueckkehr`-Tabelle, geschlüsselt auf den
 * Kalendertag (siehe Migration 0012). Der Tag kommt aus der LOKALEN Zeit der
 * Person (der Client übergibt sein YYYY-MM-DD), damit „heute" dort stimmt, wo
 * die Person lebt – nicht in UTC. Gegen Missbrauch wird nur akzeptiert, was
 * höchstens einen Tag von der Server-Zeit abweicht.
 */

/** Datum als YYYY-MM-DD in UTC, verschoben um `offsetTage`. */
function utcDatum(offsetTage: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetTage);
  return d.toISOString().slice(0, 10);
}

/** Nur ein echtes YYYY-MM-DD in Server-Nähe (±1 Tag) ist gültig. */
function istPlausiblesHeute(datum: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return false;
  return [utcDatum(-1), utcDatum(0), utcDatum(1)].includes(datum);
}

export type RueckkehrDaten = {
  /** Alle Rückkehr-Tage (YYYY-MM-DD), jüngste zuerst – für Rhythmus & Serie. */
  tage: string[];
};

/** Die zurückliegenden Rückkehr-Tage der angemeldeten Person. */
export async function getRueckkehrDaten(): Promise<RueckkehrDaten> {
  if (!isSupabaseConfigured) return { tage: [] };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { tage: [] };

  // Ein großzügiges Fenster reicht für Rhythmus-Streifen und Serie.
  const seit = utcDatum(-400);
  const { data } = await supabase
    .from("rueckkehr")
    .select("datum")
    .eq("user_id", user.id)
    .gte("datum", seit)
    .order("datum", { ascending: false });

  return { tage: (data ?? []).map((r) => r.datum as string) };
}

export type MarkiereResult =
  | { status: "ok"; tage: string[] }
  | { status: "invalid" }
  | { status: "unauthenticated" };

/**
 * Hält die Rückkehr für den übergebenen (lokalen) Kalendertag fest. Idempotent:
 * ein zweiter Klick am selben Tag ändert nichts. Nur per Klick aufrufen.
 */
export async function markiereRueckkehr(datum: string): Promise<MarkiereResult> {
  if (!isSupabaseConfigured) return { status: "unauthenticated" };
  if (!istPlausiblesHeute(datum)) return { status: "invalid" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "unauthenticated" };

  // Idempotent: bereits vorhandener Tag bleibt unberührt.
  await supabase
    .from("rueckkehr")
    .upsert(
      { user_id: user.id, datum },
      { onConflict: "user_id,datum", ignoreDuplicates: true },
    );

  revalidatePath("/mitglieder/rueckkehr");
  const { tage } = await getRueckkehrDaten();
  return { status: "ok", tage };
}
