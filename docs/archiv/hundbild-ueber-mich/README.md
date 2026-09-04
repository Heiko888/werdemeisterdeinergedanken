# Archiviert: Hundebild-Block (ehem. `/ueber-mich`)

Dieser Block war zuvor in der Sektion „Meine Geschichte" auf der Seite
`src/app/ueber-mich/page.tsx` eingebaut und wurde am **2026-09-04** entfernt und
hier zur **späteren Wiederverwendung** abgelegt.

- **Bild:** `ueber-heiko-hund.webp` (in diesem Ordner; war zuvor unter
  `public/ueber-heiko-hund.webp`)
- **Alt-Text:** „Heiko mit seinem Hund draußen in der Natur"
- **Komponente:** `PhotoFrame` (`@/components/ui/PhotoFrame`) + `Reveal`
  (`@/components/ui/Reveal`)

## Text

> „Ein Hund holt dich sofort in den Moment."

Meine persönliche Überzeugung: Hunde stärken dein Bewusstsein. Sie kennen kein
Gestern und kein Morgen – nur das Jetzt. Diese Präsenz steckt an, wenn du dich
darauf einlässt.

## Wiederverwendung

So kann der Block wieder eingebaut werden:

1. Bild zurück nach `public/` legen:
   `cp docs/archiv/hundbild-ueber-mich/ueber-heiko-hund.webp public/`
2. `PhotoFrame`-Import ergänzen:
   `import { PhotoFrame } from "@/components/ui/PhotoFrame";`
3. Das folgende `<figure>` an gewünschter Stelle einfügen (JSX):

```tsx
<figure className="mx-auto my-2 w-full max-w-xs">
  <PhotoFrame
    src="/ueber-heiko-hund.webp"
    alt="Heiko mit seinem Hund draußen in der Natur"
    aspect="square"
  />
  <figcaption className="mt-5 border-l-2 border-accent/40 pl-4">
    <p className="font-display text-[1.05rem] italic leading-snug text-ink">
      „Ein Hund holt dich sofort in den Moment.“
    </p>
    <p className="mt-2 text-sm leading-relaxed text-ink-mid">
      Meine persönliche Überzeugung: Hunde stärken dein Bewusstsein.
      Sie kennen kein Gestern und kein Morgen – nur das Jetzt. Diese
      Präsenz steckt an, wenn du dich darauf einlässt.
    </p>
  </figcaption>
</figure>
```

> Hinweis: Als eigenständiger, ganz oben stehender Block war das `<figure>`
> zusätzlich in `<Reveal delay={80}>…</Reveal>` gehüllt und nutzte `my-9`
> statt `my-2`.
