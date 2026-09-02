import type { ReactNode } from "react";
import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight, Check } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import {
  farbGruppen,
  farbWelten,
  logos,
  vorlagenBestand,
  bestandKennzahlen,
  tuerkisStatus,
} from "@/lib/marken-uebersicht";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Marken-Übersicht",
  robots: { index: false, follow: false },
};

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1 text-[0.78rem] font-medium text-ink-mid">
      {children}
    </span>
  );
}

/** Kleine schematische Vorschau einer Farbwelt (kein Screenshot – aus echten
 *  Marken-Tokens gebaut), damit Creme, Dunkel und Türkis vergleichbar sind. */
function WeltPanel({
  variante,
}: {
  variante: keyof typeof farbWelten;
}) {
  const w = farbWelten[variante];
  const istTuerkis = variante === "tuerkis" || variante === "tuerkisHell";
  const emblem = istTuerkis ? "/logo-brain-tuerkis.png" : "/logo-brain-gold.png";
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 shadow-card"
      style={{ background: w.grund }}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={emblem}
          alt=""
          className="h-16 w-auto"
        />
        {/* Wortmarke wie im Website-Header (Logo.tsx): Versalien, Fraunces,
            zweite Zeile mit Flankier-Strichen. „Meister" im Welt-Akzent. */}
        <div className="flex flex-col items-center gap-1.5 leading-none">
          <div
            className="font-display text-lg font-normal uppercase tracking-[0.1em]"
            style={{ color: w.tinte }}
          >
            Werde <span style={{ color: w.akzent }}>Meister</span>
          </div>
          <div
            className="flex items-center gap-2 font-display text-[0.6rem] font-normal uppercase tracking-[0.24em]"
            style={{ color: w.tinte, opacity: 0.8 }}
          >
            <span className="h-px w-3 shrink-0" style={{ background: w.akzent }} aria-hidden />
            Deiner Gedanken
            <span className="h-px w-3 shrink-0" style={{ background: w.akzent }} aria-hidden />
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-between px-4 py-3 text-xs"
        style={{
          background: w.grund === "#f6f4ee" ? "#efece2" : "#0f1218",
          color: w.tinte,
        }}
      >
        <span className="flex items-center gap-2 font-semibold">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: w.akzent }}
          />
          {w.name}
        </span>
        <span style={{ opacity: 0.7 }}>{w.suffix}</span>
      </div>
    </div>
  );
}

