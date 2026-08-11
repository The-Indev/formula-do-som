// Botão da marca. Renderiza <a> quando há href, senão <button>.
export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  href,
  children,
  className = '',
  external = true,
  ...rest
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener' } : {}
    return (
      <a href={href} className={cls} {...linkProps} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
