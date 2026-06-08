# Charalampos Photiou — Portfolio

A polished, animation-rich single-page portfolio for **Charalampos Photiou**,
Web Developer & Digital Marketing Executive (Limassol, Cyprus).

Dark theme, custom animated cursor, canvas constellation hero, smooth scrolling,
scroll-triggered reveals, animated counters, 3D-tilt project cards, and a sticky
nav with active-section highlighting. Built to load fast and score well on
Lighthouse (semantic HTML, alt text, meta + Open Graph tags, `prefers-reduced-motion`
support).

## Tech stack

- **[Vite](https://vite.dev/)** — build tool & dev server
- **Vanilla JavaScript** (ES modules) — no framework
- **Plain CSS** — design tokens via CSS custom properties
- **[GSAP](https://gsap.com/) + ScrollTrigger** — load & scroll animations
- **[Lenis](https://github.com/darkroomengineering/lenis)** — smooth scrolling
- **[Puppeteer](https://pptr.dev/)** — *dev only*, used once to screenshot the live project sites

All dependencies are free/open-source. The site builds to a fully static `/dist`
folder you can host anywhere (GitHub Pages, Netlify, Cloudflare Pages, any static host).

## Project structure

```
.
├─ index.html                 # All content as semantic HTML (8 sections)
├─ vite.config.js             # base: './' so it works on GitHub Pages project sites
├─ src/
│  ├─ main.js                 # Bootstraps modules; central reduced-motion guard
│  ├─ data.js                 # The 12 projects + their live URLs (single source of truth)
│  ├─ styles/                 # base.css · layout.css · components.css
│  └─ modules/                # cursor · nav · smooth-scroll · reveal · counters · tilt · hero-canvas · work
├─ public/
│  ├─ favicon.svg · og-image.svg
│  ├─ projects/<slug>.jpg     # Auto-captured screenshots of the 12 live sites
│  └─ headshot.jpg            # (optional) drop your photo here — see below
├─ scripts/
│  ├─ screenshot-sites.mjs    # Regenerates the 12 project thumbnails
│  └─ shot.mjs                # Local visual-QA helper
└─ .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
```

## Run locally

> Requires **Node.js 18+** (Node 20+ recommended) and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:3000
```

Edit files in `src/` and the page hot-reloads.

## Build for production

```bash
npm run build    # outputs static files to /dist
npm run preview  # serve the built /dist locally → http://localhost:4173
```

## Editing content

- **Text** (about, experience, certs, etc.) lives directly in [`index.html`](index.html).
- **The 12 projects** (name, URL, category, description) live in
  [`src/data.js`](src/data.js). The Work grid is generated from this list, so editing
  it updates both the cards and the screenshot script.
- **Colors / fonts / spacing** are CSS variables at the top of
  [`src/styles/base.css`](src/styles/base.css).

### Add your headshot

The About section shows a designed "CP" monogram by default. To use a real photo,
drop a portrait-orientation image at **`public/headshot.jpg`** and rebuild — it will
replace the monogram automatically (the monogram remains a fallback if the file is
missing).

### Regenerate project screenshots

Thumbnails are committed to `public/projects/`, so you normally don't need to do this.
To refresh them (uses your **system Chrome**, no extra downloads):

```bash
npm run shots
```

## Deploy to GitHub Pages

`vite.config.js` sets `base: './'`, so the build works whether it's served from a
project site (`username.github.io/repo/`) or a user/custom-domain site.

### Option A — automatic (recommended)

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
3. Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
   which builds and publishes `/dist`. Your site goes live at the URL shown under
   **Settings → Pages**.

### Option B — manual

```bash
npm run build
# then publish the contents of /dist to a `gh-pages` branch, e.g. with:
npx gh-pages -d dist
```
Then set **Settings → Pages → Source: "Deploy from a branch" → `gh-pages` / root**.

> **Custom domain?** Add a `CNAME` file (containing your domain) to `public/` and it
> will be copied into `dist` on build.

## Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `section`, `footer`), a skip link, visible
  focus rings, and descriptive `alt` text on every image.
- Honors `prefers-reduced-motion`: cursor, canvas, smooth scroll, and reveals are
  disabled/instant for users who request reduced motion.
- Content is real HTML (not JS-rendered), so it's crawlable and fast to first paint.
- Images are lazy-loaded; the JS bundle is ~55 kB gzipped (incl. GSAP + Lenis).

## License

MIT © Charalampos Photiou
