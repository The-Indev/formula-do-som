import { GoogleIcon } from './icons'
import { GOOGLE_RATING, GOOGLE_SEARCH } from '../data/content'

// Selo com a nota real do Google (4,4 · +1.400 avaliações).
export default function GoogleBadge({ solid = false, meta }) {
  return (
    <a
      href={GOOGLE_SEARCH}
      target="_blank"
      rel="noopener"
      className={`google-badge ${solid ? 'google-badge--solid' : ''}`.trim()}
    >
      <GoogleIcon size={solid ? 20 : 18} />
      <span className="google-badge__score">{GOOGLE_RATING.score}</span>
      <span className="google-badge__stars">★★★★★</span>
      <span className="google-badge__meta">
        {meta || `${GOOGLE_RATING.total} avaliações`}
      </span>
    </a>
  )
}
