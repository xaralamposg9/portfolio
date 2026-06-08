/* Scroll-triggered reveals using GSAP + ScrollTrigger.
   - The hero title lines do a masked slide-up on load.
   - Everything tagged [data-reveal] fades/slides in on scroll.
   - Grouped children (skills, work cards, timeline) stagger. */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initReveal() {
  // ---- Hero load sequence (masked line reveal) ----
  const lines = document.querySelectorAll('.hero__title .line__inner')
  const heroBits = document.querySelectorAll('.hero [data-reveal]')

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
  intro
    .from(lines, {
      yPercent: 115,
      duration: 1.1,
      stagger: 0.12,
    })
    .to(
      heroBits,
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
      '-=0.6'
    )

  // Set hero reveal items to a start offset before the timeline runs.
  gsap.set(heroBits, { y: 24 })

  // ---- Generic scroll reveals (everything outside the hero) ----
  // Exclude the hero (handled above) and grouped children (staggered below)
  // so no element gets two competing tweens.
  const items = gsap.utils
    .toArray('[data-reveal]')
    .filter((el) => !el.closest('.hero') && !el.matches('.skill-card'))

  items.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 34 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
  })

  // ---- Staggered groups: animate children together for rhythm ----
  const groups = [
    { parent: '.skills__grid', children: '.skill-card' },
    { parent: '.work__grid', children: '.project' },
  ]
  groups.forEach(({ parent, children }) => {
    const wrap = document.querySelector(parent)
    if (!wrap) return
    const kids = wrap.querySelectorAll(children)
    gsap.fromTo(
      kids,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: wrap, start: 'top 80%' },
      }
    )
  })

  // Recalculate once images/fonts settle so triggers line up.
  window.addEventListener('load', () => ScrollTrigger.refresh())
}
