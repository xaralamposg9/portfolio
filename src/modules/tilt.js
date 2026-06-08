/* Subtle 3D tilt for project cards. On pointer move we set --rx / --ry
   CSS variables the card's transform reads. Pure transform = cheap + smooth.
   Skipped on coarse pointers (touch). */

const MAX_TILT = 6 // degrees

export function initTilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    let raf = null

    function onMove(e) {
      const rect = card.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width // 0..1
      const py = (e.clientY - rect.top) / rect.height
      const ry = (px - 0.5) * 2 * MAX_TILT // left/right
      const rx = (0.5 - py) * 2 * MAX_TILT // up/down

      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--ry', ry.toFixed(2) + 'deg')
        card.style.setProperty('--rx', rx.toFixed(2) + 'deg')
      })
    }

    function reset() {
      if (raf) cancelAnimationFrame(raf)
      card.style.setProperty('--ry', '0deg')
      card.style.setProperty('--rx', '0deg')
    }

    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', reset)
  })
}
