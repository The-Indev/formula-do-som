# ---------- Stage 1: build the Vite/React static site ----------
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependências primeiro (melhor cache de layers)
COPY package*.json ./
RUN npm ci

# Copia o restante e gera o build de produção em /app/dist
COPY . .
RUN npm run build

# ---------- Stage 2: serve os arquivos estáticos com Nginx ----------
FROM nginx:1.27-alpine AS runtime

# Config do Nginx com fallback de SPA + cache de assets
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Arquivos estáticos gerados no stage de build
COPY --from=build /app/dist /usr/share/nginx/html

# Gera config.js (webhook) a partir da env WEBHOOK_URL no start do container.
# A imagem do nginx executa tudo em /docker-entrypoint.d/*.sh antes de subir.
COPY docker-entrypoint.sh /docker-entrypoint.d/40-config.sh
RUN sed -i 's/\r$//' /docker-entrypoint.d/40-config.sh \
    && chmod +x /docker-entrypoint.d/40-config.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
