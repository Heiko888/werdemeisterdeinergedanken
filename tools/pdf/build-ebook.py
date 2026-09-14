#!/usr/bin/env python3
# Erzeugt das gestaltete Gratis-E-Book „Die 7 Stufen der Bewusstseinsentwicklung" als book.html.
# Pfade sind relativ zum Skript / per Env konfigurierbar (siehe generate.mjs).
import base64, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("REPO_ROOT", os.path.abspath(os.path.join(HERE, "..", "..")))
ASSETS = os.path.join(HERE, "assets")
BUILD = os.environ.get("BUILD_DIR", os.path.join(HERE, ".build"))
os.makedirs(BUILD, exist_ok=True)

def enc(p, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(p, "rb").read()).decode())

FONTS = open(os.path.join(ASSETS, "fonts.css")).read()
LOGO = enc(os.path.join(ROOT, "public/logo-brain-gold.png"), "image/png")
HEIKO = enc(os.path.join(ROOT, "public/heiko-portrait.webp"), "image/webp")
BRAIN = enc(os.path.join(ROOT, "public/logo-brain-gold.png"), "image/png")  # goldenes Gehirn, transparent
# Cover-Hauptmotiv: Foto (Mann auf der goldenen Treppe ins Licht), falls vorhanden –
# sonst fällt das Cover auf das goldene Gehirn zurück. Ablage:
# tools/pdf/assets/ebook-cover-treppe.png (eigenes Motiv des Gratis-E-Books,
# bewusst getrennt vom Buch-Cover-Motiv cover-treppe.png).
_COVER_PHOTO_PATH = os.path.join(ASSETS, "ebook-cover-treppe.png")
COVER_PHOTO = enc(_COVER_PHOTO_PATH, "image/png") if os.path.exists(_COVER_PHOTO_PATH) else None

