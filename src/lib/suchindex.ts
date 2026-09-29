/**
 * Suchindex für die Mitglieder-Suche (/mitglieder/suche).
 *
 * Wird serverseitig aus denselben Inhaltsquellen gebaut wie die Seiten selbst
 * (Stufen, Vertiefungen, Praxis, Wissensdatenbank, Soforthilfe) und an eine
 * Client-Komponente übergeben, die ohne weitere Serveranfragen filtert.
 * Eigene Journal-Einträge kommen auf der Seite dazu (nur für die Person selbst).
 */
import { stages } from "@/lib/content";
import { getStageLesson } from "@/lib/stage-lessons";
import { deepDives } from "@/lib/deep-dives";
import { practices } from "@/lib/practices";
import { chapters, getDoc, type Block } from "@/lib/wissensdatenbank";
import { soforthilfen } from "@/lib/soforthilfe";

export type SuchTyp =
  | "Stufe"
  | "Vertiefung"
  | "Praxis"
  | "Wissensdatenbank"
  | "Soforthilfe"
  | "Journal";

export type SuchEintrag = {
  typ: SuchTyp;
  titel: string;
  /** Kurzer Anzeigetext unter dem Titel. */
  teaser: string;
  href: string;
  /** Volltext (klein geschrieben) – nur zum Filtern, wird nicht angezeigt. */
  text: string;
};

function blockText(b: Block): string {
  switch (b.type) {
    case "h2":
    case "h3":
    case "p":
    case "quote":
      return b.text;
    case "ul":
    case "ol":
      return b.items.join(" ");
    case "table":
      return [...b.head, ...b.rows.flat()].join(" ");
    default:
      return "";
  }
}

const norm = (parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(" ").toLowerCase();

export function baueSuchindex(): SuchEintrag[] {
  const eintraege: SuchEintrag[] = [];

  stages.forEach((stage, i) => {
    const lesson = getStageLesson(stage.number);
    eintraege.push({
      typ: "Stufe",
      titel: `Stufe ${i + 1}: ${stage.title}`,
      teaser: stage.subtitle,
      href: `/mitglieder/stufe/${i + 1}`,
      text: norm([
        stage.title,
        stage.subtitle,
        stage.description,
        lesson?.keyIdea,
        lesson?.intro,
        ...(lesson?.sections.flatMap((s) => [s.heading, s.body]) ?? []),
        ...(lesson?.exercises.flatMap((e) => [e.title, ...e.steps]) ?? []),
      ]),
    });
  });

  for (const d of deepDives) {
    eintraege.push({
      typ: "Vertiefung",
      titel: d.title,
      teaser: d.summary,
      href: `/mitglieder/wissen/${d.slug}`,
      text: norm([
        d.title,
        d.subtitle,
        d.category,
        d.summary,
        d.keyIdea,
        d.intro,
        ...d.sections.flatMap((s) => [s.heading, s.body]),
        ...d.exercises.flatMap((e) => [e.title, ...e.steps]),
        d.takeaway,
      ]),
    });
  }

  for (const p of practices) {
    eintraege.push({
      typ: "Praxis",
      titel: p.title,
      teaser: `${p.duration} · ${p.summary}`,
      href: `/mitglieder/praxis/${p.slug}`,
      text: norm([p.title, p.category, p.summary, p.purpose, p.when, p.intro, ...p.steps, p.tip]),
    });
  }

  for (const c of chapters()) {
    const doc = getDoc(c.slug);
    eintraege.push({
      typ: "Wissensdatenbank",
      titel: `${c.number} · ${c.title}`,
      teaser: c.lead,
      href: `/mitglieder/wissensdatenbank/${c.slug}`,
      text: norm([c.title, c.lead, ...(doc?.blocks.map(blockText) ?? [])]),
    });
  }

  for (const s of soforthilfen) {
    eintraege.push({
      typ: "Soforthilfe",
      titel: s.label,
      teaser: s.anerkennung,
      href: `/mitglieder/soforthilfe#${s.slug}`,
      text: norm([s.label, s.anerkennung, ...s.sofort]),
    });
  }

  return eintraege;
}
