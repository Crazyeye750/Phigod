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

## Artwork

The gallery now features twelve of Jacqui's real works (photos supplied by the owner,
resized and optimized in `images/art/`). The red-stone crouching figure appears twice on
the site from two angles (`sculpture-figure.jpg` on the home hero and gallery,
`sculpture-figure-2.jpg` on the about page) — it is treated as one piece in the gallery.
Titles that could be confirmed or confidently matched:

- **Instruments** (oil, 1996) — title taken from the original site's lightbox caption.
- **Palomino** (pastel) — matched to the horse pastel; the title is referenced in press
  about the original site.
- **Family** (oil) — matched to the figures-under-a-swirling-sun oil, which fits the
  published description ("post-impressionists with a nod to Van Gogh's Starry Night").

Everything else is listed as **Untitled** with a medium line. **Please correct titles,
media, and years in `gallery.html`** — including the known works *Surrender* and
*Brain Tumor*, which are likely among the untitled entries but couldn't be identified
with confidence. Years shown were read from signatures and may be wrong.

## ⚠️ Remaining placeholders / TODOs

1. **Contact form** — the form currently falls back to a `mailto:` link with a placeholder
   address (`hello@jacquimelman.com`). Either update that address in `js/main.js`, or wire
   the form to a real endpoint (see the TODO comment in `contact.html`; Formspree and
   Netlify Forms are both free and take ~5 minutes).
2. **Studio photos** — `images/art/studio.svg` (lessons page) is still a labeled SVG
   placeholder. The artist portrait (about) and outdoor photo (contact) are real.
3. **Quotes** — the two pull-quotes (about + lessons pages) are editorial placeholders;
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
