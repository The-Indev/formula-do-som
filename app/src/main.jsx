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

// Liga o fundo dos faróis logo após o PRIMEIRO PAINT (não bloqueia o carregamento
// e não usa preload de alta prioridade). Com o animation-delay do CSS, o primeiro
// pisque acontece ~2s depois de o site aparecer. É um efeito de marca — sempre visível.
;(function enableAmbientFx() {
  const start = () => document.body.classList.add('fx-ready')
  if ('requestAnimationFrame' in window) {
    requestAnimationFrame(() => requestAnimationFrame(start))
  } else {
    setTimeout(start, 50)
  }
})()
