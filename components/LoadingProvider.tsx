'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'

interface LoadingProviderProps {
  children: React.ReactNode
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Minimum loading time for better UX
    const minLoadTime = 2000 // 2 seconds

    // Check if page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, minLoadTime)
    }

    // If document is already loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      // Wait for window load event
      window.addEventListener('load', handleLoad)

      // Fallback timeout in case load event doesn't fire
      const fallbackTimeout = setTimeout(() => {
        setIsLoading(false)
      }, 5000) // 5 seconds max

      return () => {
        window.removeEventListener('load', handleLoad)
        clearTimeout(fallbackTimeout)
      }
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && children}
    </>
  )
}