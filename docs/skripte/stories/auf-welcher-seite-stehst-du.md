# Interaktive Story – „Auf welcher Seite stehst du?"

Instagram-Story (9:16) zum Bild **Natur ↔ Uhrwerk**: links Frau mit
geschlossenen Augen, Meer, Sonnenuntergang, Vogel, Wasserfall – rechts
riesige Uhr, Zahnräder, Menschen im Anzug im Gleichschritt auf Treppen,
ein Mann sitzt allein unten rechts, den Kopf in der Hand. In der Mitte eine
von Ranken bewachsene Zahnrad-Säule, durch die eine leuchtende **Herzlinie**
von links nach rechts läuft.

**Prinzip:** Das Bild wird **nicht erklärt**. Wir stellen Fragen, die immer
tiefer gehen, bis die Leute sich selbst darin erkennen. Die Botschaft kommt
erst am Ende – und sie ist keine Antwort, sondern eine Frage. Links ist nicht
„gut", rechts nicht „schlecht".

**Dramaturgie in 4 Akten**

| Akt | Ziel | Frames |
|---|---|---|
| 1. Neugier | Hinschauen lassen | 01–02 |
| 2. Wahrnehmung | Was siehst / fühlst du? Keine Bewertung | 03–05 |
| 3. Sich erkennen | Auf welcher Seite stehst du? | 06–10 |
| 4. Erkenntnis | Gleiches Bild, andere Sicht – offen enden | 11–14 |

**Länge:** 14 Frames, ca. 75–90 Sek. Für eine kürzere Fassung (12 Frames)
die optionalen Frames **05** und **11** weglassen.

**Dateien:** `docs/marketing/interaktive-stories/auf-welcher-seite-stehst-du/9x16/`
(Generator: `npm run interaktive-story`, siehe unten).

Legende: `[Regie]` = nicht sprechen · **Fett** = genau so sagen

---

## Frame für Frame

### 01 – Einstieg (Text-Frame `01.png`)
- **Text:** „Schau dir dieses Bild mal *ganz genau* an." / „Nicht nur kurz. Wirklich genau."
- **Sprechen (bei Selfie-Video):** **„Schau dir doch dieses Bild mal ganz genau an."**
- **Sticker:** keiner.

### 02 – Das Bild (Originalbild, kein Text)
- `[Regie]` Bild bildschirmfüllend, **6–8 Sekunden ohne Sprache, ohne Musik-Wechsel**.
- **Tipp:** Ein Foto steht in Instagram nur 5 Sekunden. Für 8 Sekunden das
  Bild als kurzes Video hochladen (Canva: Seite auf 8 s stellen, als MP4
  exportieren – oder per `ffmpeg -loop 1 -i bild.jpg -t 8 -r 30 -pix_fmt yuv420p bild-8s.mp4`).

### 03 – Wohin wandert dein Blick? (Overlay `03-overlay.png` über dem Bild)
- **Text:** „Wohin wandert dein Blick *zuerst*?"
- **Sprechen:** „Was geht dir als Erstes durch den Kopf, wenn du dieses Bild anschaust? Wohin wandert dein Blick? Auf die linke Seite? Auf die rechte? Oder vielleicht genau in die Mitte?"
- **Sticker (unteres Drittel): Umfrage** – „Links" · „Rechts" · „Die Mitte"

### 04 – Was löst es aus? (Text-Frame `04.png`)
- **Text:** „Und was löst dieses Bild in dir aus?" / „Freiheit? Sehnsucht? Druck? Oder ein Gefühl, das du gerade gar nicht richtig beschreiben kannst?"
- **Sticker (unten): Umfrage** – „Freiheit" · „Sehnsucht" · „Druck" · „Kann ich nicht sagen"

### 05 – Schau noch mal hin (Overlay `05-overlay.png`) · *optional*
- **Text:** „Schau noch mal hin" / „Hast du die *Herzlinie* gesehen?" / „Und den Mann ganz unten rechts?"
- `[Regie]` Keine Deutung. Die meisten sehen beim ersten Mal weder den
  Herzschlag noch den sitzenden Mann – genau das ist der Punkt: Wahrnehmung
  ist selektiv. Wer tippt, schaut automatisch zurück auf Frame 02.
