import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Play } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
} from "@/lib/supabase/config";
import {
  getTestProfile,
  getCompletedStages,
} from "@/app/mitglieder/actions";
import {
  buildGedankenprofil,
  type StageLevel,
} from "@/lib/gedankenprofil";
import {
  isReadingConfigured,
  getLatestReading,
} from "@/app/mitglieder/reading-actions";
import { ReadingPanel } from "@/components/members/ReadingPanel";
import { isBegleiterConfigured } from "@/app/mitglieder/begleiter/actions";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mein Gedankenprofil",
  robots: { index: false, follow: false },
};

const levelLabel: Record<StageLevel, string> = {
  verankert: "Verankert",
  "im-aufbau": "Im Aufbau",
  entwicklungsraum: "Entwicklungsraum",
};

const levelBarClass: Record<StageLevel, string> = {
  verankert: "bg-gradient-to-r from-leaf-500 to-teal-500",
  "im-aufbau": "bg-gradient-to-r from-teal-500/70 to-teal-500/90",
  entwicklungsraum: "bg-ink/25",
};

export default async function GedankenprofilPage() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (REQUIRE_MEMBER_LOGIN && !user) {
      redirect("/login?redirect=/mitglieder/gedankenprofil");
    }
  }

  const [{ startStage, scores }, completedKeys] = await Promise.all([
    getTestProfile(),
    getCompletedStages(),
  ]);

  // Fortschritts-Schlüssel ("01" … "07") → Stufen-Nummern (1 … 7)
  const completedNumbers = completedKeys
    .map((k) => Number(k))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 7);

  const profil = buildGedankenprofil({
    startStage,
    scores,
    completedNumbers,
  });

  // KI-Reading nur anbieten, wenn serverseitig konfiguriert und ein Test vorliegt.
  const readingConfigured = await isReadingConfigured();
  // Der Begleiter kennt dieses Profil – deshalb hier der direkte Weg hin.
  const begleiterVerfuegbar = await isBegleiterConfigured();
  const initialReading =
    readingConfigured && profil.hasTest ? await getLatestReading() : null;

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
          <Eyebrow>Dein Gedankenprofil</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Mein <em className="accent">Gedankenprofil</em>
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            So verteilen sich deine sieben Stufen aus dem Bewusstseinstest – und
            wo es sich lohnt, noch einmal dranzugehen. Ein ehrlicher Spiegel, der
            mit jedem neuen Test schärfer wird.
          </p>
          {profil.hasTest && profil.summary && (
            <p className="max-w-xl rounded-2xl border border-accent/25 bg-white px-6 py-4 text-[1.02rem] leading-relaxed text-ink-soft/90 shadow-card">
              {profil.summary}
            </p>
          )}
        </Container>
      </section>

      {/* Kein Test vorhanden → Einladung */}
      {!profil.hasTest ? (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto flex max-w-xl flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
              <h2 className="font-display text-xl font-medium text-ink">
                Noch kein Profil
              </h2>
              <p className="text-[1.02rem] leading-relaxed text-ink-mid">
                {profil.invite}
              </p>
              <Button href="/bewusstseinstest" variant="accent">
                Bewusstseinstest starten
                <ArrowRight />
              </Button>
            </div>
          </Container>
        </section>
      ) : (
        <>
          {/* Profil über alle 7 Stufen */}
          <section className="py-14 sm:py-16">
            <Container>
              <div className="mx-auto max-w-2xl">
                <h2 className="font-display text-2xl font-medium text-ink">
                  Deine 7 Stufen im Profil
                </h2>
                <p className="mt-2 text-[1rem] leading-relaxed text-ink-mid">
                  Der Balken zeigt, wie ausgeprägt jede Stufe laut deiner
                  Selbsteinschätzung gerade ist. Ein Haken bedeutet: von dir als
                  abgeschlossen markiert.
                </p>

                <ul className="mt-8 flex flex-col gap-4">
                  {profil.profile.map((p) => {
                    const isFocus = p.nr === profil.focusStage;
                    return (
                      <li
                        key={p.nr}
                        className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-5 shadow-card"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "w-6 shrink-0 text-right font-display text-lg italic",
                              isFocus ? "text-accent" : "text-ink-muted",
                            )}
                          >
                            {p.nr}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Link
                                href={`/mitglieder/stufe/${p.nr}`}
                                className="font-medium text-ink transition-colors hover:text-accent"
                              >
                                {p.name}
                              </Link>
                              {isFocus && (
                                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-accent">
                                  Schwerpunkt
                                </span>
                              )}
                              {p.done && (
                                <span
                                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500 to-teal-500 text-[0.6rem] text-navy-950"
                                  title="Abgeschlossen"
                                >
                                  <Check />
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-ink-muted">
                              {p.tagline}
                            </span>
                          </div>
                          <div className="flex shrink-0 flex-col items-end">
                            <span className="font-display text-lg font-medium text-ink">
                              {p.pct}%
                            </span>
                            <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-ink-muted">
                              {levelLabel[p.level]}
                            </span>
                          </div>
                        </div>
                        <span className="relative h-2.5 w-full overflow-hidden rounded-full bg-ink/[0.06]">
                          <span
                            className={cn(
                              "absolute inset-y-0 left-0 rounded-full",
                              levelBarClass[p.level],
                            )}
                            style={{ width: `${p.pct}%` }}
                          />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Container>
          </section>

          {/* Bedarfsanalyse – wo noch dranzugehen ist */}
          <section className="border-t border-ink/10 bg-white/60 py-14 sm:py-20">
            <Container>
              <div className="mx-auto max-w-2xl">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  Bedarfsanalyse
                </span>
                <h2 className="mt-1 font-display text-2xl font-medium text-ink">
                  Wo noch Bedarf ist
                </h2>
                <p className="mt-2 text-[1rem] leading-relaxed text-ink-mid">
                  {profil.bedarf.length > 0
                    ? "Diese Stufen laden dich gerade am meisten ein, noch einmal dranzugehen – priorisiert nach dem, was dein Profil zeigt."
                    : "Gerade zeigt sich kein dringender Bedarf. Ein guter Moment, das Erreichte in der täglichen Praxis zu vertiefen und den Test in ein paar Wochen zu wiederholen."}
                </p>

                {profil.bedarf.length > 0 && (
                  <ol className="mt-8 flex flex-col gap-5">
                    {profil.bedarf.map((b, i) => (
                      <li
                        key={b.nr}
                        className="flex flex-col gap-3 rounded-2xl border border-accent/25 bg-white p-6 shadow-card sm:p-7"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-sm italic text-accent">
                            {i + 1}
                          </span>
                          <div className="flex flex-col gap-1">
                            <h3 className="font-display text-xl font-medium text-ink">
                              Stufe {b.nr} – {b.name}
                            </h3>
                            <p className="text-sm font-medium uppercase tracking-wider text-ink-muted">
                              {b.tagline}
                            </p>
                          </div>
                        </div>

                        <p className="leading-relaxed text-ink-soft/90">
                          {b.reason}
                        </p>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-accent">
                            Dein nächster Schritt
                          </span>
                          <p className="leading-relaxed text-ink-soft/90">
                            {b.suggestion}
                          </p>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-3">
                          <Button href={b.href} variant="accent">
                            Zu Stufe {b.nr}
                            <ArrowRight />
                          </Button>
                          {b.practice && (
                            <Link
                              href={`/mitglieder/praxis/${b.practice.slug}`}
                              className="inline-flex items-center gap-2 rounded-2xl border border-ink/20 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent sm:rounded-full"
                            >
                              <Play />
                              Passende Praxis: {b.practice.title}
                            </Link>
                          )}
                          {b.deepDive && (
                            <Link
                              href={`/mitglieder/wissen/${b.deepDive.slug}`}
                              className="inline-flex items-center gap-2 rounded-2xl border border-ink/20 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-accent/40 hover:text-accent sm:rounded-full"
                            >
                              Vertiefung: {b.deepDive.title}
                              <ArrowRight />
                            </Link>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/bewusstseinstest"
                    className="text-sm font-medium text-accent underline-offset-2 hover:underline"
                  >
                    Test erneut machen
                  </Link>
                  <span className="text-ink-muted">·</span>
                  <Link
                    href="/mitglieder/journal"
                    className="text-sm font-medium text-accent underline-offset-2 hover:underline"
                  >
                    Zu deinem Journal
                  </Link>
                </div>

                <p className="mt-8 text-xs leading-relaxed text-ink-muted">
                  Dieses Profil fasst ausschließlich deine eigenen Antworten aus
                  dem Bewusstseinstest und deinen markierten Fortschritt zusammen
                  – keine Bewertung, keine Vorhersage. Es wächst mit dem, was du
                  einbringst.
                </p>
              </div>
            </Container>
          </section>

          {/* Persönliches KI-Reading – nur auf ausdrückliche Freigabe */}
          {readingConfigured && (
            <section className="border-t border-ink/10 py-14 sm:py-20">
              <Container>
                <div className="mx-auto max-w-2xl">
                  <ReadingPanel initialReading={initialReading} />
                </div>
              </Container>
            </section>
          )}

          {begleiterVerfuegbar && (
            <section className="border-t border-ink/10 py-12 sm:py-16">
              <Container>
                <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-white p-7 shadow-card sm:p-8">
                  <h2 className="font-display text-xl font-medium text-ink">
                    Fragen zu deinem Profil?
                  </h2>
                  <p className="text-[1.02rem] leading-relaxed text-ink-mid">
                    Dein Begleiter kennt diese Auswertung. Frag ihn, was die
                    Werte für deinen Alltag bedeuten – und welcher nächste
                    Schritt gerade zu dir passt.
                  </p>
                  <Button href="/mitglieder/begleiter" variant="secondary">
                    Zum Begleiter
                    <ArrowRight />
                  </Button>
                </div>
              </Container>
            </section>
          )}
        </>
      )}
    </>
  );
}
