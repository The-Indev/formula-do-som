import Reveal from './Reveal'
import { Cta } from './ui'
import { planos, openOrcamentoChat } from '../data/content'

// Bloco claro com "wordmark" grande, tagline e os 3 níveis de projeto (sem preço fixo)
export default function SobMedida() {
  return (
    <section id="sob-medida" className="band band--soft band--tall" data-theme="light">
      <div className="container center">
        <Reveal as="p" className="wordmark">Sob Medida</Reveal>
        <Reveal as="p" className="tagline" delay={100}>
          Do zero ao acabamento de concessionária, pensado só pro seu carro.
        </Reveal>

        <div className="plans">
          {planos.map((p, i) => (
            <Reveal className="plan" key={p.name} delay={150 + i * 100}>
              <h3 className="h3">{p.name}</h3>
              <p className="plan__desc">{p.desc}</p>
              <ul className="plan__items">
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <Cta as="button" type="button" tone="light" onClick={openOrcamentoChat}>
            Montar meu projeto
          </Cta>
          <p className="caption plans__note">Valores sob orçamento, sem compromisso.</p>
        </Reveal>
      </div>
    </section>
  )
}
