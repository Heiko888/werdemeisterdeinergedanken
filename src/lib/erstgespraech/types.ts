/**
 * Datenbank-Zeilentypen der drei Erstgespräch-Tabellen.
 * Spiegeln das Schema aus der Migration `erstgespraech_cockpit`.
 * Nur benutzen – kein Migrationsbedarf.
 */
import type { Empfehlung, Ergebnis } from "./phasen";

export type FragebogenRow = {
  id: string;
  name: string;
  email: string;
  anlass: string;
  muster: string;
  versucht: string;
  veraenderung: string;
  stufe: number | null;
  sonstiges: string | null;
  einwilligung: boolean;
  quelle: string;
  status: "neu" | "gelesen" | "gespraech_gefuehrt" | "archiviert";
  notiz: string | null;
  created_at: string;
};

export type GespraechRow = {
  id: string;
  fragebogen_id: string | null;
  interessent_name: string;
  interessent_email: string | null;
  termin_am: string | null;
  gestartet_am: string | null;
  beendet_am: string | null;
  dauer_sekunden: number | null;
  notizen: Record<string, string>;
  abgehakt: Record<string, string[]>;
  stufe_selbst: number | null;
  stufe_eingeschaetzt: number | null;
  ergebnis: Ergebnis | null;
  empfehlung: Empfehlung | null;
  einwand: string | null;
  naechster_schritt: string | null;
  naechster_schritt_am: string | null;
  wertvollstes: string | null;
  freitext: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ZitatRow = {
  id: string;
  gespraech_id: string;
  zitat: string;
  phase: string | null;
  created_at: string;
};