export default async function MarkenUebersichtPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container className="mx-auto max-w-xl text-center">
          <Eyebrow>Marken-Übersicht</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Diese Seite braucht eine konfigurierte Supabase-Anbindung, um dich als
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
  if (!user) redirect("/login?redirect=/admin/marken-uebersicht");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const k = bestandKennzahlen;

  return (
    <>
      {/* Kopf */}
      <section className="grain relative overflow-hidden border-b border-ink/10 py-14 sm:py-20">
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
          <Eyebrow>Marken-Übersicht</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Alle Logos, Farben &amp; <em className="accent">Vorlagen</em> auf einen Blick
          </h1>
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-mid">
            Das komplette Farbsystem, sämtliche Logos und der gesamte Vorlagen-Bestand –
            inklusive Lücken-Check über die vier Farbwelten (Grund{" "}
            <strong className="text-ink">Navy/Creme</strong> × Akzent{" "}
            <strong className="text-ink">Gold/Türkis</strong>). Damit du siehst,
            was existiert, in welcher Farbe – und was noch fehlt.
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill>
              <strong className="text-ink tabular-nums">{k.motive}</strong> Motive
            </Pill>
            <Pill>4 Farbwelten · Gold/Türkis × Navy/Creme</Pill>
            <Pill>
              <strong className="text-ink tabular-nums">{k.logoVarianten}</strong>{" "}
              Logo-Varianten
            </Pill>
            <Pill>
              <strong className="text-ink tabular-nums">{k.dateienGesamt}</strong>{" "}
              Bilddateien
            </Pill>
          </div>
        </Container>
      </section>

      {/* Drei Welten */}
      <section className="border-b border-ink/10 py-12 sm:py-14">
        <Container>
          <Eyebrow>Das Prinzip</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Vier Farbwelten, ein Motiv
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-mid">
            Zwei Achsen: <strong className="text-ink">Grund</strong> (Navy{" "}
            <code className="rounded bg-ink/5 px-1">#090b10</code> oder Creme{" "}
            <code className="rounded bg-ink/5 px-1">#f6f4ee</code>) ×{" "}
            <strong className="text-ink">Akzent</strong> (Gold-Emblem oder
            Türkis-Emblem mit Grün→Teal). Daraus vier Kombinationen –{" "}
            <code className="rounded bg-ink/5 px-1">dunkel</code>,{" "}
            <code className="rounded bg-ink/5 px-1">-hell</code>,{" "}
            <code className="rounded bg-ink/5 px-1">-tuerkis</code> und neu{" "}
            <code className="rounded bg-ink/5 px-1">-tuerkis-hell</code> (Creme +
            Türkis-Gehirn).
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <WeltPanel variante="dunkel" />
            <WeltPanel variante="hell" />
            <WeltPanel variante="tuerkis" />
            <WeltPanel variante="tuerkisHell" />
          </div>
          {!tuerkisStatus.gerendert && (
            <div className="mt-4 rounded-2xl border-l-[3px] border-teal-500 bg-surface-2 p-4 text-sm leading-relaxed text-ink-mid">
              <strong className="text-ink">Türkis ist neu:</strong> in allen
              Marketing-Generatoren angelegt (Türkis-Gehirn statt Gold, Grün→Teal-Akzente)
              – in zwei Grundvarianten{" "}
              <code className="rounded bg-ink/5 px-1">-tuerkis</code> (Navy) und{" "}
              <code className="rounded bg-ink/5 px-1">-tuerkis-hell</code> (Creme). Die
              Dateien entstehen beim nächsten Rendern – siehe „Für Entwickler" unten. Die
              schematischen Panels hier sind aus echten Marken-Tokens gebaut.
            </div>
          )}
        </Container>
      </section>

      {/* Farbsystem */}
      <section className="border-b border-ink/10 py-12 sm:py-14">
        <Container>
          <Eyebrow>Farbsystem</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Alle Marken-Farben mit Hex &amp; Rolle
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-mid">
            Quelle der Wahrheit:{" "}
            <code className="rounded bg-ink/5 px-1">src/app/globals.css</code>. Türkis
            (Teal) und Gold tragen die Marke; die dunkle und helle Grundfläche plus die
            Türkis-Akzente bilden die drei Welten.
          </p>
          <div className="mt-8 flex flex-col gap-9">
            {farbGruppen.map((g) => (
              <div key={g.titel}>
                <h3 className="text-base font-semibold text-ink">{g.titel}</h3>
                <p className="mt-0.5 max-w-2xl text-sm text-ink-mid">{g.beschreibung}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {g.swatches.map((s) => (
                    <div key={s.token} className="flex flex-col gap-2">
                      <div
                        className="h-16 rounded-xl border border-ink/10"
                        style={{ background: s.hex }}
                      />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[0.82rem] font-bold tabular-nums text-ink">
                          {s.hex}
                        </span>
                        <span className="font-mono text-[0.72rem] font-semibold text-teal-700">
                          {s.token}
                        </span>
                        <span className="text-[0.72rem] text-ink-mid">{s.rolle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Logos */}
      <section className="border-b border-ink/10 py-12 sm:py-14">
        <Container>
          <Eyebrow>Logos</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Sämtliche Logos – auf Creme und auf Dunkel
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-mid">
            Jedes Logo einmal auf hellem und einmal auf dunklem Grund, damit die Wirkung
            in beiden Welten direkt vergleichbar ist.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {logos.map((l) => (
              <figure
                key={l.datei}
                className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card"
              >
                <div className="grid grid-cols-2">
                  <div
                    className="flex aspect-square items-center justify-center p-[16%]"
                    style={{ background: "#f6f4ee" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={l.src}
                      alt={`${l.datei} auf Creme`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div
                    className="flex aspect-square items-center justify-center p-[16%]"
                    style={{ background: "#090b10" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={l.src}
                      alt={`${l.datei} auf Dunkel`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
                <figcaption className="flex flex-col gap-1 border-t border-ink/10 p-3.5">
                  <code className="break-all text-[0.76rem] font-semibold text-ink">
                    {l.datei}
                  </code>
                  <span className="text-[0.78rem] text-ink-mid">{l.verwendung}</span>
                  {l.hinweis && (
                    <span className="mt-0.5 text-[0.74rem] font-medium text-gold-700">
                      {l.hinweis}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Bestand & Lücken-Check */}
      <section className="py-12 sm:py-14">
        <Container>
          <Eyebrow>Vorlagen-Bestand &amp; Lücken-Check</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Was existiert – und wo eine Farbwelt fehlt
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-mid">
            Gezählt aus{" "}
            <code className="rounded bg-ink/5 px-1">docs/marketing/</code>. „Motiv" = ein
            Sujet in einem Format; die Spalten zeigen, in wie vielen Motiven die jeweilige
            Farbwelt vorliegt. <strong className="text-ink">Dunkel</strong> und{" "}
            <strong className="text-ink">Creme</strong> sind vollständig paarig;{" "}
            <strong className="text-ink">Türkis</strong> ist neu angelegt und wird beim
            nächsten Rendern befüllt.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
              <span className="font-display text-3xl font-medium text-teal-700 tabular-nums">
                {k.motive}
              </span>
              <span className="text-sm font-medium text-ink">Motive gesamt</span>
              <span className="text-xs text-ink-muted">alle Familien &amp; Formate</span>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
              <span className="font-display text-3xl font-medium text-teal-700">
                100&nbsp;%
              </span>
              <span className="text-sm font-medium text-ink">paarig vorhanden</span>
              <span className="text-xs text-ink-muted">Creme ↔ Dunkel</span>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
              <span className="font-display text-3xl font-medium text-accent tabular-nums">
                {k.neutraleVorlagen}
              </span>
              <span className="text-sm font-medium text-ink">neutrale Vorlagen</span>
              <span className="text-xs text-ink-muted">Hilfslinien &amp; Hintergründe</span>
            </div>
            <div className="flex flex-col gap-1 rounded-2xl border border-teal-500/40 bg-white p-5 shadow-card">
              <span className="font-display text-3xl font-medium text-teal-600 tabular-nums">
                +{tuerkisStatus.erwarteteMotive}
              </span>
              <span className="text-sm font-medium text-ink">Türkis · neu</span>
              <span className="text-xs text-ink-muted">
                in Generatoren angelegt · nach Render
              </span>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 shadow-card">
            <table className="w-full min-w-[520px] border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-surface-2 text-left">
                  <th className="px-4 py-3 text-[0.7rem] font-bold uppercase tracking-wide text-ink-muted">
                    Motiv-Familie
                  </th>
                  <th className="px-4 py-3 text-right text-[0.7rem] font-bold uppercase tracking-wide text-ink-muted">
                    Motive
                  </th>
                  <th className="px-4 py-3 text-right text-[0.7rem] font-bold uppercase tracking-wide text-ink-muted">
                    Creme
                  </th>
                  <th className="px-4 py-3 text-right text-[0.7rem] font-bold uppercase tracking-wide text-ink-muted">
                    Dunkel
                  </th>
                  <th className="px-4 py-3 text-right text-[0.7rem] font-bold uppercase tracking-wide text-teal-700">
                    Türkis
                  </th>
                  <th className="px-4 py-3 text-[0.7rem] font-bold uppercase tracking-wide text-ink-muted">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {vorlagenBestand.map((r) => {
                  const paarig = r.creme === r.motive && r.dunkel === r.motive;
                  return (
                    <tr key={r.familie} className="border-t border-ink/5">
                      <td className="px-4 py-2.5 font-medium text-ink">{r.familie}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-ink-mid">
                        {r.motive}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-ink-mid">
                        {r.creme}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-ink-mid">
                        {r.dunkel}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-teal-700">
                        {tuerkisStatus.gerendert ? r.motive : "neu"}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1 text-[0.82rem] font-semibold text-teal-700">
                          <Check className="h-3.5 w-3.5" />
                          {paarig ? "paarig" : "prüfen"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-ink/10 bg-surface-2 font-bold text-ink">
                  <td className="px-4 py-3">Gesamt</td>
                  <td className="px-4 py-3 text-right tabular-nums">{k.motive}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{k.creme}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{k.dunkel}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-teal-700">
                    {tuerkisStatus.gerendert ? k.motive : "neu"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[0.82rem] font-semibold text-teal-700">
                      <Check className="h-3.5 w-3.5" />
                      Dunkel + Creme paarig
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border-l-[3px] border-teal-500 bg-surface-2 p-4 text-sm leading-relaxed text-ink-mid">
            <strong className="text-ink">Ergebnis:</strong> Dunkel/Gold und Creme/Hell
            sind vollständig – jedes der {k.motive} Motive liegt in beiden vor.{" "}
            <strong className="text-ink">Türkis/Teal ist neu</strong> in allen
            Generatoren angelegt und liefert nach dem Rendern dieselben{" "}
            {tuerkisStatus.erwarteteMotive} Motive – in zwei Grundvarianten{" "}
            <code className="rounded bg-ink/5 px-1">-tuerkis</code> (Navy) und{" "}
            <code className="rounded bg-ink/5 px-1">-tuerkis-hell</code> (Creme). Einzige bewusste
            Nicht-Paarung bleibt das rohe Greenscreen-Porträt{" "}
            <code className="rounded bg-ink/5 px-1">
              assets/portrait-greenscreen-20260616.jpg
            </code>{" "}
            – eine Bildquelle, kein Template.
          </div>

          <details className="mt-8 rounded-2xl border border-ink/10 bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold text-ink">
              Für Entwickler: Türkis rendern &amp; Daten aktualisieren
            </summary>
            <p className="mt-3 text-sm text-ink-mid">
              Die drei Farbwelten (dunkel/hell/tuerkis) sind in allen Marketing-Generatoren
              angelegt. Zum Erzeugen alle Skripte laufen lassen (erzeugt Dunkel, Creme{" "}
              <em>und</em> Türkis):
            </p>
            <code className="mt-2 block overflow-x-auto rounded-lg bg-ink px-3 py-2 font-mono text-[0.82rem] text-white">
              node docs/marketing/brand-assets.mjs<br />
              node tools/marketing/content-overlays.mjs<br />
              node tools/marketing/story-overlays.mjs<br />
              node tools/marketing/story-carousels.mjs<br />
              node tools/marketing/whatsapp-mitgliedschaft.mjs<br />
              npm run vorlagen:galerie
            </code>
            <p className="mt-3 text-sm text-ink-mid">
              Nur eine Welt rendern (<code className="rounded bg-ink/5 px-1">THEME</code> ∈{" "}
              <code className="rounded bg-ink/5 px-1">dunkel|hell|tuerkis|tuerkis-hell</code>):{" "}
              <code className="rounded bg-ink/5 px-1">
                THEME=tuerkis-hell node docs/marketing/brand-assets.mjs
              </code>
              . Farben stehen in{" "}
              <code className="rounded bg-ink/5 px-1">src/app/globals.css</code>, die Zahlen
              in{" "}
              <code className="rounded bg-ink/5 px-1">src/lib/marken-uebersicht.ts</code>{" "}
              (dort nach dem Rendern{" "}
              <code className="rounded bg-ink/5 px-1">tuerkisStatus.gerendert</code> auf{" "}
              <code className="rounded bg-ink/5 px-1">true</code> setzen).
            </p>
            <p className="mt-3 text-sm text-ink-mid">
              Die komplette Galerie aller Vorlagen zum Ansehen &amp; Herunterladen liegt
              unter{" "}
              <Link
                href="/admin/vorlagen"
                className="font-semibold text-teal-700 hover:underline"
              >
                /admin/vorlagen
              </Link>
              .
            </p>
          </details>
        </Container>
      </section>
    </>
  );
}
