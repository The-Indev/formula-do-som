#!/bin/sh
# Gera o config.js do frontend a partir da env WEBHOOK_URL do container.
# É executado automaticamente pelo entrypoint da imagem oficial do nginx
# (tudo em /docker-entrypoint.d/ roda antes do nginx subir).
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
