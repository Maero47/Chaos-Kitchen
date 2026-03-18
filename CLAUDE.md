# 🍳 Chaos Kitchen — CLAUDE.md

> Hackathon project. Theme: **Unintended Consequences**.
> You swap innocent recipe ingredients for cursed alternatives, hit Cook, and Groq narrates the catastrophic result — out loud, dramatically, in character.

---

## What We're Building

A single-page web game:

1. A **recipe appears** (Chocolate Cake, Spaghetti Bolognese, Pancakes…)
2. Player **swaps ingredients** for cursed alternatives (flour → sand, eggs → rocks)
3. Player hits **"COOK IT"**
4. Groq LLM **generates a funny, chaotic, meme-filled narration** by an unhinged food commentator
5. Groq TTS **reads it out loud** with emotion tags ([laughing], [surprised], [whispering])
6. Player gets a **Chaos Score** (1–100) and can share or play again

---

## Tech Stack

```
Next.js 14 (App Router) + TypeScript
Tailwind CSS + Shadcn/ui
Groq SDK          — LLM (llama-3.3-70b-versatile) + TTS (orpheus-v1-english)
No database       — fully stateless, no Supabase needed
```

One API key. No backend complexity. Ship fast.

---

## Project Structure

```
chaos-kitchen/
├── CLAUDE.md
├── app/
│   ├── page.tsx                  # Home screen — pick a recipe category
│   ├── kitchen/[id]/page.tsx     # Kitchen screen — swap ingredients, cook
│   ├── chaos/page.tsx            # Result screen — narration + chaos score
│   └── api/
│       ├── narrate/route.ts      # POST: calls Groq LLM → returns narration text + score
│       └── speak/route.ts        # POST: calls Groq TTS → returns audio blob
├── lib/
│   ├── recipes.ts                # All recipe data (hardcoded, see below)
│   ├── swaps.ts                  # Cursed ingredient swap map
│   └── groq.ts                   # Groq client singleton
├── components/
│   ├── IngredientPill.tsx        # Clickable ingredient → opens swap dropdown
│   ├── CookButton.tsx            # Big red animated button
│   ├── ChaosResult.tsx           # Score display + audio player
│   └── RecipeCard.tsx            # Recipe display card
└── .env.local
    └── GROQ_API_KEY=...
```

---

## Environment Setup

```bash
# .env.local
GROQ_API_KEY=your_key_from_console.groq.com
```

```bash
npm install groq-sdk
```

---

## Groq Client (`lib/groq.ts`)

```ts
import Groq from 'groq-sdk'

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})
```

---

## API Routes

### `app/api/narrate/route.ts` — LLM Narration

```ts
import { groq } from '@/lib/groq'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { recipeName, swaps } = await req.json()
  // swaps = [{ original: 'flour', replacement: 'sand' }, ...]

  const swapList = swaps
    .map((s: any) => `${s.original} → ${s.replacement}`)
    .join(', ')

  const prompt = `
You are a chaotic, extremely online food commentator who has seen too much internet content. 
Someone just cooked "${recipeName}" with these substitutions: ${swapList}.

Narrate what happens when they cook it. Rules:
- 3-4 sentences maximum
- Use emotion tags at the start of sentences for the TTS voice: [laughing], [surprised], [whispering], [excited], [sad], [angry]
- Be funny, unhinged, and reference popular internet memes and culture naturally where it fits
- You can reference things like: "this is not going to pass the vibe check", "bro really said no cap", "the Italian brain rot got to them", "six seven", "nothing beats a Jet2 holiday", "this has Ballerina Cappuccina energy", "chicken jockey moment", "this is giving main character syndrome", "the Gen Z stare is the only appropriate reaction", "bro really thought they cooked (they did not cook)", "this dish has left the chat", "not the Coldplay kiss cam catching this dish in 4K"
- Keep it absurd, punchy, and genuinely funny — like a TikTok comment section came to life
- End with "CHAOS SCORE: [number 1-100]" on its own line. Higher = more chaotic.

Example format:
[surprised] Bro really said "flour is overrated" and used sand — no cap this is not passing the vibe check. [laughing] The whole kitchen is giving Italian brain rot energy right now, Bombardiro Crocodilo would not stand for this. [whispering] The dish has left the chat. [sad] CHAOS SCORE: 91
  `

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
    temperature: 1.1,
  })

  const text = completion.choices[0].message.content ?? ''

  // Extract chaos score
  const scoreMatch = text.match(/CHAOS SCORE:\s*(\d+)/i)
  const chaosScore = scoreMatch ? parseInt(scoreMatch[1]) : 50
  const narration = text.replace(/CHAOS SCORE:.*$/im, '').trim()

  return NextResponse.json({ narration, chaosScore })
}
```

