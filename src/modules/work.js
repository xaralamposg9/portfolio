/* Renders the project cards into #work-grid from the single PROJECTS data
   source, builds the platform filter chips into #work-filters, and wires up
   the filtering. Compact (no large screenshots) so the grid stays short even
   with many projects, and scales as new sites/platforms are added. */
import { PROJECTS } from '../data.js'

// Small inline arrow icon (kept out of HTML for cleanliness).
const ARROW = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
  stroke-linejoin="round" aria-hidden="true">
  <path d="M7 17 17 7M9 7h8v8"/></svg>`

// Human-readable labels for each stack key used on the filter chips.
// Add a line here whenever a new platform/stack is introduced in data.js.
const STACK_LABELS = {
  wordpress: 'WordPress · Elementor',
  modx: 'MODX',
  custom: 'Custom-coded',
}

export function renderProjects() {
  const grid = document.getElementById('work-grid')
  if (!grid) return

  // ---- 1. Build the compact cards ----
  grid.innerHTML = PROJECTS.map((p) => {
    const host = new URL(p.url).hostname.replace(/^www\./, '')
    const stack = p.stack || 'other'
    const platform = p.platform || ''
    return `
      <a class="pcard" href="${p.url}" target="_blank" rel="noopener"
         data-cursor="link" data-stack="${stack}"
         aria-label="${p.name} — open live site (opens in new tab)">
        <div class="pcard__media">
          <img src="./projects/${p.slug}.jpg"
               alt="Screenshot of the ${p.name} website"
               width="640" height="400" loading="lazy" decoding="async" />
          <span class="pcard__arrow">${ARROW}</span>
        </div>
        <div class="pcard__body">
          ${p.category ? `<p class="pcard__cat">${p.category}</p>` : ''}
          <h3 class="pcard__name">${p.name}</h3>
          <div class="pcard__foot">
            <span class="pcard__host">${host}</span>
            ${platform ? `<span class="pcard__platform pcard__platform--${stack}">${platform}</span>` : ''}
          </div>
        </div>
      </a>`
  }).join('')

  // ---- 2. Build the filter chips (only if a host element exists) ----
  const filters = document.getElementById('work-filters')
  if (!filters) return

  // Count projects per stack, preserving the order stacks first appear.
  const counts = {}
  const order = []
  PROJECTS.forEach((p) => {
    const s = p.stack || 'other'
    if (!(s in counts)) order.push(s)
    counts[s] = (counts[s] || 0) + 1
  })

  const chip = (filter, label, count) => `
    <button class="chip" type="button" data-filter="${filter}"
            aria-pressed="${filter === 'all'}" data-cursor="link">
      ${label} <span class="chip__count">${count}</span>
    </button>`

  filters.innerHTML =
    chip('all', 'All', PROJECTS.length) +
    order.map((s) => chip(s, STACK_LABELS[s] || s, counts[s])).join('')

  // ---- 3. Wire up filtering ----
  const chips = Array.from(filters.querySelectorAll('.chip'))
  const cards = Array.from(grid.querySelectorAll('.pcard'))

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip')
    if (!btn) return

    const filter = btn.dataset.filter
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === btn)))

    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.stack === filter
      card.classList.toggle('is-hidden', !show)
    })
  })
}
