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

## Eine Kategorie ergänzen

Für ein Projekt mit Google Maps, YouTube oder Statistik:

1. In `js/script.js` in `CC_KATEGORIEN` einen Eintrag ergänzen. Ein
   auskommentiertes Beispiel steht dort.
2. `CC_VERSION` um eins hochzählen, damit alte Zustimmungen neu abgefragt werden.
3. In `ccAnwenden()` eintragen, was die Freigabe bewirkt. Das eingebettete
   Element **erst dort** erzeugen, niemals ins HTML schreiben.
4. In der Sicherheitsrichtlinie der betroffenen Seite `frame-src` um genau
   diese eine Adresse erweitern.
5. Den auskommentierten Abschnitt in `datenschutz.html` einkommentieren und
   ausfüllen.

## Abnahmeprüfung

Vor der Übergabe an den Kunden:

- [ ] `grep -rn "PLATZHALTER" .` liefert nichts mehr
- [ ] Beide `todo-box` aus den Rechtsseiten entfernt
- [ ] Vor der Zustimmung geht keine Verbindung nach außen
- [ ] Ohne JavaScript ist die Seite noch lesbar
- [ ] Kein seitliches Scrollen bei 390 Pixel
- [ ] GitHub Pages auf `main`, Domain eingetragen, Enforce HTTPS aktiv

Ausführliche Anleitung samt fertigem Prompt: `PROJEKTSTART.md` im
Wurzelverzeichnis.
