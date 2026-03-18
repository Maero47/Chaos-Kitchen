import Link from 'next/link'
import { RECIPES, Recipe } from '@/lib/recipes'

const categoryConfig: Record<string, { label: string; emoji: string; badge: string; description: string }> = {
  savory:    { label: 'Savory',    emoji: '🔥', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', description: 'Dinner? Destroyed.' },
  breakfast: { label: 'Breakfast', emoji: '🌅', badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', description: 'Start the day wrong.' },
  dessert:   { label: 'Dessert',   emoji: '💀', badge: 'bg-pink-500/20 text-pink-400 border-pink-500/30',   description: 'Sweet dreams. Cursed.' },
  drink:     { label: 'Drinks',    emoji: '💧', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',   description: 'Thirst? Unquenched.' },
}

const CATEGORY_ORDER = ['savory', 'breakfast', 'dessert', 'drink'] as const

function groupByCategory(recipes: Recipe[]) {
  const groups: Record<string, Recipe[]> = {}
  for (const recipe of recipes) {
    if (!groups[recipe.category]) groups[recipe.category] = []
    groups[recipe.category].push(recipe)
  }
  return groups
}

export default function Home() {
  const groups = groupByCategory(RECIPES)

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

        {/* Stats bar */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-600">
          <span>🍽️ {RECIPES.length} recipes</span>
          <span>·</span>
          <span>💀 ∞ ways to ruin them</span>
          <span>·</span>
          <span>🔊 AI narrated chaos</span>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-4xl mx-auto space-y-12">
        {CATEGORY_ORDER.map(cat => {
          const recipes = groups[cat]
          if (!recipes?.length) return null
          const config = categoryConfig[cat]

          return (
            <div key={cat}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{config.emoji}</span>
                <div>
                  <h2 className="text-white font-bold text-lg uppercase tracking-widest">
                    {config.label}
                  </h2>
                  <p className="text-gray-600 text-xs">{config.description}</p>
                </div>
                <div className="flex-1 h-px bg-gray-800 ml-2" />
                <span className={`text-xs px-2 py-0.5 rounded-full border ${config.badge}`}>
                  {recipes.length} recipes
                </span>
              </div>

              {/* Recipe cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recipes.map(recipe => (
                  <Link
                    key={recipe.id}
                    href={`/kitchen/${recipe.id}`}
                    className="recipe-card rounded-2xl p-5 text-center cursor-pointer group"
                  >
                    <div className="text-5xl mb-3 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-200">
                      {recipe.emoji}
                    </div>
                    <div className="font-bold text-white text-sm mb-1 leading-tight">{recipe.name}</div>
                    <div className="text-xs text-gray-600 mt-1 leading-snug">{recipe.description}</div>
                    <div className="mt-3 text-xs text-gray-700">
                      {recipe.ingredients.length} ingredients to ruin
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer vibes */}
      <div className="text-center mt-20 text-gray-700 text-xs space-y-1">
        <p>⚠️ No real kitchens were harmed. Probably.</p>
        <p>six seven 🤌 · this page is giving main character syndrome</p>
      </div>
    </div>
  )
}
