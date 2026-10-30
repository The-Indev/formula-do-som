import { Cta } from './ui'
import { hero, waLink } from '../data/content'

// Hero 100svh: foto do BMW (faróis apagados) + camadas que acendem/estouram
// os faróis no fim de cada ciclo (efeito de marca, sempre ligado).
export default function Hero() {
  return (
    <section className="hero" id="top" data-theme="dark">
      <a className="hero__link" href={waLink()} target="_blank" rel="noopener">
        <div className="hero__media" aria-hidden="true">
          <div className="hero__layer hero__layer--base" />
          <div className="hero__layer hero__layer--on" />
          <div className="hero__layer hero__layer--flash" />
        </div>
        <div className="overlay" aria-hidden="true" />

        <div className="hero__content">
          <h1 className="hero__wordmark">
            <span className="sr-only">A </span>Fórmula do Som
          </h1>
          <p className="hero__tagline">{hero.tagline}</p>
          <Cta className="hero__cta">{hero.cta}</Cta>
        </div>
      </a>
      <span className="scroll-line" aria-hidden="true" />
    </section>
  )
}
