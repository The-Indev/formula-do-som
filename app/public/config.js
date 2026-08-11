/* Config em runtime. Em produção (Docker/Easypanel) este arquivo é
   sobrescrito pelo container a partir da env WEBHOOK_URL.
   Em desenvolvimento fica vazio e o app usa VITE_WEBHOOK_URL do .env. */
window.__APP_CONFIG__ = { WEBHOOK_URL: '' };
