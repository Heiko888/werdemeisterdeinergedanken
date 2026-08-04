import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight, Download, Play } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { stages } from "@/lib/content";
import { deepDives } from "@/lib/deep-dives";
import { vorlagenKatalog } from "@/lib/vorlagen";
import { vorlagenAssets, type VorlagenAsset } from "@/lib/vorlagen-assets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vorlagen",
  robots: { index: false, follow: false },
};

// --- PDF-Liste (aus bestehenden, geschützten Routen) ------------------------

type PdfItem = { titel: string; href: string; gruppe: string };

function buildPdfListe(): PdfItem[] {
  const items: PdfItem[] = [
    {
      titel: "Gratis-E-Book · Die 7 Stufen kompakt",
      href: "/Die-7-Stufen-kompakt.pdf",
      gruppe: "Grundlagen",
    },
    {
      titel: "Arbeitsheft · alle 7 Stufen",
      href: "/mitglieder/arbeitsheft",
      gruppe: "Grundlagen",
    },
  ];
  stages.forEach((s, i) => {
    const nr = i + 1;
    items.push({
      titel: `Stufe ${s.number} · ${s.title} – Lektion`,
      href: `/mitglieder/stufe/${nr}/lektion`,
      gruppe: "Stufen-Lektionen & Übungen",
    });
    items.push({
      titel: `Stufe ${s.number} · ${s.title} – Übungen`,
      href: `/mitglieder/stufe/${nr}/uebungen`,
      gruppe: "Stufen-Lektionen & Übungen",
    });
  });
  for (const d of deepDives) {
    items.push({
      titel: d.title,
      href: `/mitglieder/wissen/${d.slug}/lektion`,
      gruppe: "Vertiefungen",
    });
  }
  return items;
}

function groupBy<T>(items: T[], key: (t: T) => string): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const k = key(it);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(it);
  }
  return [...map.entries()];
}

// --- Bausteine --------------------------------------------------------------

function NavPill({ href, label, count }: { href: string; label: string; count: number }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
    >
      {label}
      <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs tabular-nums text-ink-mid">
        {count}
      </span>
    </a>
  );
}

