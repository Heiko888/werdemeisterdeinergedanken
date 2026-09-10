"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { memberEyebrow } from "@/lib/uiClasses";
import {
  QUELLEN,
  QUELL_CODES,
  codesOf,
  TAETIGKEITEN,
  BIBLIOTHEK,
  ROMANE,
  ARTE_DOCS,
  ERGAENZENDE_THEMEN,
  RESERVOIR,
  RUNDEN,
  PFLEGE,
  MINIMAL_OUTPUT,
  QUELLENKARTE,
  type QuellCode,
} from "@/lib/bewusstseinsbibliothek";

/** Einheitliche Aufzählung im „–“-Stil des Original-Artifacts, aber mit Marken-Farben. */
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((t, i) => (
        <li key={i} className="relative pl-4 text-[0.95rem] leading-relaxed text-ink-mid">
          <span className="absolute left-0 text-ink-muted" aria-hidden>
            –
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
      {children}
    </p>
  );
}

/** Kleines Quellen-Kürzel (W/P/G/E/L) als Pille im Gold-Akzent. */
function CodeBadge({ code, label }: { code: string; label?: string }) {
  return (
    <span
      className="inline-flex items-center rounded-md border border-accent/40 bg-gold-500/10 px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-accent"
      title={QUELLEN[code as QuellCode]?.name}
    >
      {label ?? code}
    </span>
  );
}

