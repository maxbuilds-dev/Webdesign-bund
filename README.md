# webdesign-bund.at

Portfolio site for the web design business. Built with Claude Code.

## Structure

```
webdesign-bund/
├── CLAUDE.md        # project context — Claude Code reads this automatically
├── index.html       # the page
├── css/style.css
├── js/script.js
├── CNAME             # custom domain for GitHub Pages
└── .gitignore
```

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

- [ ] Impressum has real business details, not placeholders
- [ ] Portfolio section links to the live Elke Bund KG site
- [ ] Contact email is correct (office@webdesign-bund.at)
- [ ] Mobile check — most local business owners will open this on a phone
