import { useEffect, useState } from 'react'

// Estado do header fixo:
// - hidden: rolando p/ baixo depois de 80px (esconde)
// - solid: passou de 80px (ganha fundo ao reaparecer)
// - light: a seção sob o header tem data-theme="light" (texto preto, fundo branco)
export function useHeaderState(threshold = 80) {
  const [state, setState] = useState({ hidden: false, solid: false, light: false })

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      const goingDown = y > lastY
      lastY = y

      // Seção que está passando sob a linha do header (~36px do topo)
      let light = false
      const sections = document.querySelectorAll('[data-theme]')
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= 36 && r.bottom > 36) {
          light = s.dataset.theme === 'light'
          break
        }
      }

      setState((prev) => {
        const next = {
          solid: y > threshold,
          hidden: y > threshold && goingDown ? true : goingDown ? prev.hidden : false,
          light,
        }
        return next.solid === prev.solid && next.hidden === prev.hidden && next.light === prev.light ? prev : next
      })
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return state
}
