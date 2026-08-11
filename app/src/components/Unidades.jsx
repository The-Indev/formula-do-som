import Reveal from './Reveal'
import { unidades, waLink } from '../data/content'

const telHref = (phone) => `tel:+55${phone.replace(/\D/g, '')}`

export default function Unidades() {
  return (
    <section id="unidades" className="section section--card">
      <div className="container">
        <div className="section__head">
          <span className="badge">Unidades</span>
          <h2 className="section__title">3 unidades em Belo Horizonte</h2>
          <p className="section__lead">
            Perto de você, com a mesma qualidade em qualquer uma delas.
          </p>
        </div>

        <div className="grid grid--unidades">
          {unidades.map((u, i) => (
            <Reveal className="unit" key={u.name} delay={i * 100}>
              <div className="unit__head">
                <div className="unit__pin">📍</div>
                <h3 className="unit__name">{u.name}</h3>
              </div>
              <p className="unit__addr">{u.address}</p>
              <div className="unit__rating">
                <span className="stars">★★★★★</span>
                <span className="score">{u.rating}</span>
                <span className="count">({u.reviews} avaliações · Google)</span>
              </div>
              <a className="unit__phone" href={telHref(u.phone)}>
                📞 {u.phone}
              </a>
              <div className="unit__links">
                <a href={u.map} target="_blank" rel="noopener">
                  Ver no mapa →
                </a>
                <a
                  className="link-wa"
                  href={waLink(`Olá! Quero atendimento na ${u.name}.`)}
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
