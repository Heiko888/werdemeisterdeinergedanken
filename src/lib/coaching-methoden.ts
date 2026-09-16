/**
 * Coaching-Methoden-Bibliothek – gemeinsame Typen & Helfer.
 *
 * Spiegelt das Schema aus der Migration `coaching_methoden_schema`
 * (`supabase/migrations/20260916084531_coaching_methoden_schema.sql`).
 * Kein Migrationsbedarf – Tabellen sind bereits eingespielt (siehe
 * `docs/AENDERUNGEN.md`, 2026-09-16, Inhaltsversion 1.4).
 *
 * Zugriff nur für Admins: RLS lässt Zeilen ausschließlich über
 * `public.ist_admin()` durch (gleiches Muster wie `erstgespraech_*`).
 */

/** Aktuelle Inhaltsversion der Bibliothek. Bei inhaltlichen Änderungen erhöhen. */
export const INHALTSVERSION = "1.5";

export type KategorieRow = {
  id: string;
  name: string;
  beschreibung: string;
  sortierung: number;
  erstellt_am?: string;
  aktualisiert_am?: string;
};

export type MethodeRow = {
  id: string;
  slug: string;
  kategorie_id: string;
  name: string;
  herkunft: string;
  kern: string;
  wann_einsetzen: string;
  ablauf: string[];
  beispielfragen: string[];
  sprechtext: string;
  dauer: string;
  setting: string;
  hinweise: string;
  tags: string[];
  sortierung: number;
  aktiv: boolean;
  eigene_notizen: string;
  erstellt_am: string;
  aktualisiert_am: string;
};

/**
 * Reihenfolge der Kategorien (wie im Brief vorgegeben). Dient als Fallback-
 * Sortierung, falls zwei Kategorien dieselbe `sortierung` teilen.
 */
export const KATEGORIE_REIHENFOLGE = [
  "achtsamkeit",
  "anteile",
  "koerper",
  "werte",
  "perspektive",
  "fragen",
  "imagination",
  "nlp",
  "systemisch",
  "trance",
  "team",
  "fuehrung",
  "prozess",
] as const;

/** Sortiert Kategorien nach `sortierung`, dann nach der festen Reihenfolge. */
export function sortiereKategorien(kategorien: KategorieRow[]): KategorieRow[] {
  const rang = (id: string) => {
    const i = KATEGORIE_REIHENFOLGE.indexOf(id as (typeof KATEGORIE_REIHENFOLGE)[number]);
    return i === -1 ? 999 : i;
  };
  return [...kategorien].sort(
    (a, b) => a.sortierung - b.sortierung || rang(a.id) - rang(b.id) || a.name.localeCompare(b.name, "de"),
  );
}

/** Sortiert Methoden innerhalb einer Kategorie nach `sortierung`, dann Name. */
export function sortiereMethoden(methoden: MethodeRow[]): MethodeRow[] {
  return [...methoden].sort(
    (a, b) => a.sortierung - b.sortierung || a.name.localeCompare(b.name, "de"),
  );
}

/**
 * Erzeugt aus einem Namen einen URL-tauglichen Slug.
 * Umlaute → ae/oe/ue, ß → ss, Kleinbuchstaben, Bindestriche.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // übrige Akzente entfernen
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
