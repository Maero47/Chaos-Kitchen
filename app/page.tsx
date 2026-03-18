import Link from 'next/link'
import { RECIPES } from '@/lib/recipes'

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="text-center mb-12">
        <div className="text-7xl mb-4">🍳</div>
        <h1 className="text-5xl font-black mb-2">Chaos Kitchen</h1>
        <p className="text-gray-500 text-lg">Swap ingredients. Ruin dinner. Hear Gordon scream.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {RECIPES.map(recipe => (
          <Link
            key={recipe.id}
            href={`/kitchen/${recipe.id}`}
            className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="text-5xl mb-2">{recipe.emoji}</div>
            <div className="font-bold">{recipe.name}</div>
            <div className="text-xs text-gray-400 mt-1 capitalize">{recipe.category}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
