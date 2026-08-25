#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Erzeugt das Brandbook als gestaltetes PDF-HTML im Mitglieder-PDF-Design
# (gleiche Fonts, Cover-Stil, Nummern-Disc, Navy-Callouts, Fußzeile).
#   Seite 1  = Deckblatt (Starfield-Verlauf + Gehirn, zentriert)
#   Seite 2  = Inhaltsverzeichnis
#   Seite 3+ = ein Kapitel je Abschnitt, im hellen Referenz-Stil
#
# Aufruf (siehe build-brandbook.mjs):  python3 tools/pdf/build-brandbook.py
import base64, os, html as _html

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("REPO_ROOT", os.path.abspath(os.path.join(HERE, "..", "..")))
ASSETS = os.path.join(HERE, "assets")
WS_ASSETS = os.path.join(ROOT, "tools", "workshop", "assets")
BUILD = os.environ.get("BUILD_DIR", os.path.join(HERE, ".build"))
os.makedirs(BUILD, exist_ok=True)

def enc(p, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(p, "rb").read()).decode())

FONTS = open(os.path.join(ASSETS, "fonts.css")).read()
BRAIN_WS = enc(os.path.join(WS_ASSETS, "brain.png"), "image/png")
LOGO_BRAIN = enc(os.path.join(ROOT, "public/logo-brain.png"), "image/png")

def esc(s):
    return _html.escape(s, quote=False)

