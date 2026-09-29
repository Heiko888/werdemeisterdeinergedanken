import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LessonHero } from "@/components/members/LessonHero";
import { MitgliederSuche } from "@/components/members/MitgliederSuche";
import { baueSuchindex, type SuchEintrag } from "@/lib/suchindex";
import { getJournalEntries } from "@/app/mitglieder/actions";
import { formatDate, resolveEntry } from "@/lib/journal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Suche",
  robots: { index: false, follow: false },
};

/**
 * Suche über alles im Mitgliederbereich – Stufen, Praxis, Vertiefungen,
 * Wissensdatenbank, Soforthilfe – und über die eigenen Journal-Einträge.
 * Der Index wird hier serverseitig gebaut; gefiltert wird im Browser.
 * Journal-Texte gehören nur der Person selbst (RLS) und landen nur in ihrer
 * eigenen Seite.
 */
export default async function SuchePage() {
  const index = baueSuchindex();

  const journal = await getJournalEntries();
  const journalEintraege: SuchEintrag[] = journal.flatMap((entry) => {
    const ctx = resolveEntry(entry.itemType, entry.itemKey, entry.ref);
    if (!ctx) return [];
    const auszug =
      entry.body.length > 160 ? `${entry.body.slice(0, 160)} …` : entry.body;
    return [
      {
        typ: "Journal" as const,
        titel: `${ctx.label} · ${ctx.title} · ${formatDate(entry.updatedAt)}`,
        teaser: auszug,
        href: ctx.href,
        text: [ctx.title, ctx.question ?? "", entry.body].join(" ").toLowerCase(),
      },
    ];
  });

  return (
    <>
      <LessonHero
        eyebrow="Suche"
        title="Finde, was du suchst"
        subtitle="Durchsucht alle Stufen, Übungen, Vertiefungen, die Wissensdatenbank – und dein eigenes Journal."
      />
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <MitgliederSuche index={[...index, ...journalEintraege]} />
        </Container>
      </section>
    </>
  );
}
