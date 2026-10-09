# LinkedIn kit — Claude Code for designers

Ten ready-to-post concepts in your portfolio brand (Fraunces + Geist, hairline
dark surface, PM monogram). Five single posts, five carousels.

## Use it

Open `index.html` in a browser. No build step, no install.

- Hover any frame to play its entrance motion.
- **Download PNG** on a post → one 1080×1080 file.
- **Download all PNGs** on a carousel → every slide as a 1080×1350 file, in order.
- Or grab a single slide with the small **PNG** button under it.

Files are named `pm-<concept>-<nn>.png`, so a carousel downloads as an ordered
set you can drag straight into LinkedIn's multi-image upload.

## The concepts

**Posts (1080×1080)**

1. Flows, not screens
2. I stopped handing off mockups
3. 5 things I hand to Claude Code
4. A 70-page book, built in the browser (Playbook)
5. I write the front-end I design

**Carousels (1080×1350)**

1. How I use Claude Code as a designer — 8 slides
2. From Figma to a live prototype in an afternoon — 6 slides
3. 5 things Claude Code does so I can design — 7 slides
4. Mockups lie. Prototypes don't. — 6 slides
5. A week designing with Claude Code — 7 slides

## Edit the copy

- Posts live in `index.html`.
- Carousels are data in `carousels.js` — edit the `CAROUSELS` array (titles,
  steps, tools, commands). The renderer rebuilds the slides on reload.
- Brand tokens are at the top of `styles.css`, lifted verbatim from the
  portfolio's `app/globals.css`.

## Notes

- Dark theme only, matching the portfolio default.
- `?iso=<frame-id>` (e.g. `index.html?iso=c1-01`) isolates one frame at native
  size, top-left — handy for a clean manual screenshot.
- Fonts load from Google Fonts and PNG export uses html-to-image, both via CDN,
  so the first export needs a network connection.
