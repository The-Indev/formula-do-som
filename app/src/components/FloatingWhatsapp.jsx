import { WhatsappIcon } from './icons'
import { waLink } from '../data/content'

export default function FloatingWhatsapp() {
  return (
    <a className="wa-float" href={waLink()} target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
      <WhatsappIcon size={24} />
    </a>
  )
}
