"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { slugify, type MethodeRow } from "@/lib/coaching-methoden";

/**
 * Server-Actions für die Coaching-Methoden-Bibliothek (/admin/methoden).
 *
 * Zugriff läuft über den Supabase-Client der angemeldeten Person – RLS sichert
 * `coaching_kategorien` und `coaching_methoden` über `ist_admin()` ab (siehe
 * Migration `coaching_methoden_schema`). Zusätzlich prüft jede Action
 * `isAdminEmail`, damit der Bereich für Mitglieder unsichtbar bleibt.
 * Kein Migrationsbedarf – Tabellen sind bereits eingespielt.
 */

const UEBERSICHT = "/admin/methoden";
const detailPath = (slug: string) => `${UEBERSICHT}/${slug}`;

export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | { ok: false; error: string };

type Gate =
  | { ok: false; error: string }
  | { ok: true; supabase: Awaited<ReturnType<typeof createClient>> };

/** Login + Admin-Recht prüfen und den (RLS-gebundenen) Client zurückgeben. */
async function requireAdmin(): Promise<Gate> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "Supabase ist nicht konfiguriert." };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht angemeldet." };
  if (!isAdminEmail(user.email)) return { ok: false, error: "Kein Admin-Zugriff." };
  return { ok: true, supabase };
}

// --- Validierung -----------------------------------------------------------

function text(v: unknown, max = 4000): string {
  return String(v ?? "").trim().slice(0, max);
}

/** Bereinigt eine Liste: trimmt, wirft leere Zeilen raus, begrenzt Länge/Anzahl. */
function list(v: unknown, maxItems = 40, maxLen = 1000): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((e) => String(e ?? "").trim())
    .filter(Boolean)
    .slice(0, maxItems)
    .map((e) => e.slice(0, maxLen));
}

function sortierung(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : 0;
}

type MethodeInput = {
  kategorie_id: string;
  name: string;
  herkunft: string;
  kern: string;
  wann_einsetzen: string;
  ablauf: string[];
  beispielfragen: string[];
  dauer: string;
  setting: string;
  hinweise: string;
  tags: string[];
  sortierung: number;
  aktiv: boolean;
  eigene_notizen: string;
};

function normalize(input: Record<string, unknown>): MethodeInput {
  return {
    kategorie_id: text(input.kategorie_id, 60),
    name: text(input.name, 200),
    herkunft: text(input.herkunft, 300),
    kern: text(input.kern, 1000),
    wann_einsetzen: text(input.wann_einsetzen, 2000),
    ablauf: list(input.ablauf),
    beispielfragen: list(input.beispielfragen),
    dauer: text(input.dauer, 100),
    setting: text(input.setting, 200),
    hinweise: text(input.hinweise, 3000),
    tags: list(input.tags, 40, 60),
    sortierung: sortierung(input.sortierung),
    aktiv: Boolean(input.aktiv),
    eigene_notizen: text(input.eigene_notizen, 8000),
  };
}

// --- Mutationen ------------------------------------------------------------

/** Aktualisiert eine bestehende Methode anhand ihrer id. */
export async function updateMethode(
  id: string,
  input: Record<string, unknown>,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const daten = normalize(input);
  if (!daten.name) return { ok: false, error: "Name darf nicht leer sein." };
  if (!daten.kategorie_id) return { ok: false, error: "Bitte eine Kategorie wählen." };

  const { data, error } = await gate.supabase
    .from("coaching_methoden")
    .update(daten)
    .eq("id", id)
    .select("slug")
    .maybeSingle();
  if (error) return { ok: false, error: error.message };

  revalidatePath(UEBERSICHT);
  if (data?.slug) revalidatePath(detailPath(data.slug));
  return { ok: true };
}

/** Schneller Umschalter aktiv ↔ inaktiv (Deaktivieren statt Löschen). */
export async function setAktiv(id: string, aktiv: boolean): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { error } = await gate.supabase
    .from("coaching_methoden")
    .update({ aktiv })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath(UEBERSICHT);
  return { ok: true };
}

/** Nur die eigenen Notizen speichern (Praxiserfahrungen des Coaches). */
export async function saveNotizen(id: string, notizen: unknown): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { data, error } = await gate.supabase
    .from("coaching_methoden")
    .update({ eigene_notizen: text(notizen, 8000) })
    .eq("id", id)
    .select("slug")
    .maybeSingle();
  if (error) return { ok: false, error: error.message };

  revalidatePath(UEBERSICHT);
  if (data?.slug) revalidatePath(detailPath(data.slug));
  return { ok: true };
}

/**
 * Legt eine neue Methode an. Der Slug entsteht aus dem Namen; kollidiert er,
 * wird ein Zähler angehängt. Gibt den erzeugten Slug zurück.
 */
export async function createMethode(
  input: Record<string, unknown>,
): Promise<ActionResult<{ slug: string }>> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const daten = normalize(input);
  if (!daten.name) return { ok: false, error: "Name darf nicht leer sein." };
  if (!daten.kategorie_id) return { ok: false, error: "Bitte eine Kategorie wählen." };

  const basis = slugify(daten.name) || "methode";

  // Eindeutigen Slug finden (basis, basis-2, basis-3 …).
  const { data: vorhandene } = await gate.supabase
    .from("coaching_methoden")
    .select("slug")
    .like("slug", `${basis}%`);
  const belegt = new Set((vorhandene ?? []).map((r) => (r as { slug: string }).slug));
  let slug = basis;
  let n = 2;
  while (belegt.has(slug)) slug = `${basis}-${n++}`;

  const { error } = await gate.supabase
    .from("coaching_methoden")
    .insert({ ...daten, slug });
  if (error) return { ok: false, error: error.message };

  revalidatePath(UEBERSICHT);
  revalidatePath(detailPath(slug));
  return { ok: true, data: { slug } };
}

/** Lädt eine Methode für die Bearbeiten-Ansicht (RLS: nur Admin). */
export async function getMethode(slug: string): Promise<MethodeRow | null> {
  const gate = await requireAdmin();
  if (!gate.ok) return null;

  const { data } = await gate.supabase
    .from("coaching_methoden")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return (data as MethodeRow | null) ?? null;
}
