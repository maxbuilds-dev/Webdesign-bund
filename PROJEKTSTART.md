# Projektstart: neue Kundenwebsite

Diese Datei ist die Anleitung für dich, Max. Sie fasst zusammen, was beim Aufbau
von webdesign-bund.at gelernt wurde, damit das nächste Projekt in einem Durchgang
statt in zwanzig Runden entsteht.

Der Ablauf hat drei Schritte:

1. Daten beim Kunden einsammeln, siehe Abschnitt 1
2. Grundgerüst aus `.vorlage/` kopieren, siehe Abschnitt 2
3. `CLAUDE.md` ausfüllen, siehe Abschnitt 3
4. Den Prompt aus Abschnitt 4 ausfüllen und abschicken

---

## 1. Was du vor dem ersten Prompt brauchst

Ohne diese Angaben entstehen Platzhalter, und Platzhalter kosten dich später
mehrere Runden. Frag sie beim Erstgespräch komplett ab.

### Rechtliches, Pflicht für das Impressum nach ECG § 5

| Feld | Wo der Kunde es findet |
|---|---|
| Vollständiger Name oder Firmenwortlaut | Gewerbeschein |
| Rechtsform | Einzelunternehmen, GmbH, KG, OG |
| Anschrift mit PLZ und Ort | |
| Mailadresse | |
| Telefonnummer | optional, aber bei lokalen Kunden empfehlenswert |
| Gewerbewortlaut, genau wie angemeldet | GISA-Auszug |
| GISA-Zahl | GISA-Auszug oder gisa.gv.at |
| Zuständige Gewerbebehörde | meist die Bezirkshauptmannschaft |
| Fachgruppe der Wirtschaftskammer | WKO-Mitgliedsschreiben oder firmen.wko.at |
| Firmenbuchnummer und Firmenbuchgericht | nur falls eingetragen |
| UID-Nummer | entfällt bei Kleinunternehmerregelung |
| Kleinunternehmer nach § 6 Abs. 1 Z 27 UStG | ja oder nein |

**Rate nie.** Ein falscher Eintrag im Impressum ist schlechter als ein offener
Platzhalter. Wenn der Kunde etwas nicht weiß, schick ihn zur WKO, dort gibt es
kostenlose Auskunft.

### Inhalte

- Welche Abschnitte und in welcher Reihenfolge
- Texte, oder die Freigabe, dass du sie schreibst
- Bilder in ordentlicher Auflösung, Logo möglichst als SVG
- Referenzen oder Projekte, die gezeigt werden dürfen
- Öffnungszeiten, Anfahrt, Social Media, falls vorhanden

### Technische Entscheidungen, die der Kunde treffen muss

- **Kontaktformular:** Mailprogramm öffnen (kostenlos, kein Server) oder
  Formulardienst wie Formspree (echtes Formular, Drittanbieter im Datenschutz)
- **Statistik:** Besucherzahlen gewünscht? Wenn ja, wird ein Drittanbieter nötig
  und die Seite verliert das Argument "keine Verbindung nach außen"
- **Karte oder Videos:** Google Maps, YouTube, Vimeo eingebettet? Jedes davon
  braucht eine eigene Kategorie im Zustimmungsmanager
- **Domain:** vorhanden oder neu, und bei welchem Anbieter

---

## 2. Grundgerüst kopieren

Im Ordner `.vorlage/` liegt ein fertiges, getestetes Grundgerüst mit der
kompletten Sicherheits- und Rechtsmaschinerie, ohne Gestaltung.

```bash
cp -r .vorlage/. ../neues-projekt/
grep -rn "PLATZHALTER" .
```

Darin enthalten: Content Security Policy, Zustimmungsmanager mit Kategorien,
verschleierte Mailadresse, Kontaktformular mit Bot-Falle, Notfall-Stile ohne
JavaScript, Impressum, Datenschutz, Fehlerseite, robots.txt, sitemap.xml und
eine ausfüllbare `CLAUDE.md`. Einzelheiten in `.vorlage/LIESMICH.md`.

