'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, Building } from 'lucide-react'
import { sendContactMessage } from '@/lib/mailchimp'
import { trackContactSubmission } from '@/lib/gtag'
import toast from 'react-hot-toast'

// TypeScript declaration for reCAPTCHA v3
declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      ready: (callback: () => void) => void
    }
  }
}

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organizationType: '',
    customOrganization: '',
    message: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  // Get and validate reCAPTCHA site key
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  // Validate site key format
  const isValidSiteKey = recaptchaSiteKey &&
    recaptchaSiteKey.length > 20 &&
    (recaptchaSiteKey.startsWith('6L') || recaptchaSiteKey.startsWith('6I'))

  // Load reCAPTCHA v3 script
  useEffect(() => {
    if (!isValidSiteKey) return

    const loadRecaptcha = () => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
      script.async = true
      script.defer = true
      script.onload = () => {
        setRecaptchaLoaded(true)
      }
      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script')
        setErrors(prev => ({ ...prev, recaptcha: 'reCAPTCHA failed to load' }))
      }
      document.head.appendChild(script)
    }

    // Check if script is already loaded
    if (!document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      loadRecaptcha()
    } else {
      setRecaptchaLoaded(true)
    }

    // No cleanup needed - reCAPTCHA scripts should persist
  }, [isValidSiteKey, recaptchaSiteKey])

  // Execute reCAPTCHA v3
  const executeRecaptcha = async (): Promise<string | null> => {
    if (!recaptchaLoaded || !window.grecaptcha || !isValidSiteKey) {
      return null
    }

    try {
      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action: 'contact_form' })
      return token
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error)
      return null
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Real-time validation and sanitization
    let sanitizedValue = value

    // Sanitize phone input (only allow digits, format for Indian numbers)
    if (name === 'phone') {
      sanitizedValue = value.replace(/\D/g, '').slice(0, 10)
      // Real-time validation for Indian phone numbers
      if (sanitizedValue.length > 0 && !/^[6-9]/.test(sanitizedValue)) {
        // Don't update if first digit is invalid
        return
      }
    }

    // Sanitize name input (only allow letters, spaces, and common name characters)
    if (name === 'name') {
      sanitizedValue = value.replace(/[^a-zA-Z\s'-]/g, '').slice(0, 50)
      // Prevent multiple consecutive spaces
      sanitizedValue = sanitizedValue.replace(/\s{2,}/g, ' ')
    }

    // Sanitize email input (basic format validation)
    if (name === 'email') {
      sanitizedValue = value.toLowerCase().trim().slice(0, 100)
      // Remove invalid email characters
      sanitizedValue = sanitizedValue.replace(/[^a-zA-Z0-9@._+-]/g, '')
    }

    // Sanitize message input (remove potential script tags and limit length)
    if (name === 'message') {
      sanitizedValue = value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
        .replace(/[<>]/g, '') // Remove angle brackets
        .slice(0, 1000)
    }

    // Sanitize organization name
    if (name === 'customOrganization') {
      sanitizedValue = value.replace(/[^a-zA-Z0-9\s&.-]/g, '').slice(0, 50)
    }

    // Update form data and clear errors for this field
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Name validation - strict
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters'
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces'
    }

    // Email validation - strict
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const email = formData.email.trim()

      if (!emailRegex.test(email)) {
        newErrors.email = 'Enter a valid email address (e.g., name@domain.com)'
      } else if (email.length > 100) {
        newErrors.email = 'Email must be less than 100 characters'
      } else if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
        newErrors.email = 'Email format is invalid'
      } else if (email.split('@').length !== 2) {
        newErrors.email = 'Email must contain exactly one @ symbol'
      }
    }

    // Phone validation - strict Indian format
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '') // Remove non-digits
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        newErrors.phone = 'Enter a valid 10-digit Indian mobile number (starting with 6-9)'
      }
    }

    // Organization validation - strict
    if (!formData.organizationType) {
      newErrors.organizationType = 'Please select your organization type'
    }

    if (formData.organizationType === 'Others') {
      if (!formData.customOrganization.trim()) {
        newErrors.customOrganization = 'Please specify your organization type'
      } else if (formData.customOrganization.trim().length < 2) {
        newErrors.customOrganization = 'Organization type must be at least 2 characters'
      } else if (formData.customOrganization.trim().length > 50) {
        newErrors.customOrganization = 'Organization type must be less than 50 characters'
      }
    }

    // Message validation - strict
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }

    // reCAPTCHA v3 validation
    if (!isValidSiteKey) {
      newErrors.recaptcha = 'reCAPTCHA configuration error. Please contact support.'
    } else if (!recaptchaLoaded) {
      newErrors.recaptcha = 'reCAPTCHA is loading. Please wait a moment.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please correct the highlighted errors.')
      return
    }

    setIsSubmitting(true)

    try {
      // Execute reCAPTCHA v3 before sending
      const recaptchaToken = await executeRecaptcha()

      if (!recaptchaToken) {
        toast.error('reCAPTCHA verification failed. Please try again.')
        setIsSubmitting(false)
        return
      }

      const result = await sendContactMessage({
        ...formData,
        recaptchaToken
      })

      if (result.success) {
        toast.success('Message sent successfully! 🎉')

        // Track contact form submission in Google Analytics
        const organizationType = formData.organizationType === 'Others' ?
          formData.customOrganization : formData.organizationType
        trackContactSubmission(organizationType)

        setFormData({
          name: '',
          email: '',
          phone: '',
          organizationType: '',
          customOrganization: '',
          message: ''
        })
        setRecaptchaToken(null)
      } else {
        toast.error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <FormField
          label="Full Name *"
          icon={<User />}
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter your full name"
          required
        />

        {/* Email */}
        <FormField
          label="Email Address *"
          icon={<Mail />}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email address"
          required
        />

        {/* Phone */}
        <FormField
          label="Phone Number *"
          icon={<Phone />}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="Enter your phone number"
          required
        />

        {/* Organization Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-2">
            Organization Type *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              id="organizationType"
              name="organizationType"
              value={formData.organizationType}
              onChange={handleChange}
              className="input-field pl-10"
              required
            >
              <option value="">Select your organization type</option>
              <option value="University">University</option>
              <option value="School">School</option>
              <option value="Fitness Center">Fitness Center</option>
              <option value="Institution">Institution</option>
              <option value="Hospital">Hospital</option>
              <option value="Day Care">Day Care</option>
              <option value="Others">Others</option>
            </select>
          </div>
          {errors.organizationType && (
            <p className="text-sm text-red-500 mt-1">{errors.organizationType}</p>
          )}
        </motion.div>

        {/* Custom Organization */}
        {formData.organizationType === 'Others' && (
          <FormField
            label="Specify your organization *"
            icon={<Building />}
            name="customOrganization"
            value={formData.customOrganization}
            onChange={handleChange}
            error={errors.customOrganization}
            placeholder="Enter your organization type"
            required
          />
        )}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message * ({formData.message.length}/1000 characters)
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="input-field pl-3 resize-none"
              placeholder="Tell us how we can help you... (minimum 10 characters)"
            />
          </div>
          {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
          <p className="text-xs text-gray-500 mt-1">
            {formData.message.length < 10 ? `${10 - formData.message.length} more characters needed` :
             formData.message.length > 900 ? `${1000 - formData.message.length} characters remaining` : ''}
          </p>
        </motion.div>

        {/* reCAPTCHA v3 Status */}
        <div className="mt-4">
          {isValidSiteKey ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center space-x-2">
                {recaptchaLoaded ? (
                  <>
                    <span className="text-green-500">✓</span>
                    <span className="text-green-700 text-sm">Protected by reCAPTCHA</span>
                  </>
                ) : (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                    <span className="text-green-700 text-sm">Loading reCAPTCHA...</span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">
                ⚠️ reCAPTCHA configuration error. Site key: {recaptchaSiteKey ? 'Invalid format' : 'Missing'}
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Please check your environment variables or contact support.
              </p>
            </div>
          )}
          {errors.recaptcha && <p className="text-sm text-red-500 mt-1">{errors.recaptcha}</p>}
        </div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </motion.div>

        <p className="text-sm text-gray-500 text-center">* Required fields</p>
      </form>
    </div>
  )
}

/* ✅ Reusable Form Field Component */
function FormField({
  label,
  icon,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  isTextarea = false,
  required = false
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={5}
            className="input-field pl-3 resize-none"
            placeholder={placeholder}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className="input-field pl-10"
            placeholder={placeholder}
          />
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </motion.div>
  )
}
