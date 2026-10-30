import { forwardRef, useEffect, useState } from 'react'
import { ChevronIcon, NavItem } from './ui'
import { navGroups, socials } from '../data/content'

// Menu em tela cheia. Desktop: grupos à esquerda, subitens + foto à direita
// (hover/foco troca o grupo). Mobile: lista única com acordeões.
const MenuOverlay = forwardRef(function MenuOverlay({ open, onClose }, ref) {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(-1)

  useEffect(() => {
    if (open) {
      setActive(0)
      setExpanded(-1)
    }
  }, [open])

  const group = navGroups[active]

  return (
    <div
      ref={ref}
      id="site-menu"
      className={`menu ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      inert={open ? undefined : ''}
    >
      <div className="menu__inner">
        <ul className="menu__groups">
          {navGroups.map((g, i) => (
            <li key={g.title} className={`menu__group ${expanded === i ? 'is-expanded' : ''}`}>
              <button
                type="button"
                className={`menu__group-btn ${active === i ? 'is-active' : ''}`}
                aria-expanded={expanded === i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => {
                  setActive(i)
                  setExpanded(expanded === i ? -1 : i)
                }}
              >
                {g.title}
                <ChevronIcon size={20} />
              </button>
              {/* Sublista inline: só aparece no mobile (acordeão) */}
              <ul className="menu__sublist menu__sublist--inline">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <NavItem link={l} onNavigate={onClose} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="menu__detail" aria-live="polite">
          <ul className="menu__sublist" key={group.title}>
            {group.links.map((l) => (
              <li key={l.label}>
                <NavItem link={l} onNavigate={onClose} />
              </li>
            ))}
          </ul>
          <div className="menu__photos" aria-hidden="true">
            {navGroups.map((g, i) => (
              <div
                key={g.title}
                className={`menu__photo ${active === i ? 'is-active' : ''}`}
                style={{ backgroundImage: open ? `url(${g.image})` : undefined }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="menu__foot">
        <span className="menu__locale">Belo Horizonte · MG · desde 1994</span>
        <ul className="socials">
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener">
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default MenuOverlay
