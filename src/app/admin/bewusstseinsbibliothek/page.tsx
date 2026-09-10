import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { BibliothekBrowser } from "@/components/members/BibliothekBrowser";
import { QUELLEN, QUELL_CODES, BIBLIOTHEK_STAND } from "@/lib/bewusstseinsbibliothek";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bewusstseinsbibliothek",
  // Interner Admin-Bereich – niemals indexieren.
  robots: { index: false, follow: false },
};

export default async function BewusstseinsbibliothekPage() {
  // Ohne Supabase gibt es keine Anmeldung → kein Admin-Schutz möglich.
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Bewusstseinsbibliothek</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Diese Seite braucht eine konfigurierte Supabase-Anbindung, um dich als
            Admin anzumelden.
          </p>
        </Container>
      </section>
    );
  }

  // Zugriffsschutz wie bei den übrigen /admin-Seiten (zusätzlich zum Proxy).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin/bewusstseinsbibliothek");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  return (
    <>
      <PageHero
        eyebrow="Nur für Admin"
        title={
          <>
            Bewusstseins<em className="accent">bibliothek</em>
          </>
        }
        intro="Quellen, Tätigkeiten, Themenfelder mit Buchempfehlungen, ARTE-Dokumentationen, ein Content-Reservoir und die sinnvolle Bearbeitungsreihenfolge – die Materialsammlung hinter den Inhalten. Durchsuchbar und nach Quellentyp filterbar."
      />

      {/* Zurück ins Admin-Cockpit – gleiche Orientierung wie die anderen Admin-Seiten */}
      <section className="pt-8">
        <Container>
          <Link
            href="/admin"
            className="-mx-2 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Zum Marketing-Cockpit
          </Link>
        </Container>
      </section>

      {/* Grundgedanke & Kennzeichnung der Quellen */}
      <section className="pt-4">
        <Container>
          <Card className="flex flex-col gap-4">
            <Eyebrow>Grundgedanke &amp; Kennzeichnung · {BIBLIOTHEK_STAND}</Eyebrow>
            <p className="text-ink-mid">
              Persönlichkeitsentwicklung und Bewusstseinsentwicklung sind nicht dasselbe.
            </p>
            <blockquote className="border-l-2 border-ink/70 pl-4 font-display text-lg italic text-ink">
              Persönlichkeitsentwicklung fragt häufig: „Wie kann ich mich verbessern oder
              optimieren?“ Bewusstseinsentwicklung fragt: „Wer ist dieses Ich überhaupt – und
              wodurch entstehen seine Wahrnehmung, Gedanken, Gefühle und Entscheidungen?“
            </blockquote>
            <p className="text-ink-mid">
              Wenn sich Wahrnehmung und Bewusstsein verändern, kann sich dadurch auch die
              Persönlichkeit entwickeln – aber nicht allein durch intellektuelles Verstehen. Erst
              wenn eine Erkenntnis Entscheidungen, Verhalten und Handlungen verändert, wird sie im
              Leben wirksam. Drei Bewegungen tragen das Projekt: <strong>Wahrnehmung erweitern</strong>,{" "}
              <strong>Perspektive erweitern</strong> und <strong>Handlungsspielraum erweitern</strong>.
            </p>

            <div className="mt-2 flex flex-col gap-2 rounded-xl border border-ink/10 bg-paper p-4">
              <p className="text-sm text-ink-mid">
                Nicht jede Quelle hat denselben wissenschaftlichen Status. Die Kürzel verhindern,
                dass Neurowissenschaft, Philosophie, Gesellschaftskritik und spirituelle Erfahrung
                vermischt werden – nutze die Chips unten, um nach Quellentyp zu filtern.
              </p>
              {QUELL_CODES.map((c) => (
                <p key={c} className="text-sm text-ink-mid">
                  <span className="mr-2 inline-flex items-center rounded-md border border-accent/40 bg-gold-500/10 px-1.5 py-0.5 text-[0.65rem] font-semibold text-accent">
                    {c}
                  </span>
                  <strong className="text-ink">{QUELLEN[c].name}</strong> — {QUELLEN[c].desc}
                </p>
              ))}
              <p className="mt-1 text-sm italic text-ink-muted">
                Eine Quelle ist kein Wahrheitsbeweis. Besonders ergiebig sind Quellen, die einander
                widersprechen.
              </p>
            </div>
          </Card>
        </Container>
      </section>

      {/* Durchsuchbare Bibliothek */}
      <section className="py-14 sm:py-16">
        <Container>
          <BibliothekBrowser />
        </Container>
      </section>
    </>
  );
}