export function BibliothekBrowser() {
  const [query, setQuery] = useState("");
  const [activeCodes, setActiveCodes] = useState<QuellCode[]>([]);

  const q = query.trim().toLowerCase();
  const hit = (text: string) => !q || text.toLowerCase().includes(q);

  const toggleCode = (c: QuellCode) =>
    setActiveCodes((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const bookDimmed = (tag: string) =>
    activeCodes.length > 0 && !codesOf(tag).some((c) => activeCodes.includes(c));

  // Suchtexte je Einheit – für Trefferzählung und Ausblenden.
  const unitTexts = useMemo(() => {
    const texts: string[] = [];
    TAETIGKEITEN.forEach((t) =>
      texts.push(
        [t.n, t.titel, ...t.gruppen.flatMap((g) => [g.sub ?? "", ...g.items])].join(" "),
      ),
    );
    BIBLIOTHEK.forEach((th) =>
      texts.push(
        [
          th.n,
          th.titel,
          th.sub ?? "",
          ...th.buecher.map((b) => `${b.autor} ${b.titel} ${b.tag}`),
          ...th.felder,
          th.kritisch ?? "",
        ].join(" "),
      ),
    );
    texts.push(["Literatur Romane", ...ROMANE.map((r) => `${r.autor} ${r.titel} ${r.thema}`)].join(" "));
    ARTE_DOCS.forEach((d) =>
      texts.push([d.titel, d.themen, ...(d.teile ?? []), ...(d.ableitungen ?? [])].join(" ")),
    );
    texts.push(["ergänzende ARTE-Themen", ...ERGAENZENDE_THEMEN].join(" "));
    RESERVOIR.forEach((c) => texts.push([c.n, c.titel, ...c.items].join(" ")));
    texts.push(["Quellenkarte", QUELLENKARTE, "Minimaler Output", ...MINIMAL_OUTPUT, "Qualitätsregel"].join(" "));
    RUNDEN.forEach((r) => texts.push([r.n, r.titel, ...r.items, r.ergebnis].join(" ")));
    texts.push(["Pflege der Sammlung", ...PFLEGE, "Schlussgedanke"].join(" "));
    return texts;
  }, []);

  const treffer = q ? unitTexts.filter(hit).length : unitTexts.length;

  const partHead = (roman: string, titel: string, lede?: string) =>
    !q && (
      <div className="mb-8 border-b-2 border-ink/80 pb-3">
        <span className="font-display text-sm italic text-ink-mid">Teil {roman}</span>
        <h2 className="mt-1 font-display text-2xl font-medium text-ink sm:text-3xl">
          {titel}
        </h2>
        {lede && <p className="mt-2 max-w-2xl text-ink-mid">{lede}</p>}
      </div>
    );

  return (
    <div className="flex flex-col gap-12">
      {/* Steuerleiste: Suche + Quellenfilter */}
      <div className="sticky top-2 z-10 flex flex-col gap-4 rounded-2xl border border-ink/10 bg-surface/95 p-4 shadow-card backdrop-blur sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Durchsuchen … Autor, Thema, Buch"
              autoComplete="off"
              aria-label="Bibliothek durchsuchen"
              className="w-full rounded-xl border border-ink/15 bg-paper py-2.5 pl-9 pr-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <span className="text-sm tabular-nums text-ink-muted">
            {q ? `${treffer} ${treffer === 1 ? "Abschnitt" : "Abschnitte"}` : `${unitTexts.length} Abschnitte`}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {QUELL_CODES.map((c) => {
            const active = activeCodes.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCode(c)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  active
                    ? "border-accent bg-accent text-surface"
                    : "border-ink/20 text-ink-mid hover:border-accent/50 hover:text-accent"
                }`}
                title={QUELLEN[c].desc}
              >
                <span className="font-mono">{c}</span> {QUELLEN[c].name}
              </button>
            );
          })}
          {activeCodes.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveCodes([])}
              className="text-xs text-ink-muted underline decoration-ink/30 underline-offset-2 hover:text-ink"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>
      </div>

      {q && treffer === 0 && (
        <p className="py-10 text-center text-ink-muted">
          Keine Treffer für „{query}“.
        </p>
      )}

      {/* Teil I – Tätigkeiten */}
      {partHead(
        "I",
        "Konkrete Tätigkeiten zur Bewusstseinserweiterung",
        "Bewusst keine Reflexionsfragen: Erfahrungen und Handlungen, die sich in den Alltag übertragen lassen.",
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {TAETIGKEITEN.map((t) => {
          const text = [t.n, t.titel, ...t.gruppen.flatMap((g) => [g.sub ?? "", ...g.items])].join(" ");
          if (!hit(text)) return null;
          return (
            <Card key={t.n} className="flex flex-col gap-4">
              <h3 className="font-display text-xl font-medium text-ink">
                {t.n}. {t.titel}
              </h3>
              {t.gruppen.map((g, gi) => (
                <div key={gi}>
                  {g.sub && (
                    <p className="mb-2 font-display text-[0.98rem] font-medium text-accent">
                      {g.sub}
                    </p>
                  )}
                  <Bullets items={g.items} />
                </div>
              ))}
            </Card>
          );
        })}
      </div>

      {/* Teil II – Bibliothek */}
      {partHead(
        "II",
        "Die Bewusstseinsbibliothek",
        "Dreizehn Themenfelder mit Buchempfehlungen, Contentfeldern und, wo nötig, kritischem Hinweis.",
      )}
      <div className="flex flex-col gap-6">
        {BIBLIOTHEK.map((th) => {
          const text = [
            th.n,
            th.titel,
            th.sub ?? "",
            ...th.buecher.map((b) => `${b.autor} ${b.titel} ${b.tag}`),
            ...th.felder,
            th.kritisch ?? "",
          ].join(" ");
          if (!hit(text)) return null;
          return (
            <Card key={th.n} className="flex flex-col gap-3">
              <h3 className="font-display text-xl font-medium text-ink">
                {th.n}. {th.titel}
              </h3>
              {th.sub && <p className="text-sm italic text-ink-muted">{th.sub}</p>}

              <Kicker>Empfohlene Bücher</Kicker>
              <ul className="flex flex-col gap-2">
                {th.buecher.map((b, bi) => {
                  const codes = codesOf(b.tag);
                  const rest = b.tag
                    .split(/[/,]/)
                    .map((s) => s.trim())
                    .filter((s) => s && !(QUELL_CODES as string[]).includes(s));
                  return (
                    <li
                      key={bi}
                      className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-xl border border-ink/10 bg-paper px-3 py-2 text-[0.95rem] transition-opacity ${
                        bookDimmed(b.tag) ? "opacity-30" : ""
                      }`}
                    >
                      <span className="font-semibold text-ink">{b.autor}</span>
                      <span className="text-ink-muted">–</span>
                      <span className="font-display italic text-ink">{b.titel}</span>
                      <span className="ml-auto inline-flex flex-wrap items-center gap-1">
                        {codes.map((c) => (
                          <CodeBadge key={c} code={c} />
                        ))}
                        {rest.map((r) => (
                          <span
                            key={r}
                            className="inline-flex items-center rounded-md border border-ink/20 px-1.5 py-0.5 text-[0.65rem] font-medium text-ink-muted"
                          >
                            {r}
                          </span>
                        ))}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Kicker>Mögliche Contentfelder</Kicker>
              <Bullets items={th.felder} />

              {th.kritisch && (
                <div className="mt-2 flex gap-3 rounded-xl border-l-2 border-gold-500 bg-gold-500/10 px-4 py-3">
                  <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-wide text-accent">
                    Kritischer&nbsp;Hinweis
                  </span>
                  <p className="text-[0.9rem] italic leading-relaxed text-ink-mid">
                    {th.kritisch}
                  </p>
                </div>
              )}
            </Card>
          );
        })}

        {/* 19 · Literatur */}
        {(() => {
          const text = ["Literatur Romane", ...ROMANE.map((r) => `${r.autor} ${r.titel} ${r.thema}`)].join(" ");
          if (!hit(text)) return null;
          return (
            <Card className="flex flex-col gap-3">
              <h3 className="font-display text-xl font-medium text-ink">
                19. Literatur als erlebter Perspektivwechsel
              </h3>
              <Kicker>Empfohlene Romane und Erzählungen</Kicker>
              <ul className="flex flex-col gap-2">
                {ROMANE.map((r, ri) => (
                  <li
                    key={ri}
                    className="flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-xl border border-ink/10 bg-paper px-3 py-2 text-[0.95rem]"
                  >
                    <span className="font-semibold text-ink">{r.autor}</span>
                    <span className="text-ink-muted">–</span>
                    <span className="font-display italic text-ink">{r.titel}</span>
                    <span className="ml-auto text-[0.8rem] text-ink-muted">{r.thema}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed text-ink-mid">
                Literatur ist kein bloßer Zusatz. Ein Sachbuch beschreibt eine fremde Perspektive;
                ein guter Roman lässt den Leser eine Zeit lang in ihr leben.
              </p>
            </Card>
          );
        })()}
      </div>

      {/* Teil III – ARTE */}
      {partHead(
        "III",
        "ARTE-Dokumentationen",
        "Verfügbarkeiten Stand 4. September 2026 – können sich ändern.",
      )}
      <div className="flex flex-col gap-4">
        {ARTE_DOCS.map((d, di) => {
          const text = [d.titel, d.themen, ...(d.teile ?? []), ...(d.ableitungen ?? [])].join(" ");
          if (!hit(text)) return null;
          return (
            <Card key={di} className="flex flex-col gap-2">
              <h3 className="font-display text-lg font-medium text-ink">{d.titel}</h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-[0.7rem] uppercase tracking-wide text-ink-muted">Link</dt>
                <dd>
                  <a
                    href={d.link}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                  >
                    {d.link}
                  </a>
                </dd>
                {d.format && (
                  <>
                    <dt className="text-[0.7rem] uppercase tracking-wide text-ink-muted">Format</dt>
                    <dd className="text-ink-mid">{d.format}</dd>
                  </>
                )}
                {d.laenge && (
                  <>
                    <dt className="text-[0.7rem] uppercase tracking-wide text-ink-muted">Länge</dt>
                    <dd className="text-ink-mid">{d.laenge}</dd>
                  </>
                )}
                {d.reihe && (
                  <>
                    <dt className="text-[0.7rem] uppercase tracking-wide text-ink-muted">Reihe</dt>
                    <dd className="text-ink-mid">{d.reihe}</dd>
                  </>
                )}
                <dt className="text-[0.7rem] uppercase tracking-wide text-ink-muted">Verfügbar</dt>
                <dd className="text-ink-mid">{d.verf ?? "siehe Reihe"}</dd>
              </dl>
              {d.teile && <Bullets items={d.teile} />}
              <p className="text-[0.9rem] text-ink-mid">
                <strong className="text-ink">Themen:</strong> {d.themen}
              </p>
              {d.ableitungen && (
                <>
                  <Kicker>Mögliche Ableitungen</Kicker>
                  <Bullets items={d.ableitungen} />
                </>
              )}
            </Card>
          );
        })}

        {(() => {
          const text = ["ergänzende ARTE-Themen", ...ERGAENZENDE_THEMEN].join(" ");
          if (!hit(text)) return null;
          return (
            <Card className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-medium text-ink">
                21. Geeignete ergänzende ARTE-Themen
              </h3>
              <p className="text-sm text-ink-mid">
                Besonders Folgen aus <em>42 – Die Antwort auf fast alles</em> sowie{" "}
                <em>Offene Ideen</em> sind interessant. Gesucht werden sollte regelmäßig nach:
              </p>
              <Bullets items={ERGAENZENDE_THEMEN} />
            </Card>
          );
        })()}
      </div>

      {/* Teil IV – Content-Reservoir */}
      {partHead("IV", "Content-Reservoir", "72 durchnummerierte Ansätze in neun Kategorien.")}
      <div className="grid gap-6 md:grid-cols-2">
        {RESERVOIR.map((c) => {
          const text = [c.n, c.titel, ...c.items].join(" ");
          if (!hit(text)) return null;
          return (
            <Card key={c.n} className="flex flex-col gap-2">
              <h3 className="font-display text-lg font-medium text-ink">
                {c.n}. {c.titel}
              </h3>
              <div className="flex flex-col">
                {c.items.map((it, i) => (
                  <div
                    key={i}
                    className="flex gap-3 border-b border-ink/5 py-1.5 text-[0.92rem] text-ink-mid last:border-0"
                  >
                    <span className="w-6 shrink-0 font-mono text-[0.8rem] font-semibold tabular-nums text-accent">
                      {c.start + i}
                    </span>
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Teil V – Content entwickeln */}
      {partHead("V", "Aus Quellen verwertbaren Content entwickeln")}
      {(() => {
        const text = ["Quellenkarte", QUELLENKARTE, "Minimaler Output", ...MINIMAL_OUTPUT, "Qualitätsregel"].join(" ");
        if (!hit(text)) return null;
        return (
          <div className="flex flex-col gap-6">
            <Card className="flex flex-col gap-3">
              <h3 className="font-display text-xl font-medium text-ink">
                31. Quellenkarte für jedes Buch oder jede Dokumentation
              </h3>
              <p className="text-sm text-ink-mid">
                Für jede bearbeitete Quelle wird eine eigene Karte angelegt:
              </p>
              <pre className="overflow-x-auto rounded-xl border border-ink/10 bg-paper p-4 font-mono text-[0.8rem] leading-relaxed text-ink-mid">
                {QUELLENKARTE}
              </pre>
            </Card>
            <Card className="flex flex-col gap-3">
              <h3 className="font-display text-xl font-medium text-ink">
                32. Minimaler Output pro Quelle
              </h3>
              <p className="text-sm text-ink-mid">
                Aus jedem gründlich bearbeiteten Buch oder jeder Dokumentation sollten mindestens
                entstehen:
              </p>
              <Bullets items={MINIMAL_OUTPUT} />
              <p className="text-sm text-ink-mid">
                Damit ergeben 30 sauber bearbeitete Quellen bereits weit über 150 eigenständige
                Contentansätze, ohne bloß fremde Inhalte nachzuerzählen.
              </p>
            </Card>
            <Card className="flex flex-col gap-3">
              <h3 className="font-display text-xl font-medium text-ink">33. Qualitätsregel</h3>
              <p className="text-sm text-ink-mid">
                Für größere Aussagen möglichst drei Ebenen miteinander verbinden:
              </p>
              <ol className="flex list-decimal flex-col gap-1 pl-5 text-[0.95rem] text-ink-mid">
                <li>
                  <strong className="text-ink">Forschung:</strong> Was wurde tatsächlich untersucht?
                </li>
                <li>
                  <strong className="text-ink">Philosophie:</strong> Welche Bedeutung und welche
                  Grenzen hat der Befund?
                </li>
                <li>
                  <strong className="text-ink">Erfahrung:</strong> Wie zeigt sich das Thema im
                  wirklichen Alltag?
                </li>
              </ol>
              <p className="text-sm text-ink-mid">
                Erst danach erfolgt die Zuspitzung für Marketing oder Social Media. Eine starke
                Headline darf vereinfachen; der zugrunde liegende Inhalt darf dadurch nicht falsch
                werden.
              </p>
            </Card>
          </div>
        );
      })()}

      {/* Teil VI – Bearbeitungsreihenfolge */}
      {partHead("VI", "Sinnvolle Bearbeitungsreihenfolge")}
      <div className="grid gap-6 md:grid-cols-2">
        {RUNDEN.map((r) => {
          const text = [r.n, r.titel, ...r.items, r.ergebnis].join(" ");
          if (!hit(text)) return null;
          return (
            <Card key={r.n} className="flex flex-col gap-2">
              <h3 className="font-display text-lg font-medium text-ink">
                {r.n}. {r.titel}
              </h3>
              <ol className="flex list-decimal flex-col gap-1 pl-5 text-[0.92rem] text-ink-mid">
                {r.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ol>
              <p className="mt-1 border-t border-dashed border-ink/15 pt-2 text-[0.88rem] text-ink-mid">
                <strong className="text-ink">Ergebnis:</strong> {r.ergebnis}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Teil VII – Pflege + Schluss */}
      {partHead("VII", "Pflege der Sammlung")}
      {(() => {
        const text = ["Pflege der Sammlung", ...PFLEGE, "Schlussgedanke"].join(" ");
        if (!hit(text)) return null;
        return (
          <div className="flex flex-col gap-6">
            <Card>
              <Bullets items={PFLEGE} />
            </Card>
            <Card tone="accent" className="flex flex-col gap-3">
              <span className={memberEyebrow}>Schlussgedanke</span>
              <p className="text-[1.02rem] leading-relaxed text-ink-mid">
                Das Ziel ist nicht, möglichst viele Bücher zu besitzen oder möglichst viele
                Dokumentationen gesehen zu haben. Bewusstsein wächst, wenn eine Quelle die eigene
                Wahrnehmung irritiert, eine bisher unsichtbare Möglichkeit zeigt und schließlich zu
                einer anderen Erfahrung oder Handlung führt.
              </p>
              <blockquote className="border-l-2 border-ink/70 pl-4 font-display text-lg italic text-ink">
                Eine Bibliothek erweitert den Horizont nur dann, wenn sie nicht zur nächsten
                Bestätigungsblase wird.
              </blockquote>
            </Card>
          </div>
        );
      })()}
    </div>
  );
}
