// Performance optimization configuration
export const LAZY_LOADING_CONFIG = {
  // Intersection Observer root margins
  CONTENT_SECTIONS: '150px', // Load content 150px before it comes into view
  PRODUCT_IMAGES: '100px',   // Load product images 100px before view
  HERO_SECTIONS: '200px',    // Load hero sections 200px before view

  // Intersection Observer thresholds
  THRESHOLD_VISIBLE: 0.1,    // Trigger when 10% visible
  THRESHOLD_IMAGES: 0.05,    // Trigger images when 5% visible
} as const

export const IMAGE_CONFIG = {
  // Image quality settings
  PRODUCT_QUALITY: 75,       // Product images quality
  THUMBNAIL_QUALITY: 60,     // Thumbnail quality for better performance
  HERO_QUALITY: 85,          // Hero image quality

  // Image sizes for responsive loading
  PRODUCT_SIZES: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  HERO_SIZES: '100vw',
  THUMBNAIL_SIZES: '150px',

  // Blur data URL for smooth loading
  BLUR_DATA_URL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
} as const

export const DYNAMIC_IMPORT_CONFIG = {
  // Loading states for dynamic components
  LOADING_DELAY: 200,        // Delay before showing loading state
  LOADING_MIN_TIME: 500,     // Minimum time to show loading state
} as const