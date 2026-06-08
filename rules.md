# FPTP Book Website — Rules

## What It Is
The marketing/launch website for Rashad Robinson's book *From Presence to Power*. Static HTML, no build step or framework — `index.html`, `events.html`, `media.html`, `endorsements.html`, `praise.html`, `book.html` plus the `images/` directory.

## Brand System
Follows the **From Presence to Power** brand system. Source of truth: `../Presence to Power Design System (1)/`. For cross-brand/Rashad assets, see `Lean Mean/Rashad R/Rashad Robinson - General/rules.md`.

## Technical Notes
Full deploy + preview details live in `CLAUDE.md` in this folder. Key points:
- Repo is public — any push to `main` is instantly viewable on mobile via raw.githack / htmlpreview links (no deploy needed for design review).
- Production hosted on Vercel project **power-book** (team `shane-weareleanmeas-projects`). Git auto-deploy is NOT wired up — production deploys are manual via `vercel deploy --prod`.
- Mobile breakpoints in `index.html`: `@media (max-width: 960px)` and `@media (max-width: 640px)`. GSAP scroll animations are skipped on mobile (`window.innerWidth > 960`).

## Working Files
- `CLIENT-FEEDBACK-TRACKER.md` — running client feedback log
- `endorsement-quotes-source-of-truth.md` — canonical endorsement quotes
- `endorsements.html` / `praise.html` — endorsement display pages

## Conventions
- This is a client deliverable. Edit HTML/content carefully; preview on mobile before pushing.
- Don't restructure the brand system folder alongside this one — those are deliverable assets.
