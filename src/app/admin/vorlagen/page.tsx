import { APP_GLOW } from "@/lib/gradients";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isAdminEmail } from "@/lib/admin";
import { stages } from "@/lib/content";
import { deepDives } from "@/lib/deep-dives";
import { vorlagenKatalog } from "@/lib/vorlagen";
import { vorlagenAssets } from "@/lib/vorlagen-assets";
import { VorlagenBrowser, type PdfItem } from "./VorlagenBrowser";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vorlagen",
  robots: { index: false, follow: false },
};

// PDF-Liste aus bestehenden, geschützten Routen (Mitglieder-PDFs bleiben
// login-geschützt – hier nur verlinkt, nicht nach public/ kopiert).
function buildPdfListe(): PdfItem[] {
  const items: PdfItem[] = [
    {
      titel: "Gratis-E-Book · Die 7 Stufen der Bewusstseinsentwicklung",
      // Liegt unter content/pdf/ und ist daher nur über diese admin-
      // geschützte Route abrufbar – nicht mehr unter seinem Dateipfad.
      href: "/admin/vorlagen/ebook",
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
            Reel-Cover, Carousels, PDFs und Workshop-Material. Nutze die Suche oder die
            Filter, um schnell etwas zu finden.
          </p>
        </Container>
      </section>

      {/* Such-/Filterleiste + Galerie (interaktiv) */}
      <VorlagenBrowser
        social={social}
        reels={reels}
        carousels={carousels}
        workshop={workshop}
        pdfs={pdfs}
      />

      {/* Für Entwickler: neu erzeugen (eingeklappt) */}
      <section className="border-t border-ink/10 py-12">
        <Container>
          <details className="mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white p-5">
            <summary className="cursor-pointer text-sm font-semibold text-ink">
              Für Entwickler: Vorlagen neu erzeugen
            </summary>
            <p className="mt-3 text-sm text-ink-mid">
              Diese Galerie wird aus den Dateien in{" "}
              <code className="rounded bg-ink/5 px-1">docs/</code> aufbereitet. Nach
              Änderungen im Terminal ausführen:
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