Wenn du das Grundgerüst verwendest, überspringst du in Abschnitt 3 alles unter
SICHERHEIT und die beiden Rechtsblöcke. Es genügt dann der Satz:
"Baue auf dem Grundgerüst aus .vorlage auf, die Sicherheitsvorgaben bleiben."

## 3. CLAUDE.md ins Repo legen

Lege diese Datei als `CLAUDE.md` ins leere Repo, **bevor** du den Prompt
abschickst. Ich lese sie automatisch und muss dann nicht jedes Mal nachfragen.

```markdown
# <Kundenname>: Project Context

## Business
- Owner: <Name>, <Rechtsform>
- Address: <Straße>, <PLZ Ort>, Austria
- Gewerbe: <Gewerbewortlaut>, GISA <Zahl>, Behörde <BH>
- WKO: <Fachgruppe>
- Kleinunternehmer: <ja/nein>
- Domain: <domain.at>
- Contact: <mail>, <telefon>

## Audience
<Wer soll überzeugt werden, und wovon>

## Tone of voice
German (de-AT), formal "Sie". <sachlich und präzise / warm und persönlich>.
Keine Agenturfloskeln, keine Superlative. Alle Behauptungen müssen
überprüfbar sein.

## Tech stack
Plain HTML, CSS, JavaScript. Kein Framework, kein Build-Schritt, keine npm
Abhängigkeiten. Deployment über GitHub Pages.

## Nicht ohne Rückfrage ändern
- Schriften liegen selbst gehostet in assets/fonts/, nie das Google CDN
- Content Security Policy als meta-Tag auf jeder Seite
- Zustimmungsmanager: gleich große Schaltflächen, Widerruf in der Fußzeile,
  nichts Externes lädt vor der Zustimmung
- Datenschutzerklärung muss bei jeder technischen Änderung mitwandern

## Git
Direkt auf main arbeiten, kein Feature-Branch, kein Pull Request.
```

---

## 4. Der Prompt

Kopieren, die Klammern ausfüllen, abschicken. Alles in einem Stück.

