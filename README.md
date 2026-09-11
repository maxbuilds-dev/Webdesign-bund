# webdesign-bund.at

Portfolio site for the web design business. Built with Claude Code.

## Structure

```
webdesign-bund/
├── index.html          # the single page, all visible copy lives here
├── impressum.html      # Impressum / Offenlegung, STILL HAS PLACEHOLDERS
├── datenschutz.html    # Datenschutzerklärung, STILL HAS PLACEHOLDERS
├── 404.html            # error page, must stay at root
├── robots.txt          # must stay at root to be read by search engines
├── sitemap.xml         # must stay at root
├── CNAME               # custom domain for GitHub Pages
├── .gitignore
├── README.md
├── CLAUDE.md           # project context, Claude Code reads this automatically
├── css/
│   ├── style.css       # design tokens, then all sections, commented in German
│   ├── fonts.css       # @font-face rules only
│   └── nojs.css        # loaded via <noscript>, makes hidden sections visible
├── js/
│   └── script.js       # nav, scroll reveals, mailto contact form
└── assets/
    ├── fonts/          # Inter + Space Grotesk, self-hosted woff2
    └── img/            # logo, screenshots, portrait photo
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

## Working with Claude Code

1. Open this folder in Claude Code (or push it to a repo and connect that repo, same as the Elke Bund KG project).
2. Claude Code will read `CLAUDE.md` automatically for context — no need to re-explain the business or the goal each session.
3. Build/iterate section by section (hero, services, portfolio, about, contact, impressum).

## Deploying (GitHub Pages, same pattern as the client site)

1. `git init`, commit, push to a new GitHub repo.
2. In the repo: **Settings → Pages** → set source to the main branch (root or `/docs`, pick one and stay consistent).
3. For the custom domain:
   - Keep the `CNAME` file in this repo (already set to `webdesign-bund.at`).
   - At World4You, add a DNS record pointing `webdesign-bund.at` to GitHub Pages (an `A` record to GitHub's IPs, or a `CNAME` record if using a subdomain like `www`). GitHub's own Pages docs have the current IP list — check before setting this, IPs occasionally change.
   - In the repo's Pages settings, enter `webdesign-bund.at` as the custom domain and enable "Enforce HTTPS" once DNS propagates. **Do not skip the HTTPS step** — without it the site is served over plain HTTP and browsers will flag it.

## Security notes

The site has no backend, no secrets and no third-party resources. A few things are set
up deliberately and are easy to break by accident:

- A **Content Security Policy** meta tag on every page forbids anything external. Because
  of it, inline `<style>` blocks, inline `<script>` blocks and `style="..."` attributes
  are blocked and will silently do nothing. Put CSS in `css/` and JS in `js/`.
- The **mail address is assembled by JavaScript** on `index.html`, so it is not sitting in
  the HTML for spam harvesters. On `impressum.html` and `datenschutz.html` it stays in
  plain text on purpose, because Austrian law requires it to be directly accessible there.
- **Never commit keys or passwords.** Nothing here needs them. If a form service like
  Formspree or EmailJS is added later, only its public key belongs in the client code.

## Before launch checklist

- [ ] **Impressum**: one field left, the WKO Fachgruppe. Replace the
      `[PLATZHALTER]` and delete the yellow `.todo-box` below it
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
