import Button from './Button'
import GoogleBadge from './GoogleBadge'
import Stat from './Stat'
import { WhatsappIcon } from './icons'
import { stats, waLink, INSTAGRAM } from '../data/content'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__overlay hero__overlay--top" />
      <div className="hero__overlay hero__overlay--left" />
      <div className="hero__overlay hero__overlay--glow" />
      <div className="hero__flamebar" />

      <div className="hero__inner">
        <span className="hero__eyebrow">
          <span className="dot" />
          O seu estúdio automotivo · Belo Horizonte · Desde 1994 ⭐
        </span>

        <GoogleBadge meta="+1.400 avaliações" />

        <h1 className="hero__title">
          Cansado do carro <span className="text-flame">que todo mundo tem?</span> Bora resolver.
        </h1>

        <p className="hero__desc">
          Películas, iluminação LED &amp; Super LED, kit neon RGB, multimídia, som, revestimento e
          plotter — estética automotiva de ponta, com acabamento que ninguém percebe onde termina o
          carro e começa o nosso trabalho.
        </p>

        <div className="hero__cta">
          <Button variant="primary" size="lg" href={waLink()}>
            <WhatsappIcon /> Fazer Orçamento no WhatsApp
          </Button>
          <Button variant="secondary" size="lg" href={INSTAGRAM}>
            Ver Trabalhos no Instagram
          </Button>
        </div>

        <div className="hero__stats">
          {stats.map((s, i) => (
            <Stat key={s.label} value={s.value} label={s.label} delay={i * 120} />
          ))}
        </div>
      </div>

      <a href="#servicos" className="scroll-cue" aria-label="Rolar para baixo">
        <span className="label">Role para explorar</span>
        <span className="mouse" />
      </a>
    </section>
  )
}
