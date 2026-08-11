import { useEffect, useRef } from 'react'

// Barra fina no topo com o progresso de rolagem.
// Atualiza via requestAnimationFrame e transform: scaleX() — sem re-render do React
// e sem forçar layout a cada evento de scroll (rolagem fica fluida).
export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const pct = max > 0 ? h.scrollTop / max : 0
      if (ref.current) ref.current.style.transform = `scaleX(${pct})`
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}
