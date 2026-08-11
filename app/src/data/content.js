// ============================================================
// Conteúdo da landing — A Fórmula do Som
// Dados reais: telefones/unidades (Google Meu Negócio), nota 4,4★.
// Imagens de serviços/portfólio ainda são mock (Unsplash) — trocar pelas oficiais.
// ============================================================

export const PHONE_WHATSAPP = '5531983167480';
export const waLink = (msg = 'Olá! Quero fazer um orçamento com a Fórmula do Som.') =>
  `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(msg)}`;

export const INSTAGRAM = 'https://www.instagram.com/a_formuladosom';
export const GOOGLE_SEARCH = 'https://www.google.com/search?q=a+formula+do+som+belo+horizonte';

export const GOOGLE_RATING = { score: '4,4', total: '+1.400' };

export const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#valores', label: 'Valores' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#unidades', label: 'Unidades' },
];

export const stats = [
  { value: '4,4★', label: '+1.400 avaliações no Google' },
  { value: '30+', label: 'Anos de experiência' },
  { value: '226k+', label: 'Seguidores no Instagram' },
  { value: '3', label: 'Unidades em BH' },
];

export const marquee = [
  'Películas', 'Insulfilm', 'Iluminação', 'Super LED', 'Kit Neon RGB',
  'Multimídia', 'Som Automotivo', 'Revestimento', 'Plotter', 'Envelopamento',
  'Pole Position', 'Alarmes & Acessórios', 'Detailing', 'Estética Premium',
];