- **Sticker:** keiner.

### 06 – Die Kernfrage (Overlay `06-overlay.png`)
- **Text:** „Jetzt eine ganz andere Frage" / „Auf welcher Seite siehst du *dich selbst*?"
- **Sprechen:** **„Auf welcher Seite dieses Bildes siehst du dich selbst?"**
- **Sticker (unten): Umfrage** –
  „🌿 Links – mein Rhythmus" · „⚙️ Rechts – ich funktioniere" · „↔️ Irgendwo dazwischen"

### 07 – Eigener Rhythmus? (Text-Frame `07.png`)
- **Text:** „Lebst du dein Leben in deinem *eigenen Rhythmus*?" / „Oder bist du längst Teil eines Systems geworden, in dem du jeden Tag einfach nur noch funktionierst?"

### 08 – Die Schleife (Text-Frame `08.png`)
- **Text (Stakkato, wird blasser):** „Aufstehen. / Arbeiten. / Verpflichtungen erfüllen. / Schlafen." – „Und am nächsten Morgen beginnt alles *wieder von vorne*."
- `[Regie]` Beim Sprechen nach jedem Wort kurze Pause, monoton werden.

### 09 – Dazwischen (Text-Frame `09.png`)
- **Text:** „Oder stehst du genau *dazwischen*?" / „Du spürst, dass sich etwas verändern müsste. Aber irgendwie läuft trotzdem alles weiter wie bisher."
- **Sticker (unten): Emoji-Slider** 😮‍💨 – „Wie sehr erkennst du dich darin?"