CSS = r"""
/*__FONTS__*/
*{ margin:0; padding:0; box-sizing:border-box; }
html{ background:#ffffff; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ font-family:'Inter',ui-sans-serif,system-ui,sans-serif; color:#16231f; }
.serif{ font-family:'Fraunces',Georgia,serif; }

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
   DECKBLATT
   ============================================================ */
.cover{ position:relative; width:210mm; height:297mm; overflow:hidden; color:#eaf0ff;
  background:
    radial-gradient(120% 80% at 82% 6%, rgba(52,196,196,.20), transparent 55%),
    radial-gradient(90% 60% at 12% 98%, rgba(140,198,63,.14), transparent 55%),
    linear-gradient(158deg,#0a1330,#0a1024);
  z-index:5; }
.cover .inner{ position:relative; z-index:2; height:100%; padding:30mm 24mm;
  display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
.cover .brandrow{ position:absolute; top:20mm; left:0; right:0; display:flex; justify-content:center;
  align-items:center; gap:10px; z-index:2; }
.cover .brandrow img{ width:26px; height:26px; }
.cover .brandrow span{ font-size:10px; letter-spacing:.24em; text-transform:uppercase;
  color:var(--teal-300); font-weight:600; }
.cover .eyebrow{ font-size:13px; letter-spacing:.34em; text-transform:uppercase;
  color:var(--leaf-500); font-weight:700; margin-bottom:7mm; }
.cover .brain{ width:42mm; height:auto; filter:drop-shadow(0 8px 30px rgba(52,196,196,.35)); }
.cover h1{ font-family:'Fraunces',serif; font-weight:600; font-size:44px; line-height:1.14;
  margin-top:8mm; letter-spacing:-.4px; max-width:165mm; text-shadow:0 2px 30px rgba(3,8,20,.7); }
.cover h1 .ac{ color:var(--teal-400); }
.cover .sub{ margin-top:6mm; font-size:15px; line-height:1.55; color:#c6cfe6; max-width:120mm;
  text-shadow:0 1px 16px rgba(3,8,20,.85); }
.cover .tagchip{ margin-top:9mm; font-size:11px; letter-spacing:.16em; text-transform:uppercase;
  color:var(--teal-300); font-weight:700; border:1px solid rgba(95,214,210,.35);
  border-radius:999px; padding:7px 16px; }
.cover .namerow{ position:absolute; left:24mm; right:24mm; bottom:18mm; z-index:2;
  display:flex; justify-content:center; align-items:center; gap:12px; font-size:12px; color:#a7b4d0; }
.cover .namerow .sep{ color:rgba(255,255,255,.3); }
.cover .namerow .dom{ color:var(--teal-300); letter-spacing:.04em; }

/* ============================================================
   INHALTSSEITEN
   ============================================================ */
.content{ break-before:page; }

.phead{ display:flex; gap:15px; align-items:flex-start; margin-bottom:16px; break-after:avoid; }
.phead .disc{ flex:none; width:38px; height:38px; border-radius:50%;
  background:linear-gradient(150deg,#8cc63f,#21b2bd); color:var(--navy-900);
  font-family:'Fraunces',serif; font-weight:600; font-size:16px; display:grid; place-items:center;
  box-shadow:0 8px 18px -8px rgba(33,178,189,.6); }
.phead .kicker{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.phead h1{ font-family:'Fraunces',serif; font-weight:600; font-size:30px; color:var(--navy-900);
  line-height:1.12; margin-top:2px; letter-spacing:-.2px; }
.phead .subt{ font-family:'Fraunces',serif; font-style:italic; font-size:15px; color:var(--teal-500); margin-top:3px; }

.klabel{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); font-weight:700;
  margin:20px 0 9px; break-after:avoid; }
.klabel.teal{ color:var(--teal-500); }

.callout{ break-inside:avoid; margin:6px 0 15px; border-radius:16px; padding:17px 22px; color:#eaf0ff;
  background:
    radial-gradient(70% 130% at 88% 0%, rgba(52,196,196,.26), transparent 60%),
    linear-gradient(140deg,#08102a,#12244d); }
.callout .k{ font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--leaf-500); }
.callout .q{ font-family:'Fraunces',serif; font-style:italic; font-size:15.5px; line-height:1.5; margin-top:8px; color:#eef2ff; }

.lead{ font-size:13.5px; line-height:1.62; color:#2c3a35; margin-bottom:12px; }
.h3{ font-family:'Fraunces',serif; font-weight:600; font-size:18px; color:var(--navy-900); margin:16px 0 4px; break-after:avoid; }
.body{ font-size:13px; line-height:1.6; color:#2c3a35; margin-bottom:9px; }
.body b{ color:var(--navy-900); }

ul.bullets{ list-style:none; margin:2px 0 10px; }
ul.bullets li{ font-size:13px; line-height:1.55; color:#2c3a35; margin:5px 0; padding-left:20px; position:relative; break-inside:avoid; }
ul.bullets li:before{ content:""; position:absolute; left:2px; top:8px; width:6px; height:6px;
  border-radius:50%; background:var(--teal-400); }
ul.bullets li b{ color:var(--navy-900); }

ol.steps{ list-style:none; counter-reset:st; margin:4px 0 12px; }
ol.steps li{ font-size:13px; line-height:1.55; color:#2c3a35; margin:7px 0; padding-left:30px; position:relative; break-inside:avoid; }
ol.steps li:before{ counter-increment:st; content:counter(st); position:absolute; left:0; top:1px;
  width:20px; height:20px; border-radius:50%; background:linear-gradient(150deg,#8cc63f,#21b2bd);
  color:var(--navy-900); font-family:'Fraunces',serif; font-weight:600; font-size:11px;
  display:grid; place-items:center; }
ol.steps li b{ color:var(--navy-900); }

/* Tabellen */
table.tbl{ width:100%; border-collapse:collapse; margin:6px 0 14px; break-inside:auto; }
table.tbl th{ text-align:left; font-size:9.5px; letter-spacing:.12em; text-transform:uppercase;
  color:var(--accent); font-weight:700; padding:7px 10px; border-bottom:1.5px solid var(--hair); }
table.tbl td{ font-size:12px; line-height:1.5; color:#2c3a35; padding:8px 10px;
  border-bottom:1px solid #efeade; vertical-align:top; }
table.tbl td b{ color:var(--navy-900); }
table.tbl tr{ break-inside:avoid; }
td.mono{ font-family:ui-monospace,'SF Mono',Menlo,monospace; font-size:11px; color:var(--navy-900); white-space:nowrap; }

/* Farb-Swatches */
.swatches{ display:flex; flex-wrap:wrap; gap:9px; margin:6px 0 14px; }
.sw{ width:calc(25% - 7px); border:1px solid var(--hair); border-radius:10px; overflow:hidden; break-inside:avoid; }
.sw .chip{ height:34px; }
.sw .meta{ padding:6px 8px; }
.sw .nm{ font-size:10.5px; font-weight:700; color:var(--navy-900); }
.sw .hx{ font-family:ui-monospace,Menlo,monospace; font-size:9.5px; color:var(--ink-soft); }

/* Logo-Beispiele */
.logogrid{ display:flex; gap:12px; margin:6px 0 8px; }
.logotile{ flex:1; border:1px solid var(--hair); border-radius:14px; overflow:hidden; break-inside:avoid; }
.logotile .stage{ height:120px; display:grid; place-items:center; padding:14px; }
.logotile .embsolo{ max-width:70%; max-height:92px; object-fit:contain; }
.logotile.light .stage{ background:#ffffff; }
.logotile.dark .stage{ background:
  radial-gradient(90% 120% at 80% 8%, rgba(52,196,196,.28), transparent 55%),
  linear-gradient(150deg,#0a1330,#0a1024); }
.logotile .cap{ font-size:10px; letter-spacing:.1em; text-transform:uppercase; font-weight:700;
  color:var(--ink-soft); padding:8px 10px; border-top:1px solid var(--hair); background:#fbfaf6; }

/* Logo-Lockup (Emblem + Wortmarke) – wie im Web (Logo.tsx) */
.lock{ display:flex; align-items:center; gap:12px; }
.lock .emb{ height:52px; width:auto; object-fit:contain; }
.wm{ display:flex; flex-direction:column; line-height:1; }
.wm .l1{ font-family:'Inter',sans-serif; font-weight:600; font-size:11px; text-transform:uppercase;
  letter-spacing:.2em;
  background:linear-gradient(100deg,#8cc63f,#34c4c4); -webkit-background-clip:text; background-clip:text; color:transparent; }
.wm .l2{ font-family:'Inter',sans-serif; font-weight:700; font-size:17px; text-transform:uppercase;
  letter-spacing:.12em; line-height:1; margin-top:2px;
  background:linear-gradient(100deg,#8cc63f,#34c4c4); -webkit-background-clip:text; background-clip:text; color:transparent; }
.wm.dark .l1, .wm.dark .l2{ filter:drop-shadow(0 1px 8px rgba(33,178,189,.45)); }

.affirm{ break-inside:avoid; margin-top:15px; border-radius:16px; padding:17px 22px; color:#eaf0ff;
  background:
    radial-gradient(70% 130% at 12% 0%, rgba(140,198,63,.22), transparent 60%),
    linear-gradient(140deg,#08102a,#12244d); }
.affirm .k{ font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--leaf-500); }
.affirm p{ font-family:'Fraunces',serif; font-style:italic; font-size:15px; color:#eef2ff; margin-top:8px; line-height:1.5; }

.docfoot{ margin-top:22px; padding-top:9px; border-top:1px solid var(--hair);
  display:flex; justify-content:space-between; align-items:center;
  font-size:10px; color:#9a9384; break-inside:avoid; }
.docfoot .dom{ color:var(--accent); font-weight:600; }

/* Inhaltsverzeichnis */
.toc h2{ font-family:'Fraunces',serif; font-weight:600; font-size:28px; color:var(--navy-900); margin-bottom:8px; }
.toc .row{ display:flex; align-items:center; gap:15px; padding:11px 0; border-bottom:1px solid var(--hair); break-inside:avoid; }
.toc .disc{ flex:none; width:34px; height:34px; border-radius:50%;
  background:linear-gradient(150deg,#8cc63f,#21b2bd); color:var(--navy-900);
  font-family:'Fraunces',serif; font-weight:600; font-size:15px; display:grid; place-items:center; }
.toc b{ font-size:14.5px; color:var(--navy-900); } .toc span{ display:block; font-size:12px; color:#2c3a35; }
"""
CSS = CSS.replace("/*__FONTS__*/", FONTS)

