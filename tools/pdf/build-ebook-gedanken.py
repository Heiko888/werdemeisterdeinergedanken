#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Erzeugt das E-Book „Die Gedanken, die nicht deine sind" im Markendesign
# (gleiche CSS-Sprache wie build-ebook.py). Quelle: docs/ebook/*.md
# Ausgabe: BUILD_DIR/ebook-gedanken.html  ->  via Chromium zu PDF (siehe generate).
import base64, os, re, html as _html

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("REPO_ROOT", os.path.abspath(os.path.join(HERE, "..", "..")))
ASSETS = os.path.join(HERE, "assets")
BUILD = os.environ.get("BUILD_DIR", os.path.join(HERE, ".build"))
MD = os.environ.get(
    "EBOOK_MD", os.path.join(ROOT, "docs", "ebook", "die-gedanken-die-nicht-deine-sind.md")
)
os.makedirs(BUILD, exist_ok=True)

def enc(p, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(p, "rb").read()).decode())

FONTS = open(os.path.join(ASSETS, "fonts.css")).read()
LOGO = enc(os.path.join(ROOT, "public/logo-brain-gold.png"), "image/png")
HEIKO = enc(os.path.join(ROOT, "public/heiko-portrait.webp"), "image/webp")
BRAIN = enc(os.path.join(ROOT, "public/logo-brain-gold.png"), "image/png")

# ---------------- Markdown einlesen & in Abschnitte zerlegen ----------------
lines = open(MD, encoding="utf-8").read().splitlines()
title = subtitle = tagline = ""
sections = []          # [{kind, kicker, title, paras:[...]}]
closing = ""
cur = None
i = 0
for raw in lines:
    l = raw.rstrip()
    s = l.strip()
    if s.startswith("# ") and not title:
        title = s[2:].strip(); continue
    if s.startswith("### ") and not subtitle:
        subtitle = s[4:].strip(); continue
    if s.startswith("## "):
        head = s[3:].strip()
        m = re.match(r"^(\d+)\.\s+(.*)$", head)
        if m:
            cur = {"kicker": "Kapitel %s" % m.group(1), "title": m.group(2), "paras": []}
        else:
            # Vorwort o.ä.  "Vorwort: Ein unbequemer Verdacht"
            kk, _, tt = head.partition(":")
            cur = {"kicker": kk.strip(), "title": (tt.strip() or kk.strip()), "paras": []}
        sections.append(cur); continue
    if s == "---":
        continue
    if s == "":
        continue
    # Tagline (kursive Zeile vor dem ersten Abschnitt)
    if cur is None:
        if s.startswith("*") and s.endswith("*") and not tagline:
            tagline = s.strip("*").strip()
        continue
    # Abschluss-Kursivzeile am Ende (letzter Abschnitt bereits Kapitel 10)
    cur["paras"].append(s)

# Letzte rein-kursive Zeile des letzten Abschnitts als Closing-Zitat herausziehen
if sections and sections[-1]["paras"]:
    lastp = sections[-1]["paras"][-1]
    if lastp.startswith("*") and lastp.endswith("*"):
        closing = lastp.strip("*").strip()
        sections[-1]["paras"].pop()

def esc(s):
    return _html.escape(s, quote=False)

def inline(s):
    s = esc(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"\*(.+?)\*", r"<i>\1</i>", s)
    return s

