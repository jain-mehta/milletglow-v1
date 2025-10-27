'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
import { LAZY_LOADING_CONFIG, CONTENT_LAZY_CONFIG } from '@/lib/performance'

interface LazyComponentProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export default function LazyComponent({
  children,
  fallback = <div className="min-h-[200px] bg-gray-50 animate-pulse" />,
  rootMargin = CONTENT_LAZY_CONFIG.CONTENT_SECTIONS,
  threshold = LAZY_LOADING_CONFIG.THRESHOLD_VISIBLE,
  className = ''
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold, hasLoaded])

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}