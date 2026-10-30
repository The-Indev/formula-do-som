import Reveal from './Reveal'
import { Cta, scrollToHash } from './ui'
import { casa } from '../data/content'

export default function Casa() {
  return (
    <section id="casa" className="band band--light" data-theme="light">
      <div className="container">
        <Reveal as="h2" className="h2 band__title">A Fórmula do Som</Reveal>
        <div className="grid-3">
          {casa.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <a
                className="card card--portrait"
                href={c.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash(c.href)
                }}
              >
                <div className="card__media">
                  <img src={c.image} alt={c.alt} loading="lazy" />
                </div>
                <div className="overlay" aria-hidden="true" />
                <div className="card__body">
                  <h3 className="h3">{c.title}</h3>
                  <Cta>Saiba mais</Cta>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
