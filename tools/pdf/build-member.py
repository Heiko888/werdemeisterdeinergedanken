#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Erzeugt die Mitglieder-Dokumente (Arbeitsheft, Lektionen, Übungsblätter,
# Vertiefungen) als HTML in BUILD_DIR. Pfade relativ / per Env (siehe generate.mjs).
import base64, os, json, html as _html

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("REPO_ROOT", os.path.abspath(os.path.join(HERE, "..", "..")))
ASSETS = os.path.join(HERE, "assets")
BUILD = os.environ.get("BUILD_DIR", os.path.join(HERE, ".build"))
os.makedirs(BUILD, exist_ok=True)

def enc(p, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(p, "rb").read()).decode())

FONTS = open(os.path.join(ASSETS, "fonts.css")).read()
LOGO  = enc(os.path.join(ROOT, "public/logo-brain.png"), "image/png")
BRAIN = enc(os.path.join(ASSETS, "brain-freigestellt.png"), "image/png")
C = json.load(open(os.path.join(BUILD, "content.json"), encoding="utf-8"))

def esc(s):
    return _html.escape(s, quote=False)

CSS = r"""
/*__FONTS__*/
*{ margin:0; padding:0; box-sizing:border-box; }
html{ background:#ffffff; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ font-family:'Inter',ui-sans-serif,system-ui,sans-serif; color:#16231f; }
.serif{ font-family:'Fraunces',Georgia,serif; }
@page{ size:A4; margin:15mm 17mm 16mm; }

:root{
  --ink:#16231f; --ink-soft:#48524e; --accent:#4f9e1c;
  --teal-300:#5fd6d2; --teal-400:#34c4c4; --teal-500:#21b2bd;
  --leaf-500:#8cc63f; --leaf-600:#74ab2f; --gold-400:#e8c15f;
  --surface:#f6f4ee; --hair:#e4ded0;
}

/* Kopf-Karte (Seite 1) */
.dochead{ position:relative; overflow:hidden; color:#eaf0ff; border-radius:16px;
  padding:22px 26px 24px; margin-bottom:22px;
  background:radial-gradient(70% 130% at 88% 0%, rgba(52,196,196,.28), transparent 60%),
             linear-gradient(140deg,#08102a,#12244d); }
.dochead .num{ position:absolute; right:14px; top:-14px; font-family:'Fraunces',serif; font-weight:600;
  font-size:118px; line-height:1; color:transparent; -webkit-text-stroke:1.4px rgba(95,214,210,.34);
  z-index:0; pointer-events:none; }
.dochead .num.gold{ -webkit-text-stroke-color:rgba(242,212,137,.5); }
/* Textspalte im Kopf: hält immer Abstand zur großen Hintergrundzahl rechts,
   damit Titel/Label/Untertitel niemals in die Zahl hineinlaufen. */
.dochead .hgroup{ position:relative; z-index:1; padding-right:150px; }
.dochead .eyebrow{ font-size:10.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--teal-300); font-weight:600; }
.dochead h1{ font-family:'Fraunces',serif; font-weight:600; font-size:30px; letter-spacing:-.3px; margin-top:10px; line-height:1.1; }
.dochead .sub{ font-size:13px; color:#9fd6d2; font-style:italic; margin-top:7px; }

.klabel{ font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:700;
  margin:22px 0 10px; break-after:avoid; }
.klabel:first-of-type{ margin-top:2px; }
.pquote{ border-left:3px solid var(--teal-400); padding:2px 0 2px 18px; margin:6px 0 18px; break-inside:avoid; }
.pquote p{ font-family:'Fraunces',serif; font-style:italic; font-size:18px; line-height:1.4; color:var(--ink); }
.lead{ font-size:12px; line-height:1.65; color:var(--ink-soft); margin-bottom:14px; }
.h3{ font-family:'Fraunces',serif; font-weight:600; font-size:15px; color:var(--ink); margin:16px 0 5px; break-after:avoid; }
.body{ font-size:11.5px; line-height:1.62; color:var(--ink-soft); margin-bottom:6px; }

.exercise{ background:var(--surface); border:1px solid var(--hair); border-left:4px solid var(--leaf-500);
  border-radius:14px; padding:16px 20px; margin:12px 0; break-inside:avoid;
  box-shadow:0 12px 30px -26px rgba(22,35,31,.5); }
.exercise .top{ display:flex; align-items:baseline; justify-content:space-between; gap:12px; }
.exercise .top b{ font-size:14.5px; }
.chip{ flex:none; font-size:10px; font-weight:600; color:var(--accent); background:rgba(79,158,28,.12);
  border-radius:999px; padding:4px 10px; }
.exlabel{ font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--leaf-600); font-weight:700; margin-top:2px; }
.steps{ margin-top:11px; display:flex; flex-direction:column; gap:8px; }
.steps li{ list-style:none; display:flex; gap:11px; font-size:11.5px; line-height:1.5; color:var(--ink); }
.steps .num{ flex:none; width:19px; height:19px; border-radius:50%; background:var(--teal-500); color:#fff;
  font-size:10.5px; font-weight:700; display:grid; place-items:center; }
.notes{ margin-top:14px; }
.notes .nl{ font-size:9.5px; letter-spacing:.06em; color:var(--ink-soft); font-style:italic; margin-bottom:8px; }
.line{ border-bottom:1px solid #cfc9ba; height:20px; }
.line + .line{ margin-top:0; }

.refitem{ break-inside:avoid; margin-bottom:12px; }
.refitem .q{ font-size:12px; line-height:1.5; color:var(--ink); }
.refitem.read .q{ padding-left:18px; position:relative; }
.refitem.read .q::before{ content:"„"; position:absolute; left:0; top:-2px; color:var(--teal-500);
  font-family:'Fraunces',serif; font-size:20px; }

.affirm{ break-inside:avoid; margin-top:18px; border-radius:14px; padding:16px 22px;
  background:var(--surface); border:1px solid var(--hair); border-left:3px solid var(--teal-400); }
.affirm .k{ font-size:9.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.affirm p{ font-family:'Fraunces',serif; font-style:italic; font-size:15px; color:var(--ink); margin-top:6px; line-height:1.4; }

.docfoot{ margin-top:20px; padding-top:10px; border-top:1px solid var(--hair);
  display:flex; justify-content:space-between; font-size:9.5px; color:#9a9384; break-inside:avoid; }
.docfoot .dom{ color:var(--accent); font-weight:600; }

/* ---- Arbeitsheft-Cover (volle Seite, eigenes Dokument mit @page margin:0) ---- */
.cover{ position:relative; width:210mm; height:297mm; overflow:hidden; color:#eaf0ff;
  background:radial-gradient(66% 48% at 50% 60%, rgba(52,196,196,.16), transparent 62%),
    radial-gradient(60% 42% at 18% 14%, rgba(109,90,224,.30), transparent 60%),
    linear-gradient(160deg,#050914 0%,#0a1430 52%,#0b1a3c 100%); }
.cover .brain{ position:absolute; left:50%; top:calc(64% - 6mm); transform:translate(-50%,-50%);
  width:120%; mix-blend-mode:screen; opacity:.97; }
.cover .inner{ position:relative; height:100%; padding:22mm 22mm 18mm; display:flex; flex-direction:column; }
.cover .brandrow{ display:flex; align-items:center; gap:11px; }
.cover .brandrow img{ width:38px; height:38px; }
.cover .brandrow span{ font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--teal-300); font-weight:600; line-height:1.3; }
.cover .eyebrow{ margin-top:13mm; font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--gold-400); font-weight:600;
  display:inline-flex; align-items:center; gap:9px; }
.cover .eyebrow::before{ content:""; width:26px; height:1.5px; background:var(--gold-400); }
.cover h1{ font-family:'Fraunces',serif; font-weight:600; font-size:48px; line-height:1.08; margin-top:12px; }
.cover h1 em{ font-style:italic; color:var(--teal-300); font-weight:500; }
.cover .pr{ margin-top:15px; font-size:16px; line-height:1.5; color:#cdd8ec; max-width:150mm; text-shadow:0 1px 16px rgba(3,8,20,.8); }
.cover .foot{ margin-top:auto; display:flex; justify-content:space-between; align-items:center;
  border-top:1px solid rgba(255,255,255,.14); padding-top:6mm; }
.cover .dom{ font-size:12px; color:var(--teal-300); letter-spacing:.05em; }
.cover .foot .n{ font-size:12px; color:#a7b4d0; }

/* Arbeitsheft: Inhaltsverzeichnis + Stufen-Trenner */
.toc h2{ font-family:'Fraunces',serif; font-weight:600; font-size:26px; margin-bottom:6px; }
.toc .row{ display:flex; align-items:center; gap:15px; padding:11px 0; border-bottom:1px solid var(--hair); }
.toc .n{ font-family:'Fraunces',serif; font-size:22px; color:var(--teal-500); width:38px; text-align:center; }
.toc .n.g{ color:var(--gold-400); }
.toc b{ font-size:14px; } .toc span{ display:block; font-size:11.5px; color:var(--ink-soft); }
.stagebreak{ break-before:page; }
"""
CSS = CSS.replace("/*__FONTS__*/", FONTS)

