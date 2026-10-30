import Reveal from './Reveal'
import { processo } from '../data/content'

export default function Processo() {
  return (
    <section id="processo" className="band band--light" data-theme="light">
      <div className="container">
        <Reveal as="h2" className="h2 band__title">Como funciona</Reveal>
        <ol className="steps">
          {processo.map((p, i) => (
            <Reveal as="li" className="step" key={p.num} delay={i * 100}>
              <span className="step__num">{p.num}</span>
              <h3 className="h3">{p.title}</h3>
              <p>{p.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
