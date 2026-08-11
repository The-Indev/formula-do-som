import Reveal from './Reveal'
import { processo } from '../data/content'

export default function Processo() {
  return (
    <section id="processo" className="section section--card">
      <div className="container">
        <div className="section__head">
          <span className="badge">Como funciona</span>
          <h2 className="section__title">Do orçamento à entrega, sem enrolação</h2>
        </div>

        <div className="grid grid--processo">
          {processo.map((pr, i) => (
            <Reveal className="step" key={pr.num} delay={i * 90}>
              <span className="step__num">{pr.num}</span>
              <h3 className="step__title">{pr.title}</h3>
              <p className="step__desc">{pr.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
