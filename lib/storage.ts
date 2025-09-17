import { Product, ProductSize } from './products'

export interface QuoteItem {
  product: Product
  selectedSize: ProductSize
  quantity: number
}

export interface Quote {
  id: string
  partnerCode?: string
  createdAt: string
  status: 'pending' | 'contacted' | 'completed'
  language: string
  contact: {
    firstName: string
    lastName: string
    company: string
    email: string
    phone: string
  }
  delivery: {
    streetAddress: string
    city: string
    state: string
    zipCode: string
    date?: string
    notes?: string
  }
  items: QuoteItem[]
  total: number
}

const QUOTES_KEY = 'shf_quotes'
const PARTNER_KEY = 'shf_partner'
const CURRENT_QUOTE_KEY = 'shf_current_quote'

export function savePartnerCode(code: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PARTNER_KEY, code)
  }
}

export function getPartnerCode(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(PARTNER_KEY)
  }
  return null
}

export function saveQuote(quote: Quote) {
  if (typeof window !== 'undefined') {
    const quotes = getQuotes()
    quotes.push(quote)
    localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes))
  }
}

export function getQuotes(): Quote[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(QUOTES_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return []
      }
    }
  }
  return []
}

export function getQuoteById(id: string): Quote | undefined {
  const quotes = getQuotes()
  return quotes.find(q => q.id === id)
}

export function updateQuoteStatus(id: string, status: Quote['status']) {
  const quotes = getQuotes()
  const quoteIndex = quotes.findIndex(q => q.id === id)
  if (quoteIndex !== -1) {
    quotes[quoteIndex].status = status
    localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes))
  }
}

export function saveCurrentQuoteItems(items: QuoteItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_QUOTE_KEY, JSON.stringify(items))
  }
}

export function getCurrentQuoteItems(): QuoteItem[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(CURRENT_QUOTE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return []
      }
    }
  }
  return []
}

export function clearCurrentQuote() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_QUOTE_KEY)
  }
}

export function generateQuoteId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `Q${timestamp}${random}`
}

export function calculateQuoteTotal(items: QuoteItem[]): number {
  return items.reduce((total, item) => {
    return total + (item.selectedSize.price * item.quantity)
  }, 0)
}

export function exportQuotesToCSV(): string {
  const quotes = getQuotes()
  if (quotes.length === 0) return ''

  const headers = [
    'Quote ID',
    'Date',
    'Status',
    'Partner',
    'Name',
    'Company',
    'Email',
    'Phone',
    'Delivery Address',
    'Total',
  ]

  const rows = quotes.map(quote => [
    quote.id,
    quote.createdAt,
    quote.status,
    quote.partnerCode || '',
    `${quote.contact.firstName} ${quote.contact.lastName}`,
    quote.contact.company,
    quote.contact.email,
    quote.contact.phone,
    `${quote.delivery.streetAddress}, ${quote.delivery.city}, ${quote.delivery.state} ${quote.delivery.zipCode}`,
    `$${quote.total.toFixed(2)}`,
  ])

  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')

  return csv
}