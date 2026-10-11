import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getWiderrufe } from "@/lib/admin-data";
import { WIDERRUF_PRODUKTE, type WiderrufProdukt } from "@/lib/widerruf";
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
  title: "Widerrufe",
  robots: { index: false, follow: false },
};

/** Eingegangene Widerrufe aus der Widerrufsfunktion (/widerruf). */
export default async function WiderrufePage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Widerrufe</Eyebrow>
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
  if (!user) redirect("/login?redirect=/admin/widerrufe");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const listing = await getWiderrufe();

  return (
    <>
      <AdminHeader
        eyebrow="Widerrufsfunktion"
        title={
          <>
            Wider<em className="accent">rufe</em>
          </>
        }
        count={listing.available ? listing.rows.length : undefined}
        description="Über „Vertrag hier widerrufen“ eingegangene Widerrufe – mit Eingangszeitpunkt und Referenz. Die Person hat jeweils eine Eingangsbestätigung per E-Mail bekommen; die Rückabwicklung (z. B. Erstattung in Stripe) erfolgt manuell."
      />

      <section className="py-10">
        <Container className="flex flex-col gap-6">
          {!listing.available ? (
            <TableMissingHint table="widerrufe" migration="20261011120000_widerrufe.sql" />
          ) : listing.rows.length === 0 ? (
            <EmptyState text="Noch keine Widerrufe eingegangen." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Eingegangen</Th>
                  <Th>Referenz</Th>
                  <Th>Name</Th>
                  <Th>E-Mail</Th>
                  <Th>Vertrag</Th>
                  <Th>Bestellung</Th>
                  <Th>Anmerkung</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {listing.rows.map((w) => (
                  <tr key={w.id}>
                    <Td>{formatDateTime(w.eingegangen_at)}</Td>
                    <Td>
                      <span className="whitespace-nowrap font-medium text-ink">{w.referenz}</span>
                    </Td>
                    <Td>{w.name}</Td>
                    <Td>
                      <a
                        href={`mailto:${w.email}?subject=${encodeURIComponent(`Dein Widerruf ${w.referenz}`)}`}
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {w.email}
                      </a>
                    </Td>
                    <Td>{WIDERRUF_PRODUKTE[w.produkt as WiderrufProdukt] ?? w.produkt}</Td>
                    <Td>{w.bestellung || "–"}</Td>
                    <Td>
                      <span className="block max-w-xs whitespace-pre-wrap text-ink-mid">
                        {w.nachricht || "–"}
                      </span>
                    </Td>
                    <Td>
                      <StatusPill status={w.status} />
                    </Td>
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
