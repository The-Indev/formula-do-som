import { useEffect, useState } from 'react'

// Tela preta com o logo até a foto do hero estar pronta (máx. 1,2s)
export default function Loader() {
  const [phase, setPhase] = useState('on') // on -> out -> done

  useEffect(() => {
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      setPhase('out')
      setTimeout(() => setPhase('done'), 600)
    }
    const img = new Image()
    img.onload = finish
    img.onerror = finish
    img.src = '/assets/wpp.jpg'
    const t = setTimeout(finish, 1200)
    return () => clearTimeout(t)
  }, [])

  if (phase === 'done') return null
  return (
    <div className={`loader ${phase === 'out' ? 'is-out' : ''}`} aria-hidden="true">
      <img src="/assets/logo.jpg" alt="" width="72" height="72" />
    </div>
  )
}
