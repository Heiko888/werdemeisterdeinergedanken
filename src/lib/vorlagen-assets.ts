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
    "titel": "hintergrund",
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
    "titel": "overlay 01",
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
    "titel": "overlay 02",
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
    "titel": "overlay 03",
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
    "titel": "overlay 04",
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
    "titel": "overlay 05",
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
    "titel": "overlay 06",
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
    "titel": "overlay 07",
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
    "titel": "overlay 08",
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
    "titel": "overlay 09",
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
    "titel": "overlay 10",
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
    "titel": "overlay 11",
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
    "titel": "overlay 12",
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
    "titel": "overlay 13",
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
    "titel": "overlay 14",
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
    "titel": "hintergrund",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-016.webp",
    "href": "/admin/vorlagen/datei/social/social-016.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-017.webp",
    "href": "/admin/vorlagen/datei/social/social-017.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-018.webp",
    "href": "/admin/vorlagen/datei/social/social-018.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-019.webp",
    "href": "/admin/vorlagen/datei/social/social-019.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-020.webp",
    "href": "/admin/vorlagen/datei/social/social-020.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-021.webp",
    "href": "/admin/vorlagen/datei/social/social-021.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-022.webp",
    "href": "/admin/vorlagen/datei/social/social-022.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-023.webp",
    "href": "/admin/vorlagen/datei/social/social-023.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-024.webp",
    "href": "/admin/vorlagen/datei/social/social-024.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-025.webp",
    "href": "/admin/vorlagen/datei/social/social-025.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-026.webp",
    "href": "/admin/vorlagen/datei/social/social-026.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-027.webp",
    "href": "/admin/vorlagen/datei/social/social-027.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-028.webp",
    "href": "/admin/vorlagen/datei/social/social-028.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-029.webp",
    "href": "/admin/vorlagen/datei/social/social-029.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-030.webp",
    "href": "/admin/vorlagen/datei/social/social-030.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-031.webp",
    "href": "/admin/vorlagen/datei/social/social-031.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-032.webp",
    "href": "/admin/vorlagen/datei/social/social-032.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-033.webp",
    "href": "/admin/vorlagen/datei/social/social-033.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-034.webp",
    "href": "/admin/vorlagen/datei/social/social-034.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-035.webp",
    "href": "/admin/vorlagen/datei/social/social-035.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-036.webp",
    "href": "/admin/vorlagen/datei/social/social-036.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-037.webp",
    "href": "/admin/vorlagen/datei/social/social-037.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-038.webp",
    "href": "/admin/vorlagen/datei/social/social-038.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-039.webp",
    "href": "/admin/vorlagen/datei/social/social-039.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-040.webp",
    "href": "/admin/vorlagen/datei/social/social-040.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-041.webp",
    "href": "/admin/vorlagen/datei/social/social-041.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-042.webp",
    "href": "/admin/vorlagen/datei/social/social-042.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-043.webp",
    "href": "/admin/vorlagen/datei/social/social-043.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-044.webp",
    "href": "/admin/vorlagen/datei/social/social-044.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-045.webp",
    "href": "/admin/vorlagen/datei/social/social-045.webp",
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
    "titel": "overlay 01",
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
    "titel": "overlay 02",
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
    "titel": "overlay 03",
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
    "titel": "overlay 04",
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
    "titel": "overlay 05",
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
    "titel": "overlay 06",
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
    "titel": "overlay 07",
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
    "titel": "overlay 08",
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
    "titel": "overlay 09",
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
    "titel": "overlay 10",
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
    "titel": "overlay 11",
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
    "titel": "overlay 12",
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
    "titel": "overlay 13",
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
    "titel": "overlay 14",
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
    "titel": "hintergrund",
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
    "titel": "overlay 01",
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
    "titel": "overlay 02",
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
    "titel": "overlay 03",
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
    "titel": "overlay 04",
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
    "titel": "overlay 05",
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
    "titel": "overlay 06",
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
    "titel": "overlay 07",
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
    "titel": "overlay 08",
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
    "titel": "overlay 09",
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
    "titel": "overlay 10",
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
    "titel": "overlay 11",
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
    "titel": "overlay 12",
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
    "titel": "overlay 13",
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
    "titel": "overlay 14",
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
    "titel": "hintergrund",
    "unterKategorie": "content overlays",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-076.webp",
    "href": "/admin/vorlagen/datei/social/social-076.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-077.webp",
    "href": "/admin/vorlagen/datei/social/social-077.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-078.webp",
    "href": "/admin/vorlagen/datei/social/social-078.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-079.webp",
    "href": "/admin/vorlagen/datei/social/social-079.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-080.webp",
    "href": "/admin/vorlagen/datei/social/social-080.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-081.webp",
    "href": "/admin/vorlagen/datei/social/social-081.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-082.webp",
    "href": "/admin/vorlagen/datei/social/social-082.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-083.webp",
    "href": "/admin/vorlagen/datei/social/social-083.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-084.webp",
    "href": "/admin/vorlagen/datei/social/social-084.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-085.webp",
    "href": "/admin/vorlagen/datei/social/social-085.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-086.webp",
    "href": "/admin/vorlagen/datei/social/social-086.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-087.webp",
    "href": "/admin/vorlagen/datei/social/social-087.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-088.webp",
    "href": "/admin/vorlagen/datei/social/social-088.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-089.webp",
    "href": "/admin/vorlagen/datei/social/social-089.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-090.webp",
    "href": "/admin/vorlagen/datei/social/social-090.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 16x9",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-091.webp",
    "href": "/admin/vorlagen/datei/social/social-091.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 1x1",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-092.webp",
    "href": "/admin/vorlagen/datei/social/social-092.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 2x3",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-093.webp",
    "href": "/admin/vorlagen/datei/social/social-093.webp",
    "masse": {
      "label": "2:3",
      "w": 2000,
      "h": 3000
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 4x5",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-094.webp",
    "href": "/admin/vorlagen/datei/social/social-094.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Ebook 9x16",
    "unterKategorie": "ebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-095.webp",
    "href": "/admin/vorlagen/datei/social/social-095.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Facebook Cover",
    "unterKategorie": "Facebook",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-096.webp",
    "href": "/admin/vorlagen/datei/social/social-096.webp",
    "masse": {
      "label": "",
      "w": 1640,
      "h": 624
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 16x9",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-097.webp",
    "href": "/admin/vorlagen/datei/social/social-097.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 1x1",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-098.webp",
    "href": "/admin/vorlagen/datei/social/social-098.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 2x3",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-099.webp",
    "href": "/admin/vorlagen/datei/social/social-099.webp",
    "masse": {
      "label": "2:3",
      "w": 2000,
      "h": 3000
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 4x5",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-100.webp",
    "href": "/admin/vorlagen/datei/social/social-100.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story 9x16",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-101.webp",
    "href": "/admin/vorlagen/datei/social/social-101.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Instagram Story Logo",
    "unterKategorie": "Instagram",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-102.webp",
    "href": "/admin/vorlagen/datei/social/social-102.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-103.webp",
    "href": "/admin/vorlagen/datei/social/social-103.webp",
    "masse": {
      "label": "9:16",
      "w": 1080,
      "h": 1920
    }
  },
  {
    "kategorie": "social",
    "titel": "LinkedIn Banner",
    "unterKategorie": "LinkedIn",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-104.webp",
    "href": "/admin/vorlagen/datei/social/social-104.webp",
    "masse": {
      "label": "4:1",
      "w": 2160,
      "h": 540
    }
  },
  {
    "kategorie": "social",
    "titel": "Messenger Kanalbild",
    "unterKategorie": "Messenger",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-105.webp",
    "href": "/admin/vorlagen/datei/social/social-105.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Kanalbild Quadrat",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-106.webp",
    "href": "/admin/vorlagen/datei/social/social-106.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild 1080",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-107.webp",
    "href": "/admin/vorlagen/datei/social/social-107.webp",
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
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-108.webp",
    "href": "/admin/vorlagen/datei/social/social-108.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild rund 1080",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-109.webp",
    "href": "/admin/vorlagen/datei/social/social-109.webp",
    "masse": {
      "label": "1:1",
      "w": 1080,
      "h": 1080
    }
  },
  {
    "kategorie": "social",
    "titel": "Profilbild rund 500",
    "unterKategorie": "Profil & Kanal",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-110.webp",
    "href": "/admin/vorlagen/datei/social/social-110.webp",
    "masse": {
      "label": "1:1",
      "w": 500,
      "h": 500
    }
  },
  {
    "kategorie": "social",
    "titel": "YouTube Banner",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-111.webp",
    "href": "/admin/vorlagen/datei/social/social-111.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 01",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-112.webp",
    "href": "/admin/vorlagen/datei/social/social-112.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail 02",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-113.webp",
    "href": "/admin/vorlagen/datei/social/social-113.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "Thumbnail vorlage",
    "unterKategorie": "YouTube",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-114.webp",
    "href": "/admin/vorlagen/datei/social/social-114.webp",
    "masse": {
      "label": "16:9",
      "w": 2160,
      "h": 1215
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-115.webp",
    "href": "/admin/vorlagen/datei/social/social-115.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-116.webp",
    "href": "/admin/vorlagen/datei/social/social-116.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-117.webp",
    "href": "/admin/vorlagen/datei/social/social-117.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-118.webp",
    "href": "/admin/vorlagen/datei/social/social-118.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-119.webp",
    "href": "/admin/vorlagen/datei/social/social-119.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-120.webp",
    "href": "/admin/vorlagen/datei/social/social-120.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-121.webp",
    "href": "/admin/vorlagen/datei/social/social-121.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-122.webp",
    "href": "/admin/vorlagen/datei/social/social-122.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-123.webp",
    "href": "/admin/vorlagen/datei/social/social-123.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-124.webp",
    "href": "/admin/vorlagen/datei/social/social-124.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-125.webp",
    "href": "/admin/vorlagen/datei/social/social-125.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-126.webp",
    "href": "/admin/vorlagen/datei/social/social-126.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-127.webp",
    "href": "/admin/vorlagen/datei/social/social-127.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 · 1:1",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-128.webp",
    "href": "/admin/vorlagen/datei/social/social-128.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-129.webp",
    "href": "/admin/vorlagen/datei/social/social-129.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-130.webp",
    "href": "/admin/vorlagen/datei/social/social-130.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-131.webp",
    "href": "/admin/vorlagen/datei/social/social-131.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-132.webp",
    "href": "/admin/vorlagen/datei/social/social-132.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-133.webp",
    "href": "/admin/vorlagen/datei/social/social-133.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-134.webp",
    "href": "/admin/vorlagen/datei/social/social-134.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-135.webp",
    "href": "/admin/vorlagen/datei/social/social-135.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-136.webp",
    "href": "/admin/vorlagen/datei/social/social-136.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-137.webp",
    "href": "/admin/vorlagen/datei/social/social-137.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-138.webp",
    "href": "/admin/vorlagen/datei/social/social-138.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-139.webp",
    "href": "/admin/vorlagen/datei/social/social-139.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-140.webp",
    "href": "/admin/vorlagen/datei/social/social-140.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-141.webp",
    "href": "/admin/vorlagen/datei/social/social-141.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 · 4:5",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-142.webp",
    "href": "/admin/vorlagen/datei/social/social-142.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 01 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-143.webp",
    "href": "/admin/vorlagen/datei/social/social-143.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 02 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-144.webp",
    "href": "/admin/vorlagen/datei/social/social-144.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 03 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-145.webp",
    "href": "/admin/vorlagen/datei/social/social-145.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 04 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-146.webp",
    "href": "/admin/vorlagen/datei/social/social-146.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 05 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-147.webp",
    "href": "/admin/vorlagen/datei/social/social-147.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 06 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-148.webp",
    "href": "/admin/vorlagen/datei/social/social-148.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 07 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-149.webp",
    "href": "/admin/vorlagen/datei/social/social-149.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 08 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-150.webp",
    "href": "/admin/vorlagen/datei/social/social-150.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 09 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-151.webp",
    "href": "/admin/vorlagen/datei/social/social-151.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 10 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-152.webp",
    "href": "/admin/vorlagen/datei/social/social-152.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 11 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-153.webp",
    "href": "/admin/vorlagen/datei/social/social-153.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 12 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-154.webp",
    "href": "/admin/vorlagen/datei/social/social-154.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 13 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-155.webp",
    "href": "/admin/vorlagen/datei/social/social-155.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Zitat 14 · 9:16",
    "unterKategorie": "Zitate",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-156.webp",
    "href": "/admin/vorlagen/datei/social/social-156.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-157.webp",
    "href": "/admin/vorlagen/datei/social/social-157.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-158.webp",
    "href": "/admin/vorlagen/datei/social/social-158.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-159.webp",
    "href": "/admin/vorlagen/datei/social/social-159.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-160.webp",
    "href": "/admin/vorlagen/datei/social/social-160.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-161.webp",
    "href": "/admin/vorlagen/datei/social/social-161.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-162.webp",
    "href": "/admin/vorlagen/datei/social/social-162.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-163.webp",
    "href": "/admin/vorlagen/datei/social/social-163.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-164.webp",
    "href": "/admin/vorlagen/datei/social/social-164.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-165.webp",
    "href": "/admin/vorlagen/datei/social/social-165.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-166.webp",
    "href": "/admin/vorlagen/datei/social/social-166.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-167.webp",
    "href": "/admin/vorlagen/datei/social/social-167.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-168.webp",
    "href": "/admin/vorlagen/datei/social/social-168.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-169.webp",
    "href": "/admin/vorlagen/datei/social/social-169.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 · 1:1",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-170.webp",
    "href": "/admin/vorlagen/datei/social/social-170.webp",
    "masse": {
      "label": "1:1",
      "w": 2160,
      "h": 2160
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-171.webp",
    "href": "/admin/vorlagen/datei/social/social-171.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-172.webp",
    "href": "/admin/vorlagen/datei/social/social-172.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-173.webp",
    "href": "/admin/vorlagen/datei/social/social-173.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-174.webp",
    "href": "/admin/vorlagen/datei/social/social-174.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-175.webp",
    "href": "/admin/vorlagen/datei/social/social-175.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-176.webp",
    "href": "/admin/vorlagen/datei/social/social-176.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-177.webp",
    "href": "/admin/vorlagen/datei/social/social-177.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-178.webp",
    "href": "/admin/vorlagen/datei/social/social-178.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-179.webp",
    "href": "/admin/vorlagen/datei/social/social-179.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-180.webp",
    "href": "/admin/vorlagen/datei/social/social-180.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-181.webp",
    "href": "/admin/vorlagen/datei/social/social-181.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-182.webp",
    "href": "/admin/vorlagen/datei/social/social-182.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-183.webp",
    "href": "/admin/vorlagen/datei/social/social-183.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 · 4:5",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-184.webp",
    "href": "/admin/vorlagen/datei/social/social-184.webp",
    "masse": {
      "label": "4:5",
      "w": 2160,
      "h": 2700
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 01 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-185.webp",
    "href": "/admin/vorlagen/datei/social/social-185.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 02 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-186.webp",
    "href": "/admin/vorlagen/datei/social/social-186.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 03 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-187.webp",
    "href": "/admin/vorlagen/datei/social/social-187.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 04 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-188.webp",
    "href": "/admin/vorlagen/datei/social/social-188.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 05 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-189.webp",
    "href": "/admin/vorlagen/datei/social/social-189.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 06 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-190.webp",
    "href": "/admin/vorlagen/datei/social/social-190.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 07 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-191.webp",
    "href": "/admin/vorlagen/datei/social/social-191.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 08 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-192.webp",
    "href": "/admin/vorlagen/datei/social/social-192.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 09 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-193.webp",
    "href": "/admin/vorlagen/datei/social/social-193.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 10 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-194.webp",
    "href": "/admin/vorlagen/datei/social/social-194.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 11 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-195.webp",
    "href": "/admin/vorlagen/datei/social/social-195.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 12 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-196.webp",
    "href": "/admin/vorlagen/datei/social/social-196.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 13 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-197.webp",
    "href": "/admin/vorlagen/datei/social/social-197.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
    }
  },
  {
    "kategorie": "social",
    "titel": "Studienfakt 14 · 9:16",
    "unterKategorie": "Studien-Fakten",
    "kind": "image",
    "thumb": "/admin/vorlagen/datei/thumbs/social/social-198.webp",
    "href": "/admin/vorlagen/datei/social/social-198.webp",
    "masse": {
      "label": "9:16",
      "w": 2160,
      "h": 3840
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
