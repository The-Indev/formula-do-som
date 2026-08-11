# Fórmula do Som · Gestão (MVP)

Sistema de **gestão interna** da A Fórmula do Som. MVP em **HTML + CSS + JS puro**
(sem build, sem dependências). Tema **dark** da marca com **modo claro** opcional.

## Módulos

- **Dashboard** — KPIs (faturamento e saldo do mês, OS em aberto, estoque baixo),
  serviços em andamento, últimas movimentações e alerta de reposição.
- **Ordens de Serviço (OS)** — substitui o pedido em papel. Cliente + veículo, itens
  (**produtos e serviços**, cada um classificado; puxam preço do catálogo), desconto, forma
  de pagamento, observações e **status** (Orçamento → Aprovado → Em execução → Concluído →
  Entregue). Ao montar a OS, o sistema **sugere o acompanhamento** (casamento produto ×
  serviço). OS **imprimível / PDF** com subtotais por tipo e **baixa automática no
  Financeiro** ao entregar. Filtro por status.
- **Clientes (CRM)** — cadastro de cliente/veículo/placa, contagem de OS, total gasto e
  ticket médio.
- **Catálogo** — **produtos** e **serviços** num só lugar, com **vínculo (casamento)**:
  quando um serviço exige um produto (ou vice-versa), o par fica visível na coluna
  *Acompanha* e é sugerido na OS.
- **Estoque** — produtos e materiais, com estoque mínimo, custo, fornecedor e alerta
  automático de reposição; mostra o valor total em estoque.
- **Financeiro** — lançamentos de entrada/saída por categoria; entradas, saídas, saldo e
  **exportação CSV**.
- **Relatórios** — faturamento × despesas (6 meses), **receita por categoria de venda
  (produtos × serviços)**, itens que mais faturam, melhores clientes, despesas por categoria,
  funil de OS e ticket médio. Botão de **impressão**.

> Interface **sem emojis** — usa um conjunto de **ícones SVG** (traço, estilo Lucide)
> embutidos no próprio `app.js` (`ICONS` + `ic()`), sem dependências externas.

## Como usar

É um site estático. Duas formas:

1. **Abrir direto:** dê duplo-clique em `index.html`.
2. **Servir localmente** (recomendado — evita restrições de `file://`):

   ```bash
   cd gestao
   npx serve .        # ou: python -m http.server 8080
   ```

## Dados

- Tudo é salvo no **`localStorage`** do navegador (chave `fds_gestao_v3`), por dispositivo.
- Já vem com **dados de exemplo** (seed) para você ver funcionando; edite/exclua à vontade.
- Botão **♻️ Dados demo** na barra lateral restaura os dados de demonstração a qualquer momento.
- O tema escolhido também fica salvo (`fds_theme`).

> É um MVP local. Não há login nem sincronização entre dispositivos ainda — isso entra numa
> próxima fase (ex.: backend/n8n + banco). O código já está organizado por módulos para
> facilitar essa evolução.

## Estrutura

```
gestao/
├─ index.html        # shell (sidebar, topbar, modal)
├─ css/styles.css    # tema dark + claro (variáveis CSS)
├─ js/app.js         # estado, CRUD, render, persistência
└─ assets/logo.jpg
```

## Próximos passos (ideias)

- Autenticação e multiusuário
- Backend real (n8n + banco) e sincronização
- Relatórios/gráficos e exportação (CSV/PDF)
- Vincular a tabela de **Preços** ao chat de orçamento do site
- Baixa automática de estoque ao concluir um serviço
