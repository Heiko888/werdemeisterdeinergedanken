#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Erzeugt das vollständige Buch „Werde Meister deiner Gedanken" im Markendesign
# als book-wmdg.html -> via Chromium zu PDF (siehe generate.mjs).
#
# Quelle:  docs/ebook/werde-meister-deiner-gedanken.md  (reine LESERFASSUNG!)
#          Das interne Story-Rohmaterial und die redaktionellen Notizen liegen in
#          docs/ebook/intern/ und werden hier BEWUSST NICHT eingelesen.
#
# Aufbau des PDFs:
#   1. Titelseite (Cover)              5. Kapitel (fließend, saubere Umbrüche)
#   2. Hinweis des Autors              6. Schlusswort
#   3. Inhaltsverzeichnis (generiert)  7. Anhang (Reflexionsfragen, 7 Tage, Schlusssatz)
#   4. Teil-Trennseiten (Teil I–V)
#
# Markensprache (Farben, Schriften, Gehirn-Motiv) wie build-ebook.py / build-ebook-gedanken.py.
import base64, os, re, html as _html

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("REPO_ROOT", os.path.abspath(os.path.join(HERE, "..", "..")))
ASSETS = os.path.join(HERE, "assets")
BUILD = os.environ.get("BUILD_DIR", os.path.join(HERE, ".build"))
MD = os.environ.get(
    "BUCH_MD", os.path.join(ROOT, "docs", "ebook", "werde-meister-deiner-gedanken.md")
)
os.makedirs(BUILD, exist_ok=True)

def enc(p, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(p, "rb").read()).decode())

FONTS = open(os.path.join(ASSETS, "fonts.css")).read()
LOGO = enc(os.path.join(ROOT, "public/logo-brain-gold.png"), "image/png")
HEIKO = enc(os.path.join(ROOT, "public/heiko-portrait.webp"), "image/webp")
BRAIN = enc(os.path.join(ROOT, "public/logo-brain-gold.png"), "image/png")

def esc(s):
    return _html.escape(s, quote=False)

def inline(s):
    s = esc(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"\*(.+?)\*", r"<i>\1</i>", s)
    return s

# ---------------------------------------------------------------- Markdown-Parser
def parse_blocks(lines):
    blocks, i, n = [], 0, len(lines)
    while i < n:
        s = lines[i].strip()
        if s == "":
            i += 1; continue
        if s == "---":
            blocks.append(("hr",)); i += 1; continue
        if s.startswith("##### "):
            blocks.append(("h5", s[6:].strip())); i += 1; continue
        if s.startswith("#### "):
            blocks.append(("h4", s[5:].strip())); i += 1; continue
        if s.startswith("### "):
            blocks.append(("h3", s[4:].strip())); i += 1; continue
        if s.startswith("## "):
            blocks.append(("h2", s[3:].strip())); i += 1; continue
        if s.startswith("# "):
            blocks.append(("h1", s[2:].strip())); i += 1; continue
        if s.startswith(">"):
            buf = []
            while i < n and lines[i].strip().startswith(">"):
                buf.append(lines[i].strip()[1:].strip()); i += 1
            blocks.append(("quote", buf)); continue
        if re.match(r"^\d+\.\s+", s):
            items = []
            while i < n:
                m = re.match(r"^\d+\.\s+(.*)$", lines[i].strip())
                if not m: break
                items.append(m.group(1)); i += 1
            blocks.append(("ol", items)); continue
        if s.startswith("- "):
            items = []
            while i < n and lines[i].strip().startswith("- "):
                items.append(lines[i].strip()[2:].strip()); i += 1
            blocks.append(("ul", items)); continue
        if s.startswith("|"):  # Tabellen (nur im internen Material) überspringen
            while i < n and lines[i].strip().startswith("|"):
                i += 1
            continue
        blocks.append(("p", s)); i += 1
    return blocks

# ------------------------------------------------------ Struktur (Buch-Modell)
raw = open(MD, encoding="utf-8").read().splitlines()
blocks = parse_blocks(raw)

title = blocks[0][1] if blocks and blocks[0][0] == "h1" else "Werde Meister deiner Gedanken"
subtitle = author = disclaimer = ""
nodes = []

