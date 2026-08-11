# Deploy — Protótipo Fórmula do Som (UMA hospedagem, por subdomínio)

Um **único** container Nginx serve os três sites; o **subdomínio** decide qual aparece.
O roteamento é por `server_name` regex (só o prefixo), então vale para **qualquer domínio**
que você anexar no Easypanel — sem editar nada.

| Subdomínio (exemplo) | Mostra | Docroot no container |
|---|---|---|
| `formuladosom.com.br` / `www.` (padrão) | **Landing** (React) | `/landing` |
| `gestao.formuladosom.com.br` | **Sistema de gestão** (MVP) | `/gestao` |
| `proposta.formuladosom.com.br` | **Proposta** (apresentação) | `/proposta` |

## Arquivos do deploy (na raiz desta pasta)

| Arquivo | Papel |
|---|---|
| `Dockerfile` | Build da landing (Vite) + Nginx servindo os 3 sites |
| `nginx.conf` | Roteamento por subdomínio + gzip + headers |
| `deploy-entrypoint.sh` | Gera `config.js` da landing a partir de `WEBHOOK_URL` (runtime) |
| `.dockerignore` | Mantém o contexto de build leve |

> Contexto de build = esta pasta (`Formula do som`), onde estão `app/`, `gestao/` e a Proposta.

## Deploy no Easypanel (uma vez)

1. **Create → App** apontando para esta pasta.
2. **Build**: tipo **Dockerfile**, caminho `Dockerfile` (contexto = raiz desta pasta).
3. **Environment** (opcional): `WEBHOOK_URL=https://...` para ligar o chat de orçamento da
   landing. Sem isso, o chat cai no WhatsApp (fallback).
4. **Domains**: adicione os subdomínios que quiser, **todos apontando para o mesmo app**,
   porta **80** (o Easypanel emite o SSL de cada um):
   - `formuladosom.com.br` (+ `www`) → landing
   - `gestao.formuladosom.com.br` → sistema
   - `proposta.formuladosom.com.br` → proposta
5. **Deploy**. Cada subdomínio abre o site correspondente.

> DNS: aponte cada subdomínio (registro A/CNAME) para o servidor, como já é feito hoje.

### Ligar / desligar
No Easypanel: **Stop** pausa tudo; **Delete** remove. Para desativar só um site,
basta **remover o domínio** correspondente na aba Domains (o app segue no ar).

## Teste local (opcional)

Como o roteamento é por Host, use hostnames (o serviço `nip.io` resolve qualquer IP):

```bash
cd "Formula do som"
docker build -t fds-proto .
docker run --rm -p 8080:80 fds-proto

# landing:   http://127-0-0-1.nip.io:8080/
# gestão:    http://gestao.127-0-0-1.nip.io:8080/
# proposta:  http://proposta.127-0-0-1.nip.io:8080/
```

Ou via header Host: `curl -H "Host: gestao.x" http://localhost:8080/`.

## Observações

- O gestão é MVP **sem backend**: dados no `localStorage` do navegador de quem acessa
  (cada pessoa vê os dados de demonstração). Multiusuário/na nuvem = Fase 2.
- A **landing** usa `WEBHOOK_URL` em runtime (config.js) — igual ao deploy atual do `app/`.
