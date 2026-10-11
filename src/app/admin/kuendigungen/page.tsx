import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { getKuendigungen } from "@/lib/admin-data";
import {
  KUENDIGUNG_ARTEN,
  formatDatum,
  zeitpunktText,
  type KuendigungEingabe,
} from "@/lib/kuendigung";
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
  title: "Kündigungen",
  robots: { index: false, follow: false },
};

/** Eingegangene Kündigungen aus dem Kündigungsbutton (/kuendigen, § 312k BGB). */
export default async function KuendigungenPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Kündigungen</Eyebrow>
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
  if (!user) redirect("/login?redirect=/admin/kuendigungen");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const listing = await getKuendigungen();

  return (
    <>
      <AdminHeader
        eyebrow="Kündigungsbutton"
        title={
          <>
            Kündi<em className="accent">gungen</em>
          </>
        }
        count={listing.available ? listing.rows.length : undefined}
        description="Über „Verträge hier kündigen“ eingegangene Kündigungen – mit Eingangszeitpunkt, Referenz und dem Periodenende laut Mitgliedschaft (falls gefunden). Die Person hat jeweils sofort eine Bestätigung per E-Mail bekommen; das Abo in Stripe beendest du manuell."
      />

      <section className="py-10">
        <Container className="flex flex-col gap-6">
          {!listing.available ? (
            <TableMissingHint table="kuendigungen" migration="20261011180000_kuendigungen.sql" />
          ) : listing.rows.length === 0 ? (
            <EmptyState text="Noch keine Kündigungen eingegangen." />
          ) : (
            <TableShell>
              <thead>
                <tr>
                  <Th>Eingegangen</Th>
                  <Th>Referenz</Th>
                  <Th>Name</Th>
                  <Th>E-Mail</Th>
                  <Th>Art</Th>
                  <Th>Zeitpunkt</Th>
                  <Th>Periodenende</Th>
                  <Th>Vertragsnr. / Grund</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {listing.rows.map((k) => (
                  <tr key={k.id}>
                    <Td>{formatDateTime(k.eingegangen_at)}</Td>
                    <Td>
                      <span className="whitespace-nowrap font-medium text-ink">{k.referenz}</span>
                    </Td>
                    <Td>{k.name}</Td>
                    <Td>
                      <a
                        href={`mailto:${k.email}?subject=${encodeURIComponent(`Deine Kündigung ${k.referenz}`)}`}
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {k.email}
                      </a>
                    </Td>
                    <Td>{KUENDIGUNG_ARTEN[k.art as KuendigungEingabe["art"]] ?? k.art}</Td>
                    <Td>
                      {zeitpunktText({
                        art: k.art,
                        zeitpunkt: k.zeitpunkt,
                        wunschdatum: k.wunschdatum ?? "",
                      } as KuendigungEingabe)}
                    </Td>
                    <Td>{k.periode_ende ? formatDatum(k.periode_ende) : "keine aktive Mitgliedschaft gefunden"}</Td>
                    <Td>
                      <span className="block max-w-xs whitespace-pre-wrap text-ink-mid">
                        {[k.vertragsnummer, k.grund].filter(Boolean).join("\n") || "–"}
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
