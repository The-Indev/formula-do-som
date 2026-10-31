import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { depoimentos, GOOGLE_SEARCH } from '../data/content'

// Citação grande em fade cruzado; troca sozinha a cada 7s (pausa no hover/foco)
export default function Depoimentos() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setCurrent((c) => (c + 1) % depoimentos.length), 7000)
    return () => clearTimeout(t)
  }, [current, paused])

  return (
    <section
      id="depoimentos"
      className="band band--dark band--tall"
      data-theme="dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container center">
        <Reveal as="h2" className="eyebrow">Depoimentos · Google 4,4 ★</Reveal>
        <div className="quotes">
          {depoimentos.map((d, i) => (
            <figure key={d.name} className={`quote ${i === current ? 'is-active' : ''}`} aria-hidden={i !== current}>
              <blockquote>“{d.text}”</blockquote>
              <figcaption>
                {d.name} <span>· {d.origin}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="quotes__nav" role="tablist" aria-label="Depoimentos">
          {depoimentos.map((d, i) => (
            <button
              key={d.name}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Depoimento ${i + 1}`}
              className={i === current ? 'is-active' : ''}
              onClick={() => setCurrent(i)}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <a className="textlink" href={GOOGLE_SEARCH} target="_blank" rel="noopener">
          Ler as +1.400 avaliações no Google
        </a>
      </div>
    </section>
  )
}
