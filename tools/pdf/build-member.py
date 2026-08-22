#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Erzeugt die Mitglieder-Dokumente (Arbeitsheft, Lektionen, Übungsblätter,
# Vertiefungen) als HTML in BUILD_DIR. Pfade relativ / per Env (siehe generate.mjs).
#
# Aufbau jedes Einzeldokuments (wie beim E-Book):
#   Seite 1  = Deckblatt im Workshop-Stil (Starfield-Hintergrund + Gehirn rechts)
#   Seite 2+ = Inhaltsseiten mit randlosem Kopf-Band und Fußzeile je Seite
import base64, os, json, html as _html

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("REPO_ROOT", os.path.abspath(os.path.join(HERE, "..", "..")))
ASSETS = os.path.join(HERE, "assets")
WS_ASSETS = os.path.join(ROOT, "tools", "workshop", "assets")
BUILD = os.environ.get("BUILD_DIR", os.path.join(HERE, ".build"))
os.makedirs(BUILD, exist_ok=True)

def enc(p, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(p, "rb").read()).decode())

FONTS = open(os.path.join(ASSETS, "fonts.css")).read()
LOGO  = enc(os.path.join(ROOT, "public/logo-brain.png"), "image/png")
# Deckblatt-Motive aus dem Workshop, damit die Cover identisch aussehen.
BG_TITLE = enc(os.path.join(WS_ASSETS, "bg-title.png"), "image/png")
BRAIN_WS = enc(os.path.join(WS_ASSETS, "brain.png"), "image/png")
C = json.load(open(os.path.join(BUILD, "content.json"), encoding="utf-8"))

def esc(s):
    return _html.escape(s, quote=False)

