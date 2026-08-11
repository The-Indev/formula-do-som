import { useEffect, useRef, useState } from 'react'
import { WEBHOOK_URL, isChatConfigured } from '../config'
import { waLink } from '../data/content'

const SUGGESTIONS = [
  'Insulfilm / Película',
  'Super LED',
  'Kit Neon RGB',
  'Multimídia',
  'Som automotivo',
  'Alarme',
]

const GREETING = {
  role: 'bot',
  text: 'Opa! 👋 Sou o assistente da A Fórmula do Som. Me diz qual serviço você quer orçar (ex.: insulfilm, Super LED, multimídia) e o modelo do seu carro que eu já te ajudo com o valor.',
}

function getSessionId() {
  try {
    let id = localStorage.getItem('fds_session')
    if (!id) {
      id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
      localStorage.setItem('fds_session', id)
    }
    return id
  } catch {
    return 'anon'
  }
}

// Extrai o texto de resposta de formatos comuns (inclusive n8n).
function extractReply(data) {
  if (data == null) return ''
  if (typeof data === 'string') return data
  if (Array.isArray(data)) return extractReply(data[0])
  return (
    data.reply ||
    data.message ||
    data.text ||
    data.output ||
    data.answer ||
    data.response ||
    ''
  )
}

export default function OrcamentoChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const sessionId = useRef(getSessionId())
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  // Permite abrir o chat de qualquer lugar (ex.: botão na seção Valores)
  useEffect(() => {
    const openChat = () => setOpen(true)
    window.addEventListener('open-orcamento-chat', openChat)
    return () => window.removeEventListener('open-orcamento-chat', openChat)
  }, [])

  // Rola para a última mensagem
  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, loading, open])

  // Foca o input ao abrir
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  async function send(text) {
    const msg = text.trim()
    if (!msg || loading) return
    setInput('')
    const history = messages.map((m) => ({ role: m.role, content: m.text }))
    setMessages((prev) => [...prev, { role: 'user', text: msg }])

    // Sem webhook configurado: cai pro WhatsApp de forma graciosa
    if (!isChatConfigured()) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Nosso atendimento automático ainda está sendo configurado 🙂 Pra um orçamento agora mesmo, fala com a gente no WhatsApp — respondemos rapidinho!',
          wa: true,
        },
      ])
      return
    }

    setLoading(true)
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          sessionId: sessionId.current,
          source: 'site-orcamento-chat',
          history,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const ct = res.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await res.json() : await res.text()
      const reply =
        extractReply(data) ||
        'Recebi sua mensagem! Pra fechar o orçamento certinho, me chama no WhatsApp que eu te passo os detalhes. 😉'
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Ops, tive um problema para responder agora. Tenta de novo em instantes ou fala com a gente direto no WhatsApp.',
          wa: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className={`chat-fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar chat de orçamento' : 'Abrir chat de orçamento'}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z" />
            </svg>
            <span className="chat-fab__label">Orçamento na hora</span>
          </>
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat de orçamento da Fórmula do Som">
          <div className="chat-head">
            <img className="chat-head__logo" src="/assets/logo.jpg" alt="" />
            <div className="chat-head__info">
              <strong>A Fórmula do Som</strong>
              <span>
                <i className="chat-dot" /> Orçamento na hora
              </span>
            </div>
            <button className="chat-head__close" onClick={() => setOpen(false)} aria-label="Fechar">
              ✕
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg--${m.role}`}>
                {m.text}
                {m.wa && (
                  <a
                    className="chat-msg__wa"
                    href={waLink('Olá! Quero um orçamento com a Fórmula do Som.')}
                    target="_blank"
                    rel="noopener"
                  >
                    Falar no WhatsApp →
                  </a>
                )}
              </div>
            ))}
            {loading && (
              <div className="chat-msg chat-msg--bot chat-typing" aria-label="Digitando">
                <span /> <span /> <span />
              </div>
            )}
          </div>

          {messages.length <= 1 && !loading && (
            <div className="chat-chips">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chat-chip" onClick={() => send(`Quanto custa ${s}?`)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex.: quanto custa insulfilm no Civic?"
              aria-label="Sua mensagem"
            />
            <button type="submit" aria-label="Enviar" disabled={loading || !input.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
              </svg>
            </button>
          </form>

          <div className="chat-foot">
            Prefere falar com uma pessoa?{' '}
            <a href={waLink('Olá! Quero um orçamento com a Fórmula do Som.')} target="_blank" rel="noopener">
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
