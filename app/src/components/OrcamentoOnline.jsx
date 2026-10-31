import Reveal from './Reveal'
import { Cta } from './ui'
import { openOrcamentoChat } from '../data/content'

// Bloco escuro só de texto, com textura sutil de costura ao fundo
export default function OrcamentoOnline() {
  return (
    <section className="band band--dark band--tall band--stitch" data-theme="dark">
      <div className="container center">
        <Reveal as="h2" className="h2">Orçamento na hora</Reveal>
        <Reveal as="p" className="tagline" delay={100}>
          Pergunte o preço de qualquer serviço e receba a resposta em segundos. Sem compromisso.
        </Reveal>
        <Reveal delay={200}>
          <Cta as="button" type="button" onClick={openOrcamentoChat}>
            Fazer orçamento online
          </Cta>
        </Reveal>
      </div>
    </section>
  )
}
