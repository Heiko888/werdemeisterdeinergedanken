"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import type { GespraechRow, ZitatRow } from "@/lib/erstgespraech/types";
import {
  EMPFEHLUNG_OPTIONEN,
  ERGEBNIS_OPTIONEN,
  PHASEN,
  type Empfehlung,
  type Ergebnis,
} from "@/lib/erstgespraech/phasen";

/**
 * Server-Actions fürs Klarheitsgespräch-Cockpit.
 *
 * Zugriff läuft über den Supabase-Client der angemeldeten Person – RLS sichert
 * die drei `erstgespraech_*`-Tabellen über `ist_admin()` ab (siehe Migration
 * `erstgespraech_cockpit`). Zusätzlich prüft jede Action `isAdminEmail`, damit
 * der Bereich für Mitglieder unsichtbar bleibt. Keine Datenbankmigration.
 */

const UEBERSICHT = "/admin/erstgespraeche";
const cockpitPath = (id: string) => `${UEBERSICHT}/${id}`;

export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | { ok: false; error: string };

type Gate =
  | { ok: false; error: string }
  | { ok: true; supabase: Awaited<ReturnType<typeof createClient>>; userId: string };

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
  if (!isAdminEmail(user.email)) {
    return { ok: false, error: "Kein Admin-Zugriff." };
  }
  return { ok: true, supabase, userId: user.id };
}

// --- kleine Helfer ---------------------------------------------------------

function text(v: unknown, max = 4000): string {
  return String(v ?? "").slice(0, max);
}

function stufeOrNull(v: unknown): number | null {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 7 ? n : null;
}

function asErgebnis(v: unknown): Ergebnis | null {
  return ERGEBNIS_OPTIONEN.some((o) => o.wert === v) ? (v as Ergebnis) : null;
}

function asEmpfehlung(v: unknown): Empfehlung | null {
  return EMPFEHLUNG_OPTIONEN.some((o) => o.wert === v) ? (v as Empfehlung) : null;
}

/** Nur echte Phasen-Schlüssel (p1…p6) durchlassen. */
function saeubereNotizen(v: unknown): Record<string, string> {
  const erlaubt = new Set(PHASEN.map((p) => p.key));
  const out: Record<string, string> = {};
  if (v && typeof v === "object") {
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (erlaubt.has(k as (typeof PHASEN)[number]["key"])) {
        out[k] = text(val, 8000);
      }
    }
  }
  return out;
}

function saeubereAbgehakt(v: unknown): Record<string, string[]> {
  const erlaubt = new Set(PHASEN.map((p) => p.key));
  const out: Record<string, string[]> = {};
  if (v && typeof v === "object") {
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (erlaubt.has(k as (typeof PHASEN)[number]["key"]) && Array.isArray(val)) {
        out[k] = val.map((x) => text(x, 40)).slice(0, 50);
      }
    }
  }
  return out;
}

function isoDateOrNull(v: unknown): string | null {
  const s = String(v ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  return s;
}

// --- Übersicht: Gespräch anlegen ------------------------------------------

/**
 * Legt aus einem offenen Fragebogen ein geführtes Gespräch an und setzt den
 * Fragebogen auf „gelesen“, damit er nicht mehr unter „offen“ auftaucht.
 * Gibt die neue Gesprächs-ID zurück.
 */
export async function gespraechStarten(
  fragebogenId: string,
): Promise<ActionResult<{ id: string }>> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { data: fb, error: fbErr } = await gate.supabase
    .from("erstgespraech_fragebogen")
    .select("id, name, email, stufe")
    .eq("id", fragebogenId)
    .single();
  if (fbErr || !fb) {
    return { ok: false, error: fbErr?.message ?? "Fragebogen nicht gefunden." };
  }

  const { data: neu, error } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .insert({
      fragebogen_id: fb.id,
      interessent_name: fb.name,
      interessent_email: fb.email,
      stufe_selbst: fb.stufe ?? null,
      ergebnis: "offen",
      created_by: gate.userId,
    })
    .select("id")
    .single();
  if (error || !neu) {
    return { ok: false, error: error?.message ?? "Konnte nicht anlegen." };
  }

  await gate.supabase
    .from("erstgespraech_fragebogen")
    .update({ status: "gelesen" })
    .eq("id", fb.id)
    .eq("status", "neu");

  revalidatePath(UEBERSICHT);
  return { ok: true, data: { id: neu.id } };
}

/** Gespräch ohne Fragebogen – für Leute, die ohne Formular kommen. */
export async function gespraechOhneFragebogen(
  name: string,
): Promise<ActionResult<{ id: string }>> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const sauber = text(name, 200).trim();
  if (!sauber) return { ok: false, error: "Bitte einen Namen angeben." };

  const { data: neu, error } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .insert({
      interessent_name: sauber,
      ergebnis: "offen",
      created_by: gate.userId,
    })
    .select("id")
    .single();
  if (error || !neu) {
    return { ok: false, error: error?.message ?? "Konnte nicht anlegen." };
  }

  revalidatePath(UEBERSICHT);
  return { ok: true, data: { id: neu.id } };
}

