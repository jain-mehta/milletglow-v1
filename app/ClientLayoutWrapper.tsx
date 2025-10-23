'use client'

import { usePathname } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import LoadingProvider from '@/components/LoadingProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminPanel = pathname?.startsWith('/adminpanel')

  return (
    <LoadingProvider>
      {!isAdminPanel && <Navbar />}

      <main className="min-h-screen">{children}</main>

      {!isAdminPanel && (
        <>
          <Footer />
          <WhatsAppFloat />
        </>
      )}

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
  )
}
