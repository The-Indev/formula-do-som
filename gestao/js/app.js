/* ============================================================
   Fórmula do Som · Gestão (MVP)
   HTML/CSS/JS puro. Persistência em localStorage.
   Módulos: Dashboard · Ordens de Serviço · Clientes · Preços
            · Estoque · Financeiro · Relatórios
   ============================================================ */
(function () {
  'use strict';

  // ---------- Utils ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const uid = () =>
    (crypto && crypto.randomUUID ? crypto.randomUUID() : 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2));

  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const money = (n) => BRL.format(Number(n) || 0);
  const num = (n) => new Intl.NumberFormat('pt-BR').format(Number(n) || 0);
  const fmtDate = (iso) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  };
  const pad = (n) => String(n).padStart(2, '0');
  const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayISO = () => toISO(new Date());
  const isoOffset = (daysBack) => {
    const d = new Date();
    d.setDate(d.getDate() - daysBack);
    return toISO(d);
  };
  const isoAhead = (daysAhead) => isoOffset(-daysAhead);
  const monthOffset = (mBack, day) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - mBack);
    if (day) d.setDate(day);
    return toISO(d);
  };
  const esc = (s) =>
    String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const MONTHS_ABBR = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const monthLabel = (key) => {
    const [y, m] = key.split('-');
    return `${MONTHS_ABBR[Number(m) - 1]}/${String(y).slice(2)}`;
  };

  // ---------- Ícones (SVG inline, estilo linha — sem dependências) ----------
  const ICONS = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    'clipboard-list':
      '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    package:
      '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    'bar-chart': '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    'line-chart': '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    refresh:
      '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6M14 11v6"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'arrow-right': '<path d="M5 12h14M13 5l7 7-7 7"/>',
    printer:
      '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    wrench:
      '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22V4"/>',
    car:
      '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    'file-text':
      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M16 13H8M16 17H8M10 9H8"/>',
    'x-circle': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    'dollar-sign': '<path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'trending-up': '<path d="M22 7 13.5 15.5l-5-5L2 17"/><path d="M16 7h6v6"/>',
    'trending-down': '<path d="M22 17 13.5 8.5l-5 5L2 7"/><path d="M16 17h6v-6"/>',
    'alert-triangle':
      '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'arrow-up': '<path d="M12 19V5M5 12l7-7 7 7"/>',
    'arrow-down': '<path d="M12 5v14M19 12l-7 7-7-7"/>',
    equal: '<path d="M5 9h14M5 15h14"/>',
    inbox:
      '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    link:
      '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  };
  function ic(name, cls) {
    const p = ICONS[name] || '';
    return `<svg class="ic${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }
  function hydrateIcons(root) {
    (root || document).querySelectorAll('[data-ic]').forEach((el) => {
      el.innerHTML = ic(el.getAttribute('data-ic'));
    });
  }

  // ---------- Domínio ----------
  const CATS_SERV = ['Película', 'Iluminação', 'Som & Multimídia', 'Segurança', 'Revestimento', 'Plotter', 'Estética'];
  const CATS_FIN = ['Serviço', 'Venda de produto', 'Fornecedor', 'Aluguel', 'Salário', 'Marketing', 'Imposto', 'Outros'];
  const PAGAMENTOS = ['Pix', 'Dinheiro', 'Cartão débito', 'Cartão crédito', 'Cartão 2x', 'A receber'];

  const OS_STATUS = [
    { key: 'orcamento', label: 'Orçamento', cls: 'st-orc', icon: 'file-text' },
    { key: 'aprovado', label: 'Aprovado', cls: 'st-apr', icon: 'check' },
    { key: 'execucao', label: 'Em execução', cls: 'st-exe', icon: 'wrench' },
    { key: 'concluido', label: 'Concluído', cls: 'st-con', icon: 'flag' },
    { key: 'entregue', label: 'Entregue', cls: 'st-ent', icon: 'car' },
    { key: 'cancelado', label: 'Cancelado', cls: 'st-can', icon: 'x-circle' },
  ];
  const statusMeta = (k) => OS_STATUS.find((s) => s.key === k) || OS_STATUS[0];
  // ordem de avanço no fluxo (cancelado fica de fora)
  const FLOW = ['orcamento', 'aprovado', 'execucao', 'concluido', 'entregue'];

  // Categorias de venda
  const TIPOS = [
    { key: 'servico', label: 'Serviço', cls: 'tag--serv', icon: 'wrench' },
    { key: 'produto', label: 'Produto', cls: 'tag--prod', icon: 'package' },
  ];
  const tipoMeta = (k) => TIPOS.find((t) => t.key === k) || TIPOS[0];
  const tipoTagVenda = (k) => {
    const t = tipoMeta(k);
    return `<span class="tag ${t.cls}">${ic(t.icon)} ${t.label}</span>`;
  };
  // Descobre o tipo de um item de OS (usa o campo salvo ou infere pelo catálogo)
  function itemTipo(item) {
    if (item && item.tipo) return item.tipo;
    const p = db && db.precos ? db.precos.find((x) => x.nome === (item && item.nome)) : null;
    return (p && p.tipo) || 'servico';
  }

  // ---------- Persistência ----------
  const KEY = 'fds_gestao_v3';

  function seed() {
    // Clientes
    const cAna = uid(), cBruno = uid(), cCarla = uid(), cDiego = uid(),
      cElaine = uid(), cFabio = uid(), cGabi = uid(), cHenrique = uid();

    const clientes = [
      { id: cAna, nome: 'Ana Ribeiro', telefone: '(31) 98812-4407', veiculo: 'Honda Civic 2020', placa: 'PXR-2A31', cor: 'Preto', obs: 'Cliente recorrente', criadoEm: monthOffset(5, 12) },
      { id: cBruno, nome: 'Bruno Almeida', telefone: '(31) 99141-2280', veiculo: 'VW Nivus 2022', placa: 'RKD-1E88', cor: 'Cinza', obs: '', criadoEm: monthOffset(4, 3) },
      { id: cCarla, nome: 'Carla Nogueira', telefone: '(31) 98550-9912', veiculo: 'Jeep Compass 2021', placa: 'QMB-7J45', cor: 'Branco', obs: 'Indicada pela Ana', criadoEm: monthOffset(3, 22) },
      { id: cDiego, nome: 'Diego Fontes', telefone: '(31) 99677-3021', veiculo: 'Fiat Toro 2023', placa: 'SLA-9C10', cor: 'Vermelho', obs: '', criadoEm: monthOffset(3, 5) },
      { id: cElaine, nome: 'Elaine Souza', telefone: '(31) 98120-7788', veiculo: 'Hyundai HB20 2019', placa: 'PZT-4G62', cor: 'Prata', obs: '', criadoEm: monthOffset(2, 14) },
      { id: cFabio, nome: 'Fábio Martins', telefone: '(31) 99433-5567', veiculo: 'Toyota Corolla 2022', placa: 'RTN-8H09', cor: 'Preto', obs: 'Prefere atendimento sábado', criadoEm: monthOffset(1, 8) },
      { id: cGabi, nome: 'Gabriela Lima', telefone: '(31) 98999-1042', veiculo: 'Chevrolet Onix 2021', placa: 'QAB-2F77', cor: 'Branco', obs: '', criadoEm: monthOffset(1, 27) },
      { id: cHenrique, nome: 'Henrique Dias', telefone: '(31) 99201-6634', veiculo: 'Renault Duster 2023', placa: 'SFG-3D21', cor: 'Verde', obs: 'Frota — 2 veículos', criadoEm: isoOffset(9) },
    ];

    // Ordens de Serviço
    const os = (numero, clienteId, dataBack, prevAhead, status, itens, opts = {}) => {
      const c = clientes.find((x) => x.id === clienteId) || {};
      return {
        id: uid(),
        numero,
        clienteId,
        cliente: c.nome,
        telefone: c.telefone,
        veiculo: c.veiculo,
        placa: c.placa,
        data: typeof dataBack === 'number' ? isoOffset(dataBack) : dataBack,
        previsao: prevAhead == null ? '' : isoAhead(prevAhead),
        status,
        itens,
        desconto: opts.desconto || 0,
        pagamento: opts.pagamento || 'Pix',
        obs: opts.obs || '',
        financeiroLancado: status === 'entregue',
      };
    };

    // ---- Catálogo (produtos e serviços) com vínculos (casamento) ----
    // Produtos
    const pCentral9 = uid(), pCentral7 = uid(), pLed = uid(), pNeon = uid(),
      pAlarme = uid(), pFalante = uid(), pTrava = uid(), pVinilFibra = uid(), pPelicula = uid();
    // Serviços
    const sAplicPel = uid(), sPPF = uid(), sInstLed = uid(), sInstNeon = uid(),
      sInstMulti = uid(), sTrocaFal = uid(), sRevSom = uid(), sInstAlarme = uid(),
      sInstTrava = uid(), sEnvCapo = uid(), sEnvTeto = uid(), sPlot = uid(), sHigien = uid();

    const precos = [
      // Produtos ....................................................
      { id: pCentral9, nome: 'Central Multimídia Android 9"', tipo: 'produto', categoria: 'Som & Multimídia', preco: 1290, unidade: 'un', vinculo: sInstMulti, obs: 'CarPlay / Android Auto' },
      { id: pCentral7, nome: 'Central Multimídia Android 7"', tipo: 'produto', categoria: 'Som & Multimídia', preco: 890, unidade: 'un', vinculo: sInstMulti, obs: '' },
      { id: pLed, nome: 'Par de lâmpadas Super LED H4', tipo: 'produto', categoria: 'Iluminação', preco: 480, unidade: 'par', vinculo: sInstLed, obs: '' },
      { id: pNeon, nome: 'Kit Neon RGB interno', tipo: 'produto', categoria: 'Iluminação', preco: 650, unidade: 'kit', vinculo: sInstNeon, obs: 'Com controle via app' },
      { id: pAlarme, nome: 'Módulo de alarme + controle', tipo: 'produto', categoria: 'Segurança', preco: 380, unidade: 'un', vinculo: sInstAlarme, obs: '' },
      { id: pFalante, nome: 'Alto-falantes 6" (par)', tipo: 'produto', categoria: 'Som & Multimídia', preco: 320, unidade: 'par', vinculo: sTrocaFal, obs: '' },
      { id: pTrava, nome: 'Kit trava elétrica (4 portas)', tipo: 'produto', categoria: 'Segurança', preco: 260, unidade: 'kit', vinculo: sInstTrava, obs: '' },
      { id: pVinilFibra, nome: 'Vinil fibra de carbono (m²)', tipo: 'produto', categoria: 'Revestimento', preco: 90, unidade: 'm²', vinculo: sEnvCapo, obs: '' },
      { id: pPelicula, nome: 'Película G20 (jogo)', tipo: 'produto', categoria: 'Película', preco: 280, unidade: 'jogo', vinculo: sAplicPel, obs: 'Material — jogo completo' },
      // Serviços ....................................................
      { id: sAplicPel, nome: 'Aplicação de insulfilm (mão de obra)', tipo: 'servico', categoria: 'Película', preco: 150, unidade: 'serviço', vinculo: pPelicula, obs: 'Requer a película' },
      { id: sPPF, nome: 'Aplicação de PPF (faróis)', tipo: 'servico', categoria: 'Película', preco: 180, unidade: 'par', vinculo: '', obs: 'Material incluso' },
      { id: sInstLed, nome: 'Instalação de Super LED', tipo: 'servico', categoria: 'Iluminação', preco: 120, unidade: 'serviço', vinculo: pLed, obs: '' },
      { id: sInstNeon, nome: 'Instalação de Kit Neon RGB', tipo: 'servico', categoria: 'Iluminação', preco: 180, unidade: 'serviço', vinculo: pNeon, obs: '' },
      { id: sInstMulti, nome: 'Instalação de multimídia', tipo: 'servico', categoria: 'Som & Multimídia', preco: 250, unidade: 'serviço', vinculo: pCentral9, obs: 'Requer a central' },
      { id: sTrocaFal, nome: 'Troca de alto-falantes (par)', tipo: 'servico', categoria: 'Som & Multimídia', preco: 120, unidade: 'serviço', vinculo: pFalante, obs: '' },
      { id: sRevSom, nome: 'Revisão de som + ajuste', tipo: 'servico', categoria: 'Som & Multimídia', preco: 150, unidade: 'serviço', vinculo: '', obs: '' },
      { id: sInstAlarme, nome: 'Instalação de alarme', tipo: 'servico', categoria: 'Segurança', preco: 180, unidade: 'serviço', vinculo: pAlarme, obs: 'Requer o módulo' },
      { id: sInstTrava, nome: 'Instalação de trava elétrica', tipo: 'servico', categoria: 'Segurança', preco: 120, unidade: 'serviço', vinculo: pTrava, obs: '' },
      { id: sEnvCapo, nome: 'Envelopamento de capô', tipo: 'servico', categoria: 'Revestimento', preco: 450, unidade: 'serviço', vinculo: pVinilFibra, obs: 'Requer o vinil' },
      { id: sEnvTeto, nome: 'Envelopamento de teto (black piano)', tipo: 'servico', categoria: 'Revestimento', preco: 300, unidade: 'serviço', vinculo: '', obs: 'Material incluso' },
      { id: sPlot, nome: 'Plotagem de adesivo personalizado', tipo: 'servico', categoria: 'Plotter', preco: 220, unidade: 'serviço', vinculo: '', obs: '' },
      { id: sHigien, nome: 'Higienização interna completa', tipo: 'servico', categoria: 'Estética', preco: 280, unidade: 'serviço', vinculo: '', obs: '' },
    ];

    // Atalho para montar item de OS a partir do catálogo (mantém nome/tipo/valor coerentes)
    const it = (id, qtd) => {
      const p = precos.find((x) => x.id === id);
      return { nome: p.nome, tipo: p.tipo, qtd: qtd || 1, valor: p.preco };
    };

    const ordens = [
      os(1042, cAna, 2, 1, 'execucao',
        [it(pPelicula), it(sAplicPel), it(pNeon), it(sInstNeon)],
        { pagamento: 'Cartão 2x', obs: 'Película nos 4 vidros + parabrisa. Neon no assoalho.' }),
      os(1041, cFabio, 1, 0, 'concluido',
        [it(pCentral9), it(sInstMulti)],
        { pagamento: 'Pix', obs: 'Cliente retira hoje 17h.' }),
      os(1040, cGabi, 3, null, 'aprovado',
        [it(pLed), it(sInstLed)],
        { pagamento: 'A receber' }),
      os(1039, cHenrique, 0, 4, 'orcamento',
        [it(sEnvCapo), it(pVinilFibra, 4), it(sPPF)],
        { desconto: 60, pagamento: 'A receber', obs: 'Aguardando aprovação do cliente.' }),
      os(1038, cDiego, 6, null, 'entregue',
        [it(pAlarme), it(sInstAlarme)],
        { pagamento: 'Dinheiro' }),
      os(1037, cCarla, 8, null, 'entregue',
        [it(pPelicula), it(sAplicPel), it(sPPF)],
        { pagamento: 'Cartão crédito' }),
      os(1036, cBruno, 11, null, 'entregue',
        [it(pNeon), it(sInstNeon), it(pFalante), it(sTrocaFal)],
        { pagamento: 'Pix' }),
      os(1035, cElaine, 14, null, 'entregue',
        [it(pCentral7), it(sInstMulti)],
        { pagamento: 'Cartão 2x' }),
      os(1034, cAna, 19, null, 'entregue',
        [it(sRevSom)],
        { pagamento: 'Pix' }),
      os(1033, cDiego, 24, null, 'entregue',
        [it(sEnvTeto)],
        { pagamento: 'Dinheiro' }),
      os(1032, cCarla, 33, null, 'entregue',
        [it(pPelicula), it(sAplicPel)],
        { pagamento: 'Pix' }),
      os(1031, cFabio, 41, null, 'entregue',
        [it(pAlarme), it(sInstAlarme), it(pTrava), it(sInstTrava)],
        { pagamento: 'Cartão crédito' }),
      os(1030, cGabi, 52, null, 'cancelado',
        [{ nome: 'Envelopamento total (sob orçamento)', tipo: 'servico', qtd: 1, valor: 3200 }],
        { pagamento: 'A receber', obs: 'Cliente desistiu — orçamento acima do previsto.' }),
    ];

    return {
      clientes,
      ordens,
      precos,
      estoque: [
        { id: uid(), produto: 'Bobina de película G20', categoria: 'Película', quantidade: 8, minimo: 3, unidade: 'rolo', custo: 420, fornecedor: 'FilmTech' },
        { id: uid(), produto: 'Bobina de película G05', categoria: 'Película', quantidade: 2, minimo: 3, unidade: 'rolo', custo: 460, fornecedor: 'FilmTech' },
        { id: uid(), produto: 'Lâmpada Super LED H4', categoria: 'Iluminação', quantidade: 2, minimo: 6, unidade: 'par', custo: 190, fornecedor: 'LumiAuto' },
        { id: uid(), produto: 'Fita LED RGB 5m', categoria: 'Iluminação', quantidade: 15, minimo: 5, unidade: 'un', custo: 45, fornecedor: 'NeonBH' },
        { id: uid(), produto: 'Controladora RGB + app', categoria: 'Iluminação', quantidade: 9, minimo: 4, unidade: 'un', custo: 60, fornecedor: 'NeonBH' },
        { id: uid(), produto: 'Central Android 9"', categoria: 'Som & Multimídia', quantidade: 3, minimo: 2, unidade: 'un', custo: 620, fornecedor: 'MultiImport' },
        { id: uid(), produto: 'Central Android 7"', categoria: 'Som & Multimídia', quantidade: 1, minimo: 2, unidade: 'un', custo: 430, fornecedor: 'MultiImport' },
        { id: uid(), produto: 'Alto-falante 6" (par)', categoria: 'Som & Multimídia', quantidade: 6, minimo: 3, unidade: 'par', custo: 150, fornecedor: 'SoundCar' },
        { id: uid(), produto: 'Módulo alarme + controle', categoria: 'Segurança', quantidade: 1, minimo: 4, unidade: 'un', custo: 130, fornecedor: 'SecCar' },
        { id: uid(), produto: 'Kit trava elétrica 4 portas', categoria: 'Segurança', quantidade: 5, minimo: 2, unidade: 'kit', custo: 95, fornecedor: 'SecCar' },
        { id: uid(), produto: 'Vinil fibra de carbono (rolo)', categoria: 'Revestimento', quantidade: 4, minimo: 2, unidade: 'rolo', custo: 380, fornecedor: 'WrapPro' },
        { id: uid(), produto: 'Vinil black piano (rolo)', categoria: 'Revestimento', quantidade: 3, minimo: 2, unidade: 'rolo', custo: 350, fornecedor: 'WrapPro' },
      ],
      financeiro: seedFinanceiro(),
    };
  }

  function seedFinanceiro() {
    const F = [];
    const add = (data, descricao, tipo, categoria, valor) => F.push({ id: uid(), data, descricao, tipo, categoria, valor });

    // ---- Entradas (serviços/vendas) espalhadas em ~5 meses ----
    // Mês atual
    add(isoOffset(6), 'OS #1038 — Alarme + instalação (Fiat Toro)', 'entrada', 'Serviço', 560);
    add(isoOffset(8), 'OS #1037 — Película + PPF (Compass)', 'entrada', 'Serviço', 610);
    add(isoOffset(2), 'Venda avulsa — Fita LED RGB', 'entrada', 'Venda de produto', 180);
    add(isoOffset(11), 'OS #1036 — Neon + som (Nivus)', 'entrada', 'Serviço', 1270);
    // Mês -1
    add(monthOffset(1, 14), 'OS #1035 — Multimídia 7" (HB20)', 'entrada', 'Serviço', 890);
    add(monthOffset(1, 6), 'OS #1034 — Revisão de som (Civic)', 'entrada', 'Serviço', 150);
    add(monthOffset(1, 20), 'Venda avulsa — Kit trava elétrica', 'entrada', 'Venda de produto', 260);
    add(monthOffset(1, 24), 'OS #1033 — Envelopamento teto (Toro)', 'entrada', 'Serviço', 480);
    // Mês -2
    add(monthOffset(2, 3), 'OS #1032 — Película (Compass)', 'entrada', 'Serviço', 380);
    add(monthOffset(2, 12), 'OS #1031 — Alarme + trava (Corolla)', 'entrada', 'Serviço', 820);
    add(monthOffset(2, 18), 'Venda avulsa — Controladora RGB', 'entrada', 'Venda de produto', 140);
    add(monthOffset(2, 26), 'Serviço — Plotagem adesivo', 'entrada', 'Serviço', 220);
    // Mês -3
    add(monthOffset(3, 5), 'Serviço — Multimídia 9" (Ranger)', 'entrada', 'Serviço', 1290);
    add(monthOffset(3, 15), 'Serviço — Insulfilm (Onix)', 'entrada', 'Serviço', 380);
    add(monthOffset(3, 22), 'Venda avulsa — Alto-falante 6"', 'entrada', 'Venda de produto', 320);
    // Mês -4
    add(monthOffset(4, 8), 'Serviço — Envelopamento capô', 'entrada', 'Serviço', 900);
    add(monthOffset(4, 19), 'Serviço — Neon RGB (Kicks)', 'entrada', 'Serviço', 650);

    // ---- Saídas (despesas) ----
    add(isoOffset(4), 'Compra de lâmpadas LED (LumiAuto)', 'saida', 'Fornecedor', 380);
    add(isoOffset(15), 'Conta de energia', 'saida', 'Outros', 540);
    add(isoOffset(10), 'Anúncios Instagram', 'saida', 'Marketing', 250);
    add(monthOffset(0, 5), 'Aluguel do galpão', 'saida', 'Aluguel', 2200);
    add(monthOffset(1, 5), 'Aluguel do galpão', 'saida', 'Aluguel', 2200);
    add(monthOffset(1, 10), 'Reposição película (FilmTech)', 'saida', 'Fornecedor', 840);
    add(monthOffset(1, 28), 'Salário — ajudante', 'saida', 'Salário', 1600);
    add(monthOffset(2, 5), 'Aluguel do galpão', 'saida', 'Aluguel', 2200);
    add(monthOffset(2, 15), 'Compra de centrais (MultiImport)', 'saida', 'Fornecedor', 1240);
    add(monthOffset(2, 28), 'Salário — ajudante', 'saida', 'Salário', 1600);
    add(monthOffset(3, 5), 'Aluguel do galpão', 'saida', 'Aluguel', 2200);
    add(monthOffset(3, 12), 'Simples Nacional', 'saida', 'Imposto', 610);

    return F;
  }

  let db;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      db = raw ? JSON.parse(raw) : seed();
    } catch (e) {
      db = seed();
    }
    ['precos', 'estoque', 'financeiro', 'clientes', 'ordens'].forEach((k) => {
      if (!db[k]) db[k] = [];
    });
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(db));
    } catch (e) {}
  }
  function resetSeed() {
    if (confirm('Restaurar os dados de demonstração? Isso substitui tudo que você editou.')) {
      db = seed();
      save();
      render();
      toast('Dados de demonstração restaurados');
    }
  }

  // ---------- Toast ----------
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 2200);
  }

  // ---------- Modal genérico (form por campos) ----------
  function openModal({ title, fields, record = {}, onSave, wide = false }) {
    restoreModalFoot(); // garante o rodapé padrão (custom modals podem tê-lo trocado)
    const modal = $('#modal');
    $('#modalTitle').textContent = title;
    modal.querySelector('.modal__card').classList.toggle('modal__card--wide', !!wide);
    const form = $('#modalForm');
    form.innerHTML = fields
      .map((f) => {
        const val = record[f.name] != null ? record[f.name] : f.default != null ? f.default : '';
        const cls = 'field' + (f.full ? ' full' : '');
        if (f.type === 'select') {
          const opts = f.options
            .map((o) => {
              const ov = typeof o === 'object' ? o.value : o;
              const ol = typeof o === 'object' ? o.label : o;
              return `<option value="${esc(ov)}" ${String(val) === String(ov) ? 'selected' : ''}>${esc(ol)}</option>`;
            })
            .join('');
          return `<div class="${cls}"><label>${esc(f.label)}</label><select name="${f.name}">${opts}</select></div>`;
        }
        if (f.type === 'textarea') {
          return `<div class="${cls}"><label>${esc(f.label)}</label><textarea name="${f.name}" rows="3" placeholder="${esc(
            f.placeholder || ''
          )}">${esc(val)}</textarea></div>`;
        }
        const attrs =
          f.type === 'number' ? `type="number" step="${f.step || '1'}" min="${f.min != null ? f.min : 0}"` : `type="${f.type || 'text'}"`;
        return `<div class="${cls}"><label>${esc(f.label)}</label><input ${attrs} name="${f.name}" value="${esc(val)}" ${
          f.required ? 'required' : ''
        } placeholder="${esc(f.placeholder || '')}"></div>`;
      })
      .join('');

    modal.hidden = false;
    const first = form.querySelector('input,select,textarea');
    if (first) setTimeout(() => first.focus(), 50);

    function close() {
      modal.hidden = true;
      $('#modalSave').onclick = null;
    }
    modal.querySelectorAll('[data-close]').forEach((b) => (b.onclick = close));
    $('#modalSave').onclick = () => {
      const values = {};
      let ok = true;
      fields.forEach((f) => {
        const input = form.querySelector(`[name="${f.name}"]`);
        let v = input.value;
        if (f.required && !String(v).trim()) {
          input.style.borderColor = 'var(--red)';
          ok = false;
        } else {
          input.style.borderColor = '';
        }
        v = f.type === 'number' ? parseFloat(v) || 0 : v;
        values[f.name] = v;
      });
      if (!ok) {
        toast('Preencha os campos obrigatórios');
        return;
      }
      onSave(values);
      close();
    };
  }

  // Modal com conteúdo livre (usado por OS e visualizações)
  function openCustomModal({ title, bodyHTML, footHTML, wide = true, onMount }) {
    const modal = $('#modal');
    $('#modalTitle').textContent = title;
    modal.querySelector('.modal__card').classList.toggle('modal__card--wide', !!wide);
    const form = $('#modalForm');
    form.innerHTML = bodyHTML;
    const foot = $('#modal .modal__foot');
    foot.innerHTML = footHTML;
    modal.hidden = false;

    function close() {
      modal.hidden = true;
      restoreModalFoot();
    }
    modal.querySelectorAll('[data-close]').forEach((b) => (b.onclick = close));
    if (onMount) onMount({ close, form, foot });
    return { close };
  }
  function restoreModalFoot() {
    $('#modal .modal__foot').innerHTML =
      '<button class="btn btn--ghost" data-close>Cancelar</button><button class="btn btn--primary" id="modalSave">Salvar</button>';
  }

  // ---------- Render helpers ----------
  function table(cols, rows, opts = {}) {
    const withActions = opts.actions !== false;
    if (!rows.length) {
      return `<div class="empty">${ic('inbox', 'ic--xl')}<p>${esc(opts.emptyMsg || 'Nenhum registro ainda.')}${
        withActions ? ' Clique em <b>Novo</b> para começar.' : ''
      }</p></div>`;
    }
    const head =
      cols.map((c) => `<th class="${c.num ? 'num' : ''}">${esc(c.label)}</th>`).join('') +
      (withActions ? '<th class="num">Ações</th>' : '');
    const body = rows
      .map((r) => {
        const tds = cols.map((c) => `<td class="${c.num ? 'num' : ''}">${c.render ? c.render(r) : esc(r[c.key])}</td>`).join('');
        const actions = withActions
          ? `<td><div class="cell-actions">
          <button class="mini-btn" data-edit="${r.id}" title="Editar">${ic('pencil')}</button>
          <button class="mini-btn danger" data-del="${r.id}" title="Excluir">${ic('trash')}</button>
        </div></td>`
          : '';
        return `<tr>${tds}${actions}</tr>`;
      })
      .join('');
    return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  }

  function kpi(label, value, opts = {}) {
    const cls = ['kpi__value', opts.flame ? 'flame' : '', opts.tone || ''].join(' ').trim();
    return `<div class="kpi">
      <span class="kpi__label">${opts.icon ? ic(opts.icon) : ''}${esc(label)}</span>
      <span class="${cls}">${value}</span>
      ${opts.hint ? `<span class="kpi__hint">${esc(opts.hint)}</span>` : ''}
    </div>`;
  }

  function statusTag(k) {
    const s = statusMeta(k);
    return `<span class="tag st ${s.cls}">${ic(s.icon)} ${s.label}</span>`;
  }

  // ---------- Cálculos ----------
  function osTotal(o) {
    const sub = (o.itens || []).reduce((s, i) => s + Number(i.valor || 0) * Number(i.qtd || 1), 0);
    return Math.max(0, sub - Number(o.desconto || 0));
  }
  function monthKey(iso) {
    return (iso || '').slice(0, 7);
  }
  function currentMonth() {
    return todayISO().slice(0, 7);
  }

  function calc() {
    const fin = db.financeiro;
    const entradas = fin.filter((f) => f.tipo === 'entrada').reduce((s, f) => s + Number(f.valor || 0), 0);
    const saidas = fin.filter((f) => f.tipo === 'saida').reduce((s, f) => s + Number(f.valor || 0), 0);
    const mes = currentMonth();
    const entradasMes = fin.filter((f) => f.tipo === 'entrada' && monthKey(f.data) === mes).reduce((s, f) => s + Number(f.valor || 0), 0);
    const saidasMes = fin.filter((f) => f.tipo === 'saida' && monthKey(f.data) === mes).reduce((s, f) => s + Number(f.valor || 0), 0);
    const estoqueBaixo = db.estoque.filter((e) => Number(e.quantidade) <= Number(e.minimo));
    const valorEstoque = db.estoque.reduce((s, e) => s + Number(e.quantidade || 0) * Number(e.custo || 0), 0);
    const abertas = db.ordens.filter((o) => ['orcamento', 'aprovado', 'execucao', 'concluido'].includes(o.status));
    const emExecucao = db.ordens.filter((o) => o.status === 'execucao');
    const osMes = db.ordens.filter((o) => o.status === 'entregue' && monthKey(o.data) === mes);
    return {
      entradas, saidas, saldo: entradas - saidas,
      entradasMes, saidasMes, saldoMes: entradasMes - saidasMes,
      estoqueBaixo, valorEstoque,
      abertas, emExecucao, osMes,
    };
  }

  // ---------- Views ----------
  const state = { view: 'dashboard', osFilter: 'todos' };

  const META = {
    dashboard: { title: 'Dashboard', subtitle: 'Visão geral do negócio' },
    ordens: { title: 'Ordens de Serviço', subtitle: 'Do orçamento à entrega — sem papel' },
    clientes: { title: 'Clientes', subtitle: 'Cadastro e histórico por veículo' },
    precos: { title: 'Catálogo', subtitle: 'Produtos e serviços, valores e casamentos' },
    estoque: { title: 'Estoque', subtitle: 'Controle de produtos e materiais' },
    financeiro: { title: 'Financeiro', subtitle: 'Entradas, saídas e saldo' },
    relatorios: { title: 'Relatórios', subtitle: 'Indicadores do negócio' },
  };

  // ---- Dashboard ----
  function renderDashboard(c) {
    const k = calc();
    const recent = [...db.financeiro].sort((a, b) => (b.data || '').localeCompare(a.data || '')).slice(0, 5);
    const proximasOS = [...db.ordens]
      .filter((o) => ['aprovado', 'execucao'].includes(o.status))
      .sort((a, b) => (a.previsao || '9999').localeCompare(b.previsao || '9999'))
      .slice(0, 5);

    c.innerHTML = `
      <div class="kpi-grid">
        ${kpi('Faturamento do mês', money(k.entradasMes), { icon: 'dollar-sign', flame: true, hint: 'Entradas do mês atual' })}
        ${kpi('Saldo do mês', money(k.saldoMes), { icon: 'trending-up', tone: k.saldoMes >= 0 ? 'pos' : 'neg', hint: `${money(k.entradasMes)} entradas · ${money(k.saidasMes)} saídas` })}
        ${kpi('OS em aberto', num(k.abertas.length), { icon: 'clipboard-list', hint: `${k.emExecucao.length} em execução agora` })}
        ${kpi('Itens em estoque baixo', num(k.estoqueBaixo.length), { icon: 'package', tone: k.estoqueBaixo.length ? 'neg' : 'pos', hint: `Valor em estoque: ${money(k.valorEstoque)}` })}
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="panel__head"><h2>Serviços em andamento</h2><div class="spacer"></div>
            <button class="btn btn--ghost" data-goto="ordens">Ver ordens</button></div>
          ${table(
            [
              { key: 'numero', label: 'OS', render: (r) => `<b>#${esc(r.numero)}</b>` },
              { key: 'cliente', label: 'Cliente / Veículo', render: (r) => `${esc(r.cliente)}<br><span class="sub">${esc(r.veiculo || '')}</span>` },
              { key: 'previsao', label: 'Previsão', render: (r) => fmtDate(r.previsao) },
              { key: 'status', label: 'Status', render: (r) => statusTag(r.status) },
            ],
            proximasOS,
            { actions: false, emptyMsg: 'Sem serviços em andamento.' }
          )}
        </div>

        <div class="panel">
          <div class="panel__head"><h2>Últimas movimentações</h2><div class="spacer"></div>
            <button class="btn btn--ghost" data-goto="financeiro">Ver financeiro</button></div>
          ${table(
            [
              { key: 'data', label: 'Data', render: (r) => fmtDate(r.data) },
              { key: 'descricao', label: 'Descrição' },
              { key: 'valor', label: 'Valor', num: true, render: (r) => valorCell(r) },
            ],
            recent,
            { actions: false }
          )}
        </div>
      </div>

      ${
        k.estoqueBaixo.length
          ? `<div class="panel">
        <div class="panel__head"><h2 class="h2-ic">${ic('alert-triangle')} Reposição necessária</h2><div class="spacer"></div>
          <button class="btn btn--ghost" data-goto="estoque">Ir para estoque</button></div>
        ${table(
          [
            { key: 'produto', label: 'Produto' },
            { key: 'categoria', label: 'Categoria' },
            { key: 'quantidade', label: 'Qtd', num: true, render: (r) => `${num(r.quantidade)} ${esc(r.unidade || '')}` },
            { key: 'minimo', label: 'Mínimo', num: true },
            { key: 'status', label: 'Status', render: () => `<span class="tag tag--low">Repor</span>` },
          ],
          k.estoqueBaixo,
          { actions: false }
        )}
      </div>`
          : ''
      }
    `;
  }

  function tipoTag(t) {
    return t === 'entrada'
      ? `<span class="tag tag--in">${ic('arrow-up')} Entrada</span>`
      : `<span class="tag tag--out">${ic('arrow-down')} Saída</span>`;
  }
  function valorCell(r) {
    const sign = r.tipo === 'entrada' ? 'pos' : 'neg';
    const pref = r.tipo === 'entrada' ? '+' : '−';
    return `<span class="money ${sign}">${pref} ${money(r.valor)}</span>`;
  }

  // ---- Ordens de Serviço ----
  function renderOrdens(c) {
    const k = calc();
    const filter = state.osFilter;
    const all = [...db.ordens].sort((a, b) => (b.numero || 0) - (a.numero || 0));
    const rows = filter === 'todos' ? all : all.filter((o) => o.status === filter);

    const counts = {};
    OS_STATUS.forEach((s) => (counts[s.key] = db.ordens.filter((o) => o.status === s.key).length));

    const chips =
      `<button class="chip ${filter === 'todos' ? 'is-active' : ''}" data-filter="todos">Todas <b>${db.ordens.length}</b></button>` +
      OS_STATUS.map(
        (s) => `<button class="chip ${filter === s.key ? 'is-active' : ''}" data-filter="${s.key}">${ic(s.icon)} ${s.label} <b>${counts[s.key]}</b></button>`
      ).join('');

    c.innerHTML = `
      <div class="kpi-grid">
        ${kpi('OS em aberto', num(k.abertas.length), { icon: 'clipboard-list', hint: 'Orçamento → concluído' })}
        ${kpi('Em execução agora', num(k.emExecucao.length), { icon: 'wrench', tone: 'warn' })}
        ${kpi('Valor em aberto', money(k.abertas.reduce((s, o) => s + osTotal(o), 0)), { icon: 'clock', hint: 'A faturar' })}
        ${kpi('Entregues no mês', num(k.osMes.length), { icon: 'car', flame: true, hint: money(k.osMes.reduce((s, o) => s + osTotal(o), 0)) })}
      </div>

      <div class="panel">
        <div class="panel__head"><h2>Ordens de Serviço</h2><div class="spacer"></div></div>
        <div class="chips" id="osChips">${chips}</div>
        ${table(
          [
            { key: 'numero', label: 'OS', render: (r) => `<b>#${esc(r.numero)}</b>` },
            { key: 'cliente', label: 'Cliente / Veículo', render: (r) => `${esc(r.cliente || '—')}<br><span class="sub">${esc(r.veiculo || '')} · ${esc(r.placa || '')}</span>` },
            { key: 'itens', label: 'Serviços', render: (r) => resumoItens(r) },
            { key: 'data', label: 'Entrada', render: (r) => fmtDate(r.data) },
            { key: 'total', label: 'Total', num: true, render: (r) => `<span class="money">${money(osTotal(r))}</span>` },
            { key: 'status', label: 'Status', render: (r) => statusTag(r.status) },
            {
              key: 'go', label: '', render: (r) => {
                const next = nextStatus(r.status);
                const adv = next
                  ? `<button class="mini-btn ok" data-adv="${r.id}" title="Avançar para ${statusMeta(next).label}">${ic('arrow-right')}</button>`
                  : '';
                return `<div class="cell-actions">
                  <button class="mini-btn" data-view-os="${r.id}" title="Abrir / imprimir">${ic('eye')}</button>
                  ${adv}</div>`;
              },
            },
          ],
          rows,
          { emptyMsg: 'Nenhuma OS neste filtro.' }
        )}
      </div>`;

    const chipsEl = $('#osChips');
    if (chipsEl)
      chipsEl.addEventListener('click', (e) => {
        const b = e.target.closest('[data-filter]');
        if (b) {
          state.osFilter = b.dataset.filter;
          render();
        }
      });
  }

  function resumoItens(o) {
    const it = o.itens || [];
    if (!it.length) return '—';
    const first = esc(it[0].nome);
    const extra = it.length > 1 ? ` <span class="sub">+${it.length - 1}</span>` : '';
    return `${first}${extra}`;
  }
  function nextStatus(k) {
    if (k === 'cancelado' || k === 'entregue') return null;
    const i = FLOW.indexOf(k);
    return i >= 0 && i < FLOW.length - 1 ? FLOW[i + 1] : null;
  }

  function advanceOS(id) {
    const o = db.ordens.find((x) => x.id === id);
    if (!o) return;
    const next = nextStatus(o.status);
    if (!next) return;
    o.status = next;
    // Baixa automática no financeiro ao entregar
    if (next === 'entregue' && !o.financeiroLancado) {
      db.financeiro.push({
        id: uid(),
        data: todayISO(),
        descricao: `OS #${o.numero} — ${o.cliente || 'cliente'} (${o.veiculo || ''})`.trim(),
        tipo: 'entrada',
        categoria: 'Serviço',
        valor: osTotal(o),
        osId: o.id,
      });
      o.financeiroLancado = true;
      toast(`OS #${o.numero} entregue — ${money(osTotal(o))} lançado no financeiro`);
    } else {
      toast(`OS #${o.numero} → ${statusMeta(next).label}`);
    }
    save();
    render();
  }

  // ---- Editor de OS (form dedicado) ----
  function nextOSNumber() {
    const max = db.ordens.reduce((m, o) => Math.max(m, Number(o.numero) || 0), 1030);
    return max + 1;
  }

  function openOSForm(record) {
    const isEdit = !!record;
    const o = record
      ? JSON.parse(JSON.stringify(record))
      : {
          id: uid(),
          numero: nextOSNumber(),
          clienteId: '',
          cliente: '',
          telefone: '',
          veiculo: '',
          placa: '',
          data: todayISO(),
          previsao: '',
          status: 'orcamento',
          itens: [{ nome: '', qtd: 1, valor: 0 }],
          desconto: 0,
          pagamento: 'Pix',
          obs: '',
          financeiroLancado: false,
        };

    const clienteOpts =
      `<option value="">— Selecionar cliente —</option>` +
      db.clientes
        .map((c) => `<option value="${c.id}" ${c.id === o.clienteId ? 'selected' : ''}>${esc(c.nome)} · ${esc(c.veiculo || '')}</option>`)
        .join('');

    const servicoDatalist = db.precos.map((p) => `<option value="${esc(p.nome)}"></option>`).join('');

    const body = `
      <div class="os-form">
        <div class="field full">
          <label>Cliente</label>
          <select name="clienteId" id="osCliente">${clienteOpts}</select>
        </div>
        <div class="field"><label>Nome (se sem cadastro)</label><input name="cliente" id="osNome" value="${esc(o.cliente || '')}" placeholder="Nome do cliente"></div>
        <div class="field"><label>Telefone</label><input name="telefone" id="osTel" value="${esc(o.telefone || '')}" placeholder="(31) 9...."></div>
        <div class="field"><label>Veículo</label><input name="veiculo" id="osVeic" value="${esc(o.veiculo || '')}" placeholder="Ex.: Honda Civic 2020"></div>
        <div class="field"><label>Placa</label><input name="placa" id="osPlaca" value="${esc(o.placa || '')}" placeholder="ABC-1D23"></div>
        <div class="field"><label>Data de entrada</label><input type="date" name="data" id="osData" value="${esc(o.data)}"></div>
        <div class="field"><label>Previsão de entrega</label><input type="date" name="previsao" id="osPrev" value="${esc(o.previsao || '')}"></div>
        <div class="field"><label>Status</label><select name="status" id="osStatus">${OS_STATUS.map(
          (s) => `<option value="${s.key}" ${s.key === o.status ? 'selected' : ''}>${s.label}</option>`
        ).join('')}</select></div>
        <div class="field"><label>Pagamento</label><select name="pagamento" id="osPag">${PAGAMENTOS.map(
          (p) => `<option value="${p}" ${p === o.pagamento ? 'selected' : ''}>${p}</option>`
        ).join('')}</select></div>

        <div class="field full">
          <label>Itens — produtos e serviços</label>
          <datalist id="servicoList">${servicoDatalist}</datalist>
          <div class="os-items" id="osItems"></div>
          <div class="os-suggest" id="osSuggest" hidden></div>
          <button type="button" class="btn btn--ghost btn--sm" id="osAddItem">${ic('plus')} Adicionar item</button>
        </div>

        <div class="field"><label>Desconto (R$)</label><input type="number" step="0.01" min="0" name="desconto" id="osDesc" value="${esc(o.desconto || 0)}"></div>
        <div class="field os-total-box">
          <label>Total da OS</label>
          <div class="os-total" id="osTotal">${money(osTotal(o))}</div>
        </div>
        <div class="field full"><label>Observações</label><textarea name="obs" id="osObs" rows="2" placeholder="Detalhes do serviço, combinações, etc.">${esc(o.obs || '')}</textarea></div>
      </div>`;

    const foot = `<button class="btn btn--ghost" data-close>Cancelar</button>
      <button class="btn btn--primary" id="osSave">${isEdit ? 'Salvar alterações' : 'Criar OS'}</button>`;

    openCustomModal({
      title: isEdit ? `Editar OS #${o.numero}` : 'Nova Ordem de Serviço',
      bodyHTML: body,
      footHTML: foot,
      wide: true,
      onMount: ({ close }) => {
        const itemsEl = $('#osItems');
        const suggestEl = $('#osSuggest');
        let items = o.itens && o.itens.length ? o.itens.slice() : [{ nome: '', tipo: 'servico', qtd: 1, valor: 0 }];

        const tipoOptions = (sel) =>
          TIPOS.map((t) => `<option value="${t.key}" ${t.key === sel ? 'selected' : ''}>${t.label}</option>`).join('');

        function renderItems() {
          itemsEl.innerHTML = items
            .map(
              (it, i) => `
            <div class="os-item" data-i="${i}">
              <select class="oi-tipo" title="Categoria de venda">${tipoOptions(it.tipo || 'servico')}</select>
              <input class="oi-nome" list="servicoList" placeholder="Produto ou serviço" value="${esc(it.nome)}">
              <input class="oi-qtd" type="number" min="1" step="1" value="${esc(it.qtd || 1)}" title="Qtd">
              <input class="oi-valor" type="number" min="0" step="0.01" value="${esc(it.valor || 0)}" title="Valor unit.">
              <button type="button" class="mini-btn danger oi-del" title="Remover">${ic('trash')}</button>
            </div>`
            )
            .join('');
        }
        function syncFromDOM() {
          items = $$('.os-item', itemsEl).map((row) => ({
            nome: $('.oi-nome', row).value.trim(),
            tipo: $('.oi-tipo', row).value,
            qtd: parseFloat($('.oi-qtd', row).value) || 1,
            valor: parseFloat($('.oi-valor', row).value) || 0,
          }));
        }
        function recalcTotal() {
          const desc = parseFloat($('#osDesc').value) || 0;
          const sub = items.reduce((s, i) => s + i.qtd * i.valor, 0);
          $('#osTotal').textContent = money(Math.max(0, sub - desc));
        }
        // Sugere o "casamento": produto que pede serviço (ou vice-versa) ainda não incluído
        function renderSuggest() {
          const nomes = new Set(items.filter((i) => i.nome).map((i) => i.nome));
          const seen = new Set();
          const sugg = [];
          items.forEach((i) => {
            const cat = db.precos.find((p) => p.nome === i.nome);
            if (!cat) return;
            linkedItems(cat).forEach((l) => {
              if (nomes.has(l.nome) || seen.has(l.id)) return;
              seen.add(l.id);
              sugg.push({ partner: l, becauseOf: cat.nome });
            });
          });
          if (!sugg.length) {
            suggestEl.hidden = true;
            suggestEl.innerHTML = '';
            return;
          }
          suggestEl.hidden = false;
          suggestEl.innerHTML =
            `<div class="os-suggest__title">${ic('link')} Acompanhamentos sugeridos</div>` +
            sugg
              .map(
                (s) =>
                  `<button type="button" class="suggest-chip" data-add="${s.partner.id}">${ic('plus')} ${tipoMeta(
                    s.partner.tipo
                  ).label}: <b>${esc(s.partner.nome)}</b> <span class="sub">acompanha ${esc(s.becauseOf)}</span></button>`
              )
              .join('');
        }
        function refresh() {
          syncFromDOM();
          recalcTotal();
          renderSuggest();
        }

        renderItems();
        refresh();

        // digitar/selecionar item → tipo e valor automáticos
        itemsEl.addEventListener('input', (e) => {
          if (e.target.classList.contains('oi-nome')) {
            const p = db.precos.find((x) => x.nome === e.target.value);
            if (p) {
              const row = e.target.closest('.os-item');
              $('.oi-tipo', row).value = p.tipo || 'servico';
              const valInput = $('.oi-valor', row);
              if (!parseFloat(valInput.value)) valInput.value = p.preco;
            }
          }
          refresh();
        });
        itemsEl.addEventListener('change', (e) => {
          if (e.target.classList.contains('oi-tipo')) refresh();
        });
        itemsEl.addEventListener('click', (e) => {
          const del = e.target.closest('.oi-del');
          if (del) {
            syncFromDOM();
            const i = Number(del.closest('.os-item').dataset.i);
            items.splice(i, 1);
            if (!items.length) items = [{ nome: '', tipo: 'servico', qtd: 1, valor: 0 }];
            renderItems();
            refresh();
          }
        });
        // adicionar acompanhamento sugerido
        suggestEl.addEventListener('click', (e) => {
          const b = e.target.closest('[data-add]');
          if (!b) return;
          syncFromDOM();
          const p = db.precos.find((x) => x.id === b.dataset.add);
          if (!p) return;
          const blank = items.findIndex((i) => !i.nome);
          const novo = { nome: p.nome, tipo: p.tipo || 'servico', qtd: 1, valor: p.preco };
          if (blank >= 0) items[blank] = novo;
          else items.push(novo);
          renderItems();
          refresh();
        });
        $('#osAddItem').onclick = () => {
          syncFromDOM();
          items.push({ nome: '', tipo: 'servico', qtd: 1, valor: 0 });
          renderItems();
          refresh();
        };
        $('#osDesc').addEventListener('input', recalcTotal);

        // cliente select → autopreenche
        $('#osCliente').addEventListener('change', (e) => {
          const c = db.clientes.find((x) => x.id === e.target.value);
          if (c) {
            $('#osNome').value = c.nome || '';
            $('#osTel').value = c.telefone || '';
            $('#osVeic').value = c.veiculo || '';
            $('#osPlaca').value = c.placa || '';
          }
        });

        $('#osSave').onclick = () => {
          syncFromDOM();
          const cleanItems = items.filter((i) => i.nome);
          if (!$('#osNome').value.trim() && !$('#osCliente').value) {
            toast('Informe o cliente');
            return;
          }
          if (!cleanItems.length) {
            toast('Adicione ao menos um item');
            return;
          }
          const rec = {
            numero: o.numero,
            clienteId: $('#osCliente').value,
            cliente: $('#osNome').value.trim(),
            telefone: $('#osTel').value.trim(),
            veiculo: $('#osVeic').value.trim(),
            placa: $('#osPlaca').value.trim(),
            data: $('#osData').value || todayISO(),
            previsao: $('#osPrev').value,
            status: $('#osStatus').value,
            pagamento: $('#osPag').value,
            desconto: parseFloat($('#osDesc').value) || 0,
            obs: $('#osObs').value.trim(),
            itens: cleanItems,
          };

          if (isEdit) {
            Object.assign(record, rec);
            // lançar no financeiro se virou entregue agora
            if (rec.status === 'entregue' && !record.financeiroLancado) {
              db.financeiro.push({
                id: uid(), data: todayISO(),
                descricao: `OS #${record.numero} — ${record.cliente} (${record.veiculo})`,
                tipo: 'entrada', categoria: 'Serviço', valor: osTotal(record), osId: record.id,
              });
              record.financeiroLancado = true;
            }
            toast('OS atualizada');
          } else {
            const novo = { id: o.id, financeiroLancado: false, ...rec };
            if (novo.status === 'entregue') {
              db.financeiro.push({
                id: uid(), data: todayISO(),
                descricao: `OS #${novo.numero} — ${novo.cliente} (${novo.veiculo})`,
                tipo: 'entrada', categoria: 'Serviço', valor: osTotal(novo), osId: novo.id,
              });
              novo.financeiroLancado = true;
            }
            db.ordens.push(novo);
            toast(`OS #${novo.numero} criada`);
          }
          save();
          restoreModalFoot();
          close();
          render();
        };
      },
    });
  }

  // ---- Visualizar / imprimir OS ----
  function openOSView(id) {
    const o = db.ordens.find((x) => x.id === id);
    if (!o) return;
    const linhas = (o.itens || [])
      .map(
        (i) => `<tr><td>${esc(i.nome)}</td><td>${tipoMeta(itemTipo(i)).label}</td><td class="num">${num(i.qtd)}</td><td class="num">${money(
          i.valor
        )}</td><td class="num">${money(i.qtd * i.valor)}</td></tr>`
      )
      .join('');
    const sub = (o.itens || []).reduce((s, i) => s + i.qtd * i.valor, 0);
    const subProd = (o.itens || []).filter((i) => itemTipo(i) === 'produto').reduce((s, i) => s + i.qtd * i.valor, 0);
    const subServ = sub - subProd;

    const body = `
      <div class="os-doc" id="osDoc">
        <div class="os-doc__head">
          <div>
            <div class="os-doc__brand">Fórmula do Som</div>
            <div class="os-doc__sub">Customização automotiva · Ordem de Serviço</div>
          </div>
          <div class="os-doc__num">OS Nº<br><b>#${esc(o.numero)}</b></div>
        </div>
        <div class="os-doc__meta">
          <div><span>Cliente</span><b>${esc(o.cliente || '—')}</b></div>
          <div><span>Telefone</span><b>${esc(o.telefone || '—')}</b></div>
          <div><span>Veículo</span><b>${esc(o.veiculo || '—')}</b></div>
          <div><span>Placa</span><b>${esc(o.placa || '—')}</b></div>
          <div><span>Entrada</span><b>${fmtDate(o.data)}</b></div>
          <div><span>Previsão</span><b>${fmtDate(o.previsao)}</b></div>
          <div><span>Status</span><b>${statusMeta(o.status).label}</b></div>
          <div><span>Pagamento</span><b>${esc(o.pagamento || '—')}</b></div>
        </div>
        <table class="os-doc__table">
          <thead><tr><th>Item</th><th>Venda</th><th class="num">Qtd</th><th class="num">Unit.</th><th class="num">Total</th></tr></thead>
          <tbody>${linhas}</tbody>
        </table>
        <div class="os-doc__totais">
          <div><span>Produtos</span><b>${money(subProd)}</b></div>
          <div><span>Serviços</span><b>${money(subServ)}</b></div>
          <div><span>Subtotal</span><b>${money(sub)}</b></div>
          <div><span>Desconto</span><b>− ${money(o.desconto || 0)}</b></div>
          <div class="os-doc__grand"><span>Total</span><b>${money(osTotal(o))}</b></div>
        </div>
        ${o.obs ? `<div class="os-doc__obs"><span>Observações</span><p>${esc(o.obs)}</p></div>` : ''}
        <div class="os-doc__sign">
          <div>____________________________<br>Cliente</div>
          <div>____________________________<br>Fórmula do Som</div>
        </div>
      </div>`;

    const foot = `<button class="btn btn--ghost" data-close>Fechar</button>
      <button class="btn btn--ghost" id="osEditBtn">${ic('pencil')} Editar</button>
      <button class="btn btn--primary" id="osPrintBtn">${ic('printer')} Imprimir / PDF</button>`;

    openCustomModal({
      title: `OS #${o.numero}`,
      bodyHTML: body,
      footHTML: foot,
      wide: true,
      onMount: ({ close }) => {
        $('#osPrintBtn').onclick = () => printElement('osDoc', `OS-${o.numero}`);
        $('#osEditBtn').onclick = () => {
          close();
          openOSForm(o);
        };
      },
    });
  }

  // ---- Clientes ----
  function renderClientes(c) {
    const rows = [...db.clientes].sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));
    const osCount = (cid) => db.ordens.filter((o) => o.clienteId === cid).length;
    const gasto = (cid) =>
      db.ordens.filter((o) => o.clienteId === cid && o.status === 'entregue').reduce((s, o) => s + osTotal(o), 0);

    c.innerHTML = `
      <div class="kpi-grid">
        ${kpi('Clientes cadastrados', num(db.clientes.length), { icon: 'users' })}
        ${kpi('Ticket médio (entregues)', money(ticketMedio()), { icon: 'target', flame: true })}
        ${kpi('OS por cliente (média)', db.clientes.length ? (db.ordens.length / db.clientes.length).toFixed(1) : '0', { icon: 'clipboard-list' })}
      </div>
      <div class="panel">
        <div class="panel__head"><h2>Clientes</h2><div class="spacer"></div><span class="tag">${db.clientes.length} cadastros</span></div>
        ${table(
          [
            { key: 'nome', label: 'Cliente', render: (r) => `<b>${esc(r.nome)}</b><br><span class="sub">${esc(r.telefone || '')}</span>` },
            { key: 'veiculo', label: 'Veículo', render: (r) => `${esc(r.veiculo || '—')}<br><span class="sub">${esc(r.placa || '')} · ${esc(r.cor || '')}</span>` },
            { key: 'os', label: 'OS', num: true, render: (r) => `<span class="tag">${osCount(r.id)}</span>` },
            { key: 'gasto', label: 'Total gasto', num: true, render: (r) => `<span class="money">${money(gasto(r.id))}</span>` },
            { key: 'obs', label: 'Observação', render: (r) => esc(r.obs) || '—' },
          ],
          rows
        )}
      </div>`;
  }
  function ticketMedio() {
    const entregues = db.ordens.filter((o) => o.status === 'entregue');
    if (!entregues.length) return 0;
    return entregues.reduce((s, o) => s + osTotal(o), 0) / entregues.length;
  }

  // Itens do catálogo vinculados a este (aponta para OU é apontado por) — casamento
  function linkedItems(item) {
    const out = [];
    if (item.vinculo) {
      const t = db.precos.find((p) => p.id === item.vinculo);
      if (t) out.push(t);
    }
    db.precos.forEach((p) => {
      if (p.vinculo === item.id && !out.some((o) => o.id === p.id)) out.push(p);
    });
    return out;
  }
  function acompanhaCell(r) {
    const links = linkedItems(r);
    if (!links.length) return '<span class="sub">—</span>';
    return links
      .map((l) => `<span class="link-pill" title="Casamento produto × serviço">${ic('link')} ${esc(l.nome)}</span>`)
      .join(' ');
  }

  // ---- Preços / Catálogo ----
  function renderPrecos(c) {
    const nProd = db.precos.filter((p) => p.tipo === 'produto').length;
    const nServ = db.precos.filter((p) => p.tipo !== 'produto').length;
    const nPares = db.precos.filter((p) => linkedItems(p).length).length;
    c.innerHTML = `
      <div class="kpi-grid">
        ${kpi('Produtos', num(nProd), { icon: 'package' })}
        ${kpi('Serviços', num(nServ), { icon: 'wrench' })}
        ${kpi('Itens com acompanhamento', num(nPares), { icon: 'link', hint: 'Casamento produto × serviço' })}
      </div>
      <div class="panel">
      <div class="panel__head"><h2>Catálogo · produtos e serviços</h2><div class="spacer"></div>
        <span class="tag">${db.precos.length} itens</span></div>
      ${table(
        [
          { key: 'nome', label: 'Item' },
          { key: 'tipo', label: 'Venda', render: (r) => tipoTagVenda(r.tipo) },
          { key: 'categoria', label: 'Área', render: (r) => `<span class="tag">${esc(r.categoria)}</span>` },
          { key: 'preco', label: 'Preço', num: true, render: (r) => `<span class="money">${money(r.preco)}</span>` },
          { key: 'unidade', label: 'Unidade' },
          { key: 'vinculo', label: 'Acompanha', render: (r) => acompanhaCell(r) },
        ],
        db.precos
      )}
    </div>`;
  }

  // ---- Estoque ----
  function renderEstoque(c) {
    const k = calc();
    c.innerHTML = `
      <div class="kpi-grid">
        ${kpi('Itens cadastrados', num(db.estoque.length), { icon: 'package' })}
        ${kpi('Valor em estoque', money(k.valorEstoque), { icon: 'dollar-sign', flame: true, hint: 'Qtd × custo' })}
        ${kpi('Precisam repor', num(k.estoqueBaixo.length), { icon: 'alert-triangle', tone: k.estoqueBaixo.length ? 'neg' : 'pos' })}
      </div>
      <div class="panel">
        <div class="panel__head"><h2>Produtos & materiais</h2></div>
        ${table(
          [
            { key: 'produto', label: 'Produto' },
            { key: 'categoria', label: 'Categoria', render: (r) => `<span class="tag">${esc(r.categoria)}</span>` },
            { key: 'quantidade', label: 'Qtd', num: true, render: (r) => `${num(r.quantidade)} ${esc(r.unidade || '')}` },
            { key: 'minimo', label: 'Mínimo', num: true },
            { key: 'custo', label: 'Custo un.', num: true, render: (r) => `<span class="money">${money(r.custo)}</span>` },
            { key: 'fornecedor', label: 'Fornecedor', render: (r) => esc(r.fornecedor) || '—' },
            {
              key: 'status',
              label: 'Status',
              render: (r) =>
                Number(r.quantidade) <= Number(r.minimo)
                  ? `<span class="tag tag--low">Repor</span>`
                  : `<span class="tag tag--ok">OK</span>`,
            },
          ],
          db.estoque
        )}
      </div>`;
  }

  // ---- Financeiro ----
  function renderFinanceiro(c) {
    const k = calc();
    const rows = [...db.financeiro].sort((a, b) => (b.data || '').localeCompare(a.data || ''));
    c.innerHTML = `
      <div class="kpi-grid">
        ${kpi('Entradas', money(k.entradas), { icon: 'arrow-up', tone: 'pos' })}
        ${kpi('Saídas', money(k.saidas), { icon: 'arrow-down', tone: 'neg' })}
        ${kpi('Saldo total', money(k.saldo), { icon: 'equal', tone: k.saldo >= 0 ? 'pos' : 'neg', flame: k.saldo >= 0 })}
      </div>
      <div class="panel">
        <div class="panel__head"><h2>Movimentações</h2><div class="spacer"></div>
          <button class="btn btn--ghost btn--sm" id="btnCsv">${ic('download')} Exportar CSV</button>
          <span class="tag">${rows.length} lançamentos</span></div>
        ${table(
          [
            { key: 'data', label: 'Data', render: (r) => fmtDate(r.data) },
            { key: 'descricao', label: 'Descrição' },
            { key: 'categoria', label: 'Categoria', render: (r) => `<span class="tag">${esc(r.categoria)}</span>` },
            { key: 'tipo', label: 'Tipo', render: (r) => tipoTag(r.tipo) },
            { key: 'valor', label: 'Valor', num: true, render: (r) => valorCell(r) },
          ],
          rows
        )}
      </div>`;
    const csv = $('#btnCsv');
    if (csv) csv.onclick = exportFinanceiroCSV;
  }

  function exportFinanceiroCSV() {
    const rows = [...db.financeiro].sort((a, b) => (a.data || '').localeCompare(b.data || ''));
    const head = 'Data;Descrição;Categoria;Tipo;Valor\n';
    const body = rows
      .map((r) => [fmtDate(r.data), r.descricao, r.categoria, r.tipo, String(r.valor).replace('.', ',')].map((x) => `"${String(x || '').replace(/"/g, '""')}"`).join(';'))
      .join('\n');
    const blob = new Blob(['﻿' + head + body], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financeiro-formula-do-som-${todayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast('CSV exportado');
  }

  // ---- Relatórios ----
  function barRow(label, value, max, sub, tone) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return `<div class="bar-row">
      <div class="bar-row__label">${esc(label)}${sub ? `<span class="sub"> ${esc(sub)}</span>` : ''}</div>
      <div class="bar-row__track"><div class="bar-row__fill ${tone || ''}" style="width:${Math.max(3, pct)}%"></div></div>
      <div class="bar-row__val">${value != null ? value : ''}</div>
    </div>`;
  }

  function renderRelatorios(c) {
    const fin = db.financeiro;

    // Faturamento por mês (6 meses)
    const meses = [];
    for (let i = 5; i >= 0; i--) meses.push(monthOffset(i, 1).slice(0, 7));
    const fatMes = meses.map((mk) => ({
      mk,
      entrada: fin.filter((f) => f.tipo === 'entrada' && monthKey(f.data) === mk).reduce((s, f) => s + Number(f.valor || 0), 0),
      saida: fin.filter((f) => f.tipo === 'saida' && monthKey(f.data) === mk).reduce((s, f) => s + Number(f.valor || 0), 0),
    }));
    const maxFat = Math.max(1, ...fatMes.map((m) => Math.max(m.entrada, m.saida)));
    const colChart = fatMes
      .map((m) => {
        const hE = Math.round((m.entrada / maxFat) * 100);
        const hS = Math.round((m.saida / maxFat) * 100);
        return `<div class="col-group" title="${monthLabel(m.mk)} — Entrada ${money(m.entrada)} · Saída ${money(m.saida)}">
          <div class="cols">
            <div class="col col--in" style="height:${Math.max(2, hE)}%"></div>
            <div class="col col--out" style="height:${Math.max(2, hS)}%"></div>
          </div>
          <span class="col-lbl">${monthLabel(m.mk)}</span>
        </div>`;
      })
      .join('');

    // Serviços mais realizados (por receita, a partir das OS)
    const servMap = {};
    db.ordens
      .filter((o) => o.status !== 'cancelado')
      .forEach((o) => (o.itens || []).forEach((i) => {
        const key = i.nome;
        if (!servMap[key]) servMap[key] = { qtd: 0, receita: 0 };
        servMap[key].qtd += Number(i.qtd || 1);
        servMap[key].receita += Number(i.valor || 0) * Number(i.qtd || 1);
      }));
    const topServ = Object.entries(servMap)
      .map(([nome, v]) => ({ nome, ...v }))
      .sort((a, b) => b.receita - a.receita)
      .slice(0, 6);
    const maxServ = Math.max(1, ...topServ.map((s) => s.receita));

    // Top clientes (por valor entregue)
    const cliMap = {};
    db.ordens
      .filter((o) => o.status === 'entregue')
      .forEach((o) => {
        const key = o.cliente || '—';
        cliMap[key] = (cliMap[key] || 0) + osTotal(o);
      });
    const topCli = Object.entries(cliMap)
      .map(([nome, valor]) => ({ nome, valor }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 6);
    const maxCli = Math.max(1, ...topCli.map((s) => s.valor));

    // Despesas por categoria
    const despMap = {};
    fin.filter((f) => f.tipo === 'saida').forEach((f) => (despMap[f.categoria] = (despMap[f.categoria] || 0) + Number(f.valor || 0)));
    const desp = Object.entries(despMap).map(([cat, v]) => ({ cat, v })).sort((a, b) => b.v - a.v);
    const maxDesp = Math.max(1, ...desp.map((d) => d.v));

    // Funil de OS
    const funil = OS_STATUS.map((s) => ({ s, n: db.ordens.filter((o) => o.status === s.key).length }));
    const maxFunil = Math.max(1, ...funil.map((f) => f.n));

    // Receita por categoria de venda (produtos × serviços), a partir das OS entregues
    const vendaTipo = { produto: 0, servico: 0 };
    db.ordens
      .filter((o) => o.status === 'entregue')
      .forEach((o) => (o.itens || []).forEach((i) => {
        vendaTipo[itemTipo(i) === 'produto' ? 'produto' : 'servico'] += Number(i.valor || 0) * Number(i.qtd || 1);
      }));
    const maxVenda = Math.max(1, vendaTipo.produto, vendaTipo.servico);

    // Totais
    const totEntrada = fin.filter((f) => f.tipo === 'entrada').reduce((s, f) => s + Number(f.valor || 0), 0);
    const totSaida = fin.filter((f) => f.tipo === 'saida').reduce((s, f) => s + Number(f.valor || 0), 0);
    const entregues = db.ordens.filter((o) => o.status === 'entregue').length;

    c.innerHTML = `
      <div class="kpi-grid" id="repDoc">
        ${kpi('Receita (período)', money(totEntrada), { icon: 'dollar-sign', flame: true })}
        ${kpi('Despesas (período)', money(totSaida), { icon: 'receipt', tone: 'neg' })}
        ${kpi('Lucro', money(totEntrada - totSaida), { icon: 'trending-up', tone: totEntrada - totSaida >= 0 ? 'pos' : 'neg' })}
        ${kpi('Ticket médio', money(ticketMedio()), { icon: 'target', hint: `${entregues} OS entregues` })}
      </div>

      <div class="panel">
        <div class="panel__head"><h2>Faturamento × Despesas (6 meses)</h2><div class="spacer"></div>
          <span class="legend"><i class="dot dot--in"></i>Entradas <i class="dot dot--out"></i>Saídas</span></div>
        <div class="col-chart">${colChart}</div>
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="panel__head"><h2>Receita por categoria de venda</h2><div class="spacer"></div>
            <span class="sub">produtos × serviços</span></div>
          <div class="bars">
            ${barRow('Serviços', money(vendaTipo.servico), maxVenda, '', 'flame')}
            ${barRow('Produtos', money(vendaTipo.produto), maxVenda, '', 'pos')}
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><h2>Melhores clientes</h2></div>
          <div class="bars">${topCli.map((s) => barRow(s.nome, money(s.valor), maxCli, '', 'pos')).join('') || emptyBars()}</div>
        </div>
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="panel__head"><h2>Itens que mais faturam</h2></div>
          <div class="bars">${topServ.map((s) => barRow(s.nome, money(s.receita), maxServ, `· ${s.qtd}×`, 'flame')).join('') || emptyBars()}</div>
        </div>
        <div class="panel">
          <div class="panel__head"><h2>Despesas por categoria</h2></div>
          <div class="bars">${desp.map((d) => barRow(d.cat, money(d.v), maxDesp, '', 'neg')).join('') || emptyBars()}</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel__head"><h2>Funil de Ordens de Serviço</h2></div>
        <div class="bars">${funil.map((f) => barRow(f.s.label, String(f.n), maxFunil, '', '')).join('')}</div>
      </div>`;
  }
  function emptyBars() {
    return `<div class="empty" style="padding:24px">${ic('line-chart', 'ic--xl')}<p>Sem dados no período.</p></div>`;
  }

  const RENDERERS = {
    dashboard: renderDashboard,
    ordens: renderOrdens,
    clientes: renderClientes,
    precos: renderPrecos,
    estoque: renderEstoque,
    financeiro: renderFinanceiro,
    relatorios: renderRelatorios,
  };

  // ---------- CRUD config por módulo (genérico) ----------
  const SCHEMAS = {
    clientes: {
      coll: 'clientes',
      singular: 'cliente',
      fields: () => [
        { name: 'nome', label: 'Nome', required: true, full: true },
        { name: 'telefone', label: 'Telefone', placeholder: '(31) 9....' },
        { name: 'veiculo', label: 'Veículo', placeholder: 'Ex.: Honda Civic 2020' },
        { name: 'placa', label: 'Placa', placeholder: 'ABC-1D23' },
        { name: 'cor', label: 'Cor' },
        { name: 'obs', label: 'Observação', full: true, placeholder: 'Opcional' },
      ],
      onCreate: (v) => ({ ...v, criadoEm: todayISO() }),
    },
    precos: {
      coll: 'precos',
      singular: 'item',
      fields: (record) => [
        { name: 'nome', label: 'Nome', required: true, full: true, placeholder: 'Ex.: Central Multimídia 9"' },
        { name: 'tipo', label: 'Categoria de venda', type: 'select', options: TIPOS.map((t) => ({ value: t.key, label: t.label })) },
        { name: 'categoria', label: 'Área', type: 'select', options: CATS_SERV },
        { name: 'preco', label: 'Preço (R$)', type: 'number', step: '0.01', required: true },
        { name: 'unidade', label: 'Unidade', default: 'serviço', placeholder: 'serviço, un, par, kit...' },
        {
          name: 'vinculo',
          label: 'Acompanha (casamento)',
          type: 'select',
          full: true,
          options: [{ value: '', label: '— Nenhum —' }].concat(
            db.precos
              .filter((p) => !record || p.id !== record.id)
              .map((p) => ({ value: p.id, label: `${tipoMeta(p.tipo).label}: ${p.nome}` }))
          ),
        },
        { name: 'obs', label: 'Observação', full: true, placeholder: 'Opcional' },
      ],
    },
    estoque: {
      coll: 'estoque',
      singular: 'produto',
      fields: () => [
        { name: 'produto', label: 'Produto', required: true, full: true },
        { name: 'categoria', label: 'Categoria', type: 'select', options: CATS_SERV },
        { name: 'fornecedor', label: 'Fornecedor' },
        { name: 'quantidade', label: 'Quantidade', type: 'number', step: '1', required: true },
        { name: 'minimo', label: 'Estoque mínimo', type: 'number', step: '1', default: 0 },
        { name: 'unidade', label: 'Unidade', default: 'un', placeholder: 'un, par, rolo...' },
        { name: 'custo', label: 'Custo unitário (R$)', type: 'number', step: '0.01', default: 0 },
      ],
    },
    financeiro: {
      coll: 'financeiro',
      singular: 'lançamento',
      fields: () => [
        { name: 'data', label: 'Data', type: 'date', default: todayISO(), required: true },
        { name: 'tipo', label: 'Tipo', type: 'select', options: [{ value: 'entrada', label: 'Entrada' }, { value: 'saida', label: 'Saída' }] },
        { name: 'descricao', label: 'Descrição', required: true, full: true },
        { name: 'categoria', label: 'Categoria', type: 'select', options: CATS_FIN },
        { name: 'valor', label: 'Valor (R$)', type: 'number', step: '0.01', required: true },
      ],
    },
  };

  function openForm(view, record) {
    const s = SCHEMAS[view];
    if (!s) return;
    openModal({
      title: (record ? 'Editar ' : 'Novo ') + s.singular,
      fields: s.fields(record),
      record: record || {},
      onSave: (values) => {
        if (record) {
          Object.assign(record, values);
          toast('Registro atualizado');
        } else {
          const extra = s.onCreate ? s.onCreate(values) : values;
          db[s.coll].push({ id: uid(), ...extra });
          toast(s.singular[0].toUpperCase() + s.singular.slice(1) + ' adicionado');
        }
        save();
        render();
      },
    });
  }

  // ---------- Impressão ----------
  function printElement(elId, title) {
    const el = document.getElementById(elId);
    if (!el) return window.print();
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map((n) => n.outerHTML)
      .join('');
    const w = window.open('', '_blank', 'width=820,height=900');
    w.document.write(`<!doctype html><html lang="pt-BR" data-theme="light"><head><meta charset="utf-8"><title>${esc(
      title
    )}</title>${styles}<style>body{background:#fff;padding:24px}</style></head><body>${el.outerHTML}</body></html>`);
    w.document.close();
    setTimeout(() => {
      w.focus();
      w.print();
    }, 300);
  }

  // ---------- Render principal ----------
  const content = () => $('#content');

  function topActionsFor(view) {
    if (view === 'ordens') return `<button class="btn btn--primary" id="btnNewOS">${ic('plus')} Nova OS</button>`;
    if (view === 'relatorios') return `<button class="btn btn--ghost" id="btnPrintRep">${ic('printer')} Imprimir</button>`;
    if (SCHEMAS[view]) return `<button class="btn btn--primary" id="btnNew">${ic('plus')} Novo ${SCHEMAS[view].singular}</button>`;
    return '';
  }

  function render() {
    const meta = META[state.view];
    $('#pageTitle').textContent = meta.title;
    $('#pageSubtitle').textContent = meta.subtitle;

    const actions = $('#topActions');
    actions.innerHTML = topActionsFor(state.view);
    const btnNew = $('#btnNew');
    if (btnNew) btnNew.onclick = () => openForm(state.view, null);
    const btnNewOS = $('#btnNewOS');
    if (btnNewOS) btnNewOS.onclick = () => openOSForm(null);
    const btnPrintRep = $('#btnPrintRep');
    if (btnPrintRep) btnPrintRep.onclick = () => window.print();

    RENDERERS[state.view](content());

    document.querySelectorAll('.nav__item').forEach((b) => b.classList.toggle('is-active', b.dataset.view === state.view));
  }

  function go(view) {
    state.view = view;
    render();
    $('#sidebar').classList.remove('is-open');
    window.scrollTo({ top: 0 });
  }

  // ---------- Eventos ----------
  function bind() {
    $('#nav').addEventListener('click', (e) => {
      const item = e.target.closest('.nav__item');
      if (item) go(item.dataset.view);
    });

    content().addEventListener('click', (e) => {
      const goto = e.target.closest('[data-goto]');
      if (goto) return go(goto.dataset.goto);

      const viewOS = e.target.closest('[data-view-os]');
      if (viewOS) return openOSView(viewOS.dataset.viewOs);

      const adv = e.target.closest('[data-adv]');
      if (adv) return advanceOS(adv.dataset.adv);

      const edit = e.target.closest('[data-edit]');
      if (edit) {
        if (state.view === 'ordens') {
          const rec = db.ordens.find((x) => x.id === edit.dataset.edit);
          if (rec) openOSForm(rec);
          return;
        }
        const coll = SCHEMAS[state.view] && SCHEMAS[state.view].coll;
        if (!coll) return;
        const rec = db[coll].find((x) => x.id === edit.dataset.edit);
        if (rec) openForm(state.view, rec);
        return;
      }
      const del = e.target.closest('[data-del]');
      if (del) {
        const coll = state.view === 'ordens' ? 'ordens' : SCHEMAS[state.view] && SCHEMAS[state.view].coll;
        if (!coll) return;
        if (confirm('Excluir este registro? Esta ação não pode ser desfeita.')) {
          db[coll] = db[coll].filter((x) => x.id !== del.dataset.del);
          save();
          render();
          toast('Registro excluído');
        }
      }
    });

    $('#modalForm').addEventListener('submit', (e) => e.preventDefault());
    $('#themeToggle').addEventListener('click', toggleTheme);
    $('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('is-open'));
    const resetBtn = $('#resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetSeed);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        $('#modal').hidden = true;
        restoreModalFoot();
      }
    });
  }

  // ---------- Tema ----------
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    $('#themeToggle .theme-toggle__ico').innerHTML = ic(isDark ? 'moon' : 'sun');
    $('#themeToggle .theme-toggle__label').textContent = isDark ? 'Modo escuro' : 'Modo claro';
    try {
      localStorage.setItem('fds_theme', theme);
    } catch (e) {}
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  }

  // ---------- Init ----------
  function init() {
    load();
    let theme = 'dark';
    try {
      theme = localStorage.getItem('fds_theme') || 'dark';
    } catch (e) {}
    hydrateIcons(); // preenche os ícones estáticos do HTML (nav, topbar, sidebar)
    applyTheme(theme);
    bind();
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