i = 1
seen_hinweis = False
while i < len(blocks) and blocks[i][0] != "h1":
    t = blocks[i][0]; val = blocks[i][1] if len(blocks[i]) > 1 else ""
    if t == "h2" and val.startswith("Hinweis"):
        seen_hinweis = True
    elif t == "h2" and not subtitle:
        subtitle = val
    elif t == "p":
        if seen_hinweis and not disclaimer:
            disclaimer = val
        elif val.strip().startswith("**") and not author:
            author = val.strip().strip("*").strip()
    i += 1

def new_node(kind, **kw):
    node = {"type": kind, "blocks": []}; node.update(kw); nodes.append(node); return node

cur = None
while i < len(blocks):
    b = blocks[i]; t = b[0]; val = b[1] if len(b) > 1 else ""
    if t == "h1":
        if val == "Einleitung":
            cur = new_node("intro", title="Einleitung", subtitle="")
        elif val.startswith("Teil"):
            cur = new_node("part", title=val)
        elif val == "Schlusswort":
            cur = new_node("closing", title="Schlusswort", subtitle="")
        elif val.startswith("Anhang"):
            cur = new_node("appendix", title=val)
        else:
            cur = new_node("section", title=val)
        i += 1; continue
    if t == "h2":
        m = re.match(r"^Kapitel\s+(\d+)$", val)
        if m:
            cur = new_node("chapter", num=int(m.group(1)), title="")
            i += 1
            if i < len(blocks) and blocks[i][0] == "h3":
                cur["title"] = blocks[i][1]; i += 1
            continue
        if cur and cur["type"] in ("intro", "closing") and not cur.get("subtitle"):
            cur["subtitle"] = val; i += 1; continue
        # sonst als Zwischenüberschrift in den Fließtext (v. a. Anhang-Subsections)
        cur["blocks"].append(("h2", val)); i += 1; continue
    if cur is not None:
        cur["blocks"].append(b)
    i += 1

def split_part(t):
    for sep in [" – ", " — ", " - "]:
        if sep in t:
            a, b = t.split(sep, 1); return a.strip(), b.strip()
    return t.strip(), ""

# ------------------------------------------------------------------ Renderer
def render_blocks(bl, dropcap=False):
    out = []
    for idx, b in enumerate(bl):
        t = b[0]
        if t == "p":
            cls = "para lead" if (dropcap and idx == 0) else "para"
            out.append('<p class="%s">%s</p>' % (cls, inline(b[1])))
        elif t == "h4":
            txt = b[1]; kind = "h4x"
            low = txt.lower()
            if low.startswith("übung"):
                kind = "h4x uebung"
            elif low.startswith("reflexionsfrage"):
                kind = "h4x reflex"
            out.append('<h4 class="%s">%s</h4>' % (kind, esc(txt)))
        elif t == "h5":
            out.append('<h5 class="h5x">%s</h5>' % esc(b[1]))
        elif t == "h3":
            out.append('<h4 class="h4x">%s</h4>' % esc(b[1]))
        elif t == "h2":
            out.append('<h3 class="subhead serif">%s</h3>' % esc(b[1]))
        elif t == "quote":
            body = "<br>".join(inline(x) for x in b[1] if x != "")
            out.append('<div class="leit"><p>%s</p></div>' % body)
        elif t == "ol":
            out.append('<ol class="list">%s</ol>' %
                       "".join("<li>%s</li>" % inline(x) for x in b[1]))
        elif t == "ul":
            out.append('<ul class="list">%s</ul>' %
                       "".join("<li>%s</li>" % inline(x) for x in b[1]))
        elif t == "hr":
            out.append('<div class="ornament">✦</div>')
    return "\n".join(out)

def opener_page(eyebrow, title, numeral=None):
    """Eigene, gestaltete Kapitel-/Abschnitts-Auftaktseite (volle Seite)."""
    if numeral is not None:
        return """
<section class="chap-opener">
  <span class="co-num serif">{num}</span>
  <div class="co-foot">
    <div class="co-eyebrow">{eyebrow}</div>
    <h2 class="co-title serif">{title}</h2>
    <div class="co-rule"></div>
  </div>
</section>
""".format(num=esc(numeral), eyebrow=esc(eyebrow), title=esc(title))
    return """
<section class="chap-opener no-num">
  <div class="co-center">
    <img class="co-logo" src="{logo}">
    <div class="co-eyebrow">{eyebrow}</div>
    <h2 class="co-title serif">{title}</h2>
    <div class="co-rule"></div>
  </div>
</section>
""".format(logo=LOGO, eyebrow=esc(eyebrow), title=esc(title))

