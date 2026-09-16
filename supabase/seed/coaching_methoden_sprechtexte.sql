-- Seed: Sprechtexte fuer Trance- & Hypnose-Methoden (Inhaltsversion 1.5)
-- Idempotent: setzt nur die Spalte sprechtext anhand des Slugs.
-- Ueberschreibt NICHT eigene_notizen oder aktiv.

update public.coaching_methoden set sprechtext = $sp$[Kein Vorlese-Skript im engeren Sinn – gesprochene Bausteine, um Trance zu bemerken, zu benennen und zu bestätigen. In ruhigem, langsamem Ton.]

Benennen (pacing):
„Und während Sie da so sitzen … kann ich sehen, wie Ihr Atem ruhiger wird … die Schultern ein wenig tiefer sinken … Ihr Blick vielleicht etwas weicher wird …"

Bestätigen (ratifizieren):
„Genau so … nichts müssen Sie tun … es geschieht ganz von selbst … und das ist völlig richtig so."

Vertiefend anschließen:
„Und mit jedem Ausatmen … darf dieses Ankommen ein wenig deutlicher werden …"

[Erinnerung: Trancezeichen sind u. a. verlangsamter Lidschlag, Gesichtsentspannung, ruhigerer Atem, weniger Bewegung, verzögerte Antworten. Erst kalibrieren, dann utilisieren.]$sp$ where slug = $sp$trancezeichen-erkennen-und-kalibrieren$sp$;
update public.coaching_methoden set sprechtext = $sp$[Pre-Talk vor jeder Trancearbeit – normale, wache Gesprächsstimme.]

„Bevor wir beginnen, möchte ich Ihnen kurz erklären, was Trance ist – und was sie nicht ist. Trance ist ein ganz natürlicher Zustand, den Sie jeden Tag erleben: kurz vor dem Einschlafen, beim Vertieftsein in ein Buch, beim Autofahren auf bekannter Strecke. Nichts Magisches, nichts Fremdes.

Wichtig ist: Sie bleiben die ganze Zeit Sie selbst. Sie hören mich, Sie können sprechen, sich bewegen, und Sie können jederzeit die Augen öffnen und die Trance beenden, wenn Sie das möchten. Ich kann Sie zu nichts bringen, was Ihren Werten widerspricht – Trance ist Zusammenarbeit, keine Fremdsteuerung.

Sie geben mir mit einem kurzen Nicken ein Zeichen, wenn etwas unangenehm wird – dann passen wir es an oder hören auf. Ist das für Sie in Ordnung? … Gut. Dann machen Sie es sich bequem, und wir beginnen in Ihrem Tempo."

[Vorher klären: Kontraindikationen (akute Psychose, dissoziative Störungen, schwere Traumafolgen → Fachtherapie), Medikamente, Vorerfahrungen, Erwartungen.]$sp$ where slug = $sp$rahmen-aufklaerung-und-sicherheit-bei-trancearbeit$sp$;
update public.coaching_methoden set sprechtext = $sp$[Langsam, gleichmäßig, mit deutlichen Pausen. Klient hat einen festen Punkt gewählt.]

„Suchen Sie sich einen Punkt … etwas oberhalb der Augenhöhe … und lassen Sie den Blick einfach dort ruhen. … Sie müssen nichts tun … nur schauen … und mir zuhören.

Während Sie den Punkt betrachten … werden die Augen vielleicht ein wenig müde … das ist gut so. … Die Lider können schwerer werden … mit jedem Atemzug ein kleines bisschen schwerer …

Vielleicht beginnt der Punkt zu verschwimmen … die Augen möchten am liebsten blinzeln … und irgendwann … von ganz allein … möchten sie sich schließen. … Sie müssen es nicht erzwingen … Sie dürfen einfach abwarten, wann es so weit ist.

Und wenn die Augen sich schließen wollen … dann lassen Sie sie zufallen … und mit dem Schließen der Augen … sinken Sie ein Stück tiefer … in eine angenehme Ruhe. … Genau so. … Angekommen."

[Weiter mit einer Vertiefungstechnik.]$sp$ where slug = $sp$fixationsinduktion-blickfixation$sp$;
update public.coaching_methoden set sprechtext = $sp$[Mehrere kurze Zyklen hinein/heraus. Ruhig, mit klaren Übergängen.]

