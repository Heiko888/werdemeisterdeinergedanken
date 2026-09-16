import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getKontaktAnfragen } from "@/lib/admin-data";
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
  title: "Kontaktanfragen",
  robots: { index: false, follow: false },
};

export default async function KontaktPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Kontaktanfragen</Eyebrow>
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
  if (!user) redirect("/login?redirect=/admin/kontakt");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const listing = await getKontaktAnfragen();

  return (
    <>
      <AdminHeader
        eyebrow="Kontaktformular"
        title={
          <>
            Kontakt<em className="accent">anfragen</em>
          </>
        }
        count={listing.available ? listing.rows.length : undefined}
        description="Eingehende Nachrichten aus dem Kontaktformular – zusätzlich zur E-Mail gesichert, damit keine Anfrage verloren geht."
        exportHref="/admin/kontakt/export"
      />

      <section className="py-10">
        <Container className="flex flex-col gap-6">
          {!listing.available ? (
            <TableMissingHint
              table="kontakt_anfragen"
              migration="0015_kontakt_anfragen.sql"
            />
          ) : listing.rows.length === 0 ? (
            <EmptyState text="Noch keine Kontaktanfragen gespeichert." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Eingegangen</Th>
                  <Th>Name</Th>
                  <Th>E-Mail</Th>
                  <Th>Thema</Th>
                  <Th>Nachricht</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {listing.rows.map((k) => (
                  <tr key={k.id}>
                    <Td>{formatDateTime(k.created_at)}</Td>
                    <Td>{k.name}</Td>
                    <Td>
                      <a
                        href={`mailto:${k.email}`}
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {k.email}
                      </a>
                    </Td>
                    <Td>{k.thema || "–"}</Td>
                    <Td>
                      <span className="block max-w-md whitespace-pre-wrap text-ink-mid">
                        {k.message}
                      </span>
                    </Td>
                    <Td>
                      <StatusPill status={k.status} />
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
