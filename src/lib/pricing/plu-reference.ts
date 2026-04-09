/**
 * PLU Code Reference Database
 *
 * Standardized produce codes used by farmers markets and grocery stores worldwide.
 * Maintained by the International Federation for Produce Standards (IFPS).
 *
 * Source: https://www.ifpsglobal.com/PLU-Codes/PLU-Search
 * This is a subset of common produce items for farmers market use.
 */

export interface PLUEntry {
  code: string;
  name: string;
  category: string;
  typicalUnit: string;
  isOrganic: boolean;
  keywords: string[];
}

export const PLU_DATABASE: PLUEntry[] = [
  // Tropical Fruits
  { code: "4011", name: "Bananas", category: "Tropical Fruits", typicalUnit: "lb", isOrganic: false, keywords: ["banana", "yellow", "tropical"] },
  { code: "94011", name: "Bananas (Organic)", category: "Tropical Fruits", typicalUnit: "lb", isOrganic: true, keywords: ["banana", "organic", "tropical"] },
  { code: "4046", name: "Avocados", category: "Tropical Fruits", typicalUnit: "each", isOrganic: false, keywords: ["avocado", "hass", "tropical"] },
  { code: "4225", name: "Apples (Organic)", category: "Pome Fruit", typicalUnit: "lb", isOrganic: true, keywords: ["apple", "organic", "fruit"] },
  { code: "4162", name: "Mangoes", category: "Tropical Fruits", typicalUnit: "each", isOrganic: false, keywords: ["mango", "tropical"] },
  { code: "4051", name: "Papaya", category: "Tropical Fruits", typicalUnit: "each", isOrganic: false, keywords: ["papaya", "tropical"] },
  { code: "4316", name: "Coconut", category: "Tropical Fruits", typicalUnit: "each", isOrganic: false, keywords: ["coconut", "tropical"] },

  // Citrus
  { code: "4012", name: "Oranges", category: "Citrus", typicalUnit: "lb", isOrganic: false, keywords: ["orange", "citrus", "fruit"] },
  { code: "94012", name: "Oranges (Organic)", category: "Citrus", typicalUnit: "lb", isOrganic: true, keywords: ["orange", "organic", "citrus"] },
  { code: "4013", name: "Tangerines", category: "Citrus", typicalUnit: "lb", isOrganic: false, keywords: ["tangerine", "citrus", "mandarin"] },
  { code: "4093", name: "Clementines", category: "Citrus", typicalUnit: "each", isOrganic: false, keywords: ["clementine", "citrus", "mandarin"] },
  { code: "4015", name: "Lemons", category: "Citrus", typicalUnit: "lb", isOrganic: false, keywords: ["lemon", "citrus"] },
  { code: "4952", name: "Limes", category: "Citrus", typicalUnit: "lb", isOrganic: false, keywords: ["lime", "citrus"] },
  { code: "4048", name: "Grapefruit (Pink)", category: "Citrus", typicalUnit: "each", isOrganic: false, keywords: ["grapefruit", "citrus"] },

  // Stone Fruit
  { code: "4065", name: "Peaches", category: "Stone Fruit", typicalUnit: "lb", isOrganic: false, keywords: ["peach", "stone fruit", "summer"] },
  { code: "4404", name: "Peaches (Organic)", category: "Stone Fruit", typicalUnit: "lb", isOrganic: true, keywords: ["peach", "organic", "stone fruit"] },
  { code: "4042", name: "Plums", category: "Stone Fruit", typicalUnit: "lb", isOrganic: false, keywords: ["plum", "stone fruit"] },
  { code: "3082", name: "Cherries", category: "Stone Fruit", typicalUnit: "lb", isOrganic: false, keywords: ["cherry", "stone fruit", "summer"] },
  { code: "4084", name: "Apricots", category: "Stone Fruit", typicalUnit: "lb", isOrganic: false, keywords: ["apricot", "stone fruit"] },
  { code: "4038", name: "Pears (Bartlett)", category: "Pome Fruit", typicalUnit: "lb", isOrganic: false, keywords: ["pear", "bartlett", "fruit"] },
  { code: "4412", name: "Pears (Organic)", category: "Pome Fruit", typicalUnit: "lb", isOrganic: true, keywords: ["pear", "organic"] },

  // Berries
  { code: "4078", name: "Strawberries", category: "Berries", typicalUnit: "pint", isOrganic: false, keywords: ["strawberry", "berries"] },
  { code: "84078", name: "Strawberries (Organic)", category: "Berries", typicalUnit: "pint", isOrganic: true, keywords: ["strawberry", "organic"] },
  { code: "4026", name: "Blueberries", category: "Berries", typicalUnit: "pint", isOrganic: false, keywords: ["blueberry", "berries"] },
  { code: "4504", name: "Raspberries", category: "Berries", typicalUnit: "pint", isOrganic: false, keywords: ["raspberry", "berries"] },
  { code: "4456", name: "Blackberries", category: "Berries", typicalUnit: "pint", isOrganic: false, keywords: ["blackberry", "berries"] },

  // Grapes
  { code: "4023", name: "Grapes (Red)", category: "Vines", typicalUnit: "lb", isOrganic: false, keywords: ["grape", "red", "fruit"] },
  { code: "4022", name: "Grapes (White)", category: "Vines", typicalUnit: "lb", isOrganic: false, keywords: ["grape", "white", "fruit"] },
  { code: "4055", name: "Grapes (Organic)", category: "Vines", typicalUnit: "lb", isOrganic: true, keywords: ["grape", "organic"] },

  // Melons
  { code: "4031", name: "Cantaloupe", category: "Melons", typicalUnit: "each", isOrganic: false, keywords: ["cantaloupe", "melon"] },
  { code: "4050", name: "Watermelon", category: "Melons", typicalUnit: "each", isOrganic: false, keywords: ["watermelon", "melon"] },
  { code: "4036", name: "Honeydew", category: "Melons", typicalUnit: "each", isOrganic: false, keywords: ["honeydew", "melon"] },

  // Leafy Greens
  { code: "4064", name: "Lettuce (Romaine)", category: "Leafy Greens", typicalUnit: "head", isOrganic: false, keywords: ["lettuce", "romaine"] },
  { code: "4083", name: "Baby Spinach", category: "Leafy Greens", typicalUnit: "bunch", isOrganic: false, keywords: ["spinach", "baby", "greens"] },
  { code: "4090", name: "Kale", category: "Leafy Greens", typicalUnit: "bunch", isOrganic: false, keywords: ["kale", "greens"] },
  { code: "4224", name: "Arugula", category: "Leafy Greens", typicalUnit: "bunch", isOrganic: false, keywords: ["arugula", "greens", "rocket"] },
  { code: "4075", name: "Swiss Chard", category: "Leafy Greens", typicalUnit: "bunch", isOrganic: false, keywords: ["chard", "swiss chard", "greens"] },

  // Vegetables
  { code: "4075", name: "Tomatoes (Heirloom)", category: "Nightshades", typicalUnit: "lb", isOrganic: false, keywords: ["tomato", "heirloom"] },
  { code: "4664", name: "Sweet Corn", category: "Vegetables", typicalUnit: "each", isOrganic: false, keywords: ["corn", "sweet", "vegetable"] },
  { code: "4072", name: "Cucumbers", category: "Vegetables", typicalUnit: "each", isOrganic: false, keywords: ["cucumber", "vegetable"] },
  { code: "4068", name: "Bell Peppers (Green)", category: "Nightshades", typicalUnit: "each", isOrganic: false, keywords: ["pepper", "bell", "green"] },
  { code: "4689", name: "Bell Peppers (Red)", category: "Nightshades", typicalUnit: "each", isOrganic: false, keywords: ["pepper", "bell", "red"] },
  { code: "4063", name: "Eggplant", category: "Nightshades", typicalUnit: "lb", isOrganic: false, keywords: ["eggplant", "vegetable"] },
  { code: "4073", name: "Zucchini", category: "Vegetables", typicalUnit: "lb", isOrganic: false, keywords: ["zucchini", "summer squash"] },
  { code: "4067", name: "Carrots", category: "Root Vegetables", typicalUnit: "bunch", isOrganic: false, keywords: ["carrot", "root"] },
  { code: "4094", name: "Beets", category: "Root Vegetables", typicalUnit: "bunch", isOrganic: false, keywords: ["beet", "root"] },
  { code: "4087", name: "Radishes", category: "Root Vegetables", typicalUnit: "bunch", isOrganic: false, keywords: ["radish", "root"] },
  { code: "4127", name: "Potatoes (Russet)", category: "Root Vegetables", typicalUnit: "lb", isOrganic: false, keywords: ["potato", "russet", "root"] },
  { code: "4081", name: "Onions (Yellow)", category: "Alliums", typicalUnit: "lb", isOrganic: false, keywords: ["onion", "yellow", "allium"] },
  { code: "4663", name: "Garlic", category: "Alliums", typicalUnit: "head", isOrganic: false, keywords: ["garlic", "allium"] },
  { code: "4049", name: "Celery", category: "Vegetables", typicalUnit: "bunch", isOrganic: false, keywords: ["celery", "vegetable"] },
  { code: "4061", name: "Broccoli", category: "Brassicas", typicalUnit: "lb", isOrganic: false, keywords: ["broccoli", "brassica"] },
  { code: "4033", name: "Cauliflower", category: "Brassicas", typicalUnit: "each", isOrganic: false, keywords: ["cauliflower", "brassica"] },
  { code: "4017", name: "Cabbage (Green)", category: "Brassicas", typicalUnit: "each", isOrganic: false, keywords: ["cabbage", "brassica"] },
  { code: "4228", name: "Brussels Sprouts", category: "Brassicas", typicalUnit: "lb", isOrganic: false, keywords: ["brussels sprout", "brassica"] },
  { code: "4095", name: "Green Beans", category: "Legumes", typicalUnit: "lb", isOrganic: false, keywords: ["green bean", "legume"] },
  { code: "4070", name: "Asparagus", category: "Vegetables", typicalUnit: "lb", isOrganic: false, keywords: ["asparagus", "spring"] },
  { code: "4052", name: "Mushrooms (White)", category: "Fungi", typicalUnit: "lb", isOrganic: false, keywords: ["mushroom", "white", "fungus"] },
  { code: "4642", name: "Mushrooms (Cremini)", category: "Fungi", typicalUnit: "lb", isOrganic: false, keywords: ["mushroom", "cremini"] },

  // Herbs
  { code: "4881", name: "Basil", category: "Herbs", typicalUnit: "bunch", isOrganic: false, keywords: ["basil", "herb"] },
  { code: "4069", name: "Cilantro", category: "Herbs", typicalUnit: "bunch", isOrganic: false, keywords: ["cilantro", "herb"] },
  { code: "4599", name: "Parsley", category: "Herbs", typicalUnit: "bunch", isOrganic: false, keywords: ["parsley", "herb"] },
  { code: "4074", name: "Mint", category: "Herbs", typicalUnit: "bunch", isOrganic: false, keywords: ["mint", "herb"] },
  { code: "4893", name: "Rosemary", category: "Herbs", typicalUnit: "bunch", isOrganic: false, keywords: ["rosemary", "herb"] },
  { code: "4053", name: "Thyme", category: "Herbs", typicalUnit: "bunch", isOrganic: false, keywords: ["thyme", "herb"] },

  // Nuts and Seeds
  { code: "4321", name: "Peanuts (In Shell)", category: "Nuts", typicalUnit: "lb", isOrganic: false, keywords: ["peanut", "nut"] },
  { code: "4627", name: "Almonds", category: "Nuts", typicalUnit: "lb", isOrganic: false, keywords: ["almond", "nut"] },
  { code: "4079", name: "Walnuts", category: "Nuts", typicalUnit: "lb", isOrganic: false, keywords: ["walnut", "nut"] },

  // Eggs and Dairy
  { code: "4115", name: "Eggs (Large)", category: "Eggs", typicalUnit: "dozen", isOrganic: false, keywords: ["egg", "dozen"] },
  { code: "4124", name: "Eggs (Organic)", category: "Eggs", typicalUnit: "dozen", isOrganic: true, keywords: ["egg", "organic"] },

  // Honey and Preserves
  { code: "4442", name: "Honey (Raw)", category: "Honey", typicalUnit: "jar", isOrganic: false, keywords: ["honey", "raw"] },
];

/**
 * Search PLU database by name, code, or keywords
 */
export function searchPLU(query: string): PLUEntry[] {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  return PLU_DATABASE.filter((entry) => {
    // Match by code
    if (entry.code.includes(normalizedQuery)) return true;

    // Match by exact name
    if (entry.name.toLowerCase().includes(normalizedQuery)) return true;

    // Match by category
    if (entry.category.toLowerCase().includes(normalizedQuery)) return true;

    // Match by keywords
    if (entry.keywords.some((kw) => kw.includes(normalizedQuery))) return true;

    return false;
  });
}

/**
 * Get PLU entry by code
 */
export function getPLUByCode(code: string): PLUEntry | undefined {
  return PLU_DATABASE.find((entry) => entry.code === code);
}

/**
 * Get all PLU entries in a category
 */
export function getPLUByCategory(category: string): PLUEntry[] {
  return PLU_DATABASE.filter((entry) => entry.category === category);
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return Array.from(new Set(PLU_DATABASE.map((entry) => entry.category))).sort();
}
