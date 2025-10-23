import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Millet Glow - Admin Panel',
  description: 'Content management system for Millet Glow',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.variable + ' font-sans'}>
      {/* Clean layout without navbar, footer, or WhatsApp icon */}
      {children}
    </div>
  )
}
  