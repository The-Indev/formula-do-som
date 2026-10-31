import Reveal from './Reveal'
import { Cta } from './ui'
import { posts, INSTAGRAM } from '../data/content'

// Grade estilo feed do Instagram. MOCK: posts fixos até integrar a API/agregador.
export default function Live() {
  return (
    <section id="live" className="band band--soft" data-theme="light">
      <div className="container">
        <Reveal as="h2" className="h2 band__title">Fórmula Live</Reveal>
        <a className="skip-grid" href="#live-end">Pular a grade de posts</a>
        <ul className="feed">
          {posts.map((p) => (
            <li key={p.image}>
              <a className="post" href={INSTAGRAM} target="_blank" rel="noopener">
                <img src={p.image} alt={p.alt} loading="lazy" />
                {p.reel && (
                  <svg className="post__play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-label="Reel">
                    <path d="M7 4v16l13-8z" />
                  </svg>
                )}
                <span className="post__mask">
                  <span className="post__tag">{p.tag}</span>
                  <span className="caption">Ver no Instagram</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="center" id="live-end">
          <Cta as="a" tone="light" href={INSTAGRAM} target="_blank" rel="noopener">
            Ver mais posts
          </Cta>
        </div>
      </div>
    </section>
  )
}
