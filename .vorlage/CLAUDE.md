# [PLATZHALTER: Kundenname] — Project Context

## Business
- Owner: [PLATZHALTER: Name], [PLATZHALTER: Rechtsform]
- Address: [PLATZHALTER]
- Gewerbe: [PLATZHALTER: Wortlaut], GISA [PLATZHALTER], Behörde [PLATZHALTER]
- WKO: [PLATZHALTER: Fachgruppe]
- Kleinunternehmer: [PLATZHALTER: ja/nein]
- Domain: [PLATZHALTER]
- Contact: [PLATZHALTER: Mail], [PLATZHALTER: Telefon]

## Audience
[PLATZHALTER: Wer soll überzeugt werden, und wovon.]

## Tone of voice
German (de-AT), formal "Sie". [PLATZHALTER: sachlich und präzise, oder warm
und persönlich.] Keine Agenturfloskeln, keine Superlative. Alle Behauptungen
müssen überprüfbar sein.

## Tech stack
Plain HTML, CSS, JavaScript. No framework, no build step, no npm dependencies.
GitHub Pages. Built from the `.vorlage` starter, see its LIESMICH.md.

## Do not change without asking
- Fonts are self-hosted in `assets/fonts/`, never the Google CDN
- Content Security Policy as a meta tag on every page. Consequence: no inline
  `style` attributes, no inline `<script>`. CSS in `css/`, JS in `js/`.
- Consent manager: all buttons identical in size and colour, refusal stored so
  it is honoured, withdrawal via the footer button, Escape counts as refusal,
  nothing external loads before consent. Bump `CC_VERSION` when categories change.
- `css/nojs.css` is loaded via `<noscript>`. Without it the page is half empty
  for visitors without JavaScript.
- The privacy policy must describe the actual state of the site. Update it
  whenever a form field, cookie or embedded service is added.

## Git
Work directly on `main`. No feature branch, no pull request, unless asked.
