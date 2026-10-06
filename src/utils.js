const STORAGE_KEY = 'products'

export const genId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2)

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Food & Beverage',
  'Books',
  'Home & Garden',
  'Sports & Outdoors',
  'Toys & Games',
  'Health & Beauty',
  'Automotive',
  'Office Supplies',
]

export const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'oldest',     label: 'Oldest First' },
  { value: 'name-asc',   label: 'Name A → Z' },
  { value: 'name-desc',  label: 'Name Z → A' },
  { value: 'price-low',  label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'stock-low',  label: 'Stock: Low → High' },
  { value: 'stock-high', label: 'Stock: High → Low' },
]

export function stockStatus(quantity) {
  if (quantity === 0) return { label: 'Out of Stock', cls: 'out' }
  if (quantity <= 10) return { label: 'Low Stock', cls: 'low' }
  return { label: 'In Stock', cls: 'in' }
}

export function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return seedData()
    const parsed = JSON.parse(saved)
    // Reload seed if stored data is empty or outdated
    if (!Array.isArray(parsed) || parsed.length < 6) {
      return seedData()
    }
    return parsed
  } catch {
    return seedData()
  }
}

export function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (error) {
    console.error('Failed to save products:', error)
  }
}

export function applyFilters(products, { search, category, stockFilter, sort }) {
  let result = [...products]

  if (search && search.trim()) {
    const query = search.toLowerCase().trim()
    result = result.filter(item =>
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      item.category.toLowerCase().includes(query)
    )
  }

  if (category) {
    result = result.filter(item => item.category === category)
  }

  if (stockFilter === 'in-stock') {
    result = result.filter(item => item.stockQuantity > 10)
  } else if (stockFilter === 'low') {
    result = result.filter(item => item.stockQuantity > 0 && item.stockQuantity <= 10)
  } else if (stockFilter === 'out') {
    result = result.filter(item => item.stockQuantity === 0)
  }

  if (sort === 'oldest') {
    result.sort((a, b) => a.createdAt - b.createdAt)
  } else if (sort === 'name-asc') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sort === 'name-desc') {
    result.sort((a, b) => b.name.localeCompare(a.name))
  } else if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price)
  } else if (sort === 'stock-low') {
    result.sort((a, b) => a.stockQuantity - b.stockQuantity)
  } else if (sort === 'stock-high') {
    result.sort((a, b) => b.stockQuantity - a.stockQuantity)
  } else {
    result.sort((a, b) => b.createdAt - a.createdAt)
  }

  return result
}

export function validateForm(data) {
  const errors = {}
  const name = data.name?.trim() || ''

  if (!name) {
    errors.name = 'Product name is required'
  } else if (name.length < 2) {
    errors.name = 'Name is too short (min 2 chars)'
  } else if (name.length > 100) {
    errors.name = 'Name too long (max 100 chars)'
  }

  if (!data.category) {
    errors.category = 'Please select a category'
  }

  const price = data.price
  if (price === '' || price === undefined || price === null) {
    errors.price = 'Price is required'
  } else if (isNaN(Number(price)) || Number(price) < 0) {
    errors.price = 'Enter a valid price'
  } else if (Number(price) > 1000000) {
    errors.price = 'Price cannot exceed ₹10,00,000'
  }

  const qty = data.stockQuantity
  if (qty === '' || qty === undefined || qty === null) {
    errors.stockQuantity = 'Stock quantity is required'
  } else if (!Number.isInteger(Number(qty)) || Number(qty) < 0) {
    errors.stockQuantity = 'Enter a valid quantity (≥ 0)'
  } else if (Number(qty) > 100000) {
    errors.stockQuantity = 'Quantity is too large'
  }

  if (data.description && data.description.length > 1000) {
    errors.description = 'Description cannot exceed 1000 chars'
  }

  return errors
}

export function fmtPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(price)
}

export function fmtDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function seedData() {
  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000

  return [
    {
      id: genId(),
      name: 'Logitech MX Keys Keyboard',
      category: 'Electronics',
      price: 8499,
      stockQuantity: 14,
      description: 'Wireless illuminated keyboard with tactile keystrokes and multi-device Bluetooth connectivity.',
      createdAt: now - 5 * oneDay,
    },
    {
      id: genId(),
      name: 'Office Chair - Mesh Back',
      category: 'Home & Garden',
      price: 12500,
      stockQuantity: 6,
      description: 'Ergonomic office chair with breathable mesh back and adjustable lumbar support.',
      createdAt: now - 4 * oneDay,
    },
    {
      id: genId(),
      name: 'Protein Whey Chocolate 1kg',
      category: 'Health & Beauty',
      price: 1899,
      stockQuantity: 0,
      description: 'High-protein whey formula with rich chocolate flavour for post-workout muscle recovery.',
      createdAt: now - 3 * oneDay,
    },
    {
      id: genId(),
      name: 'React Design Patterns Book',
      category: 'Books',
      price: 650,
      stockQuantity: 30,
      description: 'Comprehensive guide covering component architecture, state patterns, and best practices in React.',
      createdAt: now - 2 * oneDay,
    },
    {
      id: genId(),
      name: 'Stainless Steel Water Bottle',
      category: 'Sports & Outdoors',
      price: 799,
      stockQuantity: 8,
      description: 'Double-wall vacuum insulated water bottle that keeps drinks cold for 24 hours.',
      createdAt: now - oneDay,
    },
    {
      id: genId(),
      name: 'Arabica Dark Roast Coffee Beans',
      category: 'Food & Beverage',
      price: 950,
      stockQuantity: 22,
      description: 'Single-origin freshly roasted whole beans with rich dark chocolate and caramel notes.',
      createdAt: now,
    },
  ]
}
