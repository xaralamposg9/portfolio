/* Renders the 12 project cards into #work-grid from the single
   PROJECTS data source, so markup and the screenshot script never
   drift apart. Screenshots live in /public/projects/<slug>.jpg. */
import { PROJECTS } from '../data.js'

// Small inline arrow icon (kept out of HTML for cleanliness).
const ARROW = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
  stroke-linejoin="round" aria-hidden="true">
  <path d="M7 17 17 7M9 7h8v8"/></svg>`

export function renderProjects() {
  const grid = document.getElementById('work-grid')
  if (!grid) return

  const cards = PROJECTS.map((p, i) => {
    const host = new URL(p.url).hostname.replace(/^www\./, '')
    const num = String(i + 1).padStart(2, '0')
    return `
      <a class="project" href="${p.url}" target="_blank" rel="noopener"
         data-cursor="link" data-tilt
         aria-label="${p.name} — open live site (opens in new tab)">
        <div class="project__media">
          <span class="project__index">${num}</span>
          <span class="project__arrow">${ARROW}</span>
          <img src="./projects/${p.slug}.jpg"
               alt="Screenshot of the ${p.name} website"
               width="640" height="400" loading="lazy" decoding="async" />
        </div>
        <div class="project__body">
          <p class="project__cat">${p.category}</p>
          <h3 class="project__name">${p.name}</h3>
          <p class="project__desc">${p.description}</p>
          <span class="project__host">${host} ↗</span>
        </div>
      </a>`
  }).join('')

  grid.innerHTML = cards
}
