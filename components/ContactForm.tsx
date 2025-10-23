'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User, Mail, Phone, MessageSquare, Building } from 'lucide-react'
import { sendContactMessage } from '@/lib/mailchimp'
import toast from 'react-hot-toast'
import ReCAPTCHA from 'react-google-recaptcha'

interface ContactFormProps {
  className?: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    organizationType: '',
    customOrganization: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' })) // clear error on typing
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian phone number'
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required'

    if (!formData.organizationType) newErrors.organizationType = 'Please select your organization type'
    if (formData.organizationType === 'Others' && !formData.customOrganization.trim())
      newErrors.customOrganization = 'Please specify your organization type'

    if (!recaptchaToken) newErrors.recaptcha = 'Please verify you are not a robot'

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
      const result = await sendContactMessage({
        ...formData,
        recaptchaToken: recaptchaToken as string
      })

      if (result.success) {
        toast.success('Message sent successfully! 🎉')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          organizationType: '',
          customOrganization: ''
        })
        setRecaptchaToken(null)
      } else {
        toast.error(result.error || 'Failed to send message')
      }
    } catch (error) {
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

        {/* Subject */}
        <FormField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this regarding?"
        />

        {/* Message */}
        <FormField
          label="Message *"
          icon={<MessageSquare />}
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="Tell us how we can help you..."
          isTextarea
          required
        />

        {/* reCAPTCHA */}
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            onChange={token => setRecaptchaToken(token)}
          />
        </div>
        {errors.recaptcha && <p className="text-sm text-red-500 text-center">{errors.recaptcha}</p>}

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
            className="input-field pl-10 resize-none"
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
