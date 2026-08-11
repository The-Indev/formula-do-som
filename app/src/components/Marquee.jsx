import { marquee } from '../data/content'

export default function Marquee() {
  const items = [...marquee, ...marquee] // duplicado para loop contínuo
  return (
    <div className="marquee">
      <div className="marquee__track">
        {items.map((m, i) => (
          <span className="marquee__item" key={`${m}-${i}`}>
            {m}
            <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
