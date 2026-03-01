/**
 * Eco-Friendly Product Finder — Seed data & storage keys
 * Used across all pages for products and categories.
 */

const ECO_STORAGE_KEYS = {
  products: 'eco_products',
  categories: 'eco_categories',
  user: 'eco_user',
  theme: 'eco_theme',
};

const DEFAULT_CATEGORIES = [
  { id: 'reusable', name: 'Reusable' },
  { id: 'organic-skincare', name: 'Organic Skincare' },
  { id: 'sustainable-fashion', name: 'Sustainable Fashion' },
  { id: 'eco-home', name: 'Eco Home' },
  { id: 'zero-waste-kitchen', name: 'Zero Waste Kitchen' },
];

/**
 * Default products for first load (when LocalStorage is empty).
 * Each product: id, name, category (id), price, ecoScore (1-10), carbonKg, image (placeholder URL), description, materials[], benefits[], reviews[]
 */
const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    name: 'Bamboo Reusable Cutlery Set',
    category: 'reusable',
    price: 24.99,
    ecoScore: 9,
    carbonKg: 0.8,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400',
    description: 'Lightweight, durable bamboo cutlery set with carrying case. Perfect for picnics and on-the-go meals. Fully biodegradable and sustainably sourced.',
    materials: ['Bamboo', 'Organic cotton pouch'],
    benefits: ['Reduces single-use plastic', 'Carbon-negative material', 'Compostable'],
    reviews: [
      { author: 'Sarah M.', rating: 5, date: '2024-02-10', text: 'Love this set! So lightweight and the case keeps everything clean.' },
      { author: 'EcoDave', rating: 5, date: '2024-02-01', text: 'Best purchase for zero-waste living. Highly recommend.' },
    ],
  },
  {
    id: 'p2',
    name: 'Organic Lavender Face Cream',
    category: 'organic-skincare',
    price: 32.00,
    ecoScore: 8,
    carbonKg: 1.2,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1af4d41?w=400',
    description: 'Certified organic face cream with lavender and shea butter. Cruelty-free, vegan, and packaged in recyclable glass.',
    materials: ['Organic lavender', 'Shea butter', 'Jojoba oil', 'Recycled glass jar'],
    benefits: ['No synthetic chemicals', 'Recyclable packaging', 'Carbon-neutral shipping'],
    reviews: [
      { author: 'Emma L.', rating: 5, date: '2024-02-08', text: 'My skin has never felt better. Smells amazing too!' },
      { author: 'GreenBeauty', rating: 4, date: '2024-01-28', text: 'Great texture. Would buy again.' },
    ],
  },
  {
    id: 'p3',
    name: 'Recycled Cotton Tote Bag',
    category: 'sustainable-fashion',
    price: 18.50,
    ecoScore: 9,
    carbonKg: 0.5,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    description: 'Spacious tote made from 100% recycled cotton. Durable and stylish for everyday use.',
    materials: ['Recycled cotton', 'Organic cotton thread'],
    benefits: ['Saves water vs virgin cotton', 'Low carbon footprint', 'Fair trade certified'],
    reviews: [
      { author: 'Alex K.', rating: 5, date: '2024-02-05', text: 'Use it every day. Sturdy and good size.' },
    ],
  },
  {
    id: 'p4',
    name: 'Solar-Powered LED Desk Lamp',
    category: 'eco-home',
    price: 45.99,
    ecoScore: 8,
    carbonKg: 2.3,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    description: 'Elegant desk lamp with built-in solar panel and battery. Charge by day, use by night.',
    materials: ['Recycled aluminum', 'LED bulbs', 'Solar panel', 'Li-ion battery'],
    benefits: ['Zero grid usage when charged', 'Long-lasting LED', 'Recyclable materials'],
    reviews: [
      { author: 'TechGreen', rating: 4, date: '2024-02-02', text: 'Bright and holds charge well. Good for remote work.' },
    ],
  },
  {
    id: 'p5',
    name: 'Stainless Steel Food Containers (Set of 5)',
    category: 'zero-waste-kitchen',
    price: 38.00,
    ecoScore: 10,
    carbonKg: 1.1,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400',
    description: 'Stackable, leak-proof containers. Replace plastic takeaway and storage with durable steel.',
    materials: ['Stainless steel', 'BPA-free silicone lids'],
    benefits: ['Lasts decades', 'No plastic', 'Fully recyclable'],
    reviews: [
      { author: 'ZeroWasteMom', rating: 5, date: '2024-02-12', text: 'Replaced all our plastic containers. Best investment.' },
      { author: 'Mike R.', rating: 5, date: '2024-01-20', text: 'Great quality. Lids seal tightly.' },
    ],
  },
  {
    id: 'p6',
    name: 'Hemp Shower Curtain',
    category: 'eco-home',
    price: 42.00,
    ecoScore: 7,
    carbonKg: 1.8,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400',
    description: 'Natural hemp fabric shower curtain. Resistant to mildew and long-lasting.',
    materials: ['Hemp fabric', 'Organic cotton liner'],
    benefits: ['Low water and pesticide use', 'Biodegradable', 'Durable'],
    reviews: [
      { author: 'NatureLover', rating: 4, date: '2024-02-01', text: 'Looks great and feels eco-friendly. Happy with purchase.' },
    ],
  },
  {
    id: 'p7',
    name: 'Beeswax Food Wraps (3 Pack)',
    category: 'zero-waste-kitchen',
    price: 22.00,
    ecoScore: 9,
    carbonKg: 0.4,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400',
    description: 'Reusable food wraps made from organic cotton and beeswax. Wash and reuse for months.',
    materials: ['Organic cotton', 'Beeswax', 'Tree resin', 'Jojoba oil'],
    benefits: ['Eliminates plastic wrap', 'Compostable at end of life', 'Natural antibacterial'],
    reviews: [
      { author: 'EcoChef', rating: 5, date: '2024-02-09', text: 'Perfect for covering bowls and wrapping sandwiches.' },
    ],
  },
  {
    id: 'p8',
    name: 'Refillable Deodorant (Natural)',
    category: 'organic-skincare',
    price: 14.99,
    ecoScore: 8,
    carbonKg: 0.6,
    image: 'https://images.unsplash.com/photo-1523293182080-3a4c2c0c8c8a?w=400',
    description: 'Aluminum refillable case with natural deodorant refills. No plastic, no harsh chemicals.',
    materials: ['Recycled aluminum case', 'Natural ingredients', 'Paper packaging'],
    benefits: ['Zero plastic', 'Refill reduces waste', 'Aluminum infinitely recyclable'],
    reviews: [
      { author: 'CleanLife', rating: 4, date: '2024-01-25', text: 'Works well and love that I can just buy refills now.' },
    ],
  },
];

