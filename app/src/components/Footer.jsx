import { waLink } from '../data/content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer__cols">
        <div className="footer__col">
          <div className="brand">
            <img className="brand__logo" style={{ width: 38, height: 38 }} src="/assets/logo.jpg" alt="Fórmula do Som" />
            <span className="brand__name" style={{ fontSize: 17 }}>
              Fórmula do Som
            </span>
          </div>
          <p className="footer__brandtext">
            O seu estúdio automotivo em Belo Horizonte desde 1994.
          </p>
        </div>

        <div className="footer__col">
          <span className="footer__coltitle">Contato</span>
          <a href={waLink()} target="_blank" rel="noopener">
            WhatsApp: (31) 98316-7480
          </a>
          <span>Telefone: (31) 3474-4498</span>
          <a href="mailto:aformuladosom01@hotmail.com">aformuladosom01@hotmail.com</a>
          <span>Seg–Sáb · 9h às 18h</span>
        </div>

        <div className="footer__col">
          <span className="footer__coltitle">Redes</span>
          <a href="https://www.instagram.com/a_formuladosom" target="_blank" rel="noopener">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@a_formuladosom" target="_blank" rel="noopener">
            TikTok
          </a>
          <a href="https://www.youtube.com/@aformuladosom" target="_blank" rel="noopener">
            YouTube
          </a>
          <a href="https://linktr.ee/aformuladosom01" target="_blank" rel="noopener">
            Linktree
          </a>
        </div>
      </div>
      <p className="footer__legal">
        © 2026 Fórmula do Som. O seu estúdio automotivo desde 1994. Todos os direitos reservados.
      </p>
    </footer>
  )
}
