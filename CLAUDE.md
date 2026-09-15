# webdesign-bund.at — Project Context

## Business
- Owner: Max Bund, Einzelunternehmen
- Address: Alfred-Coßmann-Weg 8a, 8530 Deutschlandsberg, Austria
- Gewerbe: **Werbegrafik-Designer (freies Gewerbe)**, GISA-Zahl 40118864,
  Gewerbebehörde Bezirkshauptmannschaft Deutschlandsberg.
  Note: the registered trade is Werbegrafik-Designer, not "Webdesign". The old
  ÖNACE code 62.10-0 (Programmierungstätigkeiten) did not match it and has been
  removed from the Impressum. Ask Max before reintroducing any ÖNACE code.
- Brand name on the site: **Webdesign Bund** (matches the domain; do not switch to "Bund Webdesign")
- Kleinunternehmerregelung — no VAT on invoices unless this changes
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
copy without asking.

## Tone of voice
Max asked for a **professional, elevated register**. No playful or chatty sentences.
Concretely:
- declarative statements, no rhetorical questions ("Sie haben noch keine Website?")
- no colloquialisms ("Fachchinesisch", "Stundenfalle", "Wir reden.")
- precise nouns over casual verbs: "Veröffentlichung" not "geht online",
  "Konzeption" not "die erste Idee", "Erstgespräch" not "wir reden"
- restrained and specific. This is **not** a licence for agency filler:
  no "ganzheitlich", "Synergien", "maßgeschneiderte Lösungen", no superlatives.
  Professional here means precise, not inflated.
- claims stay truthful and checkable: "Ab 1 Woche", "100 % individuell entwickelt",
  "Fixpreis vor Projektbeginn vereinbart"

Note the tension with the audience: many readers are not tech-savvy, so keep sentences
readable even in this register. If a term needs explaining, explain it rather than
dropping to a chatty tone.

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

## Services Max offers (different from this repo's stack)
Max builds the full range for clients: plain static pages as well as sites with
a backend, **WordPress and PHP included**. He does **not** use site builders
(Wix, Jimdo, Squarespace). He **does** use his own templates as a starting
point, and the copy says so openly because it lowers the price. Do not
reintroduce claims like "ohne Vorlagen" anywhere on the site, they would be
untrue.

## Tech stack of this repo
Plain HTML/CSS/JS. No framework, no build step, no npm dependencies. This matches the
existing GitHub Pages deployment pattern and stays maintainable without a deep
HTML/CSS/JS background. Don't introduce a framework or bundler unless explicitly asked.

## File structure
```
/
├── index.html          # the single page, all visible copy lives here
├── impressum.html      # ECG §5 / MedienG §25, real data, complete
├── datenschutz.html    # DSGVO, real data, complete
├── 404.html            # must stay at root, GitHub Pages only reads it there
├── robots.txt          # must stay at root
├── sitemap.xml         # must stay at root
├── CNAME               # custom domain, do not delete
├── css/style.css       # design tokens at the top, then section by section
├── css/fonts.css       # @font-face only
├── js/script.js        # nav, scroll reveals, contact form
└── assets/
    ├── fonts/          # Inter + Space Grotesk, self-hosted woff2
    └── img/            # logo and screenshots. No portrait photo: Max decided
                        # against a picture in the Über mich section.
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
simple bots.

## Security decisions (do not undo without asking)
- **No secrets, ever.** Nothing in this repo needs a key. If a form service is ever
  added, only a public key belongs in the client, never a private one.
- **Content Security Policy** is set as a `<meta http-equiv>` on all four pages:
  `default-src 'none'` with `'self'` for script, style and font. index.html also
  allows `frame-src https://maxbuilds-dev.github.io`, the single narrow exception,
  for the consent gated portfolio preview. Do not widen it. GitHub Pages cannot
  send real HTTP headers, so the meta tag is the only option here. Consequence:
  **no inline `<style>` blocks, no inline `<script>`, no `style="..."` attributes.**
  Put new CSS in `css/style.css` and new JS in `js/script.js`, otherwise it is blocked
  silently. `img-src` allows `data:` only for the inline SVG favicon.