def doc(inner, plain=False):
    extra = "@page:first{margin:16mm 17mm}" if plain else ""
    return ("<!doctype html><html lang='de'><head><meta charset='utf-8'>"
            "<style>" + CSS + extra + "</style></head><body>" + inner + "</body></html>")

# ---------------- Bausteine ----------------
def cover(eyebrow, title, sub, tag):
    words = title.split()
    if len(words) > 1:
        titled = esc(" ".join(words[:-1])) + ' <span class="ac">' + esc(words[-1]) + "</span>"
    else:
        titled = esc(title)
    return (
        '<div class="cover">'
        '<div class="brandrow"><img src="%s"><span>Werde Meister deiner Gedanken</span></div>'
        '<div class="inner">'
        '<div class="eyebrow">%s</div>'
        '<img class="brain" src="%s">'
        '<h1 class="serif">%s</h1>'
        '<div class="sub">%s</div>'
        '<div class="tagchip">%s</div>'
        '</div>'
        '<div class="namerow"><span>Version 1.0 · Stand 2026</span>'
        '<span class="sep">·</span><span class="dom">werdemeisterdeinergedanken.de</span></div>'
        '</div>'
    ) % (BRAIN_WS, esc(eyebrow), BRAIN_WS, titled, esc(sub), esc(tag))

def chead(num, kicker, title, sub):
    disc = ('<div class="disc">%s</div>' % esc(str(num))) if num else ""
    return ('<div class="phead">%s<div>'
            '<div class="kicker">%s</div>'
            '<h1 class="serif">%s</h1>'
            '<div class="subt">%s</div></div></div>'
            ) % (disc, esc(kicker), esc(title), esc(sub))

def label(text, teal=False):
    return '<div class="klabel%s">%s</div>' % (" teal" if teal else "", esc(text))

def lead(text):
    return '<div class="lead">%s</div>' % text  # erlaubt Inline-HTML (b/em)

def body(text):
    return '<div class="body">%s</div>' % text

def h3(text):
    return '<div class="h3">%s</div>' % esc(text)

def bullets(items):
    return '<ul class="bullets">' + "".join('<li>%s</li>' % it for it in items) + '</ul>'

def steps(items):
    return '<ol class="steps">' + "".join('<li>%s</li>' % it for it in items) + '</ol>'

def callout(text, k="Kerngedanke"):
    return '<div class="callout"><div class="k">%s</div><div class="q">„%s“</div></div>' % (esc(k), esc(text))

def affirm(text, k="Leitsatz"):
    return '<div class="affirm"><div class="k">%s</div><p>„%s“</p></div>' % (esc(k), esc(text))

def table(headers, rows):
    th = "".join('<th>%s</th>' % esc(h) for h in headers)
    trs = ""
    for r in rows:
        tds = "".join('<td class="%s">%s</td>' % (cls, val) for (val, cls) in r)
        trs += "<tr>%s</tr>" % tds
    return '<table class="tbl"><thead><tr>%s</tr></thead><tbody>%s</tbody></table>' % (th, trs)

def swatches(items):  # items: (name, hex)
    out = '<div class="swatches">'
    for nm, hx in items:
        out += ('<div class="sw"><div class="chip" style="background:%s"></div>'
                '<div class="meta"><div class="nm">%s</div><div class="hx">%s</div></div></div>'
                ) % (hx, esc(nm), esc(hx))
    return out + '</div>'

