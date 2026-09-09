# Design-Check — 2026-09-09 (Fokus: Hero + Startseiten-Gesamteindruck)

Gezielter Nach-Review vor dem Launch, Auftrag des Betreibers: (1) Wirkt der
Hero (`src/components/sections/Hero.tsx`, `public/heiko-hero.webp`) zu dunkel,
ist die Bild-Einbettung hochwertig? (2) Wirkt die Startseite (`src/app/page.tsx`)
wie aus einem Guss, wo gibt es noch Feinschliff vor dem Launch?

Reine Bewertung am Code — **kein Produktivcode geändert**. Der frühere Report
`design-check-2026-09-02.md` ist laut dortigem Umsetzungs-Log vollständig
abgearbeitet (K1/K2/L1–L5/M1/M3/M5/B1/B4/B5 etc.); dieser Durchgang wiederholt
diese Funde **nicht**, sondern ergänzt neue, fokussierte Beobachtungen.

**Legende:** 🔴 Kritisch · 🟠 Wichtig · 🟡 Nice-to-have

---

## Gesamteindruck

Der Hero ist handwerklich sauber gebaut (Masken, Drop-Shadow-Glow, editoriales
Badge, Mobil-/Desktop-Varianten) — der Eindruck „relativ schwarz" des
Betreibers ist trotzdem **objektiv nachvollziehbar**: `--color-navy-900`
(`#0f1218`) ist knapp über Schwarz, und die einzigen Aufhellungen sind zwei
schwache Gold-Radialverläufe (20–22 % Deckkraft) in den Ecken plus ein Glow
hinter dem Kopf. Der Großteil der Fläche — Zentrum, unterer Bereich, die
gesamte linke Textspalte im Hintergrund — bleibt reines dunkles Navy mit 3,5 %
Grain. Direkt darüber sitzt ein durchgehend **weißer** Header: der Sprung
Weiß→Fast-Schwarz beim ersten Bildschirm verstärkt den Eindruck zusätzlich.
Die Bild-Einbettung selbst (Maske, Drop-Shadow, Badge) ist hochwertig gedacht,
aber zu zurückhaltend dosiert, um dagegenzuhalten.

Die Startseite als Ganzes hat einen sauberen, bereits mehrfach nachjustierten
Hell/Dunkel-Takt (Hero→SevenStages→Compass→WhyMe→WhatToExpect→Testimonials→
MaybeNotYou→LeadMagnet→Faq→FinalCta) und konsistente Sektionsabstände
(`py-16 sm:py-32` durchgängig). Der auffälligste verbleibende Bruch ist **nicht**
Farbe, sondern **Typografie**: die Sektions-H2-Größen sind je nach Sektion
handgestrickt statt über `SectionHeading` vereinheitlicht und springen auf
Desktop zwischen 36 px und 48 px hin und her — das ist der Punkt, der „aus
einem Guss" am stärksten unterläuft.

---

## Quick Wins (größte Wirkung, kleinster Aufwand)

1. **HERO_GLOW-Deckkraft anheben** (`src/lib/gradients.ts:11`): `20%`/`22%` →
   `~30%`/`32%`. Wirkt auf Hero, LeadMagnet und FinalCta gleichermaßen wärmer,
   ohne neue Farben einzuführen.
2. **Oberlicht unter dem Header verstärken** (`Hero.tsx:29-36`): Deckkraft
   `13%` → `~20%`. Mildert den harten Weiß→Schwarz-Bruch beim ersten Scroll.
3. **Teal-Schatten im „7 Stufen"-Badge auf Gold umstellen** (`Hero.tsx:75`):
   `rgba(52,196,196,.5)` → z. B. `rgba(217,169,58,.45)` — einziger verbliebener
   Teal-Ausreißer in einem sonst konsequent goldenen Hero.
4. **Sektions-H2 auf eine Skala vereinheitlichen**: `Compass.tsx:37`,
   `WhyMe.tsx:22`, `LeadMagnet.tsx:31` von `text-[2rem] … sm:text-4xl` (Cap bei
   36 px) auf `text-[2rem] … sm:text-4xl md:text-[2.9rem]` (wie
   `SectionHeading.tsx:58`) anheben.
