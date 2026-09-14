# Grundgerüst für neue Projekte

Kopiervorlage mit der kompletten Sicherheits- und Rechtsmaschinerie, ohne
Gestaltung und ohne Werbetexte. Getestet und lauffähig.

## Verwenden

```bash
cp -r .vorlage/. ../neues-projekt/
```

Dann in dieser Reihenfolge:

1. Alle `[PLATZHALTER]` ersetzen. Suchbefehl:
   `grep -rn "PLATZHALTER" .`
2. Schriften herunterladen, nach `assets/fonts/`, in `css/fonts.css` eintragen
3. Farben in `css/style.css` ganz oben anpassen
4. Abschnitte in `index.html` ergänzen
5. `CNAME` auf die Domain setzen

## Was schon drin ist

| Baustein | Datei |
|---|---|
| Content Security Policy auf jeder Seite | alle HTML-Dateien |
| Zustimmungsmanager mit Kategorien und Details | `js/script.js`, `css/style.css` |
| Google Maps, blockiert bis zur Freigabe | `index.html`, `js/script.js` |
| YouTube über youtube-nocookie.com, blockiert bis zur Freigabe | `index.html`, `js/script.js` |
| Mailadresse gegen Spam-Sammler verschleiert | `index.html`, `js/script.js` |
| Kontaktformular ohne Server, mit Bot-Falle | `index.html`, `js/script.js` |
| Notfall-Stile ohne JavaScript | `css/nojs.css` |
| Impressum nach ECG § 5 und MedienG § 25 | `impressum.html` |
| Datenschutz nach DSGVO | `datenschutz.html` |
| Fehlerseite, robots.txt, sitemap.xml | Wurzelverzeichnis |
| Sprunglink, Tastaturbedienung, reduzierte Bewegung | `css/style.css` |

## Drei Regeln, die du nicht brechen darfst

**Kein `style="..."` im HTML, keine `<script>`-Blöcke im HTML.** Die
Sicherheitsrichtlinie blockiert beides stillschweigend. Es gibt keine
Fehlermeldung, es passiert einfach nichts. CSS nach `css/`, JavaScript
nach `js/`.

**Schriften nie über das Google CDN.** Das überträgt die Adresse jedes
Besuchers an Google und zwingt dich zu einem Google-Abschnitt im Datenschutz.
Selbst hosten kostet vier Dateien.

**Die Datenschutzerklärung wandert mit.** Jedes neue Formularfeld, jeder
eingebettete Dienst, jeder Cookie muss dort auftauchen. Das ist der häufigste
Fehler überhaupt.

## Karte und Video

Beide sind fertig eingebaut und bis zur Freigabe vollständig blockiert.

**Karte:** In `index.html` im Abschnitt Anfahrt die Adresse in `data-src`
eintragen, an der Stelle `[PLATZHALTER-ADRESSE]`. Format:
`https://www.google.com/maps?q=Strasse+1,+8530+Ort&output=embed`

**Video:** Im Abschnitt Video die Video-Kennung in `data-src` eintragen. Die
steht in jeder YouTube-Adresse hinter `v=`. Verwendet wird bewusst
`youtube-nocookie.com`, der datensparsamere Zugang.

**Nicht benötigt?** Dann an vier Stellen löschen:
1. den `<section>` in `index.html`
2. die Kategorie in `CC_KATEGORIEN` in `js/script.js`
3. den Eintrag in `frame-src` in der Sicherheitsrichtlinie in `index.html`
4. den Abschnitt in `datenschutz.html`

### Eine weitere Einbettung ergänzen

Jedes Element mit der Klasse `.einbettung` funktioniert automatisch. Es braucht
nur drei Attribute:

```html
<div class="einbettung"
     data-kategorie="<id aus CC_KATEGORIEN>"
     data-titel="<Beschreibung für Screenreader>"
     data-src="<Adresse>">
```

Für einen neuen Anbieter zusätzlich:

1. In `js/script.js` in `CC_KATEGORIEN` einen Eintrag ergänzen
2. `CC_VERSION` um eins hochzählen, damit alte Zustimmungen neu abgefragt werden
3. `frame-src` in der Sicherheitsrichtlinie um genau diese eine Adresse erweitern
4. Einen Abschnitt in `datenschutz.html` ergänzen

**Warum je Anbieter eine eigene Kategorie und kein Sammeltopf?** Eine Zustimmung
muss sich auf einen konkreten Empfänger beziehen. Wer nur die Karte sehen will,
soll YouTube nicht mitfreigeben müssen.

## Abnahmeprüfung

Vor der Übergabe an den Kunden:

- [ ] `grep -rn "PLATZHALTER" .` liefert nichts mehr
- [ ] Beide `todo-box` aus den Rechtsseiten entfernt
- [ ] Vor der Zustimmung geht keine Verbindung nach außen
- [ ] Ohne JavaScript ist die Seite noch lesbar
- [ ] Kein seitliches Scrollen bei 390 Pixel
- [ ] GitHub Pages auf `main`, Domain eingetragen, Enforce HTTPS aktiv

## Kein Vorschaubild vom Anbieter

Der Platzhalter zeigt ein gezeichnetes Symbol, kein YouTube-Vorschaubild. Das
ist Absicht: ein Vorschaubild käme von Googles Servern und wäre damit bereits
die Verbindung, die die Zustimmung verhindern soll. Genau daran scheitern viele
Umsetzungen, die sonst richtig aussehen.
