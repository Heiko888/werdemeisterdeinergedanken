#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Erzeugt die "Reel-Skripte · Die 7 Stufen" im Arbeitsheft-Design (heller
# Innenteil, Navy-Cover, Fraunces/Inter eingebettet) als eigenstaendige HTML.
# Quelle: tools/pdf/assets/reel-source.html  (der <main>-Block der 21 Reels).
# Ausgabe: docs/skripte/reels/reel-skripte-7-stufen.html  (Web, Google Fonts)
#          <build>/reel-skripte-7-stufen.print.html        (Fonts eingebettet)
# PDF: die Print-HTML mit Chromium rendern, z. B.
#   chromium --headless --no-pdf-header-footer --print-to-pdf=out.pdf \
#     --virtual-time-budget=10000 file://<build>/reel-skripte-7-stufen.print.html
import re, base64, pathlib, html as _html

HERE = pathlib.Path(__file__).resolve().parent          # tools/pdf
ROOT = HERE.parent.parent                               # Repo-Wurzel
SRC = HERE / "assets" / "reel-source.html"
OUT = ROOT / "docs" / "skripte" / "reels"
BUILD = pathlib.Path(__import__("os").environ.get("BUILD_DIR", HERE / ".build"))
BUILD.mkdir(parents=True, exist_ok=True)

def enc(p, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(pathlib.Path(p).read_bytes()).decode())

FONTS_CSS = (ROOT / "tools/pdf/assets/fonts.css").read_text(encoding="utf-8")
BRAIN = enc(ROOT / "tools/workshop/assets/brain.png", "image/png")

raw = SRC.read_text(encoding="utf-8")
body = raw[raw.index('<main>'):raw.index('</main>')]

WPM = 145
def esc(s): return _html.escape(s.strip(), quote=False)

# ---------- Parsing der Stufen & Reels ----------
def clean(s):
    return re.sub(r'\s+', ' ', s).strip()

stages = []
for sm in re.finditer(r'<section class="stage"[^>]*>(.*?)</section>', body, re.S):
    blk = sm.group(1)
    num = clean(re.search(r'<div class="stage-num">(.*?)</div>', blk, re.S).group(1))
    title = clean(re.search(r'<h2>(.*?)</h2>', blk, re.S).group(1))
    sub = clean(re.search(r'<p class="stage-sub">(.*?)</p>', blk, re.S).group(1))
    reels = []
    for rm in re.finditer(r'<article class="reel">(.*?)</article>', blk, re.S):
        r = rm.group(1)
        cm = re.search(r'<span class="chip (v-[abc])"><b>(.)</b>(.*?)</span>', r, re.S)
        letter = cm.group(2)
        chiptxt = clean(cm.group(3))            # z.B. "Symptom · Läuft das automatisch?"
        parts = [p.strip() for p in chiptxt.split('·', 1)]
        rtype = parts[0]
        rtopic = parts[1] if len(parts) > 1 else ""
        hook = clean(re.search(r'<p class="hook">(.*?)</p>', r, re.S).group(1)).strip('„“"')
        scriptblk = re.search(r'<div class="script">(.*?)</div>', r, re.S).group(1)
        lines = [clean(p) for p in re.findall(r'<p>(.*?)</p>', scriptblk, re.S)]
        onscreen = clean(re.search(r'<dt>On-Screen</dt><dd>(.*?)</dd>', r, re.S).group(1))
        cta = clean(re.search(r'<dt>CTA</dt><dd>(.*?)</dd>', r, re.S).group(1))
        capm = re.search(r'<summary>Caption</summary>\s*<p>(.*?)</p>', r, re.S)
        cap_text, cap_tags = "", ""
        if capm:
            capfull = capm.group(1)
            tm = re.search(r'(.*?)<br>\s*<span class="tags">(.*?)</span>', capfull, re.S)
            if tm:
                cap_text = clean(tm.group(1)); cap_tags = clean(tm.group(2))
            else:
                cap_text = clean(capfull)
        words = len((hook + " " + " ".join(lines)).split())
        secs = round(words / WPM * 60)
        reels.append(dict(letter=letter, rtype=rtype, rtopic=rtopic, hook=hook,
                          lines=lines, onscreen=onscreen, cta=cta,
                          cap_text=cap_text, cap_tags=cap_tags, words=words, secs=secs))
    stages.append(dict(num=num, title=title, sub=sub, reels=reels))

assert len(stages) == 7, len(stages)

