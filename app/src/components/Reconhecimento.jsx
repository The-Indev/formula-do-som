import Reveal from './Reveal'
import { Cta } from './ui'
import { reconhecimento } from '../data/content'

export default function Reconhecimento() {
  return (
    <section className="band band--light" data-theme="light">
      <div className="container">
        <Reveal as="h2" className="h2 band__title">Quem passa por aqui, volta</Reveal>
        <div className="grid-2">
          {reconhecimento.map((r, i) => (
            <Reveal key={r.title} delay={i * 100}>
              <a className="card card--caption" href={r.href} target="_blank" rel="noopener">
                <div className="card__media card__media--wide">
                  <img src={r.image} alt={r.alt} loading="lazy" />
                </div>
                <div className="card__caption">
                  <h3 className="h3">{r.title}</h3>
                  <p className="card__sub">{r.subtitle}</p>
                  <Cta tone="light">Ver agora</Cta>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
