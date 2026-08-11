# Deploy — Protótipo Fórmula do Som (UMA hospedagem, por subpasta)

Um **único** container Nginx serve os três sites no **mesmo domínio**, por **subpasta** —
não precisa cadastrar subdomínios.

| Caminho | Mostra | Docroot no container |
|---|---|---|
| `/` | **Landing** (React) | `/usr/share/nginx/html` |
| `/sistema-gestao/` | **Sistema de gestão** (MVP) | `/usr/share/nginx/html/sistema-gestao` |
| `/proposta/` | **Proposta** (apresentação) | `/usr/share/nginx/html/proposta` |

## Arquivos do deploy (na raiz do repo)

| Arquivo | Papel |
|---|---|
| `Dockerfile` | Build da landing (Vite) + Nginx servindo os 3 sites por subpasta |
| `nginx.conf` | Roteamento por subpasta + gzip + headers |
| `deploy-entrypoint.sh` | Gera `config.js` da landing a partir de `WEBHOOK_URL` (runtime) |
| `.dockerignore` | Mantém o contexto de build leve |

> Contexto de build = a raiz do repo (`app/`, `gestao/` e a Proposta).

## Deploy no Easypanel

1. **Create → App** apontando para o repositório `The-Indev/formula-do-som`, branch `main`.
2. **Build**: tipo **Dockerfile**, caminho `Dockerfile`, contexto `/`.
3. **Environment** (opcional): `WEBHOOK_URL=https://...` para ligar o chat de orçamento da
   landing. Sem isso, o chat cai no WhatsApp (fallback).
4. **Domains**: **1 domínio só** na porta **80**. Pode ser:
   - o domínio/subdomínio temporário que o **Easypanel já fornece** (sem cadastrar nada), ou
   - um domínio de vocês, se preferirem.
5. **Deploy**.

### Links (a partir do domínio que aparecer no passo 4)
- Landing: `https://SEU-DOMINIO/`
- Sistema: `https://SEU-DOMINIO/sistema-gestao/`
- Proposta: `https://SEU-DOMINIO/proposta/`  (o botão "Abrir o sistema" já leva ao gestão)

### Ligar / desligar
No Easypanel: **Stop** pausa; **Delete** remove — 1 clique.

## Teste local (opcional)

```bash
cd "Formula do som"
docker build -t fds-proto .
docker run --rm -p 8080:80 fds-proto

# landing:   http://localhost:8080/
# gestão:    http://localhost:8080/sistema-gestao/
# proposta:  http://localhost:8080/proposta/
```

## Observações

- **Performance da landing**: as imagens pesadas do fundo (faróis) foram tiradas do
  carregamento inicial — entram quando a página fica ociosa (o efeito de faróis
  piscando continua sempre presente, só carrega logo após o 1º paint). A barra de
  progresso de rolagem usa `transform`/rAF (sem travar).
- O gestão é MVP **sem backend**: dados no `localStorage` do navegador de quem acessa
  (cada pessoa vê os dados de demonstração). Multiusuário/na nuvem = Fase 2.
