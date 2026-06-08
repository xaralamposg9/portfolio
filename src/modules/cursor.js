/* Custom animated cursor: a small dot that tracks the pointer 1:1 and a
   larger ring that follows with easing and grows over interactive targets.
   Disabled automatically on touch / coarse pointers. */

export function initCursor() {
  // Skip on touch devices — a custom cursor there is pointless.
  if (!window.matchMedia('(pointer: fine)').matches) return

  const cursor = document.querySelector('.cursor')
  const dot = cursor?.querySelector('.cursor__dot')
  const ring = cursor?.querySelector('.cursor__ring')
  if (!cursor || !dot || !ring) return

  document.body.classList.add('has-cursor')

  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  let ringX = mouseX
  let ringY = mouseY

  window.addEventListener(
    'pointermove',
    (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Dot is instant for precision.
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    },
    { passive: true }
  )

  // Ring trails with a spring-like lerp.
  function loop() {
    ringX += (mouseX - ringX) * 0.18
    ringY += (mouseY - ringY) * 0.18
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
    requestAnimationFrame(loop)
  }
  loop()

  // Grow ring over anything tagged data-cursor="link" (or native a/button).
  const hoverSel = '[data-cursor="link"], a, button'
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(hoverSel)) cursor.classList.add('is-hover')
  })
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(hoverSel)) cursor.classList.remove('is-hover')
  })

  document.addEventListener('pointerdown', () => cursor.classList.add('is-down'))
  document.addEventListener('pointerup', () => cursor.classList.remove('is-down'))

  // Hide when the pointer leaves the window.
  document.addEventListener('mouseleave', () => (cursor.style.opacity = '0'))
  document.addEventListener('mouseenter', () => (cursor.style.opacity = '1'))
}
