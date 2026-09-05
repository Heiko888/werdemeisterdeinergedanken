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
  /** Fertige Post-Caption zum Kopieren (Marketing- & Studio-Carousels). */
  caption?: string;
  /** Mehrere einzeln kopierbare Captions (z. B. Reel-Varianten A/B/C je Stufe). */
  captions?: { label: string; titel?: string; text: string }[];
  /** Nur bei kind === "carousel": enthaltene Formate (Label + Pixelmaße). */
  formate?: { label: string; w: number; h: number }[];
  /** Nur bei kind === "image": Pixelmaße + Seitenverhältnis der Grafik. */
  masse?: { label: string; w: number; h: number };
  /** Optionaler Zusatz-Download, z. B. Reel-Cover als ZIP mit allen Formaten. */
  zipHref?: string;
  sizeMB?: number;
};

export const vorlagenAssets: VorlagenAsset[] = [
  {
    "kategorie": "social",
    "titel": "hintergrund hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-001.webp",
    "href": "/admin/vorlagen/datei/social/social-001.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-002.webp",
    "href": "/admin/vorlagen/datei/social/social-002.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-003.webp",
    "href": "/admin/vorlagen/datei/social/social-003.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-004.webp",
    "href": "/admin/vorlagen/datei/social/social-004.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-005.webp",
    "href": "/admin/vorlagen/datei/social/social-005.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-006.webp",
    "href": "/admin/vorlagen/datei/social/social-006.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-007.webp",
    "href": "/admin/vorlagen/datei/social/social-007.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-008.webp",
    "href": "/admin/vorlagen/datei/social/social-008.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-009.webp",
    "href": "/admin/vorlagen/datei/social/social-009.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-010.webp",
    "href": "/admin/vorlagen/datei/social/social-010.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-011.webp",
    "href": "/admin/vorlagen/datei/social/social-011.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-012.webp",
    "href": "/admin/vorlagen/datei/social/social-012.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-013.webp",
    "href": "/admin/vorlagen/datei/social/social-013.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-014.webp",
    "href": "/admin/vorlagen/datei/social/social-014.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-015.webp",
    "href": "/admin/vorlagen/datei/social/social-015.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-016.webp",
    "href": "/admin/vorlagen/datei/social/social-016.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-017.webp",
    "href": "/admin/vorlagen/datei/social/social-017.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-018.webp",
    "href": "/admin/vorlagen/datei/social/social-018.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-019.webp",
    "href": "/admin/vorlagen/datei/social/social-019.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-020.webp",
    "href": "/admin/vorlagen/datei/social/social-020.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-021.webp",
    "href": "/admin/vorlagen/datei/social/social-021.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-022.webp",
    "href": "/admin/vorlagen/datei/social/social-022.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-023.webp",
    "href": "/admin/vorlagen/datei/social/social-023.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-024.webp",
    "href": "/admin/vorlagen/datei/social/social-024.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-025.webp",
    "href": "/admin/vorlagen/datei/social/social-025.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-026.webp",
    "href": "/admin/vorlagen/datei/social/social-026.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-027.webp",
    "href": "/admin/vorlagen/datei/social/social-027.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-028.webp",
    "href": "/admin/vorlagen/datei/social/social-028.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-029.webp",
    "href": "/admin/vorlagen/datei/social/social-029.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-030.webp",
    "href": "/admin/vorlagen/datei/social/social-030.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-031.webp",
    "href": "/admin/vorlagen/datei/social/social-031.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-032.webp",
    "href": "/admin/vorlagen/datei/social/social-032.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-033.webp",
    "href": "/admin/vorlagen/datei/social/social-033.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-034.webp",
    "href": "/admin/vorlagen/datei/social/social-034.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-035.webp",
    "href": "/admin/vorlagen/datei/social/social-035.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-036.webp",
    "href": "/admin/vorlagen/datei/social/social-036.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-037.webp",
    "href": "/admin/vorlagen/datei/social/social-037.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-038.webp",
    "href": "/admin/vorlagen/datei/social/social-038.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-039.webp",
    "href": "/admin/vorlagen/datei/social/social-039.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-040.webp",
    "href": "/admin/vorlagen/datei/social/social-040.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-041.webp",
    "href": "/admin/vorlagen/datei/social/social-041.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-042.webp",
    "href": "/admin/vorlagen/datei/social/social-042.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-043.webp",
    "href": "/admin/vorlagen/datei/social/social-043.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-044.webp",
    "href": "/admin/vorlagen/datei/social/social-044.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-045.webp",
    "href": "/admin/vorlagen/datei/social/social-045.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-046.webp",
    "href": "/admin/vorlagen/datei/social/social-046.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-047.webp",
    "href": "/admin/vorlagen/datei/social/social-047.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-048.webp",
    "href": "/admin/vorlagen/datei/social/social-048.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-049.webp",
    "href": "/admin/vorlagen/datei/social/social-049.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-050.webp",
    "href": "/admin/vorlagen/datei/social/social-050.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-051.webp",
    "href": "/admin/vorlagen/datei/social/social-051.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-052.webp",
    "href": "/admin/vorlagen/datei/social/social-052.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-053.webp",
    "href": "/admin/vorlagen/datei/social/social-053.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-054.webp",
    "href": "/admin/vorlagen/datei/social/social-054.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-055.webp",
    "href": "/admin/vorlagen/datei/social/social-055.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-056.webp",
    "href": "/admin/vorlagen/datei/social/social-056.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-057.webp",
    "href": "/admin/vorlagen/datei/social/social-057.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-058.webp",
    "href": "/admin/vorlagen/datei/social/social-058.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-059.webp",
    "href": "/admin/vorlagen/datei/social/social-059.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-060.webp",
    "href": "/admin/vorlagen/datei/social/social-060.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-061.webp",
    "href": "/admin/vorlagen/datei/social/social-061.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-062.webp",
    "href": "/admin/vorlagen/datei/social/social-062.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-063.webp",
    "href": "/admin/vorlagen/datei/social/social-063.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-064.webp",
    "href": "/admin/vorlagen/datei/social/social-064.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-065.webp",
    "href": "/admin/vorlagen/datei/social/social-065.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-066.webp",
    "href": "/admin/vorlagen/datei/social/social-066.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-067.webp",
    "href": "/admin/vorlagen/datei/social/social-067.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-068.webp",
    "href": "/admin/vorlagen/datei/social/social-068.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-069.webp",
    "href": "/admin/vorlagen/datei/social/social-069.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-070.webp",
    "href": "/admin/vorlagen/datei/social/social-070.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-071.webp",
    "href": "/admin/vorlagen/datei/social/social-071.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-072.webp",
    "href": "/admin/vorlagen/datei/social/social-072.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-073.webp",
    "href": "/admin/vorlagen/datei/social/social-073.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-074.webp",
    "href": "/admin/vorlagen/datei/social/social-074.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-075.webp",
    "href": "/admin/vorlagen/datei/social/social-075.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-076.webp",
    "href": "/admin/vorlagen/datei/social/social-076.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-077.webp",
    "href": "/admin/vorlagen/datei/social/social-077.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-078.webp",
    "href": "/admin/vorlagen/datei/social/social-078.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-079.webp",
    "href": "/admin/vorlagen/datei/social/social-079.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-080.webp",
    "href": "/admin/vorlagen/datei/social/social-080.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-081.webp",
    "href": "/admin/vorlagen/datei/social/social-081.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-082.webp",
    "href": "/admin/vorlagen/datei/social/social-082.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-083.webp",
    "href": "/admin/vorlagen/datei/social/social-083.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-084.webp",
    "href": "/admin/vorlagen/datei/social/social-084.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-085.webp",
    "href": "/admin/vorlagen/datei/social/social-085.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-086.webp",
    "href": "/admin/vorlagen/datei/social/social-086.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-087.webp",
    "href": "/admin/vorlagen/datei/social/social-087.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-088.webp",
    "href": "/admin/vorlagen/datei/social/social-088.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-089.webp",
    "href": "/admin/vorlagen/datei/social/social-089.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-090.webp",
    "href": "/admin/vorlagen/datei/social/social-090.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-091.webp",
    "href": "/admin/vorlagen/datei/social/social-091.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-092.webp",
    "href": "/admin/vorlagen/datei/social/social-092.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-093.webp",
    "href": "/admin/vorlagen/datei/social/social-093.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-094.webp",
    "href": "/admin/vorlagen/datei/social/social-094.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-095.webp",
    "href": "/admin/vorlagen/datei/social/social-095.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-096.webp",
    "href": "/admin/vorlagen/datei/social/social-096.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-097.webp",
    "href": "/admin/vorlagen/datei/social/social-097.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-098.webp",
    "href": "/admin/vorlagen/datei/social/social-098.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-099.webp",
    "href": "/admin/vorlagen/datei/social/social-099.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-100.webp",
    "href": "/admin/vorlagen/datei/social/social-100.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-101.webp",
    "href": "/admin/vorlagen/datei/social/social-101.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-102.webp",
    "href": "/admin/vorlagen/datei/social/social-102.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-103.webp",
    "href": "/admin/vorlagen/datei/social/social-103.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-104.webp",
    "href": "/admin/vorlagen/datei/social/social-104.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-105.webp",
    "href": "/admin/vorlagen/datei/social/social-105.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-106.webp",
    "href": "/admin/vorlagen/datei/social/social-106.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-107.webp",
    "href": "/admin/vorlagen/datei/social/social-107.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-108.webp",
    "href": "/admin/vorlagen/datei/social/social-108.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-109.webp",
    "href": "/admin/vorlagen/datei/social/social-109.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-110.webp",
    "href": "/admin/vorlagen/datei/social/social-110.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-111.webp",
    "href": "/admin/vorlagen/datei/social/social-111.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-112.webp",
    "href": "/admin/vorlagen/datei/social/social-112.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-113.webp",
    "href": "/admin/vorlagen/datei/social/social-113.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-114.webp",
    "href": "/admin/vorlagen/datei/social/social-114.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-115.webp",
    "href": "/admin/vorlagen/datei/social/social-115.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-116.webp",
    "href": "/admin/vorlagen/datei/social/social-116.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-117.webp",
    "href": "/admin/vorlagen/datei/social/social-117.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-118.webp",
    "href": "/admin/vorlagen/datei/social/social-118.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-119.webp",
    "href": "/admin/vorlagen/datei/social/social-119.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-120.webp",
    "href": "/admin/vorlagen/datei/social/social-120.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-121.webp",
    "href": "/admin/vorlagen/datei/social/social-121.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-122.webp",
    "href": "/admin/vorlagen/datei/social/social-122.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-123.webp",
    "href": "/admin/vorlagen/datei/social/social-123.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-124.webp",
    "href": "/admin/vorlagen/datei/social/social-124.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-125.webp",
    "href": "/admin/vorlagen/datei/social/social-125.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-126.webp",
    "href": "/admin/vorlagen/datei/social/social-126.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-127.webp",
    "href": "/admin/vorlagen/datei/social/social-127.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-128.webp",
    "href": "/admin/vorlagen/datei/social/social-128.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-129.webp",
    "href": "/admin/vorlagen/datei/social/social-129.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-130.webp",
    "href": "/admin/vorlagen/datei/social/social-130.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-131.webp",
    "href": "/admin/vorlagen/datei/social/social-131.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-132.webp",
    "href": "/admin/vorlagen/datei/social/social-132.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-133.webp",
    "href": "/admin/vorlagen/datei/social/social-133.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-134.webp",
    "href": "/admin/vorlagen/datei/social/social-134.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-135.webp",
    "href": "/admin/vorlagen/datei/social/social-135.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-136.webp",
    "href": "/admin/vorlagen/datei/social/social-136.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-137.webp",
    "href": "/admin/vorlagen/datei/social/social-137.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-138.webp",
    "href": "/admin/vorlagen/datei/social/social-138.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-139.webp",
    "href": "/admin/vorlagen/datei/social/social-139.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-140.webp",
    "href": "/admin/vorlagen/datei/social/social-140.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-141.webp",
    "href": "/admin/vorlagen/datei/social/social-141.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-142.webp",
    "href": "/admin/vorlagen/datei/social/social-142.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-143.webp",
    "href": "/admin/vorlagen/datei/social/social-143.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-144.webp",
    "href": "/admin/vorlagen/datei/social/social-144.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-145.webp",
    "href": "/admin/vorlagen/datei/social/social-145.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-146.webp",
    "href": "/admin/vorlagen/datei/social/social-146.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-147.webp",
    "href": "/admin/vorlagen/datei/social/social-147.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-148.webp",
    "href": "/admin/vorlagen/datei/social/social-148.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-149.webp",
    "href": "/admin/vorlagen/datei/social/social-149.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-150.webp",
    "href": "/admin/vorlagen/datei/social/social-150.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-151.webp",
    "href": "/admin/vorlagen/datei/social/social-151.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-152.webp",
    "href": "/admin/vorlagen/datei/social/social-152.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-153.webp",
    "href": "/admin/vorlagen/datei/social/social-153.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-154.webp",
    "href": "/admin/vorlagen/datei/social/social-154.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-155.webp",
    "href": "/admin/vorlagen/datei/social/social-155.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-156.webp",
    "href": "/admin/vorlagen/datei/social/social-156.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-157.webp",
    "href": "/admin/vorlagen/datei/social/social-157.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-158.webp",
    "href": "/admin/vorlagen/datei/social/social-158.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-159.webp",
    "href": "/admin/vorlagen/datei/social/social-159.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-160.webp",
    "href": "/admin/vorlagen/datei/social/social-160.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-161.webp",
    "href": "/admin/vorlagen/datei/social/social-161.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-162.webp",
    "href": "/admin/vorlagen/datei/social/social-162.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-163.webp",
    "href": "/admin/vorlagen/datei/social/social-163.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-164.webp",
    "href": "/admin/vorlagen/datei/social/social-164.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-165.webp",
    "href": "/admin/vorlagen/datei/social/social-165.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-166.webp",
    "href": "/admin/vorlagen/datei/social/social-166.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-167.webp",
    "href": "/admin/vorlagen/datei/social/social-167.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-168.webp",
    "href": "/admin/vorlagen/datei/social/social-168.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-169.webp",
    "href": "/admin/vorlagen/datei/social/social-169.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-170.webp",
    "href": "/admin/vorlagen/datei/social/social-170.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-171.webp",
    "href": "/admin/vorlagen/datei/social/social-171.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-172.webp",
    "href": "/admin/vorlagen/datei/social/social-172.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-173.webp",
    "href": "/admin/vorlagen/datei/social/social-173.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-174.webp",
    "href": "/admin/vorlagen/datei/social/social-174.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-175.webp",
    "href": "/admin/vorlagen/datei/social/social-175.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-176.webp",
    "href": "/admin/vorlagen/datei/social/social-176.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-177.webp",
    "href": "/admin/vorlagen/datei/social/social-177.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-178.webp",
    "href": "/admin/vorlagen/datei/social/social-178.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-179.webp",
    "href": "/admin/vorlagen/datei/social/social-179.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-180.webp",
    "href": "/admin/vorlagen/datei/social/social-180.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-181.webp",
    "href": "/admin/vorlagen/datei/social/social-181.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-182.webp",
    "href": "/admin/vorlagen/datei/social/social-182.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-183.webp",
    "href": "/admin/vorlagen/datei/social/social-183.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-184.webp",
    "href": "/admin/vorlagen/datei/social/social-184.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-185.webp",
    "href": "/admin/vorlagen/datei/social/social-185.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-186.webp",
    "href": "/admin/vorlagen/datei/social/social-186.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-187.webp",
    "href": "/admin/vorlagen/datei/social/social-187.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-188.webp",
    "href": "/admin/vorlagen/datei/social/social-188.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-189.webp",
    "href": "/admin/vorlagen/datei/social/social-189.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-190.webp",
    "href": "/admin/vorlagen/datei/social/social-190.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-191.webp",
    "href": "/admin/vorlagen/datei/social/social-191.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-192.webp",
    "href": "/admin/vorlagen/datei/social/social-192.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-193.webp",
    "href": "/admin/vorlagen/datei/social/social-193.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-194.webp",
    "href": "/admin/vorlagen/datei/social/social-194.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-195.webp",
    "href": "/admin/vorlagen/datei/social/social-195.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-196.webp",
    "href": "/admin/vorlagen/datei/social/social-196.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-197.webp",
    "href": "/admin/vorlagen/datei/social/social-197.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-198.webp",
    "href": "/admin/vorlagen/datei/social/social-198.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-199.webp",
    "href": "/admin/vorlagen/datei/social/social-199.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-200.webp",
    "href": "/admin/vorlagen/datei/social/social-200.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-201.webp",
    "href": "/admin/vorlagen/datei/social/social-201.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-202.webp",
    "href": "/admin/vorlagen/datei/social/social-202.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-203.webp",
    "href": "/admin/vorlagen/datei/social/social-203.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-204.webp",
    "href": "/admin/vorlagen/datei/social/social-204.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-205.webp",
    "href": "/admin/vorlagen/datei/social/social-205.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-206.webp",
    "href": "/admin/vorlagen/datei/social/social-206.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-207.webp",
    "href": "/admin/vorlagen/datei/social/social-207.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-208.webp",
    "href": "/admin/vorlagen/datei/social/social-208.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-209.webp",
    "href": "/admin/vorlagen/datei/social/social-209.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-210.webp",
    "href": "/admin/vorlagen/datei/social/social-210.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-211.webp",
    "href": "/admin/vorlagen/datei/social/social-211.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-212.webp",
    "href": "/admin/vorlagen/datei/social/social-212.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-213.webp",
    "href": "/admin/vorlagen/datei/social/social-213.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-214.webp",
    "href": "/admin/vorlagen/datei/social/social-214.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-215.webp",
    "href": "/admin/vorlagen/datei/social/social-215.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-216.webp",
    "href": "/admin/vorlagen/datei/social/social-216.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-217.webp",
    "href": "/admin/vorlagen/datei/social/social-217.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-218.webp",
    "href": "/admin/vorlagen/datei/social/social-218.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-219.webp",
    "href": "/admin/vorlagen/datei/social/social-219.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-220.webp",
    "href": "/admin/vorlagen/datei/social/social-220.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-221.webp",
    "href": "/admin/vorlagen/datei/social/social-221.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-222.webp",
    "href": "/admin/vorlagen/datei/social/social-222.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-223.webp",
    "href": "/admin/vorlagen/datei/social/social-223.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-224.webp",
    "href": "/admin/vorlagen/datei/social/social-224.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-225.webp",
    "href": "/admin/vorlagen/datei/social/social-225.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-226.webp",
    "href": "/admin/vorlagen/datei/social/social-226.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-227.webp",
    "href": "/admin/vorlagen/datei/social/social-227.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-228.webp",
    "href": "/admin/vorlagen/datei/social/social-228.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-229.webp",
    "href": "/admin/vorlagen/datei/social/social-229.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-230.webp",
    "href": "/admin/vorlagen/datei/social/social-230.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-231.webp",
    "href": "/admin/vorlagen/datei/social/social-231.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-232.webp",
    "href": "/admin/vorlagen/datei/social/social-232.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-233.webp",
    "href": "/admin/vorlagen/datei/social/social-233.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-234.webp",
    "href": "/admin/vorlagen/datei/social/social-234.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-235.webp",
    "href": "/admin/vorlagen/datei/social/social-235.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-236.webp",
    "href": "/admin/vorlagen/datei/social/social-236.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-237.webp",
    "href": "/admin/vorlagen/datei/social/social-237.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-238.webp",
    "href": "/admin/vorlagen/datei/social/social-238.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-239.webp",
    "href": "/admin/vorlagen/datei/social/social-239.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-240.webp",
    "href": "/admin/vorlagen/datei/social/social-240.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-241.webp",
    "href": "/admin/vorlagen/datei/social/social-241.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-242.webp",
    "href": "/admin/vorlagen/datei/social/social-242.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-243.webp",
    "href": "/admin/vorlagen/datei/social/social-243.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-244.webp",
    "href": "/admin/vorlagen/datei/social/social-244.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-245.webp",
    "href": "/admin/vorlagen/datei/social/social-245.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-246.webp",
    "href": "/admin/vorlagen/datei/social/social-246.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-247.webp",
    "href": "/admin/vorlagen/datei/social/social-247.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-248.webp",
    "href": "/admin/vorlagen/datei/social/social-248.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-249.webp",
    "href": "/admin/vorlagen/datei/social/social-249.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-250.webp",
    "href": "/admin/vorlagen/datei/social/social-250.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-251.webp",
    "href": "/admin/vorlagen/datei/social/social-251.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-252.webp",
    "href": "/admin/vorlagen/datei/social/social-252.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-253.webp",
    "href": "/admin/vorlagen/datei/social/social-253.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-254.webp",
    "href": "/admin/vorlagen/datei/social/social-254.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-255.webp",
    "href": "/admin/vorlagen/datei/social/social-255.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-256.webp",
    "href": "/admin/vorlagen/datei/social/social-256.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-257.webp",
    "href": "/admin/vorlagen/datei/social/social-257.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-258.webp",
    "href": "/admin/vorlagen/datei/social/social-258.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-259.webp",
    "href": "/admin/vorlagen/datei/social/social-259.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-260.webp",
    "href": "/admin/vorlagen/datei/social/social-260.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-261.webp",
    "href": "/admin/vorlagen/datei/social/social-261.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-262.webp",
    "href": "/admin/vorlagen/datei/social/social-262.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-263.webp",
    "href": "/admin/vorlagen/datei/social/social-263.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-264.webp",
    "href": "/admin/vorlagen/datei/social/social-264.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-265.webp",
    "href": "/admin/vorlagen/datei/social/social-265.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-266.webp",
    "href": "/admin/vorlagen/datei/social/social-266.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-267.webp",
    "href": "/admin/vorlagen/datei/social/social-267.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-268.webp",
    "href": "/admin/vorlagen/datei/social/social-268.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-269.webp",
    "href": "/admin/vorlagen/datei/social/social-269.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-270.webp",
    "href": "/admin/vorlagen/datei/social/social-270.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-271.webp",
    "href": "/admin/vorlagen/datei/social/social-271.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-272.webp",
    "href": "/admin/vorlagen/datei/social/social-272.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-273.webp",
    "href": "/admin/vorlagen/datei/social/social-273.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-274.webp",
    "href": "/admin/vorlagen/datei/social/social-274.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-275.webp",
    "href": "/admin/vorlagen/datei/social/social-275.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-276.webp",
    "href": "/admin/vorlagen/datei/social/social-276.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-277.webp",
    "href": "/admin/vorlagen/datei/social/social-277.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-278.webp",
    "href": "/admin/vorlagen/datei/social/social-278.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-279.webp",
    "href": "/admin/vorlagen/datei/social/social-279.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-280.webp",
    "href": "/admin/vorlagen/datei/social/social-280.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-281.webp",
    "href": "/admin/vorlagen/datei/social/social-281.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-282.webp",
    "href": "/admin/vorlagen/datei/social/social-282.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-283.webp",
    "href": "/admin/vorlagen/datei/social/social-283.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-284.webp",
    "href": "/admin/vorlagen/datei/social/social-284.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-285.webp",
    "href": "/admin/vorlagen/datei/social/social-285.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-286.webp",
    "href": "/admin/vorlagen/datei/social/social-286.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-287.webp",
    "href": "/admin/vorlagen/datei/social/social-287.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-288.webp",
    "href": "/admin/vorlagen/datei/social/social-288.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-289.webp",
    "href": "/admin/vorlagen/datei/social/social-289.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-290.webp",
    "href": "/admin/vorlagen/datei/social/social-290.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-291.webp",
    "href": "/admin/vorlagen/datei/social/social-291.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-292.webp",
    "href": "/admin/vorlagen/datei/social/social-292.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-293.webp",
    "href": "/admin/vorlagen/datei/social/social-293.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-294.webp",
    "href": "/admin/vorlagen/datei/social/social-294.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-295.webp",
    "href": "/admin/vorlagen/datei/social/social-295.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-296.webp",
    "href": "/admin/vorlagen/datei/social/social-296.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-297.webp",
    "href": "/admin/vorlagen/datei/social/social-297.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-298.webp",
    "href": "/admin/vorlagen/datei/social/social-298.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-299.webp",
    "href": "/admin/vorlagen/datei/social/social-299.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-300.webp",
    "href": "/admin/vorlagen/datei/social/social-300.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-301.webp",
    "href": "/admin/vorlagen/datei/social/social-301.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-302.webp",
    "href": "/admin/vorlagen/datei/social/social-302.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-303.webp",
    "href": "/admin/vorlagen/datei/social/social-303.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-304.webp",
    "href": "/admin/vorlagen/datei/social/social-304.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-305.webp",
    "href": "/admin/vorlagen/datei/social/social-305.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-306.webp",
    "href": "/admin/vorlagen/datei/social/social-306.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-307.webp",
    "href": "/admin/vorlagen/datei/social/social-307.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-308.webp",
    "href": "/admin/vorlagen/datei/social/social-308.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-309.webp",
    "href": "/admin/vorlagen/datei/social/social-309.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-310.webp",
    "href": "/admin/vorlagen/datei/social/social-310.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-311.webp",
    "href": "/admin/vorlagen/datei/social/social-311.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-312.webp",
    "href": "/admin/vorlagen/datei/social/social-312.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-313.webp",
    "href": "/admin/vorlagen/datei/social/social-313.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-314.webp",
    "href": "/admin/vorlagen/datei/social/social-314.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-315.webp",
    "href": "/admin/vorlagen/datei/social/social-315.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-316.webp",
    "href": "/admin/vorlagen/datei/social/social-316.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-317.webp",
    "href": "/admin/vorlagen/datei/social/social-317.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-318.webp",
    "href": "/admin/vorlagen/datei/social/social-318.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-319.webp",
    "href": "/admin/vorlagen/datei/social/social-319.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-320.webp",
    "href": "/admin/vorlagen/datei/social/social-320.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-321.webp",
    "href": "/admin/vorlagen/datei/social/social-321.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-322.webp",
    "href": "/admin/vorlagen/datei/social/social-322.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-323.webp",
    "href": "/admin/vorlagen/datei/social/social-323.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-324.webp",
    "href": "/admin/vorlagen/datei/social/social-324.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-325.webp",
    "href": "/admin/vorlagen/datei/social/social-325.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-326.webp",
    "href": "/admin/vorlagen/datei/social/social-326.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-327.webp",
    "href": "/admin/vorlagen/datei/social/social-327.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-328.webp",
    "href": "/admin/vorlagen/datei/social/social-328.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-329.webp",
    "href": "/admin/vorlagen/datei/social/social-329.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-330.webp",
    "href": "/admin/vorlagen/datei/social/social-330.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-331.webp",
    "href": "/admin/vorlagen/datei/social/social-331.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-332.webp",
    "href": "/admin/vorlagen/datei/social/social-332.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-333.webp",
    "href": "/admin/vorlagen/datei/social/social-333.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-334.webp",
    "href": "/admin/vorlagen/datei/social/social-334.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-335.webp",
    "href": "/admin/vorlagen/datei/social/social-335.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-336.webp",
    "href": "/admin/vorlagen/datei/social/social-336.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-337.webp",
    "href": "/admin/vorlagen/datei/social/social-337.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-338.webp",
    "href": "/admin/vorlagen/datei/social/social-338.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-339.webp",
    "href": "/admin/vorlagen/datei/social/social-339.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-340.webp",
    "href": "/admin/vorlagen/datei/social/social-340.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-341.webp",
    "href": "/admin/vorlagen/datei/social/social-341.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-342.webp",
    "href": "/admin/vorlagen/datei/social/social-342.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-343.webp",
    "href": "/admin/vorlagen/datei/social/social-343.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-344.webp",
    "href": "/admin/vorlagen/datei/social/social-344.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-345.webp",
    "href": "/admin/vorlagen/datei/social/social-345.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-346.webp",
    "href": "/admin/vorlagen/datei/social/social-346.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-347.webp",
    "href": "/admin/vorlagen/datei/social/social-347.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-348.webp",
    "href": "/admin/vorlagen/datei/social/social-348.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-349.webp",
    "href": "/admin/vorlagen/datei/social/social-349.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-350.webp",
    "href": "/admin/vorlagen/datei/social/social-350.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-351.webp",
    "href": "/admin/vorlagen/datei/social/social-351.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-352.webp",
    "href": "/admin/vorlagen/datei/social/social-352.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-353.webp",
    "href": "/admin/vorlagen/datei/social/social-353.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-354.webp",
    "href": "/admin/vorlagen/datei/social/social-354.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-355.webp",
    "href": "/admin/vorlagen/datei/social/social-355.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-356.webp",
    "href": "/admin/vorlagen/datei/social/social-356.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-357.webp",
    "href": "/admin/vorlagen/datei/social/social-357.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-358.webp",
    "href": "/admin/vorlagen/datei/social/social-358.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-359.webp",
    "href": "/admin/vorlagen/datei/social/social-359.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-360.webp",
    "href": "/admin/vorlagen/datei/social/social-360.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-361.webp",
    "href": "/admin/vorlagen/datei/social/social-361.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-362.webp",
    "href": "/admin/vorlagen/datei/social/social-362.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-363.webp",
    "href": "/admin/vorlagen/datei/social/social-363.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-364.webp",
    "href": "/admin/vorlagen/datei/social/social-364.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-365.webp",
    "href": "/admin/vorlagen/datei/social/social-365.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-366.webp",
    "href": "/admin/vorlagen/datei/social/social-366.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-367.webp",
    "href": "/admin/vorlagen/datei/social/social-367.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-368.webp",
    "href": "/admin/vorlagen/datei/social/social-368.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-369.webp",
    "href": "/admin/vorlagen/datei/social/social-369.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-370.webp",
    "href": "/admin/vorlagen/datei/social/social-370.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-371.webp",
    "href": "/admin/vorlagen/datei/social/social-371.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-372.webp",
    "href": "/admin/vorlagen/datei/social/social-372.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-373.webp",
    "href": "/admin/vorlagen/datei/social/social-373.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-374.webp",
    "href": "/admin/vorlagen/datei/social/social-374.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-375.webp",
    "href": "/admin/vorlagen/datei/social/social-375.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-376.webp",
    "href": "/admin/vorlagen/datei/social/social-376.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-377.webp",
    "href": "/admin/vorlagen/datei/social/social-377.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-378.webp",
    "href": "/admin/vorlagen/datei/social/social-378.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-379.webp",
    "href": "/admin/vorlagen/datei/social/social-379.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-380.webp",
    "href": "/admin/vorlagen/datei/social/social-380.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-381.webp",
    "href": "/admin/vorlagen/datei/social/social-381.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-382.webp",
    "href": "/admin/vorlagen/datei/social/social-382.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-383.webp",
    "href": "/admin/vorlagen/datei/social/social-383.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-384.webp",
    "href": "/admin/vorlagen/datei/social/social-384.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-385.webp",
    "href": "/admin/vorlagen/datei/social/social-385.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-386.webp",
    "href": "/admin/vorlagen/datei/social/social-386.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-387.webp",
    "href": "/admin/vorlagen/datei/social/social-387.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-388.webp",
    "href": "/admin/vorlagen/datei/social/social-388.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-389.webp",
    "href": "/admin/vorlagen/datei/social/social-389.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-390.webp",
    "href": "/admin/vorlagen/datei/social/social-390.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-391.webp",
    "href": "/admin/vorlagen/datei/social/social-391.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-392.webp",
    "href": "/admin/vorlagen/datei/social/social-392.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-393.webp",
    "href": "/admin/vorlagen/datei/social/social-393.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-394.webp",
    "href": "/admin/vorlagen/datei/social/social-394.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-395.webp",
    "href": "/admin/vorlagen/datei/social/social-395.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-396.webp",
    "href": "/admin/vorlagen/datei/social/social-396.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-397.webp",
    "href": "/admin/vorlagen/datei/social/social-397.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-398.webp",
    "href": "/admin/vorlagen/datei/social/social-398.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-399.webp",
    "href": "/admin/vorlagen/datei/social/social-399.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-400.webp",
    "href": "/admin/vorlagen/datei/social/social-400.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-401.webp",
    "href": "/admin/vorlagen/datei/social/social-401.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-402.webp",
    "href": "/admin/vorlagen/datei/social/social-402.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-403.webp",
    "href": "/admin/vorlagen/datei/social/social-403.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-404.webp",
    "href": "/admin/vorlagen/datei/social/social-404.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-405.webp",
    "href": "/admin/vorlagen/datei/social/social-405.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-406.webp",
    "href": "/admin/vorlagen/datei/social/social-406.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-407.webp",
    "href": "/admin/vorlagen/datei/social/social-407.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-408.webp",
    "href": "/admin/vorlagen/datei/social/social-408.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-409.webp",
    "href": "/admin/vorlagen/datei/social/social-409.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-410.webp",
    "href": "/admin/vorlagen/datei/social/social-410.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-411.webp",
    "href": "/admin/vorlagen/datei/social/social-411.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-412.webp",
    "href": "/admin/vorlagen/datei/social/social-412.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-413.webp",
    "href": "/admin/vorlagen/datei/social/social-413.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-414.webp",
    "href": "/admin/vorlagen/datei/social/social-414.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-415.webp",
    "href": "/admin/vorlagen/datei/social/social-415.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-416.webp",
    "href": "/admin/vorlagen/datei/social/social-416.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-417.webp",
    "href": "/admin/vorlagen/datei/social/social-417.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-418.webp",
    "href": "/admin/vorlagen/datei/social/social-418.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-419.webp",
    "href": "/admin/vorlagen/datei/social/social-419.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-420.webp",
    "href": "/admin/vorlagen/datei/social/social-420.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-421.webp",
    "href": "/admin/vorlagen/datei/social/social-421.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-422.webp",
    "href": "/admin/vorlagen/datei/social/social-422.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-423.webp",
    "href": "/admin/vorlagen/datei/social/social-423.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-424.webp",
    "href": "/admin/vorlagen/datei/social/social-424.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-425.webp",
    "href": "/admin/vorlagen/datei/social/social-425.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-426.webp",
    "href": "/admin/vorlagen/datei/social/social-426.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-427.webp",
    "href": "/admin/vorlagen/datei/social/social-427.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-428.webp",
    "href": "/admin/vorlagen/datei/social/social-428.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-429.webp",
    "href": "/admin/vorlagen/datei/social/social-429.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-430.webp",
    "href": "/admin/vorlagen/datei/social/social-430.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-431.webp",
    "href": "/admin/vorlagen/datei/social/social-431.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-432.webp",
    "href": "/admin/vorlagen/datei/social/social-432.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-433.webp",
    "href": "/admin/vorlagen/datei/social/social-433.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-434.webp",
    "href": "/admin/vorlagen/datei/social/social-434.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-435.webp",
    "href": "/admin/vorlagen/datei/social/social-435.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-436.webp",
    "href": "/admin/vorlagen/datei/social/social-436.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-437.webp",
    "href": "/admin/vorlagen/datei/social/social-437.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-438.webp",
    "href": "/admin/vorlagen/datei/social/social-438.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-439.webp",
    "href": "/admin/vorlagen/datei/social/social-439.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-440.webp",
    "href": "/admin/vorlagen/datei/social/social-440.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-441.webp",
    "href": "/admin/vorlagen/datei/social/social-441.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-442.webp",
    "href": "/admin/vorlagen/datei/social/social-442.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-443.webp",
    "href": "/admin/vorlagen/datei/social/social-443.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-444.webp",
    "href": "/admin/vorlagen/datei/social/social-444.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-445.webp",
    "href": "/admin/vorlagen/datei/social/social-445.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-446.webp",
    "href": "/admin/vorlagen/datei/social/social-446.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-447.webp",
    "href": "/admin/vorlagen/datei/social/social-447.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-448.webp",
    "href": "/admin/vorlagen/datei/social/social-448.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-449.webp",
    "href": "/admin/vorlagen/datei/social/social-449.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-450.webp",
    "href": "/admin/vorlagen/datei/social/social-450.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-451.webp",
    "href": "/admin/vorlagen/datei/social/social-451.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay hell 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-452.webp",
    "href": "/admin/vorlagen/datei/social/social-452.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-453.webp",
    "href": "/admin/vorlagen/datei/social/social-453.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-454.webp",
    "href": "/admin/vorlagen/datei/social/social-454.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-455.webp",
    "href": "/admin/vorlagen/datei/social/social-455.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-456.webp",
    "href": "/admin/vorlagen/datei/social/social-456.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-457.webp",
    "href": "/admin/vorlagen/datei/social/social-457.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-458.webp",
    "href": "/admin/vorlagen/datei/social/social-458.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-459.webp",
    "href": "/admin/vorlagen/datei/social/social-459.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-460.webp",
    "href": "/admin/vorlagen/datei/social/social-460.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-461.webp",
    "href": "/admin/vorlagen/datei/social/social-461.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-462.webp",
    "href": "/admin/vorlagen/datei/social/social-462.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-463.webp",
    "href": "/admin/vorlagen/datei/social/social-463.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-464.webp",
    "href": "/admin/vorlagen/datei/social/social-464.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-465.webp",
    "href": "/admin/vorlagen/datei/social/social-465.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-466.webp",
    "href": "/admin/vorlagen/datei/social/social-466.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-467.webp",
    "href": "/admin/vorlagen/datei/social/social-467.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-468.webp",
    "href": "/admin/vorlagen/datei/social/social-468.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-469.webp",
    "href": "/admin/vorlagen/datei/social/social-469.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-470.webp",
    "href": "/admin/vorlagen/datei/social/social-470.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-471.webp",
    "href": "/admin/vorlagen/datei/social/social-471.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-472.webp",
    "href": "/admin/vorlagen/datei/social/social-472.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-473.webp",
    "href": "/admin/vorlagen/datei/social/social-473.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-474.webp",
    "href": "/admin/vorlagen/datei/social/social-474.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-475.webp",
    "href": "/admin/vorlagen/datei/social/social-475.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-476.webp",
    "href": "/admin/vorlagen/datei/social/social-476.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-477.webp",
    "href": "/admin/vorlagen/datei/social/social-477.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-478.webp",
    "href": "/admin/vorlagen/datei/social/social-478.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 01",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-479.webp",
    "href": "/admin/vorlagen/datei/social/social-479.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 02",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-480.webp",
    "href": "/admin/vorlagen/datei/social/social-480.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 03",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-481.webp",
    "href": "/admin/vorlagen/datei/social/social-481.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 04",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-482.webp",
    "href": "/admin/vorlagen/datei/social/social-482.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 05",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-483.webp",
    "href": "/admin/vorlagen/datei/social/social-483.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 06",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-484.webp",
    "href": "/admin/vorlagen/datei/social/social-484.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 07",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-485.webp",
    "href": "/admin/vorlagen/datei/social/social-485.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 08",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-486.webp",
    "href": "/admin/vorlagen/datei/social/social-486.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 09",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-487.webp",
    "href": "/admin/vorlagen/datei/social/social-487.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 10",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-488.webp",
    "href": "/admin/vorlagen/datei/social/social-488.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 11",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-489.webp",
    "href": "/admin/vorlagen/datei/social/social-489.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 12",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-490.webp",
    "href": "/admin/vorlagen/datei/social/social-490.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 13",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-491.webp",
    "href": "/admin/vorlagen/datei/social/social-491.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 14",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-492.webp",
    "href": "/admin/vorlagen/datei/social/social-492.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 15",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-493.webp",
    "href": "/admin/vorlagen/datei/social/social-493.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 16",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-494.webp",
    "href": "/admin/vorlagen/datei/social/social-494.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 17",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-495.webp",
    "href": "/admin/vorlagen/datei/social/social-495.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 18",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-496.webp",
    "href": "/admin/vorlagen/datei/social/social-496.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 19",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-497.webp",
    "href": "/admin/vorlagen/datei/social/social-497.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 20",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-498.webp",
    "href": "/admin/vorlagen/datei/social/social-498.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 21",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-499.webp",
    "href": "/admin/vorlagen/datei/social/social-499.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 22",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-500.webp",
    "href": "/admin/vorlagen/datei/social/social-500.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 23",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-501.webp",
    "href": "/admin/vorlagen/datei/social/social-501.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 24",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-502.webp",
    "href": "/admin/vorlagen/datei/social/social-502.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 25",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-503.webp",
    "href": "/admin/vorlagen/datei/social/social-503.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "overlay tuerkis hell 26",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-504.webp",
    "href": "/admin/vorlagen/datei/social/social-504.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 16x9 hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-505.webp",
    "href": "/admin/vorlagen/datei/social/social-505.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 16x9 tuerkis hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-506.webp",
    "href": "/admin/vorlagen/datei/social/social-506.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 16x9 tuerkis",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-507.webp",
    "href": "/admin/vorlagen/datei/social/social-507.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 16x9",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-508.webp",
    "href": "/admin/vorlagen/datei/social/social-508.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 1x1 hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-509.webp",
    "href": "/admin/vorlagen/datei/social/social-509.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 1x1 tuerkis hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-510.webp",
    "href": "/admin/vorlagen/datei/social/social-510.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 1x1 tuerkis",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-511.webp",
    "href": "/admin/vorlagen/datei/social/social-511.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 1x1",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-512.webp",
    "href": "/admin/vorlagen/datei/social/social-512.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 2x3 hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-513.webp",
    "href": "/admin/vorlagen/datei/social/social-513.webp",
    "masse": {
      "label": "2:3",
      "w": 1000,
      "h": 1500
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 2x3 tuerkis hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-514.webp",
    "href": "/admin/vorlagen/datei/social/social-514.webp",
    "masse": {
      "label": "2:3",
      "w": 1000,
      "h": 1500
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 2x3 tuerkis",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-515.webp",
    "href": "/admin/vorlagen/datei/social/social-515.webp",
    "masse": {
      "label": "2:3",
      "w": 1000,
      "h": 1500
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 2x3",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-516.webp",
    "href": "/admin/vorlagen/datei/social/social-516.webp",
    "masse": {
      "label": "2:3",
      "w": 1000,
      "h": 1500
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 4x5 hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-517.webp",
    "href": "/admin/vorlagen/datei/social/social-517.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 4x5 tuerkis hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-518.webp",
    "href": "/admin/vorlagen/datei/social/social-518.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 4x5 tuerkis",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-519.webp",
    "href": "/admin/vorlagen/datei/social/social-519.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 4x5",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-520.webp",
    "href": "/admin/vorlagen/datei/social/social-520.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 9x16 hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-521.webp",
    "href": "/admin/vorlagen/datei/social/social-521.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 9x16 tuerkis hell",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-522.webp",
    "href": "/admin/vorlagen/datei/social/social-522.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 9x16 tuerkis",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-523.webp",
    "href": "/admin/vorlagen/datei/social/social-523.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 9x16",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-524.webp",
    "href": "/admin/vorlagen/datei/social/social-524.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Facebook Cover hell",
    "unterKategorie": "Facebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-525.webp",
    "href": "/admin/vorlagen/datei/social/social-525.webp",
    "masse": {
      "label": "",
      "w": 1640,
      "h": 624
    }
  },
  {
    "kategorie": "social",
    "titel": "Facebook Cover",
    "unterKategorie": "Facebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-526.webp",
    "href": "/admin/vorlagen/datei/social/social-526.webp",
    "masse": {
      "label": "",
      "w": 1640,
      "h": 624
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 16x9 hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-527.webp",
    "href": "/admin/vorlagen/datei/social/social-527.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 16x9 tuerkis hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-528.webp",
    "href": "/admin/vorlagen/datei/social/social-528.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 16x9 tuerkis",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-529.webp",
    "href": "/admin/vorlagen/datei/social/social-529.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 16x9",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-530.webp",
    "href": "/admin/vorlagen/datei/social/social-530.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 1x1 hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-531.webp",
    "href": "/admin/vorlagen/datei/social/social-531.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 1x1 tuerkis hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-532.webp",
    "href": "/admin/vorlagen/datei/social/social-532.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 1x1 tuerkis",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-533.webp",
    "href": "/admin/vorlagen/datei/social/social-533.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 1x1",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-534.webp",
    "href": "/admin/vorlagen/datei/social/social-534.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 2x3 hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-535.webp",
    "href": "/admin/vorlagen/datei/social/social-535.webp",
    "masse": {
      "label": "2:3",
      "w": 1000,
      "h": 1500
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 2x3 tuerkis hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-536.webp",
    "href": "/admin/vorlagen/datei/social/social-536.webp",
    "masse": {
      "label": "2:3",
      "w": 1000,
      "h": 1500
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 2x3 tuerkis",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-537.webp",
    "href": "/admin/vorlagen/datei/social/social-537.webp",
    "masse": {
      "label": "2:3",
      "w": 1000,
      "h": 1500
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 2x3",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-538.webp",
    "href": "/admin/vorlagen/datei/social/social-538.webp",
    "masse": {
      "label": "2:3",
      "w": 1000,
      "h": 1500
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 4x5 hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-539.webp",
    "href": "/admin/vorlagen/datei/social/social-539.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 4x5 tuerkis hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-540.webp",
    "href": "/admin/vorlagen/datei/social/social-540.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 4x5 tuerkis",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-541.webp",
    "href": "/admin/vorlagen/datei/social/social-541.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 4x5",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-542.webp",
    "href": "/admin/vorlagen/datei/social/social-542.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 9x16 hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-543.webp",
    "href": "/admin/vorlagen/datei/social/social-543.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 9x16 tuerkis hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-544.webp",
    "href": "/admin/vorlagen/datei/social/social-544.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 9x16 tuerkis",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-545.webp",
    "href": "/admin/vorlagen/datei/social/social-545.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 9x16",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-546.webp",
    "href": "/admin/vorlagen/datei/social/social-546.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story Logo hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-547.webp",
    "href": "/admin/vorlagen/datei/social/social-547.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story Logo",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-548.webp",
    "href": "/admin/vorlagen/datei/social/social-548.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story hell",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-549.webp",
    "href": "/admin/vorlagen/datei/social/social-549.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-550.webp",
    "href": "/admin/vorlagen/datei/social/social-550.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "LinkedIn Banner hell",
    "unterKategorie": "LinkedIn",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-551.webp",
    "href": "/admin/vorlagen/datei/social/social-551.webp",
    "masse": {
      "label": "4:1",
      "w": 2160,
      "h": 540
    }
  },
  {
    "kategorie": "social",
    "titel": "LinkedIn Banner",
    "unterKategorie": "LinkedIn",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-552.webp",
    "href": "/admin/vorlagen/datei/social/social-552.webp",
    "masse": {
      "label": "4:1",
      "w": 2160,
      "h": 540
    }
  },
  {
    "kategorie": "social",
    "titel": "Messenger Kanalbild hell",
    "unterKategorie": "Messenger",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-553.webp",
    "href": "/admin/vorlagen/datei/social/social-553.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Messenger Kanalbild tuerkis hell",
    "unterKategorie": "Messenger",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-554.webp",
    "href": "/admin/vorlagen/datei/social/social-554.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Messenger Kanalbild tuerkis",
    "unterKategorie": "Messenger",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-555.webp",
    "href": "/admin/vorlagen/datei/social/social-555.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Messenger Kanalbild",
    "unterKategorie": "Messenger",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-556.webp",
    "href": "/admin/vorlagen/datei/social/social-556.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Kanalbild Quadrat hell",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-557.webp",
    "href": "/admin/vorlagen/datei/social/social-557.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Kanalbild Quadrat tuerkis hell",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-558.webp",
    "href": "/admin/vorlagen/datei/social/social-558.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Kanalbild Quadrat tuerkis",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-559.webp",
    "href": "/admin/vorlagen/datei/social/social-559.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Kanalbild Quadrat",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-560.webp",
    "href": "/admin/vorlagen/datei/social/social-560.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Quadrat hell",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-561.webp",
    "href": "/admin/vorlagen/datei/social/social-561.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Quadrat tuerkis hell",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-562.webp",
    "href": "/admin/vorlagen/datei/social/social-562.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Quadrat tuerkis",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-563.webp",
    "href": "/admin/vorlagen/datei/social/social-563.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Quadrat",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-564.webp",
    "href": "/admin/vorlagen/datei/social/social-564.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund Emblem hell",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-565.webp",
    "href": "/admin/vorlagen/datei/social/social-565.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund Emblem tuerkis hell",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-566.webp",
    "href": "/admin/vorlagen/datei/social/social-566.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund Emblem tuerkis",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-567.webp",
    "href": "/admin/vorlagen/datei/social/social-567.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund Emblem",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-568.webp",
    "href": "/admin/vorlagen/datei/social/social-568.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund hell",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-569.webp",
    "href": "/admin/vorlagen/datei/social/social-569.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund tuerkis hell",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-570.webp",
    "href": "/admin/vorlagen/datei/social/social-570.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund tuerkis",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-571.webp",
    "href": "/admin/vorlagen/datei/social/social-571.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild Rund",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-572.webp",
    "href": "/admin/vorlagen/datei/social/social-572.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "01 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-573.webp",
    "href": "/admin/vorlagen/datei/social/social-573.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-574.webp",
    "href": "/admin/vorlagen/datei/social/social-574.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-575.webp",
    "href": "/admin/vorlagen/datei/social/social-575.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "01 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-576.webp",
    "href": "/admin/vorlagen/datei/social/social-576.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "02 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-577.webp",
    "href": "/admin/vorlagen/datei/social/social-577.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-578.webp",
    "href": "/admin/vorlagen/datei/social/social-578.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-579.webp",
    "href": "/admin/vorlagen/datei/social/social-579.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "02 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-580.webp",
    "href": "/admin/vorlagen/datei/social/social-580.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "03 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-581.webp",
    "href": "/admin/vorlagen/datei/social/social-581.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-582.webp",
    "href": "/admin/vorlagen/datei/social/social-582.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-583.webp",
    "href": "/admin/vorlagen/datei/social/social-583.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "03 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-584.webp",
    "href": "/admin/vorlagen/datei/social/social-584.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "04 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-585.webp",
    "href": "/admin/vorlagen/datei/social/social-585.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-586.webp",
    "href": "/admin/vorlagen/datei/social/social-586.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-587.webp",
    "href": "/admin/vorlagen/datei/social/social-587.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "04 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-588.webp",
    "href": "/admin/vorlagen/datei/social/social-588.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "05 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-589.webp",
    "href": "/admin/vorlagen/datei/social/social-589.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-590.webp",
    "href": "/admin/vorlagen/datei/social/social-590.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-591.webp",
    "href": "/admin/vorlagen/datei/social/social-591.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "05 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-592.webp",
    "href": "/admin/vorlagen/datei/social/social-592.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "06 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-593.webp",
    "href": "/admin/vorlagen/datei/social/social-593.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-594.webp",
    "href": "/admin/vorlagen/datei/social/social-594.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-595.webp",
    "href": "/admin/vorlagen/datei/social/social-595.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "06 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-596.webp",
    "href": "/admin/vorlagen/datei/social/social-596.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "07 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-597.webp",
    "href": "/admin/vorlagen/datei/social/social-597.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-598.webp",
    "href": "/admin/vorlagen/datei/social/social-598.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-599.webp",
    "href": "/admin/vorlagen/datei/social/social-599.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "07 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-600.webp",
    "href": "/admin/vorlagen/datei/social/social-600.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "01 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-601.webp",
    "href": "/admin/vorlagen/datei/social/social-601.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-602.webp",
    "href": "/admin/vorlagen/datei/social/social-602.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-603.webp",
    "href": "/admin/vorlagen/datei/social/social-603.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "01 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-604.webp",
    "href": "/admin/vorlagen/datei/social/social-604.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "02 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-605.webp",
    "href": "/admin/vorlagen/datei/social/social-605.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-606.webp",
    "href": "/admin/vorlagen/datei/social/social-606.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-607.webp",
    "href": "/admin/vorlagen/datei/social/social-607.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "02 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-608.webp",
    "href": "/admin/vorlagen/datei/social/social-608.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "03 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-609.webp",
    "href": "/admin/vorlagen/datei/social/social-609.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-610.webp",
    "href": "/admin/vorlagen/datei/social/social-610.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-611.webp",
    "href": "/admin/vorlagen/datei/social/social-611.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "03 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-612.webp",
    "href": "/admin/vorlagen/datei/social/social-612.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "04 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-613.webp",
    "href": "/admin/vorlagen/datei/social/social-613.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-614.webp",
    "href": "/admin/vorlagen/datei/social/social-614.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-615.webp",
    "href": "/admin/vorlagen/datei/social/social-615.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "04 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-616.webp",
    "href": "/admin/vorlagen/datei/social/social-616.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "05 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-617.webp",
    "href": "/admin/vorlagen/datei/social/social-617.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-618.webp",
    "href": "/admin/vorlagen/datei/social/social-618.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-619.webp",
    "href": "/admin/vorlagen/datei/social/social-619.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "05 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-620.webp",
    "href": "/admin/vorlagen/datei/social/social-620.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "06 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-621.webp",
    "href": "/admin/vorlagen/datei/social/social-621.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-622.webp",
    "href": "/admin/vorlagen/datei/social/social-622.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-623.webp",
    "href": "/admin/vorlagen/datei/social/social-623.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "06 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-624.webp",
    "href": "/admin/vorlagen/datei/social/social-624.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "07 hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-625.webp",
    "href": "/admin/vorlagen/datei/social/social-625.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-626.webp",
    "href": "/admin/vorlagen/datei/social/social-626.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-627.webp",
    "href": "/admin/vorlagen/datei/social/social-627.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "07 · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-628.webp",
    "href": "/admin/vorlagen/datei/social/social-628.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-629.webp",
    "href": "/admin/vorlagen/datei/social/social-629.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-630.webp",
    "href": "/admin/vorlagen/datei/social/social-630.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-631.webp",
    "href": "/admin/vorlagen/datei/social/social-631.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund · 16:9",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-632.webp",
    "href": "/admin/vorlagen/datei/social/social-632.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "01 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-633.webp",
    "href": "/admin/vorlagen/datei/social/social-633.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-634.webp",
    "href": "/admin/vorlagen/datei/social/social-634.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-635.webp",
    "href": "/admin/vorlagen/datei/social/social-635.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "01 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-636.webp",
    "href": "/admin/vorlagen/datei/social/social-636.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "02 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-637.webp",
    "href": "/admin/vorlagen/datei/social/social-637.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-638.webp",
    "href": "/admin/vorlagen/datei/social/social-638.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-639.webp",
    "href": "/admin/vorlagen/datei/social/social-639.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "02 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-640.webp",
    "href": "/admin/vorlagen/datei/social/social-640.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "03 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-641.webp",
    "href": "/admin/vorlagen/datei/social/social-641.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-642.webp",
    "href": "/admin/vorlagen/datei/social/social-642.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-643.webp",
    "href": "/admin/vorlagen/datei/social/social-643.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "03 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-644.webp",
    "href": "/admin/vorlagen/datei/social/social-644.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "04 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-645.webp",
    "href": "/admin/vorlagen/datei/social/social-645.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-646.webp",
    "href": "/admin/vorlagen/datei/social/social-646.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-647.webp",
    "href": "/admin/vorlagen/datei/social/social-647.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "04 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-648.webp",
    "href": "/admin/vorlagen/datei/social/social-648.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "05 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-649.webp",
    "href": "/admin/vorlagen/datei/social/social-649.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-650.webp",
    "href": "/admin/vorlagen/datei/social/social-650.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-651.webp",
    "href": "/admin/vorlagen/datei/social/social-651.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "05 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-652.webp",
    "href": "/admin/vorlagen/datei/social/social-652.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "06 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-653.webp",
    "href": "/admin/vorlagen/datei/social/social-653.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-654.webp",
    "href": "/admin/vorlagen/datei/social/social-654.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-655.webp",
    "href": "/admin/vorlagen/datei/social/social-655.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "06 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-656.webp",
    "href": "/admin/vorlagen/datei/social/social-656.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "07 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-657.webp",
    "href": "/admin/vorlagen/datei/social/social-657.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-658.webp",
    "href": "/admin/vorlagen/datei/social/social-658.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-659.webp",
    "href": "/admin/vorlagen/datei/social/social-659.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "07 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-660.webp",
    "href": "/admin/vorlagen/datei/social/social-660.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "01 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-661.webp",
    "href": "/admin/vorlagen/datei/social/social-661.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-662.webp",
    "href": "/admin/vorlagen/datei/social/social-662.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-663.webp",
    "href": "/admin/vorlagen/datei/social/social-663.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "01 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-664.webp",
    "href": "/admin/vorlagen/datei/social/social-664.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "02 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-665.webp",
    "href": "/admin/vorlagen/datei/social/social-665.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-666.webp",
    "href": "/admin/vorlagen/datei/social/social-666.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-667.webp",
    "href": "/admin/vorlagen/datei/social/social-667.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "02 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-668.webp",
    "href": "/admin/vorlagen/datei/social/social-668.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "03 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-669.webp",
    "href": "/admin/vorlagen/datei/social/social-669.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-670.webp",
    "href": "/admin/vorlagen/datei/social/social-670.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-671.webp",
    "href": "/admin/vorlagen/datei/social/social-671.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "03 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-672.webp",
    "href": "/admin/vorlagen/datei/social/social-672.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "04 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-673.webp",
    "href": "/admin/vorlagen/datei/social/social-673.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-674.webp",
    "href": "/admin/vorlagen/datei/social/social-674.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-675.webp",
    "href": "/admin/vorlagen/datei/social/social-675.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "04 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-676.webp",
    "href": "/admin/vorlagen/datei/social/social-676.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "05 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-677.webp",
    "href": "/admin/vorlagen/datei/social/social-677.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-678.webp",
    "href": "/admin/vorlagen/datei/social/social-678.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-679.webp",
    "href": "/admin/vorlagen/datei/social/social-679.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "05 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-680.webp",
    "href": "/admin/vorlagen/datei/social/social-680.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "06 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-681.webp",
    "href": "/admin/vorlagen/datei/social/social-681.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-682.webp",
    "href": "/admin/vorlagen/datei/social/social-682.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-683.webp",
    "href": "/admin/vorlagen/datei/social/social-683.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "06 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-684.webp",
    "href": "/admin/vorlagen/datei/social/social-684.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "07 hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-685.webp",
    "href": "/admin/vorlagen/datei/social/social-685.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-686.webp",
    "href": "/admin/vorlagen/datei/social/social-686.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-687.webp",
    "href": "/admin/vorlagen/datei/social/social-687.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "07 · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-688.webp",
    "href": "/admin/vorlagen/datei/social/social-688.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-689.webp",
    "href": "/admin/vorlagen/datei/social/social-689.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-690.webp",
    "href": "/admin/vorlagen/datei/social/social-690.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-691.webp",
    "href": "/admin/vorlagen/datei/social/social-691.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund · 1:1",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-692.webp",
    "href": "/admin/vorlagen/datei/social/social-692.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "01 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-693.webp",
    "href": "/admin/vorlagen/datei/social/social-693.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-694.webp",
    "href": "/admin/vorlagen/datei/social/social-694.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-695.webp",
    "href": "/admin/vorlagen/datei/social/social-695.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "01 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-696.webp",
    "href": "/admin/vorlagen/datei/social/social-696.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "02 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-697.webp",
    "href": "/admin/vorlagen/datei/social/social-697.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-698.webp",
    "href": "/admin/vorlagen/datei/social/social-698.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-699.webp",
    "href": "/admin/vorlagen/datei/social/social-699.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "02 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-700.webp",
    "href": "/admin/vorlagen/datei/social/social-700.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "03 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-701.webp",
    "href": "/admin/vorlagen/datei/social/social-701.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-702.webp",
    "href": "/admin/vorlagen/datei/social/social-702.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-703.webp",
    "href": "/admin/vorlagen/datei/social/social-703.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "03 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-704.webp",
    "href": "/admin/vorlagen/datei/social/social-704.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "04 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-705.webp",
    "href": "/admin/vorlagen/datei/social/social-705.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-706.webp",
    "href": "/admin/vorlagen/datei/social/social-706.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-707.webp",
    "href": "/admin/vorlagen/datei/social/social-707.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "04 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-708.webp",
    "href": "/admin/vorlagen/datei/social/social-708.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "05 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-709.webp",
    "href": "/admin/vorlagen/datei/social/social-709.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-710.webp",
    "href": "/admin/vorlagen/datei/social/social-710.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-711.webp",
    "href": "/admin/vorlagen/datei/social/social-711.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "05 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-712.webp",
    "href": "/admin/vorlagen/datei/social/social-712.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "06 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-713.webp",
    "href": "/admin/vorlagen/datei/social/social-713.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-714.webp",
    "href": "/admin/vorlagen/datei/social/social-714.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-715.webp",
    "href": "/admin/vorlagen/datei/social/social-715.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "06 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-716.webp",
    "href": "/admin/vorlagen/datei/social/social-716.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "07 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-717.webp",
    "href": "/admin/vorlagen/datei/social/social-717.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-718.webp",
    "href": "/admin/vorlagen/datei/social/social-718.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-719.webp",
    "href": "/admin/vorlagen/datei/social/social-719.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "07 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-720.webp",
    "href": "/admin/vorlagen/datei/social/social-720.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "01 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-721.webp",
    "href": "/admin/vorlagen/datei/social/social-721.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-722.webp",
    "href": "/admin/vorlagen/datei/social/social-722.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-723.webp",
    "href": "/admin/vorlagen/datei/social/social-723.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "01 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-724.webp",
    "href": "/admin/vorlagen/datei/social/social-724.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "02 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-725.webp",
    "href": "/admin/vorlagen/datei/social/social-725.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-726.webp",
    "href": "/admin/vorlagen/datei/social/social-726.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-727.webp",
    "href": "/admin/vorlagen/datei/social/social-727.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "02 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-728.webp",
    "href": "/admin/vorlagen/datei/social/social-728.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "03 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-729.webp",
    "href": "/admin/vorlagen/datei/social/social-729.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-730.webp",
    "href": "/admin/vorlagen/datei/social/social-730.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-731.webp",
    "href": "/admin/vorlagen/datei/social/social-731.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "03 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-732.webp",
    "href": "/admin/vorlagen/datei/social/social-732.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "04 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-733.webp",
    "href": "/admin/vorlagen/datei/social/social-733.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-734.webp",
    "href": "/admin/vorlagen/datei/social/social-734.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-735.webp",
    "href": "/admin/vorlagen/datei/social/social-735.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "04 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-736.webp",
    "href": "/admin/vorlagen/datei/social/social-736.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "05 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-737.webp",
    "href": "/admin/vorlagen/datei/social/social-737.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-738.webp",
    "href": "/admin/vorlagen/datei/social/social-738.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-739.webp",
    "href": "/admin/vorlagen/datei/social/social-739.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "05 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-740.webp",
    "href": "/admin/vorlagen/datei/social/social-740.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "06 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-741.webp",
    "href": "/admin/vorlagen/datei/social/social-741.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-742.webp",
    "href": "/admin/vorlagen/datei/social/social-742.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-743.webp",
    "href": "/admin/vorlagen/datei/social/social-743.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "06 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-744.webp",
    "href": "/admin/vorlagen/datei/social/social-744.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "07 hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-745.webp",
    "href": "/admin/vorlagen/datei/social/social-745.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-746.webp",
    "href": "/admin/vorlagen/datei/social/social-746.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-747.webp",
    "href": "/admin/vorlagen/datei/social/social-747.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "07 · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-748.webp",
    "href": "/admin/vorlagen/datei/social/social-748.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-749.webp",
    "href": "/admin/vorlagen/datei/social/social-749.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-750.webp",
    "href": "/admin/vorlagen/datei/social/social-750.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-751.webp",
    "href": "/admin/vorlagen/datei/social/social-751.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund · 4:5",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-752.webp",
    "href": "/admin/vorlagen/datei/social/social-752.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "01 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-753.webp",
    "href": "/admin/vorlagen/datei/social/social-753.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-754.webp",
    "href": "/admin/vorlagen/datei/social/social-754.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-755.webp",
    "href": "/admin/vorlagen/datei/social/social-755.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "01 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-756.webp",
    "href": "/admin/vorlagen/datei/social/social-756.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "02 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-757.webp",
    "href": "/admin/vorlagen/datei/social/social-757.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-758.webp",
    "href": "/admin/vorlagen/datei/social/social-758.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-759.webp",
    "href": "/admin/vorlagen/datei/social/social-759.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "02 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-760.webp",
    "href": "/admin/vorlagen/datei/social/social-760.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "03 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-761.webp",
    "href": "/admin/vorlagen/datei/social/social-761.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-762.webp",
    "href": "/admin/vorlagen/datei/social/social-762.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-763.webp",
    "href": "/admin/vorlagen/datei/social/social-763.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "03 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-764.webp",
    "href": "/admin/vorlagen/datei/social/social-764.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "04 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-765.webp",
    "href": "/admin/vorlagen/datei/social/social-765.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-766.webp",
    "href": "/admin/vorlagen/datei/social/social-766.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-767.webp",
    "href": "/admin/vorlagen/datei/social/social-767.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "04 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-768.webp",
    "href": "/admin/vorlagen/datei/social/social-768.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "05 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-769.webp",
    "href": "/admin/vorlagen/datei/social/social-769.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-770.webp",
    "href": "/admin/vorlagen/datei/social/social-770.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-771.webp",
    "href": "/admin/vorlagen/datei/social/social-771.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "05 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-772.webp",
    "href": "/admin/vorlagen/datei/social/social-772.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "06 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-773.webp",
    "href": "/admin/vorlagen/datei/social/social-773.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-774.webp",
    "href": "/admin/vorlagen/datei/social/social-774.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-775.webp",
    "href": "/admin/vorlagen/datei/social/social-775.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "06 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-776.webp",
    "href": "/admin/vorlagen/datei/social/social-776.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "07 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-777.webp",
    "href": "/admin/vorlagen/datei/social/social-777.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-778.webp",
    "href": "/admin/vorlagen/datei/social/social-778.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-779.webp",
    "href": "/admin/vorlagen/datei/social/social-779.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "07 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-780.webp",
    "href": "/admin/vorlagen/datei/social/social-780.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "01 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-781.webp",
    "href": "/admin/vorlagen/datei/social/social-781.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-782.webp",
    "href": "/admin/vorlagen/datei/social/social-782.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "01 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-783.webp",
    "href": "/admin/vorlagen/datei/social/social-783.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "01 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-784.webp",
    "href": "/admin/vorlagen/datei/social/social-784.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "02 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-785.webp",
    "href": "/admin/vorlagen/datei/social/social-785.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-786.webp",
    "href": "/admin/vorlagen/datei/social/social-786.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "02 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-787.webp",
    "href": "/admin/vorlagen/datei/social/social-787.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "02 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-788.webp",
    "href": "/admin/vorlagen/datei/social/social-788.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "03 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-789.webp",
    "href": "/admin/vorlagen/datei/social/social-789.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-790.webp",
    "href": "/admin/vorlagen/datei/social/social-790.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "03 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-791.webp",
    "href": "/admin/vorlagen/datei/social/social-791.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "03 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-792.webp",
    "href": "/admin/vorlagen/datei/social/social-792.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "04 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-793.webp",
    "href": "/admin/vorlagen/datei/social/social-793.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-794.webp",
    "href": "/admin/vorlagen/datei/social/social-794.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "04 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-795.webp",
    "href": "/admin/vorlagen/datei/social/social-795.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "04 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-796.webp",
    "href": "/admin/vorlagen/datei/social/social-796.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "05 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-797.webp",
    "href": "/admin/vorlagen/datei/social/social-797.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-798.webp",
    "href": "/admin/vorlagen/datei/social/social-798.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "05 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-799.webp",
    "href": "/admin/vorlagen/datei/social/social-799.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "05 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-800.webp",
    "href": "/admin/vorlagen/datei/social/social-800.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "06 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-801.webp",
    "href": "/admin/vorlagen/datei/social/social-801.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-802.webp",
    "href": "/admin/vorlagen/datei/social/social-802.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "06 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-803.webp",
    "href": "/admin/vorlagen/datei/social/social-803.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "06 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-804.webp",
    "href": "/admin/vorlagen/datei/social/social-804.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "07 hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-805.webp",
    "href": "/admin/vorlagen/datei/social/social-805.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-806.webp",
    "href": "/admin/vorlagen/datei/social/social-806.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "07 tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-807.webp",
    "href": "/admin/vorlagen/datei/social/social-807.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "07 · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-808.webp",
    "href": "/admin/vorlagen/datei/social/social-808.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-809.webp",
    "href": "/admin/vorlagen/datei/social/social-809.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis hell · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-810.webp",
    "href": "/admin/vorlagen/datei/social/social-810.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund tuerkis · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-811.webp",
    "href": "/admin/vorlagen/datei/social/social-811.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "hintergrund · 9:16",
    "unterKategorie": "whatsapp mitgliedschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-812.webp",
    "href": "/admin/vorlagen/datei/social/social-812.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Banner 1920x1080 hell",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-813.webp",
    "href": "/admin/vorlagen/datei/social/social-813.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Banner 1920x1080",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-814.webp",
    "href": "/admin/vorlagen/datei/social/social-814.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Banner hell",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-815.webp",
    "href": "/admin/vorlagen/datei/social/social-815.webp",
    "masse": {
      "label": "4:1",
      "w": 2160,
      "h": 540
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Banner",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-816.webp",
    "href": "/admin/vorlagen/datei/social/social-816.webp",
    "masse": {
      "label": "4:1",
      "w": 2160,
      "h": 540
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Kanalbild hell",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-817.webp",
    "href": "/admin/vorlagen/datei/social/social-817.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Kanalbild tuerkis hell",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-818.webp",
    "href": "/admin/vorlagen/datei/social/social-818.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Kanalbild tuerkis",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-819.webp",
    "href": "/admin/vorlagen/datei/social/social-819.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Kanalbild",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-820.webp",
    "href": "/admin/vorlagen/datei/social/social-820.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Profilbild hell",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-821.webp",
    "href": "/admin/vorlagen/datei/social/social-821.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Profilbild tuerkis hell",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-822.webp",
    "href": "/admin/vorlagen/datei/social/social-822.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Profilbild tuerkis",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-823.webp",
    "href": "/admin/vorlagen/datei/social/social-823.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Profilbild",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-824.webp",
    "href": "/admin/vorlagen/datei/social/social-824.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp SafeZone Vorlage",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-825.webp",
    "href": "/admin/vorlagen/datei/social/social-825.webp",
    "masse": {
      "label": "16:9",
      "w": 1920,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Status 9x16 hell",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-826.webp",
    "href": "/admin/vorlagen/datei/social/social-826.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Status 9x16 tuerkis hell",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-827.webp",
    "href": "/admin/vorlagen/datei/social/social-827.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Status 9x16 tuerkis",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-828.webp",
    "href": "/admin/vorlagen/datei/social/social-828.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "WhatsApp Status 9x16",
    "unterKategorie": "WhatsApp",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-829.webp",
    "href": "/admin/vorlagen/datei/social/social-829.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "YouTube Banner hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-830.webp",
    "href": "/admin/vorlagen/datei/social/social-830.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "YouTube Banner",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-831.webp",
    "href": "/admin/vorlagen/datei/social/social-831.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 01 hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-832.webp",
    "href": "/admin/vorlagen/datei/social/social-832.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 01 tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-833.webp",
    "href": "/admin/vorlagen/datei/social/social-833.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 01 tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-834.webp",
    "href": "/admin/vorlagen/datei/social/social-834.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 01",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-835.webp",
    "href": "/admin/vorlagen/datei/social/social-835.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 02 hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-836.webp",
    "href": "/admin/vorlagen/datei/social/social-836.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 02 tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-837.webp",
    "href": "/admin/vorlagen/datei/social/social-837.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 02 tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-838.webp",
    "href": "/admin/vorlagen/datei/social/social-838.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 02",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-839.webp",
    "href": "/admin/vorlagen/datei/social/social-839.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail ablenkung hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-840.webp",
    "href": "/admin/vorlagen/datei/social/social-840.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail ablenkung tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-841.webp",
    "href": "/admin/vorlagen/datei/social/social-841.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail ablenkung tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-842.webp",
    "href": "/admin/vorlagen/datei/social/social-842.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail ablenkung",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-843.webp",
    "href": "/admin/vorlagen/datei/social/social-843.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail algorithmen hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-844.webp",
    "href": "/admin/vorlagen/datei/social/social-844.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail algorithmen tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-845.webp",
    "href": "/admin/vorlagen/datei/social/social-845.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail algorithmen tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-846.webp",
    "href": "/admin/vorlagen/datei/social/social-846.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail algorithmen",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-847.webp",
    "href": "/admin/vorlagen/datei/social/social-847.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail angst steuerung hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-848.webp",
    "href": "/admin/vorlagen/datei/social/social-848.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail angst steuerung tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-849.webp",
    "href": "/admin/vorlagen/datei/social/social-849.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail angst steuerung tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-850.webp",
    "href": "/admin/vorlagen/datei/social/social-850.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail angst steuerung",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-851.webp",
    "href": "/admin/vorlagen/datei/social/social-851.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail atmung hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-852.webp",
    "href": "/admin/vorlagen/datei/social/social-852.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail atmung tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-853.webp",
    "href": "/admin/vorlagen/datei/social/social-853.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail atmung tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-854.webp",
    "href": "/admin/vorlagen/datei/social/social-854.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail atmung",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-855.webp",
    "href": "/admin/vorlagen/datei/social/social-855.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail autoritaetshoerigkeit hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-856.webp",
    "href": "/admin/vorlagen/datei/social/social-856.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail autoritaetshoerigkeit tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-857.webp",
    "href": "/admin/vorlagen/datei/social/social-857.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail autoritaetshoerigkeit tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-858.webp",
    "href": "/admin/vorlagen/datei/social/social-858.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail autoritaetshoerigkeit",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-859.webp",
    "href": "/admin/vorlagen/datei/social/social-859.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail bildmacht hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-860.webp",
    "href": "/admin/vorlagen/datei/social/social-860.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail bildmacht tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-861.webp",
    "href": "/admin/vorlagen/datei/social/social-861.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail bildmacht tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-862.webp",
    "href": "/admin/vorlagen/datei/social/social-862.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail bildmacht",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-863.webp",
    "href": "/admin/vorlagen/datei/social/social-863.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail framing hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-864.webp",
    "href": "/admin/vorlagen/datei/social/social-864.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail framing tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-865.webp",
    "href": "/admin/vorlagen/datei/social/social-865.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail framing tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-866.webp",
    "href": "/admin/vorlagen/datei/social/social-866.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail framing",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-867.webp",
    "href": "/admin/vorlagen/datei/social/social-867.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail gruppendruck hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-868.webp",
    "href": "/admin/vorlagen/datei/social/social-868.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail gruppendruck tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-869.webp",
    "href": "/admin/vorlagen/datei/social/social-869.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail gruppendruck tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-870.webp",
    "href": "/admin/vorlagen/datei/social/social-870.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail gruppendruck",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-871.webp",
    "href": "/admin/vorlagen/datei/social/social-871.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail identitaet und meinung hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-872.webp",
    "href": "/admin/vorlagen/datei/social/social-872.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail identitaet und meinung tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-873.webp",
    "href": "/admin/vorlagen/datei/social/social-873.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail identitaet und meinung tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-874.webp",
    "href": "/admin/vorlagen/datei/social/social-874.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail identitaet und meinung",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-875.webp",
    "href": "/admin/vorlagen/datei/social/social-875.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail kognitive dissonanz hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-876.webp",
    "href": "/admin/vorlagen/datei/social/social-876.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail kognitive dissonanz tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-877.webp",
    "href": "/admin/vorlagen/datei/social/social-877.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail kognitive dissonanz tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-878.webp",
    "href": "/admin/vorlagen/datei/social/social-878.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail kognitive dissonanz",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-879.webp",
    "href": "/admin/vorlagen/datei/social/social-879.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail medien agenda hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-880.webp",
    "href": "/admin/vorlagen/datei/social/social-880.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail medien agenda tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-881.webp",
    "href": "/admin/vorlagen/datei/social/social-881.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail medien agenda tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-882.webp",
    "href": "/admin/vorlagen/datei/social/social-882.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail medien agenda",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-883.webp",
    "href": "/admin/vorlagen/datei/social/social-883.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail meditation hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-884.webp",
    "href": "/admin/vorlagen/datei/social/social-884.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail meditation tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-885.webp",
    "href": "/admin/vorlagen/datei/social/social-885.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail meditation tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-886.webp",
    "href": "/admin/vorlagen/datei/social/social-886.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail meditation",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-887.webp",
    "href": "/admin/vorlagen/datei/social/social-887.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail normalisierung hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-888.webp",
    "href": "/admin/vorlagen/datei/social/social-888.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail normalisierung tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-889.webp",
    "href": "/admin/vorlagen/datei/social/social-889.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail normalisierung tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-890.webp",
    "href": "/admin/vorlagen/datei/social/social-890.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail normalisierung",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-891.webp",
    "href": "/admin/vorlagen/datei/social/social-891.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail placebo hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-892.webp",
    "href": "/admin/vorlagen/datei/social/social-892.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail placebo tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-893.webp",
    "href": "/admin/vorlagen/datei/social/social-893.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail placebo tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-894.webp",
    "href": "/admin/vorlagen/datei/social/social-894.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail placebo",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-895.webp",
    "href": "/admin/vorlagen/datei/social/social-895.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail propaganda hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-896.webp",
    "href": "/admin/vorlagen/datei/social/social-896.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail propaganda tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-897.webp",
    "href": "/admin/vorlagen/datei/social/social-897.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail propaganda tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-898.webp",
    "href": "/admin/vorlagen/datei/social/social-898.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail propaganda",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-899.webp",
    "href": "/admin/vorlagen/datei/social/social-899.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail reizueberflutung hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-900.webp",
    "href": "/admin/vorlagen/datei/social/social-900.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail reizueberflutung tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-901.webp",
    "href": "/admin/vorlagen/datei/social/social-901.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail reizueberflutung tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-902.webp",
    "href": "/admin/vorlagen/datei/social/social-902.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail reizueberflutung",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-903.webp",
    "href": "/admin/vorlagen/datei/social/social-903.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail sprache und etiketten hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-904.webp",
    "href": "/admin/vorlagen/datei/social/social-904.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail sprache und etiketten tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-905.webp",
    "href": "/admin/vorlagen/datei/social/social-905.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail sprache und etiketten tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-906.webp",
    "href": "/admin/vorlagen/datei/social/social-906.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail sprache und etiketten",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-907.webp",
    "href": "/admin/vorlagen/datei/social/social-907.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 2 hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-908.webp",
    "href": "/admin/vorlagen/datei/social/social-908.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 2 tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-909.webp",
    "href": "/admin/vorlagen/datei/social/social-909.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 2 tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-910.webp",
    "href": "/admin/vorlagen/datei/social/social-910.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 2",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-911.webp",
    "href": "/admin/vorlagen/datei/social/social-911.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 3 hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-912.webp",
    "href": "/admin/vorlagen/datei/social/social-912.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 3 tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-913.webp",
    "href": "/admin/vorlagen/datei/social/social-913.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 3 tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-914.webp",
    "href": "/admin/vorlagen/datei/social/social-914.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 3",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-915.webp",
    "href": "/admin/vorlagen/datei/social/social-915.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 4 hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-916.webp",
    "href": "/admin/vorlagen/datei/social/social-916.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 4 tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-917.webp",
    "href": "/admin/vorlagen/datei/social/social-917.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 4 tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-918.webp",
    "href": "/admin/vorlagen/datei/social/social-918.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 4",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-919.webp",
    "href": "/admin/vorlagen/datei/social/social-919.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 5 hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-920.webp",
    "href": "/admin/vorlagen/datei/social/social-920.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 5 tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-921.webp",
    "href": "/admin/vorlagen/datei/social/social-921.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 5 tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-922.webp",
    "href": "/admin/vorlagen/datei/social/social-922.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 5",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-923.webp",
    "href": "/admin/vorlagen/datei/social/social-923.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 6 hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-924.webp",
    "href": "/admin/vorlagen/datei/social/social-924.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 6 tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-925.webp",
    "href": "/admin/vorlagen/datei/social/social-925.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 6 tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-926.webp",
    "href": "/admin/vorlagen/datei/social/social-926.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 6",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-927.webp",
    "href": "/admin/vorlagen/datei/social/social-927.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 7 hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-928.webp",
    "href": "/admin/vorlagen/datei/social/social-928.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 7 tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-929.webp",
    "href": "/admin/vorlagen/datei/social/social-929.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 7 tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-930.webp",
    "href": "/admin/vorlagen/datei/social/social-930.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail stufe 7",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-931.webp",
    "href": "/admin/vorlagen/datei/social/social-931.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail vorlage hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-932.webp",
    "href": "/admin/vorlagen/datei/social/social-932.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail vorlage tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-933.webp",
    "href": "/admin/vorlagen/datei/social/social-933.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail vorlage tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-934.webp",
    "href": "/admin/vorlagen/datei/social/social-934.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail vorlage",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-935.webp",
    "href": "/admin/vorlagen/datei/social/social-935.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail werbung und mangel hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-936.webp",
    "href": "/admin/vorlagen/datei/social/social-936.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail werbung und mangel tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-937.webp",
    "href": "/admin/vorlagen/datei/social/social-937.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail werbung und mangel tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-938.webp",
    "href": "/admin/vorlagen/datei/social/social-938.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail werbung und mangel",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-939.webp",
    "href": "/admin/vorlagen/datei/social/social-939.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail wiederholung wahrheit hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-940.webp",
    "href": "/admin/vorlagen/datei/social/social-940.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail wiederholung wahrheit tuerkis hell",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-941.webp",
    "href": "/admin/vorlagen/datei/social/social-941.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail wiederholung wahrheit tuerkis",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-942.webp",
    "href": "/admin/vorlagen/datei/social/social-942.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail wiederholung wahrheit",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-943.webp",
    "href": "/admin/vorlagen/datei/social/social-943.webp",
    "masse": {
      "label": "16:9",
      "w": 1280,
      "h": 720
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-944.webp",
    "href": "/admin/vorlagen/datei/social/social-944.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-945.webp",
    "href": "/admin/vorlagen/datei/social/social-945.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-946.webp",
    "href": "/admin/vorlagen/datei/social/social-946.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-947.webp",
    "href": "/admin/vorlagen/datei/social/social-947.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-948.webp",
    "href": "/admin/vorlagen/datei/social/social-948.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-949.webp",
    "href": "/admin/vorlagen/datei/social/social-949.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-950.webp",
    "href": "/admin/vorlagen/datei/social/social-950.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-951.webp",
    "href": "/admin/vorlagen/datei/social/social-951.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-952.webp",
    "href": "/admin/vorlagen/datei/social/social-952.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-953.webp",
    "href": "/admin/vorlagen/datei/social/social-953.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-954.webp",
    "href": "/admin/vorlagen/datei/social/social-954.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-955.webp",
    "href": "/admin/vorlagen/datei/social/social-955.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-956.webp",
    "href": "/admin/vorlagen/datei/social/social-956.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-957.webp",
    "href": "/admin/vorlagen/datei/social/social-957.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-958.webp",
    "href": "/admin/vorlagen/datei/social/social-958.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-959.webp",
    "href": "/admin/vorlagen/datei/social/social-959.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-960.webp",
    "href": "/admin/vorlagen/datei/social/social-960.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-961.webp",
    "href": "/admin/vorlagen/datei/social/social-961.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-962.webp",
    "href": "/admin/vorlagen/datei/social/social-962.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-963.webp",
    "href": "/admin/vorlagen/datei/social/social-963.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-964.webp",
    "href": "/admin/vorlagen/datei/social/social-964.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-965.webp",
    "href": "/admin/vorlagen/datei/social/social-965.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-966.webp",
    "href": "/admin/vorlagen/datei/social/social-966.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-967.webp",
    "href": "/admin/vorlagen/datei/social/social-967.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-968.webp",
    "href": "/admin/vorlagen/datei/social/social-968.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-969.webp",
    "href": "/admin/vorlagen/datei/social/social-969.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-970.webp",
    "href": "/admin/vorlagen/datei/social/social-970.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-971.webp",
    "href": "/admin/vorlagen/datei/social/social-971.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-972.webp",
    "href": "/admin/vorlagen/datei/social/social-972.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-973.webp",
    "href": "/admin/vorlagen/datei/social/social-973.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-974.webp",
    "href": "/admin/vorlagen/datei/social/social-974.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-975.webp",
    "href": "/admin/vorlagen/datei/social/social-975.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-976.webp",
    "href": "/admin/vorlagen/datei/social/social-976.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-977.webp",
    "href": "/admin/vorlagen/datei/social/social-977.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-978.webp",
    "href": "/admin/vorlagen/datei/social/social-978.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-979.webp",
    "href": "/admin/vorlagen/datei/social/social-979.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-980.webp",
    "href": "/admin/vorlagen/datei/social/social-980.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-981.webp",
    "href": "/admin/vorlagen/datei/social/social-981.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-982.webp",
    "href": "/admin/vorlagen/datei/social/social-982.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-983.webp",
    "href": "/admin/vorlagen/datei/social/social-983.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-984.webp",
    "href": "/admin/vorlagen/datei/social/social-984.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-985.webp",
    "href": "/admin/vorlagen/datei/social/social-985.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-986.webp",
    "href": "/admin/vorlagen/datei/social/social-986.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-987.webp",
    "href": "/admin/vorlagen/datei/social/social-987.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-988.webp",
    "href": "/admin/vorlagen/datei/social/social-988.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-989.webp",
    "href": "/admin/vorlagen/datei/social/social-989.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-990.webp",
    "href": "/admin/vorlagen/datei/social/social-990.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-991.webp",
    "href": "/admin/vorlagen/datei/social/social-991.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-992.webp",
    "href": "/admin/vorlagen/datei/social/social-992.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-993.webp",
    "href": "/admin/vorlagen/datei/social/social-993.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-994.webp",
    "href": "/admin/vorlagen/datei/social/social-994.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-995.webp",
    "href": "/admin/vorlagen/datei/social/social-995.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-996.webp",
    "href": "/admin/vorlagen/datei/social/social-996.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-997.webp",
    "href": "/admin/vorlagen/datei/social/social-997.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-998.webp",
    "href": "/admin/vorlagen/datei/social/social-998.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-999.webp",
    "href": "/admin/vorlagen/datei/social/social-999.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1000.webp",
    "href": "/admin/vorlagen/datei/social/social-1000.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1001.webp",
    "href": "/admin/vorlagen/datei/social/social-1001.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1002.webp",
    "href": "/admin/vorlagen/datei/social/social-1002.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1003.webp",
    "href": "/admin/vorlagen/datei/social/social-1003.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1004.webp",
    "href": "/admin/vorlagen/datei/social/social-1004.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1005.webp",
    "href": "/admin/vorlagen/datei/social/social-1005.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1006.webp",
    "href": "/admin/vorlagen/datei/social/social-1006.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1007.webp",
    "href": "/admin/vorlagen/datei/social/social-1007.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1008.webp",
    "href": "/admin/vorlagen/datei/social/social-1008.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1009.webp",
    "href": "/admin/vorlagen/datei/social/social-1009.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1010.webp",
    "href": "/admin/vorlagen/datei/social/social-1010.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1011.webp",
    "href": "/admin/vorlagen/datei/social/social-1011.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1012.webp",
    "href": "/admin/vorlagen/datei/social/social-1012.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1013.webp",
    "href": "/admin/vorlagen/datei/social/social-1013.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1014.webp",
    "href": "/admin/vorlagen/datei/social/social-1014.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1015.webp",
    "href": "/admin/vorlagen/datei/social/social-1015.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1016.webp",
    "href": "/admin/vorlagen/datei/social/social-1016.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1017.webp",
    "href": "/admin/vorlagen/datei/social/social-1017.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1018.webp",
    "href": "/admin/vorlagen/datei/social/social-1018.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1019.webp",
    "href": "/admin/vorlagen/datei/social/social-1019.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1020.webp",
    "href": "/admin/vorlagen/datei/social/social-1020.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1021.webp",
    "href": "/admin/vorlagen/datei/social/social-1021.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1022.webp",
    "href": "/admin/vorlagen/datei/social/social-1022.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1023.webp",
    "href": "/admin/vorlagen/datei/social/social-1023.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1024.webp",
    "href": "/admin/vorlagen/datei/social/social-1024.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1025.webp",
    "href": "/admin/vorlagen/datei/social/social-1025.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1026.webp",
    "href": "/admin/vorlagen/datei/social/social-1026.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1027.webp",
    "href": "/admin/vorlagen/datei/social/social-1027.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1028.webp",
    "href": "/admin/vorlagen/datei/social/social-1028.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1029.webp",
    "href": "/admin/vorlagen/datei/social/social-1029.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1030.webp",
    "href": "/admin/vorlagen/datei/social/social-1030.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1031.webp",
    "href": "/admin/vorlagen/datei/social/social-1031.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1032.webp",
    "href": "/admin/vorlagen/datei/social/social-1032.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1033.webp",
    "href": "/admin/vorlagen/datei/social/social-1033.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1034.webp",
    "href": "/admin/vorlagen/datei/social/social-1034.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1035.webp",
    "href": "/admin/vorlagen/datei/social/social-1035.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1036.webp",
    "href": "/admin/vorlagen/datei/social/social-1036.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1037.webp",
    "href": "/admin/vorlagen/datei/social/social-1037.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1038.webp",
    "href": "/admin/vorlagen/datei/social/social-1038.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1039.webp",
    "href": "/admin/vorlagen/datei/social/social-1039.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1040.webp",
    "href": "/admin/vorlagen/datei/social/social-1040.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1041.webp",
    "href": "/admin/vorlagen/datei/social/social-1041.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1042.webp",
    "href": "/admin/vorlagen/datei/social/social-1042.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1043.webp",
    "href": "/admin/vorlagen/datei/social/social-1043.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1044.webp",
    "href": "/admin/vorlagen/datei/social/social-1044.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 tuerkis hell · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1045.webp",
    "href": "/admin/vorlagen/datei/social/social-1045.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 tuerkis · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1046.webp",
    "href": "/admin/vorlagen/datei/social/social-1046.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1047.webp",
    "href": "/admin/vorlagen/datei/social/social-1047.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1048.webp",
    "href": "/admin/vorlagen/datei/social/social-1048.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1049.webp",
    "href": "/admin/vorlagen/datei/social/social-1049.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1050.webp",
    "href": "/admin/vorlagen/datei/social/social-1050.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1051.webp",
    "href": "/admin/vorlagen/datei/social/social-1051.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1052.webp",
    "href": "/admin/vorlagen/datei/social/social-1052.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1053.webp",
    "href": "/admin/vorlagen/datei/social/social-1053.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1054.webp",
    "href": "/admin/vorlagen/datei/social/social-1054.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1055.webp",
    "href": "/admin/vorlagen/datei/social/social-1055.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1056.webp",
    "href": "/admin/vorlagen/datei/social/social-1056.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1057.webp",
    "href": "/admin/vorlagen/datei/social/social-1057.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1058.webp",
    "href": "/admin/vorlagen/datei/social/social-1058.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1059.webp",
    "href": "/admin/vorlagen/datei/social/social-1059.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1060.webp",
    "href": "/admin/vorlagen/datei/social/social-1060.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1061.webp",
    "href": "/admin/vorlagen/datei/social/social-1061.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1062.webp",
    "href": "/admin/vorlagen/datei/social/social-1062.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1063.webp",
    "href": "/admin/vorlagen/datei/social/social-1063.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1064.webp",
    "href": "/admin/vorlagen/datei/social/social-1064.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1065.webp",
    "href": "/admin/vorlagen/datei/social/social-1065.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1066.webp",
    "href": "/admin/vorlagen/datei/social/social-1066.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1067.webp",
    "href": "/admin/vorlagen/datei/social/social-1067.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1068.webp",
    "href": "/admin/vorlagen/datei/social/social-1068.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1069.webp",
    "href": "/admin/vorlagen/datei/social/social-1069.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1070.webp",
    "href": "/admin/vorlagen/datei/social/social-1070.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1071.webp",
    "href": "/admin/vorlagen/datei/social/social-1071.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1072.webp",
    "href": "/admin/vorlagen/datei/social/social-1072.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1073.webp",
    "href": "/admin/vorlagen/datei/social/social-1073.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1074.webp",
    "href": "/admin/vorlagen/datei/social/social-1074.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1075.webp",
    "href": "/admin/vorlagen/datei/social/social-1075.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1076.webp",
    "href": "/admin/vorlagen/datei/social/social-1076.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1077.webp",
    "href": "/admin/vorlagen/datei/social/social-1077.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1078.webp",
    "href": "/admin/vorlagen/datei/social/social-1078.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1079.webp",
    "href": "/admin/vorlagen/datei/social/social-1079.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1080.webp",
    "href": "/admin/vorlagen/datei/social/social-1080.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1081.webp",
    "href": "/admin/vorlagen/datei/social/social-1081.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1082.webp",
    "href": "/admin/vorlagen/datei/social/social-1082.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1083.webp",
    "href": "/admin/vorlagen/datei/social/social-1083.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1084.webp",
    "href": "/admin/vorlagen/datei/social/social-1084.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1085.webp",
    "href": "/admin/vorlagen/datei/social/social-1085.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1086.webp",
    "href": "/admin/vorlagen/datei/social/social-1086.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1087.webp",
    "href": "/admin/vorlagen/datei/social/social-1087.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1088.webp",
    "href": "/admin/vorlagen/datei/social/social-1088.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1089.webp",
    "href": "/admin/vorlagen/datei/social/social-1089.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1090.webp",
    "href": "/admin/vorlagen/datei/social/social-1090.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1091.webp",
    "href": "/admin/vorlagen/datei/social/social-1091.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1092.webp",
    "href": "/admin/vorlagen/datei/social/social-1092.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1093.webp",
    "href": "/admin/vorlagen/datei/social/social-1093.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1094.webp",
    "href": "/admin/vorlagen/datei/social/social-1094.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1095.webp",
    "href": "/admin/vorlagen/datei/social/social-1095.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1096.webp",
    "href": "/admin/vorlagen/datei/social/social-1096.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1097.webp",
    "href": "/admin/vorlagen/datei/social/social-1097.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1098.webp",
    "href": "/admin/vorlagen/datei/social/social-1098.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1099.webp",
    "href": "/admin/vorlagen/datei/social/social-1099.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1100.webp",
    "href": "/admin/vorlagen/datei/social/social-1100.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1101.webp",
    "href": "/admin/vorlagen/datei/social/social-1101.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1102.webp",
    "href": "/admin/vorlagen/datei/social/social-1102.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1103.webp",
    "href": "/admin/vorlagen/datei/social/social-1103.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1104.webp",
    "href": "/admin/vorlagen/datei/social/social-1104.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1105.webp",
    "href": "/admin/vorlagen/datei/social/social-1105.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1106.webp",
    "href": "/admin/vorlagen/datei/social/social-1106.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1107.webp",
    "href": "/admin/vorlagen/datei/social/social-1107.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1108.webp",
    "href": "/admin/vorlagen/datei/social/social-1108.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1109.webp",
    "href": "/admin/vorlagen/datei/social/social-1109.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1110.webp",
    "href": "/admin/vorlagen/datei/social/social-1110.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1111.webp",
    "href": "/admin/vorlagen/datei/social/social-1111.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1112.webp",
    "href": "/admin/vorlagen/datei/social/social-1112.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1113.webp",
    "href": "/admin/vorlagen/datei/social/social-1113.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1114.webp",
    "href": "/admin/vorlagen/datei/social/social-1114.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1115.webp",
    "href": "/admin/vorlagen/datei/social/social-1115.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1116.webp",
    "href": "/admin/vorlagen/datei/social/social-1116.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1117.webp",
    "href": "/admin/vorlagen/datei/social/social-1117.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1118.webp",
    "href": "/admin/vorlagen/datei/social/social-1118.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1119.webp",
    "href": "/admin/vorlagen/datei/social/social-1119.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1120.webp",
    "href": "/admin/vorlagen/datei/social/social-1120.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1121.webp",
    "href": "/admin/vorlagen/datei/social/social-1121.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1122.webp",
    "href": "/admin/vorlagen/datei/social/social-1122.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1123.webp",
    "href": "/admin/vorlagen/datei/social/social-1123.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1124.webp",
    "href": "/admin/vorlagen/datei/social/social-1124.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1125.webp",
    "href": "/admin/vorlagen/datei/social/social-1125.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1126.webp",
    "href": "/admin/vorlagen/datei/social/social-1126.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1127.webp",
    "href": "/admin/vorlagen/datei/social/social-1127.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1128.webp",
    "href": "/admin/vorlagen/datei/social/social-1128.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1129.webp",
    "href": "/admin/vorlagen/datei/social/social-1129.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1130.webp",
    "href": "/admin/vorlagen/datei/social/social-1130.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1131.webp",
    "href": "/admin/vorlagen/datei/social/social-1131.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1132.webp",
    "href": "/admin/vorlagen/datei/social/social-1132.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1133.webp",
    "href": "/admin/vorlagen/datei/social/social-1133.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1134.webp",
    "href": "/admin/vorlagen/datei/social/social-1134.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1135.webp",
    "href": "/admin/vorlagen/datei/social/social-1135.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1136.webp",
    "href": "/admin/vorlagen/datei/social/social-1136.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1137.webp",
    "href": "/admin/vorlagen/datei/social/social-1137.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1138.webp",
    "href": "/admin/vorlagen/datei/social/social-1138.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1139.webp",
    "href": "/admin/vorlagen/datei/social/social-1139.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1140.webp",
    "href": "/admin/vorlagen/datei/social/social-1140.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1141.webp",
    "href": "/admin/vorlagen/datei/social/social-1141.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1142.webp",
    "href": "/admin/vorlagen/datei/social/social-1142.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1143.webp",
    "href": "/admin/vorlagen/datei/social/social-1143.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1144.webp",
    "href": "/admin/vorlagen/datei/social/social-1144.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1145.webp",
    "href": "/admin/vorlagen/datei/social/social-1145.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1146.webp",
    "href": "/admin/vorlagen/datei/social/social-1146.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1147.webp",
    "href": "/admin/vorlagen/datei/social/social-1147.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1148.webp",
    "href": "/admin/vorlagen/datei/social/social-1148.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 tuerkis hell · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1149.webp",
    "href": "/admin/vorlagen/datei/social/social-1149.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 tuerkis · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1150.webp",
    "href": "/admin/vorlagen/datei/social/social-1150.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1151.webp",
    "href": "/admin/vorlagen/datei/social/social-1151.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1152.webp",
    "href": "/admin/vorlagen/datei/social/social-1152.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1153.webp",
    "href": "/admin/vorlagen/datei/social/social-1153.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1154.webp",
    "href": "/admin/vorlagen/datei/social/social-1154.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1155.webp",
    "href": "/admin/vorlagen/datei/social/social-1155.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1156.webp",
    "href": "/admin/vorlagen/datei/social/social-1156.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1157.webp",
    "href": "/admin/vorlagen/datei/social/social-1157.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1158.webp",
    "href": "/admin/vorlagen/datei/social/social-1158.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1159.webp",
    "href": "/admin/vorlagen/datei/social/social-1159.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1160.webp",
    "href": "/admin/vorlagen/datei/social/social-1160.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1161.webp",
    "href": "/admin/vorlagen/datei/social/social-1161.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1162.webp",
    "href": "/admin/vorlagen/datei/social/social-1162.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1163.webp",
    "href": "/admin/vorlagen/datei/social/social-1163.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1164.webp",
    "href": "/admin/vorlagen/datei/social/social-1164.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1165.webp",
    "href": "/admin/vorlagen/datei/social/social-1165.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1166.webp",
    "href": "/admin/vorlagen/datei/social/social-1166.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1167.webp",
    "href": "/admin/vorlagen/datei/social/social-1167.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1168.webp",
    "href": "/admin/vorlagen/datei/social/social-1168.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1169.webp",
    "href": "/admin/vorlagen/datei/social/social-1169.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1170.webp",
    "href": "/admin/vorlagen/datei/social/social-1170.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1171.webp",
    "href": "/admin/vorlagen/datei/social/social-1171.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1172.webp",
    "href": "/admin/vorlagen/datei/social/social-1172.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1173.webp",
    "href": "/admin/vorlagen/datei/social/social-1173.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1174.webp",
    "href": "/admin/vorlagen/datei/social/social-1174.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1175.webp",
    "href": "/admin/vorlagen/datei/social/social-1175.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1176.webp",
    "href": "/admin/vorlagen/datei/social/social-1176.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1177.webp",
    "href": "/admin/vorlagen/datei/social/social-1177.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1178.webp",
    "href": "/admin/vorlagen/datei/social/social-1178.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1179.webp",
    "href": "/admin/vorlagen/datei/social/social-1179.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1180.webp",
    "href": "/admin/vorlagen/datei/social/social-1180.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1181.webp",
    "href": "/admin/vorlagen/datei/social/social-1181.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1182.webp",
    "href": "/admin/vorlagen/datei/social/social-1182.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1183.webp",
    "href": "/admin/vorlagen/datei/social/social-1183.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1184.webp",
    "href": "/admin/vorlagen/datei/social/social-1184.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1185.webp",
    "href": "/admin/vorlagen/datei/social/social-1185.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1186.webp",
    "href": "/admin/vorlagen/datei/social/social-1186.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1187.webp",
    "href": "/admin/vorlagen/datei/social/social-1187.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1188.webp",
    "href": "/admin/vorlagen/datei/social/social-1188.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1189.webp",
    "href": "/admin/vorlagen/datei/social/social-1189.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1190.webp",
    "href": "/admin/vorlagen/datei/social/social-1190.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1191.webp",
    "href": "/admin/vorlagen/datei/social/social-1191.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1192.webp",
    "href": "/admin/vorlagen/datei/social/social-1192.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1193.webp",
    "href": "/admin/vorlagen/datei/social/social-1193.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1194.webp",
    "href": "/admin/vorlagen/datei/social/social-1194.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1195.webp",
    "href": "/admin/vorlagen/datei/social/social-1195.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1196.webp",
    "href": "/admin/vorlagen/datei/social/social-1196.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1197.webp",
    "href": "/admin/vorlagen/datei/social/social-1197.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1198.webp",
    "href": "/admin/vorlagen/datei/social/social-1198.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1199.webp",
    "href": "/admin/vorlagen/datei/social/social-1199.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1200.webp",
    "href": "/admin/vorlagen/datei/social/social-1200.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1201.webp",
    "href": "/admin/vorlagen/datei/social/social-1201.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1202.webp",
    "href": "/admin/vorlagen/datei/social/social-1202.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1203.webp",
    "href": "/admin/vorlagen/datei/social/social-1203.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1204.webp",
    "href": "/admin/vorlagen/datei/social/social-1204.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1205.webp",
    "href": "/admin/vorlagen/datei/social/social-1205.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1206.webp",
    "href": "/admin/vorlagen/datei/social/social-1206.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1207.webp",
    "href": "/admin/vorlagen/datei/social/social-1207.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1208.webp",
    "href": "/admin/vorlagen/datei/social/social-1208.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1209.webp",
    "href": "/admin/vorlagen/datei/social/social-1209.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1210.webp",
    "href": "/admin/vorlagen/datei/social/social-1210.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 15 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1211.webp",
    "href": "/admin/vorlagen/datei/social/social-1211.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1212.webp",
    "href": "/admin/vorlagen/datei/social/social-1212.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1213.webp",
    "href": "/admin/vorlagen/datei/social/social-1213.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1214.webp",
    "href": "/admin/vorlagen/datei/social/social-1214.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 16 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1215.webp",
    "href": "/admin/vorlagen/datei/social/social-1215.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1216.webp",
    "href": "/admin/vorlagen/datei/social/social-1216.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1217.webp",
    "href": "/admin/vorlagen/datei/social/social-1217.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1218.webp",
    "href": "/admin/vorlagen/datei/social/social-1218.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 17 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1219.webp",
    "href": "/admin/vorlagen/datei/social/social-1219.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1220.webp",
    "href": "/admin/vorlagen/datei/social/social-1220.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1221.webp",
    "href": "/admin/vorlagen/datei/social/social-1221.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1222.webp",
    "href": "/admin/vorlagen/datei/social/social-1222.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 18 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1223.webp",
    "href": "/admin/vorlagen/datei/social/social-1223.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1224.webp",
    "href": "/admin/vorlagen/datei/social/social-1224.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1225.webp",
    "href": "/admin/vorlagen/datei/social/social-1225.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1226.webp",
    "href": "/admin/vorlagen/datei/social/social-1226.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 19 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1227.webp",
    "href": "/admin/vorlagen/datei/social/social-1227.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1228.webp",
    "href": "/admin/vorlagen/datei/social/social-1228.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1229.webp",
    "href": "/admin/vorlagen/datei/social/social-1229.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1230.webp",
    "href": "/admin/vorlagen/datei/social/social-1230.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 20 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1231.webp",
    "href": "/admin/vorlagen/datei/social/social-1231.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1232.webp",
    "href": "/admin/vorlagen/datei/social/social-1232.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1233.webp",
    "href": "/admin/vorlagen/datei/social/social-1233.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1234.webp",
    "href": "/admin/vorlagen/datei/social/social-1234.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 21 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1235.webp",
    "href": "/admin/vorlagen/datei/social/social-1235.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1236.webp",
    "href": "/admin/vorlagen/datei/social/social-1236.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1237.webp",
    "href": "/admin/vorlagen/datei/social/social-1237.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1238.webp",
    "href": "/admin/vorlagen/datei/social/social-1238.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 22 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1239.webp",
    "href": "/admin/vorlagen/datei/social/social-1239.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1240.webp",
    "href": "/admin/vorlagen/datei/social/social-1240.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1241.webp",
    "href": "/admin/vorlagen/datei/social/social-1241.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1242.webp",
    "href": "/admin/vorlagen/datei/social/social-1242.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 23 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1243.webp",
    "href": "/admin/vorlagen/datei/social/social-1243.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1244.webp",
    "href": "/admin/vorlagen/datei/social/social-1244.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1245.webp",
    "href": "/admin/vorlagen/datei/social/social-1245.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1246.webp",
    "href": "/admin/vorlagen/datei/social/social-1246.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 24 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1247.webp",
    "href": "/admin/vorlagen/datei/social/social-1247.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1248.webp",
    "href": "/admin/vorlagen/datei/social/social-1248.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1249.webp",
    "href": "/admin/vorlagen/datei/social/social-1249.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1250.webp",
    "href": "/admin/vorlagen/datei/social/social-1250.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 25 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1251.webp",
    "href": "/admin/vorlagen/datei/social/social-1251.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1252.webp",
    "href": "/admin/vorlagen/datei/social/social-1252.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 tuerkis hell · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1253.webp",
    "href": "/admin/vorlagen/datei/social/social-1253.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 tuerkis · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1254.webp",
    "href": "/admin/vorlagen/datei/social/social-1254.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 26 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1255.webp",
    "href": "/admin/vorlagen/datei/social/social-1255.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1256.webp",
    "href": "/admin/vorlagen/datei/social/social-1256.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1257.webp",
    "href": "/admin/vorlagen/datei/social/social-1257.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1258.webp",
    "href": "/admin/vorlagen/datei/social/social-1258.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1259.webp",
    "href": "/admin/vorlagen/datei/social/social-1259.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1260.webp",
    "href": "/admin/vorlagen/datei/social/social-1260.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1261.webp",
    "href": "/admin/vorlagen/datei/social/social-1261.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1262.webp",
    "href": "/admin/vorlagen/datei/social/social-1262.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1263.webp",
    "href": "/admin/vorlagen/datei/social/social-1263.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1264.webp",
    "href": "/admin/vorlagen/datei/social/social-1264.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1265.webp",
    "href": "/admin/vorlagen/datei/social/social-1265.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1266.webp",
    "href": "/admin/vorlagen/datei/social/social-1266.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1267.webp",
    "href": "/admin/vorlagen/datei/social/social-1267.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1268.webp",
    "href": "/admin/vorlagen/datei/social/social-1268.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1269.webp",
    "href": "/admin/vorlagen/datei/social/social-1269.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1270.webp",
    "href": "/admin/vorlagen/datei/social/social-1270.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1271.webp",
    "href": "/admin/vorlagen/datei/social/social-1271.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1272.webp",
    "href": "/admin/vorlagen/datei/social/social-1272.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1273.webp",
    "href": "/admin/vorlagen/datei/social/social-1273.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1274.webp",
    "href": "/admin/vorlagen/datei/social/social-1274.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1275.webp",
    "href": "/admin/vorlagen/datei/social/social-1275.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1276.webp",
    "href": "/admin/vorlagen/datei/social/social-1276.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1277.webp",
    "href": "/admin/vorlagen/datei/social/social-1277.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1278.webp",
    "href": "/admin/vorlagen/datei/social/social-1278.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1279.webp",
    "href": "/admin/vorlagen/datei/social/social-1279.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1280.webp",
    "href": "/admin/vorlagen/datei/social/social-1280.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1281.webp",
    "href": "/admin/vorlagen/datei/social/social-1281.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1282.webp",
    "href": "/admin/vorlagen/datei/social/social-1282.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1283.webp",
    "href": "/admin/vorlagen/datei/social/social-1283.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1284.webp",
    "href": "/admin/vorlagen/datei/social/social-1284.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1285.webp",
    "href": "/admin/vorlagen/datei/social/social-1285.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1286.webp",
    "href": "/admin/vorlagen/datei/social/social-1286.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1287.webp",
    "href": "/admin/vorlagen/datei/social/social-1287.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1288.webp",
    "href": "/admin/vorlagen/datei/social/social-1288.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1289.webp",
    "href": "/admin/vorlagen/datei/social/social-1289.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1290.webp",
    "href": "/admin/vorlagen/datei/social/social-1290.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1291.webp",
    "href": "/admin/vorlagen/datei/social/social-1291.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1292.webp",
    "href": "/admin/vorlagen/datei/social/social-1292.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1293.webp",
    "href": "/admin/vorlagen/datei/social/social-1293.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1294.webp",
    "href": "/admin/vorlagen/datei/social/social-1294.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1295.webp",
    "href": "/admin/vorlagen/datei/social/social-1295.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1296.webp",
    "href": "/admin/vorlagen/datei/social/social-1296.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1297.webp",
    "href": "/admin/vorlagen/datei/social/social-1297.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1298.webp",
    "href": "/admin/vorlagen/datei/social/social-1298.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1299.webp",
    "href": "/admin/vorlagen/datei/social/social-1299.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1300.webp",
    "href": "/admin/vorlagen/datei/social/social-1300.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1301.webp",
    "href": "/admin/vorlagen/datei/social/social-1301.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1302.webp",
    "href": "/admin/vorlagen/datei/social/social-1302.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1303.webp",
    "href": "/admin/vorlagen/datei/social/social-1303.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1304.webp",
    "href": "/admin/vorlagen/datei/social/social-1304.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1305.webp",
    "href": "/admin/vorlagen/datei/social/social-1305.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1306.webp",
    "href": "/admin/vorlagen/datei/social/social-1306.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1307.webp",
    "href": "/admin/vorlagen/datei/social/social-1307.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1308.webp",
    "href": "/admin/vorlagen/datei/social/social-1308.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 tuerkis hell · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1309.webp",
    "href": "/admin/vorlagen/datei/social/social-1309.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 tuerkis · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1310.webp",
    "href": "/admin/vorlagen/datei/social/social-1310.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1311.webp",
    "href": "/admin/vorlagen/datei/social/social-1311.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1312.webp",
    "href": "/admin/vorlagen/datei/social/social-1312.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1313.webp",
    "href": "/admin/vorlagen/datei/social/social-1313.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1314.webp",
    "href": "/admin/vorlagen/datei/social/social-1314.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1315.webp",
    "href": "/admin/vorlagen/datei/social/social-1315.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1316.webp",
    "href": "/admin/vorlagen/datei/social/social-1316.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1317.webp",
    "href": "/admin/vorlagen/datei/social/social-1317.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1318.webp",
    "href": "/admin/vorlagen/datei/social/social-1318.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1319.webp",
    "href": "/admin/vorlagen/datei/social/social-1319.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1320.webp",
    "href": "/admin/vorlagen/datei/social/social-1320.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1321.webp",
    "href": "/admin/vorlagen/datei/social/social-1321.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1322.webp",
    "href": "/admin/vorlagen/datei/social/social-1322.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1323.webp",
    "href": "/admin/vorlagen/datei/social/social-1323.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1324.webp",
    "href": "/admin/vorlagen/datei/social/social-1324.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1325.webp",
    "href": "/admin/vorlagen/datei/social/social-1325.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1326.webp",
    "href": "/admin/vorlagen/datei/social/social-1326.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1327.webp",
    "href": "/admin/vorlagen/datei/social/social-1327.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1328.webp",
    "href": "/admin/vorlagen/datei/social/social-1328.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1329.webp",
    "href": "/admin/vorlagen/datei/social/social-1329.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1330.webp",
    "href": "/admin/vorlagen/datei/social/social-1330.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1331.webp",
    "href": "/admin/vorlagen/datei/social/social-1331.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1332.webp",
    "href": "/admin/vorlagen/datei/social/social-1332.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1333.webp",
    "href": "/admin/vorlagen/datei/social/social-1333.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1334.webp",
    "href": "/admin/vorlagen/datei/social/social-1334.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1335.webp",
    "href": "/admin/vorlagen/datei/social/social-1335.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1336.webp",
    "href": "/admin/vorlagen/datei/social/social-1336.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1337.webp",
    "href": "/admin/vorlagen/datei/social/social-1337.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1338.webp",
    "href": "/admin/vorlagen/datei/social/social-1338.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1339.webp",
    "href": "/admin/vorlagen/datei/social/social-1339.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1340.webp",
    "href": "/admin/vorlagen/datei/social/social-1340.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1341.webp",
    "href": "/admin/vorlagen/datei/social/social-1341.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1342.webp",
    "href": "/admin/vorlagen/datei/social/social-1342.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1343.webp",
    "href": "/admin/vorlagen/datei/social/social-1343.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1344.webp",
    "href": "/admin/vorlagen/datei/social/social-1344.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1345.webp",
    "href": "/admin/vorlagen/datei/social/social-1345.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1346.webp",
    "href": "/admin/vorlagen/datei/social/social-1346.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1347.webp",
    "href": "/admin/vorlagen/datei/social/social-1347.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1348.webp",
    "href": "/admin/vorlagen/datei/social/social-1348.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1349.webp",
    "href": "/admin/vorlagen/datei/social/social-1349.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1350.webp",
    "href": "/admin/vorlagen/datei/social/social-1350.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1351.webp",
    "href": "/admin/vorlagen/datei/social/social-1351.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1352.webp",
    "href": "/admin/vorlagen/datei/social/social-1352.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1353.webp",
    "href": "/admin/vorlagen/datei/social/social-1353.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1354.webp",
    "href": "/admin/vorlagen/datei/social/social-1354.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1355.webp",
    "href": "/admin/vorlagen/datei/social/social-1355.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1356.webp",
    "href": "/admin/vorlagen/datei/social/social-1356.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1357.webp",
    "href": "/admin/vorlagen/datei/social/social-1357.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1358.webp",
    "href": "/admin/vorlagen/datei/social/social-1358.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1359.webp",
    "href": "/admin/vorlagen/datei/social/social-1359.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1360.webp",
    "href": "/admin/vorlagen/datei/social/social-1360.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1361.webp",
    "href": "/admin/vorlagen/datei/social/social-1361.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1362.webp",
    "href": "/admin/vorlagen/datei/social/social-1362.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1363.webp",
    "href": "/admin/vorlagen/datei/social/social-1363.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1364.webp",
    "href": "/admin/vorlagen/datei/social/social-1364.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 tuerkis hell · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1365.webp",
    "href": "/admin/vorlagen/datei/social/social-1365.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 tuerkis · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1366.webp",
    "href": "/admin/vorlagen/datei/social/social-1366.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1367.webp",
    "href": "/admin/vorlagen/datei/social/social-1367.webp",
    "masse": {
      "label": "4:5",
      "w": 1080,
      "h": 1350
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1368.webp",
    "href": "/admin/vorlagen/datei/social/social-1368.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1369.webp",
    "href": "/admin/vorlagen/datei/social/social-1369.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1370.webp",
    "href": "/admin/vorlagen/datei/social/social-1370.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1371.webp",
    "href": "/admin/vorlagen/datei/social/social-1371.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1372.webp",
    "href": "/admin/vorlagen/datei/social/social-1372.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1373.webp",
    "href": "/admin/vorlagen/datei/social/social-1373.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1374.webp",
    "href": "/admin/vorlagen/datei/social/social-1374.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1375.webp",
    "href": "/admin/vorlagen/datei/social/social-1375.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1376.webp",
    "href": "/admin/vorlagen/datei/social/social-1376.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1377.webp",
    "href": "/admin/vorlagen/datei/social/social-1377.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1378.webp",
    "href": "/admin/vorlagen/datei/social/social-1378.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1379.webp",
    "href": "/admin/vorlagen/datei/social/social-1379.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1380.webp",
    "href": "/admin/vorlagen/datei/social/social-1380.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1381.webp",
    "href": "/admin/vorlagen/datei/social/social-1381.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1382.webp",
    "href": "/admin/vorlagen/datei/social/social-1382.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1383.webp",
    "href": "/admin/vorlagen/datei/social/social-1383.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1384.webp",
    "href": "/admin/vorlagen/datei/social/social-1384.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1385.webp",
    "href": "/admin/vorlagen/datei/social/social-1385.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1386.webp",
    "href": "/admin/vorlagen/datei/social/social-1386.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1387.webp",
    "href": "/admin/vorlagen/datei/social/social-1387.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1388.webp",
    "href": "/admin/vorlagen/datei/social/social-1388.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1389.webp",
    "href": "/admin/vorlagen/datei/social/social-1389.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1390.webp",
    "href": "/admin/vorlagen/datei/social/social-1390.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1391.webp",
    "href": "/admin/vorlagen/datei/social/social-1391.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1392.webp",
    "href": "/admin/vorlagen/datei/social/social-1392.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1393.webp",
    "href": "/admin/vorlagen/datei/social/social-1393.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1394.webp",
    "href": "/admin/vorlagen/datei/social/social-1394.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1395.webp",
    "href": "/admin/vorlagen/datei/social/social-1395.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1396.webp",
    "href": "/admin/vorlagen/datei/social/social-1396.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1397.webp",
    "href": "/admin/vorlagen/datei/social/social-1397.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1398.webp",
    "href": "/admin/vorlagen/datei/social/social-1398.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1399.webp",
    "href": "/admin/vorlagen/datei/social/social-1399.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1400.webp",
    "href": "/admin/vorlagen/datei/social/social-1400.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1401.webp",
    "href": "/admin/vorlagen/datei/social/social-1401.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1402.webp",
    "href": "/admin/vorlagen/datei/social/social-1402.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1403.webp",
    "href": "/admin/vorlagen/datei/social/social-1403.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1404.webp",
    "href": "/admin/vorlagen/datei/social/social-1404.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1405.webp",
    "href": "/admin/vorlagen/datei/social/social-1405.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1406.webp",
    "href": "/admin/vorlagen/datei/social/social-1406.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1407.webp",
    "href": "/admin/vorlagen/datei/social/social-1407.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1408.webp",
    "href": "/admin/vorlagen/datei/social/social-1408.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1409.webp",
    "href": "/admin/vorlagen/datei/social/social-1409.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1410.webp",
    "href": "/admin/vorlagen/datei/social/social-1410.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1411.webp",
    "href": "/admin/vorlagen/datei/social/social-1411.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1412.webp",
    "href": "/admin/vorlagen/datei/social/social-1412.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1413.webp",
    "href": "/admin/vorlagen/datei/social/social-1413.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1414.webp",
    "href": "/admin/vorlagen/datei/social/social-1414.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1415.webp",
    "href": "/admin/vorlagen/datei/social/social-1415.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1416.webp",
    "href": "/admin/vorlagen/datei/social/social-1416.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1417.webp",
    "href": "/admin/vorlagen/datei/social/social-1417.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1418.webp",
    "href": "/admin/vorlagen/datei/social/social-1418.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1419.webp",
    "href": "/admin/vorlagen/datei/social/social-1419.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1420.webp",
    "href": "/admin/vorlagen/datei/social/social-1420.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 tuerkis hell · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1421.webp",
    "href": "/admin/vorlagen/datei/social/social-1421.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 tuerkis · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1422.webp",
    "href": "/admin/vorlagen/datei/social/social-1422.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-1423.webp",
    "href": "/admin/vorlagen/datei/social/social-1423.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 01",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-landing-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-landing-01.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-landing-01.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 02",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-landing-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-landing-02.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-landing-02.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Landing / Allgemein · Cover 03",
    "unterKategorie": "Landing / Allgemein",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-landing-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-landing-03.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-landing-03.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 01",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-01.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-01.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 02",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-02.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-02.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 03",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-03.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-03.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 04",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-04.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-04.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 05",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-05.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-05.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 06",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-06.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-06.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 07",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-07.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-07.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 08",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-08.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-08.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-08.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 09",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-09.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-09.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-09.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 10",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-10.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-10.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-10.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 11",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-11.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-11.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-11.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 12",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-12.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-12.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-12.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Praxis · Cover 13",
    "unterKategorie": "Praxis",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-praxis-13.webp",
    "href": "/admin/vorlagen/datei/reels/reel-praxis-13.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-praxis-13.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 01",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-01.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-01.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 02",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-02.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-02.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 03",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-03.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-03.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 04",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-04.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-04.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 05",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-05.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-05.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 06",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-06.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-06.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 07",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-07.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-07.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 08",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-08.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-08.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-08.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 09",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-09.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-09.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-09.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 10",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-10.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-10.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-10.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 11",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-11.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-11.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-11.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 12",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-12.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-12.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-12.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 13",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-13.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-13.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-13.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 14",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-14.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-14.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-14.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 15",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-15.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-15.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-15.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Mentale Selbstverteidigung · Cover 16",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-selbstverteidigung-16.webp",
    "href": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-16.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-selbstverteidigung-16.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 01",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-01.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-stufen-01.zip",
    "captions": [
      {
        "label": "Variante A",
        "titel": "Läuft das automatisch?",
        "text": "Ich hab mal einen Tag lang mitgezählt, wie oft ich wirklich entscheide. Das Ergebnis war ernüchternd: aufgestanden, Handy, derselbe Kaffee, derselbe Weg – und abends derselbe Ärger wie am Tag davor. Ich dachte lange, so bin ich halt. War ich aber nicht. Das war mein Autopilot. Der ist nicht dein Feind, der spart deinem Gehirn Energie. Zum Problem wird er erst, wenn er wiederholt, was du längst nicht mehr willst. Geändert hat sich bei mir nichts, als ich mich mehr zusammengerissen hab – sondern als ich es zum ersten Mal gemerkt hab. Folge für die nächste Stufe. #werdemeisterdeinergedanken #autopilot #gewohnheiten #bewusstsein #achtsamkeit #selbsterkenntnis #mentaltraining #persönlichkeitsentwicklung"
      },
      {
        "label": "Variante B",
        "titel": "Das bin doch ich",
        "text": "„So bin ich eben.\" Den Satz hab ich jahrelang gesagt, als wäre er eine Tatsache – dabei war er nur eine bequeme Ausrede. Das meiste, was ich für meinen Charakter gehalten hab, war antrainiert: von den Eltern, von der Schule, von Erfahrungen, die ich hatte, bevor ich überhaupt wählen konnte. Und jedes dieser Muster hat mir mal geholfen. Das Problem ist nicht, wo sie herkommen – sondern dass sie heute noch laufen, obwohl die alte Situation längst vorbei ist. Du bist nicht dein Muster. Du bist der, der es sich zum ersten Mal von außen anschaut. Hol dir das kostenlose E-Book – Link in Bio. #werdemeisterdeinergedanken #autopilot #muster #konditionierung #bewusstsein #achtsamkeit #selbstreflexion #persönlichkeitsentwicklung"
      },
      {
        "label": "Variante C",
        "titel": "Der Autopilot-Check",
        "text": "Diese eine Frage stell ich mir seit Jahren mehrmals am Tag – und sie ist völlig unspektakulär. Ich halte kurz inne: an der roten Ampel, bevor ich zum Handy greife, zwischen zwei Terminen. Und dann frag ich mich ehrlich: Handle ich gerade bewusst oder automatisch? Ganz wichtig – die Antwort wird nicht bewertet. Am Anfang war sie bei mir fast immer „automatisch\", und das war okay. Es geht nicht ums Ändern, es geht erst mal nur ums Sehen. Dreimal am Tag reicht. Jedes Mal kriegt das Automatische einen kleinen Riss – und dieser Riss ist der Anfang von allem. Speicher dir die Übung und probier sie heute. #werdemeisterdeinergedanken #autopilot #achtsamkeitsübung #achtsamkeit #bewusstsein #innehalten #mentaltraining #präsenz"
      }
    ],
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 02",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-02.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-stufen-02.zip",
    "captions": [
      {
        "label": "Variante A",
        "titel": "Oh, ich denke gerade",
        "text": "Ich saß im Stau und hab mich zum ersten Mal beim Denken erwischt. Kein großer Moment, kein Blitz – ich hab mich innerlich über jemanden aufgeregt, und plötzlich war da ein zweiter Satz: „Ah, ich denke gerade.\" Klingt banal. Aber dieses Bemerken kann selbst kein Gedanke sein, es schaut dem Denken ja zu. Uns hat nie jemand beigebracht, dass Gedanken einfach nur Angebote sind, die kommen und gehen – wir nehmen sie für bare Münze, seit wir klein sind. Deshalb fühlen sich alte Muster so echt an. Folge für die nächste Stufe. #werdemeisterdeinergedanken #erwachen #bewusstsein #achtsamkeit #metakognition #gedanken #selbstwahrnehmung #innerearbeit"
      },
      {
        "label": "Variante B",
        "titel": "Du bist nicht deine Gedanken",
        "text": "Wenn du deine Gedanken hören kannst – wer hört dann eigentlich zu? Die Frage hat mich damals nicht mehr losgelassen. Du kannst deine Gedanken bemerken, du machst es gerade. Also kannst du nicht nur deine Gedanken sein – da ist auch der, der sie hört. Und der war immer schon da: mit sechs, mit zwanzig, heute. Hinter jedem Gedanken, den du je hattest, saß derselbe stille Zuhörer. Ich fand das unglaublich entlastend: Ich muss nichts Neues werden, ich muss mich nur öfter erinnern, wer da zuhört. Da fängt Freiheit an – nicht bei mehr Denken, sondern bei mehr Bemerken. Mach den kostenlosen Bewusstseinstest und finde deine Stufe – Link in Bio. #werdemeisterdeinergedanken #dubistnichtdeinegedanken #erwachen #bewusstsein #achtsamkeit #metakognition #selbstwahrnehmung #bewusstseinstest"
      },
      {
        "label": "Variante C",
        "titel": "Die 3-Sekunden-Pause",
        "text": "Drei Atemzüge – das war meine allererste echte Übung, weil sie überall geht und keine Zeit kostet. Ich halte kurz inne: beim Türöffnen, an der roten Ampel, bevor ich das Handy nehme. Drei ruhige Atemzüge. Und dann frag ich innerlich: Wer nimmt das hier gerade wahr? Erwarte keine Antwort in Worten – ich hab am Anfang darauf gewartet, die kam nie. Spür einfach, dass da jemand ist, hinter dem ganzen Gedankenlärm. Den eigenen Gedanken zusehen zu können ist keine Sonderbegabung, das ist Training. Wie ein Muskel. Speicher dir die Übung und nutze sie heute. #werdemeisterdeinergedanken #erwachen #atemübung #achtsamkeit #bewusstsein #innehalten #präsenz #mentaltraining"
      }
    ],
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 03",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-03.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-stufen-03.zip",
    "captions": [
      {
        "label": "Variante A",
        "titel": "Du springst in jeden Gedanken",
        "text": "Ich bin früher in jeden einzelnen Gedanken reingesprungen. Stell dir einen Fluss vor: Du sitzt am Ufer, deine Gedanken sind das Wasser. Kaum kam bei mir eine Sorge vorbei, war ich schon drin und mitgeschwommen – und zwei Stunden später hab ich mich gefragt, wie ich da hingekommen bin. Der innere Beobachter macht was anderes: Der bleibt sitzen. Nichts muss aufgehalten werden, es darf alles vorbeiziehen. Solange du im Gedanken steckst, siehst du nur den Gedanken – erst ein Schritt zurück zeigt dir das Muster dahinter. Das ist keine Kälte, das ist Überblick. Folge für die nächste Stufe. #werdemeisterdeinergedanken #selbstbeobachtung #innererbeobachter #achtsamkeit #bewusstsein #gedankenbeobachten #mentaleklarheit #persönlichkeitsentwicklung"
      },
      {
        "label": "Variante B",
        "titel": "Nicht ich bin – ich bemerke",
        "text": "Ein einziges Wort hat mich aus dem Griff eines Gedankens geholt. „Ich bin ein Versager\" – den Satz kannte ich gut, und er fühlt sich nicht an wie ein Gedanke, sondern wie die Wahrheit. Dann hab ich gelernt, ihn umzubauen: „Ich bemerke den Gedanken, dass ich ein Versager sei.\" Hör auf den Unterschied. Plötzlich ist der Satz ein Ding in meinem Kopf und nicht mehr die Brille, durch die ich schaue. In der Psychologie heißt das kognitive Defusion – klingt sperrig, heißt einfach: Du klebst nicht mehr am Gedanken fest. Du kämpfst nicht, du gehst einen Schritt zur Seite. Hol dir das kostenlose E-Book – Link in Bio. #werdemeisterdeinergedanken #selbstbeobachtung #defusion #gedanken #achtsamkeit #bewusstsein #innererkritiker #mentaltraining"
      },
      {
        "label": "Variante C",
        "titel": "Gib dem Gedanken ein Etikett",
        "text": "So hab ich Ordnung in mein Gedankenchaos gekriegt: Nimm dir zehn Minuten, setz dich hin und schau deinen Gedanken zu, ohne einzugreifen. Jedes Mal, wenn einer kommt, gibst du ihm ein Etikett – ein Wort reicht. „Planen.\" „Erinnern.\" „Sorgen.\" „Bewerten.\" Mehr nicht, dann zurück zum Zuschauen. Ich war überrascht, wie viel Abstand allein das Benennen macht. Und irgendwann kommt die eigentliche Frage von selbst: Bin ich der Gedanke – oder der, der ihn gerade benennt? Was du klar benennen kannst, verliert seinen Griff. Speicher dir die Übung. #werdemeisterdeinergedanken #selbstbeobachtung #achtsamkeitsübung #gedankenbeobachten #achtsamkeit #bewusstsein #mentaleklarheit #innerearbeit"
      }
    ],
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 04",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-04.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-stufen-04.zip",
    "captions": [
      {
        "label": "Variante A",
        "titel": "Was du wegdrückst, wartet",
        "text": "Ich hab jahrelang geglaubt, verstehen reicht. Tat es nicht. Ich konnte meine Muster sauber erklären – geändert hat sich trotzdem nichts. Weil manche Sachen gar nicht im Kopf sitzen, sondern im Bauch, in der Brust, im Hals. Gefühle, die du nicht fühlst, verschwinden nicht: Sie warten, ziehen Energie ab, färben deine Stimmung und melden sich im ungünstigsten Moment. Und der Verstand erklärt sie lieber, als sie zu fühlen – da ist er richtig kreativ. Aber ein Gefühl löst sich nicht durch Analyse, es löst sich, wenn du wirklich da bist. Wo etwas gehen darf, wird Platz frei. Folge für die nächste Stufe. #werdemeisterdeinergedanken #emotionaleReife #gefühle #loslassen #achtsamkeit #innerearbeit #selbstheilung #persönlichkeitsentwicklung"
      },
      {
        "label": "Variante B",
        "titel": "Reite die Welle",
        "text": "Ich hab mal auf die Uhr geschaut, wie lang ein schweres Gefühl wirklich dauert. Kürzer, als ich dachte. Deutlich kürzer. Wir gehen unangenehmen Gefühlen aus dem Weg, weil wir glauben, sie verschlingen uns. Aber jedes Gefühl hat einen Verlauf: Es steigt an, hat einen Höhepunkt und ebbt wieder ab. Genau am Höhepunkt wollen wir irgendwas tun – essen, streiten, wegscrollen. Wenn du da einmal sitzen bleibst, merkst du: Die Welle trägt dich, sie verschluckt dich nicht. Aushalten ist nichts Passives, das ist eine der aktivsten Sachen überhaupt. Mach den kostenlosen Bewusstseinstest – Link in Bio. #werdemeisterdeinergedanken #emotionaleReife #gefühle #emotionsregulation #achtsamkeit #loslassen #innereruhe #mentaltraining"
      },
      {
        "label": "Variante C",
        "titel": "Lad das Gefühl ein",
        "text": "Diesen einen Satz sag ich zu jedem Gefühl, das nicht gehen will. Nimm dir zehn Minuten und such dir was Mittelschweres – nicht das Schlimmste, was du hast. Erinnere dich daran und spür nach: Wo meldet sich das im Körper? Brust, Bauch, Kehle. Dann atme sanft dahin, nicht dagegen, und lass es da sein, ohne irgendwas ändern zu wollen – ehrlich der schwerste Teil. Und dann innerlich: „Du darfst da sein. Und du darfst gehen.\" Jetzt beobachte, was mit der Intensität passiert. Was Raum kriegt, zieht durch. Und was durchzieht, geht auch wieder. Speicher dir die Übung. #werdemeisterdeinergedanken #emotionaleReife #körperwahrnehmung #gefühlezulassen #achtsamkeit #loslassen #innerearbeit #selbstmitgefühl"
      }
    ],
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 05",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-05.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-stufen-05.zip",
    "captions": [
      {
        "label": "Variante A",
        "titel": "Vom Beobachter zum Gestalter",
        "text": "Was du oft denkst, wird zur Straße in deinem Kopf – und das ist wörtlich gemeint. Die ersten Stufen haben dich frei gemacht vom automatischen Denken, jetzt benutzt du diese Freiheit. Gedanken hinterlassen nämlich Spuren, ganz real im Gehirn. Die Forschung nennt das Neuroplastizität – heißt einfach: Dein Gehirn baut sich nach dem um, was du oft machst. Ein oft gedachter Gedanke wird zum Trampelpfad, der Trampelpfad zur Straße, und irgendwann ist es eine Autobahn, die du fährst, ohne zu lenken. Bisher hast du die unbewusst gebaut. Ab jetzt entscheidest du. Was du fütterst, wächst. Folge für die nächste Stufe. #werdemeisterdeinergedanken #schöpferkraft #gedankenkraft #mindset #bewusstgestalten #neuroplastizität #selbstbild #persönlichkeitsentwicklung"
      },
      {
        "label": "Variante B",
        "titel": "Der Satz muss wahr werden dürfen",
        "text": "Warum die meisten Affirmationen nicht funktionieren – ich hab's selbst falsch gemacht. „Ich bin voller Selbstvertrauen\", gesagt vor dem Spiegel, und innerlich hat alles in mir gesagt: Ja, klar. Wenn ein Satz sich anfühlt wie eine Lüge, wirkt er nicht – dein System glaubt ihn nicht, fertig. Funktioniert hat ein kleinerer Satz: „Ich lerne gerade, mir selbst zu vertrauen.\" Der springt nicht zu weit, der ist ehrlich, und genau deshalb hat er gewirkt. Nimm Sätze, die dein System annehmen kann, und lass sie mit dir mitwachsen. Dein Verhalten folgt nicht deinen Vorsätzen, sondern dem Bild, das du von dir hast. Hol dir das kostenlose E-Book – Link in Bio. #werdemeisterdeinergedanken #schöpferkraft #affirmationen #selbstbild #mindset #selbstvertrauen #gedankenkraft #mentaltraining"
      },
      {
        "label": "Variante C",
        "titel": "Richte deinen Morgen aus",
        "text": "Was ich in den ersten drei Minuten nach dem Aufwachen mache – und zwar bevor ich das Handy anfasse, das ist der ganze Trick. Ich nehm mir einen Moment, noch im Bett, bevor der Autopilot anspringt, und wähle einen Gedanken für den Tag. Ein Satz reicht. Dann spür ich kurz nach, wie es sich anfühlt, aus diesem Satz heraus in den Tag zu gehen. Und jetzt der Teil, den ich jahrelang weggelassen hab: Ein guter Gedanke bleibt Theorie, solange nichts passiert. Also leg ich eine kleine, konkrete Handlung fest. Eine einzige, für heute. Erst wenn Ausrichtung und Tun zusammenkommen, ändert sich wirklich was. Speicher dir die Übung für morgen früh. #werdemeisterdeinergedanken #schöpferkraft #morgenroutine #ausrichtung #achtsamkeit #mindset #gewohnheiten #präsenz"
      }
    ],
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 06",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-06.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-stufen-06.zip",
    "captions": [
      {
        "label": "Variante A",
        "titel": "Der stille Widerspruch",
        "text": "Ich war ständig müde, und keiner konnte mir sagen, warum. Genug geschlafen, nichts Schlimmes los – und trotzdem leer. Bis mir aufgefallen ist, was im Hintergrund läuft: Mein Kopf wollte das eine, mein Bauch was anderes, und gemacht hab ich ein Drittes. Jeden Tag, bei fast jeder Entscheidung. Dieser stille Widerspruch kostet unfassbar viel Kraft, und das Fiese ist: Du merkst ihn nicht, du merkst nur das Ergebnis. Innere Ausrichtung heißt einfach: Denken, Fühlen und Tun zeigen wieder in dieselbe Richtung. Dann hört der Widerstand auf, deine Kraft zu fressen. Folge für die nächste Stufe. #werdemeisterdeinergedanken #innereausrichtung #stimmigkeit #werte #achtsamkeit #bewusstsein #klarheit #persönlichkeitsentwicklung"
      },
      {
        "label": "Variante B",
        "titel": "Das Herz als Kompass",
        "text": "Dein Kopf ist ein brillanter Diener – aber ein ziemlich schlechter Chef. Ich hab lange alles dem Verstand überlassen. Der hat mir sauber ausgerechnet, was ich wollte, nur nie, was ich gebraucht hab. Auf dieser Stufe lernst du, dein Fühlen wieder ernst zu nehmen – nicht als Laune, sondern als leise, ehrliche Rückmeldung. Und wenn Kopf und Bauch mal einer Meinung sind, wird Handeln plötzlich leicht: kein Ringen, kein Aufschieben. Jedes Mal, wenn du nach deinen Werten handelst, wächst Vertrauen zu dir selbst. Und genau das spüren Leute an dir, bevor du was gesagt hast. Mach den kostenlosen Bewusstseinstest – Link in Bio. #werdemeisterdeinergedanken #innereausrichtung #herzkompass #werte #intuition #stimmigkeit #bewusstsein #mentaltraining"
      },
      {
        "label": "Variante C",
        "titel": "Der Kohärenz-Check",
        "text": "Drei Fragen, und ich weiß, wo bei mir gerade die Spannung sitzt. Nimm dir zehn Minuten und denk an eine Entscheidung, die ansteht, oder eine Situation, die immer wiederkommt. Dann frag nacheinander, mit einer Pause dazwischen: Was denkt mein Kopf? Was fühlt mein Herz? Und was tue ich tatsächlich? Schreib's ruhig auf, das macht es ehrlicher. Und dann schau, wo die drei auseinandergehen – genau da sitzt deine Spannung. Du musst nicht dein Leben umbauen, nimm einen kleinen Schritt, der sie wieder in dieselbe Richtung dreht. Fachleute nennen das Kohärenz, heißt nur: Es passt zusammen. Speicher dir den Check. #werdemeisterdeinergedanken #innereausrichtung #kohärenz #entscheidungen #werte #achtsamkeit #klarheit #selbstführung"
      }
    ],
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Die 7 Stufen · Cover 07",
    "unterKategorie": "Die 7 Stufen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-stufen-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-stufen-07.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-stufen-07.zip",
    "captions": [
      {
        "label": "Variante A",
        "titel": "Vom Reagieren zum Gestalten",
        "text": "Ich dachte, irgendwann wackelt nichts mehr. Das war ein Irrtum. Meisterschaft ist kein Punkt, an dem du fertig bist, und ganz sicher kein Zustand ohne Sturm. Auf den Stufen davor hast du gelernt: innehalten, hinschauen, loslassen, neu wählen – und irgendwann machst du das nicht mehr als Übung, sondern einfach, weil du so geworden bist. Zwischen dem, was passiert, und dem, was du tust, liegt ein Raum: die Reiz-Reaktions-Lücke, der kurze Moment, in dem du wählen kannst. Am Anfang musst du ihn suchen, irgendwann wohnst du da. Du reagierst nicht mehr, du gestaltest. Folge für die nächste Stufe. #werdemeisterdeinergedanken #meisterschaft #bewusstsein #achtsamkeit #reizreaktionslücke #haltung #mentaltraining #persönlichkeitsentwicklung"
      },
      {
        "label": "Variante B",
        "titel": "Der Weg ist kein Ziel",
        "text": "Niemand ist für immer Meister. Ich auch nicht. Klingt ernüchternd, ist aber die beste Nachricht auf diesem ganzen Weg – weil es den Druck rausnimmt. Auch mich werfen Tage aus der Bahn, immer noch. Der Unterschied zu früher ist nicht, dass keine Stürme mehr kommen, sondern wie lange ich brauche, um zurückzufinden: früher Wochen, dann Tage, heute manchmal Minuten. Und ich nehm mich dabei nicht mehr ganz so ernst – das hilft mehr, als man denkt. Aus bewusster Technik wird mit genug Wiederholung eine Haltung, die von allein greift. Das ist Meisterschaft: ein Zuhause, in das du immer schneller zurückfindest. Hol dir das kostenlose E-Book – Link in Bio. #werdemeisterdeinergedanken #meisterschaft #selbstmitgefühl #achtsamkeit #bewusstsein #geduld #innerearbeit #persönlichkeitsentwicklung"
      },
      {
        "label": "Variante C",
        "titel": "Umgang mit dem Sturm",
        "text": "Wenn mich was triggert, stell ich mir genau eine Frage. Aber vorher kommt ein Atemzug – nur einer. Nicht antworten, nicht rechtfertigen, nicht zurückschießen. Erst atmen. Dann benenne ich innerlich, was da ist: „Da ist Wut.\" „Da ist Angst.\" Achte auf die Formulierung – nicht „ich bin wütend\", sondern „da ist Wut\". Du bist nicht das Gefühl, du bemerkst es. Und dann die Frage: Wer will ich in diesem Moment sein? Aus dieser Antwort heraus handelst du – bewusst gewählt statt automatisch ausgelöst. Am Anfang braucht das Übung, ich hab den Moment oft genug verpasst. Speicher dir die Übung für den nächsten Sturm. #werdemeisterdeinergedanken #meisterschaft #trigger #emotionsregulation #achtsamkeit #bewusstsein #reizreaktionslücke #mentaltraining"
      }
    ],
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 01",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-01.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-01.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 02",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-02.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-02.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 03",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-03.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-03.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 04",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-04.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-04.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 05",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-05.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-05.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 06",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-06.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-06.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 07",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-07.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-07.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 08",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-08.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-08.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-08.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 09",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-09.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-09.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-09.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 10",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-10.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-10.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-10.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 11",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-11.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-11.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-11.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 12",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-12.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-12.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-12.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Vertiefungen · Cover 13",
    "unterKategorie": "Vertiefungen",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-vertiefungen-13.webp",
    "href": "/admin/vorlagen/datei/reels/reel-vertiefungen-13.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-vertiefungen-13.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 01",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-01.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-01.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-wissenschaft-01.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 02",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-02.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-02.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-wissenschaft-02.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 03",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-03.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-03.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-wissenschaft-03.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 04",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-04.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-04.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-wissenschaft-04.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 05",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-05.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-05.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-wissenschaft-05.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 06",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-06.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-06.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-wissenschaft-06.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "reels",
    "titel": "Wissenschaft · Cover 07",
    "unterKategorie": "Wissenschaft",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/reels/reel-wissenschaft-07.webp",
    "href": "/admin/vorlagen/datei/reels/reel-wissenschaft-07.webp",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ],
    "zipHref": "/admin/vorlagen/datei/reels/reel-wissenschaft-07.zip",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "carousel",
    "titel": "4 6 atmung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.7,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__4-6-atmung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__4-6-atmung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Wenn du einen festen Rhythmus brauchst, gibt dir die 4-6-Atmung Halt. Akut bei Stress, vor Gesprächen oder in Wartemomenten. Speicher dir das Carousel. #werdemeisterdeinergedanken #atemübung #46atmung #stressabbau #beruhigen #atem #achtsamkeit #alltag"
  },
  {
    "kategorie": "carousel",
    "titel": "abend reflexion",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__abend-reflexion/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__abend-reflexion.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Nicht bewerten, nur bemerken: Die Abend-Reflexion macht Muster sichtbar und beruhigt den Kopf vor dem Schlaf. Speicher dir das Carousel. #werdemeisterdeinergedanken #abendritual #reflexion #dankbarkeit #achtsamkeit #innererbeobachter #tagesabschluss #mentaltraining"
  },
  {
    "kategorie": "carousel",
    "titel": "atembeobachtung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__atembeobachtung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__atembeobachtung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Die Kunst liegt nicht darin, nicht abzuschweifen – sondern im freundlichen Zurückkehren. Fünf Minuten genügen für den Anfang. Speicher dir das Carousel als Erinnerung. #werdemeisterdeinergedanken #atembeobachtung #meditation #achtsamkeit #innereruhe #atem #mentaltraining #präsenz"
  },
  {
    "kategorie": "carousel",
    "titel": "body scan",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__body-scan/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__body-scan.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Gefühle und Anspannung sitzen im Körper. Der Body-Scan bringt dich aus dem Kopf ins Spüren – ideal zum Runterkommen am Abend. Speicher ihn dir für später. #werdemeisterdeinergedanken #bodyscan #körperwahrnehmung #entspannung #achtsamkeit #meditation #anspannunglösen #innereruhe"
  },
  {
    "kategorie": "carousel",
    "titel": "box breathing",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.7,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__box-breathing/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__box-breathing.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Box Breathing wird sogar in Hochdruck-Berufen genutzt: vier gleich lange Phasen bilden ein Quadrat aus Atem – ruhig und klar. Speicher es dir für fordernde Momente. #werdemeisterdeinergedanken #boxbreathing #atemübung #fokus #gelassenheit #atem #mentaltraining #innereruhe"
  },
  {
    "kategorie": "carousel",
    "titel": "der autopilot check",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__der-autopilot-check.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Solange der Autopilot unsichtbar bleibt, fühlt er sich einfach wie „du\" an. Dieser Mini-Check unterbricht ihn – gekoppelt an Türklinke oder rote Ampel. Speicher dir die Erinnerung. #werdemeisterdeinergedanken #autopilot #bewusstheit #achtsamkeit #gewohnheiten #präsenz #alltag #mentaltraining"
  },
  {
    "kategorie": "carousel",
    "titel": "der innere beobachter",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__der-innere-beobachter.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "In dieser Meditation bist du nicht der Denker, sondern der Zeuge. Am Ufer sitzen und zusehen verändert alles. Folg uns für den ganzen Weg. #werdemeisterdeinergedanken #innererbeobachter #gedanken #defusion #achtsamkeit #meditation #mentaltraining #loslassen"
  },
  {
    "kategorie": "carousel",
    "titel": "die taegliche rueckkehr",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__die-taegliche-rueckkehr.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Auf dieser Stufe geht es nicht mehr ums Erreichen, sondern ums Bewahren und Weitergeben. Die Kunst ist, immer wieder bewusst in die eigene Mitte zurückzukehren. Folg uns für den ganzen Weg. #werdemeisterdeinergedanken #meisterschaft #präsenz #haltung #achtsamkeit #weitergeben #mitte #mentaltraining"
  },
  {
    "kategorie": "carousel",
    "titel": "herz kohaerenz",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__herz-kohaerenz.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Wenn Atem, Herz und Gefühl zusammenspielen, entsteht innere Stimmigkeit. Ein guter Anker vor Entscheidungen oder bei Stress. Speicher dir die Übung. #werdemeisterdeinergedanken #herzkohärenz #dankbarkeit #atem #innereruhe #meditation #klarheit #mentaltraining"
  },
  {
    "kategorie": "carousel",
    "titel": "loslass ritual",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__loslass-ritual/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__loslass-ritual.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Manches lässt sich nicht wegdenken, aber verabschieden. Ein Ritual gibt dem Loslassen einen klaren, spürbaren Rahmen. Speicher es dir für später. #werdemeisterdeinergedanken #loslassen #ritual #abschluss #innereruhe #achtsamkeit #neuanfang #mentaltraining"
  },
  {
    "kategorie": "carousel",
    "titel": "morgen ausrichtung",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__morgen-ausrichtung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Die ersten Minuten des Tages prägen seinen Ton. Statt sofort in Nachrichten zu kippen, richtest du dich bewusst aus. Speicher dir das Ritual für morgen. #werdemeisterdeinergedanken #morgenritual #ausrichtung #achtsamkeit #tagesstart #absicht #präsenz #mentaltraining"
  },
  {
    "kategorie": "carousel",
    "titel": "praesenz spaziergang",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__praesenz-spaziergang.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Präsenz muss nicht auf dem Kissen stattfinden. Ein bewusster Spaziergang ist gelebte Achtsamkeit – und ein Hund lebt ganz selbstverständlich im Jetzt. Speicher dir die Übung. #werdemeisterdeinergedanken #präsenz #spaziergang #achtsamkeit #sinne #imjetzt #natur #mentaltraining"
  },
  {
    "kategorie": "carousel",
    "titel": "verlaengertes ausatmen",
    "unterKategorie": "Praxis",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 0.7,
    "thumb": "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-01.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-02.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-03.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-04.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-05.webp",
      "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/praxis__verlaengertes-ausatmen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Ein einfacher Hebel mit großer Wirkung: Ist das Ausatmen länger, schaltet der Körper auf Beruhigung. Gut bei Anspannung oder vor dem Einschlafen. Speicher es dir. #werdemeisterdeinergedanken #atemübung #ausatmen #nervensystem #entspannung #beruhigen #atem #innereruhe"
  },
  {
    "kategorie": "carousel",
    "titel": "ablenkung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__ablenkung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Man muss dir die Wahrheit nicht verbergen – es reicht, dich mit Lärm zu fluten, bis du sie nie in Ruhe anschaust. Dauerempörung fühlt sich wie Anteilnahme an und macht doch nur müde. Wähl ein paar gute Quellen und lies sie in Ruhe. #ablenkung #aufmerksamkeit #mentaleselbstverteidigung #kritischesdenken #fokus #klardenken #werdemeisterdeinergedanken #digitaldetox"
  },
  {
    "kategorie": "carousel",
    "titel": "algorithmen",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__algorithmen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Dein Feed ist ein Spiegel, kein Fenster. Er zeigt dir mehr von dem, worauf du schon reagiert hast – und spült Empörung nach oben, weil sie Reichweite bringt. Zähl einmal: Wie viel bestätigt deine Sicht, wie viel fordert sie heraus? #algorithmen #filterblase #mentaleselbstverteidigung #medienkompetenz #kritischesdenken #klardenken #werdemeisterdeinergedanken #socialmedia"
  },
  {
    "kategorie": "carousel",
    "titel": "angst steuerung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__angst-steuerung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Ein ängstlicher Mensch ist der am leichtesten zu lenkende – Angst verengt das Denken auf Schwarz und Weiß. Das Muster: erst Bedrohung, dann Schutz. Atme langsam aus, bevor du entscheidest, und frag: Wer bietet mir gerade Schutz an – und was soll ich dafür geben? #angst #mentaleselbstverteidigung #kritischesdenken #ruhe #selbstschutz #klardenken #werdemeisterdeinergedanken #gelassenheit"
  },
  {
    "kategorie": "carousel",
    "titel": "autoritaetshoerigkeit",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__autoritaetshoerigkeit.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Fachleuten zu vertrauen ist klug – blinder Gehorsam beginnt dort, wo du aufhörst mitzudenken. Zwei Fragen helfen: Spricht die Person aus ihrem Fachgebiet? Und darf sie sich irren? Offenheit für Rückfragen ist ein Zeichen von Seriosität. #autorität #kritischesdenken #mentaleselbstverteidigung #medienkompetenz #wissenschaft #klardenken #werdemeisterdeinergedanken #vertrauen"
  },
  {
    "kategorie": "carousel",
    "titel": "bildmacht",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__bildmacht.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Ein Bild fühlt sich an wie ein Beweis, obwohl es nur ein Ausschnitt ist – gewählt von jemandem, mit einer Absicht. Der Rahmen entscheidet, ob dasselbe Ereignis friedlich oder bedrohlich wirkt. Schau ein emotionales Video einmal ohne Ton und urteile aus dem Rest. #bilder #medienkompetenz #mentaleselbstverteidigung #kritischesdenken #fakenews #klardenken #werdemeisterdeinergedanken #wahrnehmung"
  },
  {
    "kategorie": "carousel",
    "titel": "framing",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__framing.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Dieselben Fakten, ein anderes Wort – und schon fühlt sich alles anders an. Das ist Framing. Es braucht keine falschen Zahlen, nur den passenden Rahmen. Übe die Umformulierungs-Probe: schreib eine Schlagzeile neutral um und schau, was vom Gefühl bleibt. #framing #mentaleselbstverteidigung #kritischesdenken #sprache #medienkompetenz #klardenken #werdemeisterdeinergedanken #kommunikation"
  },
  {
    "kategorie": "carousel",
    "titel": "gruppendruck",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__gruppendruck.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Die Mehrheit, vor der du dich fürchtest, gibt es oft gar nicht. Wer glaubt, allein zu stehen, schweigt – und verstärkt so eine gefühlte Mehrheit, die keine ist. Sag einmal ruhig, was du denkst, und schau, wie viele nicken. #gruppendruck #schweigespirale #mentaleselbstverteidigung #kritischesdenken #mut #klardenken #werdemeisterdeinergedanken #selbstbestimmung"
  },
  {
    "kategorie": "carousel",
    "titel": "identitaet und meinung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__identitaet-und-meinung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Solange du eine Meinung hast, kannst du sie prüfen. Sobald die Meinung dich hat, verteidigst du sie wie dein Leben. Sie ändern zu können ist keine Schwäche, sondern Reife. Frag ehrlich: Halte ich daran fest, weil es stimmt – oder wegen der Zugehörigkeit? #identität #meinung #mentaleselbstverteidigung #selbstreflexion #kritischesdenken #klardenken #werdemeisterdeinergedanken #freiheit"
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive dissonanz",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__kognitive-dissonanz.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Wir weisen Informationen oft nicht zurück, weil sie falsch sind, sondern weil sie unser Weltbild bedrohen. Es ist unbequemer, sich selbst zu widersprechen, als die Wirklichkeit zu verbiegen. Nimm die stärkste Fassung einer Position, die du ablehnst – und prüf sie fair. #kognitivedissonanz #kritischesdenken #mentaleselbstverteidigung #selbstreflexion #psychologie #klardenken #werdemeisterdeinergedanken #ehrlichkeit"
  },
  {
    "kategorie": "carousel",
    "titel": "medien agenda",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__medien-agenda.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Die stärkste Lenkung ist nicht die Meinung, sondern das Thema. Was oft vorkommt, wirkt wichtig; was fehlt, verschwindet aus deinem Kopf. Lies ein Ereignis bei zwei sehr unterschiedlichen Quellen und schau, was die eine weglässt. #medienkompetenz #mentaleselbstverteidigung #kritischesdenken #nachrichten #aufmerksamkeit #klardenken #werdemeisterdeinergedanken #informiert"
  },
  {
    "kategorie": "carousel",
    "titel": "normalisierung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__normalisierung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Große Veränderungen kommen selten mit einem Knall, sondern in kleinen Schritten, an die man sich einzeln gewöhnt. „War doch schon immer so\" ist der Tarnsatz der Gewöhnung – und stimmt fast nie. Nutz deine erste Reaktion als Information, bevor sie verblasst. #normalisierung #kritischesdenken #mentaleselbstverteidigung #gesellschaft #achtsamkeit #klardenken #werdemeisterdeinergedanken #wahrnehmung"
  },
  {
    "kategorie": "carousel",
    "titel": "propaganda",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__propaganda.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Propaganda erkennst du nicht an Parolen, sondern an drei leisen Hebeln: Wiederholung, Emotion, Vereinfachung. Keiner braucht eine Lüge. Frag dich bei deiner stärksten Überzeugung: geprüft oder nur oft gehört? Speicher dir die Frage. #mentaleselbstverteidigung #kritischesdenken #medienkompetenz #propaganda #gedankenfreiheit #klardenken #werdemeisterdeinergedanken #achtsamkeit"
  },
  {
    "kategorie": "carousel",
    "titel": "reizueberflutung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__reizueberflutung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Bevor du fragst, was du denkst, entscheidet dein Zustand, wie du denkst. Zu viele wechselnde, emotionale Reize halten dein System in Daueralarm – und in Alarm denkst du enger und bist leichter steuerbar. Schalt eine Reizquelle ab und atme länger aus als ein. #reizüberflutung #stress #mentaleselbstverteidigung #nervensystem #achtsamkeit #klardenken #werdemeisterdeinergedanken #ruhe"
  },
  {
    "kategorie": "carousel",
    "titel": "sprache und etiketten",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__sprache-und-etiketten.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "„Experte\" oder „Querulant\" – ein einziges Wort entscheidet, ob du zuhörst, bei identischem Satz. Etiketten sparen dir das Denken und genau das ist ihre Gefahr. Zieh das Etikett ab und prüf die Handlung. Welches Reizwort triggert dich sofort? #sprache #etiketten #mentaleselbstverteidigung #kritischesdenken #medienkompetenz #klardenken #werdemeisterdeinergedanken #wörter"
  },
  {
    "kategorie": "carousel",
    "titel": "werbung und mangel",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__werbung-und-mangel.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Werbung verkauft dir selten ein Produkt – öfter einen Mangel, den sie erst weckt. Erst das Loch, dann die Lösung. Die Pause zwischen Impuls und Kauf ist deine Freiheit. Warte 24 Stunden: Ist der Wunsch dann noch da, war er vielleicht echt. #werbung #konsum #mentaleselbstverteidigung #kritischesdenken #achtsamkeit #klardenken #werdemeisterdeinergedanken #minimalismus"
  },
  {
    "kategorie": "carousel",
    "titel": "wiederholung",
    "unterKategorie": "Mentale Selbstverteidigung",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/selbstverteidigung__wiederholung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Dein Gehirn verwechselt „kommt mir bekannt vor\" mit „ist wahr\". Ein Satz, oft genug wiederholt, fühlt sich richtig an – ganz ohne Beleg. Zähl Quellen, nicht Stimmen: Berufen sich alle nur auf dieselbe Ursprungsmeldung? #wiederholung #kritischesdenken #mentaleselbstverteidigung #medienkompetenz #faktencheck #klardenken #werdemeisterdeinergedanken #wahrheit"
  },
  {
    "kategorie": "carousel",
    "titel": "autopilot",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/stufen__autopilot.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Vieles in deinem Alltag läuft ab, ohne dass du es bewusst wählst. Das ist keine Schwäche, sondern Effizienz — bis dieselben Muster sich gegen dich wenden. Der erste Schritt ist nicht Ändern, sondern Sehen. Folge für den Weg durch alle 7 Stufen. #werdemeisterdeinergedanken #autopilot #bewusstsein #achtsamkeit #selbsterkenntnis #gewohnheiten #persönlichkeitsentwicklung #mindset"
  },
  {
    "kategorie": "carousel",
    "titel": "emotionale reifung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/stufen__emotionale-reifung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Erkennen allein reicht oft nicht — manche Muster lösen sich erst, wenn du das Gefühl endlich zulässt. Wo etwas losgelassen wird, entsteht Raum für Ruhe und Kraft. Aushalten ist eine aktive, kraftvolle Fähigkeit. Folge für alle 7 Stufen. #werdemeisterdeinergedanken #emotionaleReife #loslassen #gefühle #innerearbeit #selbstheilung #achtsamkeit #persönlichkeitsentwicklung"
  },
  {
    "kategorie": "carousel",
    "titel": "erwachen",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/stufen__erwachen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Sobald du den Autopiloten bemerkst, geschieht etwas Neues: Du erkennst, dass da jemand ist, der deine Gedanken wahrnimmt. Diese Fähigkeit hat auch einen nüchternen Namen — Metakognition — und sie ist trainierbar. Folge für alle 7 Stufen. #werdemeisterdeinergedanken #erwachen #bewusstsein #gedanken #achtsamkeit #metakognition #selbstwahrnehmung #innerearbeit"
  },
  {
    "kategorie": "carousel",
    "titel": "innere ausrichtung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/stufen__innere-ausrichtung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Auf dieser Stufe geht es um innere Ausrichtung: die Stimmigkeit, aus der Präsenz, Ausstrahlung und ruhige Kraft entstehen. Sie entsteht nicht durch Anstrengung, sondern dadurch, dass Denken, Fühlen und Handeln in dieselbe Richtung zeigen. Folge für alle 7 Stufen. #werdemeisterdeinergedanken #innereAusrichtung #kohärenz #integrität #präsenz #achtsamkeit #persönlichkeitsentwicklung #innerearbeit"
  },
  {
    "kategorie": "carousel",
    "titel": "meisterschaft",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/stufen__meisterschaft.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Meisterschaft ist kein Zustand ohne Sturm, sondern ein Zuhause, in das du immer schneller zurückkehrst. Aus Reagieren wird Gestalten, aus Getriebensein wird Präsenz. Du bist der bewusste Raum, aus dem heraus du dein Leben souverän formst. Folge für den ganzen Weg. #werdemeisterdeinergedanken #meisterschaft #bewusstsein #präsenz #innerefreiheit #achtsamkeit #persönlichkeitsentwicklung #selbstführung"
  },
  {
    "kategorie": "carousel",
    "titel": "schoepferkraft",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/stufen__schoepferkraft.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Jetzt wirst du vom Beobachter zum bewussten Gestalter: Du wählst nicht länger nur die Gedanken, die dir zufällig einfallen, sondern jene, die dich stärken — und setzt sie um. Denn innere Ausrichtung entfaltet ihre Kraft erst im Tun. Folge für den ganzen Weg. #werdemeisterdeinergedanken #schöpferkraft #mindset #gedankenkraft #selbstbild #bewusstgestalten #persönlichkeitsentwicklung #innerearbeit"
  },
  {
    "kategorie": "carousel",
    "titel": "selbstbeobachtung",
    "unterKategorie": "Die 7 Stufen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1,
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
    "href": "/admin/vorlagen/datei/carousels/stufen__selbstbeobachtung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Nach dem Erwachen beginnt die eigentliche Übung: das ruhige Zusehen. Der innere Beobachter urteilt nicht und kämpft nicht — er schaut nur. Genau dieses Schauen entzieht dem Automatismus den Boden. Folge für den ganzen Weg. #werdemeisterdeinergedanken #selbstbeobachtung #achtsamkeit #bewusstsein #gedankenbeobachten #innererbeobachter #mentaleklarheit #persönlichkeitsentwicklung"
  },
  {
    "kategorie": "carousel",
    "titel": "automatische gedanken",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__automatische-gedanken.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Zwischen dem, was passiert, und dem, was du fühlst, liegt immer ein Gedanke. Meist bemerkst du ihn nicht – deshalb hältst du ihn für die Wahrheit. Schreib ihn einmal auf und prüf ihn wie eine Hypothese. Genau da beginnt Veränderung. #gedanken #mentalegesundheit #selbstreflexion #achtsamkeit #psychologie #innerearbeit #kognitiveverzerrung #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "der innere kritiker",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__der-innere-kritiker.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Der innere Kritiker meint es gut, aber mit veralteten Methoden. Wenn du ihn als Gegenüber erkennst statt als deine Wahrheit, hörst du auf, jedes seiner Worte für bare Münze zu nehmen. An seine Seite tritt ein wohlwollender Mentor. #innererkritiker #selbstmitgefühl #selbstwert #mentalegesundheit #psychologie #innerearbeit #achtsamkeit #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "die reiz reaktions luecke",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__die-reiz-reaktions-luecke.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Zwischen dem, was dir passiert, und dem, was du tust, liegt ein winziger Moment. Wer ihn dehnt, hört auf, ein Spielball zu sein. Ein einziger bewusster Atemzug reicht als erster Keil zwischen Reiz und Reaktion. #reizreaktion #selbstregulation #achtsamkeit #mentalegesundheit #psychologie #innerearbeit #gelassenheit #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "emotionsregulation",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__emotionsregulation.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Gefühle haben Anfang und Ende. Du musst sie weder wegdrücken noch dich von ihnen fortreißen lassen. Über den Körper hast du direkten Zugriff: langsames, längeres Ausatmen signalisiert dem Nervensystem Sicherheit – schneller als jedes Argument. #emotionsregulation #gefühle #selbstregulation #mentalegesundheit #psychologie #achtsamkeit #innerearbeit #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "gruebeln und gedankenkreisen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__gruebeln-und-gedankenkreisen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Grübeln ist kein Nachdenken, sondern dasselbe Denken in Wiederholung – ohne Ausgang. Der Test ist einfach: Bin ich einer Antwort näher gekommen? Wenn nicht, hilft kein besserer Gedanke, sondern eine klare Entscheidung, dem Kreisen die Energie zu entziehen. #grübeln #gedankenkreisen #mentalegesundheit #schlaf #psychologie #achtsamkeit #innerearbeit #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "integration und weitergabe",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__integration-und-weitergabe.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Etwas zu verstehen und es zu verkörpern sind zwei verschiedene Dinge. Eine Einsicht wird zur zweiten Natur, wenn du sie im rauen Alltag wiederholst – und wenn du sie in eigenen Worten weitergibst. Genau das festigt die Haltung am meisten. #integration #haltung #persönlichkeitsentwicklung #mentalegesundheit #psychologie #innerearbeit #selbstreflexion #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "kernueberzeugungen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__kernueberzeugungen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Unter deinen vielen Gedanken liegen wenige tiefe Sätze, die einmal sinnvoll waren und heute nur noch filtern. Sie zu finden verändert mehr als jeder Einzelgedanke. Und sie lösen sich nicht durch Behauptungen, sondern durch echte Gegenbeweise. #kernüberzeugungen #glaubenssätze #innerearbeit #mentalegesundheit #psychologie #selbstwert #selbstreflexion #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive verzerrungen",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__kognitive-verzerrungen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Denkfehler folgen nur einer Handvoll Muster. Wenn du sie kennst, erkennst du sie wieder – und ein scheinbar wahrer Gedanke wird zu einem erkennbaren Muster, dem du nicht mehr ausgeliefert bist. #kognitiveverzerrung #denkfehler #mentalegesundheit #psychologie #selbstreflexion #grübeln #achtsamkeit #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "konditionierung",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__konditionierung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Vieles, was sich wie dein Wesen anfühlt, ist antrainiertes Reagieren aus einer anderen Zeit. Die gute Nachricht: Jede neue Erfahrung, in der das Befürchtete ausbleibt, schreibt die alte Kopplung ein Stück um. #konditionierung #nervensystem #gewohnheiten #mentalegesundheit #psychologie #innerearbeit #selbstregulation #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "muster koerper und gesundheit",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__muster-koerper-und-gesundheit.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Anhaltende Muster gehen in den Körper: hochgezogene Schultern, flacher Atem, ein angespannter Bauch. Das ist keine Einbildung und kein Grund für Selbstvorwürfe – Muster sind entstanden, nicht gewählt. Und ein reguliertes Nervensystem entlastet den ganzen Organismus wieder. #nervensystem #stress #körperundgeist #mentalegesundheit #psychologie #achtsamkeit #innerearbeit #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "neuroplastizitaet",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__neuroplastizitaet.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Umlernen ist keine schöne Idee, sondern Biologie. Was du wiederholst, verstärkst du ganz konkret im Gehirn. Deshalb wirkt regelmäßiges Üben mit innerer Beteiligung stärker als jede einmalige Einsicht. #neuroplastizität #gehirn #gewohnheiten #mentalegesundheit #psychologie #innerearbeit #veränderung #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "selbstmitgefuehl",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.2,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__selbstmitgefuehl.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Du wächst nicht, indem du dich kleinmachst, sondern indem du dich hältst wie einen Menschen, der dir wichtig ist. Selbstmitgefühl beschönigt nichts – gerade deshalb ist es der stabilere Boden, von dem aus du handeln kannst. #selbstmitgefühl #selbstfürsorge #selbstwert #mentalegesundheit #psychologie #achtsamkeit #innerearbeit #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "werte und ziele",
    "unterKategorie": "Vertiefungen",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 1.1,
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
    "href": "/admin/vorlagen/datei/carousels/vertiefungen__werte-und-ziele.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Ziele sind Punkte auf einer Landkarte. Werte sind die Himmelsrichtung – sie geben jedem Schritt Bedeutung. Und ein Wert wird erst real, wenn er in einer kleinen konkreten Handlung sichtbar wird: aus „Gesundheit ist mir wichtig\" wird ein Spaziergang. #werte #sinn #ziele #mentalegesundheit #psychologie #selbstreflexion #innerearbeit #werdemeisterdeinergedanken"
  },
  {
    "kategorie": "carousel",
    "titel": "ja ich meine dich",
    "unterKategorie": "Persönliche Geschichten",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 2.7,
    "thumb": "/admin/vorlagen/datei/story/story-01-ja-ich-meine-dich/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/story/story-01-ja-ich-meine-dich/preview-4x5.webp",
      "/admin/vorlagen/datei/story/story-01-ja-ich-meine-dich/preview-1x1.webp",
      "/admin/vorlagen/datei/story/story-01-ja-ich-meine-dich/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/story/story-01-ja-ich-meine-dich.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "aufgehoert zu funktionieren",
    "unterKategorie": "Persönliche Geschichten",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 2.8,
    "thumb": "/admin/vorlagen/datei/story/story-02-aufgehoert-zu-funktionieren/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/story/story-02-aufgehoert-zu-funktionieren/preview-4x5.webp",
      "/admin/vorlagen/datei/story/story-02-aufgehoert-zu-funktionieren/preview-1x1.webp",
      "/admin/vorlagen/datei/story/story-02-aufgehoert-zu-funktionieren/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/story/story-02-aufgehoert-zu-funktionieren.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "nie faul",
    "unterKategorie": "Persönliche Geschichten",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 2.8,
    "thumb": "/admin/vorlagen/datei/story/story-03-nie-faul/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/story/story-03-nie-faul/preview-4x5.webp",
      "/admin/vorlagen/datei/story/story-03-nie-faul/preview-1x1.webp",
      "/admin/vorlagen/datei/story/story-03-nie-faul/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/story/story-03-nie-faul.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "lautester kritiker",
    "unterKategorie": "Persönliche Geschichten",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 2.7,
    "thumb": "/admin/vorlagen/datei/story/story-04-lautester-kritiker/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/story/story-04-lautester-kritiker/preview-4x5.webp",
      "/admin/vorlagen/datei/story/story-04-lautester-kritiker/preview-1x1.webp",
      "/admin/vorlagen/datei/story/story-04-lautester-kritiker/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/story/story-04-lautester-kritiker.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "nicht meine gedanken",
    "unterKategorie": "Persönliche Geschichten",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 2.7,
    "thumb": "/admin/vorlagen/datei/story/story-05-nicht-meine-gedanken/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/story/story-05-nicht-meine-gedanken/preview-4x5.webp",
      "/admin/vorlagen/datei/story/story-05-nicht-meine-gedanken/preview-1x1.webp",
      "/admin/vorlagen/datei/story/story-05-nicht-meine-gedanken/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/story/story-05-nicht-meine-gedanken.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "vom gruebeln zur stille",
    "unterKategorie": "Persönliche Geschichten",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 2.7,
    "thumb": "/admin/vorlagen/datei/story/story-06-vom-gruebeln-zur-stille/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/story/story-06-vom-gruebeln-zur-stille/preview-4x5.webp",
      "/admin/vorlagen/datei/story/story-06-vom-gruebeln-zur-stille/preview-1x1.webp",
      "/admin/vorlagen/datei/story/story-06-vom-gruebeln-zur-stille/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/story/story-06-vom-gruebeln-zur-stille.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Der Sommer, der alles veränderte",
    "unterKategorie": "Persönliche Geschichten · Story",
    "kind": "carousel",
    "slides": 9,
    "sizeMB": 11.1,
    "thumb": "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-01.webp",
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-02.webp",
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-03.webp",
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-04.webp",
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-05.webp",
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-06.webp",
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-07.webp",
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-08.webp",
      "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023/slide-09.webp"
    ],
    "href": "/admin/vorlagen/datei/story-carousel/story-carousel-sommer-2023.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 01",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.2,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-01/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-01/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-01/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-01/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-01.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 02",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-02/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-02/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-02/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-02/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-02.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 03",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.3,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-03/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-03/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-03/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-03/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-03.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 04",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.2,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-04/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-04/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-04/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-04/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-04.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 05",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-05/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-05/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-05/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-05/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-05.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 06",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.3,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-06/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-06/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-06/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-06/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-06.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 07",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.3,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-07/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-07/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-07/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-07/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-07.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 08",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-08/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-08/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-08/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-08/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-08.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 09",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.3,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-09/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-09/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-09/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-09/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-09.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 10",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.3,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-10/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-10/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-10/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-10/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-10.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 11",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.3,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-11/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-11/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-11/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-11/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-11.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 12",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.2,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-12/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-12/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-12/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-12/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-12.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 13",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.2,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-13/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-13/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-13/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-13/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-13.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Zitat 14",
    "unterKategorie": "Zitate · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.3,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-zitate-14/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-14/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-14/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-zitate-14/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-zitate-14.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 01",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-01/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-01/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-01/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-01/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-01.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 02",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-02/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-02/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-02/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-02/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-02.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 03",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-03/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-03/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-03/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-03/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-03.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 04",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.3,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-04/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-04/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-04/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-04/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-04.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 05",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.5,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-05/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-05/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-05/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-05/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-05.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 06",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.2,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-06/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-06/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-06/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-06/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-06.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 07",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-07/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-07/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-07/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-07/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-07.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 08",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.5,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-08/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-08/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-08/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-08/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-08.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 09",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-09/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-09/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-09/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-09/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-09.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 10",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-10/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-10/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-10/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-10/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-10.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 11",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-11/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-11/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-11/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-11/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-11.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 12",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-12/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-12/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-12/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-12/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-12.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 13",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.4,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-13/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-13/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-13/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-13/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-13.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Fakt 14",
    "unterKategorie": "Studien-Fakten · Overlay",
    "kind": "carousel",
    "slides": 3,
    "sizeMB": 3.6,
    "thumb": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-14/preview-4x5.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-14/preview-4x5.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-14/preview-1x1.webp",
      "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-14/preview-9x16.webp"
    ],
    "href": "/admin/vorlagen/datei/content-overlay/overlay-studien-fakten-14.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Landing / Allgemein · Cover 01",
    "unterKategorie": "Landing / Allgemein · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-01/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-01/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-01/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-01/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-01/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-01/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-01.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Landing / Allgemein · Cover 02",
    "unterKategorie": "Landing / Allgemein · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-02/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-02/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-02/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-02/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-02/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-02/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-02.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Landing / Allgemein · Cover 03",
    "unterKategorie": "Landing / Allgemein · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-03/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-03/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-03/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-03/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-03/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-03/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-landing-03.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 01",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-01/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-01/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-01/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-01/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-01/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-01/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-01.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 02",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-02/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-02/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-02/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-02/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-02/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-02/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-02.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 03",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-03/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-03/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-03/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-03/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-03/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-03/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-03.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 04",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-04/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-04/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-04/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-04/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-04/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-04/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-04.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 05",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-05/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-05/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-05/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-05/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-05/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-05/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-05.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 06",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-06/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-06/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-06/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-06/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-06/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-06/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-06.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 07",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-07/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-07/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-07/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-07/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-07/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-07/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-07.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 08",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-08/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-08/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-08/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-08/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-08/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-08/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-08.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 09",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-09/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-09/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-09/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-09/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-09/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-09/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-09.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 10",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-10/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-10/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-10/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-10/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-10/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-10/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-10.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 11",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-11/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-11/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-11/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-11/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-11/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-11/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-11.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 12",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.8,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-12/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-12/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-12/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-12/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-12/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-12/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-12.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Praxis · Cover 13",
    "unterKategorie": "Praxis · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-13/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-13/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-13/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-13/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-13/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-13/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-praxis-13.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 01",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-01/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-01/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-01/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-01/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-01/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-01/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-01.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 02",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-02/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-02/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-02/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-02/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-02/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-02/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-02.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 03",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-03/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-03/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-03/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-03/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-03/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-03/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-03.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 04",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-04/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-04/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-04/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-04/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-04/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-04/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-04.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 05",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-05/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-05/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-05/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-05/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-05/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-05/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-05.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 06",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1.1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-06/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-06/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-06/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-06/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-06/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-06/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-06.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 07",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-07/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-07/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-07/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-07/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-07/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-07/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-07.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 08",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-08/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-08/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-08/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-08/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-08/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-08/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-08.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 09",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-09/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-09/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-09/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-09/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-09/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-09/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-09.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 10",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-10/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-10/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-10/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-10/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-10/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-10/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-10.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 11",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-11/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-11/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-11/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-11/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-11/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-11/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-11.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 12",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-12/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-12/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-12/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-12/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-12/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-12/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-12.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 13",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-13/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-13/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-13/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-13/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-13/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-13/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-13.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 14",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-14/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-14/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-14/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-14/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-14/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-14/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-14.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 15",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1.1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-15/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-15/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-15/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-15/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-15/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-15/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-15.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Mentale Selbstverteidigung · Cover 16",
    "unterKategorie": "Mentale Selbstverteidigung · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-16/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-16/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-16/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-16/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-16/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-16/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-selbstverteidigung-16.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Die 7 Stufen · Cover 01",
    "unterKategorie": "Die 7 Stufen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-01/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-01/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-01/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-01/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-01/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-01/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-01.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Die 7 Stufen · Cover 02",
    "unterKategorie": "Die 7 Stufen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-02/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-02/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-02/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-02/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-02/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-02/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-02.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Die 7 Stufen · Cover 03",
    "unterKategorie": "Die 7 Stufen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-03/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-03/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-03/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-03/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-03/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-03/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-03.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Die 7 Stufen · Cover 04",
    "unterKategorie": "Die 7 Stufen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-04/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-04/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-04/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-04/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-04/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-04/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-04.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Die 7 Stufen · Cover 05",
    "unterKategorie": "Die 7 Stufen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-05/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-05/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-05/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-05/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-05/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-05/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-05.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Die 7 Stufen · Cover 06",
    "unterKategorie": "Die 7 Stufen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-06/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-06/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-06/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-06/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-06/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-06/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-06.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Die 7 Stufen · Cover 07",
    "unterKategorie": "Die 7 Stufen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-07/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-07/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-07/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-07/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-07/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-07/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-stufen-07.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 01",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-01/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-01/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-01/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-01/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-01/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-01/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-01.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 02",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-02/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-02/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-02/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-02/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-02/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-02/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-02.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 03",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-03/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-03/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-03/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-03/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-03/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-03/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-03.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 04",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-04/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-04/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-04/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-04/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-04/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-04/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-04.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 05",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-05/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-05/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-05/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-05/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-05/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-05/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-05.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 06",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-06/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-06/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-06/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-06/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-06/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-06/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-06.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 07",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-07/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-07/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-07/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-07/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-07/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-07/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-07.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 08",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-08/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-08/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-08/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-08/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-08/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-08/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-08.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 09",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-09/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-09/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-09/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-09/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-09/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-09/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-09.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 10",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-10/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-10/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-10/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-10/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-10/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-10/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-10.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 11",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-11/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-11/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-11/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-11/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-11/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-11/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-11.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 12",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-12/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-12/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-12/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-12/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-12/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-12/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-12.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Vertiefungen · Cover 13",
    "unterKategorie": "Vertiefungen · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-13/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-13/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-13/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-13/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-13/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-13/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-vertiefungen-13.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Wissenschaft · Cover 01",
    "unterKategorie": "Wissenschaft · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-01/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-01/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-01/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-01/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-01/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-01/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-01.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Wissenschaft · Cover 02",
    "unterKategorie": "Wissenschaft · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-02/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-02/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-02/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-02/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-02/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-02/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-02.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Wissenschaft · Cover 03",
    "unterKategorie": "Wissenschaft · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-03/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-03/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-03/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-03/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-03/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-03/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-03.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Wissenschaft · Cover 04",
    "unterKategorie": "Wissenschaft · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 1,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-04/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-04/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-04/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-04/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-04/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-04/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-04.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Wissenschaft · Cover 05",
    "unterKategorie": "Wissenschaft · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-05/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-05/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-05/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-05/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-05/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-05/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-05.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Wissenschaft · Cover 06",
    "unterKategorie": "Wissenschaft · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-06/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-06/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-06/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-06/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-06/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-06/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-06.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Wissenschaft · Cover 07",
    "unterKategorie": "Wissenschaft · Cover-Overlay",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-07/preview-reel-9x16.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-07/preview-reel-9x16.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-07/preview-feed-4x5.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-07/preview-feed-1x1.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-07/preview-pin-2x3.webp",
      "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-07/preview-landscape-16x9.webp"
    ],
    "href": "/admin/vorlagen/datei/cover-overlay/cover-overlay-wissenschaft-07.zip",
    "formate": [
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      },
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "2:3",
        "w": 1080,
        "h": 1620
      },
      {
        "label": "16:9",
        "w": 1920,
        "h": 1080
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "das wissen",
    "unterKategorie": "Mitgliederbereich · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__das-wissen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "dein journal",
    "unterKategorie": "Mitgliederbereich · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.2,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-journal.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "dein raum",
    "unterKategorie": "Mitgliederbereich · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__dein-raum.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "der einstieg",
    "unterKategorie": "Mitgliederbereich · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-einstieg.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "der weg",
    "unterKategorie": "Mitgliederbereich · Overlay",
    "kind": "carousel",
    "slides": 8,
    "sizeMB": 6.2,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-07.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg/slide-08.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__der-weg.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "zur ruhe kommen",
    "unterKategorie": "Mitgliederbereich · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.5,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-mitgliederbereich__zur-ruhe-kommen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "4 6 atmung",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__4-6-atmung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__4-6-atmung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__4-6-atmung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__4-6-atmung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__4-6-atmung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__4-6-atmung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__4-6-atmung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__4-6-atmung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "abend reflexion",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__abend-reflexion/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__abend-reflexion/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__abend-reflexion/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__abend-reflexion/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__abend-reflexion/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__abend-reflexion/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__abend-reflexion/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__abend-reflexion.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "atembeobachtung",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__atembeobachtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__atembeobachtung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__atembeobachtung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__atembeobachtung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__atembeobachtung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__atembeobachtung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__atembeobachtung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__atembeobachtung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "body scan",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__body-scan/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__body-scan/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__body-scan/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__body-scan/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__body-scan/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__body-scan/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__body-scan/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__body-scan.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "box breathing",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 3.9,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__box-breathing/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__box-breathing/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__box-breathing/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__box-breathing/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__box-breathing/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__box-breathing/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__box-breathing/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__box-breathing.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "der autopilot check",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.3,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-autopilot-check/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-autopilot-check/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-autopilot-check/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-autopilot-check/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-autopilot-check/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-autopilot-check/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-autopilot-check/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-autopilot-check.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "der innere beobachter",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-innere-beobachter/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-innere-beobachter/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-innere-beobachter/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-innere-beobachter/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-innere-beobachter/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-innere-beobachter/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-innere-beobachter/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__der-innere-beobachter.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "die taegliche rueckkehr",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.7,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__die-taegliche-rueckkehr/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__die-taegliche-rueckkehr/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__die-taegliche-rueckkehr/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__die-taegliche-rueckkehr/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__die-taegliche-rueckkehr/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__die-taegliche-rueckkehr/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__die-taegliche-rueckkehr/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__die-taegliche-rueckkehr.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "herz kohaerenz",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__herz-kohaerenz/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__herz-kohaerenz/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__herz-kohaerenz/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__herz-kohaerenz/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__herz-kohaerenz/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__herz-kohaerenz/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__herz-kohaerenz/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__herz-kohaerenz.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "loslass ritual",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__loslass-ritual/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__loslass-ritual/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__loslass-ritual/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__loslass-ritual/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__loslass-ritual/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__loslass-ritual/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__loslass-ritual/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__loslass-ritual.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "morgen ausrichtung",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__morgen-ausrichtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__morgen-ausrichtung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__morgen-ausrichtung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__morgen-ausrichtung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__morgen-ausrichtung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__morgen-ausrichtung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__morgen-ausrichtung/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__morgen-ausrichtung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "praesenz spaziergang",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.5,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__praesenz-spaziergang/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__praesenz-spaziergang/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__praesenz-spaziergang/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__praesenz-spaziergang/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__praesenz-spaziergang/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__praesenz-spaziergang/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__praesenz-spaziergang/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__praesenz-spaziergang.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "verlaengertes ausatmen",
    "unterKategorie": "Praxis · Overlay",
    "kind": "carousel",
    "slides": 6,
    "sizeMB": 4.2,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__verlaengertes-ausatmen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__verlaengertes-ausatmen/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__verlaengertes-ausatmen/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__verlaengertes-ausatmen/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__verlaengertes-ausatmen/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__verlaengertes-ausatmen/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__verlaengertes-ausatmen/slide-06.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-praxis__verlaengertes-ausatmen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "ablenkung",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.9,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__ablenkung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "algorithmen",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.8,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__algorithmen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "angst steuerung",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.9,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__angst-steuerung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "autoritaetshoerigkeit",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.8,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__autoritaetshoerigkeit.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "bildmacht",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__bildmacht.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "framing",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.7,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__framing.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "gruppendruck",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.7,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__gruppendruck.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "identitaet und meinung",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.8,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__identitaet-und-meinung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive dissonanz",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.1,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__kognitive-dissonanz.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "medien agenda",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.7,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__medien-agenda.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "normalisierung",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.9,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__normalisierung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "propaganda",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.7,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__propaganda.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "reizueberflutung",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.2,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__reizueberflutung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "sprache und etiketten",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__sprache-und-etiketten.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "werbung und mangel",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.7,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__werbung-und-mangel.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "wiederholung",
    "unterKategorie": "Mentale Selbstverteidigung · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.8,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-selbstverteidigung__wiederholung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "autopilot",
    "unterKategorie": "Die 7 Stufen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__autopilot.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "emotionale reifung",
    "unterKategorie": "Die 7 Stufen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.8,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__emotionale-reifung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "erwachen",
    "unterKategorie": "Die 7 Stufen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__erwachen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "innere ausrichtung",
    "unterKategorie": "Die 7 Stufen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__innere-ausrichtung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "meisterschaft",
    "unterKategorie": "Die 7 Stufen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.7,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__meisterschaft.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "schoepferkraft",
    "unterKategorie": "Die 7 Stufen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.7,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__schoepferkraft.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "selbstbeobachtung",
    "unterKategorie": "Die 7 Stufen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-stufen__selbstbeobachtung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "automatische gedanken",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__automatische-gedanken.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "der innere kritiker",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__der-innere-kritiker.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "die reiz reaktions luecke",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.4,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__die-reiz-reaktions-luecke.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "emotionsregulation",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.2,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__emotionsregulation.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "gruebeln und gedankenkreisen",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.3,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__gruebeln-und-gedankenkreisen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "integration und weitergabe",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.1,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__integration-und-weitergabe.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "kernueberzeugungen",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.3,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kernueberzeugungen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "kognitive verzerrungen",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.3,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__kognitive-verzerrungen.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "konditionierung",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.3,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__konditionierung.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "muster koerper und gesundheit",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.6,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__muster-koerper-und-gesundheit.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "neuroplastizitaet",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.3,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__neuroplastizitaet.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "selbstmitgefuehl",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 6.3,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__selbstmitgefuehl.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "werte und ziele",
    "unterKategorie": "Vertiefungen · Overlay",
    "kind": "carousel",
    "slides": 7,
    "sizeMB": 5.9,
    "thumb": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele/slide-01.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele/slide-02.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele/slide-03.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele/slide-04.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele/slide-05.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele/slide-06.webp",
      "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele/slide-07.webp"
    ],
    "href": "/admin/vorlagen/datei/carousel-overlay/carousel-overlay-vertiefungen__werte-und-ziele.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ]
  },
  {
    "kategorie": "carousel",
    "titel": "Bis zu 60.000 Gedanken am Tag",
    "unterKategorie": "Marketing / Funnel",
    "kind": "carousel",
    "slides": 9,
    "sizeMB": 1.6,
    "thumb": "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-01.webp",
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-02.webp",
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-03.webp",
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-04.webp",
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-05.webp",
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-06.webp",
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-07.webp",
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-08.webp",
      "/admin/vorlagen/datei/carousels/marketing__60000-gedanken/slide-09.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/marketing__60000-gedanken.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Bis zu 60.000 Gedanken am Tag – und die wenigsten hast du bewusst gewählt. Die meisten laufen im Autopilot: geprägt von Erinnerungen, Emotionen und Botschaften von außen, oft dieselben Muster, besonders die negativen. Mentale Freiheit beginnt nicht damit, nicht zu denken – sondern zu bemerken, dass nicht jeder Gedanke wirklich deiner ist. Speicher dir den Post und beobachte heute einmal, wie oft du tatsächlich selbst denkst. #werdemeisterdeinergedanken #gedankenkontrolle #mentalefreiheit #achtsamkeit #selbstreflexion #bewusstsein #mindset #innereruhe"
  },
  {
    "kategorie": "carousel",
    "titel": "4 Wege zur mentalen Freiheit",
    "unterKategorie": "Marketing / Funnel",
    "kind": "carousel",
    "slides": 8,
    "sizeMB": 1.4,
    "thumb": "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-01.webp",
      "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-02.webp",
      "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-03.webp",
      "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-04.webp",
      "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-05.webp",
      "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-06.webp",
      "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-07.webp",
      "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit/slide-08.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/marketing__4-wege-freiheit.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Deine Gedanken gehören dir – hol sie dir zurück. Vier Praktiken, die du sofort umsetzen kannst: Achtsamkeit üben, Informationsdiät halten, kritisch denken und positive Gewohnheiten stärken. Du musst nicht alles auf einmal – wähle einen Weg für diese Woche. Speicher dir den Post und schreib mir in die Kommentare, mit welchem Weg du startest. #werdemeisterdeinergedanken #mentalefreiheit #achtsamkeit #informationsdiät #kritischdenken #gewohnheiten #selbstführung #mindset"
  },
  {
    "kategorie": "carousel",
    "titel": "Wer denkt hier eigentlich?",
    "unterKategorie": "Marketing / Funnel",
    "kind": "carousel",
    "slides": 8,
    "sizeMB": 1.5,
    "thumb": "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-01.webp",
      "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-02.webp",
      "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-03.webp",
      "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-04.webp",
      "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-05.webp",
      "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-06.webp",
      "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-07.webp",
      "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier/slide-08.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/marketing__wer-denkt-hier.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Nicht alle deine Gedanken sind wirklich deine eigenen. Werbung, Algorithmen und Gruppendruck formen dein Denken – oft, ohne dass du es merkst. Doch zwischen Reiz und Reaktion liegt ein Raum, und in diesem Raum liegt deine Freiheit. Frag bei jeder Botschaft: Woher kommt sie? Wer profitiert? Welche Emotion soll sie auslösen? Wer das fragt, entscheidet wieder selbst. Speicher dir den Post und beobachte heute einmal bewusst, was deine Gedanken auslöst. #werdemeisterdeinergedanken #werdenkthiereigentlich #manipulation #algorithmen #gruppendruck #achtsamkeit #mentalefreiheit #bewusstsein"
  },
  {
    "kategorie": "carousel",
    "titel": "Studien-Fakten",
    "unterKategorie": "Marketing / Funnel",
    "kind": "carousel",
    "slides": 9,
    "sizeMB": 1.8,
    "thumb": "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-01.webp",
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-02.webp",
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-03.webp",
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-04.webp",
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-05.webp",
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-06.webp",
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-07.webp",
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-08.webp",
      "/admin/vorlagen/datei/carousels/marketing__studien-fakten/slide-09.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/marketing__studien-fakten.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Was weiß die Forschung wirklich über dein Denken? Fünf belegte Erkenntnisse – ehrlich eingeordnet, ohne Hype: Wir sind fast die Hälfte der Zeit gedanklich abwesend (Harvard, 2010). Dein Gehirn bleibt ein Leben lang formbar. Und ein Gefühl in Worte zu fassen, beruhigt messbar die Alarmzentrale im Kopf. Wichtig bleibt: Eine einzelne Studie ist ein Hinweis, kein Beweis – gute Wissenschaft nennt ihre Grenzen selbst. Speicher dir den Post; die Vertiefungen mit allen Quellen findest du auf der Website. #werdemeisterdeinergedanken #neurowissenschaft #neuroplastizität #achtsamkeit #psychologie #gehirn #mentaltraining #wissenschaft"
  },
  {
    "kategorie": "carousel",
    "titel": "Gratis-E-Book",
    "unterKategorie": "Marketing / Funnel",
    "kind": "carousel",
    "slides": 5,
    "sizeMB": 0.9,
    "thumb": "/admin/vorlagen/datei/carousels/marketing__gratis-ebook/slide-01.webp",
    "slidePaths": [
      "/admin/vorlagen/datei/carousels/marketing__gratis-ebook/slide-01.webp",
      "/admin/vorlagen/datei/carousels/marketing__gratis-ebook/slide-02.webp",
      "/admin/vorlagen/datei/carousels/marketing__gratis-ebook/slide-03.webp",
      "/admin/vorlagen/datei/carousels/marketing__gratis-ebook/slide-04.webp",
      "/admin/vorlagen/datei/carousels/marketing__gratis-ebook/slide-05.webp"
    ],
    "href": "/admin/vorlagen/datei/carousels/marketing__gratis-ebook.zip",
    "formate": [
      {
        "label": "4:5",
        "w": 1080,
        "h": 1350
      },
      {
        "label": "1:1",
        "w": 1080,
        "h": 1080
      },
      {
        "label": "9:16",
        "w": 1080,
        "h": 1920
      }
    ],
    "caption": "Werde zum bewussten Gestalter deiner Gedanken – und fang heute an. Mein kostenloses E-Book bringt dir die 7 Stufen der Bewusstseinsentwicklung auf den Punkt: vom Autopilot bis zur Meisterschaft, mit ersten Übungen für den Alltag. Ohne Vorwissen, ohne Druck, in 30 Sekunden in deinem Postfach. Link in Bio oder direkt auf werdemeisterdeinergedanken.de – speicher dir den Post, damit du ihn wiederfindest. #werdemeisterdeinergedanken #7stufen #bewusstsein #achtsamkeit #persönlichkeitsentwicklung #gratisebook #mentaltraining #selbstentwicklung"
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
    "titel": "Anleitung Stripe Mitgliedschaft",
    "unterKategorie": "Anleitungen",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Anleitung-Stripe-Mitgliedschaft.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Bewusstseinstest Wo stehst du",
    "unterKategorie": "Bewusstseinstest & Profil",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
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
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Bewusstseinstest-Wo-stehst-du.pptx"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Deinen Kopf durchdenken",
    "unterKategorie": "Blog & Deep-Dives",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
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
    "titel": "Carousel Texte 7 Stufen",
    "unterKategorie": "Carousel-Texte",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Carousel-Texte-7-Stufen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Carousel Texte Alle Serien",
    "unterKategorie": "Carousel-Texte",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.7,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Carousel-Texte-Alle-Serien.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Carousel Texte Mentale Selbstverteidigung",
    "unterKategorie": "Carousel-Texte",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.2,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Carousel-Texte-Mentale-Selbstverteidigung.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Carousel Texte Praxis",
    "unterKategorie": "Carousel-Texte",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Carousel-Texte-Praxis.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Carousel Texte Vertiefungen",
    "unterKategorie": "Carousel-Texte",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Carousel-Texte-Vertiefungen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Journal und Impulse Die Kraft der Reflexion",
    "unterKategorie": "Journal & Impulse",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
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
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Workshop-Journal-und-Impulse-Die-Kraft-der-Reflexion.pptx"
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
    "titel": "Reel Drehbuch 7 Stufen",
    "unterKategorie": "Reel-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Reel-Drehbuch-7-Stufen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Reel Drehbuch Alle Serien",
    "unterKategorie": "Reel-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.5,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Reel-Drehbuch-Alle-Serien.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Reel Drehbuch Mentale Selbstverteidigung",
    "unterKategorie": "Reel-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Reel-Drehbuch-Mentale-Selbstverteidigung.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Reel Drehbuch Praxis",
    "unterKategorie": "Reel-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Reel-Drehbuch-Praxis.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Reel Drehbuch Vertiefungen",
    "unterKategorie": "Reel-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Reel-Drehbuch-Vertiefungen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Reel Drehbuch Wissenschaft",
    "unterKategorie": "Reel-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Reel-Drehbuch-Wissenschaft.pdf"
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
    "titel": "Video Drehbuch Ablesen",
    "unterKategorie": "Video-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.4,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Video-Drehbuch-Ablesen.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Video Drehbuch Intro",
    "unterKategorie": "Video-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 0.9,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Video-Drehbuch-Intro.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Video Drehbuch Stichpunkt",
    "unterKategorie": "Video-Drehbücher",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1.5,
    "href": "/admin/vorlagen/datei/workshop/WMDG-Video-Drehbuch-Stichpunkt.pdf"
  },
  {
    "kategorie": "workshop",
    "titel": "Moderationsplan Wissensreise Dein Gehirn verstehen",
    "unterKategorie": "Wissensdatenbank",
    "kind": "file",
    "format": "PDF",
    "sizeMB": 1,
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
  }
];
