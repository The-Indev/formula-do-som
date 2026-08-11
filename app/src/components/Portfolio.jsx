import Reveal from './Reveal'
import { InstagramIcon, HeartIcon } from './icons'
import { projects, INSTAGRAM } from '../data/content'

export default function Portfolio() {
  return (
    <section id="trabalhos" className="section container">
      <div className="feed-head">
        <div className="section__head" style={{ marginBottom: 0 }}>
          <span className="badge">Portfólio</span>
          <h2 className="section__title">Trabalhos que falam por si</h2>
          <p className="section__lead">Direto do nosso feed — carros reais, clientes reais.</p>
        </div>
        <a className="link-inline" href={INSTAGRAM} target="_blank" rel="noopener">
          <InstagramIcon /> Siga @a_formuladosom →
        </a>
      </div>

      <div className="grid grid--feed">
        {projects.map((p, i) => (
          <Reveal as="a" className="feed-tile" key={i} delay={(i % 3) * 80} href={INSTAGRAM} target="_blank" rel="noopener">
            <div
              className="feed-tile__img"
              role="img"
              aria-label={p.alt}
              style={{ backgroundImage: `url('${p.image}')` }}
            />
            <span className="feed-tile__tag">{p.tag}</span>
            <div className="feed-tile__ov">
              <span>
                <HeartIcon /> Ver no Instagram
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