CSS = r"""
/*__FONTS__*/
* { margin:0; padding:0; box-sizing:border-box; }
:root{
  --navy-950:#050914; --navy-900:#08102a; --navy-850:#0b1636; --navy-800:#0f1e44;
  --navy-700:#16294f; --navy-600:#1f3565;
  --brand-400:#5b8cff; --brand-500:#3670ee;
  /* Akzente auf Gold umgestellt (früher Grün-Türkis) – tiefes Gold #7e6410
     ist AA-lesbar auf Creme, #d9a93a für Füllungen/Linien. */
  --leaf-400:#7e6410; --leaf-500:#d9a93a;
  --teal-300:#7e6410; --teal-400:#d9a93a; --teal-500:#7e6410;
  --violet:#d9a93a; --cyan:#d9a93a;
  --gold-300:#f2d489; --gold-400:#e8c15f; --gold-500:#d9a93a;
  --gold-700:#7e6410;
  --paper:#f6f4ee; --surface:#efece2; --surface2:#efece2;
  --ink:#16231f; --ink-soft:#48524e; --accent:#7e6410;
  --cream:#f4f2ec;
}
html,body{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ font-family:'Inter',ui-sans-serif,system-ui,sans-serif; color:var(--ink); }
.page{
  position:relative; width:210mm; height:297mm; overflow:hidden;
  page-break-after:always; background:var(--paper);
}
.page:last-child{ page-break-after:auto; }
.serif{ font-family:'Fraunces',Georgia,serif; }

/* ---------- COVER ---------- */
.cover{ color:var(--ink); padding:0; background:
  radial-gradient(66% 48% at 50% 60%, rgba(233,193,95,.20), transparent 62%),
  radial-gradient(60% 42% at 18% 14%, rgba(242,212,137,.26), transparent 60%),
  radial-gradient(55% 40% at 88% 96%, rgba(217,169,58,.18), transparent 62%),
  linear-gradient(160deg, #f8f6f0 0%, #f1eee5 52%, #f6f4ee 100%); }
.cover .brain{ position:absolute; left:50%; top:calc(60% - 12mm); transform:translate(-50%,-50%);
  width:66%; max-width:none; mix-blend-mode:normal; opacity:.62; }
/* Foto-Hauptmotiv (Mann auf der goldenen Treppe): großes Band im mittleren/unteren
   Bereich zwischen Versprechen (oben) und Bullet-Reihe (unten). Kanten SEHR weich
   ins Creme ausgeblendet (radiale Vignette + langer Verlauf), liegt hinter dem Text. */
.cover .hero-photo{ position:absolute; left:4%; right:4%; top:29%; bottom:20%; z-index:0;
  background-repeat:no-repeat; background-position:center 44%; background-size:cover;
  -webkit-mask-image:
    radial-gradient(120% 96% at 50% 46%, #000 42%, rgba(0,0,0,0.5) 72%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, #000 22%, #000 82%, transparent 100%);
  -webkit-mask-composite:source-in;
  mask-image:
    radial-gradient(120% 96% at 50% 46%, #000 42%, rgba(0,0,0,0.5) 72%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, #000 22%, #000 82%, transparent 100%);
  mask-composite:intersect; }
.cover .inner{ position:relative; height:100%; padding:19mm 22mm 15mm; display:flex; flex-direction:column; }
.brandrow{ display:flex; align-items:center; gap:11px; }
.brandrow img{ width:38px; height:38px; }
.brandrow .wm{ display:flex; flex-direction:column; gap:3px; line-height:1; }
.brandrow .wm1{ font-family:'Fraunces',serif; font-size:15px; font-weight:400; letter-spacing:.1em; text-transform:uppercase; color:var(--ink); }
.brandrow .wm1 em{ font-style:normal; background:linear-gradient(100deg,#d9a93a,#7e6410); -webkit-background-clip:text; background-clip:text; color:transparent; }
.brandrow .wm2{ display:flex; align-items:center; gap:6px; font-family:'Fraunces',serif; font-size:8px; font-weight:400; letter-spacing:.24em; text-transform:uppercase; color:var(--ink-soft); }
.brandrow .wm2 i{ display:block; height:1px; width:11px; background:var(--gold-500); }
.eyebrow{ margin-top:12mm; display:inline-flex; align-items:center; gap:9px;
  font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--gold-700); font-weight:700; }
.eyebrow::before{ content:""; width:26px; height:1.5px; background:var(--gold-500); display:inline-block; }
.title{ font-size:42px; line-height:1.1; font-weight:600; margin-top:13px; letter-spacing:-.5px; }
.title em{ font-style:italic; color:var(--gold-700); font-weight:500; }
.promise{ margin-top:16px; font-size:17.5px; line-height:1.5; color:var(--ink-soft); max-width:150mm; }
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

/* ---------- OVERVIEW ---------- */
.pad{ padding:22mm 22mm 18mm; height:100%; display:flex; flex-direction:column; }
.kicker{ font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.h2{ font-size:34px; line-height:1.1; font-weight:600; margin-top:8px; letter-spacing:-.3px; }
.lead{ font-size:14.5px; line-height:1.6; color:var(--ink-soft); margin-top:14px; max-width:150mm; }
.stagelist{ margin-top:16px; display:flex; flex-direction:column; gap:0; }
.srow{ display:flex; align-items:center; gap:16px; padding:12.5px 0; border-bottom:1px solid #e4ded0; }
.srow .n{ font-family:'Fraunces',serif; font-size:26px; font-weight:600; color:var(--teal-500); width:42px; text-align:center; }
.srow .tx b{ font-size:15.5px; font-weight:600; color:var(--ink); }
.srow .tx span{ display:block; font-size:12.5px; color:var(--ink-soft); margin-top:1px; }
.srow .arrow{ margin-left:auto; color:#9a9384; font-size:18px; }
.srow:nth-child(7) .n{ color:var(--gold-500); }
.howto{ margin-top:auto; margin-bottom:2mm; background:var(--surface); border:1px solid #e6e1d4; border-radius:16px; padding:16px 20px; display:flex; gap:18px; }
.howto .ic{ width:44px; height:44px; border-radius:12px; flex:none; display:grid; place-items:center;
  background:linear-gradient(135deg, var(--gold-300), var(--gold-500)); color:#241a06; font-size:22px; }
.howto b{ font-size:14px; }
.howto p{ font-size:12.5px; line-height:1.55; color:var(--ink-soft); margin-top:3px; }

/* ---------- STAGE ---------- */
.stage{ padding:0; height:100%; display:flex; flex-direction:column; background:var(--paper); }
.shead{ position:relative; overflow:hidden; color:var(--ink);
  background:
    radial-gradient(60% 120% at 88% 10%, rgba(233,193,95,.26), transparent 60%),
    linear-gradient(140deg, #f1eee5, #f6f4ee);
  border-bottom:1px solid #e6e1d4;
  padding:20mm 22mm 15mm; }
.shead .tag{ font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--gold-700); font-weight:600; }
.shead .big{ position:absolute; right:16mm; top:6mm; font-family:'Fraunces',serif; font-size:150px; font-weight:600;
  line-height:1; color:transparent; -webkit-text-stroke:1.5px rgba(168,132,42,.35); }
.shead h1{ font-family:'Fraunces',serif; font-size:44px; font-weight:600; margin-top:10px; letter-spacing:-.4px; }
.shead .sub{ font-size:15px; margin-top:4px; font-style:italic; color:var(--gold-700); }
.sbody{ padding:14mm 22mm 18mm; flex:1; }
.blocklabel{ font-size:11.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:700; margin-bottom:10px; }
.signs{ display:flex; flex-direction:column; gap:9px; margin-bottom:16px; }
.signs div{ position:relative; padding-left:26px; font-size:13.5px; line-height:1.5; color:var(--ink); }
.signs div::before{ content:"✓"; position:absolute; left:0; top:0; color:var(--teal-500); font-weight:700; }
.pquote{ border-left:3px solid var(--teal-400); padding:2px 0 2px 18px; margin:18px 0; }
.pquote p{ font-family:'Fraunces',serif; font-style:italic; font-size:19px; line-height:1.4; color:var(--ink); }
.para{ font-size:13px; line-height:1.62; color:var(--ink-soft); margin-bottom:12px; }
.exercise{ background:var(--surface); border:1px solid #e6e1d4; border-left:4px solid var(--leaf-500);
  border-radius:14px; padding:18px 20px; margin-top:6px; box-shadow:0 12px 30px -24px rgba(22,35,31,.5); }
.exercise .top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
.exercise .top b{ font-size:16px; }
.chip{ font-size:10.5px; font-weight:600; color:var(--accent); background:rgba(126,100,16,.12);
  border-radius:999px; padding:4px 10px; letter-spacing:.02em; }
.exlabel{ font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--gold-700); font-weight:700; }
.steps{ margin-top:12px; display:flex; flex-direction:column; gap:9px; }
.steps li{ list-style:none; display:flex; gap:11px; font-size:12.5px; line-height:1.5; color:var(--ink); }
.steps .num{ flex:none; width:20px; height:20px; border-radius:50%; background:var(--teal-500); color:#fff;
  font-size:11px; font-weight:700; display:grid; place-items:center; }
.reflect{ margin-top:16px; padding-top:14px; border-top:1px solid #e4ded0; display:flex; gap:12px; align-items:flex-start; }
.reflect .q{ font-size:26px; line-height:1; color:var(--teal-500); font-family:'Fraunces',serif; }
.reflect p{ font-size:13px; line-height:1.55; color:var(--ink); font-style:italic; }
.sfoot{ padding:8mm 22mm; display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#9a9384; }
.sfoot .dom{ color:var(--accent); font-weight:600; }
"""