```text
Baue eine komplette Website für <Kundenname>, <Branche>, in <Ort>.

ZIEL
<Was die Seite erreichen soll, ein bis zwei Sätze. Beispiel: Anfragen für
Terminbuchungen erzeugen, Zielgruppe sind Privatkunden ab 40.>

STACK
Reines HTML, CSS und JavaScript. Kein Framework, kein Build-Schritt, keine
npm Abhängigkeiten. Deployment über GitHub Pages. Arbeite direkt auf main.
Struktur:
  index.html, impressum.html, datenschutz.html, 404.html
  robots.txt, sitemap.xml, CNAME im Wurzelverzeichnis
  css/style.css, css/fonts.css, css/nojs.css
  js/script.js
  assets/fonts/, assets/img/

DESIGN
<Hell oder dunkel>. Grundfarbe <Hex>, Akzent <Hex>.
Überschriften <Schrift>, Fließtext <Schrift>.
Schriften selbst hosten, niemals über das Google CDN einbinden.
Alle Farben und Abstände als CSS-Variablen ganz oben in style.css.
Mobile First, Prüfung bei 390 Pixel Breite.
prefers-reduced-motion schaltet alle Animationen ab.

ABSCHNITTE
1. <Hero: Kernaussage und Handlungsaufforderung>
2. <...>
3. <...>
Einseitig mit Ankernavigation, smooth scroll, kein Router.

SPRACHE
Deutsch, durchgehend Sie. <Tonalität>.
<Optional: Keine Gedankenstriche im sichtbaren Text, statt dessen Komma,
Punkt oder Doppelpunkt. Auch keine Bindestriche in zusammengesetzten
Wörtern, also Mail statt E-Mail.>

KONTAKTFORMULAR
Felder: <Liste>. <Alle Pflicht / diese optional: ...>
Jedes Feld mit grauem Platzhalter, passend zur Spalte.
Versand über <mailto, öffnet das Mailprogramm / Formspree>.
Unsichtbares Honigtopf-Feld gegen einfache Bots.
Fehlermeldung nennt die fehlenden Felder beim Namen.

IMPRESSUM, echte Daten, keine Platzhalter
  Name: <...>
  Rechtsform: <...>
  Anschrift: <...>
  Mail: <...>
  Telefon: <...>
  Gewerbewortlaut: <...>
  GISA-Zahl: <...>
  Gewerbebehörde: <...>
  WKO-Fachgruppe: <...>
  Firmenbuch: <Nummer und Gericht, oder entfällt>
  UID: <Nummer, oder entfällt wegen Kleinunternehmerregelung>
  Umsatzsteuer: <Kleinunternehmer nach § 6 Abs. 1 Z 27 UStG / regulär>
Struktur nach ECG § 5 und MedienG § 25, inklusive Blattlinie,
Streitbeilegung, Haftung und Urheberrecht.

DATENSCHUTZ
Nach DSGVO. Muss den tatsächlichen Stand der Seite beschreiben, nicht eine
Vorlage. Jeder Cookie mit Name, Inhalt, Laufzeit und Rechtsgrundlage.
Bei jeder technischen Änderung mitziehen.

COOKIES UND EXTERNE INHALTE
Zustimmungsmanager mit zwei Ansichten: kurze Abfrage und Einstellungen.
Kategorien: <Notwendig; und je nach Bedarf Statistik, Externe Inhalte>
Pflichten:
  - alle Schaltflächen exakt gleich groß und gleich stark hervorgehoben
  - Ablehnen auf der ersten Ebene, nicht versteckt hinter Einstellungen
  - optionale Kategorien stehen beim Öffnen auf aus
  - Widerruf jederzeit über eine Schaltfläche in der Fußzeile
  - Escape gilt als Ablehnung, nicht als stille Zustimmung
  - Zustimmung mit Datum und Versionsnummer speichern
  - nichts Externes lädt vor der Zustimmung, kein Skript, kein iframe,
    kein Bild. Erzeuge eingebettete Inhalte erst zur Laufzeit.
  - Kategorien als Datenstruktur anlegen, damit sie erweiterbar sind
  - Fokus bleibt im Dialog, Schalter sind echte Eingabefelder

SICHERHEIT
  - keine Secrets im Repo, auch keine Schlüssel im Client-Code
  - Content Security Policy als meta-Tag auf jeder Seite,
    default-src 'none', dazu 'self' für Skript, Stil und Schrift.
    Folglich keine style-Attribute und keine script-Blöcke im HTML.
  - keine externen Abhängigkeiten, alles selbst hosten
  - rel="noopener" bei jedem target="_blank"
  - Mailadresse auf der Startseite per JavaScript zusammensetzen,
    im Impressum bleibt sie im Klartext, ECG § 5 verlangt das
  - css/nojs.css über noscript einbinden, damit ohne JavaScript
    nichts unsichtbar bleibt

ABSCHLUSS
Prüfe mit einem echten Browser bei 1440 und 390 Pixel:
keine CSP-Verstöße, keine JavaScript-Fehler, kein horizontaler Überlauf,
keine externen Verbindungen vor der Zustimmung, Formular erzeugt die
richtige Ausgabe, alle Ankerlinks finden ihr Ziel, Unterseiten liefern 200.
Zeig mir am Ende eine Vorschau, die ich anschauen kann.
```

---

## 5. Was du danach noch selbst machen musst

Das liegt außerhalb des Codes, das kann ich nicht für dich erledigen:

1. **GitHub Pages einschalten:** Settings, Pages, Source auf `main`
2. **Domain eintragen:** Settings, Pages, Custom domain
3. **DNS beim Anbieter:** vier A-Records auf die GitHub-Adressen,
   oder ein CNAME für die www-Variante. Aktuelle Adressen stehen in der
   GitHub-Dokumentation, sie ändern sich gelegentlich.
4. **Enforce HTTPS** anhaken, sobald die Domain verbunden ist. Nicht vergessen,
   sonst läuft die Seite unverschlüsselt und Browser warnen.

---

## 6. Prüfliste vor dem Livegang