function BildKarte({ a }: { a: VorlagenAsset }) {
  const hochformat = a.kategorie === "reels";
  return (
    <figure className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
      <a
        href={a.href}
        target="_blank"
        rel="noreferrer"
        className={`relative flex items-center justify-center overflow-hidden bg-ink/[0.03] ${
          hochformat ? "aspect-[9/16]" : "aspect-[4/3]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.thumb}
          alt={a.titel}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </a>
      <figcaption className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
            {a.unterKategorie}
          </span>
          <span className="text-sm font-medium leading-snug text-ink">{a.titel}</span>
        </div>
        <div className="mt-auto flex gap-2 pt-1">
          <a
            href={a.href}
            download
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            <Download className="h-3.5 w-3.5" />
            Herunterladen
          </a>
          <a
            href={a.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink-mid transition-colors hover:text-ink"
          >
            Ansehen
          </a>
        </div>
      </figcaption>
    </figure>
  );
}

function DateiKarte({ a }: { a: VorlagenAsset }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
            {a.unterKategorie}
          </span>
          <span className="text-sm font-medium leading-snug text-ink">{a.titel}</span>
        </div>
        <span className="shrink-0 rounded-md bg-ink/5 px-2 py-1 text-[0.7rem] font-semibold text-ink-mid">
          {a.format}
          {a.sizeMB ? ` · ${a.sizeMB} MB` : ""}
        </span>
      </div>
      <a
        href={a.href}
        download
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
      >
        <Download className="h-3.5 w-3.5" />
        Herunterladen
      </a>
    </div>
  );
}

function CarouselKarte({ a }: { a: VorlagenAsset }) {
  const slides = a.slidePaths && a.slidePaths.length > 0
    ? a.slidePaths
    : a.thumb
      ? [a.thumb]
      : [];
  return (
    <figure className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
      {/* Slide-Viewer: alle Slides einzeln, horizontal durchwischbar */}
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto p-2 [scrollbar-width:thin]">
        {slides.map((src, i) => (
          <a
            key={src}
            href={src}
            target="_blank"
            rel="noreferrer"
            className="relative flex aspect-[4/5] w-[86%] flex-none snap-start items-center justify-center overflow-hidden rounded-lg bg-ink/[0.03]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${a.titel} – Slide ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-contain"
            />
            <span className="absolute left-1.5 top-1.5 rounded-full bg-ink/70 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">
              {i + 1}/{slides.length}
            </span>
          </a>
        ))}
      </div>
      <figcaption className="flex flex-1 flex-col gap-2 border-t border-ink/5 p-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
            {a.unterKategorie}
          </span>
          <span className="text-sm font-medium leading-snug text-ink">{a.titel}</span>
        </div>
        <span className="text-[0.7rem] text-ink-muted">
          ← alle {a.slides} Slides durchwischen →
        </span>
        <a
          href={a.href}
          download
          className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          <Download className="h-3.5 w-3.5" />
          Alle Slides (ZIP{a.sizeMB ? `, ${a.sizeMB} MB` : ""})
        </a>
      </figcaption>
    </figure>
  );
}

function PdfKarte({ p }: { p: PdfItem }) {
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white p-4 shadow-sm transition-colors hover:border-accent/40"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Download className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium leading-snug text-ink">{p.titel}</span>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted" />
    </a>
  );
}

// --- Seite ------------------------------------------------------------------

export default async function VorlagenPage() {
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container className="mx-auto max-w-xl text-center">
          <Eyebrow>Vorlagen</Eyebrow>
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
  if (!user) redirect("/login?redirect=/admin/vorlagen");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const social = vorlagenAssets.filter((a) => a.kategorie === "social");
  const reels = vorlagenAssets.filter((a) => a.kategorie === "reels");
  const carousels = vorlagenAssets.filter((a) => a.kategorie === "carousel");
  const workshop = vorlagenAssets.filter((a) => a.kategorie === "workshop");
  const pdfs = buildPdfListe();

  const reelsGruppen = groupBy(reels, (a) => a.unterKategorie);
  const carouselsGruppen = groupBy(carousels, (a) => a.unterKategorie);
  const workshopGruppen = groupBy(workshop, (a) => a.unterKategorie);
  const pdfGruppen = groupBy(pdfs, (p) => p.gruppe);

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
          <Eyebrow>Vorlagen</Eyebrow>
          <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
            Deine <em className="accent">Vorlagen-Bibliothek</em>
          </h1>
          <p className="max-w-2xl text-[1.02rem] leading-relaxed text-ink-mid">
            Alle fertigen Vorlagen zum Ansehen und Herunterladen – Social-Grafiken,
            Reel-Cover, PDFs und Workshop-Material. Klick auf ein Bild, um es groß zu
            sehen, oder lade es direkt herunter.
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <NavPill href="#social" label="Social-Grafiken" count={social.length} />
            <NavPill href="#reels" label="Reel-Cover" count={reels.length} />
            <NavPill href="#carousels" label="Carousels" count={carousels.length} />
            <NavPill href="#pdf" label="PDF-Dokumente" count={pdfs.length} />
            <NavPill href="#workshop" label="Workshop" count={workshop.length} />
          </div>
        </Container>
      </section>

      {/* Social-Grafiken */}
      <section id="social" className="scroll-mt-8 py-12 sm:py-14">
        <Container>
          <Eyebrow>Social-Grafiken</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Banner, Zitate & Fakten zum Posten
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-mid">
            Fertige Grafiken für Instagram, Facebook, LinkedIn, YouTube & Co. Direkt
            herunterladen und posten.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {social.map((a) => (
              <BildKarte key={a.href} a={a} />
            ))}
          </div>
        </Container>
      </section>

      {/* Reel-Cover */}
      <section id="reels" className="scroll-mt-8 border-t border-ink/10 py-12 sm:py-14">
        <Container>
          <Eyebrow>Reel-Cover</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Titelbilder für deine Reels
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-mid">
            Hochformat (9:16) nach Thema sortiert – das Format, das du direkt als
            Reel-Cover verwendest.
          </p>
          {reelsGruppen.map(([thema, items]) => (
            <div key={thema} className="mt-8">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                <Play className="h-4 w-4 text-accent" />
                {thema}
                <span className="text-ink-muted/70">({items.length})</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {items.map((a) => (
                  <BildKarte key={a.href} a={a} />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Carousels */}
      <section id="carousels" className="scroll-mt-8 border-t border-ink/10 py-12 sm:py-14">
        <Container>
          <Eyebrow>Carousels</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Foliensequenzen zum Durchwischen
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-mid">
            Mehrseitige Bild-Strecken (4:5) für Instagram & LinkedIn. Ein Klick lädt
            alle Slides eines Carousels als ZIP – direkt hochladbar.
          </p>
          {carouselsGruppen.map(([serie, items]) => (
            <div key={serie} className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {serie} <span className="text-ink-muted/70">({items.length})</span>
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a) => (
                  <CarouselKarte key={a.href} a={a} />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* PDF-Dokumente */}
      <section id="pdf" className="scroll-mt-8 border-t border-ink/10 py-12 sm:py-14">
        <Container>
          <Eyebrow>PDF-Dokumente</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Lektionen, Übungen & Vertiefungen
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-mid">
            Die gestalteten PDFs aus dem Mitgliederbereich. Klick öffnet das PDF in
            einem neuen Tab.
          </p>
          <div className="mt-6 flex flex-col gap-8">
            {pdfGruppen.map(([gruppe, items]) => (
              <div key={gruppe}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  {gruppe} <span className="text-ink-muted/70">({items.length})</span>
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((p) => (
                    <PdfKarte key={p.href} p={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Workshop */}
      <section id="workshop" className="scroll-mt-8 border-t border-ink/10 py-12 sm:py-14">
        <Container>
          <Eyebrow>Workshop-Material</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink">
            Präsentationen & Workbooks
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-mid">
            Gebrandete PowerPoint-Vorlagen, Teilnehmer-Workbooks und Moderationspläne.
            Herunterladen, öffnen, Platzhalter in [Klammern] ersetzen.
          </p>
          <div className="mt-6 flex flex-col gap-8">
            {workshopGruppen.map(([thema, items]) => (
              <div key={thema}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                  {thema} <span className="text-ink-muted/70">({items.length})</span>
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((a) => (
                    <DateiKarte key={a.href} a={a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Für Entwickler: neu erzeugen (eingeklappt) */}
      <section className="border-t border-ink/10 py-12">
        <Container>
          <details className="mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold text-ink">
              Für Entwickler: Vorlagen neu erzeugen
            </summary>
            <p className="mt-3 text-sm text-ink-mid">
              Diese Galerie wird aus den Dateien in <code className="rounded bg-ink/5 px-1">docs/</code>{" "}
              aufbereitet. Nach Änderungen im Terminal ausführen:
            </p>
            <code className="mt-2 block overflow-x-auto rounded-lg bg-ink px-3 py-2 font-mono text-[0.82rem] text-white">
              npm run vorlagen:galerie
            </code>
            <p className="mt-4 text-sm text-ink-mid">
              Die einzelnen Vorlagen-Arten und ihre Quell-Befehle:
            </p>
            <ul className="mt-2 flex flex-col gap-2 text-sm text-ink-mid">
              {vorlagenKatalog.map((g) => (
                <li key={g.key}>
                  <span className="font-medium text-ink">{g.titel}</span> –{" "}
                  <code className="rounded bg-ink/5 px-1">{g.ordner}</code>
                  {g.schritte[0]?.command && (
                    <>
                      {" · "}
                      <code className="rounded bg-ink/5 px-1">
                        {g.schritte[0].command}
                      </code>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </details>
        </Container>
      </section>
    </>
  );
}