CSS = CSS.replace("/*__FONTS__*/", FONTS)

def stars():
    pts = [(14,18),(30,10),(52,22),(70,14),(84,30),(20,40),(60,44),(90,55),(12,66),(44,70),(76,78),(34,86),(66,90)]
    out = ""
    for i,(x,y) in enumerate(pts):
        s = 1.4 + (i % 3) * 0.7
        op = 0.25 + (i % 4) * 0.12
        out += '<span class="star" style="left:%d%%;top:%d%%;width:%.1fpx;height:%.1fpx;opacity:%.2f"></span>' % (x,y,s,s,op)
    return out

STAGES = [
    ("01","Autopilot","Du wirst gelebt"),
    ("02","Erwachen","Du bemerkst es"),
    ("03","Selbstbeobachtung","Du siehst dir zu"),
    ("04","Emotionale Reifung","Du lässt los"),
    ("05","Schöpferkraft","Du erschaffst bewusst"),
    ("06","Innere Ausrichtung","Kopf, Herz und Handeln"),
    ("07","Meisterschaft","Du gestaltest"),
]

def path_steps():
    heights = [10,15,20,26,31,37,43]
    out = ""
    for i,(num,name,_) in enumerate(STAGES):
        out += (
          '<div class="step">'
          '<div class="bar" style="height:%dmm"></div>'
          '<div class="dot">%s</div>'
          '<div class="lbl">%s</div>'
          '</div>'
        ) % (heights[i], num, name)
    return out

_COVER_MOTIF = ('<div class="hero-photo" style="background-image:url(\'%s\')"></div>' % COVER_PHOTO) \
    if COVER_PHOTO else ('<img class="brain" src="%s">' % BRAIN)

COVER = """
<div class="page cover">
  __MOTIF__
  <div class="inner">
    <div class="brandrow"><img src="__LOGO__"><span class="wm"><span class="wm1">Werde <em>Meister</em></span><span class="wm2"><i></i>Deiner Gedanken<i></i></span></span></div>
    <div class="eyebrow">Kostenloses E-Book</div>
    <h1 class="title serif">Die 7 Stufen<br>der <em>Bewusstseinsentwicklung</em></h1>
    <p class="promise">Der Weg vom <b>Autopilot</b> zur <b>Meisterschaft</b> deiner Gedanken &ndash;
       kompakt erkl&auml;rt, mit einer <b>ersten &Uuml;bung f&uuml;r jede Stufe</b>, die du sofort ausprobieren kannst.</p>
    <div class="bullets">
      <div>Erkenne, auf welcher Stufe du gerade stehst</div>
      <div>Eine konkrete &Uuml;bung f&uuml;r jede der 7 Stufen</div>
      <div>In deinem Tempo &ndash; ohne Guru-Getue</div>
    </div>
    <div class="coverfoot">
      <div class="author"><img src="__HEIKO__"><div><b>Heiko Schwaninger</b><span>Begleiter f&uuml;r Bewusstseinsentwicklung</span></div></div>
      <div class="domain">werdemeisterdeinergedanken.de</div>
    </div>
  </div>
</div>
"""
COVER = COVER.replace("__MOTIF__", _COVER_MOTIF).replace("__LOGO__", LOGO).replace("__HEIKO__", HEIKO)

def overview_rows():
    out = ""
    for num,name,sub in STAGES:
        out += (
          '<div class="srow"><div class="n">%s</div>'
          '<div class="tx"><b>%s</b><span>%s</span></div>'
          '<div class="arrow">&rarr;</div></div>'
        ) % (num.lstrip("0") or "0", name, sub)
    return out

OVERVIEW = """
<div class="page">
 <div class="pad">
  <div class="kicker">Dein &Uuml;berblick</div>
  <h2 class="h2 serif">Eine Reise in 7 Stufen</h2>
  <p class="lead">Bewusstseinsentwicklung verl&auml;uft nicht in einem Sprung, sondern in Stufen.
     Jede baut auf der vorigen auf &ndash; vom automatischen Reagieren bis zum bewussten Gestalten.
     Du musst nichts erzwingen. Finde heraus, wo du stehst, und mach den n&auml;chsten Schritt.</p>
  <div class="stagelist">__ROWS__</div>
  <div class="howto">
    <div class="ic">&#10022;</div>
    <div><b>So nutzt du dieses E-Book</b>
    <p>Lies in Ruhe durch alle Stufen. Nimm dir dann <b>eine einzige &Uuml;bung</b> vor und bleib ein paar Tage dabei &ndash;
       der Wandel entsteht nicht durch Wissen, sondern durch Wiederholung.</p></div>
  </div>
 </div>
</div>
"""
OVERVIEW = OVERVIEW.replace("__ROWS__", overview_rows())