def docfoot(lbl):
    return ('<div class="docfoot"><span>%s</span><span class="dom">werdemeisterdeinergedanken.de</span></div>'
            ) % esc(lbl)

def wordmark(tone):
    # Aktuelle Wortmarke wie im Web (Logo.tsx): Inter, Versalien, zweizeilig,
    # Marken-Verlauf Lindgrün → Türkis.
    return ('<div class="wm %s"><span class="l1">Werde Meister deiner</span>'
            '<span class="l2">Gedanken</span></div>') % tone

def lockup(tone):
    return ('<div class="lock"><img class="emb" src="%s">%s</div>') % (LOGO_BRAIN, wordmark(tone))

def logo_examples():
    # Aktuelles Logo-Lockup (Emblem + Wortmarke) auf Dunkel und Hell,
    # dazu das Emblem solo.
    return (
        '<div class="logogrid">'
        '<div class="logotile dark"><div class="stage">%s</div>'
        '<div class="cap">Logo auf Dunkel</div></div>'
        '<div class="logotile light"><div class="stage">%s</div>'
        '<div class="cap">Logo auf Hell</div></div>'
        '</div>'
        '<div class="logogrid">'
        '<div class="logotile dark"><div class="stage"><img class="embsolo" src="%s"></div>'
        '<div class="cap">Emblem solo · auf Dunkel</div></div>'
        '<div class="logotile light"><div class="stage"><img class="embsolo" src="%s"></div>'
        '<div class="cap">Emblem solo · auf Hell</div></div>'
        '</div>'
    ) % (lockup("dark"), lockup("light"), LOGO_BRAIN, LOGO_BRAIN)

def td(v, cls=""):
    return (v, cls)

# Kürzel für Tabellenzellen
def C(v): return (v, "")
def M(v): return (v, "mono")

def chapter(num, kicker, title, sub, blocks):
    lbl = "Brandbook · %s" % title
    return ('<div class="content">'
            + chead(num, kicker, title, sub)
            + "".join(blocks)
            + docfoot(lbl)
            + '</div>')

# ---------------- Inhalt ----------------
parts = []

# Deckblatt
parts.append(cover("Markenhandbuch", "Werde Meister deiner Gedanken",
                   "Das Brandbook – Markenkern, Tonalität, Logo, Farben, "
                   "Typografie, Bildwelt und Struktur an einem Ort.",
                   "Bewusstseinsentwicklung in 7 Stufen"))

# Inhaltsverzeichnis
toc_rows = [
    ("01", "Marke & Positionierung", "Markenkern, Werte, die 7 Stufen"),
    ("02", "Tonalität & Sprache", "Tone of Voice, Claims, Kernsätze"),
    ("03", "Logo", "Emblem, Wortmarke, Schutzraum, Don'ts"),
    ("04", "Farben", "Palette & Design-Tokens, Kontrast-Regeln"),
    ("05", "Typografie", "Fraunces & Inter, Hierarchie"),
    ("06", "Bildwelt & Grafik", "Kosmischer Look, Fotografie, Motion"),
    ("07", "Anwendungen", "Kanäle, Formate, Generatoren"),
    ("08", "Struktur", "Quellen der Wahrheit im Projekt"),
    ("09", "Mitgliederbereich", "Funktionen & Bedienungsanleitung"),
    ("10", "Perspektiven", "Weiterentwicklung in drei Horizonten"),
]
rows = ""
for n, t, s in toc_rows:
    rows += ('<div class="row"><div class="disc">%s</div><div><b>%s</b><span>%s</span></div></div>'
             ) % (n, esc(t), esc(s))
parts.append('<div class="content"><div class="toc"><h2 class="serif">Inhalt</h2>%s</div>%s</div>'
             % (rows, docfoot("Brandbook · Inhalt")))

# 01 Marke
parts.append(chapter("1", "Kapitel 01", "Marke & Positionierung",
    "Wofür die Marke steht", [
    callout("Dein Bewusstsein ist der Schlüssel, deine Gedanken sind der Code.", "Markenkern"),
    lead("<b>Werde Meister deiner Gedanken</b> begleitet Menschen dabei, aus dem "
         "gedanklichen Autopilot auszusteigen und Schritt für Schritt zum bewussten "
         "Gestalter ihres Denkens zu werden – entlang eines klaren Weges in sieben Stufen."),
    label("Markenwerte"),
    table(["Wert", "Bedeutung"], [
        [C("<b>Authentizität</b>"), C("Kein Guru-Getue, keine Floskeln. Ehrliche Arbeit auf Augenhöhe.")],
        [C("<b>Eigenverantwortung</b>"), C("Werkzeuge statt Abhängigkeit – das Steuer bleibt beim Menschen.")],
        [C("<b>Klarheit</b>"), C("Komplexe innere Prozesse in verständliche, umsetzbare Schritte übersetzt.")],
        [C("<b>Tiefe</b>"), C("Nicht an der Oberfläche kratzen, sondern an die Wurzel der Muster gehen.")],
    ]),
    label("Kern-Persona", teal=True),
    body("<b>Die/der bewusst Suchende:</b> Menschen auf echter Sinn- und Selbstfindungssuche "
         "(ca. 25–55, oft in einer Umbruchphase), die spüren, dass sie „gelebt werden“ statt "
         "zu gestalten. Sekundär: der bodenständig-skeptische Typ – spirituelle Wärme ja, "
         "Guru-Sprech und Dogma nein."),
    label("Die 7 Stufen der Bewusstseinsentwicklung"),
    table(["Stufe", "Titel", "Untertitel"], [
        [M("01"), C("<b>Autopilot</b>"), C("Du wirst gelebt")],
        [M("02"), C("<b>Erwachen</b>"), C("Du bemerkst es")],
        [M("03"), C("<b>Selbstbeobachtung</b>"), C("Du siehst dir zu")],
        [M("04"), C("<b>Emotionale Reifung</b>"), C("Du lässt los")],
        [M("05"), C("<b>Schöpferkraft</b>"), C("Du erschaffst bewusst")],
        [M("06"), C("<b>Innere Ausrichtung</b>"), C("Kopf, Herz und Handeln")],
        [M("07"), C("<b>Meisterschaft</b>"), C("Du gestaltest")],
    ]),
]))

