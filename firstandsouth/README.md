# First and South — site rebuild

A rebuild of firstandsouth.com as a static, dependency-free site: three HTML
pages, one stylesheet, one small JavaScript file. No build step, no framework —
same conventions as the rest of this repository.

```
firstandsouth/
├── index.html        home
├── menus.html        all day / happy hour / brunch / drinks / kids / groups
├── visit.html        hours, location, map, reservations, group dining
├── assets/
│   ├── styles.css
│   └── site.js
└── images/           photo slots — see images/README.md
```

## What it does

- **Live open/closed badge.** `assets/site.js` holds one `HOURS` table and
  derives the status bar, the "today" highlight on the homepage week grid, and
  the highlighted row in the hours table on `visit.html`. It reads the current
  time in `America/New_York`, so a visitor in another timezone still sees the
  right answer. Change hours in one place.
- **Graceful photo slots.** A missing image removes itself and leaves a labelled
  chalk panel rather than a broken-image icon.
- **No hard dependencies.** Google Fonts is the only external request, and there
  is a system serif/sans fallback stack if it fails.
- Responsive down to 320px, keyboard-navigable, `prefers-reduced-motion`
  respected, skip link, `Restaurant` JSON-LD on the homepage.

## Before this goes live — content to verify

The live site and every third-party menu mirror are blocked by this
environment's network egress policy, so the copy was reconstructed from public
sources (press coverage, search listings, directory entries). **Everything below
needs a pass from the restaurant before publishing.**

Confirmed against multiple sources:

- 100 South Street, Greenport, NY 11944 · (631) 333-2200
- Mon/Tue/Thu 12–8, Fri/Sat 12–9, Sun 10–3 brunch only, closed Wednesdays
- Happy hour Mon–Fri 4–6pm
- Opened 2012 by Sarah Phillips Loth and Dan Domingo
- Mussel Monday ($19), Tuesday pupusas/tacos with live music 6–9pm, first-Friday
  live music
- Deep Roots Farm (Southold) and Latham Farms (Orient) as suppliers

Needs checking:

- **Menu items and prices.** Dish names come from directory listings and may be
  stale. Only six prices could be sourced (chowder 13.50, mussels 19, and the
  brunch items); everything else deliberately shows no price rather than an
  invented one.
- **The reservations link.** `visit.html#reserve` currently falls back to the
  telephone number. There is a comment marking where the Resy / OpenTable / Tock
  URL goes.
- **Social links.** Only Facebook is linked. Add Instagram if there is one.
- Dietary/allergen notes, gift cards, and any events calendar are not
  represented — none of that could be read from the live site.

## Preview

The repo is public, so a pushed branch previews on a phone without deploying:

```
https://htmlpreview.github.io/?https://github.com/shane0192/from-presence-to-power/blob/claude/restaurant-website-rebuild-46850p/firstandsouth/index.html
```

Locally: `python3 -m http.server 8000` from the repo root, then
<http://localhost:8000/firstandsouth/>.
