import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "@/components/ui/Icon";
import { APP_GLOW } from "@/lib/gradients";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { impulses } from "@/lib/impulses";
import { ImpulsTest } from "./ImpulsTest";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Impuls-Testsendung",
  robots: { index: false, follow: false },
};

export default async function AdminImpulsePage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container className="mx-auto max-w-xl text-center">
          <Eyebrow>Impuls-Testsendung</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Der Bereich braucht eine konfigurierte Supabase-Anbindung, um dich als
            Admin anzumelden.
          </p>
        </Container>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin/impulse");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const resendReady = Boolean(process.env.RESEND_API_KEY);
  // Nur die für die Vorschau nötigen Felder ans Client-Formular geben
  // (keine internen CTA-Pfade).
  const vorschauen = impulses.map(({ subject, heading, body, ctaLabel }) => ({
    subject,
    heading,
    body,
    ctaLabel,
  }));

  return (
    <>
      {/* Kopf */}
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
          <Eyebrow>E-Mail-Impulse</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            <em className="accent">Testimpuls</em> senden
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Schick dir einen einzelnen Impuls als Probe – so prüfst du Absender,
            Zustellung und Darstellung, <strong>ohne</strong> dass der Verteiler
            angeschrieben oder ein Zähler verändert wird. Der Betreff der Probe
            wird mit <code className="rounded bg-ink/5 px-1">[TEST]</code> markiert.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="mx-auto max-w-2xl">
          {!resendReady && (
            <div className="mb-6 rounded-2xl border border-gold-400/50 bg-gold-300/15 p-5 text-sm text-ink-mid">
              <strong className="font-semibold text-ink">
                Versand noch nicht eingerichtet.
              </strong>{" "}
              Setze <code className="rounded bg-ink/5 px-1">RESEND_API_KEY</code>,
              damit Mails verschickt werden können. Solange die Domain bei Resend
              nicht verifiziert ist (Absender{" "}
              <code className="rounded bg-ink/5 px-1">onboarding@resend.dev</code>),
              stellt Resend nur an die eigene Konto-Adresse zu – nimm für den Test
              also deine eigene Adresse.
            </div>
          )}

          <Card className="flex flex-col gap-5">
            <ImpulsTest defaultEmail={user.email ?? ""} vorschauen={vorschauen} />
          </Card>

          <p className="mt-6 text-sm text-ink-muted">
            Der reguläre Serienversand läuft automatisch (montags 07:00) über den
            Cron-Dienst und schickt allen Mitgliedern mit Opt-in sowie bestätigten
            E-Book-Leads den jeweils nächsten Impuls. Details in{" "}
            <code className="rounded bg-ink/5 px-1">docs/EMAIL-IMPULSE.md</code>.
          </p>
        </Container>
      </section>
    </>
  );
}
