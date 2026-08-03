/**
 * AUTO-GENERIERT von tools/vorlagen/build-gallery.mjs – NICHT von Hand ändern.
 * Neu erzeugen mit:  npm run vorlagen:galerie
 *
 * Liste aller Vorlagen-Dateien, die unter public/vorlagen/ veröffentlicht sind
 * und im Dashboard (/admin/vorlagen) als Galerie erscheinen.
 */

export type VorlagenAsset = {
  kategorie: "social" | "reels" | "workshop";
  titel: string;
  unterKategorie: string;
  kind: "image" | "file";
  /** Nur bei kind === "image": kleines Vorschaubild. */
  thumb?: string;
  /** Download-/Ansehen-Link (liegt unter public/). */
  href: string;
  /** Nur bei kind === "file". */
  format?: string;
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
