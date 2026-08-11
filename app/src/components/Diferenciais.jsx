import Reveal from './Reveal'
import { diferenciais } from '../data/content'

export default function Diferenciais() {
  return (
    <section className="section container">
      <div className="section__head">
        <span className="badge">Diferenciais</span>
        <h2 className="section__title">Por que a Fórmula do Som?</h2>
      </div>

      <div className="grid grid--dif">
        {diferenciais.map((d, i) => (
          <Reveal className="dif" key={d.title} delay={i * 90}>
            <div className="dif__icon">{d.icon}</div>
            <h3 className="dif__title">{d.title}</h3>
            <p className="dif__desc">{d.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
