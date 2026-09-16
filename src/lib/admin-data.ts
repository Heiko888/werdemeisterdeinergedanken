/**
 * Datenzugriff für die zentrale Admin-Übersicht (Leads, Mitglieder,
 * Kontaktanfragen, Buch-Bestellungen).
 *
 * Alle Lesezugriffe laufen über den Service-Role-Key (createAdminClient),
 * da bereichsübergreifend und an der RLS vorbei gelesen wird. Der Aufruf ist
 * ausschließlich in admin-geschützten Server-Komponenten/Routen erlaubt.
 *
 * Robust gegen fehlende Konfiguration UND fehlende Tabellen: schlägt eine
 * Abfrage fehl (z. B. weil eine Migration noch nicht eingespielt ist), kommt
 * `{ available: false, rows: [] }` zurück – die Admin-Seite zeigt dann einen
 * Hinweis statt eines Fehlers.
 */
import { createAdminClient } from "@/lib/supabase/admin";

/** Aktive Abo-Zustände (wie im Stripe-Webhook / membership.ts). */
export const ACTIVE_MEMBERSHIP_STATES = ["active", "trialing"] as const;

export type Listing<T> = { available: boolean; rows: T[] };

export type MembershipRow = {
  email: string;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

export type EbookLeadRow = {
  id: string;
  email: string;
  status: "pending" | "confirmed" | "unsubscribed";
  source: string | null;
  requested_at: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
};

export type KontaktRow = {
  id: string;
  name: string;
  email: string;
  thema: string | null;
  message: string;
  status: string;
  created_at: string;
};

export type BookOrderRow = {
  id: string;
  email: string;
  edition: string;
  amount_total: number | null;
  currency: string | null;
  stripe_session_id: string | null;
  status: string;
  shipping_name: string | null;
  shipping_address: string | null;
  created_at: string;
};

const NOT_AVAILABLE = { available: false, rows: [] as never[] };

async function listTable<T>(
  table: string,
  columns: string,
  orderBy: string,
  ascending = false,
): Promise<Listing<T>> {
  const admin = createAdminClient();
  if (!admin) return NOT_AVAILABLE;
  try {
    const { data, error } = await admin
      .from(table)
      .select(columns)
      .order(orderBy, { ascending })
      .limit(1000);
    if (error) return NOT_AVAILABLE;
    return { available: true, rows: (data ?? []) as T[] };
  } catch {
    return NOT_AVAILABLE;
  }
}

export function getMemberships() {
  return listTable<MembershipRow>(
    "memberships",
    "email,status,stripe_customer_id,stripe_subscription_id,current_period_end,created_at,updated_at",
    "created_at",
  );
}

export function getEbookLeads() {
  return listTable<EbookLeadRow>(
    "ebook_leads",
    "id,email,status,source,requested_at,confirmed_at,unsubscribed_at",
    "requested_at",
  );
}

export function getKontaktAnfragen() {
  return listTable<KontaktRow>(
    "kontakt_anfragen",
    "id,name,email,thema,message,status,created_at",
    "created_at",
  );
}

export function getBookOrders() {
  return listTable<BookOrderRow>(
    "book_orders",
    "id,email,edition,amount_total,currency,stripe_session_id,status,shipping_name,shipping_address,created_at",
    "created_at",
  );
}

/** Abo-Kennzahlen für das Cockpit. */
export type MembershipStats = {
  available: boolean;
  active: number;
  canceled: number;
  pastDue: number;
  other: number;
  total: number;
};

export function membershipStats(listing: Listing<MembershipRow>): MembershipStats {
  if (!listing.available) {
    return { available: false, active: 0, canceled: 0, pastDue: 0, other: 0, total: 0 };
  }
  const stats: MembershipStats = {
    available: true,
    active: 0,
    canceled: 0,
    pastDue: 0,
    other: 0,
    total: listing.rows.length,
  };
  for (const row of listing.rows) {
    if ((ACTIVE_MEMBERSHIP_STATES as readonly string[]).includes(row.status)) {
      stats.active++;
    } else if (row.status === "canceled" || row.status === "cancelled") {
      stats.canceled++;
    } else if (row.status === "past_due" || row.status === "unpaid") {
      stats.pastDue++;
    } else {
      stats.other++;
    }
  }
  return stats;
}

/**
 * Serialisiert Zeilen als CSV (RFC-4180-nah: Semikolon-getrennt für deutsche
 * Excel-Defaults, Werte in Anführungszeichen, eingebettete Quotes verdoppelt).
 */
export function toCsv(
  headers: { key: string; label: string }[],
  rows: Record<string, unknown>[],
): string {
  const escape = (value: unknown): string => {
    const s = value === null || value === undefined ? "" : String(value);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const head = headers.map((h) => escape(h.label)).join(";");
  const body = rows
    .map((row) => headers.map((h) => escape(row[h.key])).join(";"))
    .join("\r\n");
  // BOM voranstellen, damit Excel UTF-8 (Umlaute) korrekt erkennt.
  return `﻿${head}\r\n${body}`;
}