### 10 – Die entscheidende Frage (Text-Frame `10.png`)
- **Text:** „Die für mich entscheidende Frage" / „Ist das Leben, das du gerade führst, das Leben, für das du dich *bewusst entschieden* hast?" / „Oder das Leben, an das du dich irgendwann einfach *gewöhnt* hast?"
- `[Regie]` **Bewusst ohne Sticker** – die Frage soll wirken, nicht abgeklickt werden.
  (Wer mehr Daten will: Umfrage „Bewusst entschieden" · „Daran gewöhnt" · „Ehrlich: weiß nicht".)

### 11 – Überleitung (Overlay `11-overlay.png`) · *optional*
- **Text:** „Weißt du, was ich an diesem Bild so *faszinierend* finde?"

### 12 – Dasselbe Bild (Overlay `12-overlay.png`)
- **Text:** „Wir schauen alle auf *dasselbe* Bild." / „Aber wir sehen nicht zwangsläufig dasselbe."

### 13 – Die Brille (Text-Frame `13.png`)
- **Text:** „Jeder von uns sieht es durch seine eigenen *Erfahrungen*, Überzeugungen und Vorstellungen." / „Der eine sieht rechts Struktur und Sicherheit. Der andere einen Käfig."

### 14 – Deine Sicht (Text-Frame `14.png`)
- **Text:** „Ich bin gespannt" / „Was siehst *DU* in diesem Bild?"
- **Sticker (unten): Fragen-Sticker** – „Was siehst du? Ich lese jede Antwort."
- `[Regie]` **Keine Auflösung, kein Link, kein Verkauf.** Das Ende bleibt offen.

---

## Durchgehender Sprechtext (für eine Selfie-/Voice-over-Fassung)

> Schau dir doch dieses Bild mal ganz genau an.
>
> *[Bild – 6 bis 8 Sekunden Stille]*
>
> Was geht dir als Erstes durch den Kopf, wenn du dieses Bild anschaust?
> Wohin wandert dein Blick? Auf die linke Seite? Auf die rechte? Oder vielleicht genau in die Mitte?
>
> Und was löst dieses Bild eigentlich in dir aus? Freiheit? Sehnsucht? Druck?
> Vielleicht sogar ein Gefühl, das du gerade gar nicht richtig beschreiben kannst?
>
> Jetzt stell dir mal eine ganz andere Frage: **Auf welcher Seite dieses Bildes siehst du dich selbst?**
>
> Lebst du dein Leben in deinem eigenen Rhythmus? Oder bist du vielleicht längst Teil eines Systems geworden, in dem du jeden Tag einfach nur noch funktionierst?
>
> Aufstehen. Arbeiten. Verpflichtungen erfüllen. Schlafen. Und am nächsten Morgen beginnt alles wieder von vorne.
>
> Oder stehst du vielleicht genau dazwischen? Du spürst, dass sich etwas verändern müsste. Aber irgendwie läuft trotzdem alles weiter wie bisher.
>
> Und jetzt kommt die für mich entscheidende Frage:
> **Ist das Leben, das du gerade führst, tatsächlich das Leben, für das du dich bewusst entschieden hast? Oder ist es das Leben, an das du dich irgendwann einfach gewöhnt hast?**
>
> Weißt du, was ich an diesem Bild so faszinierend finde? Wir schauen alle auf dasselbe Bild. Aber wir sehen nicht zwangsläufig dasselbe.
> Denn jeder von uns betrachtet dieses Bild durch seine eigenen Erfahrungen, Überzeugungen und Vorstellungen.
>
> Und genau deshalb interessiert mich jetzt: **Was siehst DU in diesem Bild?**

---

## Tag 2 – Auflösung der Umfragen (Folge-Story, 3–4 Frames)

Erst hier – einen Tag später – kommt die Brücke zum Bewusstsein. Immer noch
ohne „richtig/falsch".

1. **Ergebnis teilen** (Screenshot der Umfrage aus Frame 06): „So habt ihr abgestimmt."
2. **2–3 Antworten aus dem Fragen-Sticker** zeigen (anonym, mit Erlaubnis) –
   am besten zwei, die *gegensätzlich* dasselbe Detail deuten (z. B. rechts =
   „Sicherheit" vs. rechts = „Käfig").
3. **Die Erkenntnis:** „Das Bild ist dasselbe geblieben. Verschieden waren nur
   die Augen, die es angeschaut haben." – „Bewusstsein heißt nicht nur zu
   erkennen, *was* du siehst – sondern zu hinterfragen, *warum* du es so siehst."
4. **Teaser:** „Darüber spreche ich im nächsten Real Talk: *Siehst du die Welt,
   wie sie ist – oder wie du gelernt hast, sie zu sehen?*" (+ Countdown-Sticker)

## Anschluss: Real Talk 2 – „Siehst du die Welt, wie sie ist – oder wie du gelernt hast, sie zu sehen?"

Grobe Linie für das Folgevideo:

- **Hook:** das Umfrageergebnis von Tag 1 – „Gleiches Bild, völlig verschiedene Antworten."
- **Wahrnehmung ist Auswahl:** Wir sehen nicht alles, sondern das, worauf wir
  geprägt sind (Herzlinie und sitzender Mann – kaum jemand hat sie zuerst gesehen).
- **Konditionierung:** Woher kommt meine Deutung? Elternhaus, Erfahrungen,
  Leistungsglaube („Wer funktioniert, ist sicher").
- **Unbewusste Muster:** Wenn rechts für mich automatisch „Käfig" oder
  automatisch „Sicherheit" bedeutet – wer hat das entschieden?
- **Übung:** Bild noch einmal anschauen und sich fragen: „Was sehe ich – und
  welche Erfahrung von mir sieht gerade mit?"
- **Abschluss:** Meister deiner Gedanken wirst du nicht, indem du die „richtige"
  Seite wählst – sondern indem du merkst, *wer* in dir gerade wählt.

---

## Produktion

1. Bild ablegen (für die Vorschau): `docs/marketing/_input/auf-welcher-seite.jpg`
2. Rendern: `npm run interaktive-story` (dunkel + Creme; Türkis per
   `THEME=tuerkis npm run interaktive-story`)
3. In Canva/Instagram zusammensetzen:
   - **Text-Frames** (`01, 04, 07–10, 13, 14`) direkt hochladen.
   - **Overlay-Frames** (`03, 05, 06, 11, 12`): Originalbild als Ebene 1,
     `NN-overlay.png` darüber. Liegt das Bild unter `_input/`, erzeugt der
     Generator zusätzlich `NN-vorschau.png` – fertig zum Hochladen.
   - **Sticker** in Instagram setzen. Frames mit Sticker haben das untere
     Drittel frei (dort ist auch kein Logo).
4. Farbwelt einheitlich halten: entweder alle Text-Frames dunkel oder alle Creme.
   Dunkel passt besser zum Bild.