parts_html = []

# -- Titelseite ------------------------------------------------------------
parts_html.append("""
<section class="cover">
  <img class="brain" src="{brain}">
  <div class="inner">
    <div class="brandrow"><img src="{logo}"><span class="wm"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></span></div>
    <div class="eyebrow">Das Buch</div>
    <h1 class="title serif">{title}</h1>
    <p class="promise">{subtitle}</p>
    <div class="coverfoot">
      <div class="author"><img src="{heiko}"><div><b>{author}</b><span>Begleiter für Bewusstseinsentwicklung</span></div></div>
      <div class="domain">werdemeisterdeinergedanken.de</div>
    </div>
  </div>
</section>
""".format(brain=BRAIN, logo=LOGO, heiko=HEIKO,
           title=esc(title), subtitle=esc(subtitle),
           author=esc(author or "Heiko Schwaninger")))

# -- Hinweis des Autors ----------------------------------------------------
if disclaimer:
    parts_html.append("""
<section class="note">
  <div class="note-inner">
    <div class="kicker">Hinweis des Autors</div>
    <div class="note-rule"></div>
    <p class="note-text">{txt}</p>
  </div>
</section>
""".format(txt=inline(disclaimer)))

# -- Inhaltsverzeichnis (generiert) ---------------------------------------
toc = ['<section class="toc"><div class="kicker">Inhalt</div><h2 class="h2 serif">Inhaltsverzeichnis</h2><div class="rule"></div><div class="toc-body">']
for node in nodes:
    if node["type"] == "part":
        eb, pt = split_part(node["title"])
        toc.append('<div class="toc-part"><span class="toc-part-eb">%s</span><span class="toc-part-title serif">%s</span></div>'
                   % (esc(eb), esc(pt)))
    elif node["type"] == "chapter":
        toc.append('<div class="toc-row"><span class="toc-num">%s</span><span class="toc-title">%s</span></div>'
                   % (node["num"], esc(node["title"])))
    elif node["type"] == "intro":
        toc.append('<div class="toc-row toc-plain"><span class="toc-title">Einleitung</span></div>')
    elif node["type"] == "closing":
        toc.append('<div class="toc-row toc-plain"><span class="toc-title">Schlusswort</span></div>')
    elif node["type"] == "appendix":
        toc.append('<div class="toc-row toc-plain"><span class="toc-title">%s</span></div>' % esc(node["title"]))
toc.append("</div></section>")
parts_html.append("".join(toc))

# -- Inhaltliche Knoten ----------------------------------------------------
for node in nodes:
    tp = node["type"]
    if tp == "part":
        eb, pt = split_part(node["title"])
        roman = re.sub(r"(?i)^teil\s*", "", eb).strip() or eb
        intro = render_blocks(node["blocks"], dropcap=False)
        parts_html.append("""
<section class="part">
  <span class="part-num serif">{roman}</span>
  <img class="part-brain" src="{brain}">
  <div class="part-inner">
    <div class="part-eyebrow">{eb}</div>
    <h2 class="part-title serif">{pt}</h2>
    <div class="part-rule"></div>
    <div class="part-intro">{intro}</div>
  </div>
</section>
""".format(roman=esc(roman), brain=BRAIN, eb=esc(eb), pt=esc(pt), intro=intro))
    elif tp == "chapter":
        body = render_blocks(node["blocks"], dropcap=True)
        parts_html.append(opener_page("Kapitel %d" % node["num"],
                                      node["title"], numeral="%02d" % node["num"]))
        parts_html.append('<section class="chapter"><div class="body">%s</div></section>' % body)
    elif tp in ("intro", "closing"):
        body = render_blocks(node["blocks"], dropcap=True)
        parts_html.append(opener_page(node["title"], node.get("subtitle") or node["title"]))
        parts_html.append('<section class="chapter"><div class="body">%s</div></section>' % body)
    elif tp == "appendix":
        body = render_blocks(node["blocks"], dropcap=False)
        parts_html.append(opener_page("Anhang", "Werkzeuge zum Weiterarbeiten"))
        parts_html.append('<section class="chapter appendix"><div class="body">%s</div></section>' % body)
    else:
        body = render_blocks(node["blocks"], dropcap=True)
        parts_html.append('<section class="chapter"><h2 class="h2 serif">%s</h2><div class="rule"></div><div class="body">%s</div></section>'
                          % (esc(node["title"]), body))

