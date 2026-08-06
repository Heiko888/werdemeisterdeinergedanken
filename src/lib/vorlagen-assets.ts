/**
 * AUTO-GENERIERT von tools/vorlagen/build-gallery.mjs – NICHT von Hand ändern.
 * Neu erzeugen mit:  npm run vorlagen:galerie
 *
 * Liste aller Vorlagen-Dateien, die unter content/vorlagen/ liegen und über
 * die Route /admin/vorlagen/datei/… (nur für Admins) ausgeliefert werden
 * und im Dashboard (/admin/vorlagen) als Galerie erscheinen.
 */

export type VorlagenAsset = {
  kategorie: "social" | "reels" | "carousel" | "workshop";
  titel: string;
  unterKategorie: string;
  kind: "image" | "file" | "carousel";
  /** Nur bei kind === "image" | "carousel": kleines Vorschaubild (Cover). */
  thumb?: string;
  /** Download-/Ansehen-Link (Route /admin/vorlagen/datei/…, nur für Admins). */
  href: string;
  /** Nur bei kind === "file". */
  format?: string;
  /** Nur bei kind === "carousel": Anzahl der Slides. */
  slides?: number;
  /** Nur bei kind === "carousel": Pfade aller Slide-Vorschaubilder in Reihenfolge. */
  slidePaths?: string[];
  sizeMB?: number;
};

