import Reveal from './Reveal'
import { handleSpotlight } from '../hooks/spotlight'
import { services } from '../data/content'

export default function Services() {
  return (
    <section id="servicos" className="section container">
      <div className="section__head">
        <span className="badge">Nossos Serviços</span>
        <h2 className="section__title">Tudo pro seu carro em um só lugar</h2>
        <p className="section__lead">
          Da película à multimídia — cada serviço pensado sob medida pro seu modelo.
        </p>
      </div>

      <div className="grid grid--services">
        {services.map((s, i) => (
          <Reveal
            className="svc-card spotlight"
            key={s.title}
            delay={(i % 3) * 90}
            onMouseMove={handleSpotlight}
          >
            <div
              className="svc-card__img"
              role="img"
              aria-label={s.title}
              style={{ backgroundImage: `url('${s.image}')` }}
            />
            <div className="svc-card__scrim" />
            <div className="svc-card__body">
              <div className="icon-tile">{s.icon}</div>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__desc">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
