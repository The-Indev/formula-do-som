import { openOrcamentoChat } from '../data/content'

export function ArrowIcon({ size = 16 }) {
  return (
    <svg className="icon-arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  )
}

export function ChevronIcon({ size = 16 }) {
  return (
    <svg className="icon-chevron" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// Botão retangular, cantos retos, preenchimento da esquerda p/ direita no hover.
// Dentro de um bloco-link é só visual (<span>); isolado vira <button> ou <a>.
// tone: 'dark' (borda branca, para fundo escuro) | 'light' (borda preta)
export function Cta({ as = 'span', tone = 'dark', arrow = true, className = '', children, ...rest }) {
  const Tag = as
  const props = as === 'span' ? { role: 'presentation', ...rest } : rest
  return (
    <Tag className={`btn btn--${tone} ${className}`.trim()} {...props}>
      <span className="btn__label">{children}</span>
      {arrow && <ArrowIcon />}
    </Tag>
  )
}

// Rola suavemente até uma âncora da página (depois de fechar menus/travas de scroll)
export function scrollToHash(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

// Link vindo de navGroups: âncora interna, link externo ou ação (abrir chat)
export function NavItem({ link, onNavigate, className = '' }) {
  if (link.action === 'chat') {
    return (
      <button
        type="button"
        className={`navitem ${className}`}
        onClick={() => {
          onNavigate?.()
          openOrcamentoChat()
        }}
      >
        {link.label}
      </button>
    )
  }
  const internal = link.href.startsWith('#')
  return (
    <a
      className={`navitem ${className}`}
      href={link.href}
      {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
      onClick={(e) => {
        if (!internal) return onNavigate?.()
        e.preventDefault()
        onNavigate?.()
        scrollToHash(link.href)
      }}
    >
      {link.label}
    </a>
  )
}