CSS = r"""
/*__FONTS__*/
*{ margin:0; padding:0; box-sizing:border-box; }
html{ background:#ffffff; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ font-family:'Inter',ui-sans-serif,system-ui,sans-serif; color:#16231f; }
.serif{ font-family:'Fraunces',Georgia,serif; }

/* Inhaltsseiten reservieren unten Platz für die Fußzeile; das Deckblatt (erste
   Seite) läuft randlos bis zur Kante. */
@page{ size:A4; margin:12mm 0 14mm 0; }
@page:first{ margin:0; }

:root{
  --ink:#16231f; --ink-soft:#48524e; --accent:#4f9e1c;
  --teal-300:#5fd6d2; --teal-400:#34c4c4; --teal-500:#21b2bd;
  --leaf-400:#a3d64f; --leaf-500:#8cc63f; --leaf-600:#74ab2f; --gold-400:#e8c15f;
  --surface:#f6f4ee; --hair:#e4ded0;
  --navy-900:#08102a;
}

/* ============================================================
   DECKBLATT  (Workshop-Stil: Starfield + Gehirn rechts)
   ============================================================ */
.cover{ position:relative; width:210mm; height:297mm; overflow:hidden; color:#eaf0ff;
  background:#08102a; z-index:5; }
.cover .bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }
.cover .brain{ position:absolute; right:-24mm; top:96mm; width:150mm; z-index:1;
  opacity:.96; filter:drop-shadow(0 8px 40px rgba(52,196,196,.25)); }
.cover .inner{ position:relative; z-index:2; height:100%; padding:24mm 22mm 20mm;
  display:flex; flex-direction:column; }
.cover .brandrow{ display:flex; align-items:center; gap:11px; }
.cover .brandrow img{ width:34px; height:34px; }
.cover .brandrow span{ font-size:10.5px; letter-spacing:.24em; text-transform:uppercase;
  color:var(--teal-300); font-weight:600; line-height:1.3; }
.cover .eyebrow{ margin-top:20mm; display:inline-flex; align-items:center; gap:9px;
  font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:var(--leaf-400); font-weight:700; }
.cover .eyebrow::before{ content:""; width:26px; height:1.5px; background:var(--leaf-400); }
.cover h1{ font-family:'Fraunces',serif; font-weight:600; font-size:46px; line-height:1.08;
  margin-top:14px; letter-spacing:-.4px; max-width:120mm; text-shadow:0 2px 30px rgba(3,8,20,.7); }
.cover .sub{ margin-top:14px; font-family:'Fraunces',serif; font-style:italic; font-weight:500;
  font-size:23px; line-height:1.3; color:var(--teal-300); max-width:118mm;
  text-shadow:0 1px 16px rgba(3,8,20,.85); }
.cover .promise{ margin-top:16px; font-size:14px; line-height:1.55; color:#d3ddf0; max-width:105mm;
  text-shadow:0 1px 16px rgba(3,8,20,.85); }
.cover .num{ position:absolute; right:16mm; top:14mm; font-family:'Fraunces',serif; font-weight:600;
  font-size:150px; line-height:1; color:transparent; -webkit-text-stroke:1.6px rgba(95,214,210,.4);
  z-index:2; }
.cover .num.gold{ -webkit-text-stroke-color:rgba(242,212,137,.55); }
.cover .foot{ margin-top:auto; display:flex; justify-content:space-between; align-items:center;
  border-top:1px solid rgba(255,255,255,.15); padding-top:6mm; }
.cover .author b{ display:block; font-size:13px; color:#fff; font-weight:600; }
.cover .author span{ font-size:11px; color:#a7b4d0; }
.cover .dom{ font-size:12px; color:var(--teal-300); letter-spacing:.04em; }

/* ============================================================
   INHALTSSEITEN
   ============================================================ */
/* Randloses Kopf-Band (wie E-Book/Workshop, statt schwebender Karte) */
/* Kopf-Band randlos: negatives margin zieht es in den oberen Seitenrand,
   damit es auf der ersten Inhaltsseite bis an Ober- und Seitenkante läuft;
   Folgeseiten behalten dadurch ihren oberen Rand. */
.chead{ position:relative; overflow:hidden; color:#eaf0ff;
  margin:-12mm 0 0 0;
  background:
    radial-gradient(60% 120% at 88% 12%, rgba(52,196,196,.30), transparent 60%),
    linear-gradient(140deg, #08102a, #12224b);
  padding:12mm 18mm 9mm; }
.chead .big{ position:absolute; right:16mm; top:6mm; font-family:'Fraunces',serif; font-weight:600;
  font-size:108px; line-height:1; color:transparent; -webkit-text-stroke:1.4px rgba(95,214,210,.32); }
.chead .big.gold{ -webkit-text-stroke-color:rgba(242,212,137,.5); }
.chead .eyebrow{ font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--teal-300); font-weight:600; }
.chead h1{ font-family:'Fraunces',serif; font-weight:600; font-size:31px; letter-spacing:-.3px; margin-top:8px; line-height:1.08; }
.chead .sub{ font-size:14px; color:#9fd6d2; font-style:italic; margin-top:6px; }

.content{ break-before:page; }
.cbody{ padding:11mm 18mm 0; }

.klabel{ font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:700;
  margin:14px 0 7px; break-after:avoid; }
.klabel:first-of-type{ margin-top:0; }
.pquote{ border-left:3px solid var(--teal-400); padding:2px 0 2px 18px; margin:3px 0 11px; break-inside:avoid; }
.pquote p{ font-family:'Fraunces',serif; font-style:italic; font-size:17.5px; line-height:1.38; color:var(--ink); }
.lead{ font-size:12.5px; line-height:1.58; color:var(--ink-soft); margin-bottom:11px; }
.h3{ font-family:'Fraunces',serif; font-weight:600; font-size:15px; color:var(--ink); margin:12px 0 4px; break-after:avoid; }
.body{ font-size:11.5px; line-height:1.58; color:var(--ink-soft); margin-bottom:6px; }

.exercise{ background:var(--surface); border:1px solid var(--hair); border-left:4px solid var(--leaf-500);
  border-radius:14px; padding:12px 18px; margin:9px 0; break-inside:avoid;
  box-shadow:0 12px 30px -26px rgba(22,35,31,.5); }
.exercise .top{ display:flex; align-items:baseline; justify-content:space-between; gap:12px; }
.exercise .top b{ font-size:14.5px; }
.chip{ flex:none; font-size:10px; font-weight:600; color:var(--accent); background:rgba(79,158,28,.12);
  border-radius:999px; padding:4px 10px; }
.exlabel{ font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--leaf-600); font-weight:700; margin-top:2px; }
.steps{ margin-top:9px; display:flex; flex-direction:column; gap:7px; }
.steps li{ list-style:none; display:flex; gap:11px; font-size:11.5px; line-height:1.48; color:var(--ink); }
.steps .num{ flex:none; width:19px; height:19px; border-radius:50%; background:var(--teal-500); color:#fff;
  font-size:10.5px; font-weight:700; display:grid; place-items:center; }
.notes{ margin-top:8px; }
.notes .nl{ font-size:9.5px; letter-spacing:.06em; color:var(--ink-soft); font-style:italic; margin-bottom:6px; }
.line{ border-bottom:1px solid #cfc9ba; height:15px; }
.line + .line{ margin-top:0; }

.refitem{ break-inside:avoid; margin-bottom:7px; }
.refitem .q{ font-size:12px; line-height:1.5; color:var(--ink); }
.refitem.read .q{ padding-left:17px; position:relative; }
.refitem.read .q::before{ content:""; position:absolute; left:0; top:6px; width:6px; height:6px;
  border-radius:50%; background:var(--teal-400); }

.affirm{ break-inside:avoid; margin-top:10px; border-radius:14px; padding:12px 18px;
  background:var(--surface); border:1px solid var(--hair); border-left:3px solid var(--teal-400); }
.affirm .k{ font-size:9.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.affirm p{ font-family:'Fraunces',serif; font-style:italic; font-size:15px; color:var(--ink); margin-top:5px; line-height:1.4; }

/* Reflexion + Leitsatz bleiben als Block zusammen (kein verwaister Kasten). */
.closer{ break-inside:avoid; }

/* Fußzeile am Ende des Inhalts (fixe Positionierung ist in Chromium beim
   PDF-Druck über mehrere Seiten unzuverlässig). */
.docfoot{ margin-top:16px; padding-top:8px; border-top:1px solid var(--hair);
  display:flex; justify-content:space-between; align-items:center;
  font-size:9.5px; color:#9a9384; break-inside:avoid; }
.docfoot .dom{ color:var(--accent); font-weight:600; }

/* Arbeitsheft: Inhaltsverzeichnis + Stufen-Trenner */
.toc h2{ font-family:'Fraunces',serif; font-weight:600; font-size:26px; margin-bottom:6px; }
.toc .row{ display:flex; align-items:center; gap:15px; padding:11px 0; border-bottom:1px solid var(--hair); }
.toc .n{ font-family:'Fraunces',serif; font-size:22px; color:var(--teal-500); width:38px; text-align:center; }
.toc .n.g{ color:var(--gold-400); }
.toc b{ font-size:14px; } .toc span{ display:block; font-size:11.5px; color:var(--ink-soft); }
.stagebreak{ break-before:page; }
"""
CSS = CSS.replace("/*__FONTS__*/", FONTS)

