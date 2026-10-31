import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import Casa from './components/Casa'
import SobMedida from './components/SobMedida'
import OrcamentoOnline from './components/OrcamentoOnline'
import Reconhecimento from './components/Reconhecimento'
import Servicos from './components/Servicos'
import Processo from './components/Processo'
import Depoimentos from './components/Depoimentos'
import Unidades from './components/Unidades'
import Live from './components/Live'
import Faq from './components/Faq'
import Footer from './components/Footer'
import PromoPanel from './components/PromoPanel'
import FloatingWhatsapp from './components/FloatingWhatsapp'
import OrcamentoChat from './components/OrcamentoChat'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Loader />
      <Header />
      <main id="conteudo">
        <Hero />
        <Casa />
        <SobMedida />
        <OrcamentoOnline />
        <Reconhecimento />
        <Servicos />
        <Processo />
        <Depoimentos />
        <Unidades />
        <Live />
        <Faq />
      </main>
      <Footer />

      <PromoPanel />
      <FloatingWhatsapp />
      <OrcamentoChat />
    </>
  )
}
