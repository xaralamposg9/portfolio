/* Sticky navigation: condenses on scroll, drives a scroll-progress bar,
   highlights the active section via IntersectionObserver, and handles the
   mobile slide-in menu. */

export function initNav() {
  const nav = document.getElementById('nav')
  if (!nav) return

  const progress = nav.querySelector('.nav__progress')
  const toggle = nav.querySelector('.nav__toggle')
  const links = Array.from(nav.querySelectorAll('.nav__links a'))

  // --- Scrolled state + progress bar ---
  function onScroll() {
    const y = window.scrollY
    nav.classList.toggle('is-scrolled', y > 24)

    const docH = document.documentElement.scrollHeight - window.innerHeight
    const p = docH > 0 ? Math.min(y / docH, 1) : 0
    if (progress) progress.style.setProperty('--progress', p.toFixed(4))
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // --- Mobile menu ---
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open')
      toggle.setAttribute('aria-expanded', String(open))
      document.body.style.overflow = open ? 'hidden' : ''
    })
    // Close after choosing a destination.
    links.forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open')
        toggle.setAttribute('aria-expanded', 'false')
        document.body.style.overflow = ''
      })
    )
  }

  // --- Active section highlighting ---
  // Map each nav link to the section id it points at.
  const linkFor = new Map()
  links.forEach((a) => {
    const id = a.getAttribute('href')?.slice(1)
    if (id) linkFor.set(id, a)
  })

  // Sections declare which nav item they belong to via data-nav.
  const sections = Array.from(document.querySelectorAll('[data-nav]'))

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const navId = entry.target.getAttribute('data-nav')
        links.forEach((l) => l.classList.remove('is-active'))
        linkFor.get(navId)?.classList.add('is-active')
      })
    },
    // Trigger when a section crosses the upper-middle of the viewport.
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  )
  sections.forEach((s) => observer.observe(s))
}
