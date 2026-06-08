/* ============================================================
   MAIN — bootstraps the portfolio.
   Imports styles, wires up every interaction module, and
   centrally respects prefers-reduced-motion.
   ============================================================ */
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'

import { renderProjects } from './modules/work.js'
import { initNav } from './modules/nav.js'
import { initCursor } from './modules/cursor.js'
import { initSmoothScroll } from './modules/smooth-scroll.js'
import { initReveal } from './modules/reveal.js'
import { initCounters } from './modules/counters.js'
import { initTilt } from './modules/tilt.js'
import { initHeroCanvas } from './modules/hero-canvas.js'

// Does the user prefer reduced motion? Single source of truth.
const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

// Mark the document as JS-enabled so [data-reveal] elements can start hidden.
// (Without JS they stay visible — progressive enhancement.)
document.documentElement.classList.add('js')

function boot() {
  // Footer year
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = String(new Date().getFullYear())

  // Build the 12 project cards from the single data source.
  renderProjects()

  // Always-on (lightweight, accessible) interactions.
  initNav()
  initCounters({ reduceMotion })

  if (reduceMotion) {
    // Reveal everything immediately, skip heavy motion.
    document
      .querySelectorAll('[data-reveal]')
      .forEach((el) => (el.style.opacity = '1'))
    return
  }

  // Motion-rich enhancements.
  initSmoothScroll() // Lenis
  initReveal() // GSAP ScrollTrigger
  initTilt()
  initHeroCanvas()
  initCursor()
}

// If anything throws, fail safe: make sure all content is visible.
try {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true })
  } else {
    boot()
  }
} catch (err) {
  console.error('Init error — revealing content as fallback:', err)
  document
    .querySelectorAll('[data-reveal]')
    .forEach((el) => (el.style.opacity = '1'))
}
