import Button from './Button'
import Reveal from './Reveal'
import { showcases, waLink } from '../data/content'

export default function Showcases() {
  return (
    <section className="section section--card">
      <div className="showcases">
        {showcases.map((sh) => (
          <Reveal className={`split ${sh.reverse ? 'split--reverse' : ''}`} key={sh.title}>
            <div className="split__img">
              <div
                className="split__bg"
                role="img"
                aria-label={sh.title}
                style={{ backgroundImage: `url('${sh.image}')` }}
              />
            </div>
            <div className="split__txt">
              <span className="badge">{sh.badge}</span>
              <h3 className="split__title">{sh.title}</h3>
              <p className="split__desc">{sh.desc}</p>
              <div className="bullets">
                {sh.bullets.map((b) => (
                  <div className="bullet" key={b}>
                    <span className="check">✓</span>
                    {b}
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="md" href={waLink(`Olá! Tenho interesse em: ${sh.badge}.`)}>
                {sh.cta}
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
