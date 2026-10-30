// ============================================================
// Conteúdo da landing — A Fórmula do Som (layout editorial)
// Dados reais: telefones/unidades (Google Meu Negócio), nota 4,4★, 226k no IG.
// MOCK: imagens do Unsplash — trocar pelas fotos oficiais quando chegarem.
// ============================================================

export const PHONE_WHATSAPP = '5531983167480';
export const waLink = (msg = 'Olá! Quero fazer um orçamento com a Fórmula do Som.') =>
  `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(msg)}`;

export const INSTAGRAM = 'https://www.instagram.com/a_formuladosom';
export const GOOGLE_SEARCH = 'https://www.google.com/search?q=a+formula+do+som+belo+horizonte';

export const socials = [
  { name: 'Instagram', href: INSTAGRAM },
  { name: 'TikTok', href: 'https://www.tiktok.com/@a_formuladosom' },
  { name: 'YouTube', href: 'https://www.youtube.com/@aformuladosom' },
  { name: 'Linktree', href: 'https://linktr.ee/aformuladosom01' },
];

const img = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Abre o chat de orçamento (OrcamentoChat escuta este evento)
export const openOrcamentoChat = () => window.dispatchEvent(new CustomEvent('open-orcamento-chat'));

// ---------- Hero ----------
export const hero = {
  tagline: 'O seu estúdio automotivo. Belo Horizonte, desde 1994.',
  cta: 'Fazer meu orçamento',
};

// ---------- Painel de abertura (dispensável, 1x por sessão) ----------
export const promo = {
  image: img('photo-1583121274602-3e2820c69888', 720),
  title: 'Cansado do carro que todo mundo tem?',
  subtitle: 'Bora resolver. Orçamento sem compromisso.',
  cta: 'Pedir orçamento na hora',
};

// ---------- A Fórmula do Som (3 cards) ----------
export const casa = [
  { title: 'Nossos serviços', href: '#servicos', image: img('photo-1552519507-da3b142c6e3d', 900), alt: 'Faróis de LED acesos à noite' },
  { title: 'Como trabalhamos', href: '#processo', image: img('photo-1449965408869-eaa3f722e40d', 900), alt: 'Interior de carro com central multimídia' },
  { title: '3 unidades em BH', href: '#unidades', image: img('photo-1494905998402-395d579af36f', 900), alt: 'Carro estacionado na cidade' },
];

// ---------- Sob Medida (planos, sem preço fixo — decisão do cliente) ----------
export const planos = [
  { name: 'Essencial', desc: 'O primeiro upgrade, com custo enxuto.', items: ['Insulfilm / película', 'Alarme e acessórios', 'Iluminação LED básica'] },
  { name: 'Completo', desc: 'O combo mais pedido da casa.', items: ['Película + Super LED', 'Multimídia CarPlay / Android', 'Kit Neon RGB'] },
  { name: 'Premium', desc: 'Projeto pensado só pro seu carro.', items: ['Revestimento e som premium', 'Plotter / envelopamento', 'Projeto personalizado completo'] },
];

// ---------- Reconhecimento (2 cards) ----------
export const reconhecimento = [
  { title: 'Google · 4,4 ★', subtitle: '+1.400 avaliações somando as 3 unidades', href: GOOGLE_SEARCH, image: img('photo-1553440569-bcc63803a83d', 1200), alt: 'Carro polido sob luz de estúdio' },
  { title: 'Instagram · @a_formuladosom', subtitle: '226 mil pessoas acompanhando cada projeto', href: INSTAGRAM, image: img('photo-1517524008697-84bbe3c3fd98', 1200), alt: 'Carro personalizado à noite' },
];

