import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import {
  ArrowRight,
  Brain,
  Compass,
  Download,
  Instagram,
  Play,
  Shield,
  Spark,
  Star,
} from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { vorlagenKatalog, type VorlagenGruppe } from "@/lib/vorlagen";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vorlagen-Übersicht",
  robots: { index: false, follow: false },
};

const ICONS = {
  Download,
  Brain,
  Play,
  Instagram,
  Compass,
  Star,
  Shield,
  Spark,
} as const;

function GruppenKarte({ g }: { g: VorlagenGruppe }) {
  const Icon = ICONS[g.icon];
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon />
        </span>
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg font-medium text-ink">{g.titel}</h3>
          <p className="text-sm leading-relaxed text-ink-mid">{g.beschreibung}</p>
        </div>
      </div>

      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        <div className="flex flex-col gap-0.5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Ordner
          </dt>
          <dd>
            <code className="rounded bg-ink/5 px-1.5 py-0.5 text-[0.8rem] text-ink">
              {g.ordner}
            </code>
          </dd>
        </div>
        {g.ergebnis && (
          <div className="flex flex-col gap-0.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Ergebnis landet in
            </dt>
            <dd className="text-ink-mid">{g.ergebnis}</dd>
          </div>
        )}
      </dl>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          So erzeugst du sie neu
        </p>
        <ol className="flex flex-col gap-2">
          {g.schritte.map((s, i) => (
            <li key={i} className="flex flex-col gap-1.5">
              <span className="text-sm text-ink-mid">
                <span className="mr-2 font-semibold text-ink">{i + 1}.</span>
                {s.text}
              </span>
              {s.command && (
                <code className="block overflow-x-auto rounded-lg bg-ink px-3 py-2 font-mono text-[0.82rem] text-white">
                  {s.command}
                </code>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default async function VorlagenPage() {
  // Ohne Supabase gibt es keine Anmeldung → kein Admin-Schutz möglich.
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container className="mx-auto max-w-xl text-center">
          <Eyebrow>Vorlagen-Übersicht</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Diese Seite braucht eine konfigurierte Supabase-Anbindung, um dich als
            Admin anzumelden. Sobald die Umgebungsvariablen gesetzt sind, ist sie
            verfügbar.
          </p>
        </Container>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin/vorlagen");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const gruppen = vorlagenKatalog;

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
            Marketing-Cockpit
          </Link>
          <Eyebrow>Vorlagen-Übersicht</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Alle <em className="accent">Vorlagen</em> an einem Ort
          </h1>
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-mid">
            Hier siehst du jede Art von Vorlage im Projekt: wofür sie da ist, wo sie
            liegt und mit welchem Befehl du sie neu erzeugst. Kein Suchen mehr in
            verschiedenen Ordnern – such dir einfach die passende Karte aus.
          </p>
        </Container>
      </section>

      {/* Karten */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {gruppen.map((g) => (
              <GruppenKarte key={g.key} g={g} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-gold-400/50 bg-gold-300/15 p-5 text-sm text-ink-mid">
            <strong className="font-semibold text-ink">Kurz erklärt:</strong> Befehle
            wie <code className="rounded bg-ink/5 px-1">npm run …</code> gibst du im
            Terminal im Projektordner ein. Sie erzeugen die Dateien neu – danach die
            geänderten Dateien committen, damit sie live gehen. Ausführliche
            Anleitungen findest du in der jeweiligen <code className="rounded bg-ink/5 px-1">README.md</code>{" "}
            im Ordner der Vorlage.
          </div>
        </Container>
      </section>
    </>
  );
}
