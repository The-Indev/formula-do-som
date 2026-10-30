import { useEffect, useRef, useState } from 'react'
import MenuOverlay from './MenuOverlay'
import { useHeaderState } from '../hooks/useHeaderState'
import { scrollToHash } from './ui'
import { waLink } from '../data/content'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { hidden, solid, light } = useHeaderState(80)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  // Menu aberto: trava o scroll, Esc fecha, foco preso entre o botão e o menu
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const focusables = [
        toggleRef.current,
        ...menuRef.current.querySelectorAll('a[href], button:not([disabled])'),
      ].filter((el) => el && el.offsetParent !== null)
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [open])

  const cls = [
    'site-header',
    open && 'is-menu-open',
    !open && hidden && 'is-hidden',
    !open && solid && 'is-solid',
    !open && light && 'is-light',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <nav className={cls} aria-label="Principal">
        <div className="site-header__zone site-header__zone--left">
          <button
            ref={toggleRef}
            type="button"
            className="header-link menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`menu-toggle__icon ${open ? 'is-x' : ''}`} aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="header-link__label">{open ? 'Fechar' : 'Menu'}</span>
          </button>
        </div>

        <a
          href="#top"
          className="site-header__logo"
          aria-label="A Fórmula do Som — início"
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            scrollToHash('#top')
          }}
        >
          <img src="/assets/logo.jpg" alt="" width="28" height="28" />
          <span className="site-header__wordmark">Fórmula do Som</span>
        </a>

        <div className="site-header__zone site-header__zone--right">
          <a className="header-link" href={waLink()} target="_blank" rel="noopener">
            <span className="header-link__label">Orçamento</span>
          </a>
        </div>
      </nav>

      <MenuOverlay ref={menuRef} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