// ---------- Serviços (blocos de largura total) ----------
export const servicos = [
  { slug: 'peliculas', name: 'Películas', phrase: 'Menos calor. Mais privacidade.', desc: 'Películas térmicas e de proteção com bloqueio UV, aplicação sem bolhas e garantia.', pattern: 'dots', image: img('photo-1555215695-3004980ad54e') },
  { slug: 'iluminacao', name: 'Iluminação & Super LED', phrase: 'A noite vira o seu palco', desc: 'Faróis Super LED, iluminação interna e detalhes externos com instalação limpa.', pattern: 'lines', image: img('photo-1552519507-da3b142c6e3d') },
  { slug: 'neon', name: 'Kit Neon RGB', phrase: 'Cor sob o seu comando', desc: 'Iluminação ambiente RGB com controle de cores e efeitos — o brilho que vira assunto.', pattern: 'dots', image: img('photo-1583121274602-3e2820c69888') },
  { slug: 'multimidia', name: 'Multimídia & Som', phrase: 'Tecnologia com acabamento de fábrica', desc: 'Centrais Android / CarPlay e projetos de som com chicotes originais, sem cortar fios.', pattern: 'lines', image: img('photo-1449965408869-eaa3f722e40d') },
  { slug: 'revestimento', name: 'Revestimento', phrase: 'Costura sob medida', desc: 'Bancos, volante e acabamentos internos em material de alta qualidade.', pattern: 'dots', image: img('photo-1493238792000-8113da705763') },
  { slug: 'plotter', name: 'Plotter & Envelopamento', phrase: 'Do detalhe ao carro inteiro', desc: 'Adesivagem, faixas e envelopamento com recorte de plotter de precisão.', pattern: 'lines', image: img('photo-1568605117036-5fe5e7bab0b7') },
  { slug: 'alarmes', name: 'Alarmes & Acessórios', phrase: 'Segurança desde 1994', desc: 'Alarmes, travas, sensores e acessórios de conforto instalados por quem é referência em BH.', pattern: 'dots', image: img('photo-1550355291-bbee04a92027') },
];

// ---------- Como funciona ----------
export const processo = [
  { num: '01', title: 'Fale com a gente', desc: 'Conte no WhatsApp qual é o carro e o que você quer fazer.' },
  { num: '02', title: 'Orçamento sob medida', desc: 'Avaliamos o veículo e enviamos o projeto com prazo e valor transparentes.' },
  { num: '03', title: 'Mãos à obra', desc: 'Equipe própria, material premium e acabamento de fábrica.' },
  { num: '04', title: 'Entrega impecável', desc: 'O carro volta pronto, testado e com aquele acabamento de dar orgulho.' },
];

// 1º item é avaliação REAL do Google; os demais são ilustrativos.
export const depoimentos = [
  { text: 'Parabéns a todos da equipe da A Fórmula do Som! Serviço de primeira, do começo ao fim.', name: 'Cliente Google', origin: 'Avaliação real · Google' },
  { text: 'Fizeram a película e a iluminação no meu carro e ficou surreal. Acabamento perfeito, sem uma bolha.', name: 'Rafael M.', origin: 'Unidade Buritis' },
  { text: 'Instalaram a multimídia sem cortar nenhum fio. Ficou parecendo de fábrica.', name: 'Diego A.', origin: 'Unidade Lourdes' },
];

// Dados reais (Google Meu Negócio): nota, avaliações e telefone por unidade.
export const unidades = [
  { name: 'Glória', address: 'Av. Brigadeiro Eduardo Gomes, 2066 — Glória, Belo Horizonte/MG', phone: '(31) 3474-3176', rating: '4,4', reviews: '1,2 mil', map: 'https://www.google.com/maps/search/?api=1&query=A+Formula+do+Som+Av.+Brigadeiro+Eduardo+Gomes+2066+Belo+Horizonte' },
  { name: 'Buritis', address: 'Av. Aggeo Pio Sobrinho, 81 — Buritis, Belo Horizonte/MG', phone: '(31) 3565-8825', rating: '4,4', reviews: '135', map: 'https://www.google.com/maps/search/?api=1&query=A+Formula+do+Som+Av.+Aggeo+Pio+Sobrinho+81+Belo+Horizonte' },
  { name: 'Lourdes', address: 'Av. Bias Fortes, 945 — Lourdes, Belo Horizonte/MG', phone: '(31) 3166-4917', rating: '4,4', reviews: '92', map: 'https://www.google.com/maps/search/?api=1&query=A+Formula+do+Som+Av.+Bias+Fortes+945+Belo+Horizonte' },
];

