export const SWAP_OPTIONS: Record<string, string[]> = {
  // ─── Pantry ───────────────────────────────────────────────────
  'All-purpose flour':  ['Sand', 'Concrete powder', 'Glitter', 'Sawdust'],
  'Cocoa powder':       ['Mud', 'Ash', 'Coffee grounds', 'Dirt'],
  'Sugar':              ['Salt', 'Gravel', 'Chalk dust', 'Hopes and dreams'],
  'Brown sugar':        ['Brown sand', 'Rust flakes', 'Wet soil', 'Regret'],
  'Baking soda':        ['Baking powder × 10', 'Toothpaste', 'Antacid tablets', 'Nothing (chaos)'],
  'Baking powder':      ['Yeast × 5', 'Pop Rocks', 'Crushed aspirin', 'Fairy dust'],
  'Salt':               ['Sugar', 'MSG overload', 'Sea glass', 'Tears'],
  'Vanilla extract':    ['Petrol', 'Soy sauce', 'Bleach (food grade, apparently)', 'Perfume'],
  'Cinnamon':           ['Paprika × 20', 'Sawdust (spicy)', 'Crushed crayons (red)', 'Old spice cologne'],
  'Caramelising sugar': ['Napalm (decorative)', 'Actual fire', 'Brown glitter', 'Sand (torched)'],

  // ─── Dairy ────────────────────────────────────────────────────
  'Eggs':               ['Rocks', 'Bubble wrap', 'Golf balls', 'Sadness'],
  'Egg yolks':          ['Yellow paint', 'Mustard blobs', 'Corn kernels', 'Disappointment cubes'],
  'Fried eggs':         ['Rubber fried eggs (toy)', 'Yellow stickers', 'Tennis ball slices', 'Sadness (sunny side up)'],
  'Butter':             ['Motor oil', 'Sunscreen SPF 50', 'Lard of mystery', 'Vaseline'],
  'Milk':               ['Pickle juice', 'Oat water', 'Tears of a chef', 'Energy drink'],
  'Whole milk':         ['Oat milk (emotionally unavailable)', 'White paint', 'Coconut water × 3', 'Condensed chaos'],
  'Heavy cream':        ['Whipped air', 'Cream cheese (panicked)', 'Coconut milk (sobbing)', 'Sour cream (angry)'],
  'Greek yogurt':       ['Mayonnaise', 'Sour cream × 3', 'Cream cheese (melted)', 'Toothpaste'],

  // ─── Produce ──────────────────────────────────────────────────
  'Banana':             ['Raw potato', 'A shoe', 'Avocado (overripe)', 'Rocks'],
  'Onion':              ['Grapefruit', 'An apple', 'Raw leek × 4', 'Disappointment'],
  'Diced onion':        ['Diced sadness', 'Raw gummy bears', 'Crushed chips', 'Lego pieces (food grade)'],
  'Green onion':        ['Grass clippings', 'Green crayon shavings', 'Chives (existentially confused)', 'Mint (wrong vibe)'],
  'Garlic':             ['Garlic × 100', 'Onion powder avalanche', 'Nothing (cursed)', 'Mint leaves'],
  'Carrot':             ['Crayon (orange)', 'Raw parsnip × 5', 'Cheese stick', 'Stick of butter'],
  'Avocado':            ['Mushed peas', 'Green playdough', 'Pistachio paste', 'Guac from a gas station'],
  'Lime':               ['Lemon (close enough?)', 'Battery acid (decorative)', 'Green skittles (crushed)', 'Pickle brine'],
  'Cilantro':           ['Soap flakes (you know why)', 'Parsley in denial', 'AstroTurf (chopped)', 'Oregano (identity crisis)'],
  'Cucumber':           ['Zucchini (slightly threatening)', 'Green eraser', 'Cold pickle', 'Actual cucumber but frozen solid'],
  'Grilled tomato':     ['Ketchup blob (heated aggressively)', 'Tomato sticker (ironic)', 'Red balloon (popped)', 'Blistered regret'],
  'Mushrooms':          ['Foam pieces (decorative)', 'Raw cauliflower (wrong energy)', 'Sponge (cube cut)', 'Tiny wet rocks'],
  'Lemon juice':        ['Expired orange juice', 'Citric acid powder × 5', 'Sprite (flat)', 'Pure spite'],

  // ─── Proteins ─────────────────────────────────────────────────
  'Beef mince':         ['Cat food (premium)', 'Wet sand', 'Crumbled cookies', 'Lentils (raw)'],
  'Seasoned beef':      ['Seasoned regret', 'Cat food (artisanal)', 'Crumbled granola bars', 'Mud (well seasoned)'],
  'Pork sausages':      ['Crayon rolls', 'Foam cylinders', 'Candy rolls (wrong)', 'Pool noodle (bite-sized)'],
  'Back bacon':         ['Cardboard (smoked flavour)', 'Fruit leather (betrayal)', 'Seaweed strips', 'Beef jerky (stolen)'],
  'Pork bones':         ['Plastic dinosaur bones', 'Chalk sticks', 'Literal dog treats', 'Old pencils (boiled)'],
  'Chashu pork belly':  ['Spam (unironic)', 'Bologna slices (rolled dramatically)', 'Candied bacon (chaotic)', 'Fruit rollup (wrong country)'],
  'Fresh tuna':         ['Canned tuna (emotionally)', 'Pink eraser', 'Salmon (identity thief)', 'Red skittles (pressed)'],
  'Soft boiled egg':    ['Hard boiled egg (stubborn)', 'Rubber bouncy ball', 'Uncooked egg (chaos)', 'A marble'],

  // ─── Grains / Noodles ────────────────────────────────────────
  'Spaghetti':          ['Rubber bands', 'Raw spaghetti squash', 'Pencils', 'Shoe laces'],
  'Ramen noodles':      ['Instant noodles (dry, no water)', 'Rubber bands × 200', 'Silly string', 'Angel hair pasta (wrong nationality)'],
  'Sushi rice':         ['Regular rice (emotionally unavailable)', 'Couscous (confused)', 'Popcorn (pressed)', 'Sticky tape balls'],
  'Corn tortillas':     ['Cardboard discs', 'Frisbee (mini)', 'Rice paper (wrong continent)', 'Pancakes (chaotic fusion)'],
  'Toast':              ['Untoasted sadness', 'Cracker (underpowered)', 'Burnt offering', 'Cardboard (toasted)'],
  'Nori sheet':         ['Black construction paper', 'Seaweed from the beach', 'Dark chocolate sheet', 'Squid ink blotters'],

  // ─── Sauces / Condiments ──────────────────────────────────────
  'Olive oil':          ['WD-40', 'Baby oil', 'Cooking spray × entire can', 'Maple syrup'],
  'Sesame oil':         ['Sunscreen (sesame scented)', 'WD-40 (light edition)', 'Truffle oil (if you dare)', 'Perfume (Asian market)'],
  'Red wine':           ['Grape juice (from concentrate)', 'Balsamic vinegar', 'Purple Kool-Aid', 'Port × 3'],
  'Soy sauce':          ['Soy sauce × 10 (sodium overload)', 'Dark coffee (desperate)', 'Liquid smoke (existential)', 'Worcestershire (mispronounced)'],
  'Mirin':              ['Sugar water (giving up)', 'White wine (wrong passport)', 'Sprite (chaotic)', 'Honey (panicked)'],
  'Sriracha mayo':      ['Just sriracha (no chill)', 'Plain mayo (chaotic neutral)', 'Thousand island (wrong continent)', 'Ketchup + sadness'],
  'Wasabi':             ['Green toothpaste', 'Horseradish (cousin energy)', 'Guacamole (imposter)', 'Spinach puree (innocent looking)'],
  'Salsa':              ['Ketchup (American anxiety)', 'Crushed tomato soup', 'Strawberry jam (chaotic fusion)', 'Tomato baby food'],
  'Baked beans':        ['Cold baked beans (war crime)', 'Jelly beans (wrong beans)', 'Bean dip (existential)', 'Lentil soup (giving up)'],
  'Canned tomatoes':    ['Tomato ketchup', 'Tomato jam', 'Crushed strawberries', 'Baked beans'],
  'Parmesan':           ['Parmesan-flavoured dust', 'String cheese (shredded)', 'Powdered milk', 'Sawdust (Italian)'],
  'Cotija cheese':      ['Feta (greek spy)', 'Parmesan dust (wrong flag)', 'Crushed saltines', 'Chalk crumbles'],
  'Black pudding':      ['Oreo crumbles', 'Coal dust (decorative)', 'Charcoal powder (detox?)', 'Dark chocolate (plot twist)'],
  'Honey':              ['Golden syrup × 3', 'Glue (edible)', 'Liquid sugar overload', 'Mustard'],
  'Chocolate chips':    ['Raisins (betrayal)', 'Gravel pieces', 'Frozen peas', 'Buttons (actual buttons)'],
  'Rice vinegar':       ['White vinegar (no subtlety)', 'Lemon juice (trying)', 'Sprite (carbonated chaos)', 'Tears (salty)'],

  // ─── Specialty ────────────────────────────────────────────────
  'Phyllo dough':       ['Tissue paper (edible?)', 'Printer paper (buttered)', 'Filo of regret', 'Crepes (wrong country)'],
  'Walnuts':            ['Actual walnuts but pre-chewed', 'Pebbles (walnut sized)', 'Raisins (betrayal)', 'Gravel (premium)'],
  'Rose water':         ['Actual rose petals (blended raw)', 'Perfume (one spray)', 'Lavender oil (wrong flower)', 'Floral air freshener'],
  'Vanilla bean':       ['Vanilla extract × entire bottle', 'Vanilla scented candle wax', 'Black marker (similar shape)', 'One single raisin'],
  'Sesame seeds':       ['Poppy seeds (identity crisis)', 'Tiny pebbles (visual twin)', 'Cake sprinkles (chaos mode)', 'Sand (again)'],
  'Tapioca pearls':     ['Boba made of gravel', 'Black olives (sliced)', 'Raisins (still betrayal)', 'Marble collection (choking hazard)'],
  'Brown sugar syrup':  ['Actual brown sugar (dry, unmixed)', 'Molasses (nightmare fuel)', 'Dark chocolate sauce', 'Soy sauce (sweet??)'],
  'Black tea':          ['Cold brew coffee (wrong vibe)', 'Dirt water (aesthetic)', 'Grape juice (imposter)', 'Iced espresso (panic)'],

  // ─── Other ────────────────────────────────────────────────────
  'Ice':                ['Hot coals', 'Warm rocks', 'Dry ice (hazardous)', 'Nothing (warm smoothie)'],
  'Black pepper':       ['Cayenne × 10', 'Crushed chalk', 'Coffee grounds', 'Sawdust (again)'],

  // Default fallback
  '__default__':        ['Glitter', 'Sand', 'Motor oil', 'Pure chaos'],
}

export function getSwapOptions(ingredientName: string): string[] {
  return SWAP_OPTIONS[ingredientName] ?? SWAP_OPTIONS['__default__']
}
