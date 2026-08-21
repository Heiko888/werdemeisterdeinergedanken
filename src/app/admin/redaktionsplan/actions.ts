"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import {
  flattenForSeed,
  type Kanal,
  type PostStatus,
} from "@/lib/redaktionsplan";

/**
 * Server-Actions fürs bearbeitbare Redaktionsplan-Cockpit.
 *
 * Alle Schreib-/Lesezugriffe laufen über den Service-Role-Client
 * (`createAdminClient`, umgeht RLS) – aber erst, NACHDEM `requireAdmin()` die
 * angemeldete Person als Admin bestätigt hat. So bleibt die Tabelle für den
 * öffentlichen Anon-Key komplett gesperrt (siehe Migration 0013).
 */

export type PlanPostRow = {
  id: string;
  woche: number;
  block: string;
  thema: string;
  wochentag: number;
  uhrzeit: string;
  kanal: Kanal;
  format: string;
  titel: string;
  quelle: string;
  cta: string;
  status: PostStatus;
  optional: boolean;
  notiz: string;
  sort: number;
};

const TABLE = "redaktionsplan_posts";
const PATH = "/admin/redaktionsplan";

const KANAELE: Kanal[] = ["ig", "fb", "li", "yt"];
const STATI: PostStatus[] = ["geplant", "erstellt", "veroeffentlicht"];

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string };

type AdminGate =
  | { ok: false; error: string }
  | { ok: true; admin: NonNullable<ReturnType<typeof createAdminClient>> };

/** Prüft Login + Admin-Recht und gibt den Service-Role-Client zurück. */
async function requireAdmin(): Promise<AdminGate> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "Supabase ist nicht konfiguriert." };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht angemeldet." };
  if (!isAdminEmail(user.email)) return { ok: false, error: "Kein Admin-Zugriff." };

  const admin = createAdminClient();
  if (!admin) {
    return {
      ok: false,
      error:
        "SUPABASE_SERVICE_ROLE_KEY fehlt – der Redaktionsplan braucht ihn zum Speichern.",
    };
  }
  return { ok: true, admin };
}

/** Alle Posts, sortiert für die Anzeige. Leeres Array, wenn nicht verfügbar. */
export async function getPlanPosts(): Promise<{
  posts: PlanPostRow[];
  configured: boolean;
  error?: string;
}> {
  const gate = await requireAdmin();
  if (!gate.ok) return { posts: [], configured: false, error: gate.error };

  const { data, error } = await gate.admin
    .from(TABLE)
    .select("*")
    .order("woche", { ascending: true })
    .order("wochentag", { ascending: true })
    .order("sort", { ascending: true });

  if (error) return { posts: [], configured: true, error: error.message };
  return { posts: (data ?? []) as PlanPostRow[], configured: true };
}

/** Anzahl vorhandener Posts – um „leer?" zu erkennen. */
export async function countPlanPosts(): Promise<number> {
  const gate = await requireAdmin();
  if (!gate.ok) return 0;
  const { count } = await gate.admin
    .from(TABLE)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

// --- Validierung -----------------------------------------------------------

function cleanText(v: unknown, max = 600): string {
  return String(v ?? "").slice(0, max);
}
function asKanal(v: unknown): Kanal {
  return KANAELE.includes(v as Kanal) ? (v as Kanal) : "ig";
}
function asStatus(v: unknown): PostStatus {
  return STATI.includes(v as PostStatus) ? (v as PostStatus) : "geplant";
}
function asWochentag(v: unknown): number {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 7 ? n : 1;
}
function asWoche(v: unknown): number {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 999 ? n : 1;
}

type PostInput = {
  woche: number;
  block: string;
  thema: string;
  wochentag: number;
  uhrzeit: string;
  kanal: Kanal;
  format: string;
  titel: string;
  quelle: string;
  cta: string;
  status: PostStatus;
  optional: boolean;
  notiz: string;
};

function normalize(input: Record<string, unknown>): PostInput {
  return {
    woche: asWoche(input.woche),
    block: cleanText(input.block, 4) || "A",
    thema: cleanText(input.thema, 120),
    wochentag: asWochentag(input.wochentag),
    uhrzeit: cleanText(input.uhrzeit, 20),
    kanal: asKanal(input.kanal),
    format: cleanText(input.format, 60),
    titel: cleanText(input.titel, 600),
    quelle: cleanText(input.quelle, 300),
    cta: cleanText(input.cta, 200),
    status: asStatus(input.status),
    optional: Boolean(input.optional),
    notiz: cleanText(input.notiz, 1000),
  };
}

// --- Mutationen ------------------------------------------------------------

export async function updatePost(
  id: string,
  input: Record<string, unknown>,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { error } = await gate.admin
    .from(TABLE)
    .update(normalize(input))
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath(PATH);
  return { ok: true };
}

/** Schneller Status-Wechsel (geplant → erstellt → veröffentlicht). */
export async function setStatus(
  id: string,
  status: PostStatus,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { error } = await gate.admin
    .from(TABLE)
    .update({ status: asStatus(status) })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath(PATH);
  return { ok: true };
}

export async function addPost(
  input: Record<string, unknown>,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const row = normalize(input);
  // Ans Ende des Tages einsortieren.
  const { data: last } = await gate.admin
    .from(TABLE)
    .select("sort")
    .eq("woche", row.woche)
    .eq("wochentag", row.wochentag)
    .order("sort", { ascending: false })
    .limit(1)
    .maybeSingle();
  const sort = (last?.sort ?? -1) + 1;

  const { error } = await gate.admin.from(TABLE).insert({ ...row, sort });
  if (error) return { ok: false, error: error.message };

  revalidatePath(PATH);
  return { ok: true };
}

export async function deletePost(id: string): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { error } = await gate.admin.from(TABLE).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath(PATH);
  return { ok: true };
}

/**
 * Importiert den Standard-Plan (20 Wochen) aus `src/lib/redaktionsplan.ts`.
 * `ersetzen: true` leert die Tabelle vorher (Reset), sonst wird nur ergänzt,
 * wenn die Tabelle leer ist.
 */
export async function seedDefaultPlan(
  ersetzen = false,
): Promise<ActionResult & { imported?: number }> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  if (ersetzen) {
    // Alles löschen (neq auf eine unmögliche id trifft alle Zeilen).
    const { error: delErr } = await gate.admin
      .from(TABLE)
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    if (delErr) return { ok: false, error: delErr.message };
  } else {
    const { count } = await gate.admin
      .from(TABLE)
      .select("*", { count: "exact", head: true });
    if ((count ?? 0) > 0) {
      return { ok: false, error: "Plan ist bereits vorhanden. Zum Überschreiben „zurücksetzen“ nutzen." };
    }
  }

  const rows = flattenForSeed().map((r) => ({
    woche: r.woche,
    block: r.block,
    thema: r.thema,
    wochentag: r.wochentag,
    uhrzeit: r.uhrzeit,
    kanal: r.kanal,
    format: r.format,
    titel: r.titel,
    quelle: r.quelle,
    cta: r.cta,
    optional: r.optional,
    sort: r.sort,
    status: "geplant" as PostStatus,
  }));

  const { error } = await gate.admin.from(TABLE).insert(rows);
  if (error) return { ok: false, error: error.message };

  revalidatePath(PATH);
  return { ok: true, imported: rows.length };
}
