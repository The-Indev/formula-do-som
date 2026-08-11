import GoogleBadge from './GoogleBadge'
import Reveal from './Reveal'
import { depoimentos } from '../data/content'

export default function Depoimentos() {
  return (
    <section className="section container">
      <div className="section__head" style={{ maxWidth: 700 }}>
        <span className="badge">Depoimentos</span>
        <h2 className="section__title">Quem confia, volta e indica</h2>
        <GoogleBadge solid meta="+1.400 avaliações no Google · 3 unidades" />
      </div>

      <div className="grid grid--depo">
        {depoimentos.map((dp, i) => (
          <Reveal className="quote-card" key={dp.name} delay={i * 100}>
            <span className="quote-card__stars">★★★★★</span>
            <p className="quote-card__text">“{dp.text}”</p>
            <div className="quote-card__who">
              <div className="avatar">{dp.initial}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="quote-card__name">{dp.name}</span>
                <span className="quote-card__meta">{dp.car}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
