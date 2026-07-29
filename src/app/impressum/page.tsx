import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung.",
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return (
    <>
      <PageHero title="Impressum" />
      <section className="pb-8">
        <Container size="narrow">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-10">
            <p className="mb-6 rounded-xl border border-gold-500/40 bg-gold-300/20 p-4 text-sm text-ink-soft">
              Hinweis: Noch offen ist die USt-IdNr. (unten mit „[…]“ markiert) –
              bitte eintragen. Dieser Text ersetzt keine Rechtsberatung.
            </p>
            <Prose>
              <h2>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
              <p>
                {site.author}
                <br />
                Dompfaffenweg 30
                <br />
                63920 Großheubach
                <br />
                Deutschland
              </p>

              <h2>Kontakt</h2>
              <p>
                E-Mail:{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>

              <h2>Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
                <br />
                [USt-IdNr. bitte eintragen]
              </p>

              <h2>Redaktionell verantwortlich</h2>
              <p>
                {site.author}
                <br />
                Anschrift wie oben
              </p>

              <h2>Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>

              <h2>Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen.
              </p>

              <h2>Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge
                Dritter sind als solche gekennzeichnet.
              </p>
            </Prose>
          </div>
        </Container>
      </section>
    </>
  );
}
