import { useEffect, useState } from 'react'
import { Cta } from './ui'
import { promo, openOrcamentoChat } from '../data/content'

const KEY = 'fds_promo_closed'

// Painel de abertura dispensável: aparece ~3s após carregar, uma vez por sessão.
export default function PromoPanel() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let closed = false
    try {
      closed = sessionStorage.getItem(KEY) === '1'
    } catch {}
    if (closed) return
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setVisible(false)
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {}
  }

  if (!visible) return null

  return (
    <aside className="promo" aria-label="Orçamento">
      <button type="button" className="promo__close" onClick={close} aria-label="Fechar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <img className="promo__img" src={promo.image} alt="" />
      <div className="promo__body">
        <p className="promo__title">{promo.title}</p>
        <p className="promo__sub">{promo.subtitle}</p>
        <Cta
          as="button"
          type="button"
          onClick={() => {
            close()
            openOrcamentoChat()
          }}
        >
          {promo.cta}
        </Cta>
      </div>
    </aside>
  )
}
