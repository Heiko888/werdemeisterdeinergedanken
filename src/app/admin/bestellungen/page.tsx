import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getBookOrders } from "@/lib/admin-data";
import {
  AdminHeader,
  EmptyState,
  StatusPill,
  TableMissingHint,
  TableShell,
  Td,
  Th,
  formatDateTime,
  formatEuro,
} from "../_ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buch-Bestellungen",
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

export default async function BestellungenPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Buch-Bestellungen</Eyebrow>
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
  if (!user) redirect("/login?redirect=/admin/bestellungen");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const listing = await getBookOrders();
  const printOffen = listing.rows.filter(
    (o) => o.edition === "print" && o.status === "bezahlt",
  ).length;
  const umsatz = listing.rows
    .filter((o) => o.status !== "erstattet")
    .reduce((sum, o) => sum + (o.amount_total ?? 0), 0);

  return (
    <>
      <AdminHeader
        eyebrow="Buch-Einmalkauf"
        title={
          <>
            Buch-<em className="accent">Bestellungen</em>
          </>
        }
        count={listing.available ? listing.rows.length : undefined}
        description="Alle bezahlten Buch-Käufe (PDF & Print). Print-Versand erfolgt manuell – Status 'bezahlt' = noch zu versenden. Datenquelle: Tabelle book_orders (Stripe-Webhook)."
        exportHref="/admin/bestellungen/export"
      />

      <section className="py-10">
        <Container className="flex flex-col gap-8">
          {!listing.available ? (
            <TableMissingHint table="book_orders" migration="0016_book_orders.sql" />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat value={listing.rows.length} label="Bestellungen" />
                <Stat value={printOffen} label="Print offen" />
                <Stat
                  value={listing.rows.filter((o) => o.edition === "pdf").length}
                  label="PDF verkauft"
                />
                <Stat value={formatEuro(umsatz, listing.rows[0]?.currency)} label="Umsatz (brutto)" />
              </div>

              {listing.rows.length === 0 ? (
                <EmptyState text="Noch keine Buch-Bestellungen erfasst." />
              ) : (
                <TableShell>
                  <thead>
                    <tr>
                      <Th>Datum</Th>
                      <Th>E-Mail</Th>
                      <Th>Edition</Th>
                      <Th>Betrag</Th>
                      <Th>Status</Th>
                      <Th>Lieferadresse</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {listing.rows.map((o) => (
                      <tr key={o.id}>
                        <Td>{formatDateTime(o.created_at)}</Td>
                        <Td>{o.email}</Td>
                        <Td>{o.edition === "print" ? "Print" : "PDF"}</Td>
                        <Td>{formatEuro(o.amount_total, o.currency)}</Td>
                        <Td>
                          <StatusPill status={o.status} />
                        </Td>
                        <Td>
                          {o.edition === "print" ? (
                            <span className="block max-w-xs text-ink-mid">
                              {o.shipping_name ? `${o.shipping_name}, ` : ""}
                              {o.shipping_address ?? "–"}
                            </span>
                          ) : (
                            <span className="text-ink-muted">–</span>
                          )}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </TableShell>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