# 02 Tonalität
parts.append(chapter("2", "Kapitel 02", "Tonalität & Sprache",
    "Wie die Marke spricht", [
    lead("Die Stimme ist <b>ruhig, klar, ehrlich und ermutigend</b> – ein wissender "
         "Begleiter auf Augenhöhe, nicht ein Guru über den Menschen. Ansprache in der Du-Form."),
    label("Wir sind – wir sind nicht"),
    table(["Wir sind …", "Wir sind nicht …"], [
        [C("klar & konkret"), C("schwurbelig, esoterisch")],
        [C("ehrlich, auf Augenhöhe"), C("belehrend, von oben herab")],
        [C("ermutigend"), C("druckvoll, moralisierend")],
        [C("ruhig & präsent"), C("reißerisch, marktschreierisch")],
        [C("fundiert (Belege)"), C("behauptend ohne Beleg")],
    ]),
    label("Designprinzip: das eine Akzentwort", teal=True),
    body("In Zitaten und Kernsätzen trägt genau <b>ein Wort</b> den Grün-Türkis-Akzent – "
         "die visuelle und inhaltliche Pointe des Satzes."),
    callout("Nicht jeder Gedanke, den du denkst, ist von dir.", "Kernsatz"),
    label("Claims & Kernsätze"),
    bullets([
        "<b>Tagline:</b> Bewusstseinsentwicklung in 7 Stufen",
        "<b>Key-Visual:</b> Raus aus fremden Mustern. Rein in dein eigenes Denken.",
        "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt deine Freiheit.",
        "Du bist nicht deine Gedanken. Du bist der, der sie bemerkt.",
        "Freiheit beginnt mit einer Frage: Ist dieser Gedanke wirklich meiner?",
    ]),
    affirm("Konkret, einladend, ohne Dogma – Tiefe zugänglich machen statt behaupten."),
]))

# 03 Logo
parts.append(chapter("3", "Kapitel 03", "Logo",
    "Emblem, Wortmarke & Anwendung", [
    lead("Das Logo besteht aus dem <b>Gehirn-Emblem</b> (Brain-Mark, Lindgrün → Türkis) und "
         "der <b>Wortmarke</b> „Werde Meister deiner Gedanken“ – zweizeilig, in Versalien, "
         "in <b>Inter</b> mit dem Marken-Verlauf Lindgrün → Türkis."),
    label("Logo-Beispiele", teal=True),
    logo_examples(),
    label("Logo-Dateien"),
    table(["Datei", "Verwendung"], [
        [M("logo-brain.png"), C("Freigestelltes Emblem (Standard im Web, Header)")],
        [M("logo.svg"), C("Vektor-Logo (Print, große Flächen)")],
        [M("src/app/icon.png"), C("Favicon / App-Icon")],
        [M("logo-full.png"), C("<b>Veraltet</b> – alte Version mit handgezeichneter Wortmarke, nicht mehr verwenden")],
    ]),
    label("Schutzraum & Mindestgröße", teal=True),
    bullets([
        "<b>Emblemhöhe Web:</b> ca. 40 px (Header-Standard)",
        "<b>Abstand Emblem ↔ Wortmarke:</b> 12 px",
        "<b>Mindesthöhe Emblem:</b> 32 px digital",
        "<b>Schutzraum:</b> mindestens die halbe Emblemhöhe ringsum freihalten",
    ]),
    label("Logo-Don'ts"),
    bullets([
        "Emblem nicht verzerren, drehen oder umfärben",
        "Wortmarke nie in Kleinbuchstaben (immer Versalien)",
        "Nicht auf unruhige, kontrastarme Hintergründe setzen",
        "Marken-Verlauf nicht durch Vollfarben ersetzen",
    ]),
]))

