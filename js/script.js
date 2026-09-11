/* ==========================================================================
   Webdesign Bund, script.js
   Inhalt:
   1. Leuchtpunkt im Hero (Bloom -> Dauerpuls)
   2. Navigationsleiste beim Scrollen abdunkeln
   3. Mobiles Menü öffnen/schließen
   4. Aktiven Menüpunkt hervorheben
   5. Elemente beim Scrollen einblenden
   6. Kontaktformular, baut eine fertige Mail im Mailprogramm
   7. Mailadressen in den Links zusammensetzen
   8. Zustimmungsmanager fuer Cookies und externe Inhalte
   9. Jahreszahl im Footer
   ========================================================================== */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. LEUCHTPUNKT ------------------------------------------------------- */
  var orb = document.getElementById('glowOrb');
  if (orb && !reducedMotion) {
    orb.classList.add('bloom');
    orb.addEventListener('animationend', function handler(e) {
      if (e.animationName === 'orbBloom') {
        orb.classList.remove('bloom');
        orb.classList.add('pulse-loop');
        orb.removeEventListener('animationend', handler);
      }
    });
  } else if (orb) {
    orb.style.opacity = '0.6';
    orb.style.transform = 'translateX(-50%) scale(1)';
  }

  /* 2. HEADER BEIM SCROLLEN ---------------------------------------------- */
  var header = document.getElementById('siteHeader');
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* 3. MOBILES MENÜ ------------------------------------------------------ */
  var toggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');

  function closeMenu() {
    if (!toggle || !navList) return;
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
  }

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });

    // Nach dem Antippen eines Links schließt sich das Menü wieder
    navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* 4. AKTIVER MENÜPUNKT ------------------------------------------------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var navLinks = {};
  Array.prototype.forEach.call(
    document.querySelectorAll('.nav-list a[href^="#"]'),
    function (link) { navLinks[link.getAttribute('href').slice(1)] = link; }
  );

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navLinks[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(navLinks).forEach(function (key) {
            navLinks[key].classList.remove('active');
          });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* 5. EINBLENDEN BEIM SCROLLEN ------------------------------------------ */
  var revealItems = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealItems, function (el) {
      el.classList.add('visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        // leichter Versatz, damit Karten nacheinander erscheinen
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 90);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revealItems, function (el) {
      revealObserver.observe(el);
    });
  }

  /* 6. KONTAKTFORMULAR ---------------------------------------------------- */
  /* Kein Server, kein Backend: aus den Eingaben wird ein mailto Link gebaut
     und das Mailprogramm des Besuchers geöffnet. Es werden keine Daten
     auf der Website gespeichert oder an Dritte gesendet. */
  /* Die Adresse wird zur Laufzeit zusammengesetzt und steht deshalb
     nirgends komplett im Quelltext. Das haelt einfache Spam-Sammler ab,
     die nur nach dem Muster name@domain suchen. */
  var EMPFAENGER = 'office' + String.fromCharCode(64) + 'webdesign-bund.at';
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

      var betreff = 'Anfrage über webdesign-bund.at: ' + feld('anliegen');
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

  /* 7. MAILADRESSEN EINSETZEN ---------------------------------------------- */
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

  /* 8. ZUSTIMMUNGSMANAGER --------------------------------------------------
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
    {
      id: 'extern',
      titel: 'Externe Inhalte',
      pflicht: false,
      zweck: 'Erlaubt die Live-Vorschau im Portfolio. Sie wird direkt von ' +
             'maxbuilds-dev.github.io geladen. Ohne Freigabe wird diese ' +
             'Verbindung nicht aufgebaut.',
      eintraege: [
        {
          name: 'keine Cookies',
          dauer: 'entfällt',
          text: 'Die Vorschau selbst setzt keine Cookies. Beim Laden erfährt ' +
                'der fremde Server jedoch die Adresse Ihres Internetanschlusses, ' +
                'weil jede Verbindung technisch bedingt eine Adresse benötigt.'
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

  /* --- Wirkung der Entscheidung ---------------------------------------- */
  var EMBED_URL = 'https://maxbuilds-dev.github.io/bioenergetikmq5/index.html';

  function ccAnwenden(daten) {
    var rahmen = document.getElementById('portfolioRahmen');
    if (!rahmen) return;

    if (daten && daten.extern) {
      if (rahmen.querySelector('iframe')) return;
      var platzhalter = document.getElementById('embedPlatzhalter');
      if (platzhalter) platzhalter.hidden = true;
      var rahmenFenster = document.createElement('iframe');
      rahmenFenster.src = EMBED_URL;
      rahmenFenster.title = 'Live-Vorschau der Website Bioenergetik mq5';
      rahmenFenster.loading = 'lazy';
      rahmenFenster.referrerPolicy = 'no-referrer';
      rahmenFenster.className = 'embed-rahmen';
      rahmen.appendChild(rahmenFenster);
    } else {
      /* Freigabe zurueckgenommen: iframe entfernen, Platzhalter zurueck */
      var vorhanden = rahmen.querySelector('iframe');
      if (vorhanden) vorhanden.remove();
      var ph = document.getElementById('embedPlatzhalter');
      if (ph) ph.hidden = false;
    }
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

    /* Klick auf "Vorschau laden" gibt genau diese eine Kategorie frei */
    var embedKnopf = document.getElementById('embedErlauben');
    if (embedKnopf) {
      embedKnopf.addEventListener('click', function () {
        var bisher = ccLesen() || {};
        var auswahl = {};
        CC_KATEGORIEN.forEach(function (k) { auswahl[k.id] = !!bisher[k.id]; });
        auswahl.extern = true;
        ccSpeichern(auswahl);
      });
    }

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

  /* 9. JAHRESZAHL --------------------------------------------------------- */
  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());

})();
