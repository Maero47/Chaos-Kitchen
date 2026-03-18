'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RECIPES } from '@/lib/recipes'
import { IngredientPill } from '@/components/IngredientPill'

export default function KitchenPage({ params }: { params: { id: string } }) {
  const recipe = RECIPES.find(r => r.id === params.id)!
  const router = useRouter()
  const [swaps, setSwaps] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleSwap = (original: string, replacement: string | null) => {
    setSwaps(prev => {
      const next = { ...prev }
      if (replacement === null) delete next[original]
      else next[original] = replacement
      return next
    })
  }

  const handleCook = async () => {
    if (Object.keys(swaps).length === 0) return
    setLoading(true)

    const swapList = Object.entries(swaps).map(([original, replacement]) => ({
      original,
      replacement,
    }))

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
      swaps,
      narration,
      chaosScore,
      audioUrl,
    }))
    router.push('/chaos')
  }

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-2">{recipe.emoji} {recipe.name}</h1>
      <p className="text-center text-gray-500 mb-8">Click ingredients to swap them for something cursed 👇</p>

      <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto mb-12">
        {recipe.ingredients.map(ing => (
          <IngredientPill
            key={ing.id}
            name={ing.name}
            emoji={ing.emoji}
            onSwap={handleSwap}
          />
        ))}
      </div>

      {Object.keys(swaps).length > 0 && (
        <div className="text-center mb-6 text-sm text-gray-600">
          {Object.keys(swaps).length} substitution(s) made. This is going to be bad.
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleCook}
          disabled={Object.keys(swaps).length === 0 || loading}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white text-2xl font-bold px-12 py-4 rounded-2xl shadow-lg transition-all active:scale-95"
        >
          {loading ? '💥 Cooking...' : '🔥 COOK IT!'}
        </button>
      </div>
    </div>
  )
}
