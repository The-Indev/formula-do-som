import { useEffect, useRef } from 'react'
import Reveal from './Reveal'
import { Cta } from './ui'
import { servicos, waLink } from '../data/content'

// Parallax: a textura (pontos/linhas) anda a 0.3× e a foto a 0.1× da rolagem,
// limitado a ±40px. Desligado abaixo de 768px.
function useParallax(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const layers = [...root.querySelectorAll('[data-speed]')]
    let ticking = false

    const update = () => {
      ticking = false
      const mobile = window.innerWidth < 768
      const vh = window.innerHeight
      for (const el of layers) {
        if (mobile) {
          el.style.transform = ''
          continue
        }
        const r = el.parentElement.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) continue
        const delta = r.top + r.height / 2 - vh / 2
        const y = Math.max(-40, Math.min(40, -delta * Number(el.dataset.speed)))
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [rootRef])
}

export default function Servicos() {
  const ref = useRef(null)
  useParallax(ref)

  return (
    <section id="servicos" className="services" data-theme="dark" ref={ref}>
      <div className="container services__head">
        <Reveal as="h2" className="h2">Nossos serviços</Reveal>
      </div>

      {servicos.map((s, i) => (
        <a
          key={s.slug}
          id={`servico-${s.slug}`}
          className={`svc ${i % 2 ? 'svc--right' : 'svc--left'}`}
          href={waLink(`Olá! Quero um orçamento de ${s.name}.`)}
          target="_blank"
          rel="noopener"
        >
          <div className="svc__photo" data-speed="0.1" aria-hidden="true">
            <img src={s.image} alt="" loading="lazy" />
          </div>
          <div className={`svc__pattern svc__pattern--${s.pattern}`} data-speed="0.3" aria-hidden="true" />
          <div className="overlay overlay--side" aria-hidden="true" />

          <div className="container svc__content">
            <Reveal className="svc__text">
              <span className="eyebrow">{String(i + 1).padStart(2, '0')} / {String(servicos.length).padStart(2, '0')}</span>
              <h3 className="h2">{s.name}</h3>
              <p className="tagline">{s.phrase}</p>
              <p className="svc__desc">{s.desc}</p>
              <Cta>Orçar no WhatsApp</Cta>
            </Reveal>
          </div>
        </a>
      ))}
    </section>
  )
}
