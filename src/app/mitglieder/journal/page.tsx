import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  REQUIRE_MEMBER_LOGIN,
} from "@/lib/supabase/config";
import { stages } from "@/lib/content";
import {
  getJournalEntries,
  getCompletedStages,
  getStartStage,
  getTestHistory,
} from "@/app/mitglieder/actions";
import { resolveEntry, formatDate } from "@/lib/journal";
import { PrintButton } from "@/components/members/PrintButton";
import { TestCurve } from "@/components/members/TestCurve";
import { buildStandort } from "@/lib/standortbestimmung";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mein Journal",
  robots: { index: false, follow: false },
};

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <span className="font-display text-3xl font-medium text-accent">
        {value}
      </span>
      <span className="text-sm text-ink-mid">{label}</span>
    </div>
  );
}

export default async function JournalPage() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (REQUIRE_MEMBER_LOGIN && !user) {
      redirect("/login?redirect=/mitglieder/journal");
    }
  }

  const [entries, completed, startStage, testHistory] = await Promise.all([
    getJournalEntries(),
    getCompletedStages(),
    getStartStage(),
    getTestHistory(),
  ]);

  const resolved = entries
    .map((e) => ({ entry: e, ctx: resolveEntry(e.itemType, e.itemKey, e.ref) }))
    .filter((x): x is { entry: (typeof entries)[number]; ctx: NonNullable<ReturnType<typeof resolveEntry>> } => x.ctx !== null);

  const reflectionCount = entries.length;
  const completedCount = stages.filter((s) =>
    completed.includes(s.number),
  ).length;
  const lastDate = entries[0] ? formatDate(entries[0].updatedAt) : "–";
  const startStageData =
    startStage && startStage >= 1 && startStage <= stages.length
      ? stages[startStage - 1]
      : null;

  const standort = buildStandort({
    startStage,
    completedCount,
    entryTitles: resolved.map((r) => r.ctx.title),
    testHistory,
  });

  return (
    <>
      {/* Kopf + Cockpit */}
      <section className="grain relative overflow-hidden border-b border-ink/10 py-16 print:border-0 print:py-4 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 print:hidden"
          style={{
            background:
              APP_GLOW,
          }}
        />
        <Container className="flex flex-col items-start gap-5">
          {/* Nur beim Drucken sichtbar: Buch-Kopf */}
          <div className="hidden w-full flex-col gap-1 border-b border-ink/15 pb-4 print:flex">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
              Werde Meister deiner Gedanken
            </span>
            <span className="font-display text-2xl font-medium text-ink">
              Mein Journal
            </span>
          </div>
          <Link
            href="/mitglieder"
            className="inline-flex items-center gap-2 text-sm text-ink-mid transition-colors hover:text-ink print:hidden"
          >
            <ArrowRight className="rotate-180" />
            Mein Bereich
          </Link>
          <Eyebrow>Dein wachsendes Journal</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Mein <em className="accent">Journal</em>
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            Hier sammeln sich alle deine Reflexionen an einem Ort – aus den 7
            Stufen und den Vertiefungen. Ein persönlicher Spiegel, der mit jeder
            Frage, die du beantwortest, weiterwächst.
          </p>

          <div className="mt-2 grid w-full grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-4">
            <Stat value={String(reflectionCount)} label="Reflexionen" />
            <Stat value={`${completedCount} / 7`} label="Stufen abgeschlossen" />
            <Stat
              value={startStageData ? startStageData.number : "–"}
              label={
                startStageData
                  ? `Startstufe · ${startStageData.title}`
                  : "Startstufe (Test)"
              }
            />
            <Stat value={lastDate} label="Zuletzt geschrieben" />
          </div>

          {resolved.length > 0 && (
            <PrintButton className="mt-1 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-card transition-all hover:border-accent/40 hover:text-accent print:hidden" />
          )}
        </Container>
      </section>

      {/* Standortbestimmung – geerdete Spiegelung aus den eigenen Daten */}
      <section className="py-10 print:py-4">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border border-accent/30 bg-gradient-to-br from-leaf-500/[0.06] to-teal-500/[0.06] p-7 shadow-card sm:p-9">
            <div>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Deine Standortbestimmung
              </span>
              <h2 className="mt-1 font-display text-2xl font-medium text-ink">
                Wo du gerade stehst
              </h2>
            </div>

            {standort.hasData ? (
              <div className="flex flex-col gap-3">
                {standort.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 32)}
                    className="text-[1.02rem] leading-relaxed text-ink-soft/90"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-[1.02rem] leading-relaxed text-ink-mid">
                {standort.invite}
              </p>
            )}

            {standort.nextStep && (
              <Link
                href={standort.nextStep.href}
                className="group mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-ink/90 print:hidden"
              >
                {standort.nextStep.label}
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}

            <p className="text-xs text-ink-muted">
              Diese Standortbestimmung fasst ausschließlich deine eigenen
              Eingaben zusammen – keine Vorhersage. Sie wächst mit dem, was du
              einbringst.
            </p>
          </div>
        </Container>
      </section>

      {/* Wachstumskurve – Bewusstseinstest über die Zeit */}
      {testHistory.length >= 1 && (
        <section className="border-b border-ink/10 py-12 print:py-4">
          <Container>
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                    Deine Entwicklung
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-medium text-ink">
                    Wo du über die Zeit stehst
                  </h2>
                </div>
                <Link
                  href="/bewusstseinstest"
                  className="text-sm font-medium text-accent underline-offset-2 hover:underline print:hidden"
                >
                  Test erneut machen
                </Link>
              </div>
              <p className="mt-2 max-w-xl text-[1rem] leading-relaxed text-ink-mid">
                Deine Schwerpunkt-Stufe aus dem Bewusstseinstest (1–7).
                {testHistory.length === 1
                  ? " Wiederhole den Test in ein paar Wochen – dann wird hier deine Kurve sichtbar."
                  : " Die Kurve wächst mit jedem neuen Testergebnis."}
              </p>
              <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5 shadow-card print:shadow-none sm:p-7">
                <TestCurve points={testHistory} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Zeitverlauf der Reflexionen */}
      <section className="py-14 print:py-2 sm:py-20">
        <Container>
          {resolved.length === 0 ? (
            <div className="mx-auto flex max-w-xl flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
              <h2 className="font-display text-xl font-medium text-ink">
                Dein Journal ist noch leer
              </h2>
              <p className="text-[1.02rem] leading-relaxed text-ink-mid">
                Sobald du zu einer Reflexionsfrage in einer Stufe oder Vertiefung
                etwas schreibst, erscheint es hier – und dein Journal beginnt zu
                wachsen. Am besten fängst du mit der ersten Stufe an.
              </p>
              <Link
                href="/mitglieder/stufe/1"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-ink/90"
              >
                Mit Stufe 1 beginnen
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ) : (
            <ol className="mx-auto flex max-w-2xl flex-col gap-5">
              {resolved.map(({ entry, ctx }) => (
                <li key={`${entry.itemType}-${entry.itemKey}-${entry.ref}`}>
                  <article className="flex break-inside-avoid flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6 shadow-card print:shadow-none">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Link
                        href={ctx.href}
                        className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent"
                      >
                        {ctx.label} · {ctx.title}
                        <ArrowRight className="text-ink-muted transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <time className="text-xs text-ink-muted">
                        {formatDate(entry.updatedAt)}
                      </time>
                    </div>
                    {ctx.question && (
                      <p className="font-display text-[1.05rem] italic leading-snug text-ink">
                        {ctx.question}
                      </p>
                    )}
                    <p className="whitespace-pre-wrap text-[1rem] leading-relaxed text-ink-soft/90">
                      {entry.body}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </section>
    </>
  );
}
