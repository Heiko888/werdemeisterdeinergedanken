import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getMemberships, membershipStats } from "@/lib/admin-data";
import {
  AdminHeader,
  EmptyState,
  StatusPill,
  TableMissingHint,
  TableShell,
  Td,
  Th,
  formatDateTime,
  formatDay,
} from "../_ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mitglieder",
  robots: { index: false, follow: false },
};

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <span className="font-display text-3xl font-medium text-accent">{value}</span>
      <span className="text-sm font-medium text-ink">{label}</span>
    </div>
  );
}

export default async function MitgliederPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Mitglieder</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Diese Übersicht braucht eine konfigurierte Supabase-Anbindung.
          </p>
        </Container>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin/mitglieder");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const listing = await getMemberships();
  const stats = membershipStats(listing);

  return (
    <>
      <AdminHeader
        eyebrow="Zahlende Mitglieder"
        title={
          <>
            Mitglied<em className="accent">schaften</em>
          </>
        }
        count={listing.available ? listing.rows.length : undefined}
        description="Alle Stripe-Abos mit Status und Laufzeit. Aktiv = active/trialing. Datenquelle: Tabelle memberships (Stripe-Webhook)."
        exportHref="/admin/mitglieder/export"
      />

      <section className="py-10">
        <Container className="flex flex-col gap-8">
          {!listing.available ? (
            <TableMissingHint table="memberships" migration="0007_membership.sql" />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat value={stats.active} label="Aktiv / Trial" />
                <Stat value={stats.pastDue} label="Zahlung fällig" />
                <Stat value={stats.canceled} label="Gekündigt" />
                <Stat value={stats.total} label="Gesamt" />
              </div>

              {listing.rows.length === 0 ? (
                <EmptyState text="Noch keine Mitgliedschaften erfasst." />
              ) : (
                <TableShell>
                  <thead>
                    <tr>
                      <Th>E-Mail</Th>
                      <Th>Status</Th>
                      <Th>Läuft bis</Th>
                      <Th>Seit</Th>
                      <Th>Stripe-Abo</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {listing.rows.map((m) => (
                      <tr key={m.email}>
                        <Td>{m.email}</Td>
                        <Td>
                          <StatusPill status={m.status} />
                        </Td>
                        <Td>{formatDay(m.current_period_end)}</Td>
                        <Td>{formatDay(m.created_at)}</Td>
                        <Td>
                          <span className="text-xs text-ink-muted">
                            {m.stripe_subscription_id ?? "–"}
                          </span>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </TableShell>
              )}
              <p className="text-xs text-ink-muted">
                Letzte Aktualisierung je Zeile über den Stripe-Webhook.{" "}
                {formatDateTime(listing.rows[0]?.updated_at)} (neueste).
              </p>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
