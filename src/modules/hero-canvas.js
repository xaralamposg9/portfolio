/* Hero background: a lightweight "constellation" field. Particles drift
   slowly; nearby ones are linked with faint lines; the whole field eases
   toward the pointer for parallax. Capped + DPR-aware for performance,
   and paused when the hero scrolls out of view. */

export function initHeroCanvas() {
  const canvas = document.querySelector('.hero__canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = 0
  let height = 0
  let dpr = Math.min(window.devicePixelRatio || 1, 2)
  let particles = []
  let running = true
  let rafId = null

  // Pointer parallax (eased).
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }

  const ACCENT = [77, 141, 255] // --accent rgb
  const GLOW = [110, 231, 255] // --accent-glow rgb

  function resize() {
    const rect = canvas.getBoundingClientRect()
    width = rect.width
    height = rect.height
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Scale particle count to area, but keep it modest for performance.
    const count = Math.min(90, Math.floor((width * height) / 16000))
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
      glow: Math.random() > 0.85,
    }))
  }

  function step() {
    if (!running) return
    ctx.clearRect(0, 0, width, height)

    // Ease pointer toward target.
    pointer.x += (pointer.tx - pointer.x) * 0.05
    pointer.y += (pointer.ty - pointer.y) * 0.05
    const offX = (pointer.x - 0.5) * 40
    const offY = (pointer.y - 0.5) * 40

    // Move + draw particles.
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < -20) p.x = width + 20
      if (p.x > width + 20) p.x = -20
      if (p.y < -20) p.y = height + 20
      if (p.y > height + 20) p.y = -20

      const dx = p.x + offX * (p.glow ? 1.5 : 1)
      const dy = p.y + offY * (p.glow ? 1.5 : 1)
      const c = p.glow ? GLOW : ACCENT
      ctx.beginPath()
      ctx.arc(dx, dy, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${p.glow ? 0.9 : 0.5})`
      ctx.fill()
    }

    // Link nearby particles.
    const maxDist = 130
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i]
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.hypot(dx, dy)
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18
          ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x + offX, a.y + offY)
          ctx.lineTo(b.x + offX, b.y + offY)
          ctx.stroke()
        }
      }
    }

    rafId = requestAnimationFrame(step)
  }

  // Pointer tracking (normalized 0..1).
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.tx = e.clientX / window.innerWidth
      pointer.ty = e.clientY / window.innerHeight
    },
    { passive: true }
  )

  window.addEventListener('resize', resize)

  // Pause animation when the hero leaves the viewport (saves battery/CPU).
  const hero = document.querySelector('.hero')
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running && !rafId) step()
        else if (!running && rafId) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      },
      { threshold: 0 }
    ).observe(hero)
  }

  resize()
  step()
}