Hinausführen:
„In einem Moment bitte ich Sie, die Augen zu öffnen … ganz kurz nur … Öffnen Sie die Augen. …"

Zurückführen (sofort):
„Und schließen Sie sie wieder … und beim Schließen der Augen bemerken Sie … wie viel leichter es jetzt geht … wie angenehm es ist, wieder nach innen zu gehen … doppelt so tief wie eben. …"

[Zyklus 2–3× wiederholen, jedes Mal mit der Suggestion der Vertiefung:]
„Und wieder heraus … Augen auf. … Und wieder hinein … Augen zu … noch tiefer … jedes Mal fällt es leichter … jedes Mal wird die Ruhe angenehmer …

Und Sie merken: Sie selbst steuern das. … Ihr Körper weiß bereits, wie dieser Zustand geht … und er findet ihn jedes Mal schneller."

[Nach dem letzten Zyklus in die Nutzungsphase übergehen.]$sp$ where slug = $sp$fraktionierung$sp$;
update public.coaching_methoden set sprechtext = $sp$[Grundhaltung, keine feste Formel: alles Auftauchende wird eingebaut. Beispielformulierungen:]

Bei Unruhe/Bewegung:
„Und diese Unruhe im Körper … die darf da sein … vielleicht ist sie sogar der erste Hinweis darauf, dass sich etwas bewegen möchte … und mit jedem Zappeln … darf ein Stück davon abfließen …"

Bei Geräuschen von außen:
„Und die Geräusche draußen … das Auto, die Stimmen … müssen Sie gar nicht ausblenden … jedes Geräusch, das Sie hören … kann Sie sogar noch ein Stück tiefer nach innen führen …"

Bei Skepsis:
„Und ein Teil von Ihnen beobachtet das kritisch … prüft, ob das funktioniert … und dieser aufmerksame Teil darf ruhig weiter beobachten … während ein anderer Teil längst begonnen hat, sich zu entspannen …"

[Prinzip: nie gegen den Widerstand arbeiten – ihn zur Brücke machen.]$sp$ where slug = $sp$utilisation$sp$;
update public.coaching_methoden set sprechtext = $sp$[Nach der Induktion. Sehr langsam, absteigende Stimmführung.]

Treppe:
„Stellen Sie sich eine Treppe vor … zehn Stufen … die hinabführen in einen besonders ruhigen Ort. … Mit jeder Stufe, die wir gemeinsam hinabgehen … wird die Ruhe tiefer.

Zehn … der erste Schritt … schon ein wenig tiefer. … Neun … tiefer … acht … das Gewicht des Körpers wird spürbarer … sieben … sechs … alles wird schwerer und ruhiger … fünf … die Hälfte … vier … immer weiter … drei … fast angekommen … zwei … und eins. … Ganz unten. … Angekommen an einem sicheren, ruhigen Ort.

Und hier … darf der Körper schwer werden … der Atem geht von allein … und jeder Ausatemzug trägt Sie noch ein wenig tiefer."

[Alternativen: Zählen, Körperschwere, Atemkopplung, Zeitdehnung – je nach Klient wählen.]$sp$ where slug = $sp$vertiefungstechniken$sp$;
update public.coaching_methoden set sprechtext = $sp$[Nach ausreichender Trance. Ruhig, geduldig, viel Zeit lassen.]

„Ihr Unbewusstes weiß Dinge, die der wache Verstand nicht immer kennt … und es kann mir antworten … ganz ohne Worte … über kleine Bewegungen Ihrer Finger.

Ich möchte Ihr Unbewusstes bitten … einen Finger auszuwählen für ‚Ja'. … Nehmen Sie sich Zeit … und irgendwann … von ganz allein … wird sich ein Finger bewegen … heben … zittern vielleicht … Sie müssen es nicht machen … lassen Sie es geschehen. … Gut. Das ist das Ja.

Und nun einen anderen Finger für ‚Nein'. … Warten Sie einfach ab … welcher sich meldet. … Danke.

[Fragen immer geschlossen und respektvoll stellen:]
„Ist es für dich in Ordnung, heute an diesem Thema zu arbeiten? … Lass den passenden Finger antworten."