5. **Zweiten, breiteren Gold-Glow hinter Schulter/Oberkörper ergänzen**
   (`Hero.tsx:49-59`): aktueller Glow deckt nur Kopf/Schulter ab (`46% 42% at
   50% 34%`), der Rest des Bildes verschmilzt mit dem Navy-Grund.

---

## 🔴 Kritisch

### H1 — Hero wirkt großflächig dunkel, weil die Aufhellung nur punktuell sitzt
`Hero.tsx:14` setzt `bg-navy-900` (`globals.css:22`, `#0f1218` — praktisch
Schwarz) als Fläche. Aufgehellt wird nur:
- zwei Ecken via `HERO_GLOW` (`gradients.ts:11`), je `20%`/`22%` Deckkraft,
  Radius 45–55 %, außerhalb davon `transparent`;
- ein Oberlicht `13%` Deckkraft nur in der oberen Hälfte (`Hero.tsx:29-36`);
- ein Kopf-Glow hinter dem Porträt (`Hero.tsx:52-59`), lokal begrenzt.

Zentrum und unterer Bereich der `lg:min-h-[42rem]`-Sektion (`Hero.tsx:14`)
bleiben dadurch flächig `#0f1218` + 3,5 % Grain — genau der Bereich, den man
beim Laden zuerst sieht. Das deckt sich mit der Rückmeldung des Betreibers und
ist der Hauptgrund, warum der Hero „relativ schwarz" statt „tief und warm"
wirkt.
→ **Konkret:**
  a) `HERO_GLOW` (`gradients.ts:11`) Deckkraft auf `~30%`/`32%` anheben
     (wirkt auf Hero + LeadMagnet + FinalCta gleich mit — gewünscht, da alle
     drei denselben „warmes Navy"-Charakter tragen sollen).
  b) Oberlicht in `Hero.tsx:34` von `13%` auf `~20%` erhöhen.
  c) Optional, nur für den Hero: Basisfläche von `bg-navy-900` auf
     `bg-navy-850` (`#141821`, bereits im Theme, `globals.css:23`) anheben —
     ein Halbton heller, Tiefe bleibt erhalten, „Schwarzwand"-Eindruck sinkt.
  d) Vorher/Nachher-Check am Screenshot (375×667 und 1440×900) empfohlen, da
     Opacity-Werte am Bildschirm anders wirken als im Code.

---

## 🟠 Wichtig

### H2 — Bild-Glow deckt nur den Kopf, der Körper „verschwindet" im Navy
`Hero.tsx:52-59`: Der Gold-Glow hinter dem Porträt ist als enge Ellipse
positioniert (`radial-gradient(46% 42% at 50% 34%, …)`), die im oberen Drittel
des Bildbereichs sitzt. Das Foto selbst zeigt (siehe `public/heiko-hero.webp`,
1260×1800) ein dunkles T-Shirt, das mit `bg-navy-900` fast verschmilzt — nur
das warm beleuchtete Gesicht hebt sich ab, der ganze untere/rechte Bildbereich
trägt visuell kaum etwas bei, obwohl er auf Desktop bis zu `36rem` breit ist
(`Hero.tsx:49,65`). Das verstärkt zusätzlich den „dunkel/leer"-Eindruck, weil
ein großer Teil der Sektionsfläche (die rechte Bildspalte) faktisch nicht
leuchtet.
→ Zweite, breitere und tiefer sitzende Glow-Ellipse ergänzen (z. B. `radial-
gradient(60% 50% at 50% 60%, … gold-500 12% …)`, deutlich schwächer als der
Kopf-Glow), damit Schulter/Oberkörper nicht ins Schwarz kippen. Alternativ die
Drop-Shadow-Filter in `Hero.tsx:66` (`rgba(217,169,58,0.14)` /
`rgba(217,169,58,0.12)`) auf `~0.20`/`0.16` anheben — mehr sichtbarer
Rand-Glow gerade bei der großen Desktop-Version.

