import { useState } from 'react'
import Reveal from './Reveal'
import { ChevronIcon } from './ui'
import { faqs } from '../data/content'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="band band--light" data-theme="light">
      <div className="container narrow">
        <Reveal as="h2" className="h2 band__title">Perguntas frequentes</Reveal>
        <div className="faq">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={f.q}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {f.q}
                    <ChevronIcon size={20} />
                  </button>
                </h3>
                <div className="faq__a" id={`faq-${i}`} role="region">
                  <p>{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
