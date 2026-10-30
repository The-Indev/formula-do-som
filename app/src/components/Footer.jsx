import { useState } from 'react'
import { ChevronIcon, NavItem } from './ui'
import { navGroups, socials, assinatura } from '../data/content'

export default function Footer() {
  const [open, setOpen] = useState(-1)

  return (
    <>
      <section className="signature" data-theme="dark">
        <p className="signature__text">{assinatura}</p>
      </section>

      <footer className="site-footer" data-theme="dark">
        <div className="container">
          <div className="footer__brand">
            <img src="/assets/logo.jpg" alt="" width="56" height="56" />
            <span className="site-header__wordmark">Fórmula do Som</span>
          </div>

          <div className="footer__cols">
            {navGroups.map((g, i) => (
              <div key={g.title} className={`footer__col ${open === i ? 'is-open' : ''}`}>
                <h2>
                  <button
                    type="button"
                    className="footer__coltitle"
                    aria-expanded={open === i}
                    onClick={() => setOpen(open === i ? -1 : i)}
                  >
                    {g.title}
                    <ChevronIcon />
                  </button>
                </h2>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <NavItem link={l} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer__bar">
            <p className="caption">© 2026 A Fórmula do Som · O seu estúdio automotivo desde 1994</p>
            <p className="caption">Seg–Sáb · 9h às 18h · (31) 3474-4498</p>
            <ul className="socials">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener">{s.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}
