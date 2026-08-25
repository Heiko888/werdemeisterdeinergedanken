# Brandbook — Werde Meister deiner Gedanken (WMDG)

Das zentrale Markenhandbuch für **Werde Meister deiner Gedanken** von
Heiko Schwaninger. Es hält Markenkern, Tonalität, Logo, Farben, Typografie,
Bildwelt, Anwendungen **und die technische Struktur** (wo im Projekt was liegt)
an einem Ort fest.

> **Status:** Erstaufsatz. Struktur steht, Inhalte sind aus dem echten Code/Projekt
> übernommen. Offene Punkte sind mit `⚠️ PRÜFEN` markiert – die gehen wir im
> zweiten Schritt gemeinsam durch (Vollständigkeit & Korrektheit).

---

## Inhaltsverzeichnis

| # | Kapitel | Inhalt |
|---|---------|--------|
| 01 | [Marke & Positionierung](./01-marke.md) | Markenkern, Mission, Zielgruppe, Werte, die 7 Stufen |
| 02 | [Tonalität & Sprache](./02-tonalitaet.md) | Tone of Voice, Claims, Kernsätze, Do & Don't |
| 03 | [Logo](./03-logo.md) | Emblem, Wortmarke, Varianten, Schutzraum, Don'ts |
| 04 | [Farben](./04-farben.md) | Vollständige Farbpalette mit Design-Tokens |
| 05 | [Typografie](./05-typografie.md) | Fraunces & Inter, Hierarchie, Anwendung |
| 06 | [Bildwelt & Grafik](./06-bildwelt.md) | Kosmischer Look, Verläufe, Glow, Bildsprache |
| 07 | [Anwendungen](./07-anwendungen.md) | Social Media, Vorlagen, Asset-Formate, Generatoren |
| 08 | [Struktur & Quellen der Wahrheit](./08-struktur.md) | Wo im Repo welche Markenelemente definiert sind |

---

## Grundidee des Brandbooks

Dieses Brandbook ist **nicht** nur ein PDF-Ersatz, sondern spiegelt die
**gelebte Marke im Code**. Farben, Fonts und Logo sind im Projekt bereits als
Code definiert (Design-Tokens, `next/font`, Komponenten). Das Brandbook
**dokumentiert und begründet** diese Entscheidungen und verweist auf die
jeweilige „Quelle der Wahrheit" im Repository (siehe Kapitel 08).

**Regel:** Ändert sich ein Markenelement, wird es **zuerst im Code** geändert
(z. B. Farbtoken in `src/app/globals.css`) und danach hier im Brandbook
nachgezogen. So bleiben Doku und Umsetzung konsistent.

## Kurzsteckbrief

- **Markenname:** Werde Meister deiner Gedanken
- **Kürzel:** WMDG
- **Inhaber/Autor:** Heiko Schwaninger
- **Claim / Tagline:** Bewusstseinsentwicklung in 7 Stufen
- **Domain:** www.werdemeisterdeinergedanken.de
- **Kern-Look:** Tiefes Mitternachtsblau + kosmische Weite, Marken-Signatur
  Lindgrün → Türkis (aus dem Logo), edle Serifen-Headlines
- **Schriften:** Fraunces (Headlines) · Inter (Fließtext)

---

## Pflege

- Änderungen an Markenelementen: erst Code, dann Brandbook.
- Jedes Kapitel nennt am Ende seine **Quelle der Wahrheit** (Datei/Pfad).
- Offene/zu klärende Punkte konsequent mit `⚠️ PRÜFEN` markieren.