export const vorlagenAssets: VorlagenAsset[] = [
  {
    "kategorie": "social",
    "titel": "Ebook 16x9",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-001.webp",
    "href": "/admin/vorlagen/datei/social/social-001.webp"
  },
  {
    "kategorie": "social",
    "titel": "Ebook 1x1",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-002.webp",
    "href": "/admin/vorlagen/datei/social/social-002.webp"
  },
  {
    "kategorie": "social",
    "titel": "Ebook 2x3",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-003.webp",
    "href": "/admin/vorlagen/datei/social/social-003.webp"
  },
  {
    "kategorie": "social",
    "titel": "Ebook 4x5",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-004.webp",
    "href": "/admin/vorlagen/datei/social/social-004.webp"
  },
  {
    "kategorie": "social",
    "titel": "Ebook 9x16",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-005.webp",
    "href": "/admin/vorlagen/datei/social/social-005.webp"
  },
  {
    "kategorie": "social",
    "titel": "Facebook Cover",
    "unterKategorie": "Facebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-006.webp",
    "href": "/admin/vorlagen/datei/social/social-006.webp"
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story Logo",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-007.webp",
    "href": "/admin/vorlagen/datei/social/social-007.webp"
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-008.webp",
    "href": "/admin/vorlagen/datei/social/social-008.webp"
  },
  {
    "kategorie": "social",
    "titel": "LinkedIn Banner",
    "unterKategorie": "LinkedIn",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-009.webp",
    "href": "/admin/vorlagen/datei/social/social-009.webp"
  },
  {
    "kategorie": "social",
    "titel": "Messenger Kanalbild",
    "unterKategorie": "Messenger",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-010.webp",
    "href": "/admin/vorlagen/datei/social/social-010.webp"
  },
  {
    "kategorie": "social",
    "titel": "Kanalbild Quadrat",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-011.webp",
    "href": "/admin/vorlagen/datei/social/social-011.webp"
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-012.webp",
    "href": "/admin/vorlagen/datei/social/social-012.webp"
  },
  {
    "kategorie": "social",
    "titel": "YouTube Banner",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-013.webp",
    "href": "/admin/vorlagen/datei/social/social-013.webp"
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 01",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-014.webp",
    "href": "/admin/vorlagen/datei/social/social-014.webp"
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 02",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-015.webp",
    "href": "/admin/vorlagen/datei/social/social-015.webp"
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail vorlage",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-016.webp",
    "href": "/admin/vorlagen/datei/social/social-016.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-017.webp",
    "href": "/admin/vorlagen/datei/social/social-017.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-018.webp",
    "href": "/admin/vorlagen/datei/social/social-018.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-019.webp",
    "href": "/admin/vorlagen/datei/social/social-019.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-020.webp",
    "href": "/admin/vorlagen/datei/social/social-020.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-021.webp",
    "href": "/admin/vorlagen/datei/social/social-021.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-022.webp",
    "href": "/admin/vorlagen/datei/social/social-022.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-023.webp",
    "href": "/admin/vorlagen/datei/social/social-023.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-024.webp",
    "href": "/admin/vorlagen/datei/social/social-024.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-025.webp",
    "href": "/admin/vorlagen/datei/social/social-025.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-026.webp",
    "href": "/admin/vorlagen/datei/social/social-026.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-027.webp",
    "href": "/admin/vorlagen/datei/social/social-027.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-028.webp",
    "href": "/admin/vorlagen/datei/social/social-028.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-029.webp",
    "href": "/admin/vorlagen/datei/social/social-029.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-030.webp",
    "href": "/admin/vorlagen/datei/social/social-030.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-031.webp",
    "href": "/admin/vorlagen/datei/social/social-031.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-032.webp",
    "href": "/admin/vorlagen/datei/social/social-032.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-033.webp",
    "href": "/admin/vorlagen/datei/social/social-033.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-034.webp",
    "href": "/admin/vorlagen/datei/social/social-034.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-035.webp",
    "href": "/admin/vorlagen/datei/social/social-035.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-036.webp",
    "href": "/admin/vorlagen/datei/social/social-036.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-037.webp",
    "href": "/admin/vorlagen/datei/social/social-037.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-038.webp",
    "href": "/admin/vorlagen/datei/social/social-038.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-039.webp",
    "href": "/admin/vorlagen/datei/social/social-039.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-040.webp",
    "href": "/admin/vorlagen/datei/social/social-040.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-041.webp",
    "href": "/admin/vorlagen/datei/social/social-041.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-042.webp",
    "href": "/admin/vorlagen/datei/social/social-042.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-043.webp",
    "href": "/admin/vorlagen/datei/social/social-043.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-044.webp",
    "href": "/admin/vorlagen/datei/social/social-044.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-045.webp",
    "href": "/admin/vorlagen/datei/social/social-045.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-046.webp",
    "href": "/admin/vorlagen/datei/social/social-046.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-047.webp",
    "href": "/admin/vorlagen/datei/social/social-047.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-048.webp",
    "href": "/admin/vorlagen/datei/social/social-048.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-049.webp",
    "href": "/admin/vorlagen/datei/social/social-049.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-050.webp",
    "href": "/admin/vorlagen/datei/social/social-050.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-051.webp",
    "href": "/admin/vorlagen/datei/social/social-051.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-052.webp",
    "href": "/admin/vorlagen/datei/social/social-052.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-053.webp",
    "href": "/admin/vorlagen/datei/social/social-053.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-054.webp",
    "href": "/admin/vorlagen/datei/social/social-054.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-055.webp",
    "href": "/admin/vorlagen/datei/social/social-055.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-056.webp",
    "href": "/admin/vorlagen/datei/social/social-056.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-057.webp",
    "href": "/admin/vorlagen/datei/social/social-057.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-058.webp",
    "href": "/admin/vorlagen/datei/social/social-058.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-059.webp",
    "href": "/admin/vorlagen/datei/social/social-059.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-060.webp",
    "href": "/admin/vorlagen/datei/social/social-060.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-061.webp",
    "href": "/admin/vorlagen/datei/social/social-061.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-062.webp",
    "href": "/admin/vorlagen/datei/social/social-062.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-063.webp",
    "href": "/admin/vorlagen/datei/social/social-063.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-064.webp",
    "href": "/admin/vorlagen/datei/social/social-064.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-065.webp",
    "href": "/admin/vorlagen/datei/social/social-065.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-066.webp",
    "href": "/admin/vorlagen/datei/social/social-066.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-067.webp",
    "href": "/admin/vorlagen/datei/social/social-067.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-068.webp",
    "href": "/admin/vorlagen/datei/social/social-068.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-069.webp",
    "href": "/admin/vorlagen/datei/social/social-069.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-070.webp",
    "href": "/admin/vorlagen/datei/social/social-070.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-071.webp",
    "href": "/admin/vorlagen/datei/social/social-071.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-072.webp",
    "href": "/admin/vorlagen/datei/social/social-072.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-073.webp",
    "href": "/admin/vorlagen/datei/social/social-073.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-074.webp",
    "href": "/admin/vorlagen/datei/social/social-074.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-075.webp",
    "href": "/admin/vorlagen/datei/social/social-075.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-076.webp",
    "href": "/admin/vorlagen/datei/social/social-076.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-077.webp",
    "href": "/admin/vorlagen/datei/social/social-077.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-078.webp",
    "href": "/admin/vorlagen/datei/social/social-078.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-079.webp",
    "href": "/admin/vorlagen/datei/social/social-079.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-080.webp",
    "href": "/admin/vorlagen/datei/social/social-080.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-081.webp",
    "href": "/admin/vorlagen/datei/social/social-081.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-082.webp",
    "href": "/admin/vorlagen/datei/social/social-082.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-083.webp",
    "href": "/admin/vorlagen/datei/social/social-083.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-084.webp",
    "href": "/admin/vorlagen/datei/social/social-084.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-085.webp",
    "href": "/admin/vorlagen/datei/social/social-085.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-086.webp",
    "href": "/admin/vorlagen/datei/social/social-086.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-087.webp",
    "href": "/admin/vorlagen/datei/social/social-087.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-088.webp",
    "href": "/admin/vorlagen/datei/social/social-088.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-089.webp",
    "href": "/admin/vorlagen/datei/social/social-089.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-090.webp",
    "href": "/admin/vorlagen/datei/social/social-090.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-091.webp",
    "href": "/admin/vorlagen/datei/social/social-091.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-092.webp",
    "href": "/admin/vorlagen/datei/social/social-092.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-093.webp",
    "href": "/admin/vorlagen/datei/social/social-093.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-094.webp",
    "href": "/admin/vorlagen/datei/social/social-094.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-095.webp",
    "href": "/admin/vorlagen/datei/social/social-095.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-096.webp",
    "href": "/admin/vorlagen/datei/social/social-096.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-097.webp",
    "href": "/admin/vorlagen/datei/social/social-097.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-098.webp",
    "href": "/admin/vorlagen/datei/social/social-098.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-099.webp",
    "href": "/admin/vorlagen/datei/social/social-099.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-100.webp",
    "href": "/admin/vorlagen/datei/social/social-100.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 01",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-landing-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-landing-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 02",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-landing-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-landing-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 03",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-landing-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-landing-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 01",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 02",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 03",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 04",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 05",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 06",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 07",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-07.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 08",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-08.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-08.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 09",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-09.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-09.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 10",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-10.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-10.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 11",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-11.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-11.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 12",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-12.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-12.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 13",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-13.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-13.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 01",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 02",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 03",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 04",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 05",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 06",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 07",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-07.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 08",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-08.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-08.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 09",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-09.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-09.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 10",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-10.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-10.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 11",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-11.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-11.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 12",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-12.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-12.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 13",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-13.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-13.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 14",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-14.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-14.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 15",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-15.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-15.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 16",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-16.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-16.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 01",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 02",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 03",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 04",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 05",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 06",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 07",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-07.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 01",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 02",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 03",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 04",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 05",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 06",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 07",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-07.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 08",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-08.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-08.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 09",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-09.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-09.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 10",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-10.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-10.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 11",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-11.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-11.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 12",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-12.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-12.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 13",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-13.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-13.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 01",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 02",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 03",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 04",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 05",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 06",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 07",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-07.webp"
  },
  {
    "kategorie": "carousel",
    "titel": "4 6 atmung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__4-6-atmung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "abend reflexion",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__abend-reflexion.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "atembeobachtung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__atembeobachtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "body scan",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__body-scan.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "box breathing",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.5,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__box-breathing.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der autopilot check",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der innere beobachter",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "die taegliche rueckkehr",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.7,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "herz kohaerenz",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "loslass ritual",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__loslass-ritual.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "morgen ausrichtung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "praesenz spaziergang",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "verlaengertes ausatmen",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.6,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "ablenkung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "algorithmen",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "angst steuerung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "autoritaetshoerigkeit",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "bildmacht",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "framing",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__framing/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__framing/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__framing/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__framing/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__framing/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__framing/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__framing/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__framing/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__framing.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "gruppendruck",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "identitaet und meinung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive dissonanz",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "medien agenda",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "normalisierung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "propaganda",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "reizueberflutung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "sprache und etiketten",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "werbung und mangel",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "wiederholung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "autopilot",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/stufen__autopilot/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/stufen__autopilot/slide-01.webp",
      "/admin/vorlagen/datei/carousels/stufen__autopilot/slide-02.webp",
      "/admin/vorlagen/datei/carousels/stufen__autopilot/slide-03.webp",
      "/admin/vorlagen/datei/carousels/stufen__autopilot/slide-04.webp",
      "/admin/vorlagen/datei/carousels/stufen__autopilot/slide-05.webp",
      "/admin/vorlagen/datei/carousels/stufen__autopilot/slide-06.webp",
      "/admin/vorlagen/datei/carousels/stufen__autopilot/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/stufen__autopilot.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "emotionale reifung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "erwachen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/stufen__erwachen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/stufen__erwachen/slide-01.webp",
      "/admin/vorlagen/datei/carousels/stufen__erwachen/slide-02.webp",
      "/admin/vorlagen/datei/carousels/stufen__erwachen/slide-03.webp",
      "/admin/vorlagen/datei/carousels/stufen__erwachen/slide-04.webp",
      "/admin/vorlagen/datei/carousels/stufen__erwachen/slide-05.webp",
      "/admin/vorlagen/datei/carousels/stufen__erwachen/slide-06.webp",
      "/admin/vorlagen/datei/carousels/stufen__erwachen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/stufen__erwachen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "innere ausrichtung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "meisterschaft",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/stufen__meisterschaft/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/stufen__meisterschaft/slide-01.webp",
      "/admin/vorlagen/datei/carousels/stufen__meisterschaft/slide-02.webp",
      "/admin/vorlagen/datei/carousels/stufen__meisterschaft/slide-03.webp",
      "/admin/vorlagen/datei/carousels/stufen__meisterschaft/slide-04.webp",
      "/admin/vorlagen/datei/carousels/stufen__meisterschaft/slide-05.webp",
      "/admin/vorlagen/datei/carousels/stufen__meisterschaft/slide-06.webp",
      "/admin/vorlagen/datei/carousels/stufen__meisterschaft/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/stufen__meisterschaft.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "schoepferkraft",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/stufen__schoepferkraft/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/stufen__schoepferkraft/slide-01.webp",
      "/admin/vorlagen/datei/carousels/stufen__schoepferkraft/slide-02.webp",
      "/admin/vorlagen/datei/carousels/stufen__schoepferkraft/slide-03.webp",
      "/admin/vorlagen/datei/carousels/stufen__schoepferkraft/slide-04.webp",
      "/admin/vorlagen/datei/carousels/stufen__schoepferkraft/slide-05.webp",
      "/admin/vorlagen/datei/carousels/stufen__schoepferkraft/slide-06.webp",
      "/admin/vorlagen/datei/carousels/stufen__schoepferkraft/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/stufen__schoepferkraft.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "selbstbeobachtung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "automatische gedanken",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der innere kritiker",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "die reiz reaktions luecke",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "emotionsregulation",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "gruebeln und gedankenkreisen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "integration und weitergabe",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kernueberzeugungen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive verzerrungen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "konditionierung",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "muster koerper und gesundheit",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "neuroplastizitaet",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "selbstmitgefuehl",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "werte und ziele",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele/slide-01.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele/slide-02.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele/slide-03.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele/slide-04.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele/slide-05.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele/slide-06.webp",
      "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele.zip"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan 7 Stufen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Moderationsplan-7-Stufen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook 7 Stufen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workbook-7-Stufen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop 7 Stufen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 2.2,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-7-Stufen.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Praesentationsvorlage",
    "unterKategorie": "Universell",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 1.8,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Praesentationsvorlage.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Mentale Selbstverteidigung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Moderationsplan-Mentale-Selbstverteidigung.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Mentale Selbstverteidigung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workbook-Mentale-Selbstverteidigung.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Mentale Selbstverteidigung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 2.4,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Mentale-Selbstverteidigung.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Praxis Werkzeugkasten",
    "unterKategorie": "Praxis-Werkzeugkasten",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Moderationsplan-Praxis-Werkzeugkasten.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Praxis Werkzeugkasten",
    "unterKategorie": "Praxis-Werkzeugkasten",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workbook-Praxis-Werkzeugkasten.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Praxis Werkzeugkasten",
    "unterKategorie": "Praxis-Werkzeugkasten",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 2.4,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Praxis-Werkzeugkasten.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Vertiefungen Kopf verstehen",
    "unterKategorie": "Deinen Kopf verstehen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Moderationsplan-Vertiefungen-Kopf-verstehen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Vertiefungen Kopf verstehen",
    "unterKategorie": "Deinen Kopf verstehen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workbook-Vertiefungen-Kopf-verstehen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Vertiefungen Kopf verstehen",
    "unterKategorie": "Deinen Kopf verstehen",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 2.4,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Vertiefungen-Kopf-verstehen.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Wissensreise Dein Gehirn verstehen",
    "unterKategorie": "Wissensdatenbank",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.0,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Moderationsplan-Wissensreise-Dein-Gehirn-verstehen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Wissensreise Dein Gehirn verstehen",
    "unterKategorie": "Wissensdatenbank",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.7,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workbook-Wissensreise-Dein-Gehirn-verstehen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Wissensreise Dein Gehirn verstehen",
    "unterKategorie": "Wissensdatenbank",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Wissensreise-Dein-Gehirn-verstehen.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Bewusstseinstest Wo stehst du",
    "unterKategorie": "Bewusstseinstest & Profil",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.0,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Moderationsplan-Bewusstseinstest-Wo-stehst-du.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Bewusstseinstest Wo stehst du",
    "unterKategorie": "Bewusstseinstest & Profil",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.7,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workbook-Bewusstseinstest-Wo-stehst-du.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Bewusstseinstest Wo stehst du",
    "unterKategorie": "Bewusstseinstest & Profil",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 0.8,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Bewusstseinstest-Wo-stehst-du.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Deinen Kopf durchdenken",
    "unterKategorie": "Blog & Deep-Dives",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.0,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Moderationsplan-Deinen-Kopf-durchdenken.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Deinen Kopf durchdenken",
    "unterKategorie": "Blog & Deep-Dives",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.7,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workbook-Deinen-Kopf-durchdenken.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Deinen Kopf durchdenken",
    "unterKategorie": "Blog & Deep-Dives",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Deinen-Kopf-durchdenken.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Journal und Impulse Die Kraft der Reflexion",
    "unterKategorie": "Journal & Impulse",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.0,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Moderationsplan-Journal-und-Impulse-Die-Kraft-der-Reflexion.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Journal und Impulse Die Kraft der Reflexion",
    "unterKategorie": "Journal & Impulse",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.7,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workbook-Journal-und-Impulse-Die-Kraft-der-Reflexion.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Journal und Impulse Die Kraft der Reflexion",
    "unterKategorie": "Journal & Impulse",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 0.8,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Journal-und-Impulse-Die-Kraft-der-Reflexion.pptx"
  }
];