- **No external resources at all**, so Subresource Integrity is not applicable: there is
  nothing third-party to pin. Keep it that way. If a library ever becomes unavoidable,
  self-host it in `assets/` rather than pulling it from a CDN.
- **Mail address is obfuscated on index.html only.** The markup carries
  `data-mail` and `data-domain`, and `js/script.js` assembles the real address at
  runtime. Without JavaScript the readable form "office (at) webdesign-bund.at" stays.
  On **impressum.html and datenschutz.html the address stays in plain text on purpose**:
  ECG §5 requires it to be directly and permanently accessible, and hiding it behind
  JavaScript there would be legally risky. This means a determined scraper can still
  find it there. The obfuscation only reduces volume from the most visited page.
- **Consent manager** in `js/script.js` section 8. Categories are a data structure
  (`CC_KATEGORIEN`) so client projects can add Statistik or more embeds without
  touching the logic. Rules that must not be softened: all buttons identical in
  size and colour, refusal stored so it is honoured, withdrawal via the footer
  button, Escape counts as refusal, and **nothing external loads before consent**
  (the portfolio iframe is created at runtime, it is not in the HTML). Bump
  `CC_VERSION` when the category list changes so visitors are asked again.
- **`css/nojs.css`** is loaded inside `<noscript>`. Without it the `.reveal` elements
  stay at `opacity: 0` and most of the page is blank for visitors without JavaScript.
  If you add new `.reveal` elements, this file already covers them.
- **Enforce HTTPS** has to be switched on in the repository settings under Pages. That
  is a GitHub setting, not something in this repo.

## Legal pages — status
Both pages carry Max's real business data. No placeholders and no `.todo-box` left.

**One entry is unverified:** the WKO Fachgruppe reads "Wirtschaftskammer Steiermark,
Fachgruppe Werbung und Marktkommunikation". That was derived from the Gewerbewortlaut
"Werbegrafik-Designer" (Sparte Information und Consulting) and Max asked for it to be
entered as-is, because he could not find his own entry at firmen.wko.at. He has not
confirmed it with the chamber yet. There is an HTML comment at that spot in
impressum.html. If Max ever reports a different Fachgruppe, correct it there.

WKO membership itself is not in doubt: it follows automatically from holding a
Gewerbeberechtigung (he has GISA-Zahl 40118864) and is independent of the Firmenbuch,
where he is deliberately not registered.

Phone number: +43 664 3988466. It appears in the Impressum and as a clickable
`tel:` link in the contact section of index.html. No UID: as a Kleinunternehmer he
has none.

This is not legal advice; if anything about the requirements looks uncertain, say so
rather than asserting it.

## Deployment
GitHub Pages, same pattern as the Elke Bund KG site. Custom domain via the CNAME file
plus DNS records at World4You, see README.md.

## Working style
Direct and iterative. Build section by section, show progress rather than a big single
dump. If content or copy decisions are being assumed rather than given, say so
explicitly before proceeding.

## Git workflow (changed by Max)
**Work directly on `main`.** No feature branch, no pull request, unless Max asks for
one. He gave explicit permission for this. Commit and push straight to `main`.
Background: he edits files on GitHub between sessions, and the branch workflow produced
a merge conflict every round.

## Max's own edits are final
When Max changes wording himself, whether here or directly on GitHub, **take it as
given and do not question it, correct it or argue it**. He said so explicitly. This
includes spelling and grammar he wrote that way on purpose, for example
"Ab 2 Woche" in the hero. Do not "fix" it. Report what you changed, nothing more.

This does not cover factual or legal accuracy: if something would be untrue in the
Impressum or would break the page, still say so once, plainly.