# Zusatz-Styles für Willkommen/Abschluss
CSS += """
.big.gold7{ -webkit-text-stroke-color:rgba(242,212,137,.45); }
.leit{ margin-top:22px; border-left:3px solid var(--teal-400); background:var(--surface);
  border-radius:0 14px 14px 0; padding:16px 22px; box-shadow:0 12px 30px -26px rgba(22,35,31,.5); }
.leit .k{ font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); font-weight:700; }
.leit p{ font-family:'Fraunces',serif; font-style:italic; font-size:19px; color:var(--ink); margin-top:6px; line-height:1.4; }
.cta{ margin-top:auto; border-radius:18px; padding:24px 26px; color:var(--ink); position:relative; overflow:hidden;
  background:linear-gradient(135deg,#f3ead2,#efe6cf); border:1px solid rgba(168,132,42,.45); }
.cta .k{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--gold-700); font-weight:700; }
.cta h3{ font-family:'Fraunces',serif; font-size:23px; font-weight:600; margin-top:7px; }
.cta p{ font-size:13px; color:var(--ink-soft); margin-top:9px; line-height:1.6; max-width:150mm; }
.cta .btn{ display:inline-block; margin-top:15px; background:linear-gradient(135deg,var(--teal-400),var(--leaf-500));
  color:#06231f; font-weight:700; font-size:13px; padding:11px 22px; border-radius:999px; }
.pagenum{ position:absolute; bottom:12mm; right:22mm; font-size:10px; color:#b3ab99; letter-spacing:.05em; }

/* ---------- EINHEITLICHE FUSSZEILE (alle Innenseiten) ---------- */
.pgfoot{ position:absolute; left:22mm; right:22mm; bottom:10mm; display:flex;
  justify-content:space-between; align-items:center; font-size:9.5px; color:#a49c8b;
  letter-spacing:.04em; border-top:1px solid #e8e2d4; padding-top:6px; }
.pgfoot .l{ font-weight:500; }
.pgfoot .r{ display:flex; align-items:baseline; gap:12px; }
.pgfoot .r .dom{ color:#a49c8b; }
.pgfoot .r .pg{ font-family:'Fraunces',serif; font-weight:700; font-size:12px; color:var(--accent);
  min-width:14px; text-align:right; }

/* ---------- INHALTSVERZEICHNIS ---------- */
.toc{ margin-top:22px; }
.trow{ display:flex; align-items:baseline; gap:12px; padding:12.5px 0; }
.trow + .trow{ border-top:1px solid #ece7db; }
.trow .tn{ font-family:'Fraunces',serif; font-weight:600; color:var(--teal-500); font-size:18px;
  width:26px; flex:none; text-align:center; }
.trow.plain .tn{ color:#c9c1b0; font-size:14px; }
.trow .tt{ font-size:15px; color:var(--ink); font-weight:600; }
.trow .tt em{ font-style:normal; color:var(--ink-soft); font-weight:400; }
.trow .dots{ flex:1; align-self:center; border-bottom:1px dotted #cbc4b4; margin:0 4px; height:0; }
.trow .pg{ font-family:'Fraunces',serif; font-size:15.5px; color:var(--ink-soft); font-weight:600;
  min-width:22px; text-align:right; }
.tgroup{ margin:20px 0 2px; font-size:11px; letter-spacing:.18em; text-transform:uppercase;
  color:var(--accent); font-weight:700; }

/* ---------- PERSÖNLICHE SEITE „Warum es diesen Weg gibt" ---------- */
.storyhead{ font-size:25px; line-height:1.2; margin-top:8px; letter-spacing:-.2px; }
.story .stx{ font-size:11.7px; line-height:1.52; color:var(--ink-soft); margin-top:9px; max-width:none; }
.story .stx.first{ margin-top:15px; }
.story .stx em{ font-style:italic; color:var(--ink); }
.story .stx b{ color:var(--ink); font-weight:600; }
.wendepunkt{ margin:15px 0; border-left:3px solid var(--gold-400); background:var(--surface);
  border-radius:0 14px 14px 0; padding:15px 20px; box-shadow:0 12px 30px -26px rgba(22,35,31,.5); }
.wendepunkt .k{ font-size:10.5px; letter-spacing:.16em; text-transform:uppercase;
  color:var(--gold-500); font-weight:700; }
.wendepunkt p{ font-family:'Fraunces',serif; font-style:italic; font-size:17px; color:var(--ink);
  margin-top:6px; line-height:1.4; }
"""