def doc(inner, plain=False):
    # plain=True: kein randloses Deckblatt auf Seite 1 (z. B. Arbeitsheft-
    # Innenteil ohne Cover) – erste Seite bekommt denselben Rand wie alle.
    extra = "@page:first{margin:12mm 0 14mm 0}" if plain else ""
    return ("<!doctype html><html lang='de'><head><meta charset='utf-8'>"
            "<style>" + CSS + extra + "</style></head><body>" + inner + "</body></html>")

# ---------------- Deckblatt (Workshop-Stil) ----------------
def cover(eyebrow, title, sub, promise="", num=None, gold=False):
    numhtml = ('<div class="num serif%s">%s</div>' % (" gold" if gold else "", esc(num))) if num else ""
    prom = ('<p class="promise">%s</p>' % esc(promise)) if promise else ""
    return (
        '<div class="cover"><img class="bg" src="%s"><img class="brain" src="%s">%s'
        '<div class="inner">'
        '<div class="brandrow"><img src="%s"><span>Werde Meister<br>deiner Gedanken</span></div>'
        '<div class="eyebrow">%s</div>'
        '<h1 class="serif">%s</h1>'
        '<div class="sub">%s</div>%s'
        '<div class="foot">'
        '<div class="author"><b>Heiko Schwaninger</b><span>Begleiter für Bewusstseinsentwicklung</span></div>'
        '<div class="dom">werdemeisterdeinergedanken.de</div>'
        '</div></div></div>'
    ) % (BG_TITLE, BRAIN_WS, numhtml, LOGO, esc(eyebrow), esc(title), esc(sub), prom)

