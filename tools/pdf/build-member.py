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
# Gehirn-Motiv aus dem Workshop, damit die Cover identisch zum Referenz-Workbook sind.
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
@page{ size:A4; margin:16mm 17mm; }
@page:first{ margin:0; }

:root{
  --ink:#16231f; --ink-soft:#48524e; --accent:#4f9e1c;
  --teal-300:#5fd6d2; --teal-400:#34c4c4; --teal-500:#21b2bd;
  --leaf-400:#a3d64f; --leaf-500:#8cc63f; --leaf-600:#74ab2f; --gold-400:#e8c15f;
  --surface:#f6f4ee; --hair:#e4ded0;
  --navy-900:#08102a;
}

/* ============================================================
   DECKBLATT  (Workbook-Stil: zentriert, Gehirn mittig, Name-Zeile)
   ============================================================ */
.cover{ position:relative; width:210mm; height:297mm; overflow:hidden; color:#eaf0ff;
  /* Verlaufs-Hintergrund wie im Referenz-Workbook (WMDG-Workbook-7-Stufen) */
  background:
    radial-gradient(120% 80% at 82% 6%, rgba(52,196,196,.20), transparent 55%),
    radial-gradient(90% 60% at 12% 98%, rgba(140,198,63,.14), transparent 55%),
    linear-gradient(158deg,#0a1330,#0a1024);
  z-index:5; }
.cover .inner{ position:relative; z-index:2; height:100%; padding:30mm 24mm;
  display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
.cover .brandrow{ position:absolute; top:20mm; left:0; right:0; display:flex; justify-content:center;
  align-items:center; gap:10px; z-index:2; }
.cover .brandrow img{ width:30px; height:30px; }
.cover .brandrow span{ font-size:10px; letter-spacing:.24em; text-transform:uppercase;
  color:var(--teal-300); font-weight:600; line-height:1.3; text-align:left; }
.cover .eyebrow{ font-size:13px; letter-spacing:.34em; text-transform:uppercase;
  color:var(--leaf-500); font-weight:700; margin-bottom:7mm; }
.cover .brain{ width:40mm; height:auto; filter:drop-shadow(0 8px 30px rgba(52,196,196,.35)); }
.cover h1{ font-family:'Fraunces',serif; font-weight:600; font-size:40px; line-height:1.16;
  margin-top:8mm; letter-spacing:-.3px; max-width:160mm; text-shadow:0 2px 30px rgba(3,8,20,.7); }
.cover h1 .ac{ color:var(--teal-400); }
.cover .sub{ margin-top:6mm; font-size:15px; line-height:1.55; color:#c6cfe6; max-width:125mm;
  text-shadow:0 1px 16px rgba(3,8,20,.85); }
.cover .namerow{ position:absolute; left:24mm; right:24mm; bottom:18mm; z-index:2;
  display:flex; justify-content:center; align-items:center; gap:12px; font-size:12px; color:#a7b4d0; }
.cover .namerow .nm{ display:inline-flex; align-items:baseline; gap:8px; }
.cover .namerow .ln{ display:inline-block; width:46mm; border-bottom:1px solid rgba(255,255,255,.4); }
.cover .namerow .sep{ color:rgba(255,255,255,.3); }
.cover .namerow .dom{ color:var(--teal-300); letter-spacing:.04em; }

/* ============================================================
   INHALTSSEITEN  (heller Referenz-Stil: WMDG-Workbook-7-Stufen)
   Weiße Seiten, grün→teal Nummern-Disc, große Serif-Überschrift,
   dunkler Navy-Callout fürs Zitat – kein Kopf-Band mehr.
   ============================================================ */
.content{ break-before:page; }
.cbody{ }

/* Heller Seitenkopf: Nummern-Disc + grüner Kicker + Serif-Titel + teal Untertitel */
.phead{ display:flex; gap:15px; align-items:flex-start; margin-bottom:16px; break-after:avoid; }
.phead .disc{ flex:none; width:38px; height:38px; border-radius:50%;
  background:linear-gradient(150deg,#8cc63f,#21b2bd); color:var(--navy-900);
  font-family:'Fraunces',serif; font-weight:600; font-size:18px; display:grid; place-items:center;
  box-shadow:0 8px 18px -8px rgba(33,178,189,.6); }
.phead .kicker{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.phead h1{ font-family:'Fraunces',serif; font-weight:600; font-size:30px; color:var(--navy-900);
  line-height:1.12; margin-top:2px; letter-spacing:-.2px; }
.phead .subt{ font-family:'Fraunces',serif; font-style:italic; font-size:15px; color:var(--teal-500); margin-top:3px; }

.klabel{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); font-weight:700;
  margin:20px 0 9px; break-after:avoid; }
.klabel.teal{ color:var(--teal-500); }

/* Zitat/Leitsatz im dunklen Navy-Callout (wie Referenz). */
.callout{ break-inside:avoid; margin:6px 0 15px; border-radius:16px; padding:17px 22px; color:#eaf0ff;
  background:
    radial-gradient(70% 130% at 88% 0%, rgba(52,196,196,.26), transparent 60%),
    linear-gradient(140deg,#08102a,#12244d); }
.callout .k{ font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--leaf-500); }
.callout .q{ font-family:'Fraunces',serif; font-style:italic; font-size:15.5px; line-height:1.5; margin-top:8px; color:#eef2ff; }

.lead{ font-size:13.5px; line-height:1.62; color:#2c3a35; margin-bottom:12px; }
.h3{ font-family:'Fraunces',serif; font-weight:600; font-size:18px; color:var(--navy-900); margin:16px 0 4px; break-after:avoid; }
.body{ font-size:13.5px; line-height:1.62; color:#2c3a35; margin-bottom:9px; }

/* Übungen schlicht wie in der Referenz: Serif-Titel + Teal-Label + nummerierte Schritte. */
.ex{ break-inside:avoid; margin:12px 0 6px; }
.ex .exhead{ display:flex; align-items:baseline; justify-content:space-between; gap:12px; }
.ex .extitle{ font-family:'Fraunces',serif; font-weight:600; font-size:16px; color:var(--navy-900); }
.chip{ flex:none; font-size:10px; font-weight:700; letter-spacing:.03em; color:var(--accent);
  background:rgba(79,158,28,.12); border-radius:999px; padding:4px 11px; }
.exlabel{ font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:var(--teal-500); font-weight:700; margin-top:3px; }
.steps{ margin-top:10px; list-style:none; counter-reset:st; }
.steps li{ font-size:13.5px; line-height:1.55; color:#26332e; margin:6px 0; padding-left:23px; position:relative; }
.steps li:before{ counter-increment:st; content:counter(st) "."; position:absolute; left:0; color:var(--teal-500); font-weight:700; }
.notes{ margin-top:11px; }
.notes .nl{ font-size:10px; letter-spacing:.06em; color:var(--ink-soft); font-style:italic; margin-bottom:8px; }

/* Großzügige Schreiblinien wie im Referenz-Workbook – viel Raum zum Ausfüllen. */
.line{ border-bottom:1.4px solid #d9d3c4; height:30px; }
.line + .line{ margin-top:0; }

.refitem{ break-inside:avoid; margin-bottom:9px; }
.refitem .q{ font-family:'Fraunces',serif; font-style:italic; font-size:14.5px; line-height:1.5; color:var(--navy-900); }
.refitem.read .q{ font-family:'Inter',ui-sans-serif,sans-serif; font-style:normal; font-size:13.5px;
  color:#2c3a35; padding-left:18px; position:relative; }
.refitem.read .q::before{ content:""; position:absolute; left:0; top:7px; width:6px; height:6px;
  border-radius:50%; background:var(--teal-400); }

/* Leitsatz/Kernbotschaft ebenfalls als dunkler Navy-Callout. */
.affirm{ break-inside:avoid; margin-top:15px; border-radius:16px; padding:17px 22px; color:#eaf0ff;
  background:
    radial-gradient(70% 130% at 12% 0%, rgba(140,198,63,.22), transparent 60%),
    linear-gradient(140deg,#08102a,#12244d); }
.affirm .k{ font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--leaf-500); }
.affirm p{ font-family:'Fraunces',serif; font-style:italic; font-size:16px; color:#eef2ff; margin-top:8px; line-height:1.45; }

/* Reflexion + Leitsatz bleiben als Block zusammen (kein verwaister Kasten). */
.closer{ break-inside:avoid; }

/* Fußzeile am Ende des Inhalts (fixe Positionierung ist in Chromium beim
   PDF-Druck über mehrere Seiten unzuverlässig). */
.docfoot{ margin-top:22px; padding-top:9px; border-top:1px solid var(--hair);
  display:flex; justify-content:space-between; align-items:center;
  font-size:10px; color:#9a9384; break-inside:avoid; }
.docfoot .dom{ color:var(--accent); font-weight:600; }

/* Arbeitsheft: Inhaltsverzeichnis + Stufen-Trenner */
.toc h2{ font-family:'Fraunces',serif; font-weight:600; font-size:28px; color:var(--navy-900); margin-bottom:8px; }
.toc .row{ display:flex; align-items:center; gap:15px; padding:12px 0; border-bottom:1px solid var(--hair); }
.toc .disc{ flex:none; width:36px; height:36px; border-radius:50%;
  background:linear-gradient(150deg,#8cc63f,#21b2bd); color:var(--navy-900);
  font-family:'Fraunces',serif; font-weight:600; font-size:16px; display:grid; place-items:center; }
.toc b{ font-size:15px; color:var(--navy-900); } .toc span{ display:block; font-size:12.5px; color:#2c3a35; }
.stagebreak{ break-before:page; }
"""
CSS = CSS.replace("/*__FONTS__*/", FONTS)

def doc(inner, plain=False):
    # plain=True: kein randloses Deckblatt auf Seite 1 (z. B. Arbeitsheft-
    # Innenteil ohne Cover) – erste Seite bekommt denselben Rand wie alle.
    extra = "@page:first{margin:16mm 17mm}" if plain else ""
    return ("<!doctype html><html lang='de'><head><meta charset='utf-8'>"
            "<style>" + CSS + extra + "</style></head><body>" + inner + "</body></html>")

# ---------------- Deckblatt (zentriert, Workbook-Stil) ----------------
def cover(eyebrow, title, sub, promise="", num=None, gold=False):
    # Zweifarbiger Titel wie im Workbook: letztes Wort in Teal (bei mehrwortigen
    # Titeln), einwortige Titel bleiben komplett weiß.
    words = title.split()
    if len(words) > 1:
        titled = esc(" ".join(words[:-1])) + ' <span class="ac">' + esc(words[-1]) + "</span>"
    else:
        titled = esc(title)
    return (
        '<div class="cover">'
        '<div class="inner">'
        '<div class="eyebrow">%s</div>'
        '<img class="brain" src="%s">'
        '<h1 class="serif">%s</h1>'
        '<div class="sub">%s</div>'
        '</div>'
        '<div class="namerow"><span class="nm">Name:<span class="ln"></span></span>'
        '<span class="sep">·</span><span class="dom">werdemeisterdeinergedanken.de</span></div>'
        '</div>'
    ) % (esc(eyebrow), BRAIN_WS, titled, esc(sub))

# ---------------- Inhaltsseiten-Bausteine ----------------
def chead(eyebrow, title, sub, num=None, gold=False):
    # Heller Seitenkopf im Referenz-Stil: grün→teal Nummern-Disc (bei Stufen),
    # grüner Kicker, Serif-Titel, teal-kursiver Untertitel. Kein Navy-Band.
    disc = ('<div class="disc">%s</div>' % esc(str(int(num)))) if num else ""
    return ('<div class="phead">%s<div>'
            '<div class="kicker">%s</div>'
            '<h1 class="serif">%s</h1>'
            '<div class="subt">%s</div></div></div>'
            ) % (disc, esc(eyebrow), esc(title), esc(sub))

def quote_html(text, label="Kerngedanke"):
    # Zitat im dunklen Navy-Callout wie im Referenz-Workbook.
    return '<div class="callout"><div class="k">%s</div><div class="q">„%s“</div></div>' % (esc(label), esc(text))

def exercise_html(ex, interactive):
    steps = "".join('<li>%s</li>' % esc(s) for s in ex["steps"])
    dur = ('<span class="chip">%s</span>' % esc(ex["duration"].replace(", ", " · "))) if ex.get("duration") else ""
    notes = ('<div class="notes"><div class="nl">Meine Notizen</div>'
             '<div class="line"></div><div class="line"></div></div>') if interactive else ""
    return ('<div class="ex"><div class="exhead"><div class="extitle serif">%s</div>%s</div>'
            '<div class="exlabel">Übung</div><ol class="steps">%s</ol>%s</div>'
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
        + quote_html(lesson["keyIdea"])
        + '<div class="lead">%s</div>' % esc(lesson["intro"])
        + '<div class="klabel">Die Lektion</div>' + sections_html(lesson["sections"])
        + '<div class="klabel teal">Deine Übungen</div>'
        + "".join(exercise_html(e, False) for e in lesson["exercises"])
        + '<div class="closer"><div class="klabel teal">Zum Innehalten</div>' + reflection_html(lesson["reflection"], False)
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
        + quote_html(lesson["keyIdea"])
        + '<div class="klabel teal">Deine Übungen</div>'
        + "".join(exercise_html(e, True) for e in lesson["exercises"])
        + '<div class="closer"><div class="klabel teal">Zum Innehalten</div>' + reflection_html(lesson["reflection"], True)
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
        + quote_html(d["keyIdea"])
        + '<div class="lead">%s</div>' % esc(d["intro"])
        + '<div class="klabel">Die Vertiefung</div>' + sections_html(d["sections"])
        + '<div class="klabel teal">Deine Übungen</div>'
        + "".join(exercise_html(e, False) for e in d["exercises"])
        + '<div class="closer"><div class="klabel teal">Zum Innehalten</div>' + reflection_html(d["reflection"], False)
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
        rows += ('<div class="row"><div class="disc">%s</div><div><b>%s</b>'
                 '<span>%s</span></div></div>') % (str(int(s["number"])), esc(s["title"]), esc(s["subtitle"]))
    toc = '<div class="cbody"><div class="toc"><h2 class="serif">Inhalt</h2>%s</div></div>' % rows
    body = ""
    for s in stages:
        lesson = next(l for l in lessons if l["number"] == s["number"])
        gold = s["number"] == "07"
        label = "Werde Meister deiner Gedanken · Stufe %s – %s" % (s["number"], s["title"])
        body += '<div class="stagebreak">' + (
            chead("Stufe %s" % s["number"], s["title"], s["subtitle"], s["number"], gold)
            + '<div class="cbody">'
            + quote_html(lesson["keyIdea"])
            + '<div class="lead">%s</div>' % esc(lesson["intro"])
            + '<div class="klabel">Die Lektion</div>' + sections_html(lesson["sections"])
            + '<div class="klabel teal">Deine Übungen</div>'
            + "".join(exercise_html(e, True) for e in lesson["exercises"])
            + '<div class="closer"><div class="klabel teal">Zum Innehalten</div>' + reflection_html(lesson["reflection"], True)
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
