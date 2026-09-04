import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { withCanonical } from "@/lib/seo";
import { publishedPosts } from "@/lib/blog";
import { practices } from "@/lib/practices";
import { deepDives } from "@/lib/deep-dives";
import { stages } from "@/lib/content";
import { chapters } from "@/lib/wissensdatenbank";

export const metadata: Metadata = withCanonical("/seiten", {
  title: "Seitenübersicht",
  description:
    "Alle Seiten dieser Website auf einen Blick – öffentliche Seiten, Blog-Artikel und der komplette Mitgliederbereich zum direkten Anklicken.",
  // Diese Übersicht bündelt auch Links in den geschützten Mitgliederbereich und
  // gehört daher nicht in den Suchmaschinen-Index.
  robots: { index: false, follow: true },
});

type PageLink = { href: string; label: string; hint?: string };
type PageGroup = { title: string; description?: string; links: PageLink[] };

/**
 * Zentrale, klickbare Übersicht aller Seiten der Website. Die dynamischen
 * Bereiche (Blog, 7 Stufen, Praxis, Vertiefungen, Wissensdatenbank) werden aus
 * denselben Datenquellen erzeugt, die auch die echten Seiten speisen – so bleibt
 * die Liste automatisch aktuell, sobald neue Inhalte hinzukommen.
 */
function buildGroups(): PageGroup[] {
  return [
    {
      title: "Öffentliche Seiten",
      description: "Frei zugänglich – ohne Login.",
      links: [
        { href: "/", label: "Startseite" },
        { href: "/die-7-stufen", label: "Die 7 Stufen" },
        { href: "/mitgliedschaft", label: "Mitgliedschaft" },
        {
          href: "/mitgliedschaft/willkommen",
          label: "Willkommen (nach Buchung)",
        },
        { href: "/bewusstseinstest", label: "Bewusstseinstest" },
        { href: "/ueber-mich", label: "Über mich" },
        { href: "/gratis-ebook", label: "Gratis-eBook" },
        { href: "/kontakt", label: "Kontakt" },
        { href: "/login", label: "Login" },
      ],
    },
    {
      title: "Blog",
      description: `Übersicht und ${publishedPosts().length} Artikel.`,
      links: [
        { href: "/blog", label: "Blog-Übersicht" },
        ...publishedPosts().map((post) => ({
          href: `/blog/${post.slug}`,
          label: post.title,
        })),
      ],
    },
    {
      title: "Mitgliederbereich",
      description: "Nur nach Login erreichbar.",
      links: [
        { href: "/mitglieder", label: "Dashboard" },
        { href: "/mitglieder/programm", label: "Programm" },
        { href: "/mitglieder/rueckkehr", label: "Rückkehr" },
        { href: "/mitglieder/journal", label: "Journal" },
        { href: "/mitglieder/gedankenprofil", label: "Gedankenprofil" },
        { href: "/mitglieder/detektor", label: "Gedanken-Detektor" },
        { href: "/mitglieder/begleiter", label: "Begleiter" },
        { href: "/mitglieder/einstellungen", label: "Einstellungen" },
      ],
    },
    {
      title: "Die 7 Stufen (Mitglieder)",
      description: "Übersicht und jede einzelne Stufe.",
      links: [
        ...stages.map((stage, i) => ({
          href: `/mitglieder/stufe/${i + 1}`,
          label: `Stufe ${stage.number} – ${stage.title}`,
          hint: stage.subtitle,
        })),
      ],
    },
    {
      title: "Praxis (Mitglieder)",
      description: `Übersicht und ${practices.length} Übungen.`,
      links: [
        { href: "/mitglieder/praxis", label: "Praxis-Übersicht" },
        ...practices.map((practice) => ({
          href: `/mitglieder/praxis/${practice.slug}`,
          label: practice.title,
        })),
      ],
    },
    {
      title: "Vertiefungen (Mitglieder)",
      description: `Übersicht und ${deepDives.length} Vertiefungen.`,
      links: [
        { href: "/mitglieder/wissen", label: "Vertiefungen-Übersicht" },
        ...deepDives.map((dive) => ({
          href: `/mitglieder/wissen/${dive.slug}`,
          label: dive.title,
          hint: dive.subtitle,
        })),
      ],
    },
    {
      title: "Wissensdatenbank (Mitglieder)",
      description: "Übersicht, alle Kapitel und das Glossar.",
      links: [
        { href: "/mitglieder/wissensdatenbank", label: "Wissensdatenbank-Übersicht" },
        ...chapters().map((chapter) => ({
          href: `/mitglieder/wissensdatenbank/${chapter.slug}`,
          label: chapter.number
            ? `${chapter.number}. ${chapter.title}`
            : chapter.title,
        })),
        { href: "/mitglieder/wissensdatenbank/glossar", label: "Glossar" },
      ],
    },
    {
      title: "Administration",
      description: "Interner Bereich – nur mit Admin-Rechten.",
      links: [
        { href: "/admin", label: "Admin-Dashboard" },
        { href: "/admin/marken-uebersicht", label: "Marken-Übersicht" },
        { href: "/admin/redaktionsplan", label: "Redaktionsplan" },
        { href: "/admin/vorlagen", label: "Vorlagen" },
      ],
    },
    {
      title: "Rechtliches",
      links: [
        { href: "/impressum", label: "Impressum" },
        { href: "/datenschutz", label: "Datenschutz" },
      ],
    },
  ];
}

export default function SeitenPage() {
  const groups = buildGroups();
  const total = groups.reduce((sum, group) => sum + group.links.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Seitenübersicht"
        title="Alle Seiten auf einen Blick"
        intro={`${total} Seiten – zum direkten Anklicken, geordnet nach Bereich.`}
      />

      <section className="bg-paper-aura grain-soft relative py-14 sm:py-20">
        <Container className="flex flex-col gap-12">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <Eyebrow>{group.title}</Eyebrow>
                  {group.description && (
                    <p className="mt-1 text-sm text-ink-soft">
                      {group.description}
                    </p>
                  )}
                </div>
                <span className="text-sm font-medium text-ink-soft/70">
                  {group.links.length}{" "}
                  {group.links.length === 1 ? "Seite" : "Seiten"}
                </span>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex h-full flex-col justify-between gap-2 rounded-2xl border border-ink/10 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-medium text-ink">
                          {link.label}
                        </span>
                        <ArrowRight className="mt-0.5 shrink-0 text-gold-600 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                      {link.hint && (
                        <span className="text-sm text-ink-soft">
                          {link.hint}
                        </span>
                      )}
                      <span className="text-xs text-ink-soft/60">
                        {link.href}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
