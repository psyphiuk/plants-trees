export interface Product {
  id: string
  category: 'trees' | 'shrubs' | 'perennials' | 'annuals' | 'grasses'
  name: string
  scientificName?: string
  sizes: ProductSize[]
  description: string
  sunRequirement: 'full-sun' | 'partial-shade' | 'full-shade'
  waterRequirement: 'low' | 'medium' | 'high'
  matureHeight?: string
  matureWidth?: string
  bloomTime?: string
  inStock: boolean
}

export interface ProductSize {
  size: string
  unit: string
  price: number
  minOrder?: number
}

export const products: Product[] = [
  // Trees
  {
    id: 'oak-live',
    category: 'trees',
    name: 'Live Oak',
    scientificName: 'Quercus virginiana',
    sizes: [
      { size: '15', unit: 'gallon', price: 85.00 },
      { size: '30', unit: 'gallon', price: 145.00 },
      { size: '45', unit: 'gallon', price: 225.00 },
      { size: '65', unit: 'gallon', price: 385.00 },
    ],
    description: 'Classic Southern shade tree with broad spreading canopy',
    sunRequirement: 'full-sun',
    waterRequirement: 'medium',
    matureHeight: '40-80 ft',
    matureWidth: '60-100 ft',
    inStock: true,
  },
  {
    id: 'magnolia-southern',
    category: 'trees',
    name: 'Southern Magnolia',
    scientificName: 'Magnolia grandiflora',
    sizes: [
      { size: '15', unit: 'gallon', price: 95.00 },
      { size: '30', unit: 'gallon', price: 165.00 },
      { size: '45', unit: 'gallon', price: 275.00 },
    ],
    description: 'Iconic evergreen with large fragrant white blooms',
    sunRequirement: 'full-sun',
    waterRequirement: 'medium',
    matureHeight: '60-80 ft',
    matureWidth: '30-50 ft',
    bloomTime: 'May-June',
    inStock: true,
  },
  {
    id: 'maple-red',
    category: 'trees',
    name: 'Red Maple',
    scientificName: 'Acer rubrum',
    sizes: [
      { size: '15', unit: 'gallon', price: 75.00 },
      { size: '30', unit: 'gallon', price: 135.00 },
      { size: '45', unit: 'gallon', price: 215.00 },
    ],
    description: 'Fast-growing shade tree with brilliant fall color',
    sunRequirement: 'full-sun',
    waterRequirement: 'medium',
    matureHeight: '40-60 ft',
    matureWidth: '25-35 ft',
    inStock: true,
  },
  {
    id: 'crepe-myrtle',
    category: 'trees',
    name: 'Crepe Myrtle',
    scientificName: 'Lagerstroemia indica',
    sizes: [
      { size: '7', unit: 'gallon', price: 35.00 },
      { size: '15', unit: 'gallon', price: 65.00 },
      { size: '30', unit: 'gallon', price: 125.00 },
    ],
    description: 'Colorful flowering tree perfect for Southern landscapes',
    sunRequirement: 'full-sun',
    waterRequirement: 'low',
    matureHeight: '15-25 ft',
    matureWidth: '10-15 ft',
    bloomTime: 'Summer-Fall',
    inStock: true,
  },
  {
    id: 'cypress-bald',
    category: 'trees',
    name: 'Bald Cypress',
    scientificName: 'Taxodium distichum',
    sizes: [
      { size: '15', unit: 'gallon', price: 85.00 },
      { size: '30', unit: 'gallon', price: 155.00 },
      { size: '45', unit: 'gallon', price: 245.00 },
    ],
    description: 'Native deciduous conifer, excellent for wet areas',
    sunRequirement: 'full-sun',
    waterRequirement: 'high',
    matureHeight: '50-70 ft',
    matureWidth: '20-30 ft',
    inStock: true,
  },

  // Shrubs
  {
    id: 'azalea-encore',
    category: 'shrubs',
    name: 'Encore Azalea',
    scientificName: 'Rhododendron',
    sizes: [
      { size: '3', unit: 'gallon', price: 18.00, minOrder: 10 },
      { size: '7', unit: 'gallon', price: 32.00 },
      { size: '15', unit: 'gallon', price: 55.00 },
    ],
    description: 'Reblooming azalea with spring and fall flowers',
    sunRequirement: 'partial-shade',
    waterRequirement: 'medium',
    matureHeight: '4-5 ft',
    matureWidth: '3-4 ft',
    bloomTime: 'Spring & Fall',
    inStock: true,
  },
  {
    id: 'gardenia-augusta',
    category: 'shrubs',
    name: 'Gardenia',
    scientificName: 'Gardenia augusta',
    sizes: [
      { size: '3', unit: 'gallon', price: 22.00, minOrder: 10 },
      { size: '7', unit: 'gallon', price: 38.00 },
    ],
    description: 'Fragrant white blooms, glossy evergreen foliage',
    sunRequirement: 'partial-shade',
    waterRequirement: 'medium',
    matureHeight: '4-6 ft',
    matureWidth: '3-4 ft',
    bloomTime: 'May-July',
    inStock: true,
  },
  {
    id: 'viburnum-sweet',
    category: 'shrubs',
    name: 'Sweet Viburnum',
    scientificName: 'Viburnum odoratissimum',
    sizes: [
      { size: '3', unit: 'gallon', price: 16.00, minOrder: 10 },
      { size: '7', unit: 'gallon', price: 28.00 },
      { size: '15', unit: 'gallon', price: 48.00 },
    ],
    description: 'Dense evergreen hedge, fragrant white flowers',
    sunRequirement: 'full-sun',
    waterRequirement: 'medium',
    matureHeight: '10-20 ft',
    matureWidth: '8-15 ft',
    bloomTime: 'Spring',
    inStock: true,
  },
  {
    id: 'boxwood-japanese',
    category: 'shrubs',
    name: 'Japanese Boxwood',
    scientificName: 'Buxus microphylla japonica',
    sizes: [
      { size: '1', unit: 'gallon', price: 12.00, minOrder: 25 },
      { size: '3', unit: 'gallon', price: 20.00, minOrder: 10 },
      { size: '7', unit: 'gallon', price: 35.00 },
    ],
    description: 'Classic evergreen for formal hedges and topiary',
    sunRequirement: 'partial-shade',
    waterRequirement: 'medium',
    matureHeight: '3-4 ft',
    matureWidth: '3-4 ft',
    inStock: true,
  },

  // Perennials
  {
    id: 'daylily-stella',
    category: 'perennials',
    name: 'Stella de Oro Daylily',
    scientificName: 'Hemerocallis',
    sizes: [
      { size: '1', unit: 'gallon', price: 8.00, minOrder: 25 },
      { size: '3', unit: 'gallon', price: 14.00, minOrder: 10 },
    ],
    description: 'Reblooming golden yellow flowers all summer',
    sunRequirement: 'full-sun',
    waterRequirement: 'medium',
    matureHeight: '12-18 in',
    matureWidth: '12-18 in',
    bloomTime: 'Summer-Fall',
    inStock: true,
  },
  {
    id: 'hosta-blue',
    category: 'perennials',
    name: 'Blue Angel Hosta',
    scientificName: 'Hosta',
    sizes: [
      { size: '1', unit: 'gallon', price: 10.00, minOrder: 25 },
      { size: '3', unit: 'gallon', price: 18.00, minOrder: 10 },
    ],
    description: 'Large blue-green leaves for shade gardens',
    sunRequirement: 'full-shade',
    waterRequirement: 'medium',
    matureHeight: '24-36 in',
    matureWidth: '36-48 in',
    inStock: true,
  },
  {
    id: 'salvia-mystic',
    category: 'perennials',
    name: 'Mystic Spires Salvia',
    scientificName: 'Salvia',
    sizes: [
      { size: '1', unit: 'gallon', price: 9.00, minOrder: 25 },
      { size: '3', unit: 'gallon', price: 15.00, minOrder: 10 },
    ],
    description: 'Long-blooming purple spikes, drought tolerant',
    sunRequirement: 'full-sun',
    waterRequirement: 'low',
    matureHeight: '18-24 in',
    matureWidth: '18-24 in',
    bloomTime: 'Spring-Fall',
    inStock: true,
  },

  // Annuals
  {
    id: 'petunia-wave',
    category: 'annuals',
    name: 'Wave Petunias',
    sizes: [
      { size: '4', unit: 'inch pot', price: 3.50, minOrder: 48 },
      { size: '6', unit: 'inch pot', price: 6.00, minOrder: 24 },
    ],
    description: 'Spreading petunias in assorted colors',
    sunRequirement: 'full-sun',
    waterRequirement: 'medium',
    matureHeight: '6-8 in',
    matureWidth: '24-36 in',
    bloomTime: 'Spring-Fall',
    inStock: true,
  },
  {
    id: 'begonia-dragon',
    category: 'annuals',
    name: 'Dragon Wing Begonia',
    sizes: [
      { size: '4', unit: 'inch pot', price: 4.00, minOrder: 48 },
      { size: '6', unit: 'inch pot', price: 7.00, minOrder: 24 },
    ],
    description: 'Heat-tolerant with red or pink flowers',
    sunRequirement: 'partial-shade',
    waterRequirement: 'medium',
    matureHeight: '12-18 in',
    matureWidth: '12-18 in',
    bloomTime: 'Spring-Fall',
    inStock: true,
  },
  {
    id: 'impatiens-sunpatiens',
    category: 'annuals',
    name: 'SunPatiens',
    sizes: [
      { size: '4', unit: 'inch pot', price: 4.50, minOrder: 48 },
      { size: '6', unit: 'inch pot', price: 7.50, minOrder: 24 },
    ],
    description: 'Sun-tolerant impatiens with continuous blooms',
    sunRequirement: 'full-sun',
    waterRequirement: 'high',
    matureHeight: '14-20 in',
    matureWidth: '14-20 in',
    bloomTime: 'Spring-Fall',
    inStock: true,
  },

  // Ornamental Grasses
  {
    id: 'muhly-pink',
    category: 'grasses',
    name: 'Pink Muhly Grass',
    scientificName: 'Muhlenbergia capillaris',
    sizes: [
      { size: '1', unit: 'gallon', price: 12.00, minOrder: 25 },
      { size: '3', unit: 'gallon', price: 20.00, minOrder: 10 },
      { size: '7', unit: 'gallon', price: 35.00 },
    ],
    description: 'Stunning pink plumes in fall',
    sunRequirement: 'full-sun',
    waterRequirement: 'low',
    matureHeight: '3-4 ft',
    matureWidth: '3-4 ft',
    bloomTime: 'Fall',
    inStock: true,
  },
  {
    id: 'pampas-grass',
    category: 'grasses',
    name: 'Pampas Grass',
    scientificName: 'Cortaderia selloana',
    sizes: [
      { size: '3', unit: 'gallon', price: 18.00, minOrder: 10 },
      { size: '7', unit: 'gallon', price: 32.00 },
      { size: '15', unit: 'gallon', price: 55.00 },
    ],
    description: 'Dramatic white plumes, excellent specimen plant',
    sunRequirement: 'full-sun',
    waterRequirement: 'low',
    matureHeight: '6-10 ft',
    matureWidth: '4-6 ft',
    bloomTime: 'Late Summer-Fall',
    inStock: true,
  },
  {
    id: 'fountain-grass',
    category: 'grasses',
    name: 'Fountain Grass',
    scientificName: 'Pennisetum alopecuroides',
    sizes: [
      { size: '1', unit: 'gallon', price: 10.00, minOrder: 25 },
      { size: '3', unit: 'gallon', price: 16.00, minOrder: 10 },
    ],
    description: 'Graceful arching foliage with bottlebrush plumes',
    sunRequirement: 'full-sun',
    waterRequirement: 'medium',
    matureHeight: '3-4 ft',
    matureWidth: '3-4 ft',
    bloomTime: 'Summer-Fall',
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.scientificName?.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  )
}