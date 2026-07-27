/**
 * Dateinamen-tauglicher Slug mit deutscher Umlaut-Umschrift.
 * Wird für die Download-Dateinamen der Mitglieder-PDFs genutzt.
 */
export function worksheetSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
