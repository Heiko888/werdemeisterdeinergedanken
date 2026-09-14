import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { APP_GLOW } from "@/lib/gradients";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import {
  EMPFEHLUNG_LABEL,
  ERGEBNIS_LABEL,
  datumDe,
  stufeLabel,
  type Empfehlung,
  type Ergebnis,
} from "@/lib/erstgespraech/phasen";
import type { FragebogenRow, GespraechRow } from "@/lib/erstgespraech/types";
import { site } from "@/lib/site";
import { OhneFragebogenButton, StartGespraechButton } from "./Aktionen";
import { FragebogenLink } from "./FragebogenLink";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Erstgespräche",
  robots: { index: false, follow: false },
};

const ERGEBNIS_STYLE: Record<Ergebnis, string> = {
  offen: "bg-ink/5 text-ink-mid",
  zusage: "bg-emerald-500/15 text-emerald-700",
  bedenkzeit: "bg-gold-300/40 text-ink",
  absage: "bg-red-500/12 text-red-700",
  nicht_passend: "bg-ink/8 text-ink-muted",
};

function datumZeit(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function dauerText(sek: number | null): string {
  if (!sek || sek <= 0) return "—";
  const min = Math.round(sek / 60);
  return `${min} Min`;
}

function kurz(text: string | null, max = 120): string {
  if (!text) return "";
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

/** Fälliger nächster Schritt: Bedenkzeit, Datum heute oder vorbei. */
function istFaellig(g: GespraechRow): boolean {
  if (g.ergebnis !== "bedenkzeit" || !g.naechster_schritt_am) return false;
  const heute = new Date().toISOString().slice(0, 10);
  return g.naechster_schritt_am <= heute;
}

export default async function ErstgespraechePage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container size="narrow" className="text-center">
          <Eyebrow>Erstgespräche</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Das Cockpit braucht eine konfigurierte Supabase-Anbindung. Sobald die
            Umgebungsvariablen gesetzt sind, ist diese Seite verfügbar.
          </p>
        </Container>
      </section>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin/erstgespraeche");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  // Zusätzlich zur E-Mail-Freigabe muss das Konto in der Datenbank als Admin
  // hinterlegt sein (admin_users) – sonst lässt RLS keine Zeile durch.
  const { data: istAdmin } = await supabase.rpc("ist_admin");

  const [{ data: fragebogen }, { data: gespraeche }] = await Promise.all([
    supabase
      .from("erstgespraech_fragebogen")
      .select("*")
      .eq("status", "neu")
      .order("created_at", { ascending: false }),
    supabase
      .from("erstgespraech_gespraeche")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  const offene = (fragebogen ?? []) as FragebogenRow[];
  const gefuehrte = (gespraeche ?? []) as GespraechRow[];

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
          <Eyebrow>Klarheitsgespräch</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Deine <em className="accent">Erstgespräche</em>
          </h1>
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-mid">
            Wer hat den Fragebogen ausgefüllt, welches Gespräch ist offen, welcher
            nächste Schritt steht an. Ein Klick öffnet das Gesprächs-Cockpit.
          </p>
          <OhneFragebogenButton />
          <FragebogenLink url={`${site.url}/klarheitsgespraech`} />
        </Container>
      </section>

      {istAdmin === false && (
        <section className="pt-8">
          <Container>
            <div className="mx-auto max-w-2xl rounded-2xl border border-gold-400/50 bg-gold-300/15 p-5 text-sm text-ink-mid">
              <strong className="font-semibold text-ink">
                Dieses Konto ist in der Datenbank nicht als Admin hinterlegt.
              </strong>{" "}
              Deine Adresse darf zwar den Adminbereich sehen, aber die
              Gesprächsdaten liegen hinter einer zusätzlichen Datenbank-Sperre
              (RLS). Melde dich mit dem hinterlegten Konto an
              (<code className="rounded bg-ink/5 px-1">heiko.schwaninger@outlook.com</code>),
              sonst bleiben die Listen unten leer.
            </div>
          </Container>
        </section>
      )}

      {/* Offene Fragebögen */}
      <section className="py-12">
        <Container>
          <div className="mb-5 flex items-baseline justify-between">
            <Eyebrow>Offene Fragebögen</Eyebrow>
            <span className="text-sm text-ink-muted">{offene.length}</span>
          </div>

          {offene.length === 0 ? (
            <p className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 text-sm text-ink-mid">
              Gerade keine offenen Fragebögen. Neue Antworten aus dem Vorab-Formular
              erscheinen hier automatisch.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {offene.map((f) => (
                <li
                  key={f.id}
                  className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-medium text-ink">{f.name}</span>
                      <span className="text-sm text-ink-mid">{f.email}</span>
                      <span className="text-xs text-ink-muted">
                        {datumZeit(f.created_at)}
                      </span>
                      <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-ink-mid">
                        {stufeLabel(f.stufe)}
                      </span>
                    </div>
                    {f.anlass && (
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                        {kurz(f.anlass)}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <StartGespraechButton fragebogenId={f.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Geführte Gespräche */}
      <section className="pb-20">
        <Container>
          <div className="mb-5 flex items-baseline justify-between">
            <Eyebrow>Geführte Gespräche</Eyebrow>
            <span className="text-sm text-ink-muted">{gefuehrte.length}</span>
          </div>

          {gefuehrte.length === 0 ? (
            <p className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 text-sm text-ink-mid">
              Noch keine Gespräche. Starte eins aus einem Fragebogen oben oder über
              „Gespräch ohne Fragebogen“.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {gefuehrte.map((g) => {
                const faellig = istFaellig(g);
                return (
                  <li key={g.id}>
                    <Link
                      href={`/admin/erstgespraeche/${g.id}`}
                      className={`flex flex-col gap-3 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-center sm:justify-between ${
                        faellig
                          ? "border-gold-500/60 bg-gold-300/20 hover:border-gold-500"
                          : "border-ink/10 bg-ink/[0.02] hover:border-ink/25"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-medium text-ink">
                            {g.interessent_name}
                          </span>
                          <span className="text-xs text-ink-muted">
                            {datumZeit(g.created_at)}
                          </span>
                          <span className="text-xs text-ink-muted">
                            {dauerText(g.dauer_sekunden)}
                          </span>
                          {g.ergebnis && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                ERGEBNIS_STYLE[g.ergebnis]
                              }`}
                            >
                              {ERGEBNIS_LABEL[g.ergebnis]}
                            </span>
                          )}
                          {g.empfehlung && g.empfehlung !== "keine" && (
                            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-ink-mid">
                              {EMPFEHLUNG_LABEL[g.empfehlung as Empfehlung]}
                            </span>
                          )}
                        </div>
                        {g.naechster_schritt && (
                          <p className="mt-2 text-sm text-ink-soft">
                            <span className="text-ink-muted">Nächster Schritt: </span>
                            {g.naechster_schritt}
                            {g.naechster_schritt_am && (
                              <span
                                className={
                                  faellig
                                    ? "font-medium text-ink"
                                    : "text-ink-muted"
                                }
                              >
                                {" "}
                                · {datumDe(g.naechster_schritt_am)}
                                {faellig ? " (fällig)" : ""}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="hidden shrink-0 text-ink-mid sm:block" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
