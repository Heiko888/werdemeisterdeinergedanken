import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { publishedPosts } from "@/lib/blog";
import { practices } from "@/lib/practices";
import { deepDives } from "@/lib/deep-dives";
import { stages } from "@/lib/content";
import { chapters } from "@/lib/wissensdatenbank";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Seitenübersicht",
  // Interner Admin-Bereich – niemals indexieren.
  robots: { index: false, follow: false },
};

type PageLink = { href: string; label: string; hint?: string };
type PageGroup = { title: string; description?: string; links: PageLink[] };

/**
 * Interne, klickbare Übersicht aller Seiten der Website (nur Admin-Bereich).
 * Die dynamischen Gruppen (Blog, 7 Stufen, Praxis, Vertiefungen,
 * Wissensdatenbank) werden aus denselben Datenquellen erzeugt, die auch die
 * echten Seiten speisen – so bleibt die Liste automatisch aktuell, sobald neue
 * Inhalte hinzukommen.
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
        {
          href: "/admin/erstgespraeche",
          label: "Erstgespräche",
          hint: "Fragebögen & Gesprächs-Cockpit (nur Admin)",
        },
        {
          href: "/admin/methoden",
          label: "Methoden",
          hint: "Coaching-Methoden-Nachschlagewerk (nur Admin)",
        },
        { href: "/admin/marken-uebersicht", label: "Marken-Übersicht" },
        { href: "/admin/redaktionsplan", label: "Redaktionsplan" },
        { href: "/admin/vorlagen", label: "Vorlagen" },
        {
          href: "/admin/bewusstseinsbibliothek",
          label: "Bewusstseinsbibliothek",
          hint: "Quellen, Tätigkeiten & Content-Reservoir (nur Admin)",
        },
        { href: "/admin/seiten", label: "Seitenübersicht (diese Seite)" },
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

export default async function AdminSeitenPage() {
  // Ohne Supabase gibt es keine Anmeldung → kein Admin-Schutz möglich.
  if (!isSupabaseConfigured) {
    return (
      <section className="py-24">
        <Container className="mx-auto max-w-xl text-center">
          <Eyebrow>Seitenübersicht</Eyebrow>
          <h1 className="mt-2 text-2xl font-medium text-ink">Noch nicht verbunden</h1>
          <p className="mt-3 text-ink-mid">
            Diese Übersicht braucht eine konfigurierte Supabase-Anbindung, um dich
            als Admin anzumelden. Sobald die Umgebungsvariablen gesetzt sind, ist
            diese Seite verfügbar.
          </p>
        </Container>
      </section>
    );
  }

  // Zugriffsschutz analog zu den übrigen /admin-Seiten (zusätzlich zur
  // Middleware in src/proxy.ts, die /admin ohnehin absichert).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin/seiten");
  if (!isAdminEmail(user.email)) redirect("/mitglieder");

  const groups = buildGroups();
  const total = groups.reduce((sum, group) => sum + group.links.length, 0);

  return (
    <>
      <section className="grain relative overflow-hidden border-b border-ink/10 py-16 sm:py-20">
        <Container className="flex flex-col gap-3">
          <Eyebrow>Seitenübersicht</Eyebrow>
          <h1 className="max-w-3xl text-3xl font-medium leading-tight text-ink sm:text-4xl">
            Alle Seiten auf einen Blick
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-mid">
            {total} Seiten – zum direkten Anklicken, geordnet nach Bereich.
            Interne Übersicht, nur im Admin-Bereich sichtbar.
          </p>
        </Container>
      </section>

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
