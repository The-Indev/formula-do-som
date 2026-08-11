# ============================================================
# Protótipo Fórmula do Som — UMA hospedagem, acessível por SUBPASTA
# (sem precisar cadastrar domínios/subdomínios)
#   /                  -> Landing (React/Vite)
#   /sistema-gestao/   -> Sistema de gestão (MVP estático)
#   /proposta/         -> Proposta (apresentação)
# ============================================================

# ---------- Stage 1: build da landing (Vite/React) ----------
FROM node:22-alpine AS build
WORKDIR /landing
COPY app/package*.json ./
RUN npm ci
COPY app/ ./
RUN npm run build          # gera /landing/dist

# ---------- Stage 2: Nginx servindo os 3 sites por subpasta ----------
FROM nginx:1.27-alpine AS runtime

# Roteamento por subpasta + gzip + headers de segurança
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Landing na raiz do site
COPY --from=build /landing/dist /usr/share/nginx/html

# Sistema de gestão em /sistema-gestao/
COPY gestao/ /usr/share/nginx/html/sistema-gestao/

# Proposta em /proposta/ (com logo local para ficar auto-contida)
COPY ["Proposta Sistema de Gestao.html", "/usr/share/nginx/html/proposta/index.html"]
COPY gestao/assets/logo.jpg /usr/share/nginx/html/proposta/assets/logo.jpg

# Gera o config.js da landing (WEBHOOK_URL) em runtime — mesmo esquema do app/
COPY deploy-entrypoint.sh /docker-entrypoint.d/40-config.sh
RUN sed -i 's/\r$//' /docker-entrypoint.d/40-config.sh \
    && chmod +x /docker-entrypoint.d/40-config.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
