import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten (DSGVO).",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Datenschutz" />
      <section className="pb-8">
        <Container size="narrow">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-10">
            <Prose>
              <h2>1. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                <br />
                {site.author}
                <br />
                Dompfaffenweg 30
                <br />
                63920 Großheubach
                <br />
                Deutschland
                <br />
                E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>

              <h2>2. Allgemeines zur Datenverarbeitung</h2>
              <p>
                Wir verarbeiten personenbezogene Daten unserer Nutzer
                grundsätzlich nur, soweit dies zur Bereitstellung einer
                funktionsfähigen Website sowie unserer Inhalte und Leistungen
                erforderlich ist. Die Verarbeitung erfolgt auf Grundlage der
                DSGVO.
              </p>

              <h2>3. Hosting</h2>
              <p>
                Diese Website wird bei der Hetzner Online GmbH,
                Industriestr. 25, 91710 Gunzenhausen, Deutschland gehostet. Der
                Anbieter verarbeitet in unserem Auftrag Server-Logfiles (u. a.
                IP-Adresse, Datum/Uhrzeit des Zugriffs, aufgerufene Seite).
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an einer sicheren Bereitstellung).
              </p>

              <h2>4. Server-Logfiles</h2>
              <p>
                Beim Aufruf der Website werden automatisch Informationen erfasst,
                die dein Browser übermittelt. Dazu gehören:
              </p>
              <ul>
                <li>Browsertyp und -version</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer-URL</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse (gekürzt/anonymisiert, sofern möglich)</li>
              </ul>

              <h2>5. Kontaktaufnahme &amp; Formulare</h2>
              <p>
                Wenn du uns über das Kontaktformular oder per E-Mail
                kontaktierst, werden deine Angaben zur Bearbeitung der Anfrage
                gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a und b
                DSGVO. Diese Daten geben wir nicht ohne deine Einwilligung weiter.
              </p>

              <h2>6. Newsletter / E-Book-Anmeldung</h2>
              <p>
                Für den Versand des E-Books bzw. Newsletters verwenden wir das
                Double-Opt-in-Verfahren. Es werden nur die von dir angegebenen
                Daten (E-Mail-Adresse) verarbeitet. Du kannst die Einwilligung
                jederzeit widerrufen, z. B. über den Abmeldelink. Für den
                E-Mail-Versand nutzen wir den Dienst Resend (Resend, Inc., USA);
                die Speicherung deiner Anmeldedaten erfolgt bei unserem
                Backend-Dienstleister Supabase.
              </p>

              <h2>7. Deine Rechte</h2>
              <p>Dir stehen folgende Rechte zu:</p>
              <ul>
                <li>Auskunft (Art. 15 DSGVO)</li>
                <li>Berichtigung (Art. 16 DSGVO)</li>
                <li>Löschung (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch (Art. 21 DSGVO)</li>
              </ul>
              <p>
                Zudem hast du das Recht, dich bei einer
                Datenschutz-Aufsichtsbehörde zu beschweren.
              </p>

              <h2>8. Aktualität</h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig. Durch die
                Weiterentwicklung der Website oder geänderte gesetzliche Vorgaben
                kann eine Anpassung erforderlich werden.
              </p>
            </Prose>
          </div>
        </Container>
      </section>
    </>
  );
}