[Immer auch einen Finger für ‚Ich möchte jetzt nicht antworten' anbieten. Antworten nie überinterpretieren.]$sp$ where slug = $sp$ideomotorische-signale$sp$;
update public.coaching_methoden set sprechtext = $sp$[Klassischer ericksonscher Konvinzer. Aufmerksam auf kleinste Bewegungen reagieren.]

„Richten Sie Ihre Aufmerksamkeit auf Ihre rechte Hand … die dort ruht. … Vielleicht spüren Sie den Kontakt zur Unterlage … die Temperatur … vielleicht ein leichtes Kribbeln in den Fingerspitzen …

Und während Sie das beobachten … kann es sein, dass einer der Finger sich ein winziges bisschen leichter anfühlt als die anderen … Sie wissen noch nicht, welcher … und Sie müssen es auch nicht wissen …

[Sobald eine Mikrobewegung sichtbar wird, sie aufgreifen:]
Genau … dort beginnt es … und diese Leichtigkeit … kann sich ausbreiten … als würde ein unsichtbarer Faden die Hand sanft nach oben ziehen … ein kleines Stück … von ganz allein … Ihr bewusster Wille braucht gar nichts zu tun …

Und je höher die Hand steigt … desto tiefer sinken Sie in die Ruhe. … Und wenn die Hand ihren Weg gefunden hat … kann sie langsam wieder sinken … und mit ihr … gehen Sie noch tiefer."

[Zeigt dem Klienten: unwillkürliche Prozesse sind möglich.]$sp$ where slug = $sp$handlevitation$sp$;
update public.coaching_methoden set sprechtext = $sp$[Am Ende der Nutzungsphase. Erst die Brücke in den Alltag, dann klar ausleiten.]

Posthypnotische Suggestion:
„Und alles, was Sie hier erfahren haben … nehmen Sie mit. … Immer, wenn Sie in den kommenden Tagen … einen ruhigen Atemzug nehmen … und die Füße bewusst auf dem Boden spüren … kehrt ein Teil dieser Ruhe zurück … zuverlässig … von allein."

Ausleitung:
„In einem Moment werde ich von eins bis fünf zählen … und mit jeder Zahl kommen Sie ein Stück mehr zurück … frisch, wach und wohl.

Eins … die Energie kehrt in den Körper zurück. … Zwei … Sie bemerken die Geräusche im Raum wieder. … Drei … bewegen Sie sanft Finger und Zehen … recken und strecken. … Vier … der Kopf wird klar, wach und aufmerksam. … Und fünf … die Augen öffnen sich … ganz da … vollständig zurück … wach und erfrischt."

[Kurz nachbesprechen; sicherstellen, dass der Klient wieder voll orientiert ist.]$sp$ where slug = $sp$posthypnotische-suggestion-und-ausleitung$sp$;
update public.coaching_methoden set sprechtext = $sp$[Keine formelle Induktion – Umschalten zwischen Problem- und Lösungstrance. Beispieltext:]

Problemtrance würdigen:
„Wenn dieses Problem gerade ganz da ist … wie sitzen Sie dann? … Wohin geht der Blick? … Welcher innere Film läuft? … Merken Sie, wie schnell dieser Zustand sich einstellt? … Das ist eine echte Leistung Ihres Systems – es hat gelernt, das zuverlässig herzustellen."

Umschalten anbieten:
„Und jetzt lade ich Sie ein … eine andere Haltung einzunehmen … richten Sie sich ein wenig auf … der Blick hebt sich … Und erinnern Sie sich an einen Moment, in dem Sie sich wirklich lebendig und kompetent gefühlt haben. …

Was sehen Sie da? … Was hören Sie? … Wie fühlt sich der Körper jetzt an? … Bleiben Sie einen Moment ganz in diesem Zustand … das ist Ihre Lösungstrance.

Und Sie haben gerade selbst erlebt: Sie können umschalten. … Was ist das kleinste Zeichen, an dem Sie künftig merken: Jetzt ist der Moment zu wechseln?"

[Ressourcenzustand ankern und in den Alltag übersetzen.]$sp$ where slug = $sp$hypnosystemische-problem-und-loesungstrance$sp$;
update public.coaching_methoden set sprechtext = $sp$[In guter Trance. Ziel vorher konkret geklärt. Langsam, bildhaft.]

„Und während Sie so ruhig hier sind … lade ich Sie ein zu einer kleinen Reise in die Zeit. … Nach vorn … zu einem Tag, an dem das, was Sie sich wünschen … bereits Wirklichkeit ist.

Sie müssen den Weg dorthin nicht kennen … lassen Sie sich einfach hintragen … an diesen zukünftigen Tag … an dem Ihr Ziel erreicht ist.

Und nun sind Sie dort. … Schauen Sie sich um. … Wo sind Sie? … Was sehen Sie um sich herum? … Was hören Sie? … Und vor allem: Wie fühlt es sich an … in Ihrem Körper … jetzt, wo es gelungen ist? … Nehmen Sie dieses Gefühl ganz in sich auf.

Und von diesem Punkt in der Zukunft … blicken Sie einmal zurück … auf den Weg, der hierher geführt hat. … Was war der erste Schritt? … Was hat wirklich geholfen? … Was würden Sie dem Menschen von heute raten? …

Merken Sie sich diese Antworten … und bringen Sie sie mit zurück … in die Gegenwart … wo dieser erste Schritt auf Sie wartet."

[Erkenntnisse nach der Ausleitung sichern.]$sp$ where slug = $sp$zukunftsprogression-in-trance$sp$;
update public.coaching_methoden set sprechtext = $sp$[Anleitung, die der Klient später selbst spricht/denkt – Betty-Erickson-Methode.]

„Setzen oder legen Sie sich bequem hin. … Nehmen Sie sich vor, in – sagen wir – zehn Minuten wieder zurück zu sein; Ihr innerer Wecker hält das ein.

Benennen Sie nun still drei Dinge, die Sie sehen … drei Dinge, die Sie hören … drei Dinge, die Sie spüren. … Dann zwei … zwei … zwei. … Dann eines … eines … eines. … Danach dürfen die Augen sich schließen.

Und jetzt stellen Sie sich Ihren ruhigen Ort vor … mit allen Sinnen. … Und Sie geben sich Ihre Formel: ‚Mit jedem Ausatmen … werde ich ruhiger und klarer.'

Bleiben Sie so lange, wie es guttut. … Zum Zurückkommen zählen Sie für sich von eins bis fünf … und öffnen bei fünf die Augen … wach und erfrischt."

[Klienten üben lassen, kurze tägliche Praxis empfehlen.]$sp$ where slug = $sp$selbsthypnose-anleiten$sp$;
update public.coaching_methoden set sprechtext = $sp$[Grundstufe, Standardformeln. Ruhig, monoton, jede Formel 2–3× wiederholen.]

„Ich bin ganz ruhig … ganz ruhig.

Der rechte Arm ist schwer … ganz schwer. … Der linke Arm ist schwer … beide Arme sind angenehm schwer. … Beide Beine sind schwer … der ganze Körper ist schwer und ruhig.

Der rechte Arm ist warm … angenehm warm. … Beide Arme sind warm … beide Beine sind warm … eine angenehme Wärme durchströmt den Körper.

Das Herz schlägt ruhig und gleichmäßig.

Die Atmung ist ruhig und gleichmäßig … es atmet mich.

Das Sonnengeflecht ist strömend warm.

Die Stirn ist angenehm kühl.

[Zurücknehmen – immer mit Aktivierung abschließen:]
Arme fest anspannen … tief einatmen … Augen auf. … Zurück, wach und frisch."

[Die Rücknahme nie auslassen. Nicht direkt vor Aktivität, bei der Wachheit nötig ist, ohne Rücknahme beenden.]$sp$ where slug = $sp$autogenes-training$sp$;
update public.coaching_methoden set sprechtext = $sp$[Nur mit Ausbildung. Bewusst mehrdeutig/verwirrend, dann klare Suggestion. Beispiel Zeit-Konfusion:]

„Und Sie wissen ja nicht genau … ob die Ruhe, die jetzt kommt … die ist, die schon vorhin da war … oder die, die gleich kommt … denn was vorhin noch später war … ist jetzt schon fast vorbei … und während Sie noch überlegen, was zuerst kam …

[Im Moment der Verwirrung die klare Suggestion setzen:]
… können Sie jetzt einfach … loslassen … und tief nach innen sinken. … Genau so. … Ganz ruhig."

[Prinzip: den analytischen Verstand kurz überladen, dann sofort die einfache, klare Zielsuggestion anbieten. Sparsam und nur bei passenden Klienten einsetzen; bei Verunsicherung sofort auf klare, stützende Sprache wechseln.]$sp$ where slug = $sp$konfusionstechnik-und-ueberladung$sp$;
