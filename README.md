# webdesign-bund.at

Portfolio site for the web design business. Built with Claude Code.

## Structure

```
webdesign-bund/
├── index.html          # the single page, all visible copy lives here
├── impressum.html      # Impressum / Offenlegung, real data, complete
├── datenschutz.html    # Datenschutzerklärung, real data, complete
├── 404.html            # error page, must stay at root
├── robots.txt          # must stay at root to be read by search engines
├── sitemap.xml         # must stay at root
├── _headers            # real HTTP headers on Netlify (CSP and friends)
├── netlify.toml        # publish the repo root, no build step
├── CNAME               # leftover from GitHub Pages, harmless on Netlify
├── .gitignore
├── README.md
├── CLAUDE.md           # project context, Claude Code reads this automatically
├── css/
│   ├── style.css       # design tokens, then all sections, commented in German
│   ├── fonts.css       # @font-face rules only
│   └── nojs.css        # loaded via <noscript>, makes hidden sections visible
├── js/
│   └── script.js       # nav, scroll reveals, contact form, consent manager
└── assets/
    ├── fonts/          # Inter + Space Grotesk, self-hosted woff2
    └── img/            # logo and screenshots, no portrait photo by choice
```

The page is not split into partials on purpose. Doing that without a build step would
need runtime JavaScript, which would slow the page down, hurt search engines, and
contradict the no-framework decision.

## Design

Dark theme built on the original design reference: background `#0A0B0F`,
accent blue `#5B7FFF`, fonts Space Grotesk (headings) + Inter (body).
The fonts are self-hosted in `assets/fonts/` — no request ever goes to Google, which
is why the privacy policy has no Google section. Both are variable fonts, so
one file per subset covers every weight (180 KB total, and `latin-ext` is only
downloaded if a character from it actually appears).
All colours, spacing and radii are CSS custom properties at the top of
`css/style.css` — change them there once and the whole site follows.

## Starting a new client project

See **`PROJEKTSTART.md`**. It contains the data to collect from the client before
anything is written, a `CLAUDE.md` template to drop into the empty repo, and one
complete prompt that produces the whole site including Impressum, Datenschutz,
consent manager and the security baseline. It also lists the mistakes made while
building this site so they are not repeated.

## Working with Claude Code

1. Open this folder in Claude Code (or push it to a repo and connect that repo, same as the Elke Bund KG project).
2. Claude Code will read `CLAUDE.md` automatically for context — no need to re-explain the business or the goal each session.
3. Build/iterate section by section (hero, services, portfolio, about, contact, impressum).

## Deploying (Netlify)

GitHub is only the place where the code lives. The live site is served by Netlify,
which deploys automatically on every push to `main`.

1. Netlify → **Add new site → Import an existing project** → connect this GitHub repo.
2. Build command: none. Publish directory: the repo root. `netlify.toml` already says so,
   so the defaults it offers should already be correct.
3. Custom domain: **Site configuration → Domain management → Add a domain** →
   `webdesign-bund.at`.
4. At World4You, point the domain at Netlify with the records Netlify shows you
   (an `A` record to their load balancer plus a `CNAME` for `www`, or Netlify DNS if you
   move the nameservers). Read the values off the Netlify panel, do not copy them from
   here, they change.
5. Netlify issues a Let's Encrypt certificate automatically once DNS resolves. Check that
   **HTTPS** is active and switch on **Force HTTPS** in the domain settings.
6. Turn GitHub Pages **off** in the repo settings, otherwise two services claim the same
   domain. The `CNAME` file in this repo is a leftover from that setup. Netlify ignores
   it, so it can stay until Pages is switched off, then it may be deleted.

`_headers` sends the Content Security Policy and the other security headers as real HTTP
headers. That was impossible on GitHub Pages. The `<meta http-equiv>` tags in the HTML
stay as well, so the policy also holds in a local preview. **If you change a policy in
one place, change it in the other too**, otherwise the browser enforces the intersection
of the two and something breaks silently.

## Security notes

The site has no backend, no secrets and no third-party resources. A few things are set
up deliberately and are easy to break by accident:

- A **Content Security Policy** forbids anything external. It is set twice: as a meta tag
  on every page and as a real header in `_headers`. Because
  of it, inline `<style>` blocks, inline `<script>` blocks and `style="..."` attributes
  are blocked and will silently do nothing. Put CSS in `css/` and JS in `js/`.
- The **mail address is assembled by JavaScript** on `index.html`, so it is not sitting in
  the HTML for spam harvesters. On `impressum.html` and `datenschutz.html` it stays in
  plain text on purpose, because Austrian law requires it to be directly accessible there.
- **Never commit keys or passwords.** Nothing here needs them. If a form service like
  Formspree or EmailJS is added later, only its public key belongs in the client code.

## Before launch checklist

- [x] **Impressum**: complete, real business data, no placeholders left
- [ ] Confirm the WKO Fachgruppe with the chamber. It currently reads
      "Fachgruppe Werbung und Marktkommunikation", derived from the
      Gewerbewortlaut but not yet verified. One phone call to WK Steiermark
- [x] **Datenschutz**: complete, real address in place
- [x] Hero claims confirmed by Max: "Ab 1 Woche", "100 % individuell", "Fixpreis"
- [ ] Swap the portfolio placeholder frame for a real screenshot of the
      Bioenergetik mq5 site (`.browser-body` in `index.html`)
- [ ] Add an OG image (`og:image`) so shared links show a preview
- [x] Fonts hosted locally instead of Google Fonts
- [x] Portfolio section links to the live Elke Bund KG site
- [x] Contact email is correct (office@webdesign-bund.at)
- [x] Mobile check — tested at 390 px, no horizontal scrolling

## Local preview

No build step. Either open `index.html` directly, or serve it so that the
mailto form and anchors behave exactly like on the live site:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