# ---------- Inhalte der 7 Stufen ----------
STAGES_FULL = [
 dict(n="01", title="Autopilot", sub="Du wirst gelebt",
   signs=["Du reagierst oft, bevor du nachdenkst – und ärgerst dich hinterher.",
          "Dieselben Konflikte und Gefühle wiederholen sich, obwohl du sie längst nicht mehr willst.",
          "„So bin ich eben“ – vieles fühlt sich an wie dein Charakter, ist aber Gewohnheit."],
   key="Was du nicht bewusst steuerst, steuert dich.",
   body="Die meisten Menschen leben große Teile ihres Lebens im Autopilot: Sie reagieren, funktionieren und wiederholen – gesteuert von Gewohnheiten und Prägungen, die sie nie bewusst gewählt haben. Das ist kein Fehler, sondern Effizienz deines Gehirns. Zum Problem wird es erst, wenn dieselben Muster dir im Weg stehen. Der erste Schritt ist kein großer – es ist ein <b>Bemerken</b>.",
   ex=dict(title="Der Autopilot-Check", dur="1 Minute · mehrmals täglich",
     steps=["Halte mitten im Alltag kurz inne – an der Ampel, vor dem Griff zum Handy, zwischen zwei Aufgaben.",
            "Frage dich ehrlich: „Handle ich gerade bewusst – oder automatisch?“",
            "Bemerke die Antwort ohne Wertung. Es geht nur ums Sehen, nicht ums Ändern.",
            "Geh dann bewusst weiter – eine Spur wacher als vorher."]),
   refl="Welche Reaktion von dir wiederholt sich, obwohl du sie längst nicht mehr willst?"),

 dict(n="02", title="Erwachen", sub="Du bemerkst es",
   signs=["Zum ersten Mal ertappst du dich dabei, wie du denkst – mitten im Gedanken.",
          "Ein leiser Zweifel taucht auf: „Bin ich wirklich das, was mir da durch den Kopf geht?“",
          "Momente, in denen du spürst: Da ist mehr als nur das Gedankenkarussell."],
   key="Du bist nicht deine Gedanken – du bist der Raum, in dem sie erscheinen.",
   body="Sobald du den Autopiloten bemerkst, geschieht etwas Neues: Du erwachst. Du erkennst, dass da jemand ist, der deine Gedanken wahrnimmt – und dass du nicht deine Gedanken bist, sondern derjenige, der sie bemerkt. Es ist kein spektakuläres Ereignis, sondern ein leises Erkennen: „Oh – ich denke gerade.“ In diesem winzigen Abstand liegt der Beginn deiner Freiheit.",
   ex=dict(title="Die 3-Sekunden-Pause", dur="1 Minute · mehrmals täglich",
     steps=["Halte mitten im Alltag kurz inne – beim Türöffnen, vor dem Griff zum Handy, an der roten Ampel.",
            "Nimm drei ruhige Atemzüge und frage innerlich: „Wer nimmt das hier gerade wahr?“",
            "Erwarte keine Antwort in Worten. Spüre einfach, dass da ein Wahrnehmender ist.",
            "Geh dann bewusst weiter – nur eine Spur wacher als vorher."]),
   refl="Wann hast du schon einmal gespürt, dass du mehr bist als das, was in deinem Kopf abläuft?"),

 dict(n="03", title="Selbstbeobachtung", sub="Du siehst dir zu",
   signs=["Du kannst einen Gedanken bemerken, ohne ihm sofort zu glauben.",
          "Zwischen Reiz und Reaktion entsteht ein kleiner, wertvoller Abstand.",
          "Du erkennst wiederkehrende Muster – und kannst sie beim Namen nennen."],
   key="Was du ruhig beobachten kannst, bestimmt dich nicht mehr blind.",
   body="Nach dem Erwachen beginnt die eigentliche Übung: das ruhige Zusehen. Stell dir vor, du sitzt am Ufer eines Flusses – die Gedanken sind das Wasser, das vorbeizieht. Bisher bist du bei jedem Gedanken hineingesprungen. Der Beobachter bleibt am Ufer sitzen und schaut zu, ohne zu urteilen oder zu kämpfen. Diese Distanz ist kein Wegdrücken – sie ist die ruhige Übersicht, aus der heraus du überhaupt erst wählen kannst.",
   ex=dict(title="Gedanken benennen", dur="10 Minuten",
     steps=["Setz dich hin und beobachte für ein paar Minuten deinen Gedankenstrom.",
            "Gib jedem Gedanken eine schlichte Etikette: „planen“, „erinnern“, „sorgen“, „bewerten“.",
            "Kehre nach jeder Etikette zurück zum ruhigen Beobachten.",
            "Beobachte zum Schluss: Bist du der Gedanke – oder der, der ihn benennt?"]),
   refl="In welchen Situationen reißen dich deine Gedanken am schnellsten mit?"),

 dict(n="04", title="Emotionale Reifung", sub="Du lässt los",
   signs=["Gefühle dürfen da sein, ohne dass du sie sofort wegdrücken musst.",
          "Alte Geschichten verlieren ihren Griff – du lebst weniger aus alten Wunden.",
          "Nach dem Loslassen entsteht Raum: Ruhe, Leichtigkeit, freie Energie."],
   key="Fühlen, was ist – und loslassen, was war.",
   body="Erkennen allein reicht oft nicht – manche Muster sitzen in festgehaltenen Gefühlen und im Körper. Nicht gefühlte Gefühle verschwinden nicht, sie warten. Jetzt reifst du emotional: Du lernst, schwierige Gefühle zu halten statt wegzudrücken, alte Geschichten abzuschließen und Verantwortung für dein Inneres zu übernehmen. Wo etwas losgelassen wird, entsteht Raum – für Ruhe, für Energie, für dich.",
   ex=dict(title="Das Gefühl einladen", dur="10–15 Minuten",
     steps=["Erinnere dich an etwas, das dich noch belastet – wähle bewusst etwas Mittelschweres, nichts Überforderndes.",
            "Spür nach: Wo im Körper meldet sich das Gefühl? Brust, Bauch, Kehle?",
            "Atme sanft in diese Stelle hinein und lass das Gefühl da sein, ohne etwas ändern zu wollen.",
            "Sag innerlich: „Du darfst da sein. Und du darfst gehen.“ Beobachte, wie sich die Intensität wandelt."]),
   refl="Welches Gefühl trägst du vielleicht schon lange mit dir, ohne es je wirklich gefühlt zu haben?"),

 dict(n="05", title="Schöpferkraft", sub="Du erschaffst bewusst",
   signs=["Du wählst Gedanken, die dich tragen – statt nur zu nehmen, was auftaucht.",
          "Aus Absicht wird Handlung: Du setzt deine Ausrichtung in konkrete Schritte um.",
          "Du merkst, dass du dein Selbstbild aktiv formen kannst."],
   key="Du bist nicht nur Beobachter deines Lebens – du bist sein Gestalter.",
   body="Wo Altes gegangen ist, entsteht Raum für Neues. Jetzt wirst du vom Beobachter zum bewussten Gestalter. Gedanken sind formbar: Was du regelmäßig denkst, wird zur Spur, und was zur Spur wird, wird zur Straße. Du wählst nicht länger nur die Gedanken, die dir zufällig einfallen, sondern jene, die dich stärken – und setzt sie in Handlung um. Denn innere Ausrichtung entfaltet ihre Kraft erst im Tun.",
   ex=dict(title="Den Satz umschreiben", dur="15 Minuten · schriftlich",
     steps=["Nimm einen einengenden Glaubenssatz, den du in den letzten Stufen erkannt hast.",
            "Formuliere eine neue, ehrliche Version – glaubwürdig, in der Gegenwart, in deinen Worten.",
            "Prüfe: Fühlt sich der neue Satz erreichbar an? Wenn nicht, mach ihn eine Stufe realistischer.",
            "Schreib ihn auf, platziere ihn sichtbar – und wähle eine kleine Handlung, die zu ihm passt."]),
   refl="Welchen Gedanken würdest du gerne öfter denken – und was hält dich bisher davon ab?"),

 dict(n="06", title="Innere Ausrichtung", sub="Kopf, Herz und Handeln",
   signs=["Denken, Fühlen und Tun zeigen immer öfter in dieselbe Richtung.",
          "Entscheidungen fühlen sich stimmiger und müheloser an.",
          "Andere spüren deine Präsenz – noch bevor du etwas sagst."],
   key="Wenn Kopf, Herz und Handeln an einem Strang ziehen, entsteht echte Kraft.",
   body="Wissen allein verändert wenig – erst wenn Denken, Fühlen und Tun in dieselbe Richtung zeigen, wirst du wirklich frei und wirksam. Viele Menschen denken das eine, fühlen das andere und tun ein drittes; dieser stille Widerspruch kostet enorm viel Energie. Innere Ausrichtung bedeutet, diese Spaltung zu schließen. Aus dieser Stimmigkeit entstehen Präsenz, Ausstrahlung und ruhige Kraft.",
   ex=dict(title="Der Kohärenz-Check", dur="10 Minuten",
     steps=["Denk an eine anstehende Entscheidung oder eine wiederkehrende Situation.",
            "Frage nacheinander: Was denkt mein Kopf? Was fühlt mein Herz? Was tue ich tatsächlich?",
            "Spür, wo diese drei auseinandergehen – dort liegt die Spannung.",
            "Wähle einen kleinen konkreten Schritt, der die drei wieder in Einklang bringt."]),
   refl="In welchem Lebensbereich denkst, fühlst und handelst du gerade nicht stimmig?"),

 dict(n="07", title="Meisterschaft", sub="Du gestaltest",
   signs=["Zwischen Reiz und Reaktion ist Raum – du gestaltest, statt zu reagieren.",
          "Stürme werfen dich noch aus der Bahn – aber du findest immer schneller zurück.",
          "Bewusstsein ist kein Kraftakt mehr, sondern deine natürliche Haltung."],
   key="Du reagierst nicht mehr – du gestaltest. Bewusstsein wird dein Zuhause.",
   body="Meisterschaft ist kein Endpunkt, an dem du „fertig“ bist, sondern eine neue Art zu leben. Du bist nicht länger Spielball deiner Gedanken und Gefühle – du bist der bewusste Raum, aus dem heraus du dein Leben souverän formst. Niemand ist „für immer“ Meister; auch dich werden Tage aus der Bahn werfen. Der Unterschied ist: Du findest schneller zurück. Aus Reagieren wird Gestalten. Aus Getriebensein wird Präsenz.",
   ex=dict(title="Die tägliche Rückkehr", dur="5 Minuten · morgens & abends",
     steps=["Beginne den Tag mit einem bewussten Moment der Stille – noch vor dem ersten Griff zum Handy.",
            "Erinnere dich: „Ich bin der Raum, in dem der Tag geschieht.“",
            "Am Abend: Blicke ohne Wertung zurück. Wo warst du präsent? Wo hat der Autopilot übernommen?",
            "Kein Urteil, nur Bemerken. Die Rückkehr selbst ist die Meisterschaft."]),
   refl="Wer wärst du, wenn deine alten Muster dich nicht mehr steuern würden?"),
]

