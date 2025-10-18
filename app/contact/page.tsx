'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Mumbai, Maharashtra', 'India - 400001'],
    color: 'text-blue-600'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 98765 43210', '+91 99999 88888'],
    color: 'text-green-600'
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@milletglow.com', 'support@milletglow.com'],
    color: 'text-purple-600'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
    color: 'text-orange-600'
  }
]

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210'

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi! I need help with your millet products.')
    const cleanPhoneNumber = whatsappNumber.replace(/[^\d+]/g, '')
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${message}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-beige-50 to-white">
      {/* Header */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="section-title text-primary-900 mb-4">
              Contact Us
            </h1>
            <p className="section-subtitle">
              We'd love to hear from you. Get in touch with our team for any questions or support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className={`${item.color} mb-4 flex justify-center`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">
                    {item.title}
                  </h3>
                  <div className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-beige-50 to-primary-50 rounded-2xl p-8">
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary-900 mb-6">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <ContactForm />
              </div>
            </motion.div>

            {/* Alternative Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* WhatsApp Quick Contact */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
                <div className="flex items-center space-x-4 mb-6">
                  <MessageCircle className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Quick WhatsApp Support</h3>
                </div>
                <p className="mb-6 text-green-100">
                  Need instant help? Chat with us on WhatsApp for immediate assistance.
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>

              {/* FAQ Section */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold font-serif text-primary-900 mb-6">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-primary-900 mb-2">
                      What are your delivery times?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We deliver within 3-5 business days across India. Express delivery available in major cities.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-primary-900 mb-2">
                      Are your products certified organic?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Yes, all our millet products are certified organic and undergo rigorous quality testing.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-primary-900 mb-2">
                      Do you offer bulk orders?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Yes, we provide special pricing for bulk orders. Contact us for wholesale inquiries.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-900 mb-2">
                      What's your return policy?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We offer a 30-day return policy for unopened products. Customer satisfaction is our priority.
                    </p>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-primary-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-primary-100 mb-6">
                  Subscribe to our newsletter for health tips, recipes, and exclusive offers.
                </p>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="section-padding bg-gray-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-8">
              Find Us
            </h2>

            {/* Placeholder for Google Map */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive map will be integrated here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}