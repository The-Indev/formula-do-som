import Button from './Button'
import Reveal from './Reveal'
import { handleSpotlight } from '../hooks/spotlight'
import { planos, waLink } from '../data/content'

export default function Valores() {
  return (
    <section id="valores" className="section container">
      <div className="section__head">
        <span className="badge">Valores</span>
        <h2 className="section__title">Cada projeto é sob medida — e o valor também</h2>
        <p className="section__lead">
          O preço depende do seu carro e do que você quer fazer. Escolha por onde começar e receba um{' '}
          <strong style={{ color: 'var(--grey-1)' }}>orçamento transparente, sem compromisso</strong>,
          direto no WhatsApp.
        </p>
      </div>

      <div className="grid grid--valores">
        {planos.map((pl, i) => (
          <Reveal
            className={`plan spotlight ${pl.highlight ? 'plan--highlight' : ''}`}
            key={pl.badge}
            delay={i * 100}
            onMouseMove={handleSpotlight}
          >
            {pl.highlight && <span className="plan__flag">⭐ Mais pedido</span>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="plan__badge">{pl.badge}</span>
              <h3 className="plan__title">{pl.title}</h3>
              <p className="plan__desc">{pl.desc}</p>
            </div>
            <div className="plan__price">
              <span>Sob orçamento</span>
            </div>
            <div className="plan__items">
              {pl.items.map((it) => (
                <div className="bullet" key={it}>
                  <span className="check">✓</span>
                  {it}
                </div>
              ))}
            </div>
            <div className="plan__cta">
              <Button
                variant={pl.highlight ? 'primary' : 'secondary'}
                size="lg"
                block
                href={waLink(`Olá! Quero um orçamento do plano ${pl.badge}.`)}
              >
                {pl.cta}
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="valores__cta">
        <Button
          variant="primary"
          size="lg"
          onClick={() => window.dispatchEvent(new CustomEvent('open-orcamento-chat'))}
        >
          💬 Fazer orçamento online agora
        </Button>
        <span className="valores__cta-hint">Resposta na hora, sem compromisso.</span>
      </div>

      <p className="valores__note">
        💳 Formas de pagamento e parcelamento combinados no orçamento. Atendimento com compra na
        loja, retirada e entrega.
      </p>
    </section>
  )
}
