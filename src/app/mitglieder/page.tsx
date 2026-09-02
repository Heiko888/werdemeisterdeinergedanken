import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Brain,
  Check,
  Download,
  Play,
  Spark,
} from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, REQUIRE_MEMBER_LOGIN } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { signOut } from "@/app/auth/actions";
import { stages } from "@/lib/content";
import { deepDivesForStage } from "@/lib/deep-dives";
import { practicesForStage } from "@/lib/practices";
import { NewsletterToggle } from "@/components/members/NewsletterToggle";
import { MomentumRow } from "@/components/members/MomentumRow";
import { PROGRAMM_TAGE_GESAMT } from "@/lib/programm";
import { VideoEmbed } from "@/components/members/VideoEmbed";
import { site } from "@/lib/site";
import { isBegleiterConfigured } from "@/app/mitglieder/begleiter/actions";
import { isDetektorConfigured } from "@/app/mitglieder/detektor-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mein Bereich",
  robots: { index: false, follow: false },
};

/**
 * Liefert nur den Vornamen, sauber groß geschrieben – egal ob die Quelle ein
 * voller Name ("Heiko Schwaninger") oder der E-Mail-Teil ("heiko.schwaninger")
 * ist. Getrennt wird an Leerzeichen, Punkt, Unterstrich oder Bindestrich.
 */
function firstName(raw: string): string {
  const token = raw.trim().split(/[\s._-]+/)[0] ?? "";
  if (!token) return "";
  return token.charAt(0).toUpperCase() + token.slice(1);
}

