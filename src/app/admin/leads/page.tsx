import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getEbookLeads } from "@/lib/admin-data";
import {
  AdminHeader,
  EmptyState,
  StatusPill,
  TableMissingHint,
  TableShell,
  Td,
  Th,
  formatDateTime,
} from "../_ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "E-Book-Leads",
  robots: { index: false, follow: false },
};

export default async function LeadsPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>E-Book-Leads</Eyebrow>
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
  if (!user) redirect("/login?redirect=/admin/leads");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const listing = await getEbookLeads();

  return (
    <>
      <AdminHeader
        eyebrow="Gratis-E-Book"
        title={
          <>
            E-Book-<em className="accent">Leads</em>
          </>
        }
        count={listing.available ? listing.rows.length : undefined}
        description="Interessent*innen mit Double-Opt-in-Status. pending = Bestätigung ausstehend, confirmed = E-Book verschickt. Datenquelle: Tabelle ebook_leads."
        exportHref="/admin/leads/export"
      />

      <section className="py-10">
        <Container className="flex flex-col gap-6">
          {!listing.available ? (
            <TableMissingHint table="ebook_leads" migration="0005_ebook_leads.sql" />
          ) : listing.rows.length === 0 ? (
            <EmptyState text="Noch keine Leads erfasst." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>E-Mail</Th>
                  <Th>Status</Th>
                  <Th>Quelle</Th>
                  <Th>Eingetragen</Th>
                  <Th>Bestätigt</Th>
                </tr>
              </thead>
              <tbody>
                {listing.rows.map((lead) => (
                  <tr key={lead.id}>
                    <Td>{lead.email}</Td>
                    <Td>
                      <StatusPill status={lead.status} />
                    </Td>
                    <Td>
                      <span className="text-xs text-ink-muted">{lead.source ?? "–"}</span>
                    </Td>
                    <Td>{formatDateTime(lead.requested_at)}</Td>
                    <Td>{formatDateTime(lead.confirmed_at)}</Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          )}
        </Container>
      </section>
    </>
  );
}
