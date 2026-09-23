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
  office@webdesign-bund.at, the client domain bioenergetik-mq5.at, and the
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
Plain HTML/CSS/JS. No framework, no build step, no npm dependencies. Netlify publishes
the repo root as it is, and the site stays maintainable without a deep HTML/CSS/JS
background. Don't introduce a framework or bundler unless explicitly asked.

## File structure
```
/
├── index.html          # the single page, all visible copy lives here
├── impressum.html      # ECG §5 / MedienG §25, real data, complete
├── datenschutz.html    # DSGVO, real data, complete
├── 404.html            # must stay at root
├── robots.txt          # must stay at root
├── sitemap.xml         # must stay at root
├── _headers            # real HTTP headers on Netlify, CSP included
├── netlify.toml        # publish the repo root, no build command
├── danke.html          # confirmation page for the no-JavaScript form submit
├── favicon.ico         # fallback for browsers that ask for /favicon.ico
├── css/style.css       # design tokens at the top, then section by section
├── css/fonts.css       # @font-face only
├── js/script.js        # nav, scroll reveals, contact form
└── assets/
    ├── fonts/          # Inter + Space Grotesk, self-hosted woff2
    └── img/            # bioenergetikmq5.jpg is the portfolio image, resized
                        # to 1600px and stripped of EXIF. No portrait photo of
                        # Max: he decided against one in Über mich.
                        # favicon.svg, favicon-32.png, apple-touch-icon.png:
                        # green dot, generated files (see Design system).
```
The HTML is deliberately not split into partials: that would need a build step or
runtime JavaScript, both of which contradict the stack decision above.

## Design system
Design 2, live on `main` since 17 Sep 2026: **light page with dark accent blocks.**
Max found the original all-dark design too dark, too plain and too stacked, approved
this one from screenshots. The first dark design is preserved on the branch
`backup/design-v1` (commit d1aa586). Do not delete that branch. The working branch
`design-neu` is merged; it only still exists because the session's push proxy refuses
branch deletions and tag pushes, Max can delete it on GitHub.

Everything is driven by CSS custom properties at the top of `css/style.css`, so change
colours and spacing there, not in the components.

- **Warm palette.** Paper white `#F6F4EF`, white surfaces, warm near-black text
  `#17150F`. **One accent only: forest green `#14532D`** (`--accent`, hover
  `--accent-hover`; on dark blocks `#7FD0A4`). Max chose green over the terracotta
  that was live for a few hours on 17 Sep 2026, then asked for it "deeper, a real
  forest green" and "throughout", so the **dark blocks are green-black too**
  (`--dark-bg #0E1C15`), not neutral black. **No blue, no indigo, no violet
  anywhere**, Max called that "the purple problem": blue-violet is the colour every
  AI template defaults to. The favicon and `theme-color` meta follow the palette.
  No gradients, no glow, no blur, no glass. The other tells Max named, removed on
  17 Sep 2026: gradient pills and icon tiles, drifting colour blobs, a floating check
  chip, 3D-tilted mockups, a dotted grid, gradient top bars on cards, icon boxes, big
  rounded corners on the dark blocks, and above all **the coloured left stripe on a
  tinted callout box** under the options. Do not bring any of these back. Radii are
  4 to 10px, block edges are straight, shadows are faint, lines are 1px.
  Research behind it (fetching the sites themselves is blocked by the proxy, only
  search summaries were readable): light backgrounds dominate current studio sites,
  off-white plus black with one warm accent is the recurring pairing, typography does
  the work, not effects.
- **Dark blocks** (hero, Kontakt, footer, the 404 page) carry the class `theme-dark`,
  which remaps the same tokens to dark values. Components never use literal colours,
  so anything placed inside a dark block recolours itself. Add the class, nothing else.
  Max likes the rhythm dark start, light middle, dark end. Keep it.
- Headings Space Grotesk 700, body Inter 400/500/600.
- Fonts are **self-hosted** in `assets/fonts/` as variable woff2. Do not switch back to
  the Google Fonts CDN: the privacy policy currently states that no visitor IP reaches
  any third party, and that claim depends on this.
- Header: sticky, transparent with light text over the hero, white once scrolled
  (`.scrolled`, set by JS) or while the mobile menu is open (`:has`). Its height is
  `--header-h`; the hero pulls itself up by exactly that amount so the dark block
  reaches the top edge. **Do not put `overflow-x: hidden` on `body`**: it turns body
  into a scroll container and the sticky header stops sticking. `html` has
  `overflow-x: clip`, that is enough.
