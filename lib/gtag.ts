// Google Analytics utility functions

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

// Custom event tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Page view tracking
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
    })
  }
}

// Contact form submission tracking
export const trackContactSubmission = (organizationType: string) => {
  trackEvent('contact_form_submit', 'engagement', organizationType)
}

// Product interest tracking
export const trackProductInterest = (productName: string) => {
  trackEvent('product_interest', 'engagement', productName)
}

// WhatsApp click tracking
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'contact', 'whatsapp_button')
}

// Declare gtag types for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: {
        page_location?: string
        page_title?: string
        event_category?: string
        event_label?: string
        value?: number
      }
    ) => void
  }
}