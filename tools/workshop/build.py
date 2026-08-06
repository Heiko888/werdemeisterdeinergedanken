#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Workshop-Generator – erzeugt aus einer JSON-Content-Spec die drei gebrandeten
Bausteine eines WMDG-Workshops:

  * WMDG-Workshop-<Stem>.pptx          – editierbare Präsentation (mit Notizen)
  * WMDG-Workbook-<Stem>.pdf           – Teilnehmer-Workbook (A4)
  * WMDG-Moderationsplan-<Stem>.pdf    – Moderations-/Ablaufplan (A4)

Design (Navy/Leaf/Teal, nummeriertes Motiv, Gehirn-Logo) ist identisch zu den
vier bestehenden Workshops. Aufruf:

    python3 tools/workshop/build.py <spec.json> [<spec2.json> ...]

Die Dateien landen in docs/workshop/<slug>/ und werden zusätzlich nach
content/vorlagen/workshop/ gespiegelt (Admin-Galerie). Danach:

    npm run vorlagen:galerie

Abhängigkeiten: python-pptx, Pillow, playwright (nutzt vorinstalliertes Chromium).
"""

import base64
import html as _html
import json
import os
import sys

from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("REPO_ROOT", os.path.abspath(os.path.join(HERE, "..", "..")))
ASSETS = os.path.join(HERE, "assets")
PDF_ASSETS = os.path.join(ROOT, "tools", "pdf", "assets")

DOCS_DIR = os.path.join(ROOT, "docs", "workshop")
MIRROR_DIR = os.path.join(ROOT, "content", "vorlagen", "workshop")

# --------------------------------------------------------------------------- #
# Marke
# --------------------------------------------------------------------------- #
NAVY = RGBColor(0x08, 0x10, 0x2A)
PANEL = RGBColor(0x1A, 0x22, 0x33)
PANEL2 = RGBColor(0x12, 0x1B, 0x2E)
TEAL = RGBColor(0x21, 0xB2, 0xBD)
TEAL_BRIGHT = RGBColor(0x34, 0xC4, 0xC4)
LEAF = RGBColor(0x8C, 0xC6, 0x3F)
LEAF_BRIGHT = RGBColor(0xA3, 0xD6, 0x4F)
GREEN = RGBColor(0x4F, 0x9E, 0x1C)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
MUTED = RGBColor(0xAE, 0xB6, 0xC6)
MUTED2 = RGBColor(0xD8, 0xDB, 0xE6)
MUTED3 = RGBColor(0xC3, 0xCC, 0xDD)

HEAD = "Cambria"
BODY = "Calibri"

EMU_IN = 914400
PXW = 12192000  # 13.333in – 16:9
PXH = 6858000   # 7.5in


def IN(v):
    return Emu(int(v * EMU_IN))


# --------------------------------------------------------------------------- #
# PPTX-Hilfen
# --------------------------------------------------------------------------- #
def _set_tracking(run, pts):
    """Zeichenabstand (Letter-Spacing) auf einem Run setzen."""
    rPr = run.font._element  # bereits das rPr-Element (CT_TextCharacterProperties)
    rPr.set("spc", str(int(pts * 100)))


def _fill(shape, color):
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    shape.shadow.inherit = False


def _no_autosize(tf):
    # Kein automatisches Anpassen der Form an den Text.
    from pptx.enum.text import MSO_AUTO_SIZE
    tf.auto_size = MSO_AUTO_SIZE.NONE


def textbox(slide, l, t, w, h, anchor=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(IN(l), IN(t), IN(w), IN(h))
    tf = tb.text_frame
    tf.word_wrap = True
    _no_autosize(tf)
    tf.vertical_anchor = anchor
    for m in ("margin_left", "margin_right", "margin_top", "margin_bottom"):
        setattr(tf, m, 0)
    return tf


def para(tf, first=False):
    p = tf.paragraphs[0] if first and not tf.paragraphs[0].runs else tf.add_paragraph()
    return p


def run(p, text, size, color, bold=False, italic=False, font=BODY, tracking=None):
    r = p.add_run()
    r.text = text
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.italic = italic
    r.font.name = font
    r.font.color.rgb = color
    if tracking is not None:
        _set_tracking(r, tracking)
    return r


def kicker(tf, text, color=LEAF, size=12.5, first=True):
    p = para(tf, first=first)
    p.space_after = Pt(6)
    run(p, text.upper(), size, color, bold=True, font=BODY, tracking=2.4)
    return p


def bg_solid(slide, color):
    bg = slide.background
    bg.fill.solid()
    bg.fill.fore_color.rgb = color


def bg_image(slide, path):
    slide.shapes.add_picture(path, 0, 0, Emu(PXW), Emu(PXH))


def circle(slide, l, t, d, number, fill=TEAL, num_color=WHITE, size=16):
    sh = slide.shapes.add_shape(MSO_SHAPE.OVAL, IN(l), IN(t), IN(d), IN(d))
    _fill(sh, fill)
    tf = sh.text_frame
    tf.word_wrap = False
    _no_autosize(tf)
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    for m in ("margin_left", "margin_right", "margin_top", "margin_bottom"):
        setattr(tf, m, 0)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run(p, str(number), size, num_color, bold=True, font=HEAD)
    return sh


def rrect(slide, l, t, w, h, color, radius=0.12):
    sh = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, IN(l), IN(t), IN(w), IN(h))
    _fill(sh, color)
    try:
        sh.adjustments[0] = radius
    except Exception:
        pass
    return sh


def hairline(slide, l, t, w, color=TEAL, weight=1.5):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, IN(l), IN(t), IN(w), IN(0.012))
    _fill(sh, color)
    return sh


def notes(slide, text):
    if text:
        slide.notes_slide.notes_text_frame.text = text


# --------------------------------------------------------------------------- #
# Folien-Typen
# --------------------------------------------------------------------------- #
ML = 0.95          # linker Rand
CW = 13.333 - 2 * ML  # Inhaltsbreite


def new_slide(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def slide_title(prs, s):
    sl = new_slide(prs)
    bg_image(sl, os.path.join(ASSETS, "bg-title.png"))
    # Gehirn dezent oben rechts
    sl.shapes.add_picture(os.path.join(ASSETS, "brain.png"), IN(9.55), IN(0.7),
                          height=IN(2.5))
    tf = textbox(sl, ML, 1.15, 8.4, 0.5)
    kicker(tf, s["eyebrow"], LEAF_BRIGHT, 13)
    tf = textbox(sl, ML, 1.75, 9.6, 2.7)
    p = para(tf, first=True)
    p.line_spacing = 1.02
    run(p, s["title1"] + " ", 52, WHITE, bold=True, font=HEAD)
    p2 = tf.add_paragraph()
    p2.line_spacing = 1.02
    run(p2, s["title2"], 52, TEAL_BRIGHT, bold=True, font=HEAD)
    tf = textbox(sl, ML, 4.55, 8.6, 1.1)
    p = para(tf, first=True)
    p.line_spacing = 1.2
    run(p, s["subtitle"], 17, MUTED2, font=BODY)
    tf = textbox(sl, ML, 6.55, 10, 0.4)
    p = para(tf, first=True)
    run(p, s["author"], 13, MUTED, font=BODY)
    notes(sl, s.get("notesTitle") or "Begrüßung. Kurz vorstellen. Rahmen setzen: heute geht es ums bewusste Sehen, nicht um Ratschläge. Vertraulichkeit im Raum betonen.")


def slide_agenda(prs, s):
    a = s["agenda"]
    sl = new_slide(prs)
    bg_solid(sl, NAVY)
    tf = textbox(sl, ML, 0.7, CW, 0.4)
    kicker(tf, "ÜBERBLICK", LEAF)
    tf = textbox(sl, ML, 1.12, CW, 0.7)
    p = para(tf, first=True)
    run(p, "Was dich heute erwartet", 30, WHITE, bold=True, font=HEAD)
    top = 2.15
    row_h = (6.9 - top) / len(a)
    for i, it in enumerate(a):
        y = top + i * row_h
        circle(sl, ML, y, 0.5, i + 1, fill=TEAL if i % 2 == 0 else GREEN, size=16)
        tf = textbox(sl, ML + 0.75, y - 0.04, CW - 0.75, row_h, anchor=MSO_ANCHOR.TOP)
        p = para(tf, first=True)
        run(p, it["title"], 17, WHITE, bold=True, font=BODY)
        p2 = tf.add_paragraph()
        p2.space_before = Pt(1)
        run(p2, it["desc"], 13.5, MUTED, font=BODY)
    notes(sl, s.get("notesAgenda") or "Agenda ruhig durchgehen. Zeitrahmen nennen. Frage in die Runde: Was möchtet ihr heute mitnehmen?")


def slide_statement(prs, s):
    k = s["kernbotschaft"]
    sl = new_slide(prs)
    bg_image(sl, os.path.join(ASSETS, "bg-divider.png"))
    tf = textbox(sl, ML + 0.4, 2.1, CW - 0.8, 3.0, anchor=MSO_ANCHOR.MIDDLE)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.LEFT
    p.line_spacing = 1.12
    run(p, k["pre"], 32, WHITE, bold=True, font=HEAD)
    run(p, k["accent"], 32, TEAL_BRIGHT, bold=True, font=HEAD)
    run(p, k["post"], 32, WHITE, bold=True, font=HEAD)
    if k.get("tail"):
        p2 = tf.add_paragraph()
        p2.space_before = Pt(14)
        run(p2, k["tail"], 18, MUTED2, font=BODY)
    notes(sl, k.get("notes") or "Wirken lassen. Kurze Stille nach dem Satz.")


def slide_metric(prs, s):
    a = s["ausgangspunkt"]
    sl = new_slide(prs)
    bg_solid(sl, NAVY)
    tf = textbox(sl, ML, 0.7, 7.3, 0.4)
    kicker(tf, a["kicker"], LEAF)
    tf = textbox(sl, ML, 1.12, 7.3, 1.0)
    p = para(tf, first=True)
    p.line_spacing = 1.05
    run(p, a["title"], 26, WHITE, bold=True, font=HEAD)
    tf = textbox(sl, ML, 2.55, 6.9, 3.4)
    p = para(tf, first=True)
    p.line_spacing = 1.22
    p.space_after = Pt(12)
    run(p, a["p1"], 15, MUTED2, font=BODY)
    p2 = tf.add_paragraph()
    p2.line_spacing = 1.22
    run(p2, a["p2"], 15, MUTED2, font=BODY)
    # Kennzahl-Karte rechts
    rrect(sl, 8.7, 2.2, 3.7, 3.0, PANEL, radius=0.09)
    tf = textbox(sl, 8.95, 2.5, 3.2, 0.4)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    run(p, a.get("metricPre", "").upper(), 12, LEAF, bold=True, tracking=2)
    tf = textbox(sl, 8.95, 2.95, 3.2, 1.2)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    run(p, a["metric"], 54, TEAL_BRIGHT, bold=True, font=HEAD)
    tf = textbox(sl, 8.95, 4.15, 3.2, 0.4)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    run(p, a["metricLabel"], 15, WHITE, bold=True)
    tf = textbox(sl, 8.95, 4.6, 3.2, 0.55)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    p.line_spacing = 1.1
    run(p, a["metricNote"], 11.5, MUTED, font=BODY)
    notes(sl, a.get("notes") or "Kennzahl verankern. Überleitung zur ersten Übung.")


def slide_exercise(prs, s, ex):
    sl = new_slide(prs)
    bg_solid(sl, NAVY)
    tf = textbox(sl, ML, 0.7, CW, 0.4)
    kicker(tf, ex["kicker"], TEAL)
    tf = textbox(sl, ML, 1.12, CW, 0.7)
    p = para(tf, first=True)
    run(p, ex["title"], 30, WHITE, bold=True, font=HEAD)
    steps = ex["steps"]
    top = 2.15
    row_h = min(0.82, (5.2 - top) / max(len(steps), 1) + 0.0)
    row_h = (5.35 - top) / len(steps)
    for i, st in enumerate(steps):
        y = top + i * row_h
        circle(sl, ML, y, 0.46, i + 1, fill=TEAL if i % 2 == 0 else GREEN, size=15)
        tf = textbox(sl, ML + 0.72, y - 0.02, CW - 0.72, row_h, anchor=MSO_ANCHOR.MIDDLE)
        p = para(tf, first=True)
        p.line_spacing = 1.08
        run(p, st, 15.5, MUTED2, font=BODY)
    # MITNEHMEN-Box
    rrect(sl, ML, 5.65, CW, 1.15, PANEL, radius=0.11)
    tf = textbox(sl, ML + 0.35, 5.85, CW - 0.7, 0.35)
    kicker(tf, "MITNEHMEN", LEAF, 11.5)
    tf = textbox(sl, ML + 0.35, 6.2, CW - 0.7, 0.55)
    p = para(tf, first=True)
    p.line_spacing = 1.1
    run(p, ex["mitnehmen"], 14.5, WHITE, italic=True, font=BODY)
    notes(sl, ex.get("notes") or "Übung anleiten und Zeit lassen. Danach 2–3 Stimmen einsammeln. Nichts bewerten.")


def slide_divider(prs, s, d):
    sl = new_slide(prs)
    bg_image(sl, os.path.join(ASSETS, "bg-divider.png"))
    tf = textbox(sl, ML, 2.5, CW, 0.4)
    kicker(tf, d["kicker"], LEAF, 13)
    tf = textbox(sl, ML, 3.0, CW, 1.0)
    p = para(tf, first=True)
    run(p, d["title"], 34, WHITE, bold=True, font=HEAD)
    tf = textbox(sl, ML, 4.15, 9.6, 1.2)
    p = para(tf, first=True)
    p.line_spacing = 1.2
    run(p, d["subtitle"], 16, MUTED2, font=BODY)
    notes(sl, d.get("notes") or "Übergang zum Kern. Betonen: eine Landkarte, kein starres Schema.")


def slide_overview(prs, s):
    o = s["landkarte"]
    items = o["items"]
    sl = new_slide(prs)
    bg_solid(sl, NAVY)
    tf = textbox(sl, ML, 0.6, CW, 0.4)
    kicker(tf, o["kicker"], LEAF)
    tf = textbox(sl, ML, 1.02, CW, 0.7)
    p = para(tf, first=True)
    run(p, o["title"], 28, WHITE, bold=True, font=HEAD)
    # zwei Spalten
    n = len(items)
    col = (n + 1) // 2
    top = 2.05
    colw = CW / 2
    avail = 6.95 - top
    for i, it in enumerate(items):
        c = 0 if i < col else 1
        r = i if i < col else i - col
        rows = col if c == 0 else n - col
        row_h = avail / max(rows, 1)
        x = ML + c * colw
        y = top + r * row_h
        circle(sl, x, y, 0.44, i + 1, fill=TEAL if i % 2 == 0 else GREEN, size=14)
        tf = textbox(sl, x + 0.62, y - 0.04, colw - 0.85, row_h, anchor=MSO_ANCHOR.MIDDLE)
        p = para(tf, first=True)
        run(p, it["title"], 15, WHITE, bold=True)
        if it.get("sub"):
            p2 = tf.add_paragraph()
            run(p2, it["sub"], 11.5, MUTED, font=BODY)
    notes(sl, o.get("notes") or "Überblick geben, noch nicht vertiefen. Ankündigen: Wir gehen jedes einzeln durch.")


def slide_module(prs, s, m):
    sl = new_slide(prs)
    bg_solid(sl, NAVY)
    # großer Geist-Zahl links
    num = m["badge"].split()[-1]
    tf = textbox(sl, ML - 0.15, 1.1, 3.0, 3.2, anchor=MSO_ANCHOR.MIDDLE)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.LEFT
    run(p, num, 200, PANEL, bold=True, font=HEAD)
    # Inhalt rechts
    x = 3.25
    tf = textbox(sl, x, 1.35, 9.2, 0.4)
    kicker(tf, m["badge"], LEAF, 12.5)
    tf = textbox(sl, x, 1.8, 9.2, 0.7)
    p = para(tf, first=True)
    run(p, m["title"], 30, WHITE, bold=True, font=HEAD)
    tf = textbox(sl, x, 2.55, 9.2, 0.4)
    p = para(tf, first=True)
    run(p, m["sub"], 16, TEAL_BRIGHT, bold=True, font=BODY)
    tf = textbox(sl, x, 3.15, 8.7, 1.9)
    p = para(tf, first=True)
    p.line_spacing = 1.25
    run(p, m["body"], 15, MUTED2, font=BODY)
    # Reflexion
    hairline(sl, x, 5.25, 8.5, TEAL)
    tf = textbox(sl, x, 5.45, 8.7, 0.35)
    kicker(tf, "REFLEXION", TEAL, 11.5)
    tf = textbox(sl, x, 5.8, 8.7, 0.7)
    p = para(tf, first=True)
    p.line_spacing = 1.12
    run(p, m["reflexion"], 16, WHITE, italic=True, font=BODY)
    notes(sl, m.get("notes") or f"{m['badge']} – Kernaussage erklären, eigenes Beispiel erzählen. Reflexionsfrage in die Runde oder ins Workbook geben.")


def slide_summary(prs, s):
    z = s["zusammenfassung"]
    items = z["items"]
    sl = new_slide(prs)
    bg_solid(sl, NAVY)
    tf = textbox(sl, ML, 0.7, CW, 0.4)
    kicker(tf, z["kicker"], LEAF)
    tf = textbox(sl, ML, 1.12, CW, 0.7)
    p = para(tf, first=True)
    run(p, z["title"], 30, WHITE, bold=True, font=HEAD)
    n = len(items)
    gap = 0.4
    cw = (CW - (n - 1) * gap) / n
    top = 2.5
    for i, it in enumerate(items):
        x = ML + i * (cw + gap)
        rrect(sl, x, top, cw, 3.4, PANEL, radius=0.08)
        circle(sl, x + 0.35, top + 0.4, 0.7, i + 1, fill=TEAL if i % 2 == 0 else GREEN, size=22)
        tf = textbox(sl, x + 0.35, top + 1.35, cw - 0.7, 0.5)
        p = para(tf, first=True)
        run(p, it["title"], 20, WHITE, bold=True, font=HEAD)
        tf = textbox(sl, x + 0.35, top + 1.95, cw - 0.7, 1.3)
        p = para(tf, first=True)
        p.line_spacing = 1.2
        run(p, it["text"], 14, MUTED2, font=BODY)
    notes(sl, z.get("notes") or "Zusammenfassen. Der rote Faden. Überleitung zum Angebot.")


def slide_offer(prs, s):
    a = s["angebot"]
    sl = new_slide(prs)
    bg_solid(sl, NAVY)
    tf = textbox(sl, ML, 0.7, 7.5, 0.4)
    kicker(tf, a["kicker"], LEAF)
    tf = textbox(sl, ML, 1.12, 7.5, 1.0)
    p = para(tf, first=True)
    p.line_spacing = 1.05
    run(p, a["title"], 28, WHITE, bold=True, font=HEAD)
    top = 2.7
    for i, f in enumerate(a["features"]):
        y = top + i * 0.72
        circle(sl, ML, y, 0.4, "✓" if False else i + 1, fill=TEAL if i % 2 == 0 else GREEN, size=14)
        tf = textbox(sl, ML + 0.62, y - 0.02, 6.6, 0.7, anchor=MSO_ANCHOR.MIDDLE)
        p = para(tf, first=True)
        run(p, f, 15.5, MUTED2, font=BODY)
    # Preis-Karte
    rrect(sl, 8.55, 2.5, 3.85, 2.7, PANEL, radius=0.09)
    tf = textbox(sl, 8.8, 2.85, 3.35, 0.9)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    run(p, a["preis"], 46, TEAL_BRIGHT, bold=True, font=HEAD)
    run(p, " " + a.get("preisSuffix", ""), 15, MUTED, font=BODY)
    tf = textbox(sl, 8.8, 3.95, 3.35, 0.4)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    run(p, "Mitgliedschaft", 14, WHITE, bold=True)
    tf = textbox(sl, 8.8, 4.4, 3.35, 0.5)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    p.line_spacing = 1.05
    run(p, a["url"], 11, MUTED, font=BODY)
    tf = textbox(sl, ML, 6.35, CW, 0.5)
    p = para(tf, first=True)
    run(p, a["note"], 13.5, LEAF_BRIGHT, italic=True, font=BODY)
    notes(sl, a.get("notes") or "Angebot ruhig, ohne Druck. Einladung, nicht Verkauf. Auf den kostenlosen Bewusstseinstest hinweisen.")


def slide_closing(prs, s):
    c = s["abschluss"]
    sl = new_slide(prs)
    bg_image(sl, os.path.join(ASSETS, "bg-title.png"))
    # Standard-Schlussfolie: zentriert, in der unteren Bildhälfte.
    # Titel 40pt (Akzentwort in Leaf), Dank 18pt gedämpft, URL 14pt Teal fett.
    tf = textbox(sl, 1.0, 4.1, 11.33, 1.0)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    run(p, c["pre"], 40, WHITE, bold=True, font=HEAD)
    run(p, c["accent"], 40, LEAF_BRIGHT, bold=True, font=HEAD)
    run(p, c["post"], 40, WHITE, bold=True, font=HEAD)
    tf = textbox(sl, 1.0, 5.2, 11.33, 0.5)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    run(p, c["thanks"], 18, MUTED3, font=BODY)
    tf = textbox(sl, 1.0, 6.4, 11.33, 0.4)
    p = para(tf, first=True)
    p.alignment = PP_ALIGN.CENTER
    run(p, c["url"], 14, TEAL_BRIGHT, bold=True, font=BODY)
    notes(sl, c.get("notes") or "Abschluss. Raum für Fragen. Danken. Zum Bewusstseinstest / zur Mitgliedschaft einladen.")


def build_pptx(s, out_path):
    prs = Presentation()
    prs.slide_width = Emu(PXW)
    prs.slide_height = Emu(PXH)

    slide_title(prs, s)
    slide_agenda(prs, s)
    slide_statement(prs, s)
    slide_metric(prs, s)
    slide_exercise(prs, s, s["uebung1"])
    slide_divider(prs, s, s["kapitelIntro"])
    slide_overview(prs, s)
    for m in s["module"]:
        slide_module(prs, s, m)
    slide_exercise(prs, s, s["uebung2"])
    slide_summary(prs, s)
    slide_offer(prs, s)
    slide_closing(prs, s)

    prs.save(out_path)
    return len(prs.slides._sldIdLst)


# --------------------------------------------------------------------------- #
# PDF-Hilfen (HTML -> Chromium)
# --------------------------------------------------------------------------- #
def _enc(path, mime):
    with open(path, "rb") as f:
        return "data:%s;base64,%s" % (mime, base64.b64encode(f.read()).decode())


def esc(x):
    return _html.escape(str(x), quote=False)


FONTS_CSS = open(os.path.join(PDF_ASSETS, "fonts.css")).read()
BRAIN_URI = _enc(os.path.join(ASSETS, "brain.png"), "image/png")

BASE_CSS = r"""
*{margin:0;padding:0;box-sizing:border-box;}
html{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{font-family:'Inter',ui-sans-serif,system-ui,sans-serif;color:#16231f;}
.serif{font-family:'Fraunces',Georgia,serif;}
@page{size:A4;margin:16mm 17mm 16mm;}
:root{
  --navy:#08102a; --ink:#16231f; --soft:#48524e;
  --teal:#21b2bd; --teal-b:#34c4c4; --leaf:#8cc63f; --green:#4f9e1c;
  --surface:#f6f4ee; --hair:#e4ded0; --muted:#aeb6c6;
}
.kicker{font-size:10.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--green);}
.kicker.teal{color:var(--teal);}
h1.doc{font-family:'Fraunces',serif;font-weight:600;font-size:30px;color:var(--navy);margin-top:4px;line-height:1.12;}
h2.doc{font-family:'Fraunces',serif;font-weight:600;font-size:21px;color:var(--navy);}
p.body{font-size:13.5px;line-height:1.62;color:#2c3a35;margin-top:10px;}
"""


def _pdf_shell(title, css, body):
    return f"""<!doctype html><html lang="de"><head><meta charset="utf-8">
<title>{esc(title)}</title><style>{FONTS_CSS}\n{BASE_CSS}\n{css}</style></head>
<body>{body}</body></html>"""


# ------------------------------ Workbook ----------------------------------- #
WB_CSS = r"""
@page cover{margin:0;}
.cover{page:cover;position:relative;width:210mm;height:297mm;
  padding:0 24mm;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;color:#eaf0ff;overflow:hidden;
  background:
    radial-gradient(120% 80% at 82% 6%, rgba(52,196,196,.20), transparent 55%),
    radial-gradient(90% 60% at 12% 98%, rgba(140,198,63,.14), transparent 55%),
    linear-gradient(158deg,#0a1330,#0a1024);}
.cover .eye{font-size:13px;font-weight:700;letter-spacing:.34em;color:var(--leaf);text-transform:uppercase;margin-bottom:26px;}
.cover img{width:150px;height:auto;margin-bottom:30px;filter:drop-shadow(0 8px 30px rgba(52,196,196,.35));}
.cover h1{font-family:'Fraunces',serif;font-weight:600;font-size:38px;line-height:1.18;color:#fff;}
.cover h1 .ac{color:var(--teal-b);}
.cover .sub{margin-top:16px;font-size:15px;line-height:1.55;color:#c6cfe6;max-width:78%;}
.cover .name{position:absolute;bottom:20mm;left:0;right:0;font-size:12.5px;color:#aeb6c6;font-weight:600;}
.cover .name b{color:#eaf0ff;font-weight:600;}
.page{page-break-before:always;}
.intro{margin-top:2px;}
.callout{margin-top:18px;border-radius:16px;padding:18px 22px;color:#eaf0ff;
  background:radial-gradient(70% 130% at 88% 0%, rgba(52,196,196,.26), transparent 60%),
             linear-gradient(140deg,#08102a,#12244d);}
.callout .k{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--leaf);}
.callout .q{font-family:'Fraunces',serif;font-style:italic;font-size:14.5px;line-height:1.5;margin-top:8px;color:#eef2ff;}
.steps{margin-top:12px;list-style:none;counter-reset:st;}
.steps li{font-size:13.5px;line-height:1.5;color:#26332e;margin:7px 0;padding-left:4px;}
.steps li b{color:var(--navy);}
.prompt{margin-top:16px;}
.lines{margin-top:8px;}
.lines .ln{border-bottom:1.4px solid #d9d3c4;height:30px;}
.sec{page-break-inside:avoid;margin-top:26px;}
.sec:first-of-type{margin-top:6px;}
"""


def workbook_html(s):
    wb = s["workbook"]
    cover = f"""<section class="cover">
      <div class="eye">Workshop-Begleitheft</div>
      <img src="{BRAIN_URI}" alt="">
      <h1>{esc(s['title1'])} <span class="ac">{esc(s['title2'])}</span></h1>
      <div class="sub">{esc(wb.get('coverSubtitle',''))}</div>
      <div class="name"><b>Name:</b> ______________________ · werdemeisterdeinergedanken.de</div>
    </section>"""

    intro = wb["intro"]
    parts = [f"""<div class="page"><div class="kicker">So arbeitest du mit diesem Heft</div>
      <h1 class="doc">Willkommen</h1>
      <p class="body">{esc(intro['body'])}</p>
      <div class="callout"><div class="k">{esc(intro.get('grundKicker','Die Grundübung'))}</div>
        <div class="q">{esc(intro['grundText'])}</div></div>"""]

    # Sektionen (Module) – erste direkt auf der Intro-Seite, Rest je nach Umbruch
    for i, sec in enumerate(wb["sections"]):
        steps = "".join(f"<li><b>{j+1}.</b> {esc(st)}</li>" for j, st in enumerate(sec.get("steps", [])))
        lines = "".join('<div class="ln"></div>' for _ in range(int(sec.get("lines", 3))))
        parts.append(f"""<div class="sec">
          <div class="kicker teal">{esc(sec['kicker'])}</div>
          <h2 class="doc">{esc(sec['title'])}</h2>
          <p class="body">{esc(sec['body'])}</p>
          {f'<div class="kicker teal" style="margin-top:14px">{esc(sec.get("uebungKicker",""))}</div>' if sec.get('uebungKicker') else ''}
          {f'<ul class="steps">{steps}</ul>' if steps else ''}
          <div class="prompt kicker teal">{esc(sec['prompt'])}</div>
          <div class="lines">{lines}</div>
        </div>""")
    parts.append("</div>")
    body = cover + "".join(parts)
    return _pdf_shell(f"WMDG Workbook – {s['title1']} {s['title2']}", WB_CSS, body)


# --------------------------- Moderationsplan -------------------------------- #
MOD_CSS = r"""
.head{display:flex;gap:14px;align-items:flex-start;border-bottom:2px solid var(--navy);padding-bottom:14px;}
.head img{width:56px;height:auto;margin-top:2px;}
.head .k{font-size:10.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--green);}
.head h1{font-family:'Fraunces',serif;font-weight:600;font-size:25px;color:var(--navy);line-height:1.14;margin-top:3px;}
.head h1 .ac{color:var(--teal);}
.pills{display:flex;flex-wrap:wrap;gap:12px;margin:16px 0 4px;}
.pill{background:var(--navy);color:#eaf0ff;border-radius:999px;padding:8px 16px;font-size:12px;}
.pill b{color:var(--leaf);font-weight:700;}
.cards{display:flex;gap:16px;margin-top:16px;}
.card{flex:1;background:var(--surface);border:1px solid var(--hair);border-radius:14px;padding:16px 18px;}
.card h3{font-family:'Fraunces',serif;font-weight:600;font-size:15px;color:var(--navy);margin-bottom:8px;}
.card ul{list-style:none;}
.card li{font-size:12px;line-height:1.5;color:#3a453f;padding-left:14px;position:relative;margin:5px 0;}
.card li:before{content:"•";position:absolute;left:0;color:var(--green);font-weight:700;}
h2.ablauf{font-family:'Fraunces',serif;font-weight:600;font-size:19px;color:var(--navy);margin:22px 0 10px;}
table{width:100%;border-collapse:collapse;}
thead th{background:var(--navy);color:#eaf0ff;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;
  text-align:left;padding:9px 10px;font-weight:700;}
thead th:first-child{border-radius:8px 0 0 8px;}
thead th:last-child{border-radius:0 8px 8px 0;}
tbody td{font-size:11.5px;line-height:1.4;padding:11px 10px;border-bottom:1px solid #eceadf;vertical-align:top;color:#2f3a35;}
tbody tr:nth-child(even){background:#faf9f4;}
.t-zeit{color:var(--teal);font-weight:700;white-space:nowrap;}
.t-dur{color:#8a938d;white-space:nowrap;}
.t-block{font-family:'Fraunces',serif;font-weight:600;color:var(--navy);}
.pause td{color:var(--green);font-style:italic;}
.pause .t-block{color:var(--green);}
.foot{margin-top:18px;font-size:10.5px;color:#8a938d;}
"""


def moderation_html(s):
    m = s["moderation"]
    ziel = "".join(f"<li>{esc(x)}</li>" for x in m["ziel"])
    mat = "".join(f"<li>{esc(x)}</li>" for x in m["material"])
    rows = ""
    for r in m["ablauf"]:
        cls = ' class="pause"' if r.get("pause") else ""
        rows += f"""<tr{cls}><td class="t-zeit">{esc(r['time'])}</td>
          <td class="t-dur">{esc(r['dur'])}</td>
          <td class="t-block">{esc(r['block'])}</td>
          <td>{esc(r['what'])}</td>
          <td>{esc(r.get('material','—'))}</td></tr>"""
    body = f"""
    <div class="head"><img src="{BRAIN_URI}" alt="">
      <div><div class="k">Moderations- &amp; Ablaufplan</div>
        <h1>Workshop: {esc(s['title1'])} <span class="ac">{esc(s['title2'])}</span></h1></div>
    </div>
    <div class="pills">
      <div class="pill"><b>Dauer:</b> {esc(s['dauer'])}</div>
      <div class="pill"><b>Gruppe:</b> {esc(s['gruppe'])}</div>
      <div class="pill"><b>Format:</b> {esc('Präsenz oder online')}</div>
      <div class="pill"><b>Leitung:</b> {esc(s['leitung'])}</div>
    </div>
    <div class="cards">
      <div class="card"><h3>Ziel des Workshops</h3><ul>{ziel}</ul></div>
      <div class="card"><h3>Material-Checkliste</h3><ul>{mat}</ul></div>
    </div>
    <h2 class="ablauf">Ablauf</h2>
    <table><thead><tr><th>Zeit</th><th>Dauer</th><th>Block</th><th>Was passiert</th><th>Folien / Material</th></tr></thead>
    <tbody>{rows}</tbody></table>
    <div class="foot">Zeiten sind Richtwerte – passe sie an Gruppengröße und Tempo an. Preis auf der Angebots-Folie (49 €/Monat) vor dem Einsatz prüfen.</div>
    """
    return _pdf_shell(f"WMDG Moderationsplan – {s['title1']} {s['title2']}", MOD_CSS, body)


# --------------------------------------------------------------------------- #
def render_pdfs(html_jobs):
    """html_jobs: list of (html_string, out_path)."""
    from playwright.sync_api import sync_playwright
    exe = None
    for cand in (
        "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    ):
        if os.path.exists(cand):
            exe = cand
            break
    with sync_playwright() as p:
        kw = {"executable_path": exe} if exe else {}
        b = p.chromium.launch(**kw)
        pg = b.new_page()
        for html, out in html_jobs:
            pg.set_content(html, wait_until="networkidle")
            pg.pdf(path=out, format="A4", print_background=True,
                   prefer_css_page_size=True)
        b.close()


def build_one(spec_path):
    s = json.load(open(spec_path, encoding="utf-8"))
    stem = s["fileStem"]
    slug = s["slug"]
    out_dir = os.path.join(DOCS_DIR, slug)
    os.makedirs(out_dir, exist_ok=True)

    pptx_path = os.path.join(out_dir, f"WMDG-Workshop-{stem}.pptx")
    wb_path = os.path.join(out_dir, f"WMDG-Workbook-{stem}.pdf")
    mod_path = os.path.join(out_dir, f"WMDG-Moderationsplan-{stem}.pdf")

    n = build_pptx(s, pptx_path)
    render_pdfs([
        (workbook_html(s), wb_path),
        (moderation_html(s), mod_path),
    ])

    # nach content/vorlagen/workshop/ spiegeln
    os.makedirs(MIRROR_DIR, exist_ok=True)
    import shutil
    for pth in (pptx_path, wb_path, mod_path):
        shutil.copy2(pth, os.path.join(MIRROR_DIR, os.path.basename(pth)))

    print(f"✓ {slug}: {n} Folien · {len(s['module'])} Module")
    print(f"    {os.path.relpath(pptx_path, ROOT)}")
    print(f"    {os.path.relpath(wb_path, ROOT)}")
    print(f"    {os.path.relpath(mod_path, ROOT)}")
    return {"slug": slug, "stem": stem, "slides": n}


def main(argv):
    if not argv:
        print("Aufruf: python3 tools/workshop/build.py <spec.json> [...]")
        return 1
    for spec in argv:
        build_one(spec)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
