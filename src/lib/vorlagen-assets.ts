/**
 * AUTO-GENERIERT von tools/vorlagen/build-gallery.mjs – NICHT von Hand ändern.
 * Neu erzeugen mit:  npm run vorlagen:galerie
 *
 * Liste aller Vorlagen-Dateien, die unter public/vorlagen/ veröffentlicht sind
 * und im Dashboard (/admin/vorlagen) als Galerie erscheinen.
 */

export type VorlagenAsset = {
  kategorie: "social" | "reels" | "carousel" | "workshop";
  titel: string;
  unterKategorie: string;
  kind: "image" | "file" | "carousel";
  /** Nur bei kind === "image" | "carousel": kleines Vorschaubild (Cover). */
  thumb?: string;
  /** Download-/Ansehen-Link (liegt unter public/). */
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
    "titel": "Facebook Cover",
    "unterKategorie": "Facebook",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-001.webp",
    "href": "/vorlagen/social/social-001.webp"
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story Logo",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-002.webp",
    "href": "/vorlagen/social/social-002.webp"
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-003.webp",
    "href": "/vorlagen/social/social-003.webp"
  },
  {
    "kategorie": "social",
    "titel": "LinkedIn Banner",
    "unterKategorie": "LinkedIn",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-004.webp",
    "href": "/vorlagen/social/social-004.webp"
  },
  {
    "kategorie": "social",
    "titel": "Messenger Kanalbild",
    "unterKategorie": "Messenger",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-005.webp",
    "href": "/vorlagen/social/social-005.webp"
  },
  {
    "kategorie": "social",
    "titel": "Kanalbild Quadrat",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-006.webp",
    "href": "/vorlagen/social/social-006.webp"
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-007.webp",
    "href": "/vorlagen/social/social-007.webp"
  },
  {
    "kategorie": "social",
    "titel": "YouTube Banner",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-008.webp",
    "href": "/vorlagen/social/social-008.webp"
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 01",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-009.webp",
    "href": "/vorlagen/social/social-009.webp"
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 02",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-010.webp",
    "href": "/vorlagen/social/social-010.webp"
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail vorlage",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-011.webp",
    "href": "/vorlagen/social/social-011.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-012.webp",
    "href": "/vorlagen/social/social-012.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-013.webp",
    "href": "/vorlagen/social/social-013.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-014.webp",
    "href": "/vorlagen/social/social-014.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-015.webp",
    "href": "/vorlagen/social/social-015.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-016.webp",
    "href": "/vorlagen/social/social-016.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-017.webp",
    "href": "/vorlagen/social/social-017.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-018.webp",
    "href": "/vorlagen/social/social-018.webp"
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-019.webp",
    "href": "/vorlagen/social/social-019.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-020.webp",
    "href": "/vorlagen/social/social-020.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-021.webp",
    "href": "/vorlagen/social/social-021.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-022.webp",
    "href": "/vorlagen/social/social-022.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-023.webp",
    "href": "/vorlagen/social/social-023.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-024.webp",
    "href": "/vorlagen/social/social-024.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-025.webp",
    "href": "/vorlagen/social/social-025.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-026.webp",
    "href": "/vorlagen/social/social-026.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-027.webp",
    "href": "/vorlagen/social/social-027.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-028.webp",
    "href": "/vorlagen/social/social-028.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-029.webp",
    "href": "/vorlagen/social/social-029.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-030.webp",
    "href": "/vorlagen/social/social-030.webp"
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06",
    "unterKategorie": "Zitate & Fakten",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/social/social-031.webp",
    "href": "/vorlagen/social/social-031.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 01",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-landing-01.webp",
    "href": "/vorlagen/reels/reel-landing-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 02",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-landing-02.webp",
    "href": "/vorlagen/reels/reel-landing-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 03",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-landing-03.webp",
    "href": "/vorlagen/reels/reel-landing-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 01",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-01.webp",
    "href": "/vorlagen/reels/reel-praxis-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 02",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-02.webp",
    "href": "/vorlagen/reels/reel-praxis-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 03",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-03.webp",
    "href": "/vorlagen/reels/reel-praxis-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 04",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-04.webp",
    "href": "/vorlagen/reels/reel-praxis-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 05",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-05.webp",
    "href": "/vorlagen/reels/reel-praxis-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 06",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-06.webp",
    "href": "/vorlagen/reels/reel-praxis-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 07",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-07.webp",
    "href": "/vorlagen/reels/reel-praxis-07.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 08",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-08.webp",
    "href": "/vorlagen/reels/reel-praxis-08.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 09",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-09.webp",
    "href": "/vorlagen/reels/reel-praxis-09.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 10",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-10.webp",
    "href": "/vorlagen/reels/reel-praxis-10.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 11",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-11.webp",
    "href": "/vorlagen/reels/reel-praxis-11.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 12",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-12.webp",
    "href": "/vorlagen/reels/reel-praxis-12.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 13",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-praxis-13.webp",
    "href": "/vorlagen/reels/reel-praxis-13.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 01",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-01.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 02",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-02.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 03",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-03.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 04",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-04.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 05",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-05.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 06",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-06.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 07",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-07.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-07.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 08",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-08.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-08.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 09",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-09.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-09.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 10",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-10.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-10.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 11",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-11.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-11.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 12",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-12.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-12.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 13",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-13.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-13.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 14",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-14.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-14.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 15",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-15.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-15.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 16",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-selbstverteidigung-16.webp",
    "href": "/vorlagen/reels/reel-selbstverteidigung-16.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 01",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-stufen-01.webp",
    "href": "/vorlagen/reels/reel-stufen-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 02",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-stufen-02.webp",
    "href": "/vorlagen/reels/reel-stufen-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 03",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-stufen-03.webp",
    "href": "/vorlagen/reels/reel-stufen-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 04",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-stufen-04.webp",
    "href": "/vorlagen/reels/reel-stufen-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 05",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-stufen-05.webp",
    "href": "/vorlagen/reels/reel-stufen-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 06",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-stufen-06.webp",
    "href": "/vorlagen/reels/reel-stufen-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 07",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-stufen-07.webp",
    "href": "/vorlagen/reels/reel-stufen-07.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 01",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-01.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 02",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-02.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 03",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-03.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 04",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-04.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 05",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-05.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 06",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-06.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 07",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-07.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-07.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 08",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-08.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-08.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 09",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-09.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-09.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 10",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-10.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-10.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 11",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-11.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-11.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 12",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-12.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-12.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 13",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-vertiefungen-13.webp",
    "href": "/vorlagen/reels/reel-vertiefungen-13.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 01",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-wissenschaft-01.webp",
    "href": "/vorlagen/reels/reel-wissenschaft-01.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 02",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-wissenschaft-02.webp",
    "href": "/vorlagen/reels/reel-wissenschaft-02.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 03",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-wissenschaft-03.webp",
    "href": "/vorlagen/reels/reel-wissenschaft-03.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 04",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-wissenschaft-04.webp",
    "href": "/vorlagen/reels/reel-wissenschaft-04.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 05",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-wissenschaft-05.webp",
    "href": "/vorlagen/reels/reel-wissenschaft-05.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 06",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-wissenschaft-06.webp",
    "href": "/vorlagen/reels/reel-wissenschaft-06.webp"
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 07",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/vorlagen/thumbs/reels/reel-wissenschaft-07.webp",
    "href": "/vorlagen/reels/reel-wissenschaft-07.webp"
  },
  {
    "kategorie": "carousel",
    "titel": "4 6 atmung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__4-6-atmung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__4-6-atmung/slide-01.webp",
      "/vorlagen/carousels/praxis__4-6-atmung/slide-02.webp",
      "/vorlagen/carousels/praxis__4-6-atmung/slide-03.webp",
      "/vorlagen/carousels/praxis__4-6-atmung/slide-04.webp",
      "/vorlagen/carousels/praxis__4-6-atmung/slide-05.webp",
      "/vorlagen/carousels/praxis__4-6-atmung/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__4-6-atmung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "abend reflexion",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__abend-reflexion/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__abend-reflexion/slide-01.webp",
      "/vorlagen/carousels/praxis__abend-reflexion/slide-02.webp",
      "/vorlagen/carousels/praxis__abend-reflexion/slide-03.webp",
      "/vorlagen/carousels/praxis__abend-reflexion/slide-04.webp",
      "/vorlagen/carousels/praxis__abend-reflexion/slide-05.webp",
      "/vorlagen/carousels/praxis__abend-reflexion/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__abend-reflexion.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "atembeobachtung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__atembeobachtung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__atembeobachtung/slide-01.webp",
      "/vorlagen/carousels/praxis__atembeobachtung/slide-02.webp",
      "/vorlagen/carousels/praxis__atembeobachtung/slide-03.webp",
      "/vorlagen/carousels/praxis__atembeobachtung/slide-04.webp",
      "/vorlagen/carousels/praxis__atembeobachtung/slide-05.webp",
      "/vorlagen/carousels/praxis__atembeobachtung/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__atembeobachtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "body scan",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__body-scan/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__body-scan/slide-01.webp",
      "/vorlagen/carousels/praxis__body-scan/slide-02.webp",
      "/vorlagen/carousels/praxis__body-scan/slide-03.webp",
      "/vorlagen/carousels/praxis__body-scan/slide-04.webp",
      "/vorlagen/carousels/praxis__body-scan/slide-05.webp",
      "/vorlagen/carousels/praxis__body-scan/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__body-scan.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "box breathing",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__box-breathing/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__box-breathing/slide-01.webp",
      "/vorlagen/carousels/praxis__box-breathing/slide-02.webp",
      "/vorlagen/carousels/praxis__box-breathing/slide-03.webp",
      "/vorlagen/carousels/praxis__box-breathing/slide-04.webp",
      "/vorlagen/carousels/praxis__box-breathing/slide-05.webp",
      "/vorlagen/carousels/praxis__box-breathing/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__box-breathing.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der autopilot check",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__der-autopilot-check/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__der-autopilot-check/slide-01.webp",
      "/vorlagen/carousels/praxis__der-autopilot-check/slide-02.webp",
      "/vorlagen/carousels/praxis__der-autopilot-check/slide-03.webp",
      "/vorlagen/carousels/praxis__der-autopilot-check/slide-04.webp",
      "/vorlagen/carousels/praxis__der-autopilot-check/slide-05.webp",
      "/vorlagen/carousels/praxis__der-autopilot-check/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__der-autopilot-check.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der innere beobachter",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__der-innere-beobachter/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__der-innere-beobachter/slide-01.webp",
      "/vorlagen/carousels/praxis__der-innere-beobachter/slide-02.webp",
      "/vorlagen/carousels/praxis__der-innere-beobachter/slide-03.webp",
      "/vorlagen/carousels/praxis__der-innere-beobachter/slide-04.webp",
      "/vorlagen/carousels/praxis__der-innere-beobachter/slide-05.webp",
      "/vorlagen/carousels/praxis__der-innere-beobachter/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__der-innere-beobachter.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "die taegliche rueckkehr",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__die-taegliche-rueckkehr/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__die-taegliche-rueckkehr/slide-01.webp",
      "/vorlagen/carousels/praxis__die-taegliche-rueckkehr/slide-02.webp",
      "/vorlagen/carousels/praxis__die-taegliche-rueckkehr/slide-03.webp",
      "/vorlagen/carousels/praxis__die-taegliche-rueckkehr/slide-04.webp",
      "/vorlagen/carousels/praxis__die-taegliche-rueckkehr/slide-05.webp",
      "/vorlagen/carousels/praxis__die-taegliche-rueckkehr/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__die-taegliche-rueckkehr.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "herz kohaerenz",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__herz-kohaerenz/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__herz-kohaerenz/slide-01.webp",
      "/vorlagen/carousels/praxis__herz-kohaerenz/slide-02.webp",
      "/vorlagen/carousels/praxis__herz-kohaerenz/slide-03.webp",
      "/vorlagen/carousels/praxis__herz-kohaerenz/slide-04.webp",
      "/vorlagen/carousels/praxis__herz-kohaerenz/slide-05.webp",
      "/vorlagen/carousels/praxis__herz-kohaerenz/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__herz-kohaerenz.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "loslass ritual",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__loslass-ritual/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__loslass-ritual/slide-01.webp",
      "/vorlagen/carousels/praxis__loslass-ritual/slide-02.webp",
      "/vorlagen/carousels/praxis__loslass-ritual/slide-03.webp",
      "/vorlagen/carousels/praxis__loslass-ritual/slide-04.webp",
      "/vorlagen/carousels/praxis__loslass-ritual/slide-05.webp",
      "/vorlagen/carousels/praxis__loslass-ritual/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__loslass-ritual.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "morgen ausrichtung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__morgen-ausrichtung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__morgen-ausrichtung/slide-01.webp",
      "/vorlagen/carousels/praxis__morgen-ausrichtung/slide-02.webp",
      "/vorlagen/carousels/praxis__morgen-ausrichtung/slide-03.webp",
      "/vorlagen/carousels/praxis__morgen-ausrichtung/slide-04.webp",
      "/vorlagen/carousels/praxis__morgen-ausrichtung/slide-05.webp",
      "/vorlagen/carousels/praxis__morgen-ausrichtung/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__morgen-ausrichtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "praesenz spaziergang",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__praesenz-spaziergang/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__praesenz-spaziergang/slide-01.webp",
      "/vorlagen/carousels/praxis__praesenz-spaziergang/slide-02.webp",
      "/vorlagen/carousels/praxis__praesenz-spaziergang/slide-03.webp",
      "/vorlagen/carousels/praxis__praesenz-spaziergang/slide-04.webp",
      "/vorlagen/carousels/praxis__praesenz-spaziergang/slide-05.webp",
      "/vorlagen/carousels/praxis__praesenz-spaziergang/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__praesenz-spaziergang.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "verlaengertes ausatmen",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/carousels/praxis__verlaengertes-ausatmen/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/praxis__verlaengertes-ausatmen/slide-01.webp",
      "/vorlagen/carousels/praxis__verlaengertes-ausatmen/slide-02.webp",
      "/vorlagen/carousels/praxis__verlaengertes-ausatmen/slide-03.webp",
      "/vorlagen/carousels/praxis__verlaengertes-ausatmen/slide-04.webp",
      "/vorlagen/carousels/praxis__verlaengertes-ausatmen/slide-05.webp",
      "/vorlagen/carousels/praxis__verlaengertes-ausatmen/slide-06.webp"
    ],
    "href": "/vorlagen/carousels/praxis__verlaengertes-ausatmen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "ablenkung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__ablenkung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__ablenkung/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__ablenkung/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__ablenkung/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__ablenkung/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__ablenkung/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__ablenkung/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__ablenkung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__ablenkung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "algorithmen",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__algorithmen/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__algorithmen/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__algorithmen/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__algorithmen/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__algorithmen/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__algorithmen/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__algorithmen/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__algorithmen/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__algorithmen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "angst steuerung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__angst-steuerung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__angst-steuerung/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__angst-steuerung/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__angst-steuerung/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__angst-steuerung/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__angst-steuerung/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__angst-steuerung/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__angst-steuerung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__angst-steuerung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "autoritaetshoerigkeit",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "bildmacht",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__bildmacht/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__bildmacht/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__bildmacht/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__bildmacht/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__bildmacht/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__bildmacht/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__bildmacht/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__bildmacht/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__bildmacht.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "framing",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__framing/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__framing/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__framing/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__framing/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__framing/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__framing/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__framing/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__framing/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__framing.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "gruppendruck",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__gruppendruck/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__gruppendruck/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__gruppendruck/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__gruppendruck/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__gruppendruck/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__gruppendruck/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__gruppendruck/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__gruppendruck/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__gruppendruck.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "identitaet und meinung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive dissonanz",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "medien agenda",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__medien-agenda/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__medien-agenda/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__medien-agenda/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__medien-agenda/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__medien-agenda/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__medien-agenda/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__medien-agenda/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__medien-agenda/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__medien-agenda.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "normalisierung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__normalisierung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__normalisierung/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__normalisierung/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__normalisierung/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__normalisierung/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__normalisierung/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__normalisierung/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__normalisierung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__normalisierung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "propaganda",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__propaganda/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__propaganda/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__propaganda/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__propaganda/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__propaganda/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__propaganda/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__propaganda/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__propaganda/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__propaganda.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "reizueberflutung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__reizueberflutung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__reizueberflutung/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__reizueberflutung/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__reizueberflutung/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__reizueberflutung/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__reizueberflutung/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__reizueberflutung/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__reizueberflutung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__reizueberflutung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "sprache und etiketten",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "werbung und mangel",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "wiederholung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/selbstverteidigung__wiederholung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/selbstverteidigung__wiederholung/slide-01.webp",
      "/vorlagen/carousels/selbstverteidigung__wiederholung/slide-02.webp",
      "/vorlagen/carousels/selbstverteidigung__wiederholung/slide-03.webp",
      "/vorlagen/carousels/selbstverteidigung__wiederholung/slide-04.webp",
      "/vorlagen/carousels/selbstverteidigung__wiederholung/slide-05.webp",
      "/vorlagen/carousels/selbstverteidigung__wiederholung/slide-06.webp",
      "/vorlagen/carousels/selbstverteidigung__wiederholung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/selbstverteidigung__wiederholung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "autopilot",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/stufen__autopilot/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/stufen__autopilot/slide-01.webp",
      "/vorlagen/carousels/stufen__autopilot/slide-02.webp",
      "/vorlagen/carousels/stufen__autopilot/slide-03.webp",
      "/vorlagen/carousels/stufen__autopilot/slide-04.webp",
      "/vorlagen/carousels/stufen__autopilot/slide-05.webp",
      "/vorlagen/carousels/stufen__autopilot/slide-06.webp",
      "/vorlagen/carousels/stufen__autopilot/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/stufen__autopilot.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "emotionale reifung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/stufen__emotionale-reifung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/stufen__emotionale-reifung/slide-01.webp",
      "/vorlagen/carousels/stufen__emotionale-reifung/slide-02.webp",
      "/vorlagen/carousels/stufen__emotionale-reifung/slide-03.webp",
      "/vorlagen/carousels/stufen__emotionale-reifung/slide-04.webp",
      "/vorlagen/carousels/stufen__emotionale-reifung/slide-05.webp",
      "/vorlagen/carousels/stufen__emotionale-reifung/slide-06.webp",
      "/vorlagen/carousels/stufen__emotionale-reifung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/stufen__emotionale-reifung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "erwachen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/stufen__erwachen/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/stufen__erwachen/slide-01.webp",
      "/vorlagen/carousels/stufen__erwachen/slide-02.webp",
      "/vorlagen/carousels/stufen__erwachen/slide-03.webp",
      "/vorlagen/carousels/stufen__erwachen/slide-04.webp",
      "/vorlagen/carousels/stufen__erwachen/slide-05.webp",
      "/vorlagen/carousels/stufen__erwachen/slide-06.webp",
      "/vorlagen/carousels/stufen__erwachen/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/stufen__erwachen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "innere ausrichtung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/stufen__innere-ausrichtung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/stufen__innere-ausrichtung/slide-01.webp",
      "/vorlagen/carousels/stufen__innere-ausrichtung/slide-02.webp",
      "/vorlagen/carousels/stufen__innere-ausrichtung/slide-03.webp",
      "/vorlagen/carousels/stufen__innere-ausrichtung/slide-04.webp",
      "/vorlagen/carousels/stufen__innere-ausrichtung/slide-05.webp",
      "/vorlagen/carousels/stufen__innere-ausrichtung/slide-06.webp",
      "/vorlagen/carousels/stufen__innere-ausrichtung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/stufen__innere-ausrichtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "meisterschaft",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/stufen__meisterschaft/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/stufen__meisterschaft/slide-01.webp",
      "/vorlagen/carousels/stufen__meisterschaft/slide-02.webp",
      "/vorlagen/carousels/stufen__meisterschaft/slide-03.webp",
      "/vorlagen/carousels/stufen__meisterschaft/slide-04.webp",
      "/vorlagen/carousels/stufen__meisterschaft/slide-05.webp",
      "/vorlagen/carousels/stufen__meisterschaft/slide-06.webp",
      "/vorlagen/carousels/stufen__meisterschaft/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/stufen__meisterschaft.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "schoepferkraft",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/stufen__schoepferkraft/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/stufen__schoepferkraft/slide-01.webp",
      "/vorlagen/carousels/stufen__schoepferkraft/slide-02.webp",
      "/vorlagen/carousels/stufen__schoepferkraft/slide-03.webp",
      "/vorlagen/carousels/stufen__schoepferkraft/slide-04.webp",
      "/vorlagen/carousels/stufen__schoepferkraft/slide-05.webp",
      "/vorlagen/carousels/stufen__schoepferkraft/slide-06.webp",
      "/vorlagen/carousels/stufen__schoepferkraft/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/stufen__schoepferkraft.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "selbstbeobachtung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/stufen__selbstbeobachtung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/stufen__selbstbeobachtung/slide-01.webp",
      "/vorlagen/carousels/stufen__selbstbeobachtung/slide-02.webp",
      "/vorlagen/carousels/stufen__selbstbeobachtung/slide-03.webp",
      "/vorlagen/carousels/stufen__selbstbeobachtung/slide-04.webp",
      "/vorlagen/carousels/stufen__selbstbeobachtung/slide-05.webp",
      "/vorlagen/carousels/stufen__selbstbeobachtung/slide-06.webp",
      "/vorlagen/carousels/stufen__selbstbeobachtung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/stufen__selbstbeobachtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "automatische gedanken",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__automatische-gedanken/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__automatische-gedanken/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__automatische-gedanken/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__automatische-gedanken/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__automatische-gedanken/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__automatische-gedanken/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__automatische-gedanken/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__automatische-gedanken/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__automatische-gedanken.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der innere kritiker",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__der-innere-kritiker/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__der-innere-kritiker/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__der-innere-kritiker/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__der-innere-kritiker/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__der-innere-kritiker/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__der-innere-kritiker/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__der-innere-kritiker/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__der-innere-kritiker/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__der-innere-kritiker.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "die reiz reaktions luecke",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "emotionsregulation",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__emotionsregulation/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__emotionsregulation/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__emotionsregulation/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__emotionsregulation/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__emotionsregulation/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__emotionsregulation/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__emotionsregulation/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__emotionsregulation/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__emotionsregulation.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "gruebeln und gedankenkreisen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "integration und weitergabe",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__integration-und-weitergabe/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__integration-und-weitergabe/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__integration-und-weitergabe/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__integration-und-weitergabe/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__integration-und-weitergabe/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__integration-und-weitergabe/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__integration-und-weitergabe/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__integration-und-weitergabe/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__integration-und-weitergabe.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kernueberzeugungen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__kernueberzeugungen/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__kernueberzeugungen/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__kernueberzeugungen/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__kernueberzeugungen/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__kernueberzeugungen/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__kernueberzeugungen/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__kernueberzeugungen/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__kernueberzeugungen/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__kernueberzeugungen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive verzerrungen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "konditionierung",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__konditionierung/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__konditionierung/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__konditionierung/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__konditionierung/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__konditionierung/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__konditionierung/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__konditionierung/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__konditionierung/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__konditionierung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "muster koerper und gesundheit",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "neuroplastizitaet",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__neuroplastizitaet/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__neuroplastizitaet/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__neuroplastizitaet/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__neuroplastizitaet/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__neuroplastizitaet/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__neuroplastizitaet/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__neuroplastizitaet/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__neuroplastizitaet/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__neuroplastizitaet.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "selbstmitgefuehl",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__selbstmitgefuehl/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__selbstmitgefuehl/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__selbstmitgefuehl/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__selbstmitgefuehl/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__selbstmitgefuehl/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__selbstmitgefuehl/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__selbstmitgefuehl/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__selbstmitgefuehl/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__selbstmitgefuehl.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "werte und ziele",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/carousels/vertiefungen__werte-und-ziele/slide-01.webp",
    "slidePaths": [
      "/vorlagen/carousels/vertiefungen__werte-und-ziele/slide-01.webp",
      "/vorlagen/carousels/vertiefungen__werte-und-ziele/slide-02.webp",
      "/vorlagen/carousels/vertiefungen__werte-und-ziele/slide-03.webp",
      "/vorlagen/carousels/vertiefungen__werte-und-ziele/slide-04.webp",
      "/vorlagen/carousels/vertiefungen__werte-und-ziele/slide-05.webp",
      "/vorlagen/carousels/vertiefungen__werte-und-ziele/slide-06.webp",
      "/vorlagen/carousels/vertiefungen__werte-und-ziele/slide-07.webp"
    ],
    "href": "/vorlagen/carousels/vertiefungen__werte-und-ziele.zip"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan 7 Stufen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/vorlagen/workshop/WMDG-Moderationsplan-7-Stufen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook 7 Stufen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/vorlagen/workshop/WMDG-Workbook-7-Stufen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop 7 Stufen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 2.2,
    "href": "/vorlagen/workshop/WMDG-Workshop-7-Stufen.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Praesentationsvorlage",
    "unterKategorie": "Universell",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 1.8,
    "href": "/vorlagen/workshop/WMDG-Praesentationsvorlage.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Mentale Selbstverteidigung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/vorlagen/workshop/WMDG-Moderationsplan-Mentale-Selbstverteidigung.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Mentale Selbstverteidigung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/vorlagen/workshop/WMDG-Workbook-Mentale-Selbstverteidigung.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Mentale Selbstverteidigung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 2.4,
    "href": "/vorlagen/workshop/WMDG-Workshop-Mentale-Selbstverteidigung.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Praxis Werkzeugkasten",
    "unterKategorie": "Praxis-Werkzeugkasten",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/vorlagen/workshop/WMDG-Moderationsplan-Praxis-Werkzeugkasten.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Praxis Werkzeugkasten",
    "unterKategorie": "Praxis-Werkzeugkasten",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/vorlagen/workshop/WMDG-Workbook-Praxis-Werkzeugkasten.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Praxis Werkzeugkasten",
    "unterKategorie": "Praxis-Werkzeugkasten",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 2.4,
    "href": "/vorlagen/workshop/WMDG-Workshop-Praxis-Werkzeugkasten.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Vertiefungen Kopf verstehen",
    "unterKategorie": "Deinen Kopf verstehen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/vorlagen/workshop/WMDG-Moderationsplan-Vertiefungen-Kopf-verstehen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workbook Vertiefungen Kopf verstehen",
    "unterKategorie": "Deinen Kopf verstehen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/vorlagen/workshop/WMDG-Workbook-Vertiefungen-Kopf-verstehen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Workshop Vertiefungen Kopf verstehen",
    "unterKategorie": "Deinen Kopf verstehen",
    "kind": "file",
    "format": "PPTX",
    "sizeMB": 2.4,
    "href": "/vorlagen/workshop/WMDG-Workshop-Vertiefungen-Kopf-verstehen.pptx"
  }
];
