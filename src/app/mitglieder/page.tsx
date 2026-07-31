import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Download, Play } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, REQUIRE_MEMBER_LOGIN } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { signOut } from "@/app/auth/actions";
import { stages } from "@/lib/content";
import { deepDivesByCategory } from "@/lib/deep-dives";
import {
  practicesByCategory,
  practicesForStage,
  featuredPractice,
} from "@/lib/practices";
import { NewsletterToggle } from "@/components/members/NewsletterToggle";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mein Bereich",
  robots: { index: false, follow: false },
};

export default async function MembersPage() {
  let name = "";
  let loggedIn = false;
  let startStage: number | null = null;
  let completedKeys: string[] = [];
  let newsletterOptIn = false;
  let isAdmin = false;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Login-Schutz: nur erzwingen, wenn eingeschaltet
    if (REQUIRE_MEMBER_LOGIN && !user) redirect("/login?redirect=/mitglieder");

    if (user) {
      loggedIn = true;
      isAdmin = isAdminEmail(user.email);

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      name =
        profile?.full_name ||
        (user.user_metadata?.full_name as string | undefined) ||
        user.email?.split("@")[0] ||
        "";

      // Personalisierung + Fortschritt (Spalten/Tabelle aus Migration 0002).
      // Vor der Migration bleiben die Felder leer – das Dashboard funktioniert
      // dann wie bisher, ganz ohne Fehler.
      const { data: testRow } = await supabase
        .from("profiles")
        .select("start_stage")
        .eq("id", user.id)
        .maybeSingle();
      startStage = (testRow?.start_stage as number | null) ?? null;

      const { data: progressRows } = await supabase
        .from("progress")
        .select("item_key")
        .eq("user_id", user.id)
        .eq("item_type", "stage")
        .eq("status", "completed");
      completedKeys = (progressRows ?? []).map((row) => row.item_key as string);

      // Opt-in für E-Mail-Impulse (Spalte aus Migration 0004 – sonst false)
      const { data: prefsRow } = await supabase
        .from("profiles")
        .select("newsletter_opt_in")
        .eq("id", user.id)
        .maybeSingle();
      newsletterOptIn = Boolean(prefsRow?.newsletter_opt_in);
    }
  }

  const completed = new Set(completedKeys);
  const completedCount = stages.filter((s) => completed.has(s.number)).length;

  const featured = featuredPractice();
  // Format-korrektes Label: Audio → „anhören", reines Video → „ansehen".
  const featuredIsAudio = featured ? Boolean(featured.audio) : false;
  const featuredKicker = featuredIsAudio
    ? "Geführte Meditation"
    : "Geführte Praxis";
  const featuredCta = featuredIsAudio ? "Jetzt anhören" : "Jetzt ansehen";

  // Empfehlung für den personalisierten Einstieg (aus dem Bewusstseinstest).
  const startStageData =
    startStage && startStage >= 1 && startStage <= stages.length
      ? stages[startStage - 1]
      : null;
  const startStagePractice = startStage
    ? practicesForStage(startStage)[0] ?? null
    : null;

  return (
    <>
      {/* Kopf */}
      <section className="grain relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 60% at 20% 0%, color-mix(in oklab, var(--color-teal-500) 12%, transparent), transparent 65%)",
          }}
        />
        <Container className="flex flex-col items-start gap-4">
          <Eyebrow>Mein Bereich</Eyebrow>
          <div className="flex w-full flex-wrap items-end justify-between gap-4">
            <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
              {name ? (
                <>
                  Schön, dass du da bist, <em className="accent">{name}</em>
                </>
              ) : (
                <>
                  Willkommen in deinem <em className="accent">Bereich</em>
                </>
              )}
            </h1>
            {loggedIn && (
              <form action={signOut}>
                <Button type="submit" variant="secondary">
                  Abmelden
                </Button>
              </form>
            )}
          </div>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Dein persönlicher Raum für deine Reise durch die 7 Stufen. Hier
            findest du künftig deine Inhalte, deinen Fortschritt und exklusive
            Materialien.
          </p>
          <div className="flex flex-wrap gap-3">
            {loggedIn && (
              <Link
                href="/mitglieder/journal"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper shadow-card transition-all hover:bg-ink/90"
              >
                <Check />
                Mein Journal
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
            <a
              href="/mitglieder/arbeitsheft"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-card transition-all hover:border-accent/40 hover:text-accent"
            >
              <Download />
              Gesamt-Arbeitsheft (alle 7 Stufen) als PDF
            </a>
            {isAdmin && (
              <Link
                href="/admin"
                className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white px-5 py-2.5 text-sm font-medium text-accent shadow-card transition-all hover:border-accent/70"
              >
                Marketing-Cockpit
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* Personalisierter Einstieg – aus dem Bewusstseinstest */}
      {loggedIn && startStageData && (
        <section className="py-6">
          <Container>
            <div className="flex flex-col gap-5 rounded-2xl border border-accent/30 bg-white p-7 shadow-card sm:p-8">
              <div className="flex flex-col gap-2">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Dein Ausgangspunkt
                </span>
                <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
                  Startstufe {startStageData.number} – {startStageData.title}
                </h2>
                <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                  Dein Bewusstseinstest zeigt hier deinen aktuellen Schwerpunkt –
                  ein guter Ort, um weiterzumachen.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={`/mitglieder/stufe/${startStage}`} variant="accent">
                  Zu Stufe {startStageData.number}
                  <ArrowRight />
                </Button>
                {startStagePractice && (
                  <Link
                    href={`/mitglieder/praxis/${startStagePractice.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent"
                  >
                    <Play />
                    Passende Praxis: {startStagePractice.title}
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Einladung zum Test, falls noch kein Ergebnis gespeichert ist */}
      {loggedIn && !startStageData && (
        <section className="py-6">
          <Container>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-ink/15 bg-white p-7 shadow-card sm:p-8">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Finde deinen Startpunkt
              </span>
              <h2 className="font-display text-xl font-medium text-ink sm:text-2xl">
                Wo stehst du gerade?
              </h2>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                Mach den Bewusstseinstest – 21 Fragen, etwa 5 Minuten. Dein
                Ergebnis landet direkt hier und zeigt dir, wo du am besten
                weitermachst.
              </p>
              <Button href="/bewusstseinstest" variant="accent">
                Bewusstseinstest starten
                <ArrowRight />
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Jetzt anhören – aktuelle Meditation */}
      {featured && (
        <section className="py-6">
          <Container>
            <Link
              href={`/mitglieder/praxis/${featured.slug}`}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-accent/30 bg-gradient-to-br from-leaf-500/[0.08] to-teal-500/[0.08] p-7 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <div className="flex items-center gap-5">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500 to-teal-500 text-2xl text-navy-950 shadow-sm">
                  <Play />
                </span>
                <div>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                    {featuredKicker}
                  </span>
                  <h2 className="mt-1 font-display text-xl font-medium text-ink sm:text-2xl">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-ink-mid">
                    {featured.duration} · {featured.category}
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-all group-hover:bg-ink/90">
                {featuredCta}
                <ArrowRight />
              </span>
            </Link>
          </Container>
        </section>
      )}

      {/* Fortschritt durch die 7 Stufen */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-medium text-ink">
              Deine 7 Stufen
            </h2>
            <span className="text-sm text-ink-muted">
              {completedCount} / {stages.length} abgeschlossen
            </span>
          </div>

          {/* Fortschrittsbalken */}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-ink/[0.06]">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-leaf-500 to-teal-500 transition-all duration-500"
              style={{
                width: `${Math.round((completedCount / stages.length) * 100)}%`,
              }}
            />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stages.map((stage, i) => {
              const isDone = completed.has(stage.number);
              return (
                <Link
                  key={stage.number}
                  href={`/mitglieder/stufe/${i + 1}`}
                  className={`group flex flex-col gap-2 rounded-2xl border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 ${
                    isDone ? "border-accent/40" : "border-ink/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl italic text-accent">
                      {stage.number}
                    </span>
                    {isDone ? (
                      <span
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500 to-teal-500 text-xs text-navy-950"
                        title="Abgeschlossen"
                      >
                        <Check />
                      </span>
                    ) : (
                      <ArrowRight className="text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                    {stage.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-mid">
                    {stage.subtitle}
                  </p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Wöchentliche E-Mail-Impulse */}
      {loggedIn && (
        <section className="border-t border-ink/10 py-12">
          <Container>
            <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-ink/10 bg-white p-7 shadow-card sm:flex-row sm:items-center sm:p-8">
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Wöchentlicher Impuls
                </span>
                <h2 className="font-display text-xl font-medium text-ink">
                  Ein Gedanke pro Woche in dein Postfach
                </h2>
                <p className="max-w-md text-[0.98rem] leading-relaxed text-ink-mid">
                  Kurze, bodenständige Impulse entlang der 7 Stufen – jederzeit
                  mit einem Klick abbestellbar.
                </p>
              </div>
              <NewsletterToggle initialOptIn={newsletterOptIn} />
            </div>
          </Container>
        </section>
      )}

      {/* Vertiefungen – psychologische Wissens-Bibliothek */}
      <section className="border-t border-ink/10 bg-white/60 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
              Wissens-Bibliothek
            </span>
            <h2 className="font-display text-2xl font-medium text-ink">
              Vertiefungen
            </h2>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
              Die psychologischen Mechanismen hinter den 7 Stufen – zum
              Nachschlagen und Vertiefen. Jedes Thema mit Übungen und
              Reflexionsfragen.
            </p>
          </div>

          {deepDivesByCategory().map((group) => (
            <div key={group.category} className="mt-10">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                {group.category}
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((dive) => (
                  <Link
                    key={dive.slug}
                    href={`/mitglieder/wissen/${dive.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                        {dive.title}
                      </h4>
                      <ArrowRight className="mt-1 shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                    </div>
                    <p className="text-sm leading-relaxed text-ink-mid">
                      {dive.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
            <h3 className="font-display text-xl italic text-ink">
              Ein Thema fehlt dir?
            </h3>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
              Die Bibliothek wächst Schritt für Schritt. Wenn dich ein bestimmter
              psychologischer Mechanismus beschäftigt, schreib mir – oft wird
              daraus die nächste Vertiefung.
            </p>
            <Button href="/kontakt" variant="accent">
              Thema vorschlagen
              <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>

      {/* Praxis – gelebte Praxis (Meditation, Atem, Rituale) */}
      <section className="border-t border-ink/10 py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
              Gelebte Praxis
            </span>
            <h2 className="font-display text-2xl font-medium text-ink">
              Praxis
            </h2>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
              Was die Stufen wirksam macht: geführte Meditationen, Atemübungen
              und Rituale für den Alltag – jede mit klarer Schritt-für-Schritt-
              Anleitung.
            </p>
          </div>

          {practicesByCategory().map((group) => (
            <div key={group.category} className="mt-10">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                {group.category}
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((practice) => (
                  <Link
                    key={practice.slug}
                    href={`/mitglieder/praxis/${practice.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                        {practice.title}
                      </h4>
                      <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        {practice.duration}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-mid">
                      {practice.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