# 04 Farben
parts.append(chapter("4", "Kapitel 04", "Farben",
    "Palette & Design-Tokens", [
    lead("Basis ist tiefes Mitternachtsblau mit kosmischer Weite; die Marken-Signatur "
         "<b>Lindgrün → Türkis</b> (aus dem Logo) ist der lebendige Akzent. Für helle "
         "Flächen ein warmes Elfenbein-Papier. Gold nur sparsam (Bewertungssterne)."),
    label("Navy – Basis / dunkle Flächen"),
    swatches([("navy-950","#050914"),("navy-900","#08102a"),("navy-800","#0f1e44"),
              ("navy-700","#16294f"),("navy-600","#1f3565"),("navy-500","#2b4684")]),
    label("Marken-Akzent – Lindgrün → Teal", teal=True),
    swatches([("leaf-400","#a3d64f"),("leaf-500","#8cc63f"),("leaf-600","#74ab2f"),
              ("teal-300","#5fd6d2"),("teal-400","#34c4c4"),("teal-500","#21b2bd"),
              ("teal-600","#199aa8"),("brand-500","#3670ee")]),
    label("Hell – Papier, Tinte & Akzent"),
    swatches([("paper","#f6f4ee"),("surface","#ffffff"),("surface-2","#efece2"),
              ("ink","#16231f"),("ink-mid","#565f5b"),("ink-muted","#626b67"),
              ("accent","#4f9e1c"),("gold-400","#e8c15f")]),
    label("Kontrast-Regel (WCAG)"),
    body("<b>Keine</b> Marken-Akzentfarbe (leaf/teal) erreicht AA für Normaltext auf Hell. "
         "Der Signatur-Verlauf ist nur für <b>große Display-Headlines</b> und Grafik. "
         "Braucht ein farbiger Link/Label echten AA-Kontrast auf Hell, die abgedunkelten "
         "Varianten nutzen: <b>Grün #3a7615</b> (≥4,7:1), <b>Teal #0f6d77</b> (≥5,1:1). "
         "Fließtext auf Hell immer in den ink-Tönen."),
]))

# 05 Typografie
parts.append(chapter("5", "Kapitel 05", "Typografie",
    "Fraunces & Inter", [
    table(["Rolle", "Schrift", "Einsatz"], [
        [C("<b>Display / Headlines</b>"), C("Fraunces (Serife)"), C("Überschriften, Zitate, editoriale Akzente")],
        [C("<b>Fließtext / UI</b>"), C("Inter (Sans)"), C("Body, Navigation, Buttons, Wortmarke")],
    ]),
    body("Beide Schriften sind <b>selbst gehostet</b> (kein Google-Fonts-Request – DSGVO-freundlich), "
         "variabel (Gewicht 100–900), Lizenz SIL Open Font License."),
    label("Überschriften-Stil", teal=True),
    bullets([
        "Fraunces, Gewicht 500, Laufweite −0.01em, Zeilenhöhe 1.12",
        "Saubere Umbrüche langer Komposita (hyphens, balance)",
        "Ein Akzentwort optional kursiv (Fraunces Italic) im Marken-Verlauf",
    ]),
    label("Do & Don't"),
    bullets([
        "<b>Do:</b> Headlines in Fraunces, Fließtext ausschließlich Inter",
        "<b>Don't:</b> Headlines nicht in Inter (Ausnahme: Wortmarke/Versalien)",
        "<b>Don't:</b> keine dritte Schriftfamilie einführen",
    ]),
]))

# 06 Bildwelt
parts.append(chapter("6", "Kapitel 06", "Bildwelt & Grafik",
    "Kosmischer Look & Fotografie", [
    lead("Kosmisch, ruhig und tief: ein nächtlicher Sternenhimmel über tiefem "
         "Mitternachtsblau, aus dem Marken-Signatur und Gehirn-Emblem leuchten."),
    label("Die vier Bausteine des Looks"),
    bullets([
        "<b>Kosmischer Hintergrund</b> – navy #08102a mit weichen Radial-Verläufen",
        "<b>Sternenfeld</b> – feine, dezente Punkte",
        "<b>Glow</b> – weicher Türkis-Schein hinter Emblem/Motiven",
        "<b>Marken-Verlauf</b> – Lindgrün → Türkis für Akzente, CTAs, Wortmarke",
    ]),
    label("Fotografie: „Heiko im Zentrum“", teal=True),
    body("Die echte Person <b>trägt die Marke</b> – Vertrauen über Gesicht und Präsenz; "
         "der kosmische Look ist der Rahmen, nicht umgekehrt."),
    table(["Priorität", "Motiv"], [
        [M("1"), C("Heiko-Portraits – nahbar, warm, echt (freigestellt)")],
        [M("2"), C("Themen-Heros – kuratierte Motive je Inhaltsthema")],
        [M("3"), C("Kosmische Key-Visuals – Emblem + Marken-Look")],
    ]),
    label("Motion / Animation"),
    body("Bewegung ist <b>dezent und langsam</b> (5–22 s, weiche Easings) – Atmosphäre, "
         "nicht Blickfang. <b>prefers-reduced-motion</b> wird respektiert."),
]))

