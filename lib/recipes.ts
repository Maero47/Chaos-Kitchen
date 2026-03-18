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
    description: 'Classic chocolate cake',
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
    description: 'Soft & chewy cookies',
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
  {
    id: 'baklava',
    name: 'Baklava',
    emoji: '🍯',
    category: 'dessert',
    description: 'Crispy phyllo & honey',
    ingredients: [
      { id: 'phyllo-dough',  name: 'Phyllo dough',       emoji: '📄' },
      { id: 'walnuts',       name: 'Walnuts',            emoji: '🥜' },
      { id: 'butter-bak',   name: 'Butter',             emoji: '🧈' },
      { id: 'honey-bak',    name: 'Honey',              emoji: '🍯' },
      { id: 'cinnamon',     name: 'Cinnamon',           emoji: '🫚' },
      { id: 'sugar-bak',    name: 'Sugar',              emoji: '🍬' },
      { id: 'lemon-juice',  name: 'Lemon juice',        emoji: '🍋' },
      { id: 'rosewater',    name: 'Rose water',         emoji: '🌹' },
    ],
  },
  {
    id: 'creme-brulee',
    name: 'Crème Brûlée',
    emoji: '🔥',
    category: 'dessert',
    description: 'Custard + blowtorch',
    ingredients: [
      { id: 'heavy-cream',  name: 'Heavy cream',        emoji: '🥛' },
      { id: 'egg-yolks',   name: 'Egg yolks',          emoji: '🥚' },
      { id: 'sugar-cb',    name: 'Sugar',              emoji: '🍬' },
      { id: 'vanilla-cb',  name: 'Vanilla bean',       emoji: '🫙' },
      { id: 'torch-sugar', name: 'Caramelising sugar', emoji: '✨' },
    ],
  },

  // ─── SAVORY ──────────────────────────────────────────────────
  {
    id: 'spaghetti-bolognese',
    name: 'Spaghetti Bolognese',
    emoji: '🍝',
    category: 'savory',
    description: 'Italian meat sauce pasta',
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
    id: 'ramen',
    name: 'Tonkotsu Ramen',
    emoji: '🍜',
    category: 'savory',
    description: 'Rich pork broth noodles',
    ingredients: [
      { id: 'ramen-noodles', name: 'Ramen noodles',      emoji: '🍜' },
      { id: 'pork-bone',     name: 'Pork bones',         emoji: '🦴' },
      { id: 'soy-sauce',     name: 'Soy sauce',          emoji: '🫙' },
      { id: 'mirin',         name: 'Mirin',              emoji: '🍶' },
      { id: 'soft-egg',      name: 'Soft boiled egg',    emoji: '🥚' },
      { id: 'nori',          name: 'Nori sheet',         emoji: '🟫' },
      { id: 'green-onion',   name: 'Green onion',        emoji: '🧅' },
      { id: 'sesame-oil',    name: 'Sesame oil',         emoji: '🫒' },
      { id: 'chashu',        name: 'Chashu pork belly',  emoji: '🥩' },
    ],
  },
  {
    id: 'tacos',
    name: 'Street Tacos',
    emoji: '🌮',
    category: 'savory',
    description: 'Mexican street tacos',
    ingredients: [
      { id: 'tortilla',      name: 'Corn tortillas',     emoji: '🫓' },
      { id: 'beef-taco',    name: 'Seasoned beef',      emoji: '🥩' },
      { id: 'salsa',         name: 'Salsa',              emoji: '🍅' },
      { id: 'avocado',       name: 'Avocado',            emoji: '🥑' },
      { id: 'lime',          name: 'Lime',               emoji: '🍋' },
      { id: 'cilantro',      name: 'Cilantro',           emoji: '🌿' },
      { id: 'onion-taco',   name: 'Diced onion',        emoji: '🧅' },
      { id: 'cheese-taco',  name: 'Cotija cheese',      emoji: '🧀' },
    ],
  },
  {
    id: 'sushi-roll',
    name: 'Spicy Tuna Roll',
    emoji: '🍱',
    category: 'savory',
    description: 'Tuna, sriracha, rice',
    ingredients: [
      { id: 'sushi-rice',   name: 'Sushi rice',         emoji: '🍚' },
      { id: 'tuna',         name: 'Fresh tuna',         emoji: '🐟' },
      { id: 'nori-sushi',  name: 'Nori sheet',         emoji: '🟫' },
      { id: 'cucumber',    name: 'Cucumber',           emoji: '🥒' },
      { id: 'sriracha',    name: 'Sriracha mayo',      emoji: '🌶️' },
      { id: 'rice-vinegar','name': 'Rice vinegar',      emoji: '🫙' },
      { id: 'sesame',      name: 'Sesame seeds',       emoji: '⚪' },
      { id: 'wasabi',      name: 'Wasabi',             emoji: '💚' },
    ],
  },

  // ─── BREAKFAST ───────────────────────────────────────────────
  {
    id: 'scrambled-eggs',
    name: 'Scrambled Eggs',
    emoji: '🍳',
    category: 'breakfast',
    description: 'Fluffy scrambled eggs',
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
    description: 'Light & airy pancakes',
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
  {
    id: 'full-english',
    name: 'Full English Breakfast',
    emoji: '🍽️',
    category: 'breakfast',
    description: 'The British fry-up',
    ingredients: [
      { id: 'bacon',         name: 'Back bacon',         emoji: '🥓' },
      { id: 'sausages',      name: 'Pork sausages',      emoji: '🌭' },
      { id: 'eggs-eng',     name: 'Fried eggs',         emoji: '🥚' },
      { id: 'beans',         name: 'Baked beans',        emoji: '🫘' },
      { id: 'toast',         name: 'Toast',              emoji: '🍞' },
      { id: 'tomato-eng',   name: 'Grilled tomato',     emoji: '🍅' },
      { id: 'mushrooms',     name: 'Mushrooms',          emoji: '🍄' },
      { id: 'black-pudding', name: 'Black pudding',      emoji: '⚫' },
    ],
  },

  // ─── DRINKS ──────────────────────────────────────────────────
  {
    id: 'banana-smoothie',
    name: 'Banana Smoothie',
    emoji: '🍌',
    category: 'drink',
    description: 'Creamy banana blend',
    ingredients: [
      { id: 'banana',        name: 'Banana',             emoji: '🍌' },
      { id: 'milk',          name: 'Milk',               emoji: '🥛' },
      { id: 'honey',         name: 'Honey',              emoji: '🍯' },
      { id: 'yogurt',        name: 'Greek yogurt',       emoji: '🫙' },
      { id: 'ice',           name: 'Ice',                emoji: '🧊' },
    ],
  },
  {
    id: 'bubble-tea',
    name: 'Brown Sugar Bubble Tea',
    emoji: '🧋',
    category: 'drink',
    description: 'Milk tea + boba',
    ingredients: [
      { id: 'black-tea',    name: 'Black tea',          emoji: '🍵' },
      { id: 'tapioca',      name: 'Tapioca pearls',     emoji: '⚫' },
      { id: 'brown-sugar-bt','name': 'Brown sugar syrup', emoji: '🟫' },
      { id: 'whole-milk',   name: 'Whole milk',         emoji: '🥛' },
      { id: 'ice-bt',       name: 'Ice',                emoji: '🧊' },
    ],
  },
]
