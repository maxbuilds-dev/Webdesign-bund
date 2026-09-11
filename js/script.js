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
   8. Cookie-Leiste
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

  /* 8. COOKIE-LEISTE ------------------------------------------------------- */
  /* Die Seite setzt keine Cookies fuer Werbung, Statistik oder Tracking.
     Gespeichert wird nur die Entscheidung selbst, und auch die nur bei
     Zustimmung. Wer ablehnt, hinterlaesst nichts: die Leiste erscheint beim
     naechsten Besuch wieder. Das ist ehrlicher als ein Ablehnen, das
     seinerseits eine Spur hinterlaesst. */
  var COOKIE_NAME = 'zustimmung';

  function cookieLesen(name) {
    var treffer = document.cookie.split('; ').filter(function (teil) {
      return teil.indexOf(name + '=') === 0;
    });
    return treffer.length ? decodeURIComponent(treffer[0].split('=')[1]) : null;
  }

  function cookieSetzen(name, wert, tage) {
    var ablauf = 'max-age=' + (tage * 24 * 60 * 60);
    /* Secure nur ueber https, sonst wuerde der Cookie beim lokalen Testen
       ueber http gar nicht erst gesetzt. */
    var sicher = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = name + '=' + encodeURIComponent(wert) +
      '; ' + ablauf + '; path=/; SameSite=Lax' + sicher;
  }

  var banner = document.getElementById('cookieBanner');

  if (banner && cookieLesen(COOKIE_NAME) === null) {
    banner.hidden = false;

    var annehmen = document.getElementById('cookieAnnehmen');
    var ablehnen = document.getElementById('cookieAblehnen');

    function leisteSchliessen() {
      banner.hidden = true;
    }

    if (annehmen) {
      annehmen.addEventListener('click', function () {
        cookieSetzen(COOKIE_NAME, 'ja', 365);
        leisteSchliessen();
      });
    }

    if (ablehnen) {
      ablehnen.addEventListener('click', function () {
        /* bewusst kein Cookie: Ablehnen speichert nichts */
        leisteSchliessen();
      });
    }

    /* Escape schliesst die Leiste, ohne etwas zu speichern */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !banner.hidden) leisteSchliessen();
    });
  }

  /* 9. JAHRESZAHL --------------------------------------------------------- */
  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());

})();