---

### `app/api/speak/route.ts` — TTS Narration

```ts
import { groq } from '@/lib/groq'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  const response = await groq.audio.speech.create({
    model: 'canopylabs/orpheus-v1-english',
    voice: 'luna',            // upbeat, chaotic energy
    input: text,
    response_format: 'wav',
  })

  const buffer = Buffer.from(await response.arrayBuffer())

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'audio/wav',
      'Content-Length': buffer.length.toString(),
    },
  })
}
```

**Available Orpheus voices:** `atlas`, `leo`, `luna`, `stella`, `aurora`, `river`, `hannah`, `troy`, `austin`
**Emotion tags supported inline:** `[laughing]` `[surprised]` `[whispering]` `[excited]` `[sad]` `[angry]`

> Pick a voice that sounds like an enthusiastic food content creator — `luna` or `stella` work great for upbeat chaotic energy, `leo` for deadpan commentary.

---

## Recipe Data (`lib/recipes.ts`)

All recipes are hardcoded. No API calls needed for this.

```ts
export interface Ingredient {
  id: string
  name: string
  emoji: string
}

export interface Recipe {
  id: string
  name: string
  emoji: string
  category: 'dessert' | 'savory' | 'breakfast' | 'drink'
  description: string
  ingredients: Ingredient[]
}

export const RECIPES: Recipe[] = [
  // ─── DESSERTS ────────────────────────────────────────────────
  {
    id: 'chocolate-cake',
    name: 'Chocolate Cake',
    emoji: '🎂',
    category: 'dessert',
    description: 'A classic rich chocolate layer cake',
    ingredients: [
      { id: 'flour',         name: 'All-purpose flour',  emoji: '🌾' },
      { id: 'cocoa',         name: 'Cocoa powder',       emoji: '🍫' },
      { id: 'eggs',          name: 'Eggs',               emoji: '🥚' },
      { id: 'butter',        name: 'Butter',             emoji: '🧈' },
      { id: 'sugar',         name: 'Sugar',              emoji: '🍬' },
      { id: 'milk',          name: 'Milk',               emoji: '🥛' },
      { id: 'baking-soda',   name: 'Baking soda',        emoji: '⬜' },
      { id: 'vanilla',       name: 'Vanilla extract',    emoji: '🫙' },
    ],
  },
  {
    id: 'chocolate-chip-cookies',
    name: 'Chocolate Chip Cookies',
    emoji: '🍪',
    category: 'dessert',
    description: 'Soft, chewy, classic cookies',
    ingredients: [
      { id: 'flour',         name: 'All-purpose flour',  emoji: '🌾' },
      { id: 'butter',        name: 'Butter',             emoji: '🧈' },
      { id: 'brown-sugar',   name: 'Brown sugar',        emoji: '🟫' },
      { id: 'eggs',          name: 'Eggs',               emoji: '🥚' },
      { id: 'vanilla',       name: 'Vanilla extract',    emoji: '🫙' },
      { id: 'choc-chips',    name: 'Chocolate chips',    emoji: '🍫' },
      { id: 'baking-soda',   name: 'Baking soda',        emoji: '⬜' },
      { id: 'salt',          name: 'Salt',               emoji: '🧂' },
    ],
  },

  // ─── SAVORY ──────────────────────────────────────────────────
  {
    id: 'spaghetti-bolognese',
    name: 'Spaghetti Bolognese',
    emoji: '🍝',
    category: 'savory',
    description: 'Classic Italian meat sauce pasta',
    ingredients: [
      { id: 'spaghetti',     name: 'Spaghetti',          emoji: '🍝' },
      { id: 'beef-mince',    name: 'Beef mince',         emoji: '🥩' },
      { id: 'tomatoes',      name: 'Canned tomatoes',    emoji: '🍅' },
      { id: 'onion',         name: 'Onion',              emoji: '🧅' },
      { id: 'garlic',        name: 'Garlic',             emoji: '🧄' },
      { id: 'carrot',        name: 'Carrot',             emoji: '🥕' },
      { id: 'olive-oil',     name: 'Olive oil',          emoji: '🫒' },
      { id: 'red-wine',      name: 'Red wine',           emoji: '🍷' },
      { id: 'parmesan',      name: 'Parmesan',           emoji: '🧀' },
    ],
  },
  {
    id: 'scrambled-eggs',
    name: 'Scrambled Eggs',
    emoji: '🍳',
    category: 'breakfast',
    description: 'Fluffy creamy scrambled eggs',
    ingredients: [
      { id: 'eggs',          name: 'Eggs',               emoji: '🥚' },
      { id: 'butter',        name: 'Butter',             emoji: '🧈' },
      { id: 'milk',          name: 'Milk',               emoji: '🥛' },
      { id: 'salt',          name: 'Salt',               emoji: '🧂' },
      { id: 'pepper',        name: 'Black pepper',       emoji: '🫚' },
    ],
  },

  // ─── BREAKFAST ───────────────────────────────────────────────
  {
    id: 'pancakes',
    name: 'Fluffy Pancakes',
    emoji: '🥞',
    category: 'breakfast',
    description: 'Light, airy breakfast pancakes',
    ingredients: [
      { id: 'flour',         name: 'All-purpose flour',  emoji: '🌾' },
      { id: 'eggs',          name: 'Eggs',               emoji: '🥚' },
      { id: 'milk',          name: 'Milk',               emoji: '🥛' },
      { id: 'butter',        name: 'Butter',             emoji: '🧈' },
      { id: 'sugar',         name: 'Sugar',              emoji: '🍬' },
      { id: 'baking-powder', name: 'Baking powder',      emoji: '⬜' },
      { id: 'vanilla',       name: 'Vanilla extract',    emoji: '🫙' },
      { id: 'salt',          name: 'Salt',               emoji: '🧂' },
    ],
  },

  // ─── DRINKS ──────────────────────────────────────────────────
  {
    id: 'banana-smoothie',
    name: 'Banana Smoothie',
    emoji: '🍌',
    category: 'drink',
    description: 'A creamy, fruity blended drink',
    ingredients: [
      { id: 'banana',        name: 'Banana',             emoji: '🍌' },
      { id: 'milk',          name: 'Milk',               emoji: '🥛' },
      { id: 'honey',         name: 'Honey',              emoji: '🍯' },
      { id: 'yogurt',        name: 'Greek yogurt',       emoji: '🫙' },
      { id: 'ice',           name: 'Ice',                emoji: '🧊' },
    ],
  },
]
```

