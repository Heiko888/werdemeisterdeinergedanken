import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight, Check, Download } from "@/components/ui/Icon";
import { stages } from "@/lib/content";
import { getTestStage } from "@/lib/consciousness-test";
import { site } from "@/lib/site";

/**
 * Öffentliche Ergebnisseite je Stufe (Kampagnen-Check, Punkt 2).
 *
 * Ziel der Bestätigungsmail, der Tag-0-Mail der Verkaufsstrecke, der
 * Impuls-Links für Nicht-Mitglieder und des Ergebnisses im Test. Kein Login
 * nötig. Inhalt: Name + Kurzbeschreibung der Stufe (src/lib/content.ts),
 * „Was das bedeutet" (Auswertung aus src/lib/consciousness-test.ts), das
 * Gratis-Kapitel als Download (/api/stufe-kapitel/N) und genau EIN primärer
 * CTA (Mitgliedschaft ansehen – sie startet erst demnächst) plus sekundär das
 * Buch. Bewusst kein 1:1-Gespräch als Einstieg (docs/RECHTLICHE-PRODUKTABGRENZUNG.md).
 * Nicht indexieren: die Seite ist ein persönliches Ergebnis.
 */

type Params = { stufe: string };

const STUFEN = ["1", "2", "3", "4", "5", "6", "7"] as const;

function resolveStage(stufe: string) {
  if (!STUFEN.includes(stufe as (typeof STUFEN)[number])) return null;
  const nr = Number(stufe);
  const stage = stages[nr - 1];
  const test = getTestStage(nr);
  if (!stage || !test) return null;
  return { nr, stage, test };
}

export function generateStaticParams(): Params[] {
  return STUFEN.map((stufe) => ({ stufe }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { stufe } = await params;
  const resolved = resolveStage(stufe);
  if (!resolved) return { robots: { index: false, follow: false } };
  return {
    title: `Dein Ergebnis: Stufe ${resolved.nr} – ${resolved.stage.title}`,
    description: resolved.stage.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `${site.url}/bewusstseinstest/ergebnis/${resolved.nr}` },
  };
}

export default async function ErgebnisPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { stufe } = await params;
  const resolved = resolveStage(stufe);
  if (!resolved) notFound();
  const { nr, stage, test } = resolved;

  const bedeutung = [
    { label: "Woran du diese Stufe erkennst", text: stage.detail?.recognize ?? test.result.summary },
    { label: "Was dich hier festhält", text: stage.detail?.stuck ?? test.result.challenge },
    { label: "Was auf dieser Stufe entsteht", text: stage.detail?.skill ?? test.result.potential },
    { label: "Dein nächster Schritt", text: stage.detail?.next ?? test.result.nextStep },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Dein Ergebnis · Stufe ${nr} von 7`}
        title={
          <>
            Stufe {nr}: <em className="accent">{stage.title}</em>
          </>
        }
        intro={`${stage.subtitle}. ${stage.description}`}
      />

      <section className="bg-paper-aura grain-soft relative py-14 sm:py-20">
        <Container size="narrow" className="flex flex-col gap-12">
          {/* Was das bedeutet */}
          <Reveal>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <Eyebrow>Was das bedeutet</Eyebrow>
                <h2 className="font-display text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl">
                  Kein Etikett – ein <em className="accent">Standort</em>.
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-ink-mid">
                  {test.result.summary}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {bedeutung.map((block) => (
                  <div key={block.label} className="flex flex-col gap-1.5">
                    <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-accent">
                      {block.label}
                    </h3>
                    <p className="leading-relaxed text-ink-mid">{block.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Gratis-Kapitel */}
          <Reveal delay={80}>
            <Card tone="accent" className="flex flex-col gap-5 sm:p-8">
              <div className="flex flex-col gap-2">
                <Eyebrow>Dein Geschenk</Eyebrow>
                <h2 className="font-display text-2xl font-medium text-ink">
                  Das Kapitel zu Stufe {nr} – <em className="accent">gratis</em>
                </h2>
                <p className="max-w-xl leading-relaxed text-ink-mid">
                  Die komplette Lektion zu „{stage.title}“ aus dem Mitgliederbereich als PDF:
                  worum es auf dieser Stufe geht, was dich festhält und die erste Übung.
                  Ohne Login, einfach herunterladen.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={`/api/stufe-kapitel/${nr}`} variant="primary" size="lg" external>
                  <Download />
                  Kapitel herunterladen (PDF)
                </Button>
                <span className="flex items-center gap-2 text-sm text-ink-muted">
                  <Check className="text-accent" />
                  Lektion der Stufe, kostenlos
                </span>
              </div>
            </Card>
          </Reveal>

          {/* Nächster Schritt – genau ein primärer CTA */}
          <Reveal delay={140}>
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-ink/10 bg-white p-8 shadow-card">
              <Eyebrow>Der nächste Schritt</Eyebrow>
              <h2 className="font-display text-2xl font-medium text-ink">
                Von der Erkenntnis ins <em className="accent">Üben</em>.
              </h2>
              <p className="max-w-xl leading-relaxed text-ink-mid">
                {test.result.nextStep} Demnächst startet die digitale
                Mitgliederplattform: Videos, Wissen, Praxisimpulse und Reflexion
                zu allen sieben Stufen – eigenständig in deinem Tempo.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/mitgliedschaft" variant="accent" size="lg">
                  Mitgliedschaft ansehen
                  <ArrowRight />
                </Button>
                <Button href="/buch" variant="secondary" size="lg">
                  Das Buch
                </Button>
              </div>
              <p className="text-sm text-ink-muted">
                Dieses Ergebnis ist eine persönliche Selbsteinschätzung aus deinen
                eigenen Antworten – keine Diagnose und kein Leistungstest.
                Ergebnis nicht mehr stimmig?{" "}
                <a
                  href="/bewusstseinstest"
                  className="font-medium text-accent underline-offset-2 hover:underline"
                >
                  Test wiederholen
                </a>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