def stage_page(s, idx, total=7):
    gold = " gold7" if s["n"] == "07" else ""
    signs = "".join("<div>%s</div>" % x for x in s["signs"])
    steps = "".join('<li><span class="num">%d</span><span>%s</span></li>' % (i+1, st)
                    for i, st in enumerate(s["ex"]["steps"]))
    html = """
<div class="page">
 <div class="stage">
  <div class="shead">
    __STARS__
    <div class="big serif%s">%s</div>
    <div class="tag">Stufe %s von 7</div>
    <h1>%s</h1>
    <div class="sub">%s</div>
  </div>
  <div class="sbody">
    <div class="blocklabel">Woran du diese Stufe erkennst</div>
    <div class="signs">%s</div>
    <div class="pquote"><p>„%s“</p></div>
    <p class="para">%s</p>
    <div class="exercise">
      <div class="top"><b>%s</b><span class="chip">%s</span></div>
      <div class="exlabel">Deine erste Übung</div>
      <ul class="steps">%s</ul>
    </div>
    <div class="reflect"><div class="q serif">&rdquo;</div><p>%s</p></div>
  </div>
 </div>
</div>
""" % (gold, s["n"], s["n"], s["title"], s["sub"], signs, s["key"], s["body"],
       s["ex"]["title"], s["ex"]["dur"], steps, s["refl"])
    return html.replace("__STARS__", stars())

