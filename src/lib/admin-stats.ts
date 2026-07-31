/**
 * Kennzahlen fürs Marketing-Cockpit.
 *
 * Zwei Quellen:
 *  1. Funnel-Zahlen aus Supabase (Leads, Newsletter, Test) – über den
 *     Service-Role-Key (RLS-Bypass), da bereichsübergreifend gezählt wird.
 *     Fehlt der Key oder eine Tabelle, kommt ein „nicht konfiguriert"-Zustand
 *     zurück – die Seite bleibt nutzbar.
 *  2. Content-/Drehplan-Status rein aus den statischen Inhalts-Modulen –
 *     funktioniert immer, auch ohne Datenbank.
 */
import { createAdminClient } from "@/lib/supabase/admin";
import { stages } from "@/lib/content";
import { practices } from "@/lib/practices";
import { deepDives } from "@/lib/deep-dives";
import { stageLessons } from "@/lib/stage-lessons";
import { postsSorted } from "@/lib/blog";

const SELBSTVERTEIDIGUNG = "Mentale Selbstverteidigung";

// --- Funnel -----------------------------------------------------------------

export type FunnelStats = {
  configured: boolean;
  members: number;
  newsletter: number;
  leads: { pending: number; confirmed: number; unsubscribed: number; total: number };
  /** bestätigte Leads der letzten 30 Tage */
  leadsRecent: number;
  tests: { total: number; byStage: number[] };
};

async function safeCount(
  admin: ReturnType<typeof createAdminClient>,
  table: string,
  build?: (q: any) => any,
): Promise<number> {
  if (!admin) return 0;
  try {
    let q = admin.from(table).select("*", { count: "exact", head: true });
    if (build) q = build(q);
    const { count } = await q;
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function getFunnelStats(): Promise<FunnelStats> {
  const admin = createAdminClient();
  const empty: FunnelStats = {
    configured: false,
    members: 0,
    newsletter: 0,
    leads: { pending: 0, confirmed: 0, unsubscribed: 0, total: 0 },
    leadsRecent: 0,
    tests: { total: 0, byStage: [0, 0, 0, 0, 0, 0, 0] },
  };
  if (!admin) return empty;

  const [members, newsletter, pending, confirmed, unsubscribed] = await Promise.all([
    safeCount(admin, "profiles"),
    safeCount(admin, "profiles", (q) => q.eq("newsletter_opt_in", true)),
    safeCount(admin, "ebook_leads", (q) => q.eq("status", "pending")),
    safeCount(admin, "ebook_leads", (q) => q.eq("status", "confirmed")),
    safeCount(admin, "ebook_leads", (q) => q.eq("status", "unsubscribed")),
  ]);

  // bestätigte Leads der letzten 30 Tage
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const leadsRecent = await safeCount(admin, "ebook_leads", (q) =>
    q.eq("status", "confirmed").gte("confirmed_at", since),
  );

  // Test-Ergebnisse: Verteilung über die Stufen 1–7
  const byStage = [0, 0, 0, 0, 0, 0, 0];
  let testsTotal = 0;
  try {
    const { data } = await admin.from("test_results").select("top_stage");
    for (const row of data ?? []) {
      const s = Number((row as { top_stage: number }).top_stage);
      if (s >= 1 && s <= 7) {
        byStage[s - 1]++;
        testsTotal++;
      }
    }
  } catch {
    // Tabelle evtl. noch nicht migriert
  }

  return {
    configured: true,
    members,
    newsletter,
    leads: {
      pending,
      confirmed,
      unsubscribed,
      total: pending + confirmed + unsubscribed,
    },
    leadsRecent,
    tests: { total: testsTotal, byStage },
  };
}

// --- Content-/Drehplan-Status ----------------------------------------------

export type ContentSection = {
  key: string;
  label: string;
  hint: string;
  total: number;
  filmed: number;
  pending: number;
};

export type ContentInventory = {
  sections: ContentSection[];
  totals: { total: number; filmed: number; pending: number };
  blogPosts: number;
  coverMotifs: number;
  coverFormats: number;
};

function countFilmed<T extends { video?: string | null }>(items: T[]) {
  const filmed = items.filter((i) => Boolean(i.video)).length;
  return { total: items.length, filmed, pending: items.length - filmed };
}

export function getContentInventory(): ContentInventory {
  const vertiefungen = deepDives.filter((d) => d.category !== SELBSTVERTEIDIGUNG);
  const selbstverteidigung = deepDives.filter((d) => d.category === SELBSTVERTEIDIGUNG);

  const sections: ContentSection[] = [
    {
      key: "stufen",
      label: "Stufen-Lektionen",
      hint: "Die 7 Kern-Videos (Autopilot → Meisterschaft)",
      ...countFilmed(stageLessons),
    },
    {
      key: "praxis",
      label: "Praxis-Übungen",
      hint: "Atem, Rituale, Autopilot-Check …",
      ...countFilmed(practices),
    },
    {
      key: "vertiefungen",
      label: "Vertiefungen",
      hint: "Neuroplastizität, innerer Kritiker …",
      ...countFilmed(vertiefungen),
    },
    {
      key: "selbstverteidigung",
      label: "Mentale Selbstverteidigung",
      hint: "Propaganda, Framing, Algorithmen …",
      ...countFilmed(selbstverteidigung),
    },
  ];

  const totals = sections.reduce(
    (acc, s) => ({
      total: acc.total + s.total,
      filmed: acc.filmed + s.filmed,
      pending: acc.pending + s.pending,
    }),
    { total: 0, filmed: 0, pending: 0 },
  );

  // Cover-Motive = 7 Stufen + Praxis + alle Vertiefungen (inkl. Selbstverteidigung)
  const coverMotifs = stages.length + practices.length + deepDives.length;

  return {
    sections,
    totals,
    blogPosts: postsSorted.length,
    coverMotifs,
    coverFormats: 5,
  };
}
