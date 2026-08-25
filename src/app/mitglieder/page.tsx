import type { Metadata } from "next";
import Image from "next/image";
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
import { deepDivesByCategory } from "@/lib/deep-dives";
import {
  practicesByCategory,
  practicesForStage,
  featuredPractice,
} from "@/lib/practices";
import { NewsletterToggle } from "@/components/members/NewsletterToggle";
import { isBegleiterConfigured } from "@/app/mitglieder/begleiter/actions";

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

  // Der KI-Begleiter wird nur verlinkt, wenn er serverseitig eingerichtet ist.
  const begleiterVerfuegbar = loggedIn && (await isBegleiterConfigured());

  const completed = new Set(completedKeys);
  const completedCount = stages.filter((s) => completed.has(s.number)).length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  const featured = featuredPractice();
  // Format-korrektes Label: Audio → „anhören", reines Video → „ansehen".
  const featuredIsAudio = featured ? Boolean(featured.audio) : false;
  const featuredKicker = featuredIsAudio
    ? "Geführte Meditation"
    : "Geführte Praxis";
  const featuredCta = featuredIsAudio ? "Jetzt anhören" : "Jetzt ansehen";

  // Chronologischer Lernpfad (sanfte Führung, keine Sperre): die aktuelle Stufe
  // ist die erste noch nicht abgeschlossene. Alles davor gilt als erledigt, die
  // direkt folgende als "Als Nächstes". Alle Stufen bleiben frei zugänglich – so
  // gibt es immer einen "Hier weitermachen"-Anker, auch ohne Test.
  const currentIndex = stages.findIndex((s) => !completed.has(s.number));
  const allStagesDone = currentIndex === -1;
  const currentOrdinal = allStagesDone ? stages.length : currentIndex + 1;
  const currentStage = allStagesDone ? null : stages[currentIndex];
  const currentPractice = allStagesDone
    ? null
    : practicesForStage(currentOrdinal)[0] ?? null;

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
    begleiterVerfuegbar && {
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
      <section className="member-hero overflow-hidden py-14 sm:py-20">
        {/* Titelbild – leuchtendes Gehirn über dem Weg: reine Dekoration hinter
            dem Text (deshalb alt=""). Darüber ein nach links dichter werdender
            Navy-Schleier, damit Begrüßung und Fortschritt lesbar bleiben. */}
        <Image
          src="/hero-mitglieder.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/55"
        />
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
              <form action={signOut}>
                <Button type="submit" variant="secondary">
                  Abmelden
                </Button>
              </form>
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
                className="block h-full rounded-full bg-gradient-to-r from-leaf-400 to-teal-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* EBENE 1 – „Hier weitermachen": der einzige dominante Anker */}
      {loggedIn && (
        <section className="py-8 sm:py-10">
          <Container>
            {allStagesDone ? (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-accent/30 bg-gradient-to-br from-leaf-500/[0.08] to-teal-500/[0.08] p-7 shadow-card sm:p-9">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500 to-teal-500 text-xl text-navy-950">
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
                <div className="flex flex-col gap-6 rounded-2xl border border-brand-300/60 bg-white p-7 shadow-card sm:p-9">
                  <div className="flex flex-col gap-2">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-500">
                      Hier weitermachen · Stufe {currentOrdinal} von {stages.length}
                    </span>
                    <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                      Stufe {currentStage.number}:{" "}
                      <span className="text-brand-600">{currentStage.title}</span>
                    </h2>
                    <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                      {currentStage.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/mitglieder/stufe/${currentOrdinal}`}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-14px_rgba(54,112,238,0.9)] transition-all hover:bg-brand-400"
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
              className="absolute left-6 top-6 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-leaf-500/40 via-teal-500/30 to-ink/10"
            />
            {stages.map((stage, i) => {
              const ordinal = i + 1;
              const isDone = completed.has(stage.number);
              const isCurrent = !isDone && i === currentIndex;
              // Sanfte Führung statt Sperre: alle Stufen bleiben frei zugänglich.
              // „Als Nächstes" markiert die Stufe direkt nach der aktuellen.
              const isNext = !isDone && !isCurrent && i === currentIndex + 1;

              return (
                <li key={stage.number} className="relative flex pb-8 last:pb-0">
                  <Link
                    href={`/mitglieder/stufe/${ordinal}`}
                    className={`group flex flex-1 gap-5 rounded-2xl transition-all ${
                      isCurrent
                        ? "border border-brand-300/60 bg-white p-4 shadow-card -my-1"
                        : "p-1 hover:opacity-80"
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-medium ${
                        isDone
                          ? "bg-gradient-to-br from-leaf-500 to-teal-500 text-navy-950"
                          : isCurrent
                            ? "bg-brand-500 text-white ring-4 ring-brand-500/25"
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
                          <span className="rounded-full bg-leaf-500/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-accent">
                            Erledigt
                          </span>
                        )}
                        {isCurrent && (
                          <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-brand-600">
                            Du bist hier
                          </span>
                        )}
                        {isNext && (
                          <span className="rounded-full bg-teal-500/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-teal-600">
                            Als Nächstes
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-mid">
                        {stage.subtitle}
                      </p>
                      {isCurrent && (
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
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
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500/15 to-teal-500/15 text-lg text-accent">
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
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500/15 to-teal-500/15 text-lg text-accent">
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

          {/* Einstieg in die große Wissensdatenbank (27 Kapitel) */}
          <Link
            href="/mitglieder/wissensdatenbank"
            className="group mt-8 flex flex-col items-start gap-3 rounded-2xl border border-accent/30 bg-white p-8 shadow-card transition-all hover:-translate-y-0.5 hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Wissensdatenbank · 27 Kapitel
              </span>
              <h3 className="font-display text-xl font-medium text-ink transition-colors group-hover:text-accent sm:text-2xl">
                Gehirn, Bewusstsein & Gedanken
              </h3>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
                Von Neuroanatomie über die großen Theorien des Bewusstseins bis zu
                Gewohnheiten, Emotionen und mentaler Selbstverteidigung – ehrlich
                eingeordnet, mit Evidenz und Glossar.
              </p>
            </div>
            <ArrowRight className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </Link>

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