# ---------- CSS (Referenz-Arbeitsheft-Stil: hell, Navy-Cover) ----------
CSS = r"""
/*__FONTS__*/
*{ margin:0; padding:0; box-sizing:border-box; }
html{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
:root{
  --ink:#16231f; --ink-soft:#48524e; --accent:#4f9e1c;
  --teal-300:#5fd6d2; --teal-400:#34c4c4; --teal-500:#21b2bd;
  --leaf-400:#a3d64f; --leaf-500:#8cc63f; --leaf-600:#74ab2f; --gold-400:#e8c15f;
  --surface:#f6f4ee; --hair:#e4ded0; --navy-900:#08102a;
}
body{ font-family:'Inter',ui-sans-serif,system-ui,sans-serif; color:var(--ink); background:var(--surface); }
.serif{ font-family:'Fraunces',Georgia,serif; }

/* ---------- Screen-Layout ---------- */
@media screen{
  .doc{ max-width:52rem; margin:0 auto; padding:3.6rem clamp(1.1rem,4vw,2rem) 5rem; }
  main.doc > section + section{ margin-top:3.8rem; padding-top:3.4rem; border-top:1px solid var(--hair); }
}

/* ============================================================
   DECKBLATT (Navy, zentriert, Gehirn mittig)
   ============================================================ */
.cover{ position:relative; overflow:hidden; color:#eaf0ff; width:100%; min-height:100vh;
  display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;
  padding:clamp(2.5rem,7vw,4rem) clamp(1.2rem,5vw,3rem);
  background:
    radial-gradient(120% 80% at 82% 6%, rgba(52,196,196,.20), transparent 55%),
    radial-gradient(90% 60% at 12% 98%, rgba(140,198,63,.14), transparent 55%),
    linear-gradient(158deg,#0a1330,#0a1024); }
.cover .brandrow{ position:absolute; top:6%; left:0; right:0; display:flex; justify-content:center; align-items:center; gap:10px; }
.cover .brandrow img{ width:28px; height:28px; }
.cover .brandrow span{ font-size:10px; letter-spacing:.24em; text-transform:uppercase; color:var(--teal-300); font-weight:600; }
.cover .eyebrow{ font-size:13px; letter-spacing:.34em; text-transform:uppercase; color:var(--leaf-500); font-weight:700; margin-bottom:7mm; }
.cover .brain{ width:min(44mm,42vw); height:auto; filter:drop-shadow(0 8px 30px rgba(52,196,196,.35)); }
.cover h1{ font-family:'Fraunces',serif; font-weight:600; font-size:clamp(2.1rem,6.5vw,40px); line-height:1.16;
  margin-top:8mm; letter-spacing:-.3px; max-width:26ch; text-shadow:0 2px 30px rgba(3,8,20,.7); }
.cover h1 .ac{ color:var(--teal-400); font-style:italic; font-weight:400; }
.cover .sub{ margin-top:6mm; font-size:15px; line-height:1.55; color:#c6cfe6; max-width:52ch; text-shadow:0 1px 16px rgba(3,8,20,.85); }
.cover .foot{ position:absolute; left:0; right:0; bottom:6%; font-size:12px; color:var(--teal-300); letter-spacing:.04em; }

/* ============================================================
   INHALTSSEITEN (hell)
   ============================================================ */
.phead{ display:flex; gap:15px; align-items:flex-start; margin-bottom:20px; break-after:avoid; }
.phead .disc{ flex:none; width:38px; height:38px; border-radius:50%;
  background:linear-gradient(150deg,#8cc63f,#21b2bd); color:var(--navy-900);
  font-family:'Fraunces',serif; font-weight:600; font-size:18px; display:grid; place-items:center;
  box-shadow:0 8px 18px -8px rgba(33,178,189,.6); }
.phead .kicker{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.phead h1{ font-family:'Fraunces',serif; font-weight:600; font-size:30px; color:var(--navy-900); line-height:1.12; margin-top:2px; letter-spacing:-.2px; }
.phead .subt{ font-family:'Fraunces',serif; font-style:italic; font-size:15px; color:var(--teal-500); margin-top:3px; }

.klabel{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); font-weight:700; margin:20px 0 9px; break-after:avoid; }
.klabel.teal{ color:var(--teal-500); }

.callout{ break-inside:avoid; margin:6px 0 15px; border-radius:16px; padding:16px 22px; color:#eaf0ff;
  background:
    radial-gradient(70% 130% at 88% 0%, rgba(52,196,196,.26), transparent 60%),
    linear-gradient(140deg,#08102a,#12244d); }
.callout .k{ font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--leaf-500); }
.callout .q{ font-family:'Fraunces',serif; font-style:italic; font-size:15.5px; line-height:1.5; margin-top:8px; color:#eef2ff; }

/* ---------- Reel-Block ---------- */
.reelblock{ break-inside:avoid; margin:24px 0; padding-top:20px; border-top:1px solid var(--hair); }
.reelblock:first-of-type{ border-top:none; padding-top:4px; }
.rhead{ display:flex; align-items:center; gap:13px; margin-bottom:13px; }
.rdisc{ flex:none; width:30px; height:30px; border-radius:50%; background:linear-gradient(150deg,#8cc63f,#21b2bd);
  color:var(--navy-900); font-family:'Fraunces',serif; font-weight:700; font-size:14px; display:grid; place-items:center;
  box-shadow:0 6px 14px -8px rgba(33,178,189,.6); }
.rmeta{ flex:1 1 auto; min-width:0; }
.rtype{ font-family:'Fraunces',serif; font-weight:600; font-size:16px; color:var(--navy-900); line-height:1.1; }
.rtopic{ font-size:12px; color:var(--teal-500); font-style:italic; margin-top:1px; }
.chip{ flex:none; font-size:10px; font-weight:700; letter-spacing:.03em; color:var(--accent);
  background:rgba(79,158,28,.12); border-radius:999px; padding:4px 11px; white-space:nowrap; }

.script{ margin:2px 0 4px; }
.script p{ font-size:13.5px; line-height:1.58; color:#2c3a35; margin:5px 0; }

.metagrid{ display:grid; grid-template-columns:max-content 1fr; gap:7px 16px; margin:16px 0 4px; }
.metagrid .ml{ font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--teal-500); font-weight:700; padding-top:2px; }
.metagrid .mv{ font-size:12.5px; line-height:1.55; color:#2c3a35; }

.cap{ margin-top:13px; font-size:11.5px; line-height:1.58; color:var(--ink-soft); }
.cap .cl{ font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--teal-500); font-weight:700; margin-right:6px; }
.cap .tags{ color:var(--accent); word-spacing:.12em; }

/* Ausfülllinien wie im Arbeitsheft ("Meine Notizen") */
.notes{ margin-top:16px; break-inside:avoid; }
.notes .nl{ font-size:10px; letter-spacing:.04em; color:var(--ink-soft); font-style:italic; margin-bottom:10px; }
.line{ border-bottom:1.4px solid #d9d3c4; height:31px; }
.line + .line{ margin-top:0; }

/* ---------- TOC ---------- */
.toc h2{ font-family:'Fraunces',serif; font-weight:600; font-size:28px; color:var(--navy-900); margin-bottom:8px; }
.toc .row{ display:flex; align-items:center; gap:15px; padding:12px 0; border-bottom:1px solid var(--hair); }
.toc .disc{ flex:none; width:36px; height:36px; border-radius:50%; background:linear-gradient(150deg,#8cc63f,#21b2bd);
  color:var(--navy-900); font-family:'Fraunces',serif; font-weight:600; font-size:16px; display:grid; place-items:center; }
.toc b{ font-size:15px; color:var(--navy-900); } .toc span{ display:block; font-size:12.5px; color:#2c3a35; }

.docfoot{ margin-top:22px; padding-top:9px; border-top:1px solid var(--hair);
  display:flex; justify-content:space-between; align-items:center; font-size:10px; color:#9a9384; break-inside:avoid; }
.docfoot .dom{ color:var(--accent); font-weight:600; }

/* ============================================================
   Druck / PDF
   ============================================================ */
@media print{
  @page{ size:A4; margin:16mm 17mm; }
  @page:first{ margin:0; }
  body{ background:#ffffff; }
  .doc{ max-width:none; margin:0; padding:0; }
  .cover{ width:210mm; height:297mm; min-height:0; page-break-after:always; }
  .cover .brandrow{ top:20mm; } .cover .foot{ bottom:18mm; }
  .content{ break-before:page; }
  .stagebreak{ break-before:page; }
  .reelblock{ break-inside:avoid; }
  .callout,.toc .row{ break-inside:avoid; }
}
""".replace("/*__FONTS__*/", "__FONTSLOT__")

