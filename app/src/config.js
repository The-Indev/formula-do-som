// Lê a URL do webhook: runtime (config.js gerado no Docker) tem prioridade;
// senão cai no VITE_WEBHOOK_URL do build/dev.
const runtime = (typeof window !== 'undefined' && window.__APP_CONFIG__) || {}

export const WEBHOOK_URL =
  runtime.WEBHOOK_URL || import.meta.env.VITE_WEBHOOK_URL || ''

export const isChatConfigured = () => Boolean(WEBHOOK_URL)
