/* Animated counters — each [data-count] number eases from 0 to its target
   the first time it scrolls into view. Honors reduced-motion by jumping
   straight to the final value. Formats thousands with a comma. */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function format(n) {
  return Math.round(n).toLocaleString('en-US')
}

export function initCounters({ reduceMotion } = {}) {
  const nums = document.querySelectorAll('[data-count]')

  nums.forEach((el) => {
    const target = parseFloat(el.dataset.count)
    const suffix = el.dataset.suffix || ''

    if (reduceMotion) {
      el.textContent = format(target) + suffix
      return
    }

    const obj = { v: 0 }
    gsap.to(obj, {
      v: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => (el.textContent = format(obj.v) + suffix),
      onComplete: () => (el.textContent = format(target) + suffix),
    })
  })
}
