import Button from './Button'
import { WhatsappIcon } from './icons'
import { waLink, finalCtaBg } from '../data/content'

export default function FinalCta() {
  return (
    <section id="contato" className="final-cta">
      <div className="final-cta__bg" style={{ backgroundImage: `url('${finalCtaBg}')` }} />
      <div className="final-cta__scrim" />
      <div className="final-cta__inner">
        <h2 className="section__title">Pronto pra transformar seu carro?</h2>
        <p className="section__lead" style={{ color: 'var(--text-secondary)' }}>
          Manda uma mensagem, conta o que você quer e monta seu projeto sob medida. Orçamento sem
          compromisso.
        </p>
        <Button variant="primary" size="lg" href={waLink()}>
          <WhatsappIcon /> Fazer Orçamento no WhatsApp
        </Button>
        <div className="final-cta__contacts">
          <span>📱 (31) 98316-7480</span>
          <span>☎️ (31) 3474-4498</span>
          <span>🕐 Seg–Sáb · 9h às 18h</span>
        </div>
      </div>
    </section>
  )
}