export const services = [
  { icon: '🌫️', title: 'Películas & Insulfilm', desc: 'Películas térmicas e de proteção premium: menos calor, mais privacidade e bloqueio UV, com instalação sem bolhas e garantia.', image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80' },
  { icon: '💡', title: 'Iluminação LED & Super LED', desc: 'Faróis Super LED, iluminação interna e detalhes externos que transformam o visual do carro de dia e de noite.', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80' },
  { icon: '🌈', title: 'Kit Neon RGB', desc: 'Iluminação ambiente RGB no interior, com controle de cores e efeitos — o brilho que faz seu carro virar assunto.', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80' },
  { icon: '📱', title: 'Multimídia & Som', desc: 'Centrais Android/CarPlay, câmeras de ré e projetos de som automotivo — tecnologia integrada ao painel do seu jeito.', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80' },
  { icon: '🪡', title: 'Revestimento', desc: 'Bancos, volante e acabamentos internos revestidos com material de alta qualidade e costura sob medida.', image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80' },
  { icon: '🎨', title: 'Plotter & Envelopamento', desc: 'Adesivagem, faixas e envelopamento com recorte de plotter — personalização precisa do detalhe ao carro inteiro.', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=80' },
  { icon: '🔒', title: 'Alarmes & Acessórios', desc: 'Alarmes, travas, sensores e acessórios de segurança e conforto instalados por quem é referência em BH desde 1994.', image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80' },
];

export const showcases = [
  {
    badge: 'Películas',
    title: 'Proteção que se sente no conforto e se vê no brilho',
    desc: 'Películas térmicas e de proteção que reduzem o calor, garantem privacidade e blindam a pintura e os vidros — com acabamento impecável.',
    bullets: ['Bloqueio de calor e raios UV', 'Aplicação sem bolhas', 'Garantia no serviço'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    cta: 'Quero orçar película',
    reverse: false,
  },
  {
    badge: 'Iluminação',
    title: 'Iluminação que faz o seu carro virar assunto',
    desc: 'Super LED, teto de estrelas, kit neon RGB e detalhes externos instalados com acabamento limpo — impacto visual do estacionamento à estrada.',
    bullets: ['Faróis Super LED', 'Ambiente RGB com controle', 'Instalação limpa, sem gambiarra'],
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
    cta: 'Ver opções de LED',
    reverse: true,
  },
  {
    badge: 'Multimídia',
    title: 'Tecnologia integrada ao painel, do jeito certo',
    desc: 'Centrais inteligentes, som automotivo e conectividade instalados com chicotes originais — sem cortar fios, sem perder garantia.',
    bullets: ['Android / Apple CarPlay', 'Chicotes originais, plug-and-play', 'Acabamento de fábrica'],
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    cta: 'Montar minha central',
    reverse: false,
  },
];

export const diferenciais = [
  { icon: '⭐', title: '30 anos de estrada', desc: 'Desde 1994 transformando carros em BH — experiência que você vê no acabamento.' },
  { icon: '⚡', title: 'Instalação segura', desc: 'Chicotes originais, sem cortar fios — sua garantia de fábrica permanece intacta.' },
  { icon: '🛠️', title: 'Acabamento VIP', desc: 'Integração perfeita ao design original do carro, sem rasuras nem improviso.' },
  { icon: '📍', title: '3 unidades em BH', desc: 'Glória, Buritis e Lourdes, com equipe pronta pra atender do orçamento à entrega.' },
];

export const projects = [
  { image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', tag: 'Super LED', alt: 'Faróis em LED' },
  { image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=800&q=80', tag: 'Película', alt: 'Carro com película aplicada' },
  { image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80', tag: 'Detailing', alt: 'Detalhamento do carro' },
  { image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80', tag: 'Multimídia', alt: 'Interior com multimídia' },
  { image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80', tag: 'Neon RGB', alt: 'Iluminação neon RGB' },
  { image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80', tag: 'Estética', alt: 'Carro personalizado' },
];

export const planos = [
  { badge: 'Essencial', title: 'Comece pelo básico', desc: 'Ideal pra quem quer dar o primeiro upgrade no carro com custo enxuto.', items: ['Insulfilm / película', 'Alarme e acessórios', 'Iluminação LED básica'], cta: 'Orçar o Essencial', highlight: false },
  { badge: 'Completo', title: 'O mais pedido', desc: 'O combo que transforma o visual e a experiência a bordo de vez.', items: ['Película + Super LED', 'Multimídia com CarPlay/Android', 'Kit Neon RGB'], cta: 'Orçar o Completo', highlight: true },
  { badge: 'Premium', title: 'Projeto sob medida', desc: 'Do zero ao acabamento de concessionária, pensado só pro seu carro.', items: ['Revestimento e som premium', 'Plotter / envelopamento', 'Projeto personalizado completo'], cta: 'Montar meu projeto', highlight: false },
];

export const processo = [
  { num: '01', title: 'Fale com a gente', desc: 'Manda uma mensagem no WhatsApp contando o carro e o que você quer fazer.' },
  { num: '02', title: 'Orçamento sob medida', desc: 'Avaliamos seu veículo e enviamos um projeto com prazo e valor transparentes.' },
  { num: '03', title: 'Mãos à obra', desc: 'Nossa equipe executa com material premium e acabamento de fábrica.' },
  { num: '04', title: 'Entrega impecável', desc: 'Você recebe o carro pronto, testado e com aquele acabamento de dar orgulho.' },
];

// 1º item é avaliação REAL do Google; os demais são ilustrativos.
export const depoimentos = [
  { text: 'Parabéns a todos da equipe da A Fórmula do Som! Serviço de primeira, do começo ao fim.', name: 'Cliente Google', car: 'Avaliação real · Google', initial: 'G' },
  { text: 'Fizeram a película e a iluminação no meu carro e ficou surreal. Acabamento perfeito, sem uma bolha. Recomendo demais!', name: 'Rafael M.', car: 'Cliente unidade Buritis', initial: 'R' },
  { text: 'Instalaram a multimídia sem cortar nenhum fio. Ficou parecendo de fábrica. Melhor da cidade!', name: 'Diego A.', car: 'Cliente unidade Lourdes', initial: 'D' },
];

// Dados reais (Google Meu Negócio): nota, avaliações e telefone por unidade.
export const unidades = [
  { name: 'Unidade Glória', address: 'Av. Brigadeiro Eduardo Gomes, 2066 — Glória, Belo Horizonte/MG', phone: '(31) 3474-3176', rating: '4,4', reviews: '1,2 mil', map: 'https://www.google.com/maps/search/?api=1&query=A+Formula+do+Som+Av.+Brigadeiro+Eduardo+Gomes+2066+Belo+Horizonte' },
  { name: 'Unidade Buritis', address: 'Av. Aggeo Pio Sobrinho, 81 — Buritis, Belo Horizonte/MG', phone: '(31) 3565-8825', rating: '4,4', reviews: '135', map: 'https://www.google.com/maps/search/?api=1&query=A+Formula+do+Som+Av.+Aggeo+Pio+Sobrinho+81+Belo+Horizonte' },
  { name: 'Unidade Lourdes', address: 'Av. Bias Fortes, 945 — Lourdes, Belo Horizonte/MG', phone: '(31) 3166-4917', rating: '4,4', reviews: '92', map: 'https://www.google.com/maps/search/?api=1&query=A+Formula+do+Som+Av.+Bias+Fortes+945+Belo+Horizonte' },
];

export const faqs = [
  { q: 'Quanto tempo demora um serviço?', a: 'Depende do projeto: serviços simples ficam prontos no mesmo dia, projetos completos de película, iluminação ou multimídia podem levar de 2 a 5 dias úteis. Você recebe o prazo exato no orçamento.' },
  { q: 'O serviço perde a garantia do veículo?', a: 'Não. Trabalhamos com chicotes originais e conexões plug-and-play, sem cortar fios de fábrica — sua garantia permanece intacta.' },
  { q: 'Vocês atendem qualquer modelo de carro?', a: 'Sim! Cada projeto é pensado sob medida para o seu veículo, do encaixe das películas ao acabamento da iluminação e do revestimento.' },
  { q: 'Onde ficam as unidades?', a: 'Temos 3 unidades em Belo Horizonte: Glória (Av. Brigadeiro Eduardo Gomes, 2066), Buritis (Av. Aggeo Pio Sobrinho, 81) e Lourdes (Av. Bias Fortes, 945).' },
  { q: 'Quanto custa? Vocês têm tabela de preços?', a: 'Cada serviço é sob orçamento, porque o valor muda conforme o modelo do carro, o material escolhido e o tamanho do projeto. Você recebe um orçamento transparente e sem compromisso antes de fechar qualquer coisa — e combina forma de pagamento e parcelamento com a equipe.' },
  { q: 'Como faço um orçamento?', a: 'É só chamar no WhatsApp (31) 98316-7480 contando qual é o carro e o que você quer fazer. Respondemos com um orçamento sem compromisso.' },
];

export const finalCtaBg = 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1920&q=80';