# ---------- HTML-Bausteine ----------
def cover_html():
    return (
        '<section class="cover">'
        '<div class="eyebrow">Die Reel-Skripte</div>'
        f'<img class="brain" src="{BRAIN}" alt="Neon-Gehirn">'
        '<h1 class="serif">Die 7 <span class="ac">Stufen</span></h1>'
        '<div class="sub">21 Kurzvideo-Skripte über den Weg vom Autopilot zur Meisterschaft. '
        'Ich-Erzähler, jeder Zeilenumbruch ein Atemzug — kurz absetzen, dann weiter.</div>'
        '</section>'
    )

def toc_html():
    rows = ""
    for s in stages:
        rows += (f'<div class="row"><div class="disc">{int(s["num"])}</div>'
                 f'<div><b>{esc(s["title"])}</b><span>{esc(s["sub"])}</span></div></div>')
    return f'<section class="content"><div class="toc"><h2 class="serif">Inhalt</h2>{rows}</div></section>'

def reel_html(r):
    scr = "".join(f'<p>{esc(l)}</p>' for l in r["lines"])
    meta = (f'<div class="metagrid"><div class="ml">On-Screen</div><div class="mv">{esc(r["onscreen"])}</div>'
            f'<div class="ml">CTA</div><div class="mv">{esc(r["cta"])}</div></div>')
    cap = ""
    if r["cap_text"]:
        tags = f' <span class="tags">{esc(r["cap_tags"])}</span>' if r["cap_tags"] else ""
        cap = f'<div class="cap"><span class="cl">Caption</span>{esc(r["cap_text"])}{tags}</div>'
    notes = ('<div class="notes"><div class="nl">Meine Notizen · dein eigener Moment, dein Wortlaut</div>'
             '<div class="line"></div><div class="line"></div><div class="line"></div></div>')
    return (
        '<div class="reelblock">'
        f'<div class="rhead"><div class="rdisc">{r["letter"]}</div>'
        f'<div class="rmeta"><div class="rtype serif">{esc(r["rtype"])}</div>'
        f'<div class="rtopic">{esc(r["rtopic"])}</div></div>'
        f'<span class="chip">{r["words"]} Wörter · ca. {r["secs"]}s</span></div>'
        f'<div class="callout"><div class="k">Hook</div><div class="q">„{esc(r["hook"])}“</div></div>'
        f'<div class="script">{scr}</div>'
        f'{meta}{cap}{notes}</div>'
    )

