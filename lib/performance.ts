// Performance optimization utilities and configurations

import { ImageOptimization, LazyLoadingConfig } from '@/types/global'

export const LAZY_LOADING_CONFIG: LazyLoadingConfig = {
  rootMargin: '150px',
  threshold: 0.1,
  triggerOnce: true,
} as const

export const CONTENT_LAZY_CONFIG = {
  CONTENT_SECTIONS: '150px',
  PRODUCT_IMAGES: '100px',
  BLOG_IMAGES: '200px',
  HERO_PRELOAD: '0px',
  THRESHOLD_VISIBLE: 0.1,
  THRESHOLD_PRELOAD: 0.3,
} as const

export const IMAGE_CONFIG = {
  THUMBNAIL_QUALITY: 60,
  MEDIUM_QUALITY: 75,
  HIGH_QUALITY: 85,
  WEBP_QUALITY: 80,
  HERO_QUALITY: 95,
  PRODUCT_QUALITY: 85,
  BLOG_QUALITY: 80,
  // Blur data URL for smooth loading
  BLUR_DATA_URL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
} as const

export const RESPONSIVE_BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

export const IMAGE_SIZES = {
  HERO: '100vw',
  PRODUCT_CARD: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  BLOG_CARD: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  PRODUCT_GALLERY: '(max-width: 768px) 100vw, 80vw',
  THUMBNAIL: '150px',
} as const

export const DYNAMIC_IMPORT_CONFIG = {
  // Loading states for dynamic components
  LOADING_DELAY: 200,        // Delay before showing loading state
  LOADING_MIN_TIME: 500,     // Minimum time to show loading state
} as const

// Performance monitoring utilities
export const performanceObserver = {
  observe: (entryTypes: string[], callback: (entries: PerformanceEntry[]) => void) => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          callback(list.getEntries())
        })
        observer.observe({ entryTypes })
        return observer
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Performance observer not supported:', error)
        }
      }
    }
    return null
  }
}

// Image optimization helper
export const optimizeImageUrl = (
  url: string,
  options: ImageOptimization = {}
): string => {
  const {
    width,
    height,
    quality = IMAGE_CONFIG.MEDIUM_QUALITY,
    format = 'webp'
  } = options

  // If it's a Sanity URL, use Sanity's optimization
  if (url.includes('cdn.sanity.io')) {
    const params = new URLSearchParams()
    if (width) params.set('w', width.toString())
    if (height) params.set('h', height.toString())
    params.set('q', quality.toString())
    params.set('fm', format)
    params.set('fit', 'crop')
    params.set('auto', 'format')

    return `${url}?${params.toString()}`
  }

  return url
}

// Lazy loading utilities
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: LAZY_LOADING_CONFIG.rootMargin,
    threshold: LAZY_LOADING_CONFIG.threshold,
    ...options
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Web Vitals helpers
export const webVitals = {
  // Core Web Vitals thresholds
  thresholds: {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  },

  // Get Core Web Vitals rating
  getRating: (metric: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const threshold = webVitals.thresholds[metric as keyof typeof webVitals.thresholds]
    if (!threshold) return 'good'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }
}