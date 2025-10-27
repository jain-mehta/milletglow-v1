// Global configuration and constants

import { EnvironmentConfig } from '@/types/global'

// Environment configuration with type safety
export const env: EnvironmentConfig = {
  NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210',
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX,
}

// Performance configuration
export const PERFORMANCE_CONFIG = {
  // Image optimization
  IMAGE_QUALITY: {
    HIGH: 95,
    MEDIUM: 85,
    LOW: 75,
    THUMBNAIL: 60,
  },

  // Lazy loading
  LAZY_LOADING: {
    CONTENT_SECTIONS: '150px',
    PRODUCT_IMAGES: '100px',
    BLOG_IMAGES: '200px',
    THRESHOLD_VISIBLE: 0.1,
    THRESHOLD_PRELOAD: 0.3,
  },

  // Animation
  ANIMATION: {
    DURATION_FAST: 0.3,
    DURATION_NORMAL: 0.6,
    DURATION_SLOW: 1.0,
    STAGGER_DELAY: 0.1,
    SPRING_CONFIG: {
      stiffness: 100,
      damping: 15,
    },
  },

  // Caching
  CACHE_TTL: {
    STATIC_ASSETS: 60 * 60 * 24 * 30, // 30 days
    API_RESPONSES: 60 * 5, // 5 minutes
    IMAGES: 60 * 60 * 24 * 7, // 7 days
  },
} as const

// UI configuration
export const UI_CONFIG = {
  // Breakpoints (matching Tailwind)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },

  // Component limits
  LIMITS: {
    MAX_PRODUCTS_PER_PAGE: 12,
    MAX_BLOG_POSTS_PER_PAGE: 9,
    MAX_RELATED_ITEMS: 4,
    MAX_CERTIFICATIONS: 2,
    MAX_TAGS: 3,
  },

  // Default values
  DEFAULTS: {
    PRODUCT_IMAGE_SIZES: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    BLOG_IMAGE_SIZES: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    HERO_IMAGE_SIZES: '100vw',
  },
} as const

// API configuration
export const API_CONFIG = {
  // Endpoints
  ENDPOINTS: {
    CONTACT: '/api/contact',
    NEWSLETTER: '/api/newsletter/subscribe',
    PRODUCTS: '/api/products',
    BLOG: '/api/blog',
  },

  // Rate limiting
  RATE_LIMITS: {
    CONTACT_FORM: 5, // per 15 minutes
    NEWSLETTER: 10, // per hour
    API_GENERAL: 100, // per minute
  },

  // Timeouts
  TIMEOUTS: {
    DEFAULT: 10000, // 10 seconds
    UPLOAD: 30000, // 30 seconds
    LONG_RUNNING: 60000, // 1 minute
  },
} as const

// SEO configuration
export const SEO_CONFIG = {
  // Default meta tags
  DEFAULT_META: {
    TITLE: 'Millet Glow - Premium Organic Millet Products',
    DESCRIPTION: 'Nourish your body with the power of millet. Premium quality, organic millet products for a healthy lifestyle. Fast delivery across India.',
    KEYWORDS: ['millet', 'organic', 'healthy', 'nutrition', 'gluten-free', 'superfood'],
    OG_TYPE: 'website',
    TWITTER_CARD: 'summary_large_image',
  },

  // Structured data
  STRUCTURED_DATA: {
    ORGANIZATION: {
      '@type': 'Organization',
      name: 'Millet Glow',
      url: 'https://milletglow.com',
      logo: 'https://milletglow.com/images/logo.png',
      sameAs: [
        'https://facebook.com/milletglow',
        'https://instagram.com/milletglow',
        'https://twitter.com/milletglow',
      ],
    },
  },
} as const

// Analytics configuration
export const ANALYTICS_CONFIG = {
  // Google Analytics events
  EVENTS: {
    PRODUCT_VIEW: 'view_item',
    PRODUCT_INTEREST: 'generate_lead',
    CONTACT_SUBMIT: 'contact',
    NEWSLETTER_SIGNUP: 'sign_up',
    WHATSAPP_CLICK: 'click',
  },

  // Custom parameters
  CUSTOM_PARAMETERS: {
    PRODUCT_CATEGORY: 'item_category',
    PRODUCT_NAME: 'item_name',
    FORM_TYPE: 'form_type',
    SOURCE: 'source',
  },
} as const

// Error configuration
export const ERROR_CONFIG = {
  // Error types
  TYPES: {
    VALIDATION: 'VALIDATION_ERROR',
    NETWORK: 'NETWORK_ERROR',
    SERVER: 'SERVER_ERROR',
    CLIENT: 'CLIENT_ERROR',
    UNKNOWN: 'UNKNOWN_ERROR',
  },

  // Error messages
  MESSAGES: {
    GENERIC: 'An unexpected error occurred. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    VALIDATION: 'Please check your input and try again.',
    SERVER: 'Server error. Please try again later.',
    NOT_FOUND: 'The requested resource was not found.',
  },

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 1000,
    BACKOFF_MULTIPLIER: 2,
  },
} as const

// Security configuration
export const SECURITY_CONFIG = {
  // Content Security Policy
  CSP: {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google.com"],
    STYLE_SRC: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    IMG_SRC: ["'self'", "data:", "https://cdn.sanity.io", "https://www.googletagmanager.com"],
    FONT_SRC: ["'self'", "https://fonts.gstatic.com"],
    CONNECT_SRC: ["'self'", "https://api.sanity.io", "https://www.google-analytics.com"],
  },

  // Input sanitization
  SANITIZATION: {
    MAX_INPUT_LENGTH: 1000,
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    FORBIDDEN_PATTERNS: [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
    ],
  },
} as const

// Validation schemas
export const VALIDATION_CONFIG = {
  // Field validation
  PATTERNS: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[\+]?[1-9][\d]{0,15}$/,
    NAME: /^[a-zA-Z\s]{2,50}$/,
    SLUG: /^[a-z0-9-]+$/,
  },

  // Length limits
  LENGTHS: {
    NAME: { min: 2, max: 50 },
    EMAIL: { min: 5, max: 100 },
    PHONE: { min: 10, max: 15 },
    MESSAGE: { min: 10, max: 1000 },
    SUBJECT: { min: 5, max: 100 },
  },
} as const

// Development utilities
export const DEV_CONFIG = {
  // Debug flags
  DEBUG: {
    API_CALLS: env.NODE_ENV === 'development',
    PERFORMANCE: env.NODE_ENV === 'development',
    ERRORS: env.NODE_ENV === 'development',
    ANALYTICS: env.NODE_ENV === 'development',
  },

  // Mock data flags
  USE_MOCK_DATA: env.NODE_ENV === 'development' && process.env.USE_MOCK_DATA === 'true',

  // Performance monitoring
  MONITOR_PERFORMANCE: env.NODE_ENV !== 'production',
} as const

// Export helper functions
export const isProduction = (): boolean => env.NODE_ENV === 'production'
export const isDevelopment = (): boolean => env.NODE_ENV === 'development'
export const isTest = (): boolean => env.NODE_ENV === 'test'

// Validate required environment variables
export const validateEnvironment = (): void => {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}