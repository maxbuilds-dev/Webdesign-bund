# webdesign-bund.at

Portfolio site for the web design business. Built with Claude Code.

## Structure

```
webdesign-bund/
├── CLAUDE.md          # project context — Claude Code reads this automatically
├── index.html         # the one-pager (hero, Leistungen, Ablauf, Portfolio, Über mich, Kontakt)
├── impressum.html     # Impressum / Offenlegung — STILL HAS PLACEHOLDERS
├── datenschutz.html   # Datenschutzerklärung — STILL HAS PLACEHOLDERS
├── 404.html           # error page in the same style
├── css/style.css      # design system + all sections, commented in German
├── js/script.js       # mobile nav, scroll reveals, mailto contact form
├── robots.txt
├── sitemap.xml
├── CNAME              # custom domain for GitHub Pages
├── .gitignore
└── .design/           # design reference, not published (dot folder = ignored by Pages)
```

## Design

Dark theme built on the original design reference: background `#0A0B0F`,
accent blue `#5B7FFF`, fonts Space Grotesk (headings) + Inter (body).
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
   - In the repo's Pages settings, enter `webdesign-bund.at` as the custom domain and enable "Enforce HTTPS" once DNS propagates.

## Before launch checklist

- [ ] **Impressum**: replace every `[PLATZHALTER]` (address, GISA number,
      Gewerbebehörde, Fachgruppe, UID if any) and delete the yellow `.todo-box`
- [ ] **Datenschutz**: add the address, delete the yellow `.todo-box`
- [ ] Check the three hero claims are ones you can keep: "Ab 2 Wochen",
      "100 % individuell", "Fixpreis"
- [ ] Swap the portfolio placeholder frame for a real screenshot of the
      Bioenergetik mq5 site (`.browser-body` in `index.html`)
- [ ] Add an OG image (`og:image`) so shared links show a preview
- [ ] Consider hosting the fonts locally instead of Google Fonts — it removes
      the Google section from the privacy policy and loads faster
- [x] Portfolio section links to the live Elke Bund KG site
- [x] Contact email is correct (office@webdesign-bund.at)
- [x] Mobile check — tested at 390 px, no horizontal scrolling

## Local preview

No build step. Either open `index.html` directly, or serve it so that the
mailto form and anchors behave exactly like on the live site:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
