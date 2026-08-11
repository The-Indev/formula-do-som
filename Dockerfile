# ============================================================
# Protótipo Fórmula do Som — UMA hospedagem, alternável por SUBDOMÍNIO
#   <dominio> / www.<dominio>   -> Landing (React/Vite)
#   gestao.<dominio>            -> Sistema de gestão (MVP estático)
#   proposta.<dominio>          -> Proposta (apresentação)
# O Nginx decide o site pelo prefixo do subdomínio (server_name regex),
# então funciona com QUALQUER domínio que você anexar no Easypanel.
# ============================================================

# ---------- Stage 1: build da landing (Vite/React) ----------
FROM node:22-alpine AS build
WORKDIR /landing
COPY app/package*.json ./
RUN npm ci
COPY app/ ./
RUN npm run build          # gera /landing/dist

# ---------- Stage 2: Nginx servindo os 3 sites ----------
FROM nginx:1.27-alpine AS runtime

# Roteamento por subdomínio + gzip + headers de segurança
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Landing (site padrão)
COPY --from=build /landing/dist /usr/share/nginx/html/landing

# Sistema de gestão
COPY gestao/ /usr/share/nginx/html/gestao

# Proposta (com logo local para ficar auto-contida)
COPY ["Proposta Sistema de Gestao.html", "/usr/share/nginx/html/proposta/index.html"]
COPY gestao/assets/logo.jpg /usr/share/nginx/html/proposta/assets/logo.jpg

# Gera o config.js da landing (WEBHOOK_URL) em runtime — mesmo esquema do app/
COPY deploy-entrypoint.sh /docker-entrypoint.d/40-config.sh
RUN sed -i 's/\r$//' /docker-entrypoint.d/40-config.sh \
    && chmod +x /docker-entrypoint.d/40-config.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