---

## Cursed Ingredient Swaps (`lib/swaps.ts`)

Each ingredient has 4 cursed swap options. Shown as a dropdown when user clicks an ingredient pill.

```ts
export const SWAP_OPTIONS: Record<string, string[]> = {
  // Pantry
  'All-purpose flour':  ['Sand', 'Concrete powder', 'Glitter', 'Sawdust'],
  'Cocoa powder':       ['Mud', 'Ash', 'Coffee grounds', 'Dirt'],
  'Sugar':              ['Salt', 'Gravel', 'Chalk dust', 'Hopes and dreams'],
  'Brown sugar':        ['Brown sand', 'Rust flakes', 'Wet soil', 'Regret'],
  'Baking soda':        ['Baking powder × 10', 'Toothpaste', 'Antacid tablets', 'Nothing (chaos)'],
  'Baking powder':      ['Yeast × 5', 'Pop Rocks', 'Crushed aspirin', 'Fairy dust'],
  'Salt':               ['Sugar', 'MSG overload', 'Sea glass', 'Tears'],
  'Vanilla extract':    ['Petrol', 'Soy sauce', 'Bleach (food grade, apparently)', 'Perfume'],

  // Dairy
  'Eggs':               ['Rocks', 'Bubble wrap', 'Golf balls', 'Sadness'],
  'Butter':             ['Motor oil', 'Sunscreen SPF 50', 'Lard of mystery', 'Vaseline'],
  'Milk':               ['Pickle juice', 'Oat water', 'Tears of a chef', 'Energy drink'],
  'Greek yogurt':       ['Mayonnaise', 'Sour cream × 3', 'Cream cheese (melted)', 'Toothpaste'],

  // Produce
  'Banana':             ['Raw potato', 'A shoe', 'Avocado (overripe)', 'Rocks'],
  'Onion':              ['Grapefruit', 'An apple', 'Raw leek × 4', 'Disappointment'],
  'Garlic':             ['Garlic × 100', 'Onion powder avalanche', 'Nothing (cursed)', 'Mint leaves'],
  'Carrot':             ['Crayon (orange)', 'Raw parsnip × 5', 'Cheese stick', 'Stick of butter'],

  // Proteins
  'Beef mince':         ['Cat food (premium)', 'Wet sand', 'Crumbled cookies', 'Lentils (raw)'],

  // Pantry/Condiments
  'Olive oil':          ['WD-40', 'Baby oil', 'Cooking spray × entire can', 'Maple syrup'],
  'Red wine':           ['Grape juice (from concentrate)', 'Balsamic vinegar', 'Purple Kool-Aid', 'Port × 3'],
  'Parmesan':           ['Parmesan-flavoured dust', 'String cheese (shredded)', 'Powdered milk', 'Sawdust (Italian)'],
  'Honey':              ['Golden syrup × 3', 'Glue (edible)', 'Liquid sugar overload', 'Mustard'],
  'Chocolate chips':    ['Raisins (betrayal)', 'Gravel pieces', 'Frozen peas', 'Buttons (actual buttons)'],
  'Canned tomatoes':    ['Tomato ketchup', 'Tomato jam', 'Crushed strawberries', 'Baked beans'],

  // Other
  'Spaghetti':          ['Rubber bands', 'Raw spaghetti squash', 'Pencils', 'Shoe laces'],
  'Ice':                ['Hot coals', 'Warm rocks', 'Dry ice (hazardous)', 'Nothing (warm smoothie)'],
  'Black pepper':       ['Cayenne × 10', 'Crushed chalk', 'Coffee grounds', 'Sawdust (again)'],

  // Default fallback (used if ingredient not in map)
  '__default__':        ['Glitter', 'Sand', 'Motor oil', 'Pure chaos'],
}

export function getSwapOptions(ingredientName: string): string[] {
  return SWAP_OPTIONS[ingredientName] ?? SWAP_OPTIONS['__default__']
}
```