def stage_html(s):
    reels = "".join(reel_html(r) for r in s["reels"])
    foot = ('<div class="docfoot"><span>Werde Meister deiner Gedanken · Stufe %s – %s</span>'
            '<span class="dom">werdemeisterdeinergedanken.de</span></div>') % (esc(s["num"]), esc(s["title"]))
    return (
        '<section class="stagebreak">'
        f'<div class="phead"><div class="disc">{int(s["num"])}</div><div>'
        f'<div class="kicker">Stufe {esc(s["num"])}</div>'
        f'<h1 class="serif">{esc(s["title"])}</h1>'
        f'<div class="subt">{esc(s["sub"])}</div></div></div>'
        f'{reels}{foot}</section>'
    )

DOC_INNER = cover_html() + '<main class="doc">' + toc_html() + "".join(stage_html(s) for s in stages) + '</main>'

def page(fonts_block):
    css = CSS.replace("__FONTSLOT__", fonts_block)
    return ("<!doctype html><html lang='de'><head><meta charset='utf-8'>"
            "<meta name='viewport' content='width=device-width,initial-scale=1'>"
            "<title>Reel-Skripte 7 Stufen</title>"
            "<style>" + css + "</style></head><body>" + DOC_INNER + "</body></html>")

WEB_FONTS = ("</style><link rel='preconnect' href='https://fonts.googleapis.com'>"
             "<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>"
             "<link rel='stylesheet' href='https://fonts.googleapis.com/css2?"
             "family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&"
             "family=Inter:wght@400;500;600;700&display=swap'><style>")

(OUT / "reel-skripte-7-stufen.html").write_text(page(WEB_FONTS), encoding="utf-8")
(BUILD / "reel-skripte-7-stufen.print.html").write_text(page(FONTS_CSS), encoding="utf-8")

print("stages:", len(stages), "| reels:", sum(len(s["reels"]) for s in stages))
print("web ->", OUT / "reel-skripte-7-stufen.html")
print("print->", BUILD / "reel-skripte-7-stufen.print.html")
