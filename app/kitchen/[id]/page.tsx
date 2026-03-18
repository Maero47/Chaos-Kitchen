'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RECIPES } from '@/lib/recipes'
import { IngredientPill } from '@/components/IngredientPill'

const chaosQuips = [
  "bro really thought they cooked 💀",
  "this is NOT passing the vibe check",
  "no cap this is criminal",
  "Italian nonna has left the chat",
  "Gordon Ramsay is crying somewhere",
  "six seven 🤌",
  "brain rot activated fr",
  "this dish said bye bye bye",
  "the algorithm fed you LIES",
  "Bombardiro Crocodilo wouldn't stand for this",
]

export default function KitchenPage({ params }: { params: { id: string } }) {
  const recipe = RECIPES.find(r => r.id === params.id)!
  const router = useRouter()
  const [swaps, setSwaps] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [quip, setQuip] = useState('')
  const [loadingText, setLoadingText] = useState('💥 Cooking...')

  const swapCount = Object.keys(swaps).length

  useEffect(() => {
    if (swapCount > 0) {
      setQuip(chaosQuips[Math.floor(Math.random() * chaosQuips.length)])
    }
  }, [swapCount])

  useEffect(() => {
    if (!loading) return
    const texts = [
      '🔥 Summoning chaos...',
      '💀 This is a mistake...',
      '😱 Oh no oh no oh no...',
      '🤖 Groq is traumatized...',
      '☠️ Almost done (maybe)...',
    ]
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % texts.length
      setLoadingText(texts[i])
    }, 1200)
    return () => clearInterval(interval)
  }, [loading])

  const handleSwap = (original: string, replacement: string | null) => {
    setSwaps(prev => {
      const next = { ...prev }
      if (replacement === null) delete next[original]
      else next[original] = replacement
      return next
    })
  }

  const handleCook = async () => {
    if (swapCount === 0) return
    setLoading(true)

    const swapList = Object.entries(swaps).map(([original, replacement]) => ({
      original,
      replacement,
    }))

    try {
      const narrateRes = await fetch('/api/narrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeName: recipe.name, swaps: swapList }),
      })
      const { narration, chaosScore } = await narrateRes.json()

      const speakRes = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: narration }),
      })
      const audioBlob = await speakRes.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      sessionStorage.setItem('chaosResult', JSON.stringify({
        recipeName: recipe.name,
        recipeEmoji: recipe.emoji,
        swaps,
        narration,
        chaosScore,
        audioUrl,
      }))
      router.push('/chaos')
    } catch (e) {
      setLoading(false)
    }
  }

  const chaosLevel =
    swapCount >= 6 ? { label: 'ABSOLUTE DISASTER', color: 'text-red-500' } :
    swapCount >= 4 ? { label: 'HIGHLY CURSED', color: 'text-orange-400' } :
    swapCount >= 2 ? { label: 'CHAOTIC', color: 'text-yellow-400' } :
    swapCount >= 1 ? { label: 'MILDLY UNHINGED', color: 'text-green-400' } :
    { label: 'TOO SAFE', color: 'text-gray-500' }

  return (
    <div className="chaos-bg min-h-screen p-6 md:p-10">
      {/* Back */}
      <button
        onClick={() => router.push('/')}
        className="text-gray-600 hover:text-gray-400 text-sm mb-8 flex items-center gap-2 transition-colors"
      >
        ← Back to recipes
      </button>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-7xl mb-3">{recipe.emoji}</div>
        <h1 className="font-bangers text-5xl md:text-6xl text-white mb-2 tracking-wide">
          {recipe.name}
        </h1>
        <p className="text-gray-500 text-base">
          Click ingredients to swap them for something <span className="text-red-400 font-semibold">cursed</span> 👇
        </p>
      </div>

      {/* Ingredients */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-4 text-center">Ingredients</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {recipe.ingredients.map(ing => (
              <IngredientPill
                key={ing.id}
                name={ing.name}
                emoji={ing.emoji}
                onSwap={handleSwap}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chaos meter */}
      <div className="max-w-2xl mx-auto mb-8 text-center">
        {swapCount > 0 ? (
          <>
            <div className={`font-bangers text-3xl ${chaosLevel.color} mb-1`}>
              {chaosLevel.label}
            </div>
            <div className="text-gray-500 text-sm mb-2">
              {swapCount} ingredient{swapCount > 1 ? 's' : ''} swapped
            </div>
            <p className="text-gray-600 text-xs italic">"{quip}"</p>

            {/* Progress bar */}
            <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((swapCount / recipe.ingredients.length) * 100, 100)}%`,
                  background: swapCount >= 6
                    ? 'linear-gradient(90deg, #ef4444, #ff0000)'
                    : swapCount >= 4
                    ? 'linear-gradient(90deg, #f97316, #ef4444)'
                    : swapCount >= 2
                    ? 'linear-gradient(90deg, #eab308, #f97316)'
                    : 'linear-gradient(90deg, #84cc16, #eab308)'
                }}
              />
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-sm italic">
            No swaps yet. This is too safe. Be chaotic.
          </p>
        )}
      </div>

      {/* Cook button */}
      <div className="text-center">
        <button
          onClick={handleCook}
          disabled={swapCount === 0 || loading}
          className="cook-btn bg-red-600 hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bangers text-4xl px-16 py-5 rounded-2xl transition-all active:scale-95 tracking-wider"
        >
          {loading ? loadingText : '🔥 COOK IT!'}
        </button>
        {swapCount === 0 && (
          <p className="text-gray-700 text-xs mt-3">Swap at least 1 ingredient first</p>
        )}
      </div>

      {/* Random chaos button */}
      {!loading && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              const newSwaps: Record<string, string> = {}
              recipe.ingredients.forEach(ing => {
                const { getSwapOptions } = require('@/lib/swaps')
                const opts = getSwapOptions(ing.name)
                if (Math.random() > 0.3) {
                  newSwaps[ing.name] = opts[Math.floor(Math.random() * opts.length)]
                }
              })
              setSwaps(newSwaps)
              // force re-render pills by key trick won't work here, but state updates
            }}
            className="text-gray-600 hover:text-orange-400 text-sm transition-colors border border-white/5 rounded-xl px-4 py-2 hover:border-orange-500/30"
          >
            🎲 Random Chaos
          </button>
        </div>
      )}
    </div>
  )
}