# 07 Anwendungen
parts.append(chapter("7", "Kapitel 07", "Anwendungen",
    "Kanäle, Formate & Generatoren", [
    label("Kanäle"),
    table(["Kanal", "Profil"], [
        [C("Instagram"), M("@werde.meister.deiner.gedanken")],
        [C("YouTube"), M("@WerdeMeisterdeinerGedanken")],
        [C("Facebook"), M("werde.meister.deiner.gedanken.2024")],
        [C("LinkedIn"), M("in/werdemeisterdeinergedanken")],
    ]),
    label("Standard-Formate", teal=True),
    table(["Format", "Maße", "Einsatz"], [
        [M("1:1"), M("1080×1080"), C("Feed, Avatar, Kanalbild")],
        [M("4:5"), M("1080×1350"), C("Feed hoch (Instagram)")],
        [M("9:16"), M("1080×1920"), C("Story / Reel / Status")],
        [M("16:9"), M("1920×1080"), C("YouTube / Querformat")],
        [M("2:3"), M("1000×1500"), C("Pinterest")],
    ]),
    label("Layout-Prinzip der Kacheln"),
    body("Eyebrow (Türkis, Versalien) → Headline (Fraunces, ein Akzentwort im Verlauf) → "
         "optionaler Untertitel → Signatur unten (Emblem + Wortmarke)."),
    label("Generatoren"),
    bullets([
        "<b>brand-assets.mjs</b> – Avatare, Thumbnails, Zitat-/Fakten-/E-Book-Kacheln",
        "<b>content-overlays.mjs</b> – transparente Overlays für eigene Fotos",
        "<b>content-data.mjs</b> – gemeinsame Textquelle (Zitate + Fakten)",
    ]),
]))

# 08 Struktur
parts.append(chapter("8", "Kapitel 08", "Struktur",
    "Quellen der Wahrheit im Projekt", [
    lead("Jedes Markenelement ist im Code verbindlich definiert. Ändert sich die Marke, "
         "wird <b>zuerst die Quelle</b> geändert – dann zieht das Brandbook nach."),
    table(["Element", "Quelle der Wahrheit"], [
        [C("Name, Tagline, Social"), M("src/lib/site.ts")],
        [C("Werte, 7 Stufen, FAQ"), M("src/lib/content.ts")],
        [C("Farben, Verläufe, Typo"), M("src/app/globals.css")],
        [C("Schriften"), M("src/app/layout.tsx")],
        [C("Logo (Komponente)"), M("components/visuals/Logo.tsx")],
        [C("Icon-Set"), M("components/ui/Icon.tsx")],
        [C("Kernsätze / Fakten"), M("docs/marketing/content-data.mjs")],
        [C("Grafik-Generator"), M("docs/marketing/brand-assets.mjs")],
    ]),
    affirm("Ändert sich ein Markenelement, wird es zuerst im Code geändert und danach im "
           "Brandbook nachgezogen – so bleiben Doku und Umsetzung konsistent.", "Pflege-Prinzip"),
]))

# 09 Mitgliederbereich
parts.append(chapter("9", "Kapitel 09", "Mitgliederbereich",
    "Funktionen & Bedienungsanleitung", [
    lead("Der geschützte Lernbereich unter <b>/mitglieder</b> – das Herzstück des "
         "Angebots. Er übersetzt die 7 Stufen in einen begleiteten Weg mit Lektionen, "
         "Übungen, Journal, großer Wissens- & Praxis-Bibliothek, geführten Programmen, "
         "PDF-Downloads und KI-Werkzeugen. Nur nach Login erreichbar."),
    label("Funktionsübersicht"),
    table(["Bereich", "Was es kann"], [
        [C("<b>Dashboard</b>"), C("Fortschrittsbalken (x/7), personalisierter Einstieg, Schnellzugriffe")],
        [C("<b>Die 7 Stufen</b>"), C("Kerngedanke, Lektion, 2 Übungen, Reflexion, Leitsatz, PDF-Downloads")],
        [C("<b>Vertiefungen</b>"), C("29 Deep Dives mit Lektion, Übungen, Quellen")],
        [C("<b>Praxis</b>"), C("13 geführte Meditationen, Atemübungen & Rituale")],
        [C("<b>Wissensdatenbank</b>"), C("27 Kapitel in 5 Teilen + Glossar")],
        [C("<b>Journal</b>"), C("Reflexionen, Statistik, Wachstumskurve, Druckfunktion")],
        [C("<b>Gedankenprofil</b>"), C("Auswertung der 7 Stufen aus dem Bewusstseinstest")],
        [C("<b>21-Tage-Programm</b>"), C("„Autopilot-Ausstieg“ mit Tagesfortschritt")],
        [C("<b>Tägliche Rückkehr</b>"), C("Tägliche Mini-Praxis danach")],
        [C("<b>KI-Begleiter</b>"), C("Chat, der Inhalte & deinen Stand kennt")],
        [C("<b>Manipulations-Detektor</b>"), C("KI prüft Text gegen 16 Manipulationstechniken")],
    ]),
    label("Bedienungsanleitung (für Mitglieder)", teal=True),
    steps([
        "<b>Anmelden</b> über /login (E-Mail & Passwort).",
        "<b>Bewusstseinstest</b> machen – daraus entsteht dein Gedankenprofil und ein personalisierter Einstieg.",
        "<b>Dashboard</b> öffnen – Fortschritt und empfohlener nächster Schritt.",
        "<b>Stufe für Stufe</b> arbeiten: Lektion lesen, Übungen machen, Reflexionsfragen ausfüllen (Autosave), Leitsatz mitnehmen, Stufe abschließen.",
        "<b>Vertiefen</b> mit Vertiefungen, Praxis-Übungen und Wissensdatenbank.",
        "<b>Dranbleiben</b> mit dem 21-Tage-Programm und der täglichen Rückkehr.",
        "<b>KI-Werkzeuge</b> nutzen: Begleiter, Detektor, Muster-Spiegel/Reading.",
        "<b>Journal & Downloads</b>: Weg nachvollziehen (Wachstumskurve) und PDFs laden.",
    ]),
    label("Downloads & Umfang"),
    table(["Element", "Anzahl"], [
        [C("PDF-Downloads (Arbeitsheft, Lektionen, Übungen, Vertiefungen)"), M("44")],
        [C("Stufen · Lektionen · Übungen"), M("7 · 7 · 14")],
        [C("Vertiefungen · Praxis"), M("29 · 13")],
        [C("Wissensdatenbank-Kapitel"), M("27 + Glossar")],
        [C("21-Tage-Programm"), M("21 Tage")],
    ]),
    label("Zugang & Schutz"),
    bullets([
        "<b>Login</b> über Supabase Auth; zweifacher Schutz (Middleware + Layout + Download-Guard)",
        "<b>Bezahlschranke (Stripe)</b> vorbereitet, aktuell aus – Login genügt",
        "PDFs werden <b>geschützt</b> ausgeliefert (nicht öffentlich)",
    ]),
    affirm("Vor Livegang: echte Preise setzen, Bezahlschranke aktivieren, Videos ergänzen, "
           "ANTHROPIC_API_KEY für die KI-Werkzeuge hinterlegen.", "Hinweis zum Stand"),
]))