### H3 — Sektions-H2-Größen springen zufällig zwischen 36 px und 48 px
Auf der Startseite gibt es **drei verschiedene** Größen-Rezepte für
Sektions-Überschriften, obwohl `SectionHeading` genau dafür existiert:
- `SectionHeading.tsx:58` (genutzt von SevenStages, WhatToExpect, Testimonials,
  Faq): `text-[1.55rem] → sm:text-4xl (36 px) → md:text-[2.9rem] (46,4 px)`.
- `Compass.tsx:37`, `WhyMe.tsx:22`, `LeadMagnet.tsx:31` (identischer,
  hand-kopierter String): `text-[2rem] → sm:text-4xl` — **kein** `md:`-Wert,
  bleibt ab 640 px für immer bei 36 px, wächst also nie auf die 46 px der
  anderen Sektionen.
- `MaybeNotYou.tsx:32`: `text-[2.1rem] → sm:text-5xl` (48 px, noch größer,
  ebenfalls ohne weiteren `md:`-Schritt).
- `FinalCta.tsx:20`: `text-[2.3rem] → sm:text-5xl` (48 px).

Ergebnis: Beim Scrollen über die Startseite wechseln die H2 auf Desktop
zwischen 36 px (Compass, WhyMe, LeadMagnet) und 46–48 px (SevenStages,
WhatToExpect, Testimonials, Faq, MaybeNotYou, FinalCta) hin und her — ohne
erkennbares Muster. Das ist der deutlichste „nicht aus einem Guss"-Effekt der
Seite, weil er die visuelle Gewichtung Sektion für Sektion verändert.
→ Auf eine Skala vereinheitlichen: `Compass.tsx:37`, `WhyMe.tsx:22`,
`LeadMagnet.tsx:31` auf `text-[2rem] … sm:text-4xl md:text-[2.9rem]` anheben
(matcht `SectionHeading`). `MaybeNotYou.tsx:32`/`FinalCta.tsx:20` entweder
ebenfalls angleichen oder bewusst als „Abschluss-Ausnahme" (größer, zentriert)
belassen — dann aber an beiden Stellen identisch, nicht `2.1rem` vs. `2.3rem`
Mobil-Basis.

### H4 — Teal-Schatten im sonst rein goldenen Hero
`Hero.tsx:75`: Das „7 Stufen"-Badge hat `boxShadow: "0 0 26px -6px
rgba(52,196,196,.5)"` — ein Teal-Ton. `gradients.ts:6` hält für denselben Hero
ausdrücklich fest: „Kein Grün, kein Königsblau mehr – der Verlauf lebt jetzt
allein von zwei Gold-Tönen." Der Teal-Schein im Badge ist der einzige Rest
dieser älteren Farbsprache im Hero und fällt bei genauem Hinsehen aus dem
Rahmen.
→ `rgba(52,196,196,.5)` → goldener Ton, z. B.
`color-mix(in oklab, var(--color-gold-500) 45%, transparent)`.

---

## 🟡 Nice-to-have

### N1 — Crop-Risiko beim Kompass-Bild (Compass-Sektion)
`Compass.tsx:46-50` rendert `kompass-weg.webp` (nativ **1600×900**, 16:9) über
`PhotoFrame aspect="landscape"`, was `aspect-[4/3]` erzwingt
(`PhotoFrame.tsx:26`) — `object-cover` ohne `object-position`
(`PhotoFrame.tsx:43`) schneidet dadurch automatisch beidseitig vom Bild ab.
Die Figur mit Kompass steht im linken Bilddrittel; ein mittiger Beschnitt kann
sie näher an den Rand rücken, als beabsichtigt.
→ `PhotoFrame` um eine `object-position`-Prop erweitern (oder eine
16:9-taugliche `aspect="wide"`-Option ergänzen) und in `Compass.tsx:49`
nutzen. **Visuell bei ~768 px/1024 px gegenprüfen** (Playwright-Screenshot),
bevor man den Code ändert.

