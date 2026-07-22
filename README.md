# Charalampos Photiou — Portfolio

Cinematic scroll portfolio. Plain HTML/CSS/JS in a single `index.html` —
GSAP ScrollTrigger drives the pinned scroll scenes (opener video scrub,
horizontal work gallery, campaigns card stack, closer). No build step.

## Run locally

```
python -m http.server 3000
```

then open http://localhost:3000.

## Deploy

Every push to `main` publishes the repo root to GitHub Pages via
`.github/workflows/deploy.yml`.

`cv/` holds the CV source (the site links the PDF in `assets/`).
