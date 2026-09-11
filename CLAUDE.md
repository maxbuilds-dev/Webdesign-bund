# webdesign-bund.at — Project Context

## Business
- Owner: Max Bund, Einzelunternehmer (freies Gewerbe, Webdesign), Austria (Deutschlandsberg area)
- Kleinunternehmerregelung — no VAT on invoices unless this changes
- ÖNACE 62.10-0
- Domain: webdesign-bund.at
- Contact: office@webdesign-bund.at

## What this site is
Portfolio/landing page for the web design business itself — not a client project. Purpose: convince local Austrian businesses without a website, or with an outdated one, to hire Max. This site IS the sales pitch used in cold outreach, so it needs to look sharper than an average small-business site.

## Audience
Small local business owners, likely not tech-savvy, deciding whether to trust someone with their online presence. Copy should be simple, benefit-focused, confidence-inspiring — avoid jargon.

## Language
German (matches target market and the tone of the first client project).

## Tech stack
Plain HTML/CSS/JS. No framework, no build step, no npm dependencies. Reasons: matches the existing GitHub Pages deployment pattern already in use, and stays maintainable without a deep HTML/CSS/JS background. Don't introduce a framework or bundler unless explicitly asked.

## Deployment
GitHub Pages, same pattern as the Elke Bund KG site. Custom domain via the CNAME file in this repo + DNS records at World4You — see README.md for the exact steps.

## Page structure (single-page, scroll + anchor nav — proven pattern from the client site)
1. Hero — value proposition, one clear call to action
2. Services — what's offered (new builds, redesigns, maybe maintenance/hosting help)
3. Portfolio — feature the Elke Bund KG project (bioenergetik-mq5) as the main proof point:
   https://maxbuilds-dev.github.io/bioenergetikmq5/index.html
4. About — brief, credible, not overblown (real background: new business, hands-on approach)
5. Contact — email, optionally a simple mailto-based form
6. Impressum — legally required, see note below

## Legal note — flag before publishing
Impressum must comply with Austrian ECG §5 and needs Max's real business details (legal name, address, Gewerbe details, FN if applicable, UID if registered for it). Placeholder values are in impressum content — do not launch with placeholders still in place. This is not legal advice; if anything about the requirements looks uncertain, say so rather than asserting it.

## Working style
Direct and iterative. Build section by section, show progress rather than a big single dump. If content or copy decisions are being assumed rather than given, say so explicitly before proceeding.
