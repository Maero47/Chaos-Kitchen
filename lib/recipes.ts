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

  // ─── BREAKFAST ───────────────────────────────────────────────
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
