#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Buchcover „Werde Meister deiner Gedanken" als PNG.
#
#   python3 tools/pdf/buchcover-png.py        (npm run buchcover)
#
# Gibt die FERTIGE Titelseite (Cover) des Buches als PNG aus – exakt dieselbe
# Gestaltung wie im Buch-PDF, kein Nachbau.
#
# Warum über PDF? Die Cover-Seite ist auf A4 (210×297mm) im DRUCK-Layout gebaut
# (`@page`/`.cover{height:297mm}`, Fuß per `margin-top:auto` an die Seitenkante
# gesetzt). Am Bildschirm wächst die Seite mit dem Inhalt und der Autoren-Fuß
# würde abgeschnitten. Deshalb rendern wir – wie das Buch selbst – im DRUCK-Modus
# zu einer 1-seitigen A4-PDF und rastern diese zu PNG.
#
# Ablauf:
#   1. Buch-HTML mit build-buch.py sicherstellen (`.build/book-wmdg.html`).
#   2. Daraus <head> (Fonts/Styles) + die <section class="cover"> herauslösen.
#   3. Chromium `--print-to-pdf` → genau eine A4-Seite (das Cover).
#   4. PyMuPDF rastert Seite 1 bei DPI (Standard 300) → PNG.
#
# Ausgabe:  content/pdf/Werde-Meister-deiner-Gedanken-Cover.png (2479×3508 @ 300 dpi)
#           Bewusst NICHT unter public/ (Next.js würde es sonst direkt ausliefern) –
#           es liegt neben dem Buch-PDF im geschützten content/pdf/.
#
# Voraussetzung: PyMuPDF  ->  pip install pymupdf
import os, sys, glob, subprocess, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
BUILD = os.path.join(HERE, ".build")
BOOK_HTML = os.path.join(BUILD, "book-wmdg.html")
OUT = os.path.join(ROOT, "content", "pdf", "Werde-Meister-deiner-Gedanken-Cover.png")
DPI = int(os.environ.get("BUCHCOVER_DPI", "300"))


def find_chrome():
    c = os.environ.get("CHROME_BIN")
    if c and os.path.exists(c):
        return c
    for base in [os.environ.get("PLAYWRIGHT_BROWSERS_PATH"), "/opt/pw-browsers"]:
        if not base:
            continue
        for d in sorted(glob.glob(os.path.join(base, "chromium*"))):
            p = os.path.join(d, "chrome-linux", "chrome")
            if os.path.exists(p):
                return p
    from shutil import which
    for name in ("google-chrome", "chromium", "chromium-browser", "chrome"):
        p = which(name)
        if p:
            return p
    raise SystemExit("Kein Chromium/Chrome gefunden. Setze CHROME_BIN oder installiere Chromium.")


def main():
    # 1) Buch-HTML sicherstellen.
    if not os.path.exists(BOOK_HTML):
        print("• baue Buch-HTML (build-buch.py) …")
        subprocess.run([sys.executable, os.path.join(HERE, "build-buch.py")], check=True)

    # 2) <head> + Cover-Section herauslösen.
    html = open(BOOK_HTML, encoding="utf-8").read()
    head = html[html.find("<head>") + 6 : html.find("</head>")]
    i = html.find('<section class="cover">')
    j = html.find("</section>", i) + len("</section>")
    if i < 0 or j < 0:
        raise SystemExit("Cover-Section nicht in book-wmdg.html gefunden.")
    cover = html[i:j]

    doc = (
        "<!doctype html><html><head>" + head +
        "<style>html,body{margin:0;padding:0}</style></head><body>" + cover + "</body></html>"
    )

    os.makedirs(BUILD, exist_ok=True)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    tmp_html = os.path.join(BUILD, ".tmp-buchcover.html")
    tmp_pdf = os.path.join(BUILD, ".tmp-buchcover.pdf")
    open(tmp_html, "w", encoding="utf-8").write(doc)

    # 3) Chromium: Druck-Layout → 1-seitige A4-PDF (wie das Buch).
    chrome = find_chrome()
    subprocess.run(
        [
            chrome, "--headless=new", "--no-sandbox", "--no-pdf-header-footer",
            "--virtual-time-budget=15000",
            "--print-to-pdf=" + tmp_pdf,
            "file://" + tmp_html,
        ],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )

    # 4) PDF → PNG rastern.
    try:
        import pymupdf
    except Exception:
        try:
            import fitz as pymupdf  # ältere PyMuPDF-Versionen
        except Exception:
            raise SystemExit("PyMuPDF fehlt. Installiere es mit:  pip install pymupdf")

    pdf = pymupdf.open(tmp_pdf)
    zoom = DPI / 72.0
    pix = pdf[0].get_pixmap(matrix=pymupdf.Matrix(zoom, zoom))
    pix.save(OUT)
    pdf.close()

    for f in (tmp_html, tmp_pdf):
        try:
            os.remove(f)
        except OSError:
            pass

    rel = os.path.relpath(OUT, ROOT)
    print("✓ %s (%d×%d, A4 @ %d dpi)" % (rel, pix.width, pix.height, DPI))


if __name__ == "__main__":
    main()
