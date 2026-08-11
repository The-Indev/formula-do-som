import { useState } from 'react'
import Reveal from './Reveal'
import { faqs } from '../data/content'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section faq">
      <div className="section__head" style={{ marginBottom: 40 }}>
        <span className="badge">Dúvidas Frequentes</span>
        <h2 className="section__title">Perguntas que todo cliente faz</h2>
      </div>

      <div className="faq__list">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <Reveal className={`faq__item ${isOpen ? 'is-open' : ''}`} key={f.q}>
              <button
                className="faq__q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {f.q}
                <span className="faq__toggle">+</span>
              </button>
              {isOpen && <p className="faq__a">{f.a}</p>}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
