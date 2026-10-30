import Reveal from './Reveal'
import { unidades, waLink } from '../data/content'

const telHref = (phone) => `tel:+55${phone.replace(/\D/g, '')}`

export default function Unidades() {
  return (
    <section id="unidades" className="band band--light" data-theme="light">
      <div className="container">
        <Reveal as="h2" className="h2 band__title">Unidades em Belo Horizonte</Reveal>
        <div className="units">
          {unidades.map((u, i) => (
            <Reveal className="unit" key={u.name} delay={i * 100}>
              <h3 className="h3">{u.name}</h3>
              <p className="unit__addr">{u.address}</p>
              <p className="caption">
                {u.rating} ★ · {u.reviews} avaliações no Google
              </p>
              <ul className="unit__links">
                <li>
                  <a className="textlink" href={telHref(u.phone)}>{u.phone}</a>
                </li>
                <li>
                  <a className="textlink" href={u.map} target="_blank" rel="noopener">Ver no mapa</a>
                </li>
                <li>
                  <a className="textlink" href={waLink(`Olá! Quero atendimento na unidade ${u.name}.`)} target="_blank" rel="noopener">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
