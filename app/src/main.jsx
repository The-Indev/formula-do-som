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

// Ativa o fundo animado dos faróis (imagens pesadas) quando a página está ociosa:
// tira ~2,3MB do caminho crítico (1º paint mais rápido) SEM remover o efeito — ele
// sempre aparece, logo após o carregamento. É um efeito de marca (mantido inclusive
// com "reduzir movimento", por ser lento e de baixa frequência).
;(function enableAmbientFx() {
  const start = () => document.body.classList.add('fx-ready')
  const idle = window.requestIdleCallback
    ? (cb) => window.requestIdleCallback(cb, { timeout: 1500 })
    : (cb) => setTimeout(cb, 300)
  if (document.readyState === 'complete') idle(start)
  else window.addEventListener('load', () => idle(start), { once: true })
})()
