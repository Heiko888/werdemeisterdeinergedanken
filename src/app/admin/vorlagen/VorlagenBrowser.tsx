"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight, Close, Download, Play } from "@/components/ui/Icon";
import type { VorlagenAsset } from "@/lib/vorlagen-assets";

export type PdfItem = { titel: string; href: string; gruppe: string };

type Props = {
  social: VorlagenAsset[];
  reels: VorlagenAsset[];
  carousels: VorlagenAsset[];
  workshop: VorlagenAsset[];
  pdfs: PdfItem[];
};

type Kategorie = "alle" | "social" | "reels" | "carousel" | "pdf" | "workshop";

function groupBy<T>(items: T[], key: (t: T) => string): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const k = key(it);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(it);
  }
  return [...map.entries()];
}

// --- Karten -----------------------------------------------------------------

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
        <CaptionList a={a} />
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

function CaptionBox({
  caption,
  label = "Caption",
}: {
  caption: string;
  label?: string;
}) {
  const [kopiert, setKopiert] = useState(false);
  return (
    <div className="mt-1 rounded-lg border border-ink/10 bg-ink/[0.02] p-2.5">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-accent">
          {label}
        </span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(caption).then(
              () => {
                setKopiert(true);
                setTimeout(() => setKopiert(false), 1800);
              },
              () => {},
            );
          }}
          className="inline-flex items-center gap-1 rounded-md border border-ink/15 px-2 py-1 text-[0.7rem] font-medium text-ink-mid transition-colors hover:border-accent/40 hover:text-accent"
        >
          {kopiert ? "Kopiert ✓" : "Kopieren"}
        </button>
      </div>
      <p className="max-h-24 overflow-y-auto whitespace-pre-line text-[0.72rem] leading-relaxed text-ink-mid [scrollbar-width:thin]">
        {caption}
      </p>
    </div>
  );
}

/** Zeigt entweder eine einzelne Caption oder mehrere Varianten (je eigener Button). */
function CaptionList({ a }: { a: VorlagenAsset }) {
  if (a.captions && a.captions.length > 0) {
    return (
      <div className="flex flex-col gap-1.5">
        {a.captions.map((c) => (
          <CaptionBox
            key={c.label}
            label={c.titel ? `${c.label} · „${c.titel}“` : c.label}
            caption={c.text}
          />
        ))}
      </div>
    );
  }
  if (a.caption) return <CaptionBox caption={a.caption} />;
  return null;
}

