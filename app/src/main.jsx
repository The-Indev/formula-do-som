import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Ativa o fundo animado dos faróis (imagens pesadas) só quando a página está
// ociosa — tira ~2,3MB do caminho crítico e deixa o primeiro paint muito mais rápido.
// Respeita "reduzir movimento": nesse caso os overlays nem chegam a carregar.
;(function enableAmbientFx() {
  const start = () => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    } catch (e) {}
    document.body.classList.add('fx-ready')
  }
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 300))
  if (document.readyState === 'complete') idle(start)
  else window.addEventListener('load', () => idle(start), { once: true })
})()
