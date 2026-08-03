import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import {
  getFunnelStats,
  getContentInventory,
  type ContentSection,
} from "@/lib/admin-stats";
import { stages } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Marketing-Cockpit",
  robots: { index: false, follow: false },
};

function Stat({
  value,
  label,
  sub,
}: {
  value: string | number;
  label: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <span className="font-display text-3xl font-medium text-accent">{value}</span>
      <span className="text-sm font-medium text-ink">{label}</span>
      {sub && <span className="text-xs text-ink-muted">{sub}</span>}
    </div>
  );
}

function Bar({ filmed, total }: { filmed: number; total: number }) {
  const pct = total > 0 ? Math.round((filmed / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-leaf-500 to-teal-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-12 text-right text-sm font-medium tabular-nums text-ink-mid">
        {pct}%
      </span>
    </div>
  );
}

function SectionRow({ s, verb = "gedreht" }: { s: ContentSection; verb?: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="font-medium text-ink">{s.label}</span>
        <span className="text-sm tabular-nums text-ink-mid">
          {s.filmed} / {s.total} {verb}
          {s.pending > 0 && (
            <span className="ml-2 rounded-full bg-gold-300/40 px-2 py-0.5 text-xs font-semibold text-ink">
              {s.pending} offen
            </span>
          )}
        </span>
      </div>
      <Bar filmed={s.filmed} total={s.total} />
      <span className="text-xs text-ink-muted">{s.hint}</span>
    </div>
  );
}

export default async function AdminPage() {
  // Ohne Supabase gibt es keine Anmeldung → kein Admin-Schutz möglich.
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container className="mx-auto max-w-xl text-center">
          <Eyebrow>Marketing-Cockpit</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Das Cockpit braucht eine konfigurierte Supabase-Anbindung, um dich als
            Admin anzumelden. Sobald die Umgebungsvariablen gesetzt sind, ist diese
            Seite verfügbar.
          </p>
        </Container>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const [funnel, content] = await Promise.all([
    getFunnelStats(),
    Promise.resolve(getContentInventory()),
  ]);

  const conversion =
    funnel.leads.total > 0
      ? Math.round((funnel.leads.confirmed / funnel.leads.total) * 100)
      : 0;
  const maxStage = Math.max(1, ...funnel.tests.byStage);

  return (
    <>
      {/* Kopf */}
      <section className="grain relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              APP_GLOW,
          }}
        />
        <Container className="flex flex-col items-start gap-5">
          <Link
            href="/mitglieder"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Mein Bereich
          </Link>
          <Eyebrow>Marketing-Cockpit</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Dein <em className="accent">Überblick</em>
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Alles Wichtige an einem Ort: wie viele Menschen du erreichst, wie dein
            E-Book-Funnel läuft – und welche Inhalte noch produziert werden müssen.
          </p>

          <div className="mt-2 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value={funnel.members} label="Mitglieder" />
            <Stat value={funnel.newsletter} label="Newsletter-Abos" />
            <Stat
              value={funnel.leads.confirmed}
              label="E-Book-Leads"
              sub={`+${funnel.leadsRecent} in 30 Tagen`}
            />
            <Stat value={funnel.tests.total} label="Bewusstseinstests" />
          </div>

          <Link
            href="/admin/vorlagen"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Alle Vorlagen verwalten
            <ArrowRight />
          </Link>
        </Container>
      </section>

      {/* Hinweis, falls Service-Role-Key fehlt */}
      {!funnel.configured && (
        <section className="pt-8">
          <Container>
            <div className="mx-auto max-w-2xl rounded-2xl border border-gold-400/50 bg-gold-300/15 p-5 text-sm text-ink-mid">
              <strong className="font-semibold text-ink">Funnel-Zahlen noch inaktiv.</strong>{" "}
              Setze <code className="rounded bg-ink/5 px-1">SUPABASE_SERVICE_ROLE_KEY</code>,
              damit Leads, Newsletter und Tests hier gezählt werden. Der
              Content-Status unten funktioniert bereits ohne Datenbank.
            </div>
          </Container>
        </section>
      )}

      {/* E-Book-Funnel */}
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Eyebrow>E-Book-Funnel</Eyebrow>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink">
              Vom Interesse zur Bestätigung
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat value={funnel.leads.pending} label="Offen (Opt-in)" />
              <Stat value={funnel.leads.confirmed} label="Bestätigt" />
              <Stat value={funnel.leads.unsubscribed} label="Abgemeldet" />
              <Stat value={`${conversion}%`} label="Bestätigungsrate" />
            </div>
          </div>
        </Container>
      </section>

      {/* Bewusstseinstest-Verteilung */}
      {funnel.tests.total > 0 && (
        <section className="border-t border-ink/10 py-12">
          <Container>
            <div className="mx-auto max-w-2xl">
              <Eyebrow>Bewusstseinstest</Eyebrow>
              <h2 className="mt-1 font-display text-2xl font-medium text-ink">
                Wo deine Community startet
              </h2>
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
                {funnel.tests.byStage.map((count, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-sm text-ink-mid">
                      Stufe {i + 1} · {stages[i]?.title ?? ""}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-leaf-500 to-teal-500"
                        style={{ width: `${(count / maxStage) * 100}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm tabular-nums text-ink-mid">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Content-/Drehplan-Status */}
      <section className="border-t border-ink/10 py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <Eyebrow>Produktion</Eyebrow>
                <h2 className="mt-1 font-display text-2xl font-medium text-ink">
                  Content- & Drehplan-Status
                </h2>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-medium text-accent">
                  {content.totals.filmed} / {content.totals.total}
                </div>
                <div className="text-sm text-ink-mid">Videos gedreht</div>
              </div>
            </div>

            <div className="mt-4">
              <Bar filmed={content.totals.filmed} total={content.totals.total} />
            </div>
            {content.totals.pending > 0 && (
              <p className="mt-3 text-sm text-ink-mid">
                Noch <strong className="text-ink">{content.totals.pending} Videos</strong>{" "}
                abzudrehen. Die Skripte dazu liegen bereit in{" "}
                <code className="rounded bg-ink/5 px-1">docs/skripte/</code>.
              </p>
            )}

            <p className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              Langvideos
            </p>
            <div className="flex flex-col gap-3">
              {content.sections.map((s) => (
                <SectionRow key={s.key} s={s} />
              ))}
            </div>

            {/* Reels als eigene Produktionslinie */}
            <div className="mt-8 flex items-baseline justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Reels (Kurzvideos)
              </p>
              <span className="text-sm tabular-nums text-ink-mid">
                {content.reels.filmed} / {content.reels.total} gedreht
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {content.reels.series.map((s) => (
                <SectionRow
                  key={s.key}
                  s={{
                    key: s.key,
                    label: `Reels · ${s.label}`,
                    hint: "Skripte in docs/skripte/reels/",
                    total: s.total,
                    filmed: s.filmed,
                    pending: s.total - s.filmed,
                  }}
                />
              ))}
            </div>

            {/* Carousels als eigene Produktionslinie */}
            <div className="mt-8 flex items-baseline justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Carousels (Foliensequenzen)
              </p>
              <span className="text-sm tabular-nums text-ink-mid">
                {content.carousels.produced} / {content.carousels.total} erstellt
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {content.carousels.series.map((s) => (
                <SectionRow
                  key={s.key}
                  verb="erstellt"
                  s={{
                    key: s.key,
                    label: `Carousel · ${s.label}`,
                    hint: "Slides in docs/skripte/carousels/",
                    total: s.total,
                    filmed: s.produced,
                    pending: s.total - s.produced,
                  }}
                />
              ))}
            </div>

            {/* Weiteres Marketing-Material */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat
                value={content.coverMotifs}
                label="Cover-Motive"
                sub={`× ${content.coverFormats} Formate`}
              />
              <Stat value={content.reels.total} label="Reels geplant" />
              <Stat value={content.carousels.total} label="Carousels geplant" />
              <Stat value={content.blogPosts} label="Blog-Artikel" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