function CarouselKarte({ a }: { a: VorlagenAsset }) {
  const slides =
    a.slidePaths && a.slidePaths.length > 0
      ? a.slidePaths
      : a.thumb
        ? [a.thumb]
        : [];
  return (
    <figure className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
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
        <CaptionList a={a} />
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

// --- Filter-Leiste ----------------------------------------------------------

function Chip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-ink/10 bg-white text-ink hover:border-accent/40 hover:text-accent"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
          active ? "bg-white/20 text-white" : "bg-ink/5 text-ink-mid"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// --- Haupt-Komponente -------------------------------------------------------

export function VorlagenBrowser({ social, reels, carousels, workshop, pdfs }: Props) {
  const [query, setQuery] = useState("");
  const [kat, setKat] = useState<Kategorie>("alle");

  const q = query.trim().toLowerCase();

  const gefiltert = useMemo(() => {
    const matchA = (a: VorlagenAsset) =>
      !q || `${a.titel} ${a.unterKategorie}`.toLowerCase().includes(q);
    const matchP = (p: PdfItem) =>
      !q || `${p.titel} ${p.gruppe}`.toLowerCase().includes(q);
    return {
      social: social.filter(matchA),
      reels: reels.filter(matchA),
      carousel: carousels.filter(matchA),
      workshop: workshop.filter(matchA),
      pdf: pdfs.filter(matchP),
    };
  }, [q, social, reels, carousels, workshop, pdfs]);

  const counts = {
    social: gefiltert.social.length,
    reels: gefiltert.reels.length,
    carousel: gefiltert.carousel.length,
    pdf: gefiltert.pdf.length,
    workshop: gefiltert.workshop.length,
  };
  const total =
    counts.social + counts.reels + counts.carousel + counts.pdf + counts.workshop;

  const zeige = (k: Exclude<Kategorie, "alle">) => kat === "alle" || kat === k;
  const sichtbar =
    (zeige("social") ? counts.social : 0) +
    (zeige("reels") ? counts.reels : 0) +
    (zeige("carousel") ? counts.carousel : 0) +
    (zeige("pdf") ? counts.pdf : 0) +
    (zeige("workshop") ? counts.workshop : 0);

  return (
    <>
      {/* Sticky Such- & Filterleiste (unter dem globalen Header) */}
      <div className="sticky top-[4.5rem] z-40 border-b border-ink/10 bg-white/85 backdrop-blur">
        <Container className="flex flex-col gap-3 py-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path
                  d="m20 20-3-3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Vorlagen durchsuchen … (z. B. Zitat, Stufe 3, Instagram)"
              aria-label="Vorlagen durchsuchen"
              className="w-full rounded-xl border border-ink/15 bg-white py-3 pl-11 pr-11 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink-muted focus:border-accent/50"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Suche leeren"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <Close className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip label="Alle" count={total} active={kat === "alle"} onClick={() => setKat("alle")} />
            <Chip label="Social-Grafiken" count={counts.social} active={kat === "social"} onClick={() => setKat("social")} />
            <Chip label="Reel-Cover" count={counts.reels} active={kat === "reels"} onClick={() => setKat("reels")} />
            <Chip label="Carousels" count={counts.carousel} active={kat === "carousel"} onClick={() => setKat("carousel")} />
            <Chip label="PDF-Dokumente" count={counts.pdf} active={kat === "pdf"} onClick={() => setKat("pdf")} />
            <Chip label="Workshop" count={counts.workshop} active={kat === "workshop"} onClick={() => setKat("workshop")} />
          </div>
        </Container>
      </div>

      {/* Keine Treffer */}
      {sichtbar === 0 && (
        <section className="py-20">
          <Container className="mx-auto max-w-lg text-center">
            <h2 className="text-xl font-medium text-ink">Keine Vorlagen gefunden</h2>
            <p className="mt-2 text-sm text-ink-mid">
              {q ? (
                <>
                  Für „<span className="font-medium text-ink">{query}</span>“ gibt es
                  keinen Treffer{kat !== "alle" ? " in dieser Kategorie" : ""}.
                </>
              ) : (
                "In dieser Kategorie ist nichts vorhanden."
              )}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setKat("alle");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white"
            >
              Filter zurücksetzen
            </button>
          </Container>
        </section>
      )}

      {/* Social-Grafiken */}
      {zeige("social") && counts.social > 0 && (
        <section id="social" className="scroll-mt-40 py-12 sm:py-14">
          <Container>
            <Eyebrow>Social-Grafiken</Eyebrow>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink">
              Banner, Zitate & Fakten zum Posten
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {gefiltert.social.map((a) => (
                <BildKarte key={a.href} a={a} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Reel-Cover */}
      {zeige("reels") && counts.reels > 0 && (
        <section id="reels" className="scroll-mt-40 border-t border-ink/10 py-12 sm:py-14">
          <Container>
            <Eyebrow>Reel-Cover</Eyebrow>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink">
              Titelbilder für deine Reels
            </h2>
            {groupBy(gefiltert.reels, (a) => a.unterKategorie).map(([thema, items]) => (
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
      )}

      {/* Carousels */}
      {zeige("carousel") && counts.carousel > 0 && (
        <section id="carousels" className="scroll-mt-40 border-t border-ink/10 py-12 sm:py-14">
          <Container>
            <Eyebrow>Carousels</Eyebrow>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink">
              Foliensequenzen zum Durchwischen
            </h2>
            {groupBy(gefiltert.carousel, (a) => a.unterKategorie).map(([serie, items]) => (
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
      )}

      {/* PDF-Dokumente */}
      {zeige("pdf") && counts.pdf > 0 && (
        <section id="pdf" className="scroll-mt-40 border-t border-ink/10 py-12 sm:py-14">
          <Container>
            <Eyebrow>PDF-Dokumente</Eyebrow>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink">
              Lektionen, Übungen & Vertiefungen
            </h2>
            <div className="mt-6 flex flex-col gap-8">
              {groupBy(gefiltert.pdf, (p) => p.gruppe).map(([gruppe, items]) => (
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
      )}

      {/* Workshop */}
      {zeige("workshop") && counts.workshop > 0 && (
        <section id="workshop" className="scroll-mt-40 border-t border-ink/10 py-12 sm:py-14">
          <Container>
            <Eyebrow>Workshop-Material</Eyebrow>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink">
              Präsentationen & Workbooks
            </h2>
            <div className="mt-6 flex flex-col gap-8">
              {groupBy(gefiltert.workshop, (a) => a.unterKategorie).map(([thema, items]) => (
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
      )}
    </>
  );
}
