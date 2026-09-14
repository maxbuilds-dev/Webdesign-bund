/* ==========================================================================
   GRUNDGERUEST, js/script.js

   Enthaelt nur das, was jedes Projekt braucht:
   1. Mobiles Menue
   2. Einblenden beim Scrollen
   3. Cookies lesen und schreiben
   4. Zustimmungsmanager
   5. Mailadressen zusammensetzen
   6. Kontaktformular
   7. Jahreszahl

   Erweitern fuer ein Projekt mit Statistik oder eingebetteten Videos:
   nur die Liste CC_KATEGORIEN ergaenzen und CC_VERSION hochzaehlen.
   ========================================================================== */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. MOBILES MENUE ------------------------------------------------------ */
  var toggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');

  function menueSchliessen() {
    if (!toggle || !navList) return;
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
  }

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var offen = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(offen));
      toggle.setAttribute('aria-label', offen ? 'Menü schließen' : 'Menü öffnen');
    });
    navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) menueSchliessen();
    });
  }

  /* 2. EINBLENDEN BEIM SCROLLEN -------------------------------------------
     Wichtig: css/nojs.css macht diese Elemente sofort sichtbar, wenn kein
     JavaScript laeuft. Ohne diese Datei bleibt die halbe Seite leer.      */
  var revealItems = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealItems, function (el) {
      el.classList.add('visible');
    });
  } else {
    var beobachter = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 90);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(revealItems, function (el) { beobachter.observe(el); });
  }

  /* 3. UND 4. COOKIES UND ZUSTIMMUNGSMANAGER --------------------------------------------------
     Kategorien stehen unten als Datenstruktur. Fuer ein Kundenprojekt mit
     Statistik oder eingebetteten Videos wird hier ein Eintrag ergaenzt, der
     Rest funktioniert unveraendert weiter.

     Grundsatz: nichts wird geladen, bevor zugestimmt wurde. Der iframe im
     Portfolio entsteht erst nach der Freigabe, vorher steht dort nur ein
     Platzhalter und es geht keine einzige Verbindung nach aussen.        */

  /* --- Cookies lesen und schreiben -------------------------------------- */
  function cookieLesen(name) {
    var treffer = document.cookie.split('; ').filter(function (teil) {
      return teil.indexOf(name + '=') === 0;
    });
    return treffer.length ? decodeURIComponent(treffer[0].split('=').slice(1).join('=')) : null;
  }

  function cookieSetzen(name, wert, tage) {
    /* Secure nur ueber https, sonst liesse sich lokal nicht testen. */
    var sicher = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = name + '=' + encodeURIComponent(wert) +
      '; max-age=' + (tage * 24 * 60 * 60) + '; path=/; SameSite=Lax' + sicher;
  }

  var CC_NAME = 'zustimmung';
  var CC_VERSION = 1;   /* aendert sich die Liste unten, hochzaehlen.
                           Dann wird erneut gefragt, statt eine veraltete
                           Zustimmung weiterzuverwenden. */

  var CC_KATEGORIEN = [
    {
      id: 'notwendig',
      titel: 'Notwendig',
      pflicht: true,
      zweck: 'Speichert ausschließlich Ihre Entscheidung auf dieser Seite, ' +
             'damit die Abfrage nicht bei jedem Besuch erneut erscheint.',
      eintraege: [
        {
          name: 'zustimmung',
          dauer: '1 Jahr',
          text: 'Enthält das Datum Ihrer Entscheidung und welche Kategorien ' +
                'Sie freigegeben haben. Keine Kennung, keine Auswertung, ' +
                'keine Weitergabe.'
        }
      ]
    },
    /* Je Anbieter eine eigene Kategorie. Ein Sammeltopf "Externe Inhalte"
       waere bequemer, aber eine Zustimmung muss sich auf einen konkreten
       Empfaenger beziehen. Wer nur die Karte will, soll nicht YouTube
       mitfreigeben muessen.

       Nicht benoetigte Kategorie loeschen, samt Abschnitt in index.html,
       Eintrag in der CSP und Abschnitt in datenschutz.html. */
    {
      id: 'maps',
      titel: 'Google Maps',
      pflicht: false,
      zweck: 'Zeigt die Karte mit dem Standort. Ohne Freigabe wird keine ' +
             'Verbindung zu Google aufgebaut.',
      eintraege: [
        {
          name: 'Google Maps',
          dauer: 'siehe Google',
          text: 'Anbieter ist Google Ireland Limited, Gordon House, Barrow ' +
                'Street, Dublin 4, Irland. Beim Laden erfährt Google die ' +
                'Adresse Ihres Internetanschlusses, Datum und Uhrzeit sowie ' +
                'Angaben zu Ihrem Browser und setzt eigene Cookies.'
        }
      ]
    },
    {
      id: 'youtube',
      titel: 'YouTube',
      pflicht: false,
      zweck: 'Zeigt eingebettete Videos. Ohne Freigabe wird keine Verbindung ' +
             'zu YouTube aufgebaut.',
      eintraege: [
        {
          name: 'youtube-nocookie.com',
          dauer: 'siehe Google',
          text: 'Verwendet wird der datensparsamere Zugang von YouTube, der ' +
                'erst beim Abspielen Cookies setzt. Beim Laden erfährt Google ' +
                'dennoch die Adresse Ihres Internetanschlusses, Datum und ' +
                'Uhrzeit sowie Angaben zu Ihrem Browser.'
        }
      ]
    }
  ];

  var overlay   = document.getElementById('ccOverlay');
  var dialog    = document.getElementById('ccDialog');
  var ansichtKurz   = document.getElementById('ccKurz');
  var ansichtDetail = document.getElementById('ccDetail');

  function ccLesen() {
    var roh = cookieLesen(CC_NAME);
    if (!roh) return null;
    try {
      var daten = JSON.parse(roh);
      /* veraltete Fassung: erneut fragen */
      if (daten.v !== CC_VERSION) return null;
      return daten;
    } catch (e) {
      return null;
    }
  }

  function ccSpeichern(auswahl) {
    var daten = { v: CC_VERSION, zeit: new Date().toISOString().slice(0, 10) };
    CC_KATEGORIEN.forEach(function (k) {
      daten[k.id] = k.pflicht ? true : !!auswahl[k.id];
    });
    cookieSetzen(CC_NAME, JSON.stringify(daten), 365);
    ccAnwenden(daten);
    ccSchliessen();
  }

  /* --- Wirkung der Entscheidung ----------------------------------------
     Jedes Element mit der Klasse .einbettung traegt in data-kategorie, zu
     welcher Kategorie es gehoert, und in data-src die Adresse. Der iframe
     entsteht erst hier, zur Laufzeit. Im HTML steht er nicht, deshalb geht
     vor der Zustimmung nachweislich keine Verbindung nach aussen.

     Wird eine Freigabe zurueckgenommen, verschwindet der iframe sofort
     wieder und der Platzhalter kommt zurueck.                            */
  function ccAnwenden(daten) {
    Array.prototype.forEach.call(
      document.querySelectorAll('.einbettung'),
      function (feld) {
        var kategorie = feld.getAttribute('data-kategorie');
        var erlaubt = !!(daten && daten[kategorie]);
        var platzhalter = feld.querySelector('.einbettung-platzhalter');
        var vorhanden = feld.querySelector('iframe');

        if (erlaubt) {
          if (vorhanden) return;
          if (platzhalter) platzhalter.hidden = true;
          var rahmen = document.createElement('iframe');
          rahmen.src = feld.getAttribute('data-src');
          rahmen.title = feld.getAttribute('data-titel') || 'Eingebetteter Inhalt';
          rahmen.loading = 'lazy';
          rahmen.referrerPolicy = 'no-referrer';
          rahmen.allowFullscreen = true;
          feld.appendChild(rahmen);
        } else {
          if (vorhanden) vorhanden.remove();
          if (platzhalter) platzhalter.hidden = false;
        }
      }
    );
  }

  /* --- Einstellungen aufbauen ------------------------------------------- */
  function ccDetailAufbauen(daten) {
    var ziel = document.getElementById('ccKategorien');
    if (!ziel) return;
    ziel.textContent = '';

    CC_KATEGORIEN.forEach(function (k) {
      var block = document.createElement('div');
      block.className = 'cc-kat';

      var kopf = document.createElement('div');
      kopf.className = 'cc-kat-kopf';

      var name = document.createElement('span');
      name.className = 'cc-kat-titel';
      name.textContent = k.titel;
      kopf.appendChild(name);

      var schalter = document.createElement('label');
      schalter.className = 'cc-schalter';

      var box = document.createElement('input');
      box.type = 'checkbox';
      box.id = 'cc-' + k.id;
      box.checked = k.pflicht ? true : !!(daten && daten[k.id]);
      box.disabled = !!k.pflicht;
      box.setAttribute('aria-label',
        k.pflicht ? k.titel + ', immer aktiv' : k.titel + ' erlauben');

      var regler = document.createElement('span');
      regler.className = 'cc-regler';
      regler.setAttribute('aria-hidden', 'true');

      schalter.appendChild(box);
      schalter.appendChild(regler);
      kopf.appendChild(schalter);
      block.appendChild(kopf);

      if (k.pflicht) {
        var hinweis = document.createElement('span');
        hinweis.className = 'cc-pflicht';
        hinweis.textContent = 'immer aktiv';
        block.appendChild(hinweis);
      }

      var zweck = document.createElement('p');
      zweck.className = 'cc-kat-zweck';
      zweck.textContent = k.zweck;
      block.appendChild(zweck);

      k.eintraege.forEach(function (e) {
        var zeile = document.createElement('div');
        zeile.className = 'cc-eintrag';

        var code = document.createElement('code');
        code.textContent = e.name;
        zeile.appendChild(code);

        var text = document.createElement('p');
        text.textContent = e.text;
        zeile.appendChild(text);

        var dauer = document.createElement('span');
        dauer.className = 'cc-dauer';
        dauer.textContent = e.dauer;
        zeile.appendChild(dauer);

        block.appendChild(zeile);
      });

      ziel.appendChild(block);
    });
  }

  /* --- Anzeigen und schliessen ------------------------------------------ */
  var ccZuletztFokussiert = null;

  function ccOeffnen(detail) {
    if (!overlay) return;
    ccZuletztFokussiert = document.activeElement;
    ccDetailAufbauen(ccLesen());
    ansichtKurz.hidden = !!detail;
    ansichtDetail.hidden = !detail;
    overlay.hidden = false;
    document.body.classList.add('cc-offen');
    var ersterKnopf = dialog.querySelector('button:not([hidden])');
    if (ersterKnopf) ersterKnopf.focus();
  }

  function ccSchliessen() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.classList.remove('cc-offen');
    if (ccZuletztFokussiert && ccZuletztFokussiert.focus) ccZuletztFokussiert.focus();
  }

  function ccAlle(wert) {
    var auswahl = {};
    CC_KATEGORIEN.forEach(function (k) { auswahl[k.id] = wert; });
    ccSpeichern(auswahl);
  }

  if (overlay) {
    document.getElementById('ccAnnehmen').addEventListener('click', function () { ccAlle(true); });
    document.getElementById('ccAnnehmen2').addEventListener('click', function () { ccAlle(true); });
    document.getElementById('ccAblehnen').addEventListener('click', function () { ccAlle(false); });

    document.getElementById('ccEinstellungen').addEventListener('click', function () {
      ansichtKurz.hidden = true;
      ansichtDetail.hidden = false;
      document.getElementById('ccZurueck').focus();
    });

    document.getElementById('ccZurueck').addEventListener('click', function () {
      ansichtDetail.hidden = true;
      ansichtKurz.hidden = false;
      document.getElementById('ccEinstellungen').focus();
    });

    document.getElementById('ccSpeichern').addEventListener('click', function () {
      var auswahl = {};
      CC_KATEGORIEN.forEach(function (k) {
        var box = document.getElementById('cc-' + k.id);
        auswahl[k.id] = box ? box.checked : false;
      });
      ccSpeichern(auswahl);
    });

    var oeffner = document.getElementById('ccOeffnen');
    if (oeffner) oeffner.addEventListener('click', function () { ccOeffnen(true); });

    /* Ein Klick auf "Karte laden" oder "Video laden" gibt genau diese eine
       Kategorie frei, nicht alle. Das ist der schnellste Weg fuer den
       Besucher und bleibt trotzdem eine bewusste Einzelentscheidung. */
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-freigeben]'),
      function (knopf) {
        knopf.addEventListener('click', function () {
          var bisher = ccLesen() || {};
          var auswahl = {};
          CC_KATEGORIEN.forEach(function (k) { auswahl[k.id] = !!bisher[k.id]; });
          auswahl[knopf.getAttribute('data-freigeben')] = true;
          ccSpeichern(auswahl);
        });
      }
    );

    /* Escape zaehlt als Ablehnung, nicht als stille Zustimmung */
    document.addEventListener('keydown', function (e) {
      if (overlay.hidden) return;
      if (e.key === 'Escape') { ccAlle(false); return; }
      if (e.key !== 'Tab') return;
      /* Fokus im Dialog halten */
      var ziele = dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])');
      var sichtbar = Array.prototype.filter.call(ziele, function (el) {
        return el.offsetParent !== null;
      });
      if (!sichtbar.length) return;
      var erster = sichtbar[0], letzter = sichtbar[sichtbar.length - 1];
      if (e.shiftKey && document.activeElement === erster) {
        e.preventDefault(); letzter.focus();
      } else if (!e.shiftKey && document.activeElement === letzter) {
        e.preventDefault(); erster.focus();
      }
    });

    var gespeichert = ccLesen();
    if (gespeichert) {
      ccAnwenden(gespeichert);
    } else {
      ccOeffnen(false);
    }
  }

  /* 5. MAILADRESSEN EINSETZEN ---------------------------------------------- */
  /* Aus data-mail und data-domain wird die fertige Adresse gebaut und als
     echter mailto Link gesetzt. Im HTML steht nur "office (at) ...", damit
     Spam-Sammler, die den Quelltext durchsuchen, nichts Brauchbares finden. */
  Array.prototype.forEach.call(
    document.querySelectorAll('a[data-mail][data-domain]'),
    function (link) {
      var adresse = link.getAttribute('data-mail') +
                    String.fromCharCode(64) +
                    link.getAttribute('data-domain');
      link.setAttribute('href', 'mailto:' + adresse);
      var text = link.querySelector('.mail-text');
      if (text) text.textContent = adresse;
      link.removeAttribute('data-mail');
      link.removeAttribute('data-domain');
    }
  );

  /* 6. KONTAKTFORMULAR ---------------------------------------------------- */
  /* Kein Server, kein Backend: aus den Eingaben wird ein mailto Link gebaut
     und das Mailprogramm des Besuchers geöffnet. Es werden keine Daten
     auf der Website gespeichert oder an Dritte gesendet. */
  /* Die Adresse wird zur Laufzeit zusammengesetzt und steht deshalb
     nirgends komplett im Quelltext. Das haelt einfache Spam-Sammler ab,
     die nur nach dem Muster name@domain suchen. */
  var EMPFAENGER = '[PLATZHALTER]' + String.fromCharCode(64) + '[PLATZHALTER-DOMAIN]';
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  function feld(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Bot-Falle: wenn das unsichtbare Feld ausgefüllt ist, passiert nichts
      if (feld('website') !== '') return;

      /* Alle Felder sind Pflicht. Fehlt eines, wird es benannt, damit der
         Besucher nicht suchen muss. */
      var felder = [
        { id: 'name',      titel: 'Name' },
        { id: 'betrieb',   titel: 'Unternehmen' },
        { id: 'email',     titel: 'Mail' },
        { id: 'telefon',   titel: 'Telefon' },
        { id: 'anliegen',  titel: 'Anliegen' },
        { id: 'nachricht', titel: 'Nachricht' }
      ];

      var fehlend = felder.filter(function (f) { return feld(f.id) === ''; });

      if (fehlend.length) {
        if (note) {
          var titel = fehlend.map(function (f) { return f.titel; });
          note.textContent = fehlend.length === 1
            ? 'Bitte füllen Sie das Feld ' + titel[0] + ' aus.'
            : 'Bitte füllen Sie diese Felder aus: ' + titel.join(', ') + '.';
          note.style.color = '#FFC864';
        }
        var erstes = document.getElementById(fehlend[0].id);
        if (erstes) erstes.focus();
        return;
      }

      var betreff = 'Anfrage über [PLATZHALTER-DOMAIN]: ' + feld('anliegen');
      var text = [
        'Name: ' + feld('name'),
        'Unternehmen: ' + feld('betrieb'),
        'Mail: ' + feld('email'),
        'Telefon: ' + feld('telefon'),
        'Anliegen: ' + feld('anliegen'),
        '',
        'Nachricht:',
        feld('nachricht')
      ].join('\n');

      window.location.href = 'mailto:' + EMPFAENGER +
        '?subject=' + encodeURIComponent(betreff) +
        '&body=' + encodeURIComponent(text);

      if (note) {
        note.textContent = 'Ihr Mailprogramm wurde geöffnet. Sollte das nicht ' +
          'funktionieren, erreichen Sie mich direkt unter ' + EMPFAENGER + '.';
        note.style.color = '';
      }
    });
  }

  /* 7. JAHRESZAHL ---------------------------------------------------------- */
  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());

})();
