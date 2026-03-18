'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

function getTier(score: number) {
  if (score >= 85) return { label: '🔥 ILLEGAL IN 12 COUNTRIES', color: 'text-red-500', bg: 'tier-legendary' }
  if (score >= 70) return { label: '💀 ABSOLUTE DISASTER', color: 'text-orange-400', bg: 'tier-disaster' }
  if (score >= 50) return { label: '😱 HIGHLY CURSED', color: 'text-yellow-400', bg: 'tier-chaotic' }
  return { label: '😐 MILD CHAOS', color: 'text-green-400', bg: 'tier-mild' }
}

export default function ChaosPage() {
  const router = useRouter()
  const [result, setResult] = useState<any>(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('chaosResult')
    if (!raw) { router.push('/'); return }
    const data = JSON.parse(raw)
    setResult(data)

    // Animate score
    setTimeout(() => {
      let current = 0
      const target = data.chaosScore
      const step = Math.ceil(target / 40)
      const interval = setInterval(() => {
        current = Math.min(current + step, target)
        setScoreDisplay(current)
        if (current >= target) clearInterval(interval)
      }, 30)
    }, 600)

    setTimeout(() => setShowContent(true), 400)

    // Play audio after short delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = data.audioUrl
        audioRef.current.play().catch(() => {})
      }
    }, 800)
  }, [])

  if (!result) return (
    <div className="result-bg min-h-screen flex items-center justify-center">
      <div className="text-6xl chaos-wobble">💥</div>
    </div>
  )

  const cleanNarration = result.narration.replace(/\[.*?\]/g, '').trim()
  const tier = getTier(result.chaosScore)

  const scoreColor =
    result.chaosScore >= 85 ? 'text-red-500' :
    result.chaosScore >= 70 ? 'text-orange-400' :
    result.chaosScore >= 50 ? 'text-yellow-400' : 'text-green-400'

  return (
    <div className="result-bg min-h-screen flex flex-col items-center justify-center p-6 text-center">

      {/* Explosion header */}
      <div className="text-8xl mb-2 chaos-wobble">💥</div>
      <h1 className="font-bangers text-5xl md:text-7xl text-white mb-1 tracking-wider flame-text">
        KITCHEN DESTROYED
      </h1>
      <p className="text-gray-500 mb-10 text-lg">
        {result.recipeEmoji} {result.recipeName} — Chaos Edition
      </p>

      {/* Score */}
      <div className={`font-bangers text-9xl md:text-[160px] leading-none score-pop ${scoreColor}`}>
        {scoreDisplay}
      </div>
      <div className="text-gray-500 text-sm uppercase tracking-[0.3em] mb-3">Chaos Score</div>

      {/* Tier badge */}
      <div className={`${tier.bg} px-6 py-2 rounded-full text-white font-bangers text-xl tracking-wider mb-10`}>
        {tier.label}
      </div>

      {/* Swaps used */}
      {showContent && (
        <div className="max-w-lg w-full mb-6 rounded-2xl p-4 border border-white/10 text-left"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">What you did 😈</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(result.swaps).map(([orig, swap]) => (
              <div key={orig} className="text-xs bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 text-gray-400">
                <span className="line-through text-gray-600">{orig}</span>
                <span className="text-red-400 mx-1">→</span>
                <span className="text-red-300">{swap as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Narration */}
      {showContent && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-xl w-full text-left mb-6">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">🎙️ The Verdict</p>
          <p className="text-gray-200 italic leading-relaxed text-base">
            "{cleanNarration}"
          </p>
        </div>
      )}

      {/* Audio player */}
      <div className="mb-8 w-full max-w-xl">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">🔊 Hear the chaos</p>
        <audio
          ref={audioRef}
          controls
          className="w-full rounded-xl"
          style={{ filter: 'invert(1) hue-rotate(180deg)' }}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => router.back()}
          className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          ↩ Try Again
        </button>
        <button
          onClick={() => router.push('/')}
          className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          🍳 New Recipe
        </button>
        <button
          onClick={() => {
            const text = `I got a CHAOS SCORE of ${result.chaosScore} on Chaos Kitchen! 💥🍳\n"${cleanNarration.slice(0, 100)}..."`
            navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard! Share the chaos 🔥'))
          }}
          className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-semibold transition-all text-gray-400 hover:text-white"
        >
          📋 Copy & Share
        </button>
      </div>

      {/* Easter egg */}
      <p className="mt-12 text-gray-800 text-xs">
        nothing beats a jet2 holiday
      </p>
    </div>
  )
}
