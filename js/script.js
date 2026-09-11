/* ==========================================================================
   Webdesign Bund — script.js
   Inhalt:
   1. Leuchtpunkt im Hero (Bloom -> Dauerpuls)
   2. Navigationsleiste beim Scrollen abdunkeln
   3. Mobiles Menü öffnen/schließen
   4. Aktiven Menüpunkt hervorheben
   5. Elemente beim Scrollen einblenden
   6. Kontaktformular -> fertige E-Mail im Mailprogramm
   7. Jahreszahl im Footer
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
  /* Kein Server, kein Backend: aus den Eingaben wird ein mailto-Link gebaut
     und das E-Mail-Programm des Besuchers geöffnet. Es werden keine Daten
     auf der Website gespeichert oder an Dritte gesendet. */
  var EMPFAENGER = 'office@webdesign-bund.at';
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

      var name = feld('name');
      var email = feld('email');
      var nachricht = feld('nachricht');

      if (!name || !email || !nachricht) {
        if (note) {
          note.textContent = 'Bitte Name, Kontaktmöglichkeit und Nachricht ausfüllen.';
          note.style.color = '#FFC864';
        }
        return;
      }

      var betrieb = feld('betrieb');
      var anliegen = feld('anliegen');

      var betreff = 'Anfrage über webdesign-bund.at — ' + (anliegen || 'Projekt');
      var text = [
        'Name: ' + name,
        betrieb ? 'Betrieb: ' + betrieb : null,
        'Kontakt: ' + email,
        'Anliegen: ' + anliegen,
        '',
        'Nachricht:',
        nachricht
      ].filter(Boolean).join('\n');

      window.location.href = 'mailto:' + EMPFAENGER +
        '?subject=' + encodeURIComponent(betreff) +
        '&body=' + encodeURIComponent(text);

      if (note) {
        note.textContent = 'Ihr E-Mail-Programm sollte sich jetzt öffnen. ' +
          'Falls nicht, schreiben Sie bitte direkt an ' + EMPFAENGER + '.';
        note.style.color = '';
      }
    });
  }

  /* 7. JAHRESZAHL --------------------------------------------------------- */
  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());

})();
