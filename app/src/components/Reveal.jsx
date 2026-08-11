import { useInView } from '../hooks/useInView'

// Envolve qualquer conteúdo com a animação de reveal ao entrar na viewport.
// `delay` (ms) permite escalonar itens de uma grade (efeito cascata).
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const [ref, inView] = useInView()
  const mergedStyle = delay ? { ...style, transitionDelay: `${delay}ms` } : style
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  )
}