# 10 Perspektiven
parts.append(chapter("10", "Kapitel 10", "Perspektiven & Weiterentwicklung",
    "Ausblick auf die nächsten Schritte", [
    lead("Sinnvolle nächste Schritte – bewusst <b>geerdet</b> in dem, was schon existiert. "
         "Vieles ist bereits angelegt und muss nur aktiviert oder gefüllt werden. Dies sind "
         "<b>Möglichkeiten</b>, keine Beschlüsse."),
    label("Kurzfristig – Vorhandenes scharf schalten"),
    bullets([
        "<b>Bezahlschranke aktivieren</b> – Stripe ist integriert; nur einschalten & echte Preise setzen",
        "<b>Videos einspielen</b> – die Slots existieren überall (aktuell leer)",
        "<b>KI-Werkzeuge live</b> – API-Key hinterlegen (Begleiter, Detektor, Reading)",
        "<b>Marken-Feinschliff</b> – Mono-Logo & vektorisierte Wortmarke, altes Logo entfernen",
    ]),
    label("Mittelfristig – Erlebnis & Bindung", teal=True),
    bullets([
        "<b>Audio-Versionen</b> der Praxis-Übungen & Meditationen",
        "<b>E-Mail-Journey</b> an die 7 Stufen gekoppelt (Opt-in existiert)",
        "<b>Motivation</b> – Streaks, Meilensteine, Abschluss-Zertifikate",
        "<b>Community</b> – moderierter Austausch, Live-Calls",
        "<b>PWA / Mobile</b> mit Push-Erinnerung für die tägliche Rückkehr",
    ]),
    label("Langfristig – Angebot & Reichweite"),
    bullets([
        "<b>Angebots-Stufen</b> – Basis · Plus (Community) · 1:1-Begleitung; Workshops, Firmen",
        "<b>Inhaltliche Breite</b> – mehr Vertiefungen, Podcast aus vorhandenen Kernsätzen",
        "<b>Personalisierte Lernpfade</b> per KI (aus Gedankenprofil & Journal)",
        "<b>Internationalisierung</b> – perspektivisch englische Fassung",
    ]),
    label("Nach Themen"),
    table(["Feld", "Perspektive"], [
        [C("<b>Produkt</b>"), C("Paywall, Videos, Zertifikate, Community, PWA")],
        [C("<b>Inhalt</b>"), C("Audio, mehr Vertiefungen, Podcast, Übersetzung")],
        [C("<b>KI</b>"), C("Werkzeuge live, personalisierte Pfade, Begleiter-Gedächtnis")],
        [C("<b>Marke</b>"), C("Wortmarke vereinheitlichen, Mono-Logo, Foto-Richtlinie, Motion")],
        [C("<b>Marketing</b>"), C("E-Mail-Journey, Kanäle skalieren, SEO, Automation")],
        [C("<b>Monetarisierung</b>"), C("Angebots-Stufen, 1:1, Workshops, Firmenkunden")],
    ]),
    affirm("Werte zuerst, Tiefe vor Menge, ruhiger Look bleibt, Barrierefreiheit mitdenken – "
           "und jede Erweiterung zuerst im Code/Content, dann im Brandbook.", "Leitplanken"),
]))

# ---------------- Ausgabe ----------------
out_html = doc("".join(parts))
out_path = os.path.join(BUILD, "brandbook.html")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(out_html)
print("Brandbook-HTML:", out_path, "| Kapitel:", len(toc_rows))
