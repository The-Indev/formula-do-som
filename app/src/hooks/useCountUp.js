import { useEffect, useRef, useState } from 'react'

// Anima a parte numérica de um valor tipo "226k+", "4,4★", "30+", "3".
// Preserva prefixo/sufixo e casas decimais (com vírgula pt-BR).
function parse(target) {
  const m = String(target).match(/^(\D*)([\d.,]+)(.*)$/)
  if (!m) return { prefix: '', end: 0, decimals: 0, suffix: String(target) }
  const [, prefix, rawNum, suffix] = m
  const norm = rawNum.replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')
  const sepMatch = rawNum.match(/[.,](\d+)$/)
  const decimals = sepMatch ? sepMatch[1].length : 0
  return { prefix, end: parseFloat(norm) || 0, decimals, suffix }
}

function format(value, { prefix, decimals, suffix }) {
  const fixed = value.toFixed(decimals).replace('.', ',')
  return `${prefix}${fixed}${suffix}`
}

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

export function useCountUp(target, start, duration = 1500) {
  const parsed = useRef(parse(target)).current
  const [display, setDisplay] = useState(() => format(0, parsed))
  const rafRef = useRef(0)

  useEffect(() => {
    if (!start) return
    let t0
    const tick = (now) => {
      if (t0 === undefined) t0 = now
      const p = Math.min(1, (now - t0) / duration)
      setDisplay(format(parsed.end * easeOut(p), parsed))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [start, duration, parsed])

  return display
}
