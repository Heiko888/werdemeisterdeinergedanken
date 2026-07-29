import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, socialIcons } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nimm Kontakt auf und vereinbare ein kostenloses Erstgespräch. Gemeinsam finden wir heraus, wo du stehst und was dein nächster Schritt ist.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Lass uns über deinen{" "}
            <em className="accent">nächsten Schritt</em> sprechen
          </>
        }
        intro="Ob konkrete Frage oder einfach der Wunsch, endlich anzufangen – schreib mir. Ich lese jede Nachricht persönlich."
      />

      <section className="pb-8">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
          <ContactForm />

          <aside className="flex min-w-0 flex-col gap-5">
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-ink">Direkt erreichen</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 flex min-w-0 items-center gap-3 rounded-xl border border-ink/10 bg-ink/[0.04] p-4 text-sm text-ink transition-colors hover:border-accent/40"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-lg text-accent">
                  <Mail />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-ink-muted">
                    E-Mail
                  </span>
                  <span className="block break-all">{site.email}</span>
                </span>
              </a>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-ink">Folge mir</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {(
                  Object.entries(site.social) as [
                    keyof typeof site.social,
                    string,
                  ][]
                ).map(([key, href]) => {
                  const SocialIcon = socialIcons[key];
                  if (!SocialIcon) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.04] text-lg text-ink-soft transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
                    >
                      <SocialIcon />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2px] border border-accent/25 bg-white p-6 shadow-card">
              <h2 className="font-display text-lg italic text-ink">
                Kostenloses Erstgespräch
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-mid">
                Unverbindlich und ehrlich. Wir klären, ob und wie ich dich am
                besten unterstützen kann – ganz ohne Verkaufsdruck.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
