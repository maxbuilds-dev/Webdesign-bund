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
├── llms.txt            # plain summary for AI assistants, see SEO and GEO
├── favicon.ico         # fallback for browsers that ask for /favicon.ico
├── .claude/skills/     # design skills for Claude Code, not published (netlify.toml)
├── css/style.css       # design tokens at the top, then section by section
├── css/fonts.css       # @font-face only
├── js/script.js        # nav, scroll reveals, contact form
└── assets/
    ├── fonts/          # Zodiak + Hanken Grotesk, self-hosted woff2
    └── img/            # bioenergetikmq5.jpg is the portfolio image, resized
                        # to 1600px and stripped of EXIF. No portrait photo of
                        # Max: he decided against one in Über mich.
                        # favicon.svg, favicon-32.png, apple-touch-icon.png:
                        # green dot, generated files (see Design system).
                        # og-bild.jpg: 1200x630 share image, rendered from
                        # HTML with the site fonts (see SEO and GEO).
                        # bekoela-konfigurator.jpg: second reference, see
                        # Page structure.
                        # druck-*.jpg: crops of both client sites for the
                        # hero and Leistungen; setzkasten.jpg: CC0 photo for
                        # Über mich (see Design system).
```
The HTML is deliberately not split into partials: that would need a build step or
runtime JavaScript, both of which contradict the stack decision above.

## Design system
**Design 3, "Abzüge an der Wand"**, built on branch `design-v3` on 19 Oct 2026 with
taste-skill after Max asked for a full redesign ("behalte den Grünton, alles andere bis
auf die Texte darfst du ändern"). **Not on `main` until Max approves the screenshots.**
Design 2 (light page, dark blocks, Space Grotesk/Inter, section labels, diagonal
lines) stays on `main` until then; design 1 is preserved on `backup/design-v1`
(commit d1aa586). Do not delete that branch.

Idea: Max's real built websites hang like prints on a dark gallery wall. taste-skill
dealt the direction "Photographs at uneven sizes" (seed 1693263509), hero "Two prints
in darkness", type Zodiak / Hanken Grotesk, palette "Sheet and biro" with its blue
replaced by Max's green. Sheet: `.taste-skill/direction.json` (git-ignored).

Everything is driven by CSS custom properties at the top of `css/style.css`.

- **Palette.** White ground `#FFFFFF`, ink `#111611`, muted `#566057`, one tone step
  `#EEF2EE` (mats behind screenshots, form fields), light green tint `#E6EDE7` for Über
  mich and Fragen. **One accent: forest green `#14532D`** (on dark `#7FD0A4`), dark
  fields green-black `#0E1C15` (hero, Kontakt, footer, 404, danke). **No blue, no
  indigo, no violet**, Max's "purple problem". No gradients, no glow, no blur, no glass,
  no shadows on resting surfaces (only the cookie panel and the mobile menu float), no
  1px dividers, no section labels, no card numerals, no pills. Corners are square.
- **Dark fields** carry `theme-dark`, which remaps the tokens. Add the class, nothing else.
- **Type.** Zodiak 300 (Fontshare, ITF Free Font License) for h1/h2, Zodiak 100 for the
  full width name in the footer; Hanken Grotesk (OFL) for everything else. Both
  self-hosted in `assets/fonts/`. Five sizes only (`--step-small` to `--step-display`).
  Every heading stays at two lines or fewer at every width; on phones h1/h2 are capped
  at 7.6vw for that reason.
- **Grid.** Twelve columns, one pair of outer margins (`--rand`). Each section places
  its parts on those columns, no two neighbours share a layout.
- **Header:** sticky, dark like the hero at the top, white once scrolled (`.scrolled`)
  or while the mobile menu is open. The Kontakt button is the one light rectangle over
  the hero, green on white. **Do not put `overflow-x: hidden` on `body`**; `html` has
  `overflow-x: clip`.