- **Hero is text only** (Max's decision, 17 Sep 2026): label, headline, paragraph,
  two buttons, then the three facts as a row. No image up there. The background
  pattern is wide diagonal lines (`.bg-grid`, `repeating-linear-gradient` at
  -34deg, 120px apart, radially masked). Max asked for "something diagonal, different,
  bigger"; the exact angle and spacing are open for adjustment.
- The portfolio card shows the screenshot as a composition: straight browser frame
  plus an overlapping phone frame (`.projekt-visual`, `.pv-browser`, `.pv-phone`).
  The browser frame holds `#projektBild` and the placeholder fallback; the phone
  is decorative (`aria-hidden`) and shows `assets/img/bioenergetikmq5-mobil.jpg`, a
  real mobile screenshot of the client site supplied by Max on 23 Sep 2026 (1206x2256
  original, resized to 900 wide, EXIF stripped, no device bars to crop). No tilt, no
  floating.
- Signature animations kept from design 1: the glow orb blooms and then pulses, the
  hero headline wipes in with a glow edge, sections reveal on scroll. Nothing else moves.
- `prefers-reduced-motion` disables all of it. Keep it that way.
- Section labels are small uppercase text with a short accent line, not pills.
  **Section headings have no subtext** under Leistungen and Portfolio (Max, 18 Sep
  2026: "minimalistischer"). Only Kontakt keeps its intro paragraph.
- **Leistungen is one grid of six text-only cards** (title plus two short sentences,
  no icons, no bullet lists), modelled on the tile grids Max sent as reference
  (alexanderneumann.at, matthiasdrissen.com). The six, set by Max on 18 Sep 2026:
  Webdesign, Redesign, WordPress, Onlineshops (WordPress and WooCommerce), Hosting und
  Domains, Wartung und Betreuung. Card titles are in accent green, each card carries a
  large faint numeral top right from a CSS counter (`.card::before`). The copy is
  Claude's, short on purpose; Max can edit it. The earlier "Option A, B, C" technical
  variants were folded into these six and no longer appear on the page. Leistungen
  sits on the normal paper ground; **Über mich carries the light green tint
  `#E6EDE7`** (swapped on Max's request, 18 Sep 2026).
- **Ablauf was removed** on 18 Sep 2026 (Max's decision). Do not bring it back
  without asking.
- Favicon: real files, not a data URI. `assets/img/favicon.svg` (SVG), `favicon-32.png`,
  `apple-touch-icon.png` (180px, opaque paper background, iOS dislikes transparency)
  and `/favicon.ico` as fallback. Switched because Safari on Max's iPad kept showing
  the cached blue dot from the data URI. Consequence: `img-src` in the CSP is now
  plain `'self'`, no `data:`, in all four meta tags and in `_headers`.
- All paragraphs in Über mich are identical in colour (`--text`) and size, on Max's
  request. No lead paragraph.

## Page structure (single page, anchor nav, smooth scroll, no router)
Order changed by Max on 18 Sep 2026. Nav: Home, Leistungen, Über mich, Portfolio, plus
the Kontakt button.
1. Hero
2. Leistungen
3. Über mich
4. Portfolio (Bioenergetik mq5, https://bioenergetik-mq5.at).
   Shown as an image, `assets/img/bioenergetikmq5.jpg`, not as a live iframe:
   the embed did not load and it would have been hidden behind consent, which
   defeats the purpose of the main proof point. The URL lives in one place only,
   the "Projekt ansehen" link. If the image file is missing, `js/script.js`
   shows a placeholder instead of a broken image.

   The image is a real screenshot of the published start page, taken by Max on
   an iPad. The device bars were cropped away (content rows 142 to 2011 of the
   2752x2064 original), it was resized to 1600x1090 and EXIF was stripped. The
   frame around it deliberately has no address bar any more, so nothing claims
   a URL the image cannot back up. The screenshot contains the client's hero
   photo, which shows an identifiable person, so it may only stay up with her
   consent.
5. Kontakt
The nav in the header must mirror it.

## Contact form
Sends to **Netlify Forms** since 18 Sep 2026 (before: Web3Forms, before that `mailto:`).
Netlify detects the form at deploy time by the `data-netlify="true"` attribute, stores
each submission in the site's Forms panel and mails it on.

- The form is `name="kontakt"` and carries a hidden `form-name` field with the same
  value. Netlify matches submissions by that field; without it they are dropped.
- `action="/danke.html"` and `method` sit in the HTML on purpose: without JavaScript
  the form submits normally and the visitor lands on `danke.html`. With JavaScript
  `js/script.js` section 6 intercepts, POSTs `application/x-www-form-urlencoded` to
  `/` via `fetch`, treats any 2xx as success and shows the reply in place.
- Honeypot: `netlify-honeypot="botcheck"` on the form, the checkbox named `botcheck`.
  Netlify discards submissions where it is set; the script checks it as well.
- The hidden `subject` field is filled with the Anliegen before sending. Netlify may
  use a field of that name as the notification subject; unverified, harmless if not.
- **Required: Name, Mail, Anliegen, Nachricht**, marked with `*` in the label and the
  note "* Pflichtfeld". **Unternehmen and Telefon are optional** (Max, 18 Sep 2026).
  The `required` attribute and the field list in `js/script.js` section 6 must agree.
- CSP on index.html is `connect-src 'self'` and `form-action 'self'`, nothing external
  any more. Same in `_headers`.
- **Two things only Max can do in the Netlify panel:** enable form detection
  (Site configuration, Forms, "Enable form detection"; off by default on newer sites)
  and add a notification mail to office@webdesign-bund.at (Forms, Form
  notifications). Until detection is on, submissions return 404. Free plan: 100
  submissions a month.
- Privacy consequence: unlike Web3Forms, **Netlify stores the submissions** until
  deleted. `datenschutz.html` says so, with the standard retention wording (deleted
  once no longer needed and no legal retention duty applies), the same line the
  Kontaktaufnahme section uses. Max chose that over a promise to delete promptly.
  Storage limitation still applies, so submissions should not pile up in the Forms
  panel indefinitely.

## Security decisions (do not undo without asking)
- **No secrets, ever.** Nothing in this repo needs a key. If a form service is ever
  added, only a public key belongs in the client, never a private one.
- **Content Security Policy** is set twice: as a `<meta http-equiv>` on all five pages
  and as a real HTTP header in `_headers`, which Netlify sends. The meta tag stays so
  the policy also holds in a local preview. Both must say the same thing: the browser
  enforces the intersection of the two, so a mismatch breaks the page silently.
  `default-src 'none'` with `'self'` for script, style and font. index.html also
  has `connect-src 'self'` and `form-action 'self'` for the Netlify form. Nothing
  external is allowed anywhere. Do not widen it. `_headers` additionally sets `frame-ancestors 'none'`,
  which a meta tag cannot do. Consequence:
  **no inline `<style>` blocks, no inline `<script>`, no `style="..."` attributes.**
  Put new CSS in `css/style.css` and new JS in `js/script.js`, otherwise it is blocked
  silently. `img-src` is plain `'self'`, the favicon is a file now.
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
  (`CC_KATEGORIEN`). The site currently has **only the `notwendig` category**,
  because nothing external loads on page view any more. `CC_VERSION` is at 2.
  Rules that must not be softened: all buttons identical in size and colour,
  refusal stored so it is honoured, withdrawal via the footer button, Escape
  counts as refusal, and **nothing external loads before consent**. If an embed
  is ever added, create the iframe at runtime in `ccAnwenden`, never in the HTML,
  and bump `CC_VERSION` so old consents are asked again.
- **`css/nojs.css`** is loaded inside `<noscript>`. Without it the `.reveal` elements
  stay at `opacity: 0` and most of the page is blank for visitors without JavaScript.
  If you add new `.reveal` elements, this file already covers them.
- **Force HTTPS** has to be switched on in the Netlify domain settings. That is a
  Netlify setting, not something in this repo.

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
**Netlify.** GitHub is only the repository where the code is written; Netlify watches
`main` and deploys on every push. No build command, the repo root is published as it is
(`netlify.toml`). Custom domain plus DNS at World4You, see README.md.

GitHub Pages has been switched off for this repo and the `CNAME` file it required has
been deleted. Do not recreate either, and do not add advice that assumes GitHub Pages.

**Verified live on 15 Sep 2026** (securityheaders.com, grade A+): `server: Netlify`,
and the `_headers` rules are applied. The Content Security Policy arrives as a real
header, once, not duplicated, so header and meta tag agree.

**Force HTTPS is on**, and Netlify therefore sends
`strict-transport-security: max-age=31536000` by itself. That line is not in `_headers`
and should not be added there. Consequence: for one year after a first visit, browsers
refuse to load the site over plain HTTP. Never test with `http://`, it will fail by
design, and that is not a fault of the site.

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
