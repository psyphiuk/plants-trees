export interface Partner {
  id: string
  code: string
  name: string
  email: string
  phone: string
  createdAt: string
  totalReferrals: number
  totalCommission: number
}

// Hardcoded partners for Phase 1
export const partners: Partner[] = [
  {
    id: '1',
    code: 'SHP001',
    name: 'Green Thumb Landscaping',
    email: 'contact@greenthumb.com',
    phone: '555-0101',
    createdAt: '2024-01-01',
    totalReferrals: 0,
    totalCommission: 0,
  },
  {
    id: '2',
    code: 'SHP002',
    name: 'Nature\'s Best Gardens',
    email: 'info@naturesbestgardens.com',
    phone: '555-0102',
    createdAt: '2024-01-15',
    totalReferrals: 0,
    totalCommission: 0,
  },
  {
    id: '3',
    code: 'SHP003',
    name: 'Sunset Nursery',
    email: 'sales@sunsetnursery.com',
    phone: '555-0103',
    createdAt: '2024-02-01',
    totalReferrals: 0,
    totalCommission: 0,
  },
  {
    id: 'demo',
    code: 'demo',
    name: 'Demo Partner',
    email: 'demo@southernhighfarms.com',
    phone: '555-0000',
    createdAt: '2024-01-01',
    totalReferrals: 0,
    totalCommission: 0,
  },
]

export function getPartnerByCode(code: string): Partner | undefined {
  return partners.find(p => p.code.toLowerCase() === code.toLowerCase())
}

export function generatePartnerUrl(code: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return `${baseUrl}/quote?partner=${code}`
}