// --- Gesprächsuhr ----------------------------------------------------------

/** Startet die Uhr beim ersten Mal (setzt `gestartet_am`, falls noch leer). */
export async function uhrStarten(
  id: string,
): Promise<ActionResult<{ gestartet_am: string }>> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { data: row } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .select("gestartet_am")
    .eq("id", id)
    .single();

  if (row?.gestartet_am) {
    return { ok: true, data: { gestartet_am: row.gestartet_am } };
  }

  const jetzt = new Date().toISOString();
  const { error } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .update({ gestartet_am: jetzt })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  return { ok: true, data: { gestartet_am: jetzt } };
}

/** Beendet das Gespräch: `beendet_am` + `dauer_sekunden` (netto, ohne Pausen). */
export async function gespraechBeenden(
  id: string,
  dauerSekunden: number,
): Promise<ActionResult<{ beendet_am: string; dauer_sekunden: number }>> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const jetzt = new Date().toISOString();
  const dauer = Math.max(0, Math.round(Number(dauerSekunden) || 0));

  const { error } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .update({ beendet_am: jetzt, dauer_sekunden: dauer })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath(cockpitPath(id));
  return { ok: true, data: { beendet_am: jetzt, dauer_sekunden: dauer } };
}

// --- Notizen & Abhaken (Auto-Speichern, kein Revalidate) -------------------

/** Speichert alle Phasen-Notizen (`notizen` jsonb). Ruhig, ohne Revalidate. */
export async function notizenSpeichern(
  id: string,
  notizen: Record<string, string>,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { error } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .update({ notizen: saeubereNotizen(notizen) })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Speichert den Abhak-Stand (`abgehakt` jsonb). */
export async function abgehaktSpeichern(
  id: string,
  abgehakt: Record<string, string[]>,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { error } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .update({ abgehakt: saeubereAbgehakt(abgehakt) })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Selbst-/Fremdeinschätzung der Stufe live speichern. */
export async function stufeSpeichern(
  id: string,
  feld: "stufe_selbst" | "stufe_eingeschaetzt",
  wert: number | null,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { error } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .update({ [feld]: stufeOrNull(wert) })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// --- Zitate ----------------------------------------------------------------

export async function zitatSichern(
  gespraechId: string,
  zitat: string,
  phase: string | null,
): Promise<ActionResult<ZitatRow>> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const sauber = text(zitat, 4000).trim();
  if (!sauber) return { ok: false, error: "Leeres Zitat." };

  const { data, error } = await gate.supabase
    .from("erstgespraech_zitate")
    .insert({
      gespraech_id: gespraechId,
      zitat: sauber,
      phase: phase ? text(phase, 20) : null,
    })
    .select("*")
    .single();
  if (error || !data) {
    return { ok: false, error: error?.message ?? "Konnte nicht speichern." };
  }

  return { ok: true, data: data as ZitatRow };
}

export async function zitatLoeschen(id: string): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const { error } = await gate.supabase
    .from("erstgespraech_zitate")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// --- Abschluss -------------------------------------------------------------

export type AbschlussInput = {
  ergebnis: unknown;
  empfehlung: unknown;
  einwand: unknown;
  stufe_eingeschaetzt: unknown;
  wertvollstes: unknown;
  naechster_schritt: unknown;
  naechster_schritt_am: unknown;
  freitext: unknown;
};

/**
 * Speichert den Gesprächs-Abschluss. Ist ein Fragebogen verknüpft, wandert er
 * auf `gespraech_gefuehrt`.
 */
export async function abschlussSpeichern(
  id: string,
  input: AbschlussInput,
): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return gate;

  const patch = {
    ergebnis: asErgebnis(input.ergebnis) ?? "offen",
    empfehlung: asEmpfehlung(input.empfehlung),
    einwand: text(input.einwand, 400) || null,
    stufe_eingeschaetzt: stufeOrNull(input.stufe_eingeschaetzt),
    wertvollstes: text(input.wertvollstes, 4000) || null,
    naechster_schritt: text(input.naechster_schritt, 600) || null,
    naechster_schritt_am: isoDateOrNull(input.naechster_schritt_am),
    freitext: text(input.freitext, 8000) || null,
  };

  const { data: row, error } = await gate.supabase
    .from("erstgespraech_gespraeche")
    .update(patch)
    .eq("id", id)
    .select("fragebogen_id")
    .single();
  if (error) return { ok: false, error: error.message };

  const fragebogenId = (row as Pick<GespraechRow, "fragebogen_id">)?.fragebogen_id;
  if (fragebogenId) {
    await gate.supabase
      .from("erstgespraech_fragebogen")
      .update({ status: "gespraech_gefuehrt" })
      .eq("id", fragebogenId);
  }

  revalidatePath(UEBERSICHT);
  revalidatePath(cockpitPath(id));
  return { ok: true };
}