WELCOME = """
<div class="page">
 <div class="pad">
  <div class="kicker">Zum Einstieg</div>
  <h2 class="h2 serif">Schön, dass du da bist</h2>
  <p class="lead">Die meisten von uns leben große Teile ihres Lebens im Autopilot: Wir reagieren,
     funktionieren und wiederholen – gesteuert von Gedanken und Mustern, die wir nie bewusst gewählt haben.
     Bewusstseinsentwicklung bedeutet, Schritt für Schritt vom automatischen Reagieren zum bewussten
     Gestalten zu kommen.</p>
  <p class="lead">Dieses E-Book zeigt dir die 7 Stufen dieses Weges kompakt im Überblick. Zu jeder Stufe
     bekommst du drei Erkennungsmerkmale, einen Kerngedanken und eine erste, sofort umsetzbare Übung.
     Du musst nicht alles auf einmal tun – lies in Ruhe, probiere aus, was dich anspricht, und komme
     immer wieder zurück.</p>
  <p class="lead">Es geht nicht um Perfektion. Es geht darum, wacher zu werden – eine Spur bewusster als
     gestern. Genau das ist schon der ganze Anfang.</p>
  <div class="leit">
    <div class="k">Dein Leitgedanke</div>
    <p>„Was du bewusst bemerkst, kann beginnen, sich zu verändern.“</p>
  </div>
 </div>
</div>
"""

STORY = """
<div class="page">
 <div class="pad story">
  <div class="kicker">Warum es diesen Weg gibt</div>
  <h2 class="h2 serif storyhead">Die Ereignisse waren irgendwann vorbei. In meinem Kopf liefen sie weiter.</h2>
  <p class="stx first">Es begann mit einem Mieter, der nicht mehr zahlte. Was wie ein normaler Mietausfall
     aussah, wurde zu einer Kettenreaktion: Er betrieb ein Inkassounternehmen, veruntreute Kundengelder
     und bestellte nebenbei Waren auf meinen Namen. Die Rechnungen landeten bei mir. Er wurde später zu
     sechs Jahren Haft verurteilt — meine Objekte waren da längst in der Versteigerung.</p>
  <p class="stx">Es folgten die Privatinsolvenz und die Insolvenz meiner GmbH. Von außen waren das
     wirtschaftliche Vorgänge. Innen klang es anders. Nicht „ich bin insolvent“, sondern:
     <em>ich bin gescheitert.</em> Aus einem Ereignis war ein Selbstbild geworden.</p>
  <p class="stx">Dazu kamen Jahre mit Verfahren, Terminen und Post, die man nicht öffnen möchte. Wer das
     nie erlebt hat, unterschätzt, was es mit einem Menschen macht. Es ist nicht der einzelne Termin.
     Es ist der Dauerzustand: Über allem hängt etwas, das du nicht steuern kannst und dessen Ausgang
     jemand anderes bestimmt. Irgendwann planst du nicht mehr in Jahren, sondern von Brief zu Brief.</p>
  <p class="stx">Genau dort entstand der Kreislauf, der mich am längsten festgehalten hat: Aus Angst,
     etwas falsch zu machen, schob ich Entscheidungen auf. Durch das Aufschieben wuchs der Druck. Durch
     den Druck wuchs die Angst. Ich war nicht faul. Ich war gelähmt.</p>
  <p class="stx">Arbeit war mein Beruhigungsmittel — teilweise bis tief in die Nacht. Von außen sah das
     nach Leistung aus. Es war Flucht. Solange ich beschäftigt war, musste ich nicht fühlen.</p>
  <p class="stx">Dann starb Lena, meine Lebensgefährtin. Das war der Punkt, an dem meine bisherige Art,
     mit dem Leben umzugehen, endgültig gesprengt wurde. Härter arbeiten ging nicht mehr. Mehr
     kontrollieren ging nicht mehr. Positiv denken wäre Hohn gewesen.</p>
  <p class="stx">Rund zwölf Jahre lief das so. Und irgendwann habe ich den Satz verstanden, um den es in
     allem geht, was ich heute tue:</p>
  <div class="wendepunkt">
    <div class="k">Mein Wendepunkt</div>
    <p>„Die Ereignisse waren real. Aber irgendwann liefen sie hauptsächlich noch in meinem Kopf weiter.“</p>
  </div>
  <p class="stx">Was mir dann geholfen hat, war unspektakulär. Meine erste Meditation war alles andere als
     ruhig: Es juckte, ich war unruhig, die Gedanken liefen ununterbrochen. Erst über den Atem als Anker
     habe ich begriffen, dass ich einen Reiz bemerken kann, ohne sofort darauf zu reagieren. Zwischen Reiz
     und Reaktion entstand ein Abstand. In diesem Abstand hatte ich zum ersten Mal seit Jahren wieder eine Wahl.</p>
  <p class="stx">Von da an ging es Schritt für Schritt. Erst bemerken. Dann zusehen. Dann fühlen, was ich
     jahrelang weggedrückt hatte. Dann wieder handeln — kleine Schritte, nicht die große Wende.</p>
  <p class="stx">Im Rückblick hatte dieser Weg eine Reihenfolge. Ich konnte nichts loslassen, bevor ich es
     überhaupt gesehen hatte. Ich konnte nichts Neues gestalten, solange das Alte noch in mir saß. Genau
     diese Reihenfolge sind die 7 Stufen auf den nächsten Seiten. Kein Modell vom Schreibtisch, sondern der
     Weg, den ich gegangen bin — nur aufgeräumt, damit du ihn nicht im Dunkeln suchen musst.</p>
 </div>
</div>
"""

