import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import LoadingProvider from '@/components/LoadingProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Millet Glow - Premium Organic Millet Products',
  description: 'Nourish your body with the power of millet. Premium quality, organic millet products for a healthy lifestyle. Fast delivery across India.',
  keywords: 'millet, organic, healthy food, nutrition, gluten-free, superfood, millet products, health food',
  authors: [{ name: 'Millet Glow' }],
  creator: 'Millet Glow',
  publisher: 'Millet Glow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://milletglow.com'),
  openGraph: {
    title: 'Millet Glow - Premium Organic Millet Products',
    description: 'Nourish your body with the power of millet. Premium quality, organic millet products for a healthy lifestyle.',
    url: 'https://milletglow.com',
    siteName: 'Millet Glow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Millet Glow - Premium Organic Millet Products',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Millet Glow - Premium Organic Millet Products',
    description: 'Nourish your body with the power of millet. Premium quality, organic millet products for a healthy lifestyle.',
    images: ['/og-image.jpg'],
    creator: '@milletglow',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <LoadingProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '8px',
                padding: '12px 16px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </LoadingProvider>
      </body>
    </html>
  )
}