# ---------------- CSS (gleiche Sprache wie build-ebook.py) ----------------
CSS = r"""
/*__FONTS__*/
*{ margin:0; padding:0; box-sizing:border-box; }
html,body{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ font-family:'Inter',ui-sans-serif,system-ui,sans-serif; color:var(--ink); }
.serif{ font-family:'Fraunces',Georgia,serif; }
:root{
  --navy-950:#050914; --teal-300:#7e6410; --teal-400:#d9a93a; --teal-500:#7e6410;
  --leaf-400:#7e6410; --leaf-500:#d9a93a; --gold-300:#f2d489; --gold-400:#e8c15f; --gold-500:#d9a93a; --gold-700:#7e6410;
  --paper:#f6f4ee; --surface:#efece2; --ink:#16231f; --ink-soft:#48524e; --accent:#7e6410; --hair:#e6e1d4;
}
@page { size:A4; margin:20mm 22mm 18mm; }
@page cover { margin:0; }

/* ---------- COVER ---------- */
.cover{ page:cover; position:relative; width:210mm; height:297mm; overflow:hidden;
  color:var(--ink); break-after:page; background:
  radial-gradient(66% 48% at 50% 60%, rgba(233,193,95,.20), transparent 62%),
  radial-gradient(60% 42% at 18% 14%, rgba(242,212,137,.26), transparent 60%),
  radial-gradient(55% 40% at 88% 96%, rgba(217,169,58,.18), transparent 62%),
  linear-gradient(160deg,#f8f6f0 0%,#f1eee5 52%,#f6f4ee 100%); }
.cover .brain{ position:absolute; left:50%; top:calc(64% - 12mm); transform:translate(-50%,-50%);
  width:68%; max-width:none; mix-blend-mode:normal; opacity:.62; }
.cover .inner{ position:relative; height:100%; padding:19mm 22mm 15mm; display:flex; flex-direction:column; }
.brandrow{ display:flex; align-items:center; gap:11px; }
.brandrow img{ width:38px; height:38px; }
.brandrow span{ font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--teal-300); font-weight:600; line-height:1.3; }
.eyebrow{ margin-top:12mm; display:inline-flex; align-items:center; gap:9px;
  font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--gold-300); font-weight:600; }
.eyebrow::before{ content:""; width:26px; height:1.5px; background:var(--gold-400); display:inline-block; }
.title{ font-size:46px; line-height:1.08; font-weight:600; margin-top:13px; letter-spacing:-.4px;
 }
.title em{ font-style:italic; color:var(--gold-700); font-weight:500; }
.promise{ margin-top:16px; font-size:17px; line-height:1.5; color:var(--ink-soft); max-width:150mm; }
.promise b{ color:var(--ink); font-weight:600; }
.bullets{ margin-top:auto; display:flex; gap:20px; margin-bottom:8mm; }
.bullets div{ flex:1; font-size:12.5px; line-height:1.45; color:var(--ink-soft); padding-left:14px; position:relative; }
.bullets div::before{ content:""; position:absolute; left:0; top:5px; width:6px; height:6px; border-radius:50%; background:var(--gold-500); }
.coverfoot{ display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(22,35,31,.14); padding-top:6mm; }
.author{ display:flex; align-items:center; gap:11px; }
.author img{ width:40px; height:40px; border-radius:50%; object-fit:cover; border:1.5px solid rgba(168,132,42,.55); }
.author b{ display:block; font-size:13px; color:var(--ink); font-weight:600; }
.author span{ font-size:11px; color:var(--ink-soft); }
.domain{ font-size:12px; letter-spacing:.05em; color:var(--gold-700); }

/* ---------- KAPITEL (fließend, saubere Umbrüche) ---------- */
.chapter{ break-before:page; }
.chapter:first-of-type{ break-before:auto; }
.kicker{ font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.h2{ font-size:31px; line-height:1.12; font-weight:600; margin-top:8px; letter-spacing:-.3px; color:var(--ink); }
.rule{ width:54px; height:2px; background:var(--leaf-500); margin:14px 0 4px; }
.para{ font-size:12.6px; line-height:1.72; color:var(--ink-soft); margin-top:12px; text-align:justify; }
.para b{ color:var(--ink); font-weight:700; }
.para i{ color:var(--ink); font-style:italic; }
.chapter .para:first-of-type::first-letter{
  font-family:'Fraunces',serif; font-size:52px; line-height:.82; float:left;
  padding:4px 10px 0 0; color:var(--gold-700); font-weight:600; }

/* Vorwort ohne Initial */
.vorwort .para:first-of-type::first-letter{ all:unset; }

/* Leit-/Merksatz-Box */
.leit{ margin-top:18px; border-left:3px solid var(--teal-400); background:var(--surface);
  border-radius:0 14px 14px 0; padding:14px 20px; }
.leit p{ font-family:'Fraunces',serif; font-style:italic; font-size:17px; color:var(--ink); line-height:1.4; }

/* Abschluss-CTA */
.cta{ margin-top:22px; border-radius:18px; padding:22px 24px; color:var(--ink); position:relative; overflow:hidden;
  background:linear-gradient(135deg,#f3ead2,#efe6cf); border:1px solid rgba(168,132,42,.45); }
.cta .k{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--gold-700); font-weight:700; }
.cta h3{ font-family:'Fraunces',serif; font-size:22px; font-weight:600; margin-top:7px; }
.cta p{ font-size:12.6px; color:var(--ink-soft); margin-top:9px; line-height:1.6; }
.cta .btn{ display:inline-block; margin-top:14px; background:linear-gradient(135deg,var(--gold-300),var(--gold-500));
  color:#241a06; font-weight:700; font-size:13px; padding:10px 20px; border-radius:999px; }
"""
CSS = CSS.replace("/*__FONTS__*/", FONTS)