CLOSING = """
<div class="page">
 <div class="pad">
  <div class="kicker">Wie es weitergeht</div>
  <h2 class="h2 serif">Dein nächster Schritt</h2>
  <p class="lead">Du hast jetzt einen Überblick über die 7 Stufen und zu jeder Stufe eine erste Übung an
     der Hand. Der eigentliche Wandel entsteht nicht durch Wissen, sondern durch Wiederholung: Nimm dir
     eine einzige Übung vor und bleib ein paar Tage dabei.</p>
  <p class="lead">Sei geduldig mit dir. Auch alte Muster haben Jahre gebraucht, um sich zu bilden –
     jeder bewusste Moment ist bereits ein Schritt in die Freiheit. Du musst den Weg nicht in einem
     Sprung gehen. Es reicht, den nächsten Schritt zu machen.</p>
  <div class="leit">
    <div class="k">Dein Ziel</div>
    <p>„Du reagierst nicht mehr – du gestaltest.“</p>
  </div>
  <div class="cta">
    <div class="k">Wenn du tiefer gehen möchtest</div>
    <h3>Der ganze Weg – Stufe für Stufe</h3>
    <p>Im Mitgliederbereich findest du zu jeder Stufe die vollständige Lektion, alle Übungen,
       Reflexionsfragen und ein Arbeitsheft zum Ausfüllen – dein Begleiter vom Autopilot zur Meisterschaft.</p>
    <span class="btn">werdemeisterdeinergedanken.de</span>
  </div>
 </div>
</div>
"""

# ---------- Inhaltsverzeichnis ----------
# Die Seiten sind fixe A4-Blöcke ohne Reflow, daher sind die Seitenzahlen
# deterministisch: Cover=1, Inhalt=2, Einstieg=3, Meine Geschichte=4,
# Überblick=5, Stufe 1–7=6–12, Abschluss=13. Wer die Reihenfolge unten in
# inner/book ändert, muss diese Zahlen mitziehen.
def toc_page():
    def plain(title, sub, pg):
        return ('<div class="trow plain"><span class="tn">&bull;</span>'
                '<span class="tt">%s<em> &middot; %s</em></span>'
                '<span class="dots"></span><span class="pg">%d</span></div>') % (title, sub, pg)
    rows = plain("Zum Einstieg", "Sch&ouml;n, dass du da bist", 3)
    rows += plain("Warum es diesen Weg gibt", "Meine Geschichte", 4)
    rows += plain("Der &Uuml;berblick", "Eine Reise in 7 Stufen", 5)
    rows += '<div class="tgroup">Die 7 Stufen</div>'
    for i, (num, name, sub) in enumerate(STAGES):
        rows += ('<div class="trow"><span class="tn">%s</span>'
                 '<span class="tt">%s<em> &middot; %s</em></span>'
                 '<span class="dots"></span><span class="pg">%d</span></div>') % (
                     num.lstrip("0") or "0", name, sub, 6 + i)
    rows += '<div class="tgroup">Zum Abschluss</div>'
    rows += plain("Wie es weitergeht", "Dein n&auml;chster Schritt", 13)
    return """
<div class="page">
 <div class="pad">
  <div class="kicker">Inhalt</div>
  <h2 class="h2 serif">Inhaltsverzeichnis</h2>
  <p class="lead">Sieben Stufen &ndash; vom Autopilot zur Meisterschaft. Du kannst der Reihe
     nach lesen oder direkt bei der Stufe einsteigen, die dich anspricht.</p>
  <div class="toc">%s</div>
 </div>
</div>
""" % rows

# ---------- Einheitliche Fußzeile (alle Seiten außer Cover) ----------
FOOT = ('<div class="pgfoot"><span class="l">Die 7 Stufen der Bewusstseinsentwicklung</span>'
        '<span class="r"><span class="dom">werdemeisterdeinergedanken.de</span>'
        '<span class="pg">%d</span></span></div>')

def with_footer(page_html, page_num):
    # Fußzeile als direktes Kind von .page (absolut positioniert) unmittelbar
    # vor dessen schließendem </div> einsetzen.
    idx = page_html.rstrip().rfind("</div>")
    return page_html[:idx] + FOOT % page_num + page_html[idx:] + "\n"

def doc(*pages):
    return ("<!doctype html><html lang='de'><head><meta charset='utf-8'>"
            "<style>@page{size:A4;margin:0}</style><style>" + CSS + "</style></head><body>"
            + "".join(pages) + "</body></html>")

stage_pages = [stage_page(s, i) for i, s in enumerate(STAGES_FULL)]
# Reihenfolge = Seitenzahlen (siehe toc_page): Cover, Inhalt, Einstieg, Überblick,
# Stufe 1–7, Abschluss.
inner = [toc_page(), WELCOME, STORY, OVERVIEW] + stage_pages + [CLOSING]
book = [COVER] + [with_footer(p, i + 2) for i, p in enumerate(inner)]

with open(os.path.join(BUILD, "ebook.html"), "w", encoding="utf-8") as f:
    f.write(doc(*book))
print("ebook.html:", len(book), "Seiten")
