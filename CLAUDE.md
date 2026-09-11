# webdesign-bund.at — Project Context

## Business
- Owner: Max Bund, Einzelunternehmer (freies Gewerbe, Webdesign), Austria (Deutschlandsberg area)
- Brand name on the site: **Webdesign Bund** (matches the domain; do not switch to "Bund Webdesign")
- Kleinunternehmerregelung — no VAT on invoices unless this changes
- ÖNACE 62.10-0
- Domain: webdesign-bund.at
- Contact: office@webdesign-bund.at

## What this site is
Portfolio/landing page for the web design business itself, not a client project.
Purpose: convince business owners without a website, or with an outdated one, to hire Max.
This site IS the sales pitch used in cold outreach, so it needs to look sharper than an
average small-business site.

## Audience
Small businesses and self-employed people **across all industries**, Austria-wide.
Max explicitly decided against restricting the copy to local businesses, so do not
reintroduce "lokale Unternehmen", "Steiermark" or "Deutschlandsberg" into the visible
copy without asking. Readers are often not tech-savvy: copy stays simple,
benefit-focused, confidence-inspiring, no jargon.

## Language and copy rules
German (de-AT), formal "Sie" throughout.

**No dashes in visible text.** Max asked for this explicitly. That means:
- no em dashes or en dashes anywhere, use comma, full stop, colon or semicolon
- no hyphens inside compound words either: write "Mail" not "E-Mail",
  "Mailprogramm" not "E-Mail-Programm", "Vorlagenlook" not "Vorlagen-Look"
- the only hyphens left are unavoidable real identifiers: the address
  office@webdesign-bund.at, the client URL maxbuilds-dev.github.io, and the
  official code ÖNACE 62.10-0
- CSS property names, class names and custom properties keep their hyphens,
  those are part of the language
Check with: `grep -rn "—\|–" --include=*.html --include=*.css --include=*.js .`

## Tech stack
Plain HTML/CSS/JS. No framework, no build step, no npm dependencies. This matches the
existing GitHub Pages deployment pattern and stays maintainable without a deep
HTML/CSS/JS background. Don't introduce a framework or bundler unless explicitly asked.

## File structure
```
/
├── index.html          # the single page, all visible copy lives here
├── impressum.html      # ECG §5 / MedienG §25, STILL HAS PLACEHOLDERS
├── datenschutz.html    # DSGVO, STILL HAS PLACEHOLDERS
├── 404.html            # must stay at root, GitHub Pages only reads it there
├── robots.txt          # must stay at root
├── sitemap.xml         # must stay at root
├── CNAME               # custom domain, do not delete
├── css/style.css       # design tokens at the top, then section by section
├── css/fonts.css       # @font-face only
├── js/script.js        # nav, scroll reveals, contact form
└── assets/
    ├── fonts/          # Inter + Space Grotesk, self-hosted woff2
    └── img/            # logo, screenshots, portrait photo
```
The HTML is deliberately not split into partials: that would need a build step or
runtime JavaScript, both of which contradict the stack decision above.

## Design system
Taken from the original design reference, which has since been deleted because it is
fully integrated. Everything is driven by CSS custom properties at the top of
`css/style.css`, so change colours and spacing there, not in the components.

- Background `#0A0B0F`, surfaces `#12141B`, accent electric indigo `#5B7FFF`
- Headings Space Grotesk 700, body Inter 400/500/600
- Fonts are **self-hosted** in `assets/fonts/` as variable woff2. Do not switch back to
  the Google Fonts CDN: the privacy policy currently states that no visitor IP reaches
  any third party, and that claim depends on this.
- Signature animations: the glow orb blooms from a point with a slight overshoot and
  then settles into an ambient pulse; the hero headline wipes in left to right with a
  synchronised glow edge. Both are in `css/style.css` section 13 and `js/script.js`.
- `prefers-reduced-motion` disables all of it. Keep it that way.

## Page structure (single page, anchor nav, smooth scroll, no router)
1. Hero
2. Über mich
3. Portfolio (Bioenergetik mq5, https://maxbuilds-dev.github.io/bioenergetikmq5/index.html)
4. Leistungen
5. Ablauf
6. Kontakt
Order confirmed by Max. The nav in the header must mirror it.

## Contact form
There is no backend and there will not be one. The form builds a mailto link and opens
the visitor's own mail program. Nothing is stored. A hidden honeypot field catches
simple bots. The address is also a plain link next to the form, because some phones have
no mail program configured.

## Legal note — flag before publishing
Impressum and Datenschutz both still contain `[PLATZHALTER]` fields and a yellow
`.todo-box` warning at the top. **The site must not go live like this.** Missing:
address, GISA number, exact Gewerbewortlaut, Bezirkshauptmannschaft, WKO Fachgruppe,
optionally phone number and UID. This is not legal advice; if anything about the
requirements looks uncertain, say so rather than asserting it.

## Deployment
GitHub Pages, same pattern as the Elke Bund KG site. Custom domain via the CNAME file
plus DNS records at World4You, see README.md.

## Working style
Direct and iterative. Build section by section, show progress rather than a big single
dump. If content or copy decisions are being assumed rather than given, say so
explicitly before proceeding.
