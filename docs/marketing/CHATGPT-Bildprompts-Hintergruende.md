# ChatGPT-Bildprompts — Hintergründe für Carousels & Reel-Cover

> **Zweck:** Fertige Copy-&-Paste-Prompts für ChatGPT (Bildgenerierung), um
> **markenkonforme Hintergründe** zu erzeugen. Dein eigenes Foto von dir legst
> du anschließend darüber, den Text liefert das Overlay bzw. der Generator.
>
> Basiert auf `docs/brandbook/06-bildwelt.md` und
> `docs/marketing/BILDPLAN-Fotohintergruende.md`.

---

## So nutzt du diese Datei

1. In ChatGPT den **Bildmodus** wählen.
2. **Basis-Stil** (unten) + den gewünschten **Serien-Prompt** zusammen einfügen.
3. Am Ende das passende **Seitenverhältnis** angeben (siehe Tabelle).
4. Bild herunterladen → in Canva:
   - **dein Foto** von dir platzieren (Gesicht in die freie/helle Zone),
   - dann das **Overlay-PNG** (Logo + Text + Scrim) darüberlegen
     (`docs/carousels/export-overlay/…` bzw. `docs/reels/covers/export-overlay/…`),
   - oder das fertige Bild als `vorlage.png` in den Generator geben.

> **Wichtig:** Der Hintergrund enthält **keinen Text und kein Logo** – das kommt
> aus dem Marken-Overlay. So bleibt alles konsistent.

### Seitenverhältnisse (ChatGPT kann kein exaktes 4:5 / 9:16)

| Ziel | In ChatGPT anfordern | Danach zuschneiden auf |
|------|----------------------|------------------------|
| Carousel 4:5 (1080×1350) | **Portrait 2:3 (1024×1536)** | 4:5 |
| Carousel/Reel 9:16 (1080×1920) | **Portrait 2:3 (1024×1536)** | 9:16 (oben/unten leicht beschneiden) |
| Feed 1:1 (1080×1080) | **Quadratisch 1:1 (1024×1024)** | 1:1 |
| YouTube 16:9 (1920×1080) | **Querformat 3:2 (1536×1024)** | 16:9 |

> Immer **je Format separat** generieren/croppen – nie ein 1:1-Bild auf 9:16 ziehen.

---

## Basis-Stil (immer voranstellen)

Kopiere diesen Block **vor** jeden Serien-Prompt:

```
Cinematic, photorealistic brand background for a personal-development brand.
Deep anthracite / charcoal base (#090b10), calm and minimal, lots of negative
space and soft depth. A single soft teal focus glow (like conscious awareness)
plus very subtle royal-blue and a warm gold shimmer (like insight). Quiet,
grounded, trustworthy mood — NOT mystical, NOT esoteric. No stars, no cosmic
nebulae, no spiritual symbols. Absolutely no text, no letters, no logo, no
watermark, no people. Leave clear empty space for a portrait and a headline.
Elegant, high detail, soft natural light.
```

**Wenn du dich selbst einbaust:** ergänze am Ende
`Leave the [left/right] side empty and calm for a real person to be composited in.`

---

## Prompts je Serie

Für jede Serie gibt es einen **Cover**- und einen **CTA**-Hintergrund. Wähle das
Motiv, hänge es an den Basis-Stil und ergänze das Seitenverhältnis.

### Mentale Selbstverteidigung
*Stimmung: wach, klar, standhaft.*

- **Cover:**
  ```
  Motif: a calm, clear beam of light cutting gently through soft dark fog;
  faint neural filaments glowing in teal in the far background. Sense of quiet
  strength and mental clarity. Keep the left half calm and empty for a portrait
  and centered text.
  ```
- **CTA:**
  ```
  Motif: the fog clearing toward a soft warm-gold horizon glow, open and
  inviting; minimal, reassuring. Keep the lower area calm for a short call to
  action.
  ```

### Die 7 Stufen
*Stimmung: Entwicklung, Weg, Aufstieg.*