export default async function MembersPage() {
  let name = "";
  let loggedIn = false;
  let startStage: number | null = null;
  let completedKeys: string[] = [];
  let startedKeys: string[] = [];
  let newsletterOptIn = false;
  let isAdmin = false;
  // Momentum-Signale für den Kopf (Serie, Programm-Fortschritt, letzte Aktivität).
  let rueckkehrTage: string[] = [];
  let programmDone = 0;
  let lastActivity: string | null = null;

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
      // Bewusst KEIN Rückfall auf den E-Mail-Teil: daraus einen „Namen" zu raten
      // erzeugt bei Fantasie-Adressen Fantasie-Namen. Ohne echten Namen wird
      // stattdessen neutral begrüßt (siehe Fallback in der Überschrift).
      const rawName =
        profile?.full_name ||
        (user.user_metadata?.full_name as string | undefined) ||
        "";
      name = firstName(rawName);

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

      // „Begonnene" Stufen (aus echter Aktivität, z. B. eine Reflexion) –
      // ein weiches Signal neben dem manuellen „abgeschlossen".
      const { data: startedRows } = await supabase
        .from("progress")
        .select("item_key")
        .eq("user_id", user.id)
        .eq("item_type", "stage")
        .eq("status", "in_progress");
      startedKeys = (startedRows ?? []).map((row) => row.item_key as string);

      // Opt-in für E-Mail-Impulse (Spalte aus Migration 0004 – sonst false)
      const { data: prefsRow } = await supabase
        .from("profiles")
        .select("newsletter_opt_in")
        .eq("id", user.id)
        .maybeSingle();
      newsletterOptIn = Boolean(prefsRow?.newsletter_opt_in);

      // Momentum-Signale (jeweils defensiv – fehlt eine Tabelle/Migration,
      // bleibt der Wert leer und der Kopf zeigt die Reihe einfach nicht).
      const { data: rueckkehrRows } = await supabase
        .from("rueckkehr")
        .select("datum")
        .eq("user_id", user.id)
        .order("datum", { ascending: false })
        .limit(400);
      rueckkehrTage = (rueckkehrRows ?? []).map((row) => row.datum as string);

      const { data: programmRows } = await supabase
        .from("progress")
        .select("item_key")
        .eq("user_id", user.id)
        .eq("item_type", "programm")
        .eq("status", "completed");
      programmDone = (programmRows ?? []).length;

      // „Zuletzt aktiv": das jüngste von letzter Reflexion und letzter Rückkehr.
      const { data: lastNote } = await supabase
        .from("notes")
        .select("updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const kandidaten = [
        lastNote?.updated_at as string | undefined,
        rueckkehrTage[0] ? `${rueckkehrTage[0]}T00:00:00Z` : undefined,
      ].filter(Boolean) as string[];
      lastActivity =
        kandidaten.length > 0
          ? kandidaten.reduce((a, b) => (new Date(a) > new Date(b) ? a : b))
          : null;
    }
  }

  // Der KI-Begleiter wird nur verlinkt, wenn er serverseitig eingerichtet ist.
  const begleiterVerfuegbar = loggedIn && (await isBegleiterConfigured());
  // Der Manipulations-Detektor hängt an seinem eigenen Konfigurations-Check
  // (nicht am Begleiter): beide brauchen zwar denselben API-Key, aber semantisch
  // ist der Detektor ein eigenes Werkzeug – so bleibt der Link korrekt, falls
  // sich die Voraussetzungen später auseinanderentwickeln.
  const detektorVerfuegbar = loggedIn && (await isDetektorConfigured());

  const completed = new Set(completedKeys);
  // „Begonnen" nur dort zeigen, wo (noch) nicht abgeschlossen.
  const started = new Set(startedKeys.filter((k) => !completed.has(k)));
  const completedCount = stages.filter((s) => completed.has(s.number)).length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  // Chronologischer Lernpfad (sanfte Führung, keine Sperre): der Wiedereinstieg
  // ist die erste noch nicht abgeschlossene Stufe – frühestens aber die Stufe,
  // die der Bewusstseinstest ermittelt hat (start_stage). So wird ein frisch
  // eingestuftes Mitglied bei „seiner" Stufe abgeholt, statt pauschal bei Stufe 1;
  // frühere Stufen bleiben frei zugänglich. Ohne Test gilt wie bisher die erste
  // offene Stufe. Dieser Anker steuert zugleich das „Du bist hier" im Stepper.
  const floorIndex = startStage
    ? Math.min(Math.max(startStage - 1, 0), stages.length - 1)
    : 0;
  let currentIndex = stages.findIndex(
    (s, i) => i >= floorIndex && !completed.has(s.number),
  );
  // Ist ab der Startstufe alles erledigt, aber davor noch etwas offen, nimm die
  // erste offene Stufe überhaupt – kein „alles geschafft", solange etwas fehlt.
  if (currentIndex === -1) {
    currentIndex = stages.findIndex((s) => !completed.has(s.number));
  }
  const allStagesDone = currentIndex === -1;
  const currentOrdinal = allStagesDone ? stages.length : currentIndex + 1;
  const currentStage = allStagesDone ? null : stages[currentIndex];
  const currentPractice = allStagesDone
    ? null
    : practicesForStage(currentOrdinal)[0] ?? null;

  // Kuratierte Auswahl fürs Dashboard: nur wenige, zur aktuellen Stufe passende
  // Vertiefungen und Übungen. Die vollständigen Bibliotheken liegen auf eigenen
  // Seiten (/mitglieder/wissen bzw. /mitglieder/praxis) – so bleibt das Dashboard
  // ein Cockpit („was jetzt dran ist") statt ein Index von allem.
  const focusStage = allStagesDone ? null : currentStage;
  const stageDeepDives = deepDivesForStage(currentOrdinal).slice(0, 3);
  const stagePractices = practicesForStage(currentOrdinal).slice(0, 3);

  // Werkzeuge (Ebene 3): die früheren Hero-Pills, gruppiert und entzerrt.
  const tools = [
    loggedIn && { href: "/mitglieder/journal", label: "Mein Journal", icon: Check },
    begleiterVerfuegbar && {
      href: "/mitglieder/begleiter",
      label: "Dein Begleiter",
      icon: Spark,
    },
    loggedIn && {
      href: "/mitglieder/gedankenprofil",
      label: "Mein Gedankenprofil",
      icon: Brain,
    },
    detektorVerfuegbar && {
      href: "/mitglieder/detektor",
      label: "Manipulations-Detektor",
      icon: Spark,
    },
    loggedIn && {
      href: "/mitglieder/programm",
      label: "21 Tage Autopilot-Ausstieg",
      icon: ArrowRight,
    },
    loggedIn && {
      href: "/mitglieder/rueckkehr",
      label: "Die tägliche Rückkehr",
      icon: ArrowRight,
    },
    {
      href: "/mitglieder/wissensdatenbank",
      label: "Wissensdatenbank",
      icon: Brain,
    },
    isAdmin && { href: "/admin", label: "Marketing-Cockpit", icon: Spark },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Check }[];

  return (
    <>
      {/* Kopf – dunkle Navy-Kopfzone (Marken-Blau), jetzt schlank ohne Pill-Wolke */}
      <section className="member-hero flex flex-col justify-center overflow-hidden py-14 min-h-[22rem] sm:min-h-[34rem] sm:py-20">
        <Container className="relative z-10 flex flex-col items-start gap-4">
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
              <div className="flex items-center gap-2.5">
                <Link
                  href="/mitglieder/einstellungen"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-gold-400/45 hover:bg-white/15"
                >
                  Einstellungen
                </Link>
                <form action={signOut}>
                  <Button type="submit" variant="secondary">
                    Abmelden
                  </Button>
                </form>
              </div>
            )}
          </div>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Dein persönlicher Raum für deine Reise durch die 7 Stufen. Unten
            siehst du, wo du stehst und was als Nächstes dran ist.
          </p>

          {/* Mini-Fortschritt direkt im Kopf */}
          <div className="mt-2 flex w-full max-w-md flex-col gap-2">
            <div className="flex items-baseline justify-between text-sm text-ink-mid">
              <span>
                {allStagesDone
                  ? "Alle Stufen abgeschlossen"
                  : `Stufe ${currentOrdinal} von ${stages.length}`}
              </span>
              <span className="tabular-nums text-ink-muted">
                {progressPercent}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-gold-300 to-gold-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Momentum – Serie, Programm-Fortschritt & letzte Aktivität auf einen
              Blick (nur, wenn es etwas zu zeigen gibt). */}
          {loggedIn && (
            <MomentumRow
              rueckkehrTage={rueckkehrTage}
              programmDone={programmDone}
              programmTotal={PROGRAMM_TAGE_GESAMT}
              lastActivity={lastActivity}
            />
          )}
        </Container>
      </section>

      {/* Willkommensvideo – kurzes Intro & Orientierung fürs Dashboard.
          Facade-Muster wie auf den Stufen-Seiten: erst Poster, YouTube lädt
          erst beim Klick. Solange kein eigenes Video eingetragen ist, greift
          der globale Platzhalter (site.placeholderVideoId). */}
      <section className="pt-8 sm:pt-10">
        <Container>
          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
              Willkommen
            </span>
            <h2 className="font-display text-2xl font-medium text-ink">
              Kurz zur Orientierung
            </h2>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
              In zwei Minuten zeige ich dir, wie du dich hier zurechtfindest –
              und worum es auf deiner Reise durch die 7 Stufen wirklich geht.
            </p>
          </div>
          {site.placeholderVideoId ? (
            <VideoEmbed
              videoId={site.placeholderVideoId}
              title="Willkommen in deinem Bereich"
              poster="/video-thumbnails/willkommen-hell.png"
            />
          ) : (
            <div className="mt-3 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-paper/50 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
                <Play />
              </span>
              <p className="max-w-xs px-6 text-sm leading-relaxed text-ink-muted">
                Das Willkommensvideo folgt in Kürze.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* EBENE 1 – „Hier weitermachen": der einzige dominante Anker */}
      {loggedIn && (
        <section className="py-8 sm:py-10">
          <Container>
            {allStagesDone ? (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-accent/30 bg-gradient-to-br from-gold-500/[0.08] to-gold-500/[0.08] p-7 shadow-card sm:p-9">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-xl text-navy-950">
                  <Check />
                </span>
                <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                  Du hast alle 7 Stufen abgeschlossen.
                </h2>
                <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                  Ein großer Schritt. Vertiefe, wiederhole oder halte deine
                  Reise im Journal fest – Meisterschaft ist kein Ziel, sondern
                  eine Praxis.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button href="/mitglieder/journal" variant="accent">
                    Zu meinem Journal
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            ) : (
              currentStage && (
                <div className="flex flex-col gap-6 rounded-2xl border border-gold-500/35 bg-white p-7 shadow-card sm:p-9">
                  <div className="flex flex-col gap-2">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-700">
                      Hier weitermachen · Stufe {currentOrdinal} von {stages.length}
                    </span>
                    <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                      Stufe {currentStage.number}:{" "}
                      <span className="text-gold-700">{currentStage.title}</span>
                    </h2>
                    <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                      {currentStage.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/mitglieder/stufe/${currentOrdinal}`}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-card transition-all hover:opacity-95"
                    >
                      Weiter mit Stufe {currentOrdinal}
                      <ArrowRight />
                    </Link>
                    {currentPractice && (
                      <Link
                        href={`/mitglieder/praxis/${currentPractice.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-3 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent"
                      >
                        <Play />
                        Passende Praxis: {currentPractice.title}
                      </Link>
                    )}
                  </div>
                  {!startStage && (
                    <p className="text-sm text-ink-muted">
                      Noch nicht sicher, wo du stehst?{" "}
                      <Link
                        href="/bewusstseinstest"
                        className="font-medium text-accent underline-offset-4 hover:underline"
                      >
                        Mach den Bewusstseinstest
                      </Link>{" "}
                      – dein Ergebnis passt den Startpunkt an.
                    </p>
                  )}
                </div>
              )
            )}
          </Container>
        </section>
      )}

      {/* EBENE 2 – „Dein Weg": chronologischer Stepper mit Status */}
      <section className="py-14 sm:py-20">
        <Container size="narrow">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Dein Weg
              </span>
              <h2 className="mt-1 font-display text-2xl font-medium text-ink">
                Die 7 Stufen
              </h2>
            </div>
            <span className="shrink-0 text-sm text-ink-muted">
              {completedCount} / {stages.length} abgeschlossen
            </span>
          </div>

          <ol className="relative mt-10">
            <span
              aria-hidden
              className="absolute left-6 top-6 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold-500/45 via-gold-400/30 to-ink/10"
            />
            {stages.map((stage, i) => {
              const ordinal = i + 1;
              const isDone = completed.has(stage.number);
              const isCurrent = !isDone && i === currentIndex;
              // „Begonnen": an dieser Stufe wurde schon gearbeitet (z. B. eine
              // Reflexion geschrieben), sie ist aber weder aktuell noch erledigt.
              const isStarted =
                !isDone && !isCurrent && started.has(stage.number);
              // Sanfte Führung statt Sperre: alle Stufen bleiben frei zugänglich.
              // „Als Nächstes" markiert die Stufe direkt nach der aktuellen.
              const isNext =
                !isDone && !isCurrent && !isStarted && i === currentIndex + 1;

              return (
                <li key={stage.number} className="relative flex pb-8 last:pb-0">
                  <Link
                    href={`/mitglieder/stufe/${ordinal}`}
                    className={`group flex flex-1 gap-5 rounded-2xl transition-all ${
                      isCurrent
                        ? "border border-gold-500/45 bg-white p-4 shadow-card -my-1"
                        : "p-1 hover:opacity-80"
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-medium ${
                        isDone
                          ? "bg-gradient-to-br from-gold-400 to-gold-500 text-navy-950"
                          : isCurrent
                            ? "bg-gold-500 text-navy-950 ring-4 ring-gold-500/30"
                            : isStarted
                              ? "border border-gold-500/35 bg-gold-500/12 text-gold-700"
                              : "border border-ink/10 bg-mist-100 text-ink-mid"
                      }`}
                    >
                      {isDone ? <Check /> : stage.number}
                    </span>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="text-lg font-medium text-ink">
                          {stage.title}
                        </h3>
                        {isDone && (
                          <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-accent">
                            Erledigt
                          </span>
                        )}
                        {isCurrent && (
                          <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-gold-700">
                            Du bist hier
                          </span>
                        )}
                        {isStarted && (
                          <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-gold-700">
                            Begonnen
                          </span>
                        )}
                        {isNext && (
                          <span className="rounded-full bg-ink/[0.06] px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                            Als Nächstes
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-mid">
                        {stage.subtitle}
                      </p>
                      {isCurrent && (
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                          Weitermachen
                          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
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

      {/* EBENE 3 – Vertiefen & Üben + Werkzeuge (entzerrt, auf Wechsel-Fläche) */}
      {/* Werkzeuge – die früheren Hero-Pills, jetzt als ruhiger Werkzeugkasten */}
      {tools.length > 0 && (
        <section className="border-t border-ink/10 bg-surface-2 py-14 sm:py-16">
          <Container>
            <div className="flex flex-col gap-2">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Dein Werkzeugkasten
              </span>
              <h2 className="font-display text-2xl font-medium text-ink">
                Werkzeuge & mehr
              </h2>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                Alles Weitere für deine Reise – jederzeit griffbereit, aber
                bewusst im Hintergrund, damit dein Weg im Vordergrund bleibt.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/15 to-gold-500/15 text-lg text-accent">
                    <Icon />
                  </span>
                  <span className="flex-1 text-[0.98rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                    {label}
                  </span>
                  <ArrowRight className="shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              ))}
              <a
                href="/mitglieder/arbeitsheft"
                className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/15 to-gold-500/15 text-lg text-accent">
                  <Download />
                </span>
                <span className="flex-1 text-[0.98rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                  Gesamt-Arbeitsheft (alle 7 Stufen) als PDF
                </span>
                <ArrowRight className="shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </a>
            </div>
          </Container>
        </section>
      )}

      {/* Vertiefen zu deiner Stufe – kuratierte Auswahl statt ganzer Bibliothek */}
      <section className="border-t border-ink/10 bg-white/60 py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Wissens-Bibliothek
              </span>
              <h2 className="font-display text-2xl font-medium text-ink">
                Vertiefungen
                {focusStage && (
                  <span className="text-ink-muted">
                    {" "}· passend zu Stufe {focusStage.number}
                  </span>
                )}
              </h2>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                Die psychologischen Mechanismen hinter deiner aktuellen Stufe –
                jedes Thema mit Übungen und Reflexionsfragen.
              </p>
            </div>
            <Link
              href="/mitglieder/wissen"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent"
            >
              Alle Vertiefungen ansehen
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {stageDeepDives.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stageDeepDives.map((dive) => (
                <Link
                  key={dive.slug}
                  href={`/mitglieder/wissen/${dive.slug}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                      {dive.title}
                    </h3>
                    <ArrowRight className="mt-1 shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>
                  <p className="text-sm leading-relaxed text-ink-mid">
                    {dive.summary}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* Nachschlage-Bibliothek (27 Kapitel) – kompakter Einstieg */}
          <Link
            href="/mitglieder/wissensdatenbank"
            className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/30"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/15 to-gold-500/15 text-lg text-accent">
                <Brain />
              </span>
              <div>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Wissensdatenbank · 27 Kapitel
                </span>
                <p className="font-display text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  Gehirn, Bewusstsein &amp; Gedanken – zum Nachschlagen
                </p>
              </div>
            </div>
            <ArrowRight className="shrink-0 text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </Container>
      </section>

      {/* Üben zu deiner Stufe – kuratierte Auswahl statt ganzer Bibliothek */}
      <section className="border-t border-ink/10 py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Gelebte Praxis
              </span>
              <h2 className="font-display text-2xl font-medium text-ink">
                Praxis
                {focusStage && (
                  <span className="text-ink-muted">
                    {" "}· passend zu Stufe {focusStage.number}
                  </span>
                )}
              </h2>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                Was die Stufen wirksam macht: geführte Übungen für den Alltag –
                jede mit klarer Schritt-für-Schritt-Anleitung.
              </p>
            </div>
            <Link
              href="/mitglieder/praxis"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent"
            >
              Alle Übungen ansehen
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {stagePractices.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stagePractices.map((practice) => (
                <Link
                  key={practice.slug}
                  href={`/mitglieder/praxis/${practice.slug}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                      {practice.title}
                    </h3>
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
          )}
        </Container>
      </section>
    </>
  );
}
