import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

// Estatística com contagem animada quando entra na viewport.
export default function Stat({ value, label, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const display = useCountUp(value, inView)
  return (
    <div
      ref={ref}
      className={`stat reveal ${inView ? 'is-visible' : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <span className="stat__value">{display}</span>
      <span className="stat__label">{label}</span>
    </div>
  )
}