- **Cover:**
  ```
  Motif: a subtle winding path or rising steps of soft light leading upward
  into a calm dawn horizon over anthracite depth; gentle teal-to-gold gradient
  at the top. Sense of growth and direction. Keep the lower-left third dark and
  empty for a headline.
  ```
- **CTA:**
  ```
  Motif: the top of the path reaching a warm, luminous horizon at sunrise; calm
  and hopeful, very minimal. Space in the center for a short message.
  ```

### Praxis
*Stimmung: nahbar, alltagsnah, warm.*

- **Cover:**
  ```
  Motif: a calm, warm interior or quiet natural setting in soft morning light,
  gently blurred (bokeh), grounded and approachable; anthracite tones warmed by
  gold. Tactile and real. Keep one side calm and empty for a real person.
  ```
- **CTA:**
  ```
  Motif: soft warm light and gentle out-of-focus depth, cozy and inviting,
  minimal. Room in the center for a short call to action.
  ```

### Vertiefungen
*Stimmung: ruhig, nachdenklich, introspektiv.*

- **Cover:**
  ```
  Motif: still, dark reflective water or a soft misty surface under low calm
  light, like a quiet mirror; contemplative and serene, deep anthracite with a
  faint teal reflection. Keep the upper-center area lighter for a portrait,
  lower area calm for text.
  ```
- **CTA:**
  ```
  Motif: mist slowly lifting to reveal a soft gold light, peaceful resolution;
  very minimal and quiet. Central space free for a short message.
  ```

### Mitgliederbereich *(nur Carousel)*
*Stimmung: einladend, innerer Kreis, warm.*

- **Cover:**
  ```
  Motif: a warm doorway or threshold of soft gold light opening out of calm
  anthracite darkness, welcoming and premium; subtle teal rim light. Sense of
  belonging. Keep one side calm and empty for a real person.
  ```
- **CTA:**
  ```
  Motif: the warm golden light fully open and inviting, generous and calm,
  minimal. Center space free for a short call to action.
  ```

### Wissenschaft *(nur Reel-Cover)*
*Stimmung: Neuro, Fokus, präzise.*

- **Cover:**
  ```
  Motif: a clean, elegant neural network of glowing synapses in teal focus
  light over deep anthracite, precise and modern, scientific but calm — not
  busy. Keep the lower-left third dark and empty for a headline.
  ```
- **CTA:**
  ```
  Motif: a single bright synapse / point of focus resolving in warm gold within
  the calm neural field; minimal. Space for a short message.
  ```

### Landing / Marke *(nur Reel-Cover)*
*Stimmung: die ganze Marke, einladend, stark.*

- **Cover:**
  ```
  Motif: a strong, iconic brand hero background — a soft radial teal focus glow
  centered in deep anthracite with a faint warm gold shimmer, generous calm
  negative space all around. Premium and inviting. Leave a large clear area for
  a portrait and a claim.
  ```
- **CTA:**
  ```
  Motif: the same calm hero look opening toward a warm gold glow, welcoming and
  confident, very minimal. Central and lower space free for a call to action.
  ```

---

## Foto-Regeln (kurz, aus dem Brandbook)

- **Warm & nahbar**, natürliche Hauttöne – kein greller Filter.
- **Du im Zentrum**, der Marken-Look ist der **Rahmen**, nicht der Star.
- **Freiraum nach Textzone wählen:** Reel-Cover → Headline unten links;
  Carousel → Text zentriert, dich seitlich (links/rechts) platzieren.
- **Kein Text/Logo ins Foto einbrennen** – das kommt aus dem Overlay.
- **Keine generischen Stockfotos**, keine esoterischen Symbole/Sternenfelder.

---

## Mini-Spickzettel (ein Prompt = ein Bild)

```
[BASIS-STIL] + [SERIEN-MOTIV: Cover oder CTA] + "Aspect ratio: portrait 2:3."
```

Beispiel (Stufen-Cover, 9:16):

```
Cinematic, photorealistic brand background … (Basis-Stil komplett) …
Motif: a subtle winding path or rising steps of soft light leading upward into a
calm dawn horizon … Keep the lower-left third dark and empty for a headline.
Aspect ratio: portrait 2:3.
```
