import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Showcases from './components/Showcases'
import Diferenciais from './components/Diferenciais'
import Portfolio from './components/Portfolio'
import Valores from './components/Valores'
import Processo from './components/Processo'
import Depoimentos from './components/Depoimentos'
import Unidades from './components/Unidades'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'
import OrcamentoChat from './components/OrcamentoChat'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <>
      <ScrollProgress />

      {/* Fundo fixo (foto do BMW) — camadas: apagado (base) -> acende -> estoura */}
      <div className="page-bg" aria-hidden="true" />
      <div className="page-on" aria-hidden="true" />
      <div className="page-flash" aria-hidden="true" />
      <div className="page-vignette" aria-hidden="true" />

      <div className="page">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Showcases />
          <Diferenciais />
          <Portfolio />
          <Valores />
          <Processo />
          <Depoimentos />
          <Unidades />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>

      <FloatingWhatsapp />
      <OrcamentoChat />

      {/* Textura sutil por cima de tudo */}
      <div className="grain" aria-hidden="true" />
    </>
  )
}
