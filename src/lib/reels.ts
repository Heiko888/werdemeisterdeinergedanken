/**
 * Reels-Produktion (Kurzvideos für Instagram/TikTok/Shorts).
 *
 * Die ausformulierten Skripte liegen in `docs/skripte/reels/`. Hier steht der
 * Produktions-Status je Reel fürs Marketing-Cockpit: sobald ein Reel gedreht
 * (bzw. veröffentlicht) ist, `filmed` auf `true` setzen.
 */
export type Reel = {
  n: number;
  theme: string;
  /** Kurz-Hook / Aufhänger */
  hook: string;
  filmed: boolean;
};

export type ReelSeries = {
  key: string;
  label: string;
  /** Quelle der ausformulierten Skripte (relativ zum Repo) */
  script: string;
  reels: Reel[];
};

export const reelSeries: ReelSeries[] = [
  {
    key: "selbstverteidigung",
    label: "Mentale Selbstverteidigung",
    script: "docs/skripte/reels/mentale-selbstverteidigung.md",
    reels: [
      { n: 1, theme: "Propaganda", hook: "Ohne eine einzige Lüge", filmed: false },
      { n: 2, theme: "Framing", hook: "Ein Wort ändert alles", filmed: false },
      { n: 3, theme: "Sprache & Etiketten", hook: "Ein Wort beendet jede Debatte", filmed: false },
      { n: 4, theme: "Medien-Agenda", hook: "Nicht WAS – sondern WORÜBER", filmed: false },
      { n: 5, theme: "Algorithmen", hook: "Dein Feed ≠ die Welt", filmed: false },
      { n: 6, theme: "Werbung & Mangel", hook: "Sie verkauft dir den Mangel", filmed: false },
      { n: 7, theme: "Gruppendruck", hook: "Laut ≠ Mehrheit", filmed: false },
      { n: 8, theme: "Autoritätshörigkeit", hook: "Titel ≠ Wahrheit", filmed: false },
      { n: 9, theme: "Angst-Steuerung", hook: "Angst macht dich lenkbar", filmed: false },
      { n: 10, theme: "Wiederholung", hook: "Oft gehört = wahr?", filmed: false },
      { n: 11, theme: "Ablenkung", hook: "Keine Lüge. Nur Lärm.", filmed: false },
      { n: 12, theme: "Kognitive Dissonanz", hook: "Warum du wegschaust", filmed: false },
      { n: 13, theme: "Normalisierung", hook: "„War doch schon immer so?“", filmed: false },
      { n: 14, theme: "Bildmacht", hook: "Ein Bild ist kein Beweis", filmed: false },
      { n: 15, theme: "Identität & Meinung", hook: "Hast du eine Meinung – oder sie dich?", filmed: false },
      { n: 16, theme: "Reizüberflutung", hook: "Dein Gehirn im Daueralarm", filmed: false },
    ],
  },
];

export const allReels: Reel[] = reelSeries.flatMap((s) => s.reels);
