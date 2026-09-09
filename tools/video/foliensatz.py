#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Video-Foliensatz-Generator – erzeugt aus den Video-Skripten in docs/skripte/
die gebrandeten On-Screen-Folien, die in den einzelnen Videos eingeblendet
werden (Titel-Einblendungen, Merksätze, CTAs, Reel-Overlays).

Ausgabe (docs/video/):

  * WMDG-Video-Folien.pptx       – 16:9, editierbar (Langvideos):
      7 Stufen  → Titelfolie + Merksatz-Folie je Stufe
      Praxis    → Titelfolie je Übung
      Vertiefungen → Titelfolie + Merksatz-Folie je Thema
  * WMDG-Video-Folien-Reel.pptx  – 9:16 (Hochformat), Teaser-Reel:
      Hook · On-Screen-Overlays · CTA · Thumbnail-Cover

Das Design ist das *helle Creme-Branding* der Video-Drehbücher (Paper-Grund
#f6f4ee, Gold-Akzent #d9a93a→#7e6410, Serifen-Headline „Fraunces", Fließtext
„Inter", freigestelltes Gold-Gehirn) – NICHT das dunkle Navy-Workshop-Design
(siehe tools/workshop/build.py).

    python3 tools/video/foliensatz.py

Die Folien sind bewusst textbasiert/editierbar (wie die Workshop-Decks). Für
1:1-Rendering sollten die kostenlosen Google-Fonts „Fraunces" und „Inter"
installiert sein (sie werden ohnehin auf der Website genutzt); sonst ersetzt
PowerPoint sie durch die nächstbeste Schrift.

Abhängigkeiten: python-pptx, Pillow.
"""

import os
import re
import sys

from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("REPO_ROOT", os.path.abspath(os.path.join(HERE, "..", "..")))
SKRIPTE = os.path.join(ROOT, "docs", "skripte")
OUTDIR = os.path.join(ROOT, "docs", "video")
LOGO = os.path.join(ROOT, "tools", "pdf", "assets", "brain-freigestellt.png")

# --------------------------------------------------------------------------- #
# Marke – helles Creme-Branding (identisch zu den Drehbuch-PDFs)
# --------------------------------------------------------------------------- #
PAPER = RGBColor(0xF6, 0xF4, 0xEE)   # Grund
CARD = RGBColor(0xFF, 0xFF, 0xFF)    # Karten
CARD_TINT = RGBColor(0xEF, 0xEC, 0xE2)
BORDER = RGBColor(0xE7, 0xE2, 0xD4)
INK = RGBColor(0x16, 0x23, 0x1F)     # Überschriften
MID = RGBColor(0x48, 0x52, 0x4E)     # Fließtext
MUTED = RGBColor(0x62, 0x6B, 0x67)
GOLD = RGBColor(0xD9, 0xA9, 0x3A)
GOLD_DEEP = RGBColor(0x7E, 0x64, 0x10)
GOLD_LIGHT = RGBColor(0xE8, 0xC1, 0x5F)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)

HEAD = "Fraunces"
BODY = "Inter"

EMU_IN = 914400


def IN(v):
    return Emu(int(v * EMU_IN))


# --------------------------------------------------------------------------- #
# PPTX-Hilfen
# --------------------------------------------------------------------------- #
def _set_tracking(run_, pts):
    run_.font._element.set("spc", str(int(pts * 100)))


def _fill(shape, color):
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    shape.shadow.inherit = False


def _gradient(shape, c1, c2, angle_deg=0):
    """Zwei-Stopp-Linearverlauf (Gold) auf eine Form legen."""
    shape.fill.solid()  # Fill-Element anlegen
    spPr = shape.fill._xPr
    for tag in ("a:solidFill", "a:noFill", "a:gradFill", "a:blipFill", "a:pattFill"):
        for el in spPr.findall(qn(tag)):
            spPr.remove(el)
    grad = spPr.makeelement(qn("a:gradFill"), {})
    lst = grad.makeelement(qn("a:gsLst"), {})
    for pos, col in ((0, c1), (100000, c2)):
        gs = grad.makeelement(qn("a:gs"), {"pos": str(pos)})
        clr = grad.makeelement(qn("a:srgbClr"), {"val": "%02X%02X%02X" % (col[0], col[1], col[2])})
        gs.append(clr)
        lst.append(gs)
    grad.append(lst)
    lin = grad.makeelement(qn("a:lin"), {"ang": str(int(angle_deg * 60000)), "scaled": "1"})
    grad.append(lin)
    # gradFill muss vor a:ln stehen
    ln = spPr.find(qn("a:ln"))
    if ln is not None:
        ln.addprevious(grad)
    else:
        spPr.append(grad)
    shape.line.fill.background()
    shape.shadow.inherit = False


def _no_autosize(tf):
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


def para(tf, first=False, align=None, before=None, after=None, line=None):
    p = tf.paragraphs[0] if first and not tf.paragraphs[0].runs else tf.add_paragraph()
    if align is not None:
        p.alignment = align
    if before is not None:
        p.space_before = Pt(before)
    if after is not None:
        p.space_after = Pt(after)
    if line is not None:
        p.line_spacing = line
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


def rect(slide, l, t, w, h, color, gradient=None, angle=0):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, IN(l), IN(t), IN(w), IN(h))
    if gradient:
        _gradient(sh, gradient[0], gradient[1], angle)
    else:
        _fill(sh, color)
    return sh


def rrect(slide, l, t, w, h, color, radius=0.12, gradient=None, angle=0):
    sh = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, IN(l), IN(t), IN(w), IN(h))
    if gradient:
        _gradient(sh, gradient[0], gradient[1], angle)
    else:
        _fill(sh, color)
    try:
        sh.adjustments[0] = radius
    except Exception:
        pass
    return sh


def disc(slide, l, t, d, number, size=28):
    """Gold-Kreis mit Nummer (Creme-Zahl)."""
    sh = slide.shapes.add_shape(MSO_SHAPE.OVAL, IN(l), IN(t), IN(d), IN(d))
    _gradient(sh, GOLD_LIGHT, GOLD_DEEP, 90)
    tf = sh.text_frame
    tf.word_wrap = False
    _no_autosize(tf)
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    for m in ("margin_left", "margin_right", "margin_top", "margin_bottom"):
        setattr(tf, m, 0)
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run(p, str(number), size, PAPER, bold=True, font=HEAD)
    return sh


def bg(slide, color=PAPER):
    b = slide.background
    b.fill.solid()
    b.fill.fore_color.rgb = color


def notes(slide, text):
    if text:
        slide.notes_slide.notes_text_frame.text = text


# --------------------------------------------------------------------------- #
# Skript-Parser
# --------------------------------------------------------------------------- #
QUOTES = "„“”\"‚‘’"


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def blocks(md):
    """Absätze eines Skripts (ohne H1, Format-Zeile, [Regie]-Cues, ---)."""
    out = []
    for raw in re.split(r"\n\s*\n", md):
        b = raw.strip()
        if not b or b == "---":
            continue
        if b.startswith("#"):
            continue
        if b.startswith("**Format:**"):
            continue
        if b.startswith("`[Regie]") or b.startswith("[Regie]"):
            continue
        out.append(b)
    return out


def h1(md):
    m = re.search(r"^#\s+(.*)$", md, re.M)
    return m.group(1).strip() if m else ""


def find_stufe(md):
    m = re.search(r"\*\*Stufe\s+(\d+)\*\*", md) or re.search(r"Stufe\s+(\d+)", md)
    return m.group(1) if m else None


def find_length(md):
    m = re.search(r"\*\*(?:Ziellänge|Länge):\*\*\s*([^\n·]+?)(?:\s*·|\n|$)", md)
    return m.group(1).strip() if m else None


def merksatz(md):
    """Der abschließende Merksatz nach 'Für heute nimm … mit:' / 'Nimm diesen … mit:'."""
    bl = blocks(md)
    cue = re.compile(r"(?:Für heute nimm|Nimm)\b.*?\bmit:\s*(.*)$", re.S)
    for i, b in enumerate(bl):
        m = cue.match(b)
        if m:
            inline = m.group(1).strip()
            if inline:
                return re.sub(r"\s+", " ", inline)
            if i + 1 < len(bl):
                return re.sub(r"\s+", " ", bl[i + 1].strip())
    return None


def strip_quotes(s):
    return s.strip().strip(QUOTES).strip()


def parse_stufe(md):
    title = h1(md)  # Stufe 01 – Autopilot · „Du wirst gelebt"
    m = re.match(r"Stufe\s+(\d+)\s*[–-]\s*(.+?)\s*·\s*(.+)$", title)
    num = m.group(1) if m else find_stufe(md) or "?"
    name = m.group(2).strip() if m else title
    claim = strip_quotes(m.group(3)) if m else ""
    return {
        "num": num,
        "name": name,
        "claim": claim,
        "length": find_length(md),
        "merksatz": merksatz(md),
    }


def parse_vertiefung(md):
    t = h1(md)  # Vertiefung – Automatische Gedanken (komplett)
    t = re.sub(r"^Vertiefung\s*[–-]\s*", "", t)
    t = re.sub(r"\s*\(komplett\)\s*$", "", t).strip()
    return {
        "title": t,
        "stufe": find_stufe(md),
        "length": find_length(md),
        "merksatz": merksatz(md),
    }


def parse_praxis(md):
    t = h1(md)  # Praxis – 4-6-Atmung (Atemübung)
    t = re.sub(r"^Praxis\s*[–-]\s*", "", t).strip()
    kind = ""
    m = re.search(r"\(([^)]+)\)\s*$", t)
    if m:
        kind = m.group(1).strip()
        t = re.sub(r"\s*\([^)]+\)\s*$", "", t).strip()
    return {
        "name": t,
        "kind": kind,
        "stufe": find_stufe(md),
        "length": find_length(md),
    }


def parse_reel(md):
    def field(label):
        m = re.search(r"\*\*" + label + r":\*\*\s*(.+)", md)
        return m.group(1).strip() if m else None

    hook = field("HOOK")
    onscreen = field("ON-SCREEN")
    cta = field("CTA")
    overlays = [strip_quotes(x) for x in re.split(r"\s*·\s*", onscreen)] if onscreen else []
    # Cover-/Thumbnail-Text (Primär …)
    m = re.search(r"Primär\s+\*\*(.+?)\*\*", md)
    cover = strip_quotes(m.group(1)) if m else None
    return {
        "hook": strip_quotes(hook) if hook else "",
        "overlays": overlays,
        "cta": strip_quotes(cta) if cta else "",
        "cover": cover,
    }


def parse_sv_bundle(md):
    """16 Themen „Mentale Selbstverteidigung" – je ## N · Titel; letzter Absatz = Merksatz."""
    items = []
    parts = re.split(r"^##\s+(\d+)\s*·\s*(.+)$", md, flags=re.M)
    for i in range(1, len(parts), 3):
        num = parts[i].strip()
        title = parts[i + 1].strip()
        bl = blocks(parts[i + 2])
        ms = re.sub(r"\s+", " ", bl[-1]).strip() if bl else None
        items.append({"num": num, "title": title, "merksatz": ms})
    return items


def parse_stufen_reels(md):
    """7-Stufen-Reels – je ## 0X · Name — Claim mit ### Variante A/B/C (HOOK/ON-SCREEN/CTA)."""
    stages = []
    parts = re.split(r"^##\s+(\d+)\s*·\s*(.+?)\s*[—–-]\s*(.+)$", md, flags=re.M)
    for i in range(1, len(parts), 4):
        num, name, claim = parts[i].strip(), parts[i + 1].strip(), parts[i + 2].strip()
        body = parts[i + 3]
        variants = []
        vp = re.split(r"^###\s+(Variante\s+\w)\s*[—–-]\s*(.+)$", body, flags=re.M)
        for j in range(1, len(vp), 3):
            label, vtitle, vbody = vp[j].strip(), strip_quotes(vp[j + 1]), vp[j + 2]

            def fld(lbl):
                m = re.search(r"\*\*" + lbl + r":\*\*\s*(.+)", vbody)
                return m.group(1).strip() if m else None

            onscreen = fld("ON-SCREEN")
            overlays = [strip_quotes(x) for x in re.split(r"\s*·\s*", onscreen)] if onscreen else []
            hook, cta = fld("HOOK"), fld("CTA")
            variants.append({
                "label": label,
                "vtitle": vtitle,
                "hook": strip_quotes(hook) if hook else "",
                "overlays": overlays,
                "cta": strip_quotes(cta) if cta else "",
            })
        stages.append({"num": num, "name": name, "claim": strip_quotes(claim), "variants": variants})
    return stages


def files(subdir, exclude=()):
    d = os.path.join(SKRIPTE, subdir)
    return [
        os.path.join(d, f)
        for f in sorted(os.listdir(d))
        if f.endswith(".md") and f not in exclude
    ]


# --------------------------------------------------------------------------- #
# Gemeinsame Bausteine
# --------------------------------------------------------------------------- #
def wordmark(slide, cx, y, scale=1.0):
    """WERDE MEISTER / DEINER GEDANKEN – zentriert um cx."""
    tf = textbox(slide, cx - 3.0, y, 6.0, 0.7, anchor=MSO_ANCHOR.TOP)
    p = para(tf, first=True, align=PP_ALIGN.CENTER)
    run(p, "WERDE ", 13 * scale, INK, bold=False, font=HEAD, tracking=1.6)
    run(p, "MEISTER", 13 * scale, GOLD_DEEP, bold=False, font=HEAD, tracking=1.6)
    p2 = para(tf, align=PP_ALIGN.CENTER, before=1)
    run(p2, "—  DEINER GEDANKEN  —", 8 * scale, MID, font=HEAD, tracking=3.0)


def footer(slide, w):
    """Dezente Fußzeile: Wortmarke klein, mittig unten."""
    tf = textbox(slide, 0, (7.5 if w > 10 else 13.333) - 0.55, w, 0.3,
                 anchor=MSO_ANCHOR.MIDDLE)
    p = para(tf, first=True, align=PP_ALIGN.CENTER)
    run(p, "WERDE MEISTER DEINER GEDANKEN", 8, MUTED, font=HEAD, tracking=2.6)


def eyebrow(slide, l, t, w, text, align=PP_ALIGN.LEFT, size=12.5):
    tf = textbox(slide, l, t, w, 0.4)
    p = para(tf, first=True, align=align)
    run(p, text.upper(), size, GOLD_DEEP, bold=True, font=BODY, tracking=2.6)


# --------------------------------------------------------------------------- #
# 16:9 – Langvideo-Folien
# --------------------------------------------------------------------------- #
W16, H16 = 13.333, 7.5
ML = 0.95


def new16(prs):
    sl = prs.slides.add_slide(prs.slide_layouts[6])
    bg(sl, PAPER)
    return sl


def cover16(prs, title, subtitle):
    sl = new16(prs)
    # weicher Gold-Schein oben
    band = rect(sl, 0, 0, W16, 0.16, GOLD, gradient=(GOLD_LIGHT, GOLD_DEEP), angle=0)
    if os.path.exists(LOGO):
        sl.shapes.add_picture(LOGO, IN(W16 / 2 - 0.9), IN(1.35), width=IN(1.8), height=IN(1.8))
    wordmark(sl, W16 / 2, 3.35, scale=1.15)
    tf = textbox(sl, 1.5, 4.05, W16 - 3.0, 2.0, anchor=MSO_ANCHOR.TOP)
    for i, line in enumerate(title.split("\n")):
        p = para(tf, first=(i == 0), align=PP_ALIGN.CENTER, line=1.02)
        run(p, line, 40, INK, bold=True, font=HEAD)
    tf2 = textbox(sl, 2.0, 5.75, W16 - 4.0, 0.8, anchor=MSO_ANCHOR.TOP)
    p = para(tf2, first=True, align=PP_ALIGN.CENTER, line=1.2)
    run(p, subtitle, 15, MID, font=BODY)
    footer(sl, W16)
    return sl


def divider16(prs, kick, title):
    sl = new16(prs)
    rrect(sl, ML, H16 / 2 - 1.15, 0.09, 2.3, GOLD, radius=0.5, gradient=(GOLD_LIGHT, GOLD_DEEP), angle=90)
    eyebrow(sl, ML + 0.45, H16 / 2 - 0.95, 8.0, kick)
    tf = textbox(sl, ML + 0.45, H16 / 2 - 0.55, W16 - ML - 2.0, 1.6)
    p = para(tf, first=True, line=1.03)
    run(p, title, 44, INK, bold=True, font=HEAD)
    footer(sl, W16)
    return sl


def stufe_title16(prs, s):
    sl = new16(prs)
    disc(sl, ML, 2.55, 2.0, int(s["num"]), size=40)
    x = ML + 2.7
    eyebrow(sl, x, 2.35, 8.0, "Stufe %s" % s["num"].zfill(2))
    tf = textbox(sl, x, 2.8, W16 - x - 0.9, 1.5)
    p = para(tf, first=True, line=1.0)
    run(p, s["name"], 54, INK, bold=True, font=HEAD)
    rrect(sl, x + 0.02, 4.15, 2.6, 0.06, GOLD, radius=0.5, gradient=(GOLD_LIGHT, GOLD_DEEP), angle=0)
    tf2 = textbox(sl, x, 4.4, W16 - x - 0.9, 1.2)
    p = para(tf2, first=True, line=1.15)
    run(p, "„%s“" % s["claim"], 26, MID, italic=True, font=HEAD)
    footer(sl, W16)
    note = "Titel-Einblendung. Stufe %s – %s. Ziellänge: %s." % (
        s["num"], s["name"], s["length"] or "–")
    notes(sl, note)
    return sl


def merksatz16(prs, kick, quote, ref):
    sl = new16(prs)
    eyebrow(sl, 0, 1.35, W16, kick, align=PP_ALIGN.CENTER)
    # großes Anführungszeichen
    tf0 = textbox(sl, 0, 1.65, W16, 1.0, anchor=MSO_ANCHOR.TOP)
    p = para(tf0, first=True, align=PP_ALIGN.CENTER)
    run(p, "“", 70, GOLD, bold=True, font=HEAD)
    tf = textbox(sl, 1.6, 2.75, W16 - 3.2, 3.0, anchor=MSO_ANCHOR.MIDDLE)
    p = para(tf, first=True, align=PP_ALIGN.CENTER, line=1.16)
    run(p, quote, 33, INK, bold=False, font=HEAD)
    if ref:
        tf2 = textbox(sl, 0, 6.35, W16, 0.4, anchor=MSO_ANCHOR.MIDDLE)
        p = para(tf2, first=True, align=PP_ALIGN.CENTER)
        run(p, ref.upper(), 11, GOLD_DEEP, bold=True, font=BODY, tracking=2.4)
    notes(sl, "Merksatz-Einblendung (Abschluss). %s" % (ref or ""))
    return sl


def simple_title16(prs, kick, title, note=None, title_size=46):
    """Schlichte Titel-Einblendung: Gold-Eyebrow + Serifen-Headline + Gold-Linie."""
    sl = new16(prs)
    eyebrow(sl, ML, 2.5, W16 - 2 * ML, kick)
    tf = textbox(sl, ML, 3.0, W16 - 2 * ML, 2.0)
    p = para(tf, first=True, line=1.02)
    run(p, title, title_size, INK, bold=True, font=HEAD)
    rrect(sl, ML + 0.02, 4.95, 2.6, 0.06, GOLD, radius=0.5, gradient=(GOLD_LIGHT, GOLD_DEEP), angle=0)
    footer(sl, W16)
    notes(sl, note)
    return sl


def praxis_title16(prs, p_):
    sl = new16(prs)
    x = ML
    kick = "Praxis"
    if p_["kind"]:
        kick += " · " + p_["kind"]
    eyebrow(sl, x, 2.35, 10.0, kick)
    tf = textbox(sl, x, 2.85, W16 - 2 * ML, 1.7)
    p = para(tf, first=True, line=1.02)
    run(p, p_["name"], 48, INK, bold=True, font=HEAD)
    rrect(sl, x + 0.02, 4.55, 2.6, 0.06, GOLD, radius=0.5, gradient=(GOLD_LIGHT, GOLD_DEEP), angle=0)
    meta = []
    if p_["length"]:
        meta.append(p_["length"])
    if p_["stufe"]:
        meta.append("Stufe %s" % p_["stufe"])
    if meta:
        tf2 = textbox(sl, x, 4.85, W16 - 2 * ML, 0.5)
        p = para(tf2, first=True)
        run(p, "  ·  ".join(meta), 15, MID, font=BODY)
    footer(sl, W16)
    notes(sl, "Titel-Einblendung Praxis-Übung: %s." % p_["name"])
    return sl


# --------------------------------------------------------------------------- #
# 9:16 – Reel-Folien (Hochformat)
# --------------------------------------------------------------------------- #
W9, H9 = 7.5, 13.333


def new9(prs):
    sl = prs.slides.add_slide(prs.slide_layouts[6])
    bg(sl, PAPER)
    return sl


def divider9(prs, kick, title):
    sl = new9(prs)
    rrect(sl, W9 / 2 - 1.3, H9 / 2 - 1.4, 2.6, 0.08, GOLD, radius=0.5,
          gradient=(GOLD_LIGHT, GOLD_DEEP), angle=0)
    eyebrow(sl, 0, H9 / 2 - 1.05, W9, kick, align=PP_ALIGN.CENTER)
    tf = textbox(sl, 0.5, H9 / 2 - 0.6, W9 - 1.0, 1.8, anchor=MSO_ANCHOR.TOP)
    p = para(tf, first=True, align=PP_ALIGN.CENTER, line=1.03)
    run(p, title, 42, INK, bold=True, font=HEAD)
    footer(sl, W9)
    return sl


def cover9(prs, cover, subtitle):
    sl = new9(prs)
    rect(sl, 0, 0, W9, 0.16, GOLD, gradient=(GOLD_LIGHT, GOLD_DEEP), angle=0)
    if os.path.exists(LOGO):
        sl.shapes.add_picture(LOGO, IN(W9 / 2 - 0.85), IN(2.4), width=IN(1.7), height=IN(1.7))
    wordmark(sl, W9 / 2, 4.4, scale=1.0)
    tf = textbox(sl, 0.7, 5.6, W9 - 1.4, 3.0, anchor=MSO_ANCHOR.TOP)
    p = para(tf, first=True, align=PP_ALIGN.CENTER, line=1.03)
    run(p, "„%s“" % cover, 46, INK, bold=True, font=HEAD)
    if subtitle:
        tf2 = textbox(sl, 0.9, 8.7, W9 - 1.8, 1.0, anchor=MSO_ANCHOR.TOP)
        p = para(tf2, first=True, align=PP_ALIGN.CENTER, line=1.2)
        run(p, subtitle, 15, MID, font=BODY)
    footer(sl, W9)
    return sl


def big9(prs, kick, text, size=40, kick_color=GOLD_DEEP):
    sl = new9(prs)
    if kick:
        eyebrow(sl, 0, 4.6, W9, kick, align=PP_ALIGN.CENTER, size=13)
    tf = textbox(sl, 0.7, 5.2, W9 - 1.4, 3.5, anchor=MSO_ANCHOR.MIDDLE)
    p = para(tf, first=True, align=PP_ALIGN.CENTER, line=1.12)
    run(p, text, size, INK, bold=True, font=HEAD)
    footer(sl, W9)
    return sl


def cta9(prs, cta):
    sl = new9(prs)
    eyebrow(sl, 0, 4.4, W9, "Jetzt starten", align=PP_ALIGN.CENTER, size=13)
    tf = textbox(sl, 0.8, 5.0, W9 - 1.6, 3.2, anchor=MSO_ANCHOR.MIDDLE)
    p = para(tf, first=True, align=PP_ALIGN.CENTER, line=1.15)
    run(p, cta, 26, INK, font=HEAD)
    # Gold-Button
    bw, bh = 5.4, 1.05
    btn = rrect(sl, W9 / 2 - bw / 2, 8.7, bw, bh, GOLD, radius=0.5,
                gradient=(GOLD_LIGHT, GOLD_DEEP), angle=0)
    tf2 = btn.text_frame
    _no_autosize(tf2)
    tf2.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf2.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run(p, "Kostenlosen Bewusstseinstest machen", 15, WHITE, bold=True, font=BODY)
    footer(sl, W9)
    return sl


# --------------------------------------------------------------------------- #
# Build
# --------------------------------------------------------------------------- #
def build_langvideo():
    prs = Presentation()
    prs.slide_width = IN(W16)
    prs.slide_height = IN(H16)

    cover16(prs, "Video-Folien", "On-Screen-Einblendungen für die Langvideos · Creme-Branding")

    # 7 Stufen
    divider16(prs, "Die Reise", "Die 7 Stufen")
    n_stufen = 0
    for f in files("stufen-komplett"):
        s = parse_stufe(read(f))
        stufe_title16(prs, s)
        if s["merksatz"]:
            merksatz16(prs, "Merksatz · Stufe %s" % s["num"].zfill(2), s["merksatz"],
                       "Stufe %s · %s" % (s["num"], s["name"]))
        n_stufen += 1

    # Praxis
    divider16(prs, "Werkzeugkasten", "Praxis")
    n_praxis = 0
    for f in files("praxis"):
        praxis_title16(prs, parse_praxis(read(f)))
        n_praxis += 1

    # Vertiefungen (ohne die 16er-Sammlung „Mentale Selbstverteidigung")
    divider16(prs, "Hintergrund", "Vertiefungen")
    n_vert = 0
    for f in files("vertiefungen-komplett", exclude=("mentale-selbstverteidigung-komplett.md",)):
        v = parse_vertiefung(read(f))
        ref = "Vertiefung" + (" · Stufe %s" % v["stufe"] if v["stufe"] else "")
        simple_title16(prs, ref, v["title"], "Titel-Einblendung Vertiefung: %s." % v["title"])
        if v["merksatz"]:
            merksatz16(prs, "Merksatz · " + ref, v["merksatz"], v["title"])
        n_vert += 1

    # Mentale Selbstverteidigung (16 Themen)
    divider16(prs, "Gedankenfreiheit", "Mentale Selbstverteidigung")
    sv = parse_sv_bundle(read(os.path.join(
        SKRIPTE, "vertiefungen-komplett", "mentale-selbstverteidigung-komplett.md")))
    for t in sv:
        ref = "Mentale Selbstverteidigung · %s" % t["num"].zfill(2)
        simple_title16(prs, ref, t["title"], "Titel-Einblendung SV %s: %s." % (t["num"], t["title"]),
                       title_size=42)
        if t["merksatz"]:
            merksatz16(prs, "Merksatz · Thema %s" % t["num"].zfill(2), t["merksatz"], t["title"])
    n_sv = len(sv)

    os.makedirs(OUTDIR, exist_ok=True)
    out = os.path.join(OUTDIR, "WMDG-Video-Folien.pptx")
    prs.save(out)
    total = len(prs.slides._sldIdLst)
    print("✓ %s  (%d Folien · %d Stufen, %d Praxis, %d Vertiefungen, %d Selbstverteidigung)"
          % (out, total, n_stufen, n_praxis, n_vert, n_sv))


def build_reel():
    prs = Presentation()
    prs.slide_width = IN(W9)
    prs.slide_height = IN(H9)

    r = parse_reel(read(os.path.join(SKRIPTE, "landing", "reel-nicht-deine-schuld.md")))
    cover9(prs, r["cover"] or "Nicht deine Schuld",
           "Teaser-Reel · Instagram · TikTok · YouTube Shorts")
    big9(prs, "Hook · 0–3 Sek", r["hook"], size=38)
    for i, ov in enumerate(r["overlays"], 1):
        big9(prs, "On-Screen %d/%d" % (i, len(r["overlays"])), ov, size=40)
    cta9(prs, r["cta"])

    os.makedirs(OUTDIR, exist_ok=True)
    out = os.path.join(OUTDIR, "WMDG-Video-Folien-Reel.pptx")
    prs.save(out)
    total = len(prs.slides._sldIdLst)
    print("✓ %s  (%d Folien · Hook, %d Overlays, CTA)"
          % (out, total, len(r["overlays"])))


def build_stufen_reels():
    prs = Presentation()
    prs.slide_width = IN(W9)
    prs.slide_height = IN(H9)

    cover9(prs, "Die 7 Stufen", "Reel-Serie · 7 Stufen × 3 Varianten · Hook · On-Screen · CTA")

    stages = parse_stufen_reels(read(os.path.join(SKRIPTE, "reels", "stufen.md")))
    n_reels = 0
    for st in stages:
        num = st["num"].zfill(2)
        divider9(prs, "Stufe %s" % num, "%s\n„%s“" % (st["name"], st["claim"]))
        for v in st["variants"]:
            vl = v["label"].replace("Variante ", "")  # A / B / C
            base = "Stufe %s · %s" % (num, vl)
            big9(prs, base + " · Hook", v["hook"], size=36)
            for i, ov in enumerate(v["overlays"], 1):
                big9(prs, "%s · On-Screen %d/%d" % (base, i, len(v["overlays"])), ov, size=40)
            if v["cta"]:
                big9(prs, base + " · CTA", v["cta"], size=26)
            n_reels += 1

    os.makedirs(OUTDIR, exist_ok=True)
    out = os.path.join(OUTDIR, "WMDG-Video-Folien-Reels-7-Stufen.pptx")
    prs.save(out)
    total = len(prs.slides._sldIdLst)
    print("✓ %s  (%d Folien · %d Reels aus %d Stufen)"
          % (out, total, n_reels, len(stages)))


def main():
    if not os.path.isdir(SKRIPTE):
        sys.exit("Skript-Verzeichnis nicht gefunden: %s" % SKRIPTE)
    build_langvideo()
    build_reel()
    build_stufen_reels()


if __name__ == "__main__":
    main()
