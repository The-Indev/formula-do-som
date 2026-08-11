import { useState } from 'react'
import Button from './Button'
import { useScrolled } from '../hooks/useScrolled'
import { navLinks, waLink } from '../data/content'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(8)
  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="brand" aria-label="A Fórmula do Som">
          <img className="brand__logo" src="/assets/logo.jpg" alt="Fórmula do Som" />
          <span className="brand__name">
            Fórmula<span className="text-flame"> do Som</span>
          </span>
        </a>

        <nav className="nav">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <Button
            className="header__cta-desktop"
            variant="primary"
            size="sm"
            href={waLink()}
          >
            Solicitar Orçamento
          </Button>
          <button
            className="menu-toggle"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <Button
            variant="primary"
            size="lg"
            block
            href={waLink()}
            onClick={close}
            style={{ marginTop: 12 }}
          >
            Solicitar Orçamento
          </Button>
        </div>
      )}
    </>
  )
}