/**
 * Get products from LocalStorage or return default and seed storage.
 * @returns {Array}
 */
function getStoredProducts() {
  try {
    const raw = localStorage.getItem(ECO_STORAGE_KEYS.products);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load products from storage.', e);
  }
  localStorage.setItem(ECO_STORAGE_KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

/**
 * Save products to LocalStorage.
 * @param {Array} products
 */
function setStoredProducts(products) {
  try {
    localStorage.setItem(ECO_STORAGE_KEYS.products, JSON.stringify(products));
  } catch (e) {
    console.warn('Failed to save products.', e);
  }
}

/**
 * Get categories from LocalStorage or return default.
 * @returns {Array}
 */
function getStoredCategories() {
  try {
    const raw = localStorage.getItem(ECO_STORAGE_KEYS.categories);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load categories.', e);
  }
  const cats = DEFAULT_CATEGORIES.map(c => ({ ...c }));
  localStorage.setItem(ECO_STORAGE_KEYS.categories, JSON.stringify(cats));
  return cats;
}

/**
 * Save categories to LocalStorage.
 * @param {Array} categories
 */
function setStoredCategories(categories) {
  try {
    localStorage.setItem(ECO_STORAGE_KEYS.categories, JSON.stringify(categories));
  } catch (e) {
    console.warn('Failed to save categories.', e);
  }
}