- **Hero:** large 4:5 print on the right showing the bioenergetik mobile site, crossfading
  between four sections (`druck-bio-1..4.jpg`, `js/script.js` section 1, pauses when the
  tab is hidden); small dimmed square on the left with the bekoela bed
  (`druck-bekoela-bett.jpg`); headline, sentence and buttons bottom left. The three facts
  moved to Über mich, "Kapazität für neue Projekte" moved to Kontakt.
- **Leistungen:** the six services as three text columns, two each, one size, titles in
  green; a print of the bekoela model list (`druck-bekoela-auswahl.jpg`) on the right.
- **Über mich:** text, then a wide photo of a letterpress type case
  (`setzkasten.jpg`, "Type case letterpress drawer", CC0, via rawpixel,
  https://www.rawpixel.com/image/6016674; no credit required) with the last paragraph on a
  white block, a green tile with the outline of Austria (Natural Earth, public domain,
  inline SVG) and the three facts. All paragraphs identical in colour and size.
- **Portfolio:** two works placed loosely, screenshots on a tone mat. The bioenergetik
  card has the page's one interactive thing: **Desktop / Smartphone** buttons that swap
  the screenshot (`js/script.js` section 10; hidden without JavaScript). The labels
  "Desktop" and "Smartphone" are new copy added by Claude.
- **Fragen:** wide heading, questions from column 5, no rules; an open question gets a
  white tile; chevron from two strokes.
- **Footer:** "Webdesign Bund" at full width in Zodiak 100, legal links below.
- **Cookie panel** is a non-modal panel bottom right (full width on phones). It does not
  lock the page; the footer gets extra bottom padding while it is open so it never hides
  Impressum and Datenschutz. Consent rules below are unchanged.
- **Motion:** hero parts rise in on load, section parts rise in staggered on scroll,
  the hero print crossfades and zooms very slowly, hover feedback on links, buttons,
  questions and screenshots. `prefers-reduced-motion` turns all of it off.
- Favicon: real files (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`,
  `/favicon.ico`), `img-src 'self'` stays plain.
- `og-bild.jpg` was re-rendered in this design (headline, two prints).

## Design skills (added 19 Oct 2026)
`.claude/skills/design-taste-frontend/` is taste-skill (Leonxlnx/taste-skill
@ b9ca2fd, MIT), committed so every cloud session on this repo loads it. Emil
Kowalski's skills (`emil-design-eng`, `apple-design`, `break-ui`,
`find-animation-opportunities`, `animation-performance`,
`animation-vocabulary`) come from Max's claude.ai account. Netlify must not
publish the folder; `netlify.toml` returns 404 for `/.claude/*`. Keep that rule.

How they rank against this file:
1. **This CLAUDE.md wins over every skill.** Skills are written for the open
   web and for new sites; this site has approved decisions.
2. **Approved design decisions are not skill findings.** Whatever Max approved
   stays, even if a skill or its linter flags it. Mention a conflict once if it
   seems relevant, then follow Max. (Design 3 itself was built with
   taste-skill and passes its inspector; the one allowed exception is
   `covered-text`, caused by the fixed cookie panel.)
3. **No full redesign unless Max asks for one.** Default use is review and
   polish of what exists. A full taste-skill run (draw a new direction) only on
   an explicit request, and then on a branch or as screenshots first, since
   the current design was approved.
4. **No external sources, whatever a skill suggests.** No Google Fonts link,
   no hotlinked images (picsum.photos, Unsplash, museum servers), no CDN
   scripts (GSAP, Lenis). Download into `assets/`, and update `_headers` plus
   the meta CSP only if a change truly needs it (it should not).
5. **Copy rules still apply** to anything a skill writes: no dashes, formal
   Sie, the Tone of voice section above.
6. Skill scripts (`node .claude/skills/design-taste-frontend/scripts/...`)
   may run during development; their output follows the rules above before it
   lands in the site.

## Page structure (single page, anchor nav, smooth scroll, no router)
Order changed by Max on 18 Sep 2026, Fragen added 18 Oct 2026. Nav: Home, Leistungen,
Über mich, Portfolio, Fragen, plus the Kontakt button.
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
   **Second reference since 18 Oct 2026: the bekoela configurator**
   (https://bekoela.com), a product configurator for made-to-measure beds that Max
   built. Placed right and lower than the first work (`.project-umgekehrt`), text on
   the left; there is only a desktop screenshot.
   `assets/img/bekoela-konfigurator.jpg` is cropped from Max's iPad screenshot to the
   configurator panel only: the page header was dropped because the WordPress admin
   bar ("Duplicate Post", "Willkommen, Max Bund") overlapped it, and the mouse
   pointer over "Wählen Sie Ihr Modell" was painted out. Resized to 1600x1034, EXIF
   stripped. The card text was written by Claude from what the screenshot shows
   (steps Modell, Bett, Material, Größe, Matratze; view with dimensions; live total
   price); Max should check it. Heading is now plural, "Ausgewählte Arbeiten".
5. Fragen (`#fragen`, light green tint like Über mich). Seven questions as native
   `<details>`/`<summary>`, no JavaScript. Added 18 Oct 2026 for GEO on Max's go.
   Genuine labelled questions, not rhetorical ones, so the Tone rule is not broken.
   Answers only state what the site states elsewhere; **no prices**, Max has given
   none. The same text sits in the JSON-LD as `FAQPage` and in `llms.txt`; change all
   three together. (Google shows FAQ rich results only for government and health
   sites since 2023; the markup is for AI systems and does no harm.)
6. Kontakt
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
  The one exception is the `<script type="application/ld+json">` block in index.html:
  it is a data block, never executed, so CSP does not apply to it (verified, no
  violation reported).
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

## SEO and GEO (added 17 Oct 2026)
GEO here means being found and recommended by AI assistants (ChatGPT, Claude,
Perplexity, Google AI Overviews), not just ranked by Google.

In the repo:
- Title "Webdesign Bund: Websites, WordPress und Onlineshops in Österreich", meta
  description with the six services and "in ganz Österreich", `robots` meta with
  `max-image-preview:large`, `lang="de-AT"`.
- Open Graph and Twitter tags with `assets/img/og-bild.jpg`. Regenerate it if the
  hero headline changes.
- **JSON-LD** in index.html: `ProfessionalService` (name, phone, full address,
  areaServed Österreich, the six services as an `OfferCatalog`), `Person` Max Bund,
  `WebSite`, both references as `CreativeWork`, and the Fragen as `FAQPage`. **No email** in it, on
  purpose: the address stays obfuscated on index.html. Keep it in sync with the
  visible Leistungen and the Impressum.
- Hero subline gained "in ganz Österreich" (Claude's addition, consistent with the
  Austria-wide audience decision). Location words like "Steiermark" or
  "Deutschlandsberg" appear only in machine-readable places (JSON-LD, llms.txt,
  Impressum), never in visible copy, per the Audience rule.
- `robots.txt` allows everything, including AI crawlers. The old `Disallow` lines
  for Impressum and Datenschutz were removed: they stopped crawlers from ever seeing
  the `noindex`. **Impressum is now indexable** (it establishes who the business is,
  which both Google and AI systems use); Datenschutz, danke and 404 stay `noindex`.
- `sitemap.xml` lists the start page and the Impressum with `lastmod`. Update the
  date on bigger content changes.
- `llms.txt` at the root: a factual summary for AI assistants (who, services,
  terms, reference, contact). It is a proposed convention; no major AI provider has
  confirmed using it, so it is cheap insurance, not a guarantee. It contains the
  mail address (low-traffic file, the Impressum has it in plain text anyway).
  `_headers` serves it with `charset=utf-8` so umlauts survive.

Outside the repo, only Max can do these, and they matter more than anything above:
Google Search Console (verify domain, submit sitemap), Bing Webmaster Tools (ChatGPT
search draws on the Bing index), a Google Business Profile as a service-area
business with the address hidden, consistent entries in directories (Herold, WKO
Firmen A bis Z), Google reviews from clients, and a credit link in the footer of
bioenergetik-mq5.at. Once profiles exist, add their URLs as `sameAs` in the JSON-LD.

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