# ---------------- Inhaltsseiten-Bausteine ----------------
def chead(eyebrow, title, sub, num=None, gold=False):
    numhtml = ('<div class="big serif%s">%s</div>' % (" gold" if gold else "", esc(num))) if num else ""
    return ('<div class="chead">%s<div class="eyebrow">%s</div>'
            '<h1>%s</h1><div class="sub">%s</div></div>'
            ) % (numhtml, esc(eyebrow), esc(title), esc(sub))

def exercise_html(ex, interactive):
    steps = "".join('<li><span class="num">%d</span><span>%s</span></li>' % (i+1, esc(s))
                    for i, s in enumerate(ex["steps"]))
    dur = ('<span class="chip">%s</span>' % esc(ex["duration"].replace(", ", " · "))) if ex.get("duration") else ""
    notes = ('<div class="notes"><div class="nl">Meine Notizen</div>'
             '<div class="line"></div><div class="line"></div></div>') if interactive else ""
    return ('<div class="exercise"><div class="top"><b>%s</b>%s</div>'
            '<div class="exlabel">Übung</div><ul class="steps">%s</ul>%s</div>'
            ) % (esc(ex["title"]), dur, steps, notes)

def reflection_html(questions, interactive):
    out = ""
    for q in questions:
        lines = '<div class="line"></div><div class="line"></div>' if interactive else ""
        cls = "refitem" if interactive else "refitem read"
        out += '<div class="%s"><div class="q">%s</div>%s</div>' % (cls, esc(q), lines)
    return out

def affirm_html(text, label="Dein Leitsatz"):
    return '<div class="affirm"><div class="k">%s</div><p>„%s“</p></div>' % (esc(label), esc(text))

def sections_html(sections):
    return "".join('<div class="h3">%s</div><div class="body">%s</div>' % (esc(s["heading"]), esc(s["body"]))
                   for s in sections)

def docfoot(label):
    return ('<div class="docfoot"><span>%s</span><span class="dom">werdemeisterdeinergedanken.de</span></div>'
            ) % esc(label)

# ---------------- Dokumenttypen ----------------
def lesson_doc(stage, lesson):
    gold = stage["number"] == "07"
    label = "Werde Meister deiner Gedanken · Stufe %s – %s" % (stage["number"], stage["title"])
    inner = (
        cover("Lektion · Stufe %s" % stage["number"], stage["title"], stage["subtitle"],
              lesson["keyIdea"], stage["number"], gold)
        + '<div class="content">'
        + chead("Lektion · Stufe %s" % stage["number"], stage["title"], stage["subtitle"], stage["number"], gold)
        + '<div class="cbody">'
        + '<div class="pquote"><p>„%s“</p></div>' % esc(lesson["keyIdea"])
        + '<div class="lead">%s</div>' % esc(lesson["intro"])
        + '<div class="klabel">Die Lektion</div>' + sections_html(lesson["sections"])
        + '<div class="klabel">Deine Übungen</div>'
        + "".join(exercise_html(e, False) for e in lesson["exercises"])
        + '<div class="closer"><div class="klabel">Zum Innehalten</div>' + reflection_html(lesson["reflection"], False)
        + affirm_html(lesson["affirmation"]) + '</div>'
        + docfoot(label)
        + '</div></div>'
    )
    return doc(inner)

def worksheet_doc(stage, lesson):
    gold = stage["number"] == "07"
    label = "Werde Meister deiner Gedanken · Stufe %s – %s" % (stage["number"], stage["title"])
    inner = (
        cover("Arbeitsblatt · Stufe %s" % stage["number"], stage["title"], stage["subtitle"],
              lesson["keyIdea"], stage["number"], gold)
        + '<div class="content">'
        + chead("Arbeitsblatt · Stufe %s" % stage["number"], stage["title"], stage["subtitle"], stage["number"], gold)
        + '<div class="cbody">'
        + '<div class="pquote"><p>„%s“</p></div>' % esc(lesson["keyIdea"])
        + '<div class="klabel">Deine Übungen</div>'
        + "".join(exercise_html(e, True) for e in lesson["exercises"])
        + '<div class="closer"><div class="klabel">Zum Innehalten</div>' + reflection_html(lesson["reflection"], True)
        + affirm_html(lesson["affirmation"]) + '</div>'
        + docfoot(label)
        + '</div></div>'
    )
    return doc(inner)

