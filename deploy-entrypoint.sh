#!/bin/sh
# Gera o config.js da LANDING a partir da env WEBHOOK_URL do container.
# Roda automaticamente no start (a imagem do nginx executa /docker-entrypoint.d/*.sh).
set -e

: "${WEBHOOK_URL:=}"
TARGET="/usr/share/nginx/html/config.js"

cat > "$TARGET" <<EOF
window.__APP_CONFIG__ = { WEBHOOK_URL: "${WEBHOOK_URL}" };
EOF

if [ -n "$WEBHOOK_URL" ]; then
  echo "[config] WEBHOOK_URL definido — chat de orçamento ativo."
else
  echo "[config] WEBHOOK_URL vazio — chat cai no WhatsApp como fallback."
fi
