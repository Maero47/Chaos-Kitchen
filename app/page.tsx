import Link from 'next/link'
import { RECIPES } from '@/lib/recipes'

const categoryBadge: Record<string, string> = {
  dessert: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  savory: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  breakfast: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  drink: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export default function Home() {
  return (
    <div className="chaos-bg min-h-screen p-6 md:p-12">
      {/* Header */}
      <div className="text-center mb-16 pt-8">
        <div className="text-8xl mb-6 chaos-wobble inline-block">🍳</div>
        <h1 className="font-bangers text-7xl md:text-9xl mb-4 flame-text text-orange-500">
          CHAOS KITCHEN
        </h1>
        <p className="text-gray-400 text-xl md:text-2xl max-w-lg mx-auto leading-relaxed">
          Swap ingredients for cursed alternatives.<br />
          <span className="text-orange-400 font-semibold">Cook it. Destroy it. Hear it narrated.</span>
        </p>
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-600">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
          Powered by Groq AI + TTS
        </div>
      </div>

      {/* Recipe grid */}
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-gray-500 text-sm mb-6 uppercase tracking-widest">
          — Pick your victim —
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {RECIPES.map(recipe => (
            <Link
              key={recipe.id}
              href={`/kitchen/${recipe.id}`}
              className="recipe-card rounded-2xl p-6 text-center cursor-pointer group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {recipe.emoji}
              </div>
              <div className="font-bold text-white text-base mb-2">{recipe.name}</div>
              <div className={`text-xs px-2 py-0.5 rounded-full border inline-block ${categoryBadge[recipe.category]}`}>
                {recipe.category}
              </div>
              <div className="text-xs text-gray-600 mt-2">{recipe.description}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer vibes */}
      <div className="text-center mt-20 text-gray-700 text-xs">
        <p>⚠️ No real kitchens were harmed. Probably.</p>
        <p className="mt-1">six seven 🤌</p>
      </div>
    </div>
  )
}