### N2 — Editoriale Kapitel-Nummerierung bricht nach „06" ab
`SevenStages` (01) → `Compass` (02) → `WhyMe` (03) → `WhatToExpect` (04) →
`Testimonials` (05) → `MaybeNotYou` (06) — danach haben `LeadMagnet.tsx:30`,
`Faq` und `FinalCta` keine Kapitel-Ziffer mehr. Falls das Absicht ist (nur die
„Reise" zählt, Abschluss-Sektionen nicht), ist das in Ordnung — wirkt aber wie
ein abgebrochenes System, wenn man es nicht kennt.
→ Entweder fortsetzen (07 fürs E-Book) oder bewusst als Konvention notieren.

### N3 — Zwei unterschiedliche „Dunkel"-Rezepturen auf einer Seite
Hero/LeadMagnet/FinalCta nutzen `bg-navy-900` + `HERO_GLOW` (zwei
Gold-Radialverläufe, `gradients.ts:11`), Compass/Testimonials nutzen
`bg-cosmic` (drei Gold-Radialverläufe auf dem dunkleren `navy-950`,
`globals.css:537-555`). Beide lesen sich als „dunkel + Gold", unterscheiden
sich aber in Tiefe/Temperatur. Kein Fehler, aber bei genauem Vergleich (z. B.
Compass direkt nach SevenStages vs. Hero ganz oben) minimal spürbar. Bei
Gelegenheit angleichen oder bewusst als zwei „Dunkel-Stimmungen" dokumentieren.

---

## Vorher/Nachher-Idee für die 3 wichtigsten Punkte

**H1 (Hero-Dunkelheit):** *Vorher* — der Blick fällt beim Laden zuerst auf eine
fast schwarze Fläche, Gold blitzt nur in zwei Ecken auf, der Header davor ist
strahlend weiß. *Nachher* — die Fläche liest sich als „warmes, tiefes Navy mit
Gold-Licht" statt „schwarz mit Gold-Punkten": das Oberlicht unter dem Header
und die beiden Eckglows tragen spürbar mehr Wärme in die Mitte, der Sprung vom
weißen Header wirkt weich statt hart.

**H2 (Porträt-Glow):** *Vorher* — nur der Kopf leuchtet, Schulter/Oberkörper
verschwimmen mit dem Hintergrund, das große Bild „arbeitet" nur zu einem
Drittel. *Nachher* — ein zweiter, ruhigerer Glow unter dem Kopf gibt auch dem
Oberkörper Kontur; das Porträt wirkt als ganze Figur im Licht, nicht als
schwebender Kopf.

**H3 (Typo-Skala):** *Vorher* — beim Scrollen wirken manche Sektionsüber­
schriften (Compass, WhyMe, LeadMagnet) auf großen Screens spürbar kleiner als
ihre Nachbarn, ohne erkennbaren Grund. *Nachher* — alle Sektions-H2 wachsen
nach demselben Muster bis 46 px auf Desktop; die Seite liest sich als eine
durchgehende Typo-Skala statt als Sammlung einzeln gebauter Abschnitte.

---

## Die 3 wichtigsten nächsten Schritte

1. **Hero aufhellen, ohne die Stimmung zu verlieren** (H1 + H2): `HERO_GLOW`-
   und Oberlicht-Deckkraft anheben, zweiten Glow hinter dem Oberkörper
   ergänzen — danach zwingend per Screenshot (375×667 + 1440×900)
   gegenprüfen, ob es „warm" statt „grell" wirkt.
2. **Sektions-H2 auf eine Skala bringen** (H3): `Compass`, `WhyMe`,
   `LeadMagnet` an `SectionHeading`s Desktop-Größe angleichen — größter Hebel
   für „aus einem Guss" auf der restlichen Seite.
3. **Zwei kleine Farbkorrekturen** (H4 Teal-Schatten im Badge, N1 Kompass-Crop
   gegenprüfen) — geringer Aufwand, räumt die letzten Inkonsistenzen vor dem
   Launch aus.

> Umsetzung erst nach Freigabe. Die Helligkeits-/Glow-Werte (H1, H2) sollten
> vor dem Committen unbedingt live im Browser (Playwright-Screenshot, mobil +
> Desktop) gegengeprüft werden — Opacity-Änderungen an Radialverläufen wirken
> am Bildschirm oft anders, als die Prozentzahlen im Code vermuten lassen.
