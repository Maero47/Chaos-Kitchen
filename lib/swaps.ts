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

  '__default__':        ['Glitter', 'Sand', 'Motor oil', 'Pure chaos'],
}

export function getSwapOptions(ingredientName: string): string[] {
  return SWAP_OPTIONS[ingredientName] ?? SWAP_OPTIONS['__default__']
}
