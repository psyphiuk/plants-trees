import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.scss'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Southern High Farms - Wholesale Plants & Trees',
  description: 'Quality wholesale plants and trees for landscaping professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body>{children}</body>
    </html>
  )
}