# ---------------- Cover ----------------
COVER = """
<div class="cover">
  <img class="brain" src="__BRAIN__">
  <div class="inner">
    <div class="brandrow"><img src="__LOGO__"><span>Werde Meister<br>deiner Gedanken</span></div>
    <div class="eyebrow">Kostenloses E-Book</div>
    <h1 class="title serif">Die Gedanken,<br><em>die nicht deine sind</em></h1>
    <p class="promise">__PROMISE__</p>
    <div class="bullets">
      <div>Erkenne die Mechanismen, die dein Denken lenken</div>
      <div>Von Propaganda &amp; Framing bis zu Algorithmen und Angst</div>
      <div>Mit einem einfachen Vierklang zurück zur Klarheit</div>
    </div>
    <div class="coverfoot">
      <div class="author"><img src="__HEIKO__"><div><b>Heiko Schwaninger</b><span>Begleiter für Bewusstseinsentwicklung</span></div></div>
      <div class="domain">werdemeisterdeinergedanken.de</div>
    </div>
  </div>
</div>
"""
promise = esc(subtitle) if subtitle else "Wie dein Denken von außen geformt wird – und wie du es zurückholst."
COVER = (COVER.replace("__BRAIN__", BRAIN).replace("__LOGO__", LOGO)
         .replace("__HEIKO__", HEIKO).replace("__PROMISE__", promise))

# ---------------- Kapitelseiten ----------------
def section_html(sec, is_vorwort):
    paras = "".join('<p class="para">%s</p>' % inline(p) for p in sec["paras"])
    cls = "chapter vorwort" if is_vorwort else "chapter"
    return """
<section class="%s">
  <div class="kicker">%s</div>
  <h2 class="h2 serif">%s</h2>
  <div class="rule"></div>
  %s
</section>
""" % (cls, esc(sec["kicker"]), esc(sec["title"]), paras)

parts = [COVER]
for idx, sec in enumerate(sections):
    parts.append(section_html(sec, is_vorwort=(idx == 0)))

# Abschluss-CTA
CTA = """
<div class="cta">
  <div class="k">Wenn du tiefer gehen möchtest</div>
  <h3>Der ganze Weg – im Mitgliederbereich</h3>
  <p>%s</p>
  <span class="btn">werdemeisterdeinergedanken.de</span>
</div>
""" % (esc(closing) if closing else
       "Zu jedem dieser Themen findest du eine ausführliche Vertiefung mit Übungen – und einen ganzen Weg in sieben Stufen.")
# an letzte Sektion anhängen
parts[-1] = parts[-1].replace("</section>", CTA + "</section>")

HTML = ("<!doctype html><html lang='de'><head><meta charset='utf-8'><style>"
        + CSS + "</style></head><body>" + "".join(parts) + "</body></html>")

out = os.path.join(BUILD, "ebook-gedanken.html")
with open(out, "w", encoding="utf-8") as f:
    f.write(HTML)
print("ebook-gedanken.html:", len(sections), "Abschnitte +", "Cover")
