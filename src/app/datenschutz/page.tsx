import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/datenschutz", {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten (DSGVO).",
  robots: { index: false, follow: true },
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Datenschutz" />
      <section className="bg-paper-aura grain-soft relative pb-8">
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
                E-Mail: <a href={`mailto:${site.email}`} className="break-all">{site.email}</a>
              </p>

              <h2>2. Allgemeines zur Datenverarbeitung</h2>
              <p>
                Wir verarbeiten personenbezogene Daten unserer Nutzer
                grundsätzlich nur, soweit dies zur Bereitstellung einer
                funktionsfähigen Website sowie unserer Inhalte und Leistungen
                erforderlich ist. Die Verarbeitung erfolgt auf Grundlage der
                DSGVO.
              </p>

              <h2>3. Hosting (Hetzner)</h2>
              <p>
                Diese Website wird bei der Hetzner Online GmbH,
                Industriestr. 25, 91710 Gunzenhausen, Deutschland gehostet
                (Server-Standort innerhalb der EU). Der Anbieter verarbeitet in
                unserem Auftrag Server-Logfiles (siehe Punkt 4). Rechtsgrundlage
                ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
                sicheren und stabilen Betrieb).
                <br />
                Datenschutz Hetzner:{" "}
                <a
                  href="https://www.hetzner.com/de/rechtliches/datenschutz"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hetzner.com/de/rechtliches/datenschutz
                </a>
              </p>

              <h2>4. Server-Logfiles</h2>
              <p>
                Beim Aufruf der Website werden automatisch Informationen an den
                Server gesendet und temporär in einem Logfile gespeichert:
              </p>
              <ul>
                <li>IP-Adresse des anfragenden Geräts</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Referrer-URL</li>
                <li>verwendeter Browser und Betriebssystem</li>
                <li>Name des Internet-Providers</li>
              </ul>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an einem stabilen Betrieb). Speicherdauer: 14 Tage,
                danach automatische Löschung.
              </p>

              <h2>5. Cookies &amp; Einwilligung</h2>
              <p>
                Technisch notwendige Cookies setzen wir ohne gesonderte
                Einwilligung ein. Das betrifft im Wesentlichen das Login-Cookie
                unseres Authentifizierungs-Dienstes Supabase, das dich nach der
                Anmeldung im Mitgliederbereich eingeloggt hält (gültig bis zum
                Logout bzw. bis zum Ablauf der Sitzung). Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. f DSGVO in Verbindung mit § 25 Abs. 2 Nr. 2
                TDDDG (unbedingt erforderliche Cookies).
              </p>
              <p>
                Darüber hinaus setzen wir zur Reichweitenmessung Google Analytics
                (siehe Punkt 6) und – sofern eingerichtet – den Meta-Pixel (siehe
                Punkt 7) ein, jedoch ausschließlich mit deiner ausdrücklichen
                Einwilligung. Beim ersten Besuch fragt dich ein Cookie-Banner um
                Zustimmung; ist der Meta-Pixel eingerichtet, wird er dort
                ausdrücklich mit genannt. Ohne deine Einwilligung werden
                <strong> keine</strong> Analyse- oder Marketing-Cookies gesetzt
                und die zugehörigen Scripts werden gar nicht erst geladen. Deine
                Auswahl kannst du jederzeit über den Link &bdquo;Cookie-Einstellungen&ldquo;
                im Seitenfuß ändern oder widerrufen; die Rechtmäßigkeit der bis
                zum Widerruf erfolgten Verarbeitung bleibt unberührt.
                Beim Widerruf entfernen wir die zugehörigen Cookies (_ga, _ga_*,
                _gid, _gat, _fbp, _fbc) aus deinem Browser. Rechtsgrundlage für
                diese Cookies ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) in
                Verbindung mit § 25 Abs. 1 TDDDG.
              </p>

              <h2>6. Google Analytics</h2>
              <p>
                Zur statistischen Auswertung der Nutzung unserer Website
                verwenden wir Google Analytics 4, einen Dienst der Google Ireland
                Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google
                verarbeitet die Daten in unserem Auftrag; dabei kann es zu einer
                Übermittlung in die USA an die Google LLC kommen, für die Google
                Standardvertragsklauseln und zusätzliche Schutzmaßnahmen
                vorsieht.
              </p>
              <p>
                Erhoben werden pseudonymisierte Nutzungsdaten wie aufgerufene
                Seiten, ungefährer Standort (auf Basis der gekürzten IP-Adresse),
                Verweildauer, verwendetes Gerät und Browser sowie die Referrer-
                Quelle. Zusätzlich zählen wir einzelne Aktionen: Anmeldung zu
                E-Book oder Bewusstseinstest, Abschluss des Bewusstseinstests
                (nur die Tatsache, dass er abgeschlossen wurde – ohne Ergebnis,
                Stufe, Punkte oder Antworten), Start eines Bezahlvorgangs und
                abgeschlossener Kauf. Die IP-Anonymisierung ist aktiviert, sodass deine
                IP-Adresse nicht vollständig gespeichert wird. Wir nutzen diese
                Daten ausschließlich, um die Website zu verbessern; eine
                Zusammenführung mit deinen Account-Daten findet nicht statt.
              </p>
              <p>
                Das Laden von Google Analytics und das Setzen der zugehörigen
                Cookies erfolgt erst nach deiner aktiven Einwilligung über den
                Cookie-Banner. Du kannst diese Einwilligung jederzeit über den
                Link &bdquo;Cookie-Einstellungen&ldquo; im Seitenfuß widerrufen.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
                <br />
                Datenschutz Google:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/privacy
                </a>
              </p>

              <h2>7. Meta-Pixel</h2>
              <p>
                Sofern eingerichtet, nutzen wir den Meta-Pixel, einen Dienst der
                Meta Platforms Ireland Limited, Irland. Mit ihm messen wir, ob
                Anzeigen auf Facebook und Instagram zu Aktionen auf unserer
                Website führen. Der Pixel wird – wie Google Analytics – erst nach
                deiner aktiven Einwilligung im Cookie-Banner geladen.
              </p>
              <p>
                Übermittelt werden dabei Seitenaufrufe und folgende Ereignisse:
                Anmeldung zu E-Book oder Bewusstseinstest (&bdquo;Lead&ldquo;,
                ohne Testergebnis), Start eines Bezahlvorgangs und
                abgeschlossener Kauf (Bestellkennung, Produkt, Betrag, Währung).
                Ergebnisse oder den Abschluss des Bewusstseinstests übermitteln
                wir nicht an Meta. Dazu verarbeitet Meta technische Daten
                wie IP-Adresse und Browserinformationen und setzt die Cookies
                _fbp bzw. _fbc. Meta kann diese Daten mit einem bestehenden
                Facebook- oder Instagram-Konto verknüpfen und auch außerhalb der
                EU, insbesondere in den USA, verarbeiten.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) in
                Verbindung mit § 25 Abs. 1 TDDDG. Du kannst die Einwilligung
                jederzeit über den Link &bdquo;Cookie-Einstellungen&ldquo; im
                Seitenfuß widerrufen.
                <br />
                Datenschutz Meta:{" "}
                <a
                  href="https://www.facebook.com/privacy/policy/"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  facebook.com/privacy/policy
                </a>
              </p>

              <h2>8. YouTube-Videos</h2>
              <p>
                Videos auf dieser Website und im Mitgliederbereich werden über
                YouTube bereitgestellt, einen Dienst der Google Ireland Limited,
                Irland. Wir binden sie im erweiterten Datenschutzmodus
                (youtube-nocookie.com) ein. Zunächst siehst du nur ein
                Vorschaubild, das von unserem eigenen Server kommt. Der
                eigentliche Player wird erst geladen, wenn du darauf klickst.
                Erst dann werden
                Daten wie deine IP-Adresse, die aufgerufene Seite und technische
                Browserinformationen an YouTube übermittelt, und YouTube kann
                Cookies oder ähnliche Technologien einsetzen. Eine Übermittlung
                in die USA an die Google LLC ist dabei möglich.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an einer ansprechenden Darstellung unserer
                Video-Inhalte).
                <br />
                Datenschutz Google:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/privacy
                </a>
              </p>

              <h2>9. Kontaktaufnahme &amp; Formulare</h2>
              <p>
                Wenn du uns über das Kontaktformular oder per E-Mail
                kontaktierst, werden deine Angaben (Name, E-Mail-Adresse,
                Nachricht) zur Bearbeitung der Anfrage gespeichert.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a und b DSGVO. Diese Daten
                geben wir nicht ohne deine Einwilligung weiter.
              </p>

              <h2>10. Newsletter &amp; E-Book-Anmeldung</h2>
              <p>
                Für den Bezug unserer E-Mail-Impulse bzw. des kostenlosen E-Books
                verwenden wir das Double-Opt-in-Verfahren: Du erhältst zunächst
                eine Bestätigungsmail, die du aktiv bestätigen musst. Verarbeitet
                wird deine E-Mail-Adresse sowie der Zeitpunkt der Anmeldung (zur
                Dokumentation der Einwilligung). Du kannst deine Einwilligung
                jederzeit über den Abmeldelink in jeder Mail widerrufen. Der
                Versand erfolgt über Resend (siehe Punkt 11), die Speicherung der
                Anmeldedaten über Supabase (siehe Punkt 12). Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
              </p>

              <h2>11. Resend – E-Mail-Versand</h2>
              <p>
                Bestätigungs- und Benachrichtigungs-E-Mails (z. B.
                Double-Opt-in, E-Book-Zustellung, Kontaktbestätigung) versenden
                wir über den Dienst Resend (Resend, Inc., USA). Dabei werden deine
                E-Mail-Adresse, ggf. dein Vorname und der jeweilige Mail-Inhalt
                übermittelt. Resend gewährleistet ein angemessenes Schutzniveau
                über Standardvertragsklauseln. Rechtsgrundlage ist Art. 6 Abs. 1
                lit. b DSGVO (Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. a DSGVO
                (Einwilligung).
                <br />
                Datenschutz Resend:{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  resend.com/legal/privacy-policy
                </a>
              </p>

              <h2>12. Supabase – Account &amp; Datenhaltung</h2>
              <p>
                Für Anmeldung/Login und die Speicherung deiner Inhalte im
                Mitgliederbereich nutzen wir Supabase (Server-Standort innerhalb
                der EU, Frankfurt). Gespeichert werden:
              </p>
              <ul>
                <li>E-Mail-Adresse und Passwort (als Hash)</li>
                <li>Profilangaben (z. B. Name)</li>
                <li>
                  dein Nutzungsfortschritt (z. B. als gemacht markierte Stufen
                  und Übungen) und dein Ergebnis aus dem Bewusstseinstest
                </li>
                <li>deine persönlichen Notizen und Reflexionen</li>
                <li>
                  Ergebnisse der von dir genutzten KI-Funktionen (siehe Punkt 14)
                </li>
                <li>Angaben zu Buchbestellungen (siehe Punkt 13)</li>
                <li>dein Opt-in-Status für die E-Mail-Impulse</li>
              </ul>
              <p>
                Speicherdauer: bis zur Löschung deines Accounts. Auf deinen Wunsch
                löschen wir deinen Account vollständig – eine formlose Mail an{" "}
                <a href={`mailto:${site.email}`} className="break-all">{site.email}</a> genügt.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung).
                <br />
                Datenschutz Supabase:{" "}
                <a
                  href="https://supabase.com/privacy"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  supabase.com/privacy
                </a>
              </p>

              <h2>13. Stripe – Zahlungsabwicklung</h2>
              <p>
                Für den Kauf des Buchs nutzen wir den Zahlungsdienst Stripe
                (Stripe Payments Europe, Limited, Irland). Beim Kauf wirst du auf
                eine Bezahlseite von Stripe weitergeleitet. Dort gibst du deine Zahlungsdaten, deine
                E-Mail-Adresse und deine Rechnungsadresse ein, bei der gedruckten
                Ausgabe zusätzlich die Lieferadresse. Deine Zahlungsdaten (z. B.
                Kartennummer) verarbeitet ausschließlich Stripe – wir erhalten sie
                nicht. Zusätzlich übergeben wir an Stripe die gewählte Ausgabe
                sowie, falls vorhanden, Kampagnenparameter aus dem Link, über den
                du gekommen bist (UTM-Parameter).
              </p>
              <p>
                Nach erfolgreicher Zahlung teilt uns Stripe die Bestellung mit.
                Wir speichern dazu in unserer Datenbank (Supabase, siehe Punkt 12)
                E-Mail-Adresse, Ausgabe, Betrag und Währung, die Kennungen des
                Bezahlvorgangs und des Kunden bei Stripe, den Zahlungsstatus sowie
                bei der gedruckten Ausgabe Name und Lieferadresse. Diese Daten
                nutzen wir, um dir das Buch zu liefern bzw. den Download zu
                schicken. Stripe kann Daten auch außerhalb der EU, insbesondere
                in den USA, verarbeiten.
              </p>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. c DSGVO, soweit
                gesetzliche Aufbewahrungspflichten bestehen.
                <br />
                Datenschutz Stripe:{" "}
                <a
                  href="https://stripe.com/de/privacy"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  stripe.com/de/privacy
                </a>
              </p>

              <h2 id="ki-werkzeuge">14. KI-Werkzeuge im Mitgliederbereich</h2>
              <p>
                Im Mitgliederbereich gibt es freiwillige KI-Werkzeuge. Sie
                beruhen auf einem Sprachmodell von Anthropic. Antworten und
                Auswertungen dieser Werkzeuge erzeugt eine KI – nicht Heiko
                persönlich. Die Werkzeuge sind optional; alle übrigen Inhalte
                des Mitgliederbereichs funktionieren auch ohne sie.
              </p>
              <p>
                Daten werden nur übertragen, wenn du ein Werkzeug selbst
                startest – also eine Nachricht an den Begleiter schickst oder
                auf den jeweiligen Button klickst. Im Hintergrund läuft nichts
                automatisch. Je Werkzeug gehen folgende Daten an Anthropic:
              </p>
              <ul>
                <li>
                  <strong>Begleiter (KI-Gespräch):</strong> deine Nachricht und
                  die letzten Nachrichten des Gesprächs, dein Name aus dem Profil,
                  die Werte deiner Selbsteinschätzung aus dem
                  Bewusstseinstest, die von dir als bearbeitet markierten
                  Stufen, kurze Auszüge deiner jüngsten Journal-Reflexionen,
                  Angaben zur Nutzung (tägliche Rückkehr, Tage im
                  21-Tage-Programm) sowie – wenn du diese Werkzeuge nutzt – die
                  zuletzt im Manipulations-Detektor erkannten Techniken und ein
                  Auszug deines letzten Muster-Spiegels.
                </li>
                <li>
                  <strong>Muster-Spiegel:</strong> deine Journal-Reflexionen
                  (die jüngsten, begrenzt auf etwa 6.000 Zeichen) samt der
                  jeweiligen Reflexionsfrage.
                </li>
                <li>
                  <strong>KI-Reflexion zum Gedankenprofil:</strong> die Werte
                  deiner Selbsteinschätzung aus dem Bewusstseinstest.
                </li>
                <li>
                  <strong>Manipulations-Detektor:</strong> der Text, den du
                  einfügst. Bitte füge keine personenbezogenen Daten anderer
                  Menschen ein, die du nicht weitergeben darfst.
                </li>
              </ul>
              <p>
                <strong>Anbieter:</strong> Anthropic Ireland, Limited (Irland).
                Anthropic verarbeitet die Daten als unser
                Auftragsverarbeiter auf Grundlage eines
                Auftragsverarbeitungsvertrags (Art. 28 DSGVO). Dabei können Daten
                auch in Drittländer, insbesondere die USA, übermittelt werden;
                hierfür sind EU-Standardvertragsklauseln vereinbart. Anthropic
                darf die Inhalte nach den vereinbarten Bedingungen nicht zum
                Training seiner Modelle verwenden. Datenschutz Anthropic:{" "}
                <a
                  href="https://www.anthropic.com/legal/privacy"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  anthropic.com/legal/privacy
                </a>
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> deine Einwilligung (Art. 6
                Abs. 1 lit. a DSGVO). Am jeweiligen Werkzeug steht direkt beim
                Senden-Feld bzw. Button ein kurzer Hinweis, welche Daten
                übertragen werden; mit dem Senden bzw. Klick erteilst du die
                Einwilligung. Deine Journal-Reflexionen und Gesprächsnachrichten
                können Angaben zu deiner Gesundheit enthalten; soweit das der
                Fall ist, verarbeiten wir sie nur mit deiner ausdrücklichen
                Einwilligung (Art. 9 Abs. 2 lit. a DSGVO). Du kannst deine
                Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen,
                indem du das Werkzeug nicht mehr nutzt und uns formlos
                schreibst; die Rechtmäßigkeit der bis dahin erfolgten
                Verarbeitung bleibt unberührt.
              </p>
              <p>
                <strong>Speicherung bei uns:</strong> Die Ergebnisse (Verlauf
                des Begleiter-Gesprächs, Muster-Spiegel, KI-Reflexion,
                Detektor-Prüfungen) speichern wir in deinem Account (siehe
                Punkt 12), sichtbar nur für dich, bis zur Löschung deines
                Accounts. Das Begleiter-Gespräch kannst du jederzeit selbst
                löschen; alle anderen Ergebnisse löschen wir auf Wunsch – eine
                formlose Mail an{" "}
                <a href={`mailto:${site.email}`} className="break-all">{site.email}</a>{" "}
                genügt.
              </p>
              <p>
                Die KI-Werkzeuge bewerten nicht dein Wissen oder deine
                Leistung, stellen keine Diagnosen und ersetzen keine
                therapeutische oder ärztliche Beratung.
              </p>

              <h2>15. Deine Rechte</h2>
              <p>Dir stehen jederzeit folgende Rechte zu:</p>
              <ul>
                <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                <li>
                  Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO) – die
                  Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung
                  bleibt unberührt
                </li>
              </ul>
              <p>
                Zur Ausübung genügt eine Mail an{" "}
                <a href={`mailto:${site.email}`} className="break-all">{site.email}</a>.
              </p>

              <h2>16. Beschwerderecht</h2>
              <p>
                Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu
                beschweren, z. B.:
                <br />
                Bayerisches Landesamt für Datenschutzaufsicht
                <br />
                Promenade 18
                <br />
                91522 Ansbach
              </p>

              <h2>17. Aktualität</h2>
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
