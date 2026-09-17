import type Stripe from "stripe";
import type { BookEdition } from "@/lib/stripe";

/**
 * Anbindung an die lexoffice / lexware-Office-API (nur serverseitig verwenden).
 *
 * Zweck (Stufe 1): Nach einem bezahlten Buch-Einmalkauf automatisch einen
 * Rechnungs-ENTWURF in lexoffice anlegen, damit die Rechnung nicht mehr von
 * Hand erfasst werden muss. Bewusst nur ein Entwurf – festgeschrieben und
 * versendet wird vorerst manuell in lexoffice (siehe docs/LEXOFFICE-RECHNUNGEN.md).
 *
 * Steuer: Es wird Umsatzsteuer ausgewiesen. Die Stripe-Beträge sind BRUTTO
 * (das, was die Kundschaft zahlt); die Rechnung rechnet daher brutto und weist
 * die USt. gesondert aus. Für Bücher/E-Books gilt in DE der ermäßigte Satz
 * (7 %) – einstellbar über LEXOFFICE_VAT_RATE. Firmen-/Absenderdaten kommen aus
 * dem lexoffice-Profil.
 *
 * Konfiguration (siehe .env.local.example):
 *   LEXOFFICE_API_KEY  – API-Schlüssel (lexoffice → Einstellungen → öffentliche API).
 *                        NIEMALS mit NEXT_PUBLIC_ prefixen.
 *   LEXOFFICE_VAT_RATE – Umsatzsteuersatz in Prozent (Standard 7 für Bücher).
 *
 * Ohne LEXOFFICE_API_KEY ist das Modul inaktiv: `createBookInvoiceDraft` gibt
 * `null` zurück und der Kauf läuft unverändert weiter (kein Blockieren).
 */

const API_BASE = "https://api.lexoffice.io";

const API_KEY = process.env.LEXOFFICE_API_KEY;

/** Umsatzsteuersatz in Prozent. Standard 7 % (ermäßigter Satz für Bücher/E-Books in DE). */
const VAT_RATE = Number(process.env.LEXOFFICE_VAT_RATE ?? "7");

/** True, wenn ein API-Schlüssel gesetzt ist (sonst bleibt die Anbindung inaktiv). */
export function isLexofficeConfigured(): boolean {
  return Boolean(API_KEY);
}

/** Öffentlicher UI-Link auf einen Beleg in lexoffice (zum Prüfen des Entwurfs). */
export function lexofficeInvoiceUrl(id: string): string {
  return `https://app.lexoffice.de/permalink/invoices/view/${id}`;
}

type LexofficeAddress = {
  name: string;
  supplement?: string;
  street?: string;
  zip?: string;
  city?: string;
  countryCode: string;
};

type CreateInvoiceResponse = {
  id: string;
  resourceUri?: string;
};

/**
 * Ruft die lexoffice-API auf. Wirft bei HTTP-Fehlern – die Aufrufer behandeln
 * das als „nicht angelegt" und dürfen dadurch den Kauf niemals scheitern lassen.
 */
async function lexofficeRequest<T>(
  path: string,
  init: RequestInit & { method: string },
): Promise<T> {
  if (!API_KEY) throw new Error("lexoffice: kein API-Key konfiguriert");

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`lexoffice ${init.method} ${path} → ${res.status} ${body}`);
  }
  return (await res.json()) as T;
}

/** Rechnungs-Anschrift aus den Stripe-Rechnungsdaten (customer_details) bauen. */
function billingAddress(session: Stripe.Checkout.Session, email: string): LexofficeAddress {
  const details = session.customer_details;
  const addr = details?.address;
  const street = [addr?.line1, addr?.line2].filter(Boolean).join(", ") || undefined;

  return {
    name: details?.name?.trim() || email,
    street,
    zip: addr?.postal_code ?? undefined,
    city: addr?.city ?? undefined,
    // lexoffice erwartet einen 2-Buchstaben-Ländercode; Fallback Deutschland.
    countryCode: (addr?.country || "DE").toUpperCase(),
  };
}

/** Produktbezeichnung für die Rechnungsposition je Edition. */
function productName(edition: BookEdition): string {
  return edition === "print"
    ? "Werde Meister deiner Gedanken – gedrucktes Buch"
    : "Werde Meister deiner Gedanken – E-Book (PDF)";
}

/**
 * Legt für einen bezahlten Buch-Kauf einen Rechnungs-ENTWURF in lexoffice an.
 *
 * Gibt `{ id, url }` des Entwurfs zurück oder `null`, wenn die Anbindung nicht
 * konfiguriert ist bzw. der Betrag fehlt. HTTP-Fehler werden nach oben
 * durchgereicht (der Webhook fängt sie ab, damit die Auslieferung sicher bleibt).
 */
export async function createBookInvoiceDraft(
  session: Stripe.Checkout.Session,
  email: string,
  edition: BookEdition,
): Promise<{ id: string; url: string } | null> {
  if (!isLexofficeConfigured()) return null;

  // Tatsächlich gezahlter Betrag (inkl. evtl. Rabatt) in Euro. Ohne Betrag
  // keine sinnvolle Rechnung → überspringen.
  const cents = session.amount_total;
  if (typeof cents !== "number") return null;
  const gross = cents / 100;
  const currency = (session.currency ?? "eur").toUpperCase();

  const nowIso = new Date().toISOString();

  const payload = {
    archived: false,
    voucherDate: nowIso,
    address: billingAddress(session, email),
    lineItems: [
      {
        type: "custom",
        name: productName(edition),
        quantity: 1,
        unitName: "Stück",
        // Der Stripe-Betrag ist BRUTTO (das Gezahlte). Als grossAmount ansetzen;
        // lexoffice rechnet die USt. anhand des Satzes heraus.
        unitPrice: {
          currency,
          grossAmount: gross,
          taxRatePercentage: VAT_RATE,
        },
      },
    ],
    totalPrice: { currency },
    // Brutto-basierte Rechnung: der ausgewiesene Endbetrag entspricht dem
    // tatsächlich über Stripe gezahlten Betrag.
    taxConditions: { taxType: "gross" },
    shippingConditions: { shippingDate: nowIso, shippingType: "delivery" },
    title: "Rechnung",
    introduction: `Vielen Dank für deinen Kauf. Bezahlt am ${new Date(nowIso).toLocaleDateString("de-DE")}.`,
  };

  // finalize=false → der Beleg landet als Entwurf in lexoffice und bekommt noch
  // KEINE feste Rechnungsnummer. Prüfen und Festschreiben erfolgt manuell.
  const created = await lexofficeRequest<CreateInvoiceResponse>(
    "/v1/invoices?finalize=false",
    { method: "POST", body: JSON.stringify(payload) },
  );

  return { id: created.id, url: lexofficeInvoiceUrl(created.id) };
}
