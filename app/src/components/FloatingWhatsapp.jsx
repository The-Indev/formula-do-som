import { WhatsappIcon } from './icons'
import { waLink } from '../data/content'

export default function FloatingWhatsapp() {
  return (
    <a
      className="wa-float"
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
    >
      <WhatsappIcon size={30} fill="#0a0a0a" />
    </a>
  )
}