---

## Component: `IngredientPill.tsx`

```tsx
'use client'
import { useState } from 'react'
import { getSwapOptions } from '@/lib/swaps'

interface Props {
  name: string
  emoji: string
  onSwap: (original: string, replacement: string | null) => void
}

export function IngredientPill({ name, emoji, onSwap }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const swapOptions = getSwapOptions(name)

  const handleSelect = (swap: string) => {
    setSelected(swap)
    setOpen(false)
    onSwap(name, swap)
  }
  const handleReset = () => {
    setSelected(null)
    setOpen(false)
    onSwap(name, null)
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`px-3 py-1 rounded-full border text-sm font-medium transition-all ${
          selected
            ? 'bg-red-500 text-white border-red-600 line-through decoration-white'
            : 'bg-white border-gray-300 text-gray-700 hover:border-orange-400'
        }`}
      >
        {emoji} {selected ? selected : name}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          {selected && (
            <button
              onClick={handleReset}
              className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 border-b"
            >
              ↩ Use original
            </button>
          )}
          {swapOptions.map((swap) => (
            <button
              key={swap}
              onClick={() => handleSelect(swap)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 hover:text-orange-700"
            >
              💀 {swap}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## Kitchen Page Flow (`app/kitchen/[id]/page.tsx`)

```tsx
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
    if (Object.keys(swaps).length === 0) return // need at least 1 swap
    setLoading(true)

    const swapList = Object.entries(swaps).map(([original, replacement]) => ({
      original,
      replacement,
    }))

    // Get narration
    const narrateRes = await fetch('/api/narrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeName: recipe.name, swaps: swapList }),
    })
    const { narration, chaosScore } = await narrateRes.json()

    // Get audio
    const speakRes = await fetch('/api/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: narration }),
    })
    const audioBlob = await speakRes.blob()
    const audioUrl = URL.createObjectURL(audioBlob)

    // Store in sessionStorage, navigate to result
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
```

---

## Chaos Result Page (`app/chaos/page.tsx`)

```tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function ChaosPage() {
  const router = useRouter()
  const [result, setResult] = useState<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('chaosResult')
    if (!raw) { router.push('/'); return }
    const data = JSON.parse(raw)
    setResult(data)
    // Auto-play audio
    if (audioRef.current) {
      audioRef.current.src = data.audioUrl
      audioRef.current.play()
    }
  }, [])

  if (!result) return null

  // Strip emotion tags for display — TTS audio already has them baked in
  const cleanNarration = result.narration.replace(/\[.*?\]/g, '').trim()

  const scoreColor =
    result.chaosScore >= 80 ? 'text-red-600' :
    result.chaosScore >= 50 ? 'text-orange-500' : 'text-yellow-500'

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="text-8xl mb-4">💥</div>
      <h1 className="text-4xl font-bold mb-2">Kitchen Destroyed</h1>
      <p className="text-gray-500 mb-8">{result.recipeName} — Chaos Edition</p>

      <div className={`text-8xl font-black mb-2 ${scoreColor}`}>
        {result.chaosScore}
      </div>
      <p className="text-gray-400 mb-8 text-sm">CHAOS SCORE</p>

      <div className="bg-white rounded-2xl shadow p-6 max-w-xl text-left mb-8">
        <p className="text-gray-700 italic leading-relaxed">{cleanNarration}</p>
      </div>

      <audio ref={audioRef} controls className="mb-8" />

      <div className="flex gap-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-medium"
        >
          ↩ Try Again
        </button>
        <button
          onClick={() => router.push('/')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium"
        >
          🍳 New Recipe
        </button>
      </div>
    </div>
  )
}
```

---

## Home Page (`app/page.tsx`)

```tsx
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
```

---

## Meme Reference Sheet (for the LLM prompt)

These are real 2025–2026 trending memes the narrator should drop naturally — not force every one, just sprinkle them in where they fit:

| Meme / Phrase | When to use |
|---|---|
| **"bro really thought they cooked (they did not cook)"** | When the dish sounds deceptively confident |
| **"this is not going to pass the vibe check"** | General chaos reaction |
| **"no cap"** / **"on god"** | Emphasising how bad it is |
| **"six seven"** | Completely random interjection, that's the joke |
| **"Italian brain rot"** / **"Ballerina Cappuccina energy"** / **"Bombardiro Crocodilo"** | When the result is surreal or completely unhinged |
| **"Chicken Jockey"** (Minecraft Movie) | When something chaotic and unexpected emerges from the dish |
| **"Nothing beats a Jet2 holiday"** | Sarcastically over a terrible outcome |
| **"the dish has left the chat"** | When the food is completely destroyed |
| **"this is giving [X] energy"** | Describing the vibe of the disaster |
| **"not the [X] catching this in 4K"** | When something is dramatically witnessed |
| **"main character syndrome"** | The cook thought they were being bold and it backfired |
| **"Gen Z stare is the only appropriate reaction"** | Deadpan, nothing to say |
| **"Queen never cry"** | When the dish somehow survives despite everything |
| **"100 men vs 1 gorilla"** | For truly unwinnable cooking situations |
| **"the algorithm fed you lies"** | When a "life hack" substitution goes wrong |
| **"brain rot activated"** | General chaos / unhinged result |
| **"rent free"** | The smell/result that won't leave the kitchen |
| **"this dish said 'bye bye bye'"** | NSYNC-style dramatic exit of the food |

The narrator should feel like a mix of a **chaotic TikTok food reviewer**, a **very online Reddit commenter**, and **someone who has seen every meme ever made**. Funny > dramatic. The goal is the audience laughing, not cringing.

---

## Build Order (2.5 hrs)

| Time        | Task                                              | Who        |
|-------------|---------------------------------------------------|------------|
| 0:00–0:20   | Scaffold Next.js, install Groq SDK, set up `.env` | Both       |
| 0:20–0:50   | `lib/recipes.ts` + `lib/swaps.ts` + Home page     | Person A   |
| 0:20–0:50   | `/api/narrate` + `/api/speak` routes              | Person B   |
| 0:50–1:30   | Kitchen page + `IngredientPill` component         | Person A   |
| 0:50–1:30   | Chaos result page + audio playback                | Person B   |
| 1:30–2:00   | Wire everything together, fix bugs                | Both       |
| 2:00–2:30   | Polish UI, animations, deploy to Vercel           | Both       |

---

## Deployment

```bash
# Vercel (easiest)
npx vercel --prod
# Set GROQ_API_KEY in Vercel dashboard under Environment Variables
```

---

## Bonus Features (if time allows)

- 🎲 **Random Chaos** button — auto-swaps all ingredients randomly, one click chaos
- 🏆 **Leaderboard** — add Supabase, store top Chaos Scores
- 📸 **Share Card** — generate a sharable image of the result
- 🎭 **Multiple characters** — swap Gordon for a panicking Italian nonna or a passive-aggressive French chef
- 😱 **Chaos Tier labels** — "Mild Chaos" / "Absolute Disaster" / "Illegal in 12 Countries"

---

## Key Notes for Claude Code

- The narration text shown on screen should have emotion tags stripped for readability — use `.replace(/\[.*?\]/g, '').trim()`. The TTS input keeps the raw tags so the voice acts them out
- The narrator character is a chaotic, extremely online food commentator
- Meme references should feel natural, not forced — the LLM will pick the best ones given the specific swap combo
- Keep all state in `sessionStorage` between kitchen → chaos pages
- The Groq TTS response is a binary `wav` blob — return it as-is from the API route
- Emotion tags like `[horrified]` go inside the text string passed to TTS, not as separate parameters
- Temperature of `1.1` on the LLM is intentional — we want unhinged outputs
- At least 1 swap required before "COOK IT" button activates
- The narration text shown on screen should have emotion tags stripped for readability (but keep them in the TTS input)