def doc(inner, cover=False):
    extra = "@page{size:A4;margin:0}" if cover else ""
    return ("<!doctype html><html lang='de'><head><meta charset='utf-8'>"
            "<style>" + CSS + extra + "</style></head><body>" + inner + "</body></html>")

def dochead(eyebrow, title, sub, num=None, gold=False):
    numhtml = ('<div class="num serif%s">%s</div>' % (" gold" if gold else "", esc(num))) if num else ""
    return ('<div class="dochead">%s<div class="hgroup"><div class="eyebrow">%s</div>'
            '<h1>%s</h1><div class="sub">%s</div></div></div>'
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

def footer(label):
    return ('<div class="docfoot"><span>%s</span><span class="dom">werdemeisterdeinergedanken.de</span></div>'
            ) % esc(label)

# ---------------- Dokumenttypen ----------------
def lesson_doc(stage, lesson):
    gold = stage["number"] == "07"
    inner = (
        dochead("Lektion · Stufe %s" % stage["number"], stage["title"], stage["subtitle"], stage["number"], gold)
        + '<div class="pquote"><p>„%s“</p></div>' % esc(lesson["keyIdea"])
        + '<div class="lead">%s</div>' % esc(lesson["intro"])
        + '<div class="klabel">Die Lektion</div>' + sections_html(lesson["sections"])
        + '<div class="klabel">Deine Übungen</div>'
        + "".join(exercise_html(e, False) for e in lesson["exercises"])
        + '<div class="klabel">Zum Innehalten</div>' + reflection_html(lesson["reflection"], False)
        + affirm_html(lesson["affirmation"])
        + footer("Werde Meister deiner Gedanken · Stufe %s – %s" % (stage["number"], stage["title"]))
    )
    return doc(inner)

def worksheet_doc(stage, lesson):
    gold = stage["number"] == "07"
    inner = (
        dochead("Arbeitsblatt · Stufe %s" % stage["number"], stage["title"], stage["subtitle"], stage["number"], gold)
        + '<div class="pquote"><p>„%s“</p></div>' % esc(lesson["keyIdea"])
        + '<div class="klabel">Deine Übungen</div>'
        + "".join(exercise_html(e, True) for e in lesson["exercises"])
        + '<div class="klabel">Zum Innehalten</div>' + reflection_html(lesson["reflection"], True)
        + affirm_html(lesson["affirmation"])
        + footer("Werde Meister deiner Gedanken · Stufe %s – %s" % (stage["number"], stage["title"]))
    )
    return doc(inner)

def deepdive_doc(d):
    inner = (
        dochead("Vertiefung · %s" % d["category"], d["title"], d["subtitle"])
        + '<div class="pquote"><p>„%s“</p></div>' % esc(d["keyIdea"])
        + '<div class="lead">%s</div>' % esc(d["intro"])
        + '<div class="klabel">Die Vertiefung</div>' + sections_html(d["sections"])
        + '<div class="klabel">Deine Übungen</div>'
        + "".join(exercise_html(e, False) for e in d["exercises"])
        + '<div class="klabel">Zum Innehalten</div>' + reflection_html(d["reflection"], False)
        + affirm_html(d["takeaway"], "Kernbotschaft")
        + footer("Werde Meister deiner Gedanken · Vertiefung: %s" % d["title"])
    )
    return doc(inner)

def workbook_cover(stages):
    cover = (
        '<div class="cover"><img class="brain" src="%s"><div class="inner">'
        '<div class="brandrow"><img src="%s"><span>Werde Meister<br>deiner Gedanken</span></div>'
        '<div class="eyebrow">Das Arbeitsheft</div>'
        '<h1 class="serif">Die 7 Stufen <em>der<br>Bewusstseinsentwicklung</em></h1>'
        '<p class="pr">Dein persönlicher Begleiter: Lektionen, Übungen und Reflexionsfragen '
        'zu allen 7 Stufen – mit Raum, deine Gedanken festzuhalten.</p>'
        '<div class="foot"><span class="n">Ein Arbeitsheft von Heiko Schwaninger</span>'
        '<span class="dom">werdemeisterdeinergedanken.de</span></div>'
        '</div></div>'
    ) % (BRAIN, LOGO)
    return doc(cover, cover=True)

def workbook_body(stages, lessons):
    rows = ""
    for s in stages:
        g = " g" if s["number"] == "07" else ""
        rows += ('<div class="row"><div class="n%s">%s</div><div><b>%s</b>'
                 '<span>%s</span></div></div>') % (g, s["number"], esc(s["title"]), esc(s["subtitle"]))
    toc = '<div class="toc"><h2 class="serif">Inhalt</h2>%s</div>' % rows
    body = ""
    for s in stages:
        lesson = next(l for l in lessons if l["number"] == s["number"])
        gold = s["number"] == "07"
        body += '<div class="stagebreak">' + (
            dochead("Stufe %s" % s["number"], s["title"], s["subtitle"], s["number"], gold)
            + '<div class="pquote"><p>„%s“</p></div>' % esc(lesson["keyIdea"])
            + '<div class="lead">%s</div>' % esc(lesson["intro"])
            + '<div class="klabel">Die Lektion</div>' + sections_html(lesson["sections"])
            + '<div class="klabel">Deine Übungen</div>'
            + "".join(exercise_html(e, True) for e in lesson["exercises"])
            + '<div class="klabel">Zum Innehalten</div>' + reflection_html(lesson["reflection"], True)
            + affirm_html(lesson["affirmation"])
        ) + '</div>'
    return doc(toc + body)

# ---------------- Ausgabe ----------------
def slugmap_stage(s):
    return s  # nr already 1..7 handled by caller

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
