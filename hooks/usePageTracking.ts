'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/gtag'

// Hook to track page views on route changes
export function usePageTracking() {
  const pathname = usePathname()

  useEffect(() => {
    // Only track if we're in the browser and have a pathname
    if (typeof window !== 'undefined' && pathname) {
      const url = window.location.origin + pathname
      trackPageView(url)
    }
  }, [pathname])
}

// Optional: You can add this to your main layout if you want automatic page tracking
// Just uncomment the hook call in your ClientLayoutWrapper or any client component