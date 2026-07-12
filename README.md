# jacquimelman.com — rebuilt

A complete rebuild of [jacquimelman.com](https://www.jacquimelman.com), the portfolio and
teaching site of **Jacqui Melman** — New Jersey sculptor, painter, and mixed-media artist,
and founder of a stone carving school in Manalapan, NJ.

The previous site was hosted on Wix. This rebuild is a fast, dependency-free static site:
plain HTML, CSS, and a small vanilla-JS file. No build step, no framework, nothing to
maintain — it can be hosted anywhere (GitHub Pages, Netlify, Cloudflare Pages, any web host).

## Pages

| Page | File | Contents |
|---|---|---|
| Home | `index.html` | Hero, three-medium overview, lessons teaser, contact CTA |
| About | `about.html` | Artist bio, training, influences, milestones |
| Gallery | `gallery.html` | Filterable grid (paintings / sculpture / mixed media) with lightbox |
| Lessons | `lessons.html` | Stone carving classes in Manalapan, NJ |
| Contact | `contact.html` | Contact form + studio info cards |

Shared assets: `css/style.css`, `js/main.js`, `images/art/*.svg`.

## ⚠️ Placeholders to replace before launch

The original site's images couldn't be exported automatically, so every artwork image is a
clearly-labeled **SVG placeholder** in `images/art/`. To finish the site:

1. **Artwork photos** — export the photos from the old Wix site (Wix dashboard → Media
   Manager → download), then drop them into `images/art/` and update the `<img src>` paths
   in `index.html`, `about.html`, `gallery.html`, and `contact.html`. Portrait-orientation
   images (~4:5) will fit the existing layout best; the gallery crops to 4:5 automatically.
   Known piece titles already wired into the gallery: **Surrender**, **Family**,
   **Palomino**, and **Brain Tumor**. The "Stone Study" and "Assemblage" entries are
   placeholder names — rename them to the real titles in `gallery.html`.
2. **Contact form** — the form currently falls back to a `mailto:` link with a placeholder
   address (`hello@jacquimelman.com`). Either update that address in `js/main.js`, or wire
   the form to a real endpoint (see the TODO comment in `contact.html`; Formspree and
   Netlify Forms are both free and take ~5 minutes).
3. **Artist portrait & studio photos** — replace `images/art/portrait.svg` and
   `images/art/studio.svg`.
4. **Quotes** — the two pull-quotes (about + lessons pages) are editorial placeholders;
   replace them with Jacqui's own words or remove them.

## Local preview

Any static server works:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages

Repo → Settings → Pages → "Deploy from a branch" → pick the branch and `/ (root)`.
To use the jacquimelman.com domain, add a `CNAME` file containing `www.jacquimelman.com`
and point the domain's DNS at GitHub Pages.

## Design notes

- **Palette**: warm paper/stone neutrals with a terracotta accent — chosen to stay out of
  the way of the artwork.
- **Type**: [Fraunces](https://fonts.google.com/specimen/Fraunces) for display,
  [Work Sans](https://fonts.google.com/specimen/Work+Sans) for body (Google Fonts, with
  system fallbacks).
- **Accessibility**: semantic landmarks, keyboard-operable gallery and lightbox, visible
  focus styles, `prefers-reduced-motion` support.
- **SEO**: unique titles and meta descriptions per page, targeting the same phrases the old
  site ranked for ("NJ sculpting lessons", "stone carving Manalapan").
