import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { APP_GLOW } from "@/lib/gradients";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight, Plus } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import {
  INHALTSVERSION,
  sortiereKategorien,
  sortiereMethoden,
  type KategorieRow,
  type MethodeRow,
} from "@/lib/coaching-methoden";
import { MethodenBrowser } from "./MethodenBrowser";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coaching-Methoden",
  robots: { index: false, follow: false },
};

export default async function MethodenPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Coaching-Methoden</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Die Methoden-Bibliothek braucht eine konfigurierte Supabase-Anbindung.
            Sobald die Umgebungsvariablen gesetzt sind, ist diese Seite verfügbar.
          </p>
        </Container>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin/methoden");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  // Zusätzlich zur E-Mail-Freigabe muss das Konto in der Datenbank als Admin
  // hinterlegt sein (admin_users) – sonst lässt RLS keine Zeile durch.
  const { data: istAdmin } = await supabase.rpc("ist_admin");

  const [{ data: kategorienRaw }, { data: methodenRaw }] = await Promise.all([
    supabase.from("coaching_kategorien").select("*"),
    supabase.from("coaching_methoden").select("*"),
  ]);

  const kategorien = sortiereKategorien((kategorienRaw ?? []) as KategorieRow[]);
  const methoden = sortiereMethoden((methodenRaw ?? []) as MethodeRow[]);

  return (
    <>
      <section className="grain relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: APP_GLOW }}
        />
        <Container className="flex flex-col items-start gap-5">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Cockpit
          </Link>
          <Eyebrow>Nachschlagewerk</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Coaching-<em className="accent">Methoden</em>
          </h1>
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-mid">
            {methoden.length} Methoden in {kategorien.length} Kategorien – mit Ablauf,
            Beispielfragen, Dauer, Setting und Grenzen zur Therapie. Suche über alle
            Felder, filtere nach Kategorie und ergänze eigene Praxiserfahrungen.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/methoden/neu"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Neue Methode
            </Link>
            <span className="text-xs text-ink-muted">Inhaltsversion {INHALTSVERSION}</span>
          </div>
        </Container>
      </section>

      {istAdmin === false && (
        <section className="pt-8">
          <Container>
            <div className="mx-auto max-w-2xl rounded-2xl border border-gold-400/50 bg-gold-300/15 p-5 text-sm text-ink-mid">
              <strong className="font-semibold text-ink">
                Dieses Konto ist in der Datenbank nicht als Admin hinterlegt.
              </strong>{" "}
              Deine Adresse darf zwar den Adminbereich sehen, aber die Methoden liegen
              hinter einer zusätzlichen Datenbank-Sperre (RLS). Melde dich mit dem
              hinterlegten Konto an
              (<code className="rounded bg-ink/5 px-1">heiko.schwaninger@outlook.com</code>),
              sonst bleibt die Bibliothek unten leer.
            </div>
          </Container>
        </section>
      )}

      <section className="py-12">
        <Container>
          <MethodenBrowser kategorien={kategorien} methoden={methoden} />
        </Container>
      </section>
    </>
  );
}