def deepdive_doc(d):
    label = "Werde Meister deiner Gedanken · Vertiefung: %s" % d["title"]
    inner = (
        cover("Vertiefung · %s" % d["category"], d["title"], d["subtitle"], d["keyIdea"])
        + '<div class="content">'
        + chead("Vertiefung · %s" % d["category"], d["title"], d["subtitle"])
        + '<div class="cbody">'
        + '<div class="pquote"><p>„%s“</p></div>' % esc(d["keyIdea"])
        + '<div class="lead">%s</div>' % esc(d["intro"])
        + '<div class="klabel">Die Vertiefung</div>' + sections_html(d["sections"])
        + '<div class="klabel">Deine Übungen</div>'
        + "".join(exercise_html(e, False) for e in d["exercises"])
        + '<div class="closer"><div class="klabel">Zum Innehalten</div>' + reflection_html(d["reflection"], False)
        + affirm_html(d["takeaway"], "Kernbotschaft") + '</div>'
        + docfoot(label)
        + '</div></div>'
    )
    return doc(inner)

# ---------------- Arbeitsheft ----------------
def workbook_cover(stages):
    return doc(cover("Das Arbeitsheft", "Die 7 Stufen der Bewusstseinsentwicklung",
                     "Dein persönlicher Begleiter zum Ausfüllen",
                     "Lektionen, Übungen und Reflexionsfragen zu allen 7 Stufen – "
                     "mit Raum, deine Gedanken festzuhalten."))

def workbook_body(stages, lessons):
    rows = ""
    for s in stages:
        g = " g" if s["number"] == "07" else ""
        rows += ('<div class="row"><div class="n%s">%s</div><div><b>%s</b>'
                 '<span>%s</span></div></div>') % (g, s["number"], esc(s["title"]), esc(s["subtitle"]))
    toc = '<div class="cbody"><div class="toc"><h2 class="serif">Inhalt</h2>%s</div></div>' % rows
    body = ""
    for s in stages:
        lesson = next(l for l in lessons if l["number"] == s["number"])
        gold = s["number"] == "07"
        label = "Werde Meister deiner Gedanken · Stufe %s – %s" % (s["number"], s["title"])
        body += '<div class="stagebreak">' + (
            chead("Stufe %s" % s["number"], s["title"], s["subtitle"], s["number"], gold)
            + '<div class="cbody">'
            + '<div class="pquote"><p>„%s“</p></div>' % esc(lesson["keyIdea"])
            + '<div class="lead">%s</div>' % esc(lesson["intro"])
            + '<div class="klabel">Die Lektion</div>' + sections_html(lesson["sections"])
            + '<div class="klabel">Deine Übungen</div>'
            + "".join(exercise_html(e, True) for e in lesson["exercises"])
            + '<div class="closer"><div class="klabel">Zum Innehalten</div>' + reflection_html(lesson["reflection"], True)
            + affirm_html(lesson["affirmation"]) + '</div>'
            + docfoot(label)
            + '</div>'
        ) + '</div>'
    return doc(toc + body, plain=True)

# ---------------- Ausgabe ----------------
stages = C["stages"]
lessons = C["stageLessons"]
dives = C["deepDives"]

pages = {}
for i, s in enumerate(stages):
    lesson = next(l for l in lessons if l["number"] == s["number"])
    pages["stufe-%d-lektion" % (i+1)] = lesson_doc(s, lesson)
    pages["stufe-%d-uebungen" % (i+1)] = worksheet_doc(s, lesson)
for d in dives:
    pages["vertiefung-%s" % d["slug"]] = deepdive_doc(d)
# Arbeitsheft: Cover + Innenteil getrennt (werden später gemergt)
pages["arbeitsheft-cover"] = workbook_cover(stages)
pages["arbeitsheft-body"] = workbook_body(stages, lessons)

for name, htmlstr in pages.items():
    with open(os.path.join(BUILD, "m-%s.html" % name), "w", encoding="utf-8") as f:
        f.write(htmlstr)
# Liste der Einzeldokumente (ohne die Arbeitsheft-Teile) für die Render-Schleife
single = [n for n in pages if not n.startswith("arbeitsheft-")]
with open(os.path.join(BUILD, "m-manifest.json"), "w") as f:
    json.dump({"single": single}, f)
print("HTML-Dokumente:", len(pages), "| Einzel:", len(single))
