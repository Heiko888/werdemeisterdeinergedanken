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
    "thumb": "/vorlagen/thumbs/carousels/praxis__4-6-atmung.webp",
    "href": "/vorlagen/carousels/praxis__4-6-atmung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "abend reflexion",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__abend-reflexion.webp",
    "href": "/vorlagen/carousels/praxis__abend-reflexion.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "atembeobachtung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__atembeobachtung.webp",
    "href": "/vorlagen/carousels/praxis__atembeobachtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "body scan",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__body-scan.webp",
    "href": "/vorlagen/carousels/praxis__body-scan.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "box breathing",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__box-breathing.webp",
    "href": "/vorlagen/carousels/praxis__box-breathing.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der autopilot check",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__der-autopilot-check.webp",
    "href": "/vorlagen/carousels/praxis__der-autopilot-check.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der innere beobachter",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__der-innere-beobachter.webp",
    "href": "/vorlagen/carousels/praxis__der-innere-beobachter.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "die taegliche rueckkehr",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__die-taegliche-rueckkehr.webp",
    "href": "/vorlagen/carousels/praxis__die-taegliche-rueckkehr.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "herz kohaerenz",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__herz-kohaerenz.webp",
    "href": "/vorlagen/carousels/praxis__herz-kohaerenz.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "loslass ritual",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__loslass-ritual.webp",
    "href": "/vorlagen/carousels/praxis__loslass-ritual.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "morgen ausrichtung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__morgen-ausrichtung.webp",
    "href": "/vorlagen/carousels/praxis__morgen-ausrichtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "praesenz spaziergang",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__praesenz-spaziergang.webp",
    "href": "/vorlagen/carousels/praxis__praesenz-spaziergang.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "verlaengertes ausatmen",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.2,
    "thumb": "/vorlagen/thumbs/carousels/praxis__verlaengertes-ausatmen.webp",
    "href": "/vorlagen/carousels/praxis__verlaengertes-ausatmen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "ablenkung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__ablenkung.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__ablenkung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "algorithmen",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__algorithmen.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__algorithmen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "angst steuerung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__angst-steuerung.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__angst-steuerung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "autoritaetshoerigkeit",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__autoritaetshoerigkeit.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__autoritaetshoerigkeit.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "bildmacht",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__bildmacht.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__bildmacht.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "framing",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__framing.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__framing.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "gruppendruck",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__gruppendruck.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__gruppendruck.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "identitaet und meinung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__identitaet-und-meinung.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__identitaet-und-meinung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive dissonanz",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__kognitive-dissonanz.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__kognitive-dissonanz.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "medien agenda",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__medien-agenda.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__medien-agenda.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "normalisierung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__normalisierung.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__normalisierung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "propaganda",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__propaganda.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__propaganda.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "reizueberflutung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__reizueberflutung.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__reizueberflutung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "sprache und etiketten",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__sprache-und-etiketten.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__sprache-und-etiketten.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "werbung und mangel",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__werbung-und-mangel.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__werbung-und-mangel.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "wiederholung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/selbstverteidigung__wiederholung.webp",
    "href": "/vorlagen/carousels/selbstverteidigung__wiederholung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "autopilot",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/stufen__autopilot.webp",
    "href": "/vorlagen/carousels/stufen__autopilot.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "emotionale reifung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/stufen__emotionale-reifung.webp",
    "href": "/vorlagen/carousels/stufen__emotionale-reifung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "erwachen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/stufen__erwachen.webp",
    "href": "/vorlagen/carousels/stufen__erwachen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "innere ausrichtung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/stufen__innere-ausrichtung.webp",
    "href": "/vorlagen/carousels/stufen__innere-ausrichtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "meisterschaft",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/stufen__meisterschaft.webp",
    "href": "/vorlagen/carousels/stufen__meisterschaft.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "schoepferkraft",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/stufen__schoepferkraft.webp",
    "href": "/vorlagen/carousels/stufen__schoepferkraft.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "selbstbeobachtung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/stufen__selbstbeobachtung.webp",
    "href": "/vorlagen/carousels/stufen__selbstbeobachtung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "automatische gedanken",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__automatische-gedanken.webp",
    "href": "/vorlagen/carousels/vertiefungen__automatische-gedanken.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "der innere kritiker",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__der-innere-kritiker.webp",
    "href": "/vorlagen/carousels/vertiefungen__der-innere-kritiker.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "die reiz reaktions luecke",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__die-reiz-reaktions-luecke.webp",
    "href": "/vorlagen/carousels/vertiefungen__die-reiz-reaktions-luecke.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "emotionsregulation",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__emotionsregulation.webp",
    "href": "/vorlagen/carousels/vertiefungen__emotionsregulation.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "gruebeln und gedankenkreisen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__gruebeln-und-gedankenkreisen.webp",
    "href": "/vorlagen/carousels/vertiefungen__gruebeln-und-gedankenkreisen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "integration und weitergabe",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__integration-und-weitergabe.webp",
    "href": "/vorlagen/carousels/vertiefungen__integration-und-weitergabe.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kernueberzeugungen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__kernueberzeugungen.webp",
    "href": "/vorlagen/carousels/vertiefungen__kernueberzeugungen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive verzerrungen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__kognitive-verzerrungen.webp",
    "href": "/vorlagen/carousels/vertiefungen__kognitive-verzerrungen.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "konditionierung",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__konditionierung.webp",
    "href": "/vorlagen/carousels/vertiefungen__konditionierung.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "muster koerper und gesundheit",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__muster-koerper-und-gesundheit.webp",
    "href": "/vorlagen/carousels/vertiefungen__muster-koerper-und-gesundheit.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "neuroplastizitaet",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__neuroplastizitaet.webp",
    "href": "/vorlagen/carousels/vertiefungen__neuroplastizitaet.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "selbstmitgefuehl",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__selbstmitgefuehl.webp",
    "href": "/vorlagen/carousels/vertiefungen__selbstmitgefuehl.zip"
  },
  {
    "kategorie": "carousel",
    "titel": "werte und ziele",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 0.3,
    "thumb": "/vorlagen/thumbs/carousels/vertiefungen__werte-und-ziele.webp",
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
