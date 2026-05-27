# From Presence to Power — project notes

Static HTML book site. No build step, no framework — just `index.html`, `events.html`, `media.html` plus the `images/` directory.

## Mobile preview (no deploy needed)

The repo is **public**, so any push to `main` is instantly viewable on a phone without deploying:

- Primary: https://raw.githack.com/shane0192/from-presence-to-power/main/index.html
- Backup: https://htmlpreview.github.io/?https://github.com/shane0192/from-presence-to-power/blob/main/index.html

Use this for design review on mobile. The htmlpreview link is the more reliable of the two.

For preview of a feature branch, swap `main` for the branch name in the URL.

## Production deploy

Hosted on Vercel project **power-book** (team `shane-weareleanmeas-projects`, id `prj_6U2cAZsBJUxDzeZ51MIWnSKtQWw3`).

Vercel git integration is **not** wired up — pushes to GitHub do not auto-deploy. Deploys are manual via `vercel deploy --prod` from an authenticated local CLI. The web/remote container starts fresh each session with no Vercel auth, so deploy-from-Claude requires the user to paste a Vercel token first.

## Working on mobile changes

Mobile breakpoints in `index.html`:
- `@media (max-width: 960px)` — main mobile styles
- `@media (max-width: 640px)` — small phone refinements

GSAP scroll animations are wrapped in `if (window.innerWidth > 960)` and skipped on mobile.
