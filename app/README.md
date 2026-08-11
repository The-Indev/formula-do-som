# A Fórmula do Som — Landing Page (React + Vite)

Landing page do estúdio automotivo **A Fórmula do Som** (Belo Horizonte, desde 1994).
Projeto React (Vite) estático, servido por Nginx e pronto para deploy no **Easypanel**.

## Stack

- **React 18** + **Vite 5** (build estático, sem backend)
- CSS puro com design tokens (`src/styles/tokens.css`) — sem dependências de UI
- Componentes por seção em `src/components/`, conteúdo/dados em `src/data/content.js`
- Deploy: **Dockerfile** multi-stage (Node build → Nginx)

## Rodando localmente

```bash
cd app
npm install
npm run dev        # http://localhost:5173
```

Build de produção:

```bash
npm run build      # gera ./dist
npm run preview    # serve o dist localmente (porta 4173)
```

## Estrutura

```
app/
├─ public/assets/        # logo.jpg e wpp.jpg (imagens REAIS)
├─ src/
│  ├─ components/        # Header, Hero, Services, Valores, Unidades, ...
│  ├─ data/content.js    # textos, serviços, unidades, planos, FAQ, contatos
│  ├─ hooks/             # useInView (reveal) e useScrolled (header)
│  ├─ styles/            # tokens.css + global.css
│  ├─ App.jsx
│  └─ main.jsx
├─ Dockerfile           # build + nginx
├─ nginx.conf           # SPA fallback + cache de assets + gzip
└─ index.html
```

## Chat de orçamento (webhook)

O site tem um **chat flutuante** ("Orçamento na hora") onde o cliente pergunta o preço
de um serviço. A mensagem é enviada via `POST` para um **webhook configurável** (ex.: um
webhook do **n8n**).

### Configuração da URL

- **Dev / build:** `VITE_WEBHOOK_URL` no `.env` (copie de `.env.example`).
- **Produção (Docker/Easypanel):** env `WEBHOOK_URL` no container — o `docker-entrypoint.sh`
  gera o `config.js` em runtime, **sem precisar rebuildar**. Runtime tem prioridade sobre o build.

Se nenhuma URL estiver configurada, o chat funciona mesmo assim e cai graciosamente para o
WhatsApp.

### Contrato do webhook

O front envia:

```json
{
  "message": "Quanto custa insulfilm no Civic?",
  "sessionId": "uuid-persistido-no-navegador",
  "source": "site-orcamento-chat",
  "history": [{ "role": "user|bot", "content": "..." }]
}
```

E aceita a resposta em texto puro **ou** JSON com qualquer uma destas chaves:
`reply`, `message`, `text`, `output`, `answer` ou `response`. Ex.:

```json
{ "reply": "Insulfilm no Civic fica a partir de R$ ..." }
```

> **CORS:** o webhook precisa liberar o domínio do site (responder com
> `Access-Control-Allow-Origin`). No n8n, use o nó **Respond to Webhook** e habilite CORS/headers.

## Deploy no Easypanel

O jeito mais simples é criar um **App** com build por **Dockerfile**:

1. Suba este repositório (ou a pasta `app/`) para um Git (GitHub/GitLab).
2. No Easypanel: **Create → App**.
3. Em **Source**, aponte para o repositório/branch.
   - Se o repo tiver a pasta `app/` na raiz, defina o **Build Path / Context** como `app`.
4. Em **Build**, escolha **Dockerfile** (o Easypanel detecta o `Dockerfile` automaticamente).
5. Em **Deploy / Ports**, exponha a porta **80** (o container serve o site pelo Nginx nessa porta).
6. Em **Environment**, defina `WEBHOOK_URL=https://seu-n8n.com/webhook/...` (ativa o chat de orçamento).
7. **Deploy**. Depois é só apontar o domínio e habilitar o SSL (Let's Encrypt) pelo painel.

> Trocar o webhook depois? Basta editar a env `WEBHOOK_URL` e reiniciar o container — **sem rebuild**.

> Alternativa sem Docker: como é um site estático, dá para usar o build **Nixpacks/Static**
> com comando `npm run build` e pasta de saída `dist`. O Dockerfile já entregue é a
> opção mais previsível e recomendada.

## O que ainda é placeholder

- Imagens de **serviços/portfólio/CTA** são mock (Unsplash) — trocar pelas fotos oficiais
  em `src/data/content.js`. As imagens reais já usadas são `public/assets/logo.jpg` e
  `public/assets/wpp.jpg` (fundo do site).
- Depoimentos: o 1º é uma avaliação real do Google; os outros dois são ilustrativos.
- **Valores**: exibidos como "Sob orçamento" (sem números). Se quiser preços reais,
  edite o array `planos` em `src/data/content.js`.
- Horário: confirmar (Google mostra abertura às 08:00; o rodapé diz 9h–18h).

## Dados reais já embutidos

- Nota **4,4★** no Google (~1.400 avaliações somando as 3 unidades)
- Telefones por unidade: Glória (31) 3474-3176 · Buritis (31) 3565-8825 · Lourdes (31) 3166-4917
- WhatsApp central: (31) 98316-7480
