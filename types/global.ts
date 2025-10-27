// Global type definitions for Millet Glow application

// Sanity types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  current: string
  _type: 'slug'
}

export interface SanityReference {
  _ref: string
  _type: 'reference'
}

// Product types
export interface Product {
  _id: string
  _type: 'product'
  name: string
  slug: SanitySlug
  price: number
  discount?: number
  image: SanityImage
  gallery?: SanityImage[]
  shortDescription?: string
  description?: any[] // Portable text
  benefits?: string[]
  nutritionFacts?: NutritionFacts
  certifications?: string[]
  ingredients?: string[]
  isOutOfStock: boolean
  isFeatured: boolean
  category?: string
  tags?: string[]
  _createdAt: string
  _updatedAt: string
}

export interface NutritionFacts {
  energy?: number
  protein?: number
  carbohydrates?: number
  fiber?: number
  fat?: number
  sodium?: number
  iron?: number
  calcium?: number
  servingSize?: string
}

// Blog types
export interface BlogPost {
  _id: string
  _type: 'blog'
  title: string
  slug: SanitySlug
  excerpt: string
  featuredImage?: SanityImage
  content?: any[] // Portable text
  publishedAt: string
  author: Author
  category?: string
  tags?: string[]
  readingTime?: number
  isFeatured: boolean
  isPublished: boolean
  seo?: SEOSettings
  _createdAt: string
  _updatedAt: string
}

export interface Author {
  _id: string
  name: string
  image?: SanityImage
  bio?: string
  email?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

// Testimonial types
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  customerName: string
  customerImage?: SanityImage
  rating: number
  reviewText: string
  reviewTitle?: string
  customerInfo?: {
    location?: string
    age?: number
    profession?: string
  }
  benefitsExperienced?: string[]
  isVerified: boolean
  isFeatured: boolean
  showOnHomepage: boolean
  status: 'pending' | 'approved' | 'rejected'
  relatedProducts?: SanityReference[]
  approvedAt?: string
  _createdAt: string
}

// Contact & Newsletter types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  recaptchaToken: string
}

export interface NewsletterSubscription {
  email: string
  name?: string
  interests?: string[]
  source?: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  errors?: Record<string, string>
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// SEO types
export interface SEOSettings {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: SanityImage
  ogTitle?: string
  ogDescription?: string
  twitterCard?: 'summary' | 'summary_large_image'
  canonicalUrl?: string
  noIndex?: boolean
}

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  canonicalUrl?: string
  structuredData?: Record<string, any>
}

// UI Component types
export interface LoadingState {
  isLoading: boolean
  error?: string | null
  data?: any
}

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
}

export interface MotionProps {
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  whileHover?: any
  whileInView?: any
  viewport?: any
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  validation?: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    custom?: (value: any) => boolean | string
  }
  options?: { value: string; label: string }[]
}

export interface FormErrors {
  [key: string]: string | undefined
}

// Analytics types
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

export interface TrackingData {
  page_title: string
  page_location: string
  user_id?: string
  session_id?: string
  custom_parameters?: Record<string, any>
}

// Performance types
export interface ImageOptimization {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  blur?: number
  priority?: boolean
}

export interface LazyLoadingConfig {
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
}

// Error types
export interface AppError extends Error {
  code?: string
  statusCode?: number
  details?: any
  timestamp?: string
}

export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

// Environment types
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test'
  NEXT_PUBLIC_SANITY_PROJECT_ID: string
  NEXT_PUBLIC_SANITY_DATASET: string
  SANITY_API_TOKEN?: string
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string
  RECAPTCHA_SECRET_KEY?: string
  NEXT_PUBLIC_WHATSAPP_NUMBER: string
  NEXT_PUBLIC_GA_ID?: string
  MAILCHIMP_API_KEY?: string
  MAILCHIMP_AUDIENCE_ID?: string
  MAILCHIMP_SERVER_PREFIX?: string
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Event handler types
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void
export type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
export type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void
export type KeyboardHandler = (event: React.KeyboardEvent<HTMLElement>) => void

// Export commonly used React types for convenience
export type {
  ReactNode,
  ReactElement,
  ComponentType,
  FC,
  MouseEvent,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from 'react'