# ------------------------------------------------------------------------ CSS
CSS = r"""
/*__FONTS__*/
*{ margin:0; padding:0; box-sizing:border-box; }
html,body{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
html{ background:var(--paper); }
body{ font-family:'Inter',ui-sans-serif,system-ui,sans-serif; color:var(--ink); background:var(--paper); }
/* Randlose Creme-Ebene: position:fixed wird von Chromium auf JEDER gedruckten
   Seite wiederholt und füllt auch die Seitenränder – so ist das Buch komplett
   cremefarben (die opaken Cover-/Teil-Hintergründe legen sich darüber). */
body::before{ content:""; position:fixed; inset:0; background:var(--paper); z-index:-1; }
.serif{ font-family:'Fraunces',Georgia,serif; }
:root{
  --paper:#f6f4ee; --surface:#efece2; --ink:#16231f; --ink-soft:#48524e;
  --accent:#7e6410; --hair:#e6e1d4;
  --leaf-500:#d9a93a; --teal-400:#d9a93a;
  --gold-300:#f2d489; --gold-400:#e8c15f; --gold-500:#d9a93a; --gold-700:#7e6410;
  --navy:#0b1636;
}
@page { size:A4; margin:0; }
/* Textabstand pro Seite über Padding der Inhalts-Sektionen (Rand bleibt cremefarben) */
.note, .toc, .chapter{ padding:20mm 24mm; -webkit-box-decoration-break:clone; box-decoration-break:clone; }
@page cover    { margin:0; }
@page part     { margin:0; }
@page chapopen { margin:0; }

/* ---------- COVER ---------- */
.cover{ page:cover; position:relative; width:210mm; height:297mm; overflow:hidden;
  color:var(--ink); break-after:page; background:
  radial-gradient(66% 48% at 50% 60%, rgba(233,193,95,.20), transparent 62%),
  radial-gradient(60% 42% at 18% 14%, rgba(242,212,137,.26), transparent 60%),
  radial-gradient(55% 40% at 88% 96%, rgba(217,169,58,.18), transparent 62%),
  linear-gradient(160deg,#f8f6f0 0%,#f1eee5 52%,#f6f4ee 100%); }
.cover .brain{ position:absolute; left:50%; top:64%; transform:translate(-50%,-50%);
  width:62%; max-width:none; opacity:.55; }
.cover .inner{ position:relative; height:100%; padding:22mm 24mm 18mm; display:flex; flex-direction:column; }
.brandrow{ display:flex; align-items:center; gap:11px; }
.brandrow img{ width:40px; height:40px; }
.brandrow .wm{ display:flex; flex-direction:column; gap:3px; line-height:1; }
.brandrow .wm1{ font-family:'Fraunces',serif; font-size:16px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink); }
.brandrow .wm1 em{ font-style:normal; background:linear-gradient(100deg,#d9a93a,#7e6410); -webkit-background-clip:text; background-clip:text; color:transparent; }
.brandrow .wm2{ display:flex; align-items:center; gap:6px; font-family:'Fraunces',serif; font-size:8px; letter-spacing:.24em; text-transform:uppercase; color:var(--ink-soft); }
.brandrow .wm2 i{ display:block; height:1px; width:11px; background:var(--gold-500); }
.cover .eyebrow{ margin-top:16mm; display:inline-flex; align-items:center; gap:9px;
  font-size:12px; letter-spacing:.24em; text-transform:uppercase; color:var(--gold-700); font-weight:700; }
.cover .eyebrow::before{ content:""; width:26px; height:1.5px; background:var(--gold-500); display:inline-block; }
.cover .title{ font-size:58px; line-height:1.04; font-weight:600; margin-top:15px; letter-spacing:-.6px; max-width:150mm; }
.cover .promise{ margin-top:18px; font-size:19px; line-height:1.5; color:var(--ink-soft); max-width:150mm; font-family:'Fraunces',serif; font-style:italic; }
.cover .coverfoot{ margin-top:auto; display:flex; align-items:center; justify-content:space-between; border-top:1px solid rgba(22,35,31,.14); padding-top:6mm; }
.cover .author{ display:flex; align-items:center; gap:11px; }
.cover .author img{ width:44px; height:44px; border-radius:50%; object-fit:cover; border:1.5px solid rgba(168,132,42,.55); }
.cover .author b{ display:block; font-size:13px; color:var(--ink); font-weight:600; }
.cover .author span{ font-size:11px; color:var(--ink-soft); }
.cover .domain{ font-size:12px; letter-spacing:.05em; color:var(--gold-700); }

/* ---------- HINWEIS DES AUTORS ---------- */
.note{ break-before:page; min-height:80vh; display:flex; align-items:center; }
.note-inner{ max-width:150mm; }
.note .kicker{ font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.note-rule{ width:54px; height:2px; background:var(--leaf-500); margin:12px 0 16px; }
.note-text{ font-family:'Fraunces',serif; font-size:16px; line-height:1.7; color:var(--ink-soft); }

/* ---------- INHALTSVERZEICHNIS ---------- */
.toc{ break-before:page; }
.toc-body{ margin-top:16px; }
.toc-part{ display:flex; align-items:baseline; gap:12px; margin:20px 0 8px; padding-bottom:7px; border-bottom:1px solid var(--hair); }
.toc-part-eb{ font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; color:var(--gold-700); font-weight:700; white-space:nowrap; }
.toc-part-title{ font-size:16px; color:var(--ink); font-weight:600; }
.toc-row{ display:flex; align-items:baseline; gap:14px; padding:5px 0; }
.toc-num{ font-family:'Fraunces',serif; font-size:14px; color:var(--gold-700); width:22px; text-align:right; flex:none; }
.toc-title{ font-size:13px; color:var(--ink-soft); }
.toc-plain .toc-title{ color:var(--ink); font-weight:600; }
.toc-plain{ margin-top:8px; }

/* ---------- TEIL-TRENNSEITEN ---------- */
.part{ page:part; position:relative; width:210mm; height:297mm; overflow:hidden; break-before:page;
  color:var(--ink); background:
  radial-gradient(60% 44% at 50% 46%, rgba(233,193,95,.18), transparent 62%),
  linear-gradient(160deg,#0b1636 0%,#0b1636 100%); }
.part{ background:linear-gradient(160deg,#101c40 0%,#0a1230 60%,#0b1636 100%); color:#eef1f8; }
.part-brain{ position:absolute; left:50%; top:46%; transform:translate(-50%,-50%); width:60%; opacity:.16; }
.part-num{ position:absolute; right:20mm; top:16mm; font-size:150px; line-height:.8; font-weight:600;
  color:transparent; -webkit-text-stroke:2px rgba(233,193,95,.30); letter-spacing:2px; }
.part-inner{ position:relative; height:100%; padding:40mm 26mm; display:flex; flex-direction:column; justify-content:center; }
.part-eyebrow{ font-size:13px; letter-spacing:.3em; text-transform:uppercase; color:var(--gold-400); font-weight:700; }
.part-title{ font-size:44px; line-height:1.1; font-weight:600; margin-top:14px; letter-spacing:-.4px; max-width:150mm; color:#fff; }
.part-rule{ width:60px; height:2px; background:var(--gold-500); margin:20px 0; }
.part-intro{ max-width:150mm; }
.part-intro .para{ color:#c9d0e2; font-size:13px; line-height:1.75; margin-top:12px; text-align:left; }
.part-intro .para.lead::first-letter{ all:unset; }
.part-intro .leit{ background:rgba(255,255,255,.06); border-left-color:var(--gold-400); }
.part-intro .leit p{ color:#fff; }
.part-intro .list li{ color:#c9d0e2; }

/* ---------- KAPITEL-AUFTAKTSEITE (eigene, gestaltete Seite) ---------- */
.chap-opener{ page:chapopen; position:relative; width:210mm; height:297mm; overflow:hidden;
  break-before:page; break-after:page;
  background:radial-gradient(120% 68% at 50% 2%, rgba(233,193,95,.13), transparent 58%), var(--paper); }
/* feiner Gold-Rahmen als „Plate" */
.chap-opener::before{ content:""; position:absolute; inset:13mm; border:1px solid rgba(126,100,16,.32); pointer-events:none; }
/* Riesenziffer */
.co-num{ position:absolute; top:30mm; left:0; right:0; text-align:center;
  font-size:300px; line-height:.8; font-weight:600; letter-spacing:-4px;
  color:transparent; -webkit-text-stroke:2.5px rgba(126,100,16,.32);
  background:linear-gradient(180deg, rgba(233,193,95,.26), rgba(126,100,16,0)); -webkit-background-clip:text; background-clip:text; }
.co-foot{ position:absolute; left:26mm; right:26mm; bottom:48mm; }
.co-eyebrow{ font-size:13px; letter-spacing:.3em; text-transform:uppercase; color:var(--gold-700); font-weight:700; }
.co-title{ font-size:45px; line-height:1.06; font-weight:600; letter-spacing:-.5px; color:var(--ink); margin-top:12px; max-width:150mm; }
.co-rule{ width:72px; height:3px; border-radius:2px; background:linear-gradient(90deg,var(--gold-500),var(--gold-700)); margin-top:22px; }
/* Auftaktseite ohne Nummer (Einleitung/Schlusswort/Anhang): zentriert mit Logo */
.chap-opener.no-num{ display:flex; align-items:center; justify-content:center; text-align:center; }
.co-center{ position:relative; max-width:150mm; padding:0 18mm; }
.co-logo{ width:58px; height:58px; margin:0 auto 20px; display:block; }
.chap-opener.no-num .co-rule{ margin:24px auto 0; }

/* ---------- KAPITEL (Fließtext, ab Folgeseite) ---------- */
.chapter{ break-before:page; }
.rule{ width:54px; height:2px; background:var(--leaf-500); margin:15px 0 4px; }
.body{ margin-top:0; }
.para{ font-size:12.8px; line-height:1.75; color:var(--ink-soft); margin-top:12px; text-align:justify; hyphens:auto; }
.para b{ color:var(--ink); font-weight:700; }
.para i{ color:var(--ink); font-style:italic; }
.para.lead::first-letter{
  font-family:'Fraunces',serif; font-size:54px; line-height:.82; float:left;
  padding:6px 12px 0 0; color:var(--gold-700); font-weight:600; }

.h4x{ font-family:'Fraunces',serif; font-size:17px; font-weight:600; color:var(--ink); margin-top:22px; }
.h4x.uebung, .h4x.reflex{ display:inline-block; margin-top:24px; padding:5px 14px; border-radius:999px;
  font-size:12.5px; letter-spacing:.02em; color:#241a06;
  background:linear-gradient(135deg,var(--gold-300),var(--gold-400)); }
.subhead{ font-size:22px; font-weight:600; color:var(--ink); margin-top:26px; }
.h5x{ font-size:12.5px; font-weight:700; color:var(--ink); margin-top:15px; padding-left:13px; position:relative; }
.h5x::before{ content:""; position:absolute; left:0; top:3px; width:5px; height:14px; border-radius:2px; background:var(--gold-500); }

.leit{ margin-top:18px; border-left:3px solid var(--teal-400); background:var(--surface);
  border-radius:0 14px 14px 0; padding:14px 20px; break-inside:avoid; }
.leit p{ font-family:'Fraunces',serif; font-style:italic; font-size:16px; color:var(--ink); line-height:1.5; }

.list{ margin:12px 0 0 0; padding-left:0; list-style:none; }
.list li{ position:relative; padding-left:22px; margin-top:8px; font-size:12.8px; line-height:1.7; color:var(--ink-soft); }
ol.list{ counter-reset:li; }
ol.list li::before{ counter-increment:li; content:counter(li); position:absolute; left:0; top:0;
  font-family:'Fraunces',serif; font-size:12px; color:var(--gold-700); font-weight:600; }
ul.list li::before{ content:""; position:absolute; left:2px; top:9px; width:6px; height:6px; border-radius:50%; background:var(--gold-500); }

.ornament{ text-align:center; color:var(--gold-500); font-size:13px; letter-spacing:.4em; margin:20px 0; }

/* Anhang */
.appendix .subhead:first-child{ margin-top:0; }
.appendix .subhead{ break-before:page; }
.appendix .subhead:first-of-type{ break-before:auto; }
"""
CSS = CSS.replace("/*__FONTS__*/", FONTS)

HTML = ("<!doctype html><html lang='de'><head><meta charset='utf-8'><style>"
        + CSS + "</style></head><body>" + "".join(parts_html) + "</body></html>")

out = os.path.join(BUILD, "book-wmdg.html")
with open(out, "w", encoding="utf-8") as f:
    f.write(HTML)

n_parts = sum(1 for x in nodes if x["type"] == "part")
n_ch = sum(1 for x in nodes if x["type"] == "chapter")
print("book-wmdg.html:", n_parts, "Teile,", n_ch, "Kapitel + Titel/Hinweis/Inhalt/Schluss/Anhang")