- [ ] Impressum vollständig, keine Platzhalter, Daten vom Kunden bestätigt
- [ ] Datenschutz beschreibt den tatsächlichen Stand, nicht eine Vorlage
- [ ] Jeder Cookie ist mit Name, Laufzeit und Zweck dokumentiert
- [ ] Vor der Zustimmung geht nachweislich keine Verbindung nach außen
- [ ] Ablehnen ist genauso leicht wie Zustimmen
- [ ] Widerruf über die Fußzeile funktioniert
- [ ] Auf dem Handy geprüft, kein seitliches Scrollen
- [ ] Ohne JavaScript ist die Seite noch lesbar
- [ ] Alle Links funktionieren, auch die im Impressum
- [ ] Enforce HTTPS aktiv
- [ ] Rechtsseiten von jemandem gegengelesen, der dafür haftet

---

## 7. Fehler aus diesem Projekt, die du kennen solltest

**Dateipfade vor dem Launch prüfen.** Im ersten Stand zeigte `index.html` auf
`css/` und `js/`, die Dateien lagen aber im Wurzelverzeichnis. Live wäre die
Seite ohne Design und ohne Funktion erschienen.

**Die Datenschutzerklärung wandert nicht von selbst mit.** Zweimal ist sie in
diesem Projekt hinter dem tatsächlichen Stand zurückgeblieben, einmal beim
Formularumbau, einmal bei der eingebetteten Vorschau. Nach jeder technischen
Änderung nachlesen.

**Ohne JavaScript war die halbe Seite leer.** Die Einblend-Animation setzt
Elemente auf unsichtbar und JavaScript schaltet sie frei. Ohne JavaScript
passiert das nie. Deshalb `css/nojs.css` über `noscript`.

**Die Content Security Policy blockiert still.** Nach dem Einbau funktionieren
`style="..."` im HTML und `<script>`-Blöcke nicht mehr. Es gibt keine
Fehlermeldung, es passiert einfach nichts. Neues CSS gehört nach `css/`,
neues JavaScript nach `js/`.

**Nicht parallel auf GitHub arbeiten.** Solange ich an einem Projekt arbeite,
erzeugt jede direkte Änderung im GitHub-Editor einen Konflikt. Sag mir die
Änderung stattdessen im Chat.

**Eingebettete fremde Seiten können blockiert sein.** Manche Server verbieten
per `X-Frame-Options`, dass ihre Seite in einem iframe erscheint. Vor dem
Einbau prüfen, sonst steht dort später eine Fehlermeldung.

---

## 8. Warum die Voreinstellungen so sind

**Schriften selbst hosten.** Über das Google CDN wandert die Adresse jedes
Besuchers zu Google. Das zwingt dich zu einem Google-Abschnitt im Datenschutz
und macht die Seite langsamer, weil eine zweite Verbindung nötig ist. Selbst
gehostet entfällt beides. Vier Dateien, rund 180 Kilobyte.

**Kontaktformular ohne Server.** Ohne Backend kann kein Formular Daten
entgegennehmen. Der mailto-Weg speichert nichts, kostet nichts und braucht
keinen Drittanbieter im Datenschutz. Nachteil: Besucher ohne eingerichtetes
Mailprogramm landen im Leeren, deshalb steht die Adresse zusätzlich als
normaler Link daneben.

**Content Security Policy als meta-Tag.** GitHub Pages kann keine echten
HTTP-Header senden. Das meta-Tag ist die einzige Möglichkeit und verhindert,
dass eingeschleuster Code Daten nach außen sendet.

**Gleich große Schaltflächen im Zustimmungsmanager.** Aufsichtsbehörden werten
unterschiedliche Hervorhebung zunehmend als unzulässige Beeinflussung. Der
Unterschied kostet dich nichts und ist im Verkaufsgespräch ein Argument.

**Kein Screenshot statt iframe.** Ein Screenshot lädt nichts nach und braucht
keine Zustimmung. Wenn eine Live-Vorschau nicht zwingend nötig ist, ist ein
Bild die einfachere und schnellere Lösung.