// ---------- Feed (Fórmula Live) — MOCK até integrar o Instagram ----------
export const posts = [
  { image: img('photo-1552519507-da3b142c6e3d', 700), tag: 'Super LED', alt: 'Faróis em LED', reel: true },
  { image: img('photo-1494905998402-395d579af36f', 700), tag: 'Película', alt: 'Carro com película aplicada' },
  { image: img('photo-1553440569-bcc63803a83d', 700), tag: 'Detailing', alt: 'Detalhamento do carro' },
  { image: img('photo-1449965408869-eaa3f722e40d', 700), tag: 'Multimídia', alt: 'Interior com multimídia', reel: true },
  { image: img('photo-1583121274602-3e2820c69888', 700), tag: 'Neon RGB', alt: 'Iluminação neon RGB' },
  { image: img('photo-1517524008697-84bbe3c3fd98', 700), tag: 'Estética', alt: 'Carro personalizado' },
];

export const faqs = [
  { q: 'Quanto tempo demora um serviço?', a: 'Depende do projeto: serviços simples ficam prontos no mesmo dia; projetos completos de película, iluminação ou multimídia levam de 2 a 5 dias úteis. O prazo exato vem no orçamento.' },
  { q: 'O serviço perde a garantia do veículo?', a: 'Não. Trabalhamos com chicotes originais e conexões plug-and-play, sem cortar fios de fábrica — sua garantia permanece intacta.' },
  { q: 'Vocês atendem qualquer modelo de carro?', a: 'Sim. Cada projeto é pensado sob medida para o seu veículo, do encaixe das películas ao acabamento da iluminação e do revestimento.' },
  { q: 'Quanto custa? Vocês têm tabela de preços?', a: 'Cada serviço é sob orçamento, porque o valor muda conforme o modelo do carro, o material e o tamanho do projeto. Você recebe um orçamento transparente e sem compromisso antes de fechar — e combina pagamento e parcelamento com a equipe.' },
  { q: 'Como faço um orçamento?', a: 'Use o “Orçamento na hora” aqui no site ou chame no WhatsApp (31) 98316-7480 contando qual é o carro e o que você quer fazer.' },
];

export const assinatura = 'Ninguém percebe onde termina o carro e começa o nosso trabalho.';

// ---------- Navegação: menu em tela cheia e rodapé usam os mesmos grupos ----------
export const navGroups = [
  {
    title: 'Serviços',
    image: img('photo-1552519507-da3b142c6e3d', 1200),
    links: servicos.map((s) => ({ label: s.name, href: `#servico-${s.slug}` })),
  },
  {
    title: 'A Fórmula',
    image: img('photo-1449965408869-eaa3f722e40d', 1200),
    links: [
      { label: 'Quem somos', href: '#casa' },
      { label: 'Projeto Sob Medida', href: '#sob-medida' },
      { label: 'Como funciona', href: '#processo' },
      { label: 'Depoimentos', href: '#depoimentos' },
      { label: 'Fórmula Live', href: '#live' },
    ],
  },
  {
    title: 'Unidades',
    image: img('photo-1494905998402-395d579af36f', 1200),
    links: unidades.map((u) => ({ label: u.name, href: u.map, external: true })),
  },
  {
    title: 'Atendimento',
    image: img('photo-1583121274602-3e2820c69888', 1200),
    links: [
      { label: 'Orçamento na hora', action: 'chat' },
      { label: 'WhatsApp (31) 98316-7480', href: waLink(), external: true },
      { label: 'Telefone (31) 3474-4498', href: 'tel:+553134744498' },
      { label: 'aformuladosom01@hotmail.com', href: 'mailto:aformuladosom01@hotmail.com' },
      { label: 'Perguntas frequentes', href: '#faq' },
    ],
  },
];
