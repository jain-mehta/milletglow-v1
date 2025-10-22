'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'
import { subscribeToNewsletter } from '@/lib/mailchimp'
import toast from 'react-hot-toast'
import Image from 'next/image'
import LogoImage from '@/public/images/banners/logo.png'

const footerLinks = {
  products: [
    { name: 'Millet Powder', href: '/products?category=millet-powder' },
    { name: 'Millet Grains', href: '/products?category=millet-grain' },
    { name: 'Millet Snacks', href: '/products?category=millet-snacks' },
    { name: 'Millet Beverages', href: '/products?category=millet-beverages' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about#story' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/milletglow' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/milletglow' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/milletglow' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsSubscribing(true)

    try {
      const result = await subscribeToNewsletter({
        email,
        source: 'homepage-footer'
      })

      if (result.success) {
        toast.success('Subscribed to newsletter successfully! 🌾')
        setEmail('')
      } else {
        toast.error(result.error || 'Subscription failed')
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-beige-100 to-beige-200">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative w-36 h-16 md:w-48 md:h-24">
                <Image
                  src={LogoImage}
                  alt="Millet Glow Logo"
                  fill
                  className="object-cover "
                />
              </div>
            </Link>

            <p className="text-gray-600 mb-6 max-w-md">
              Nourish your body with the power of millet. We provide premium quality, organic millet products to support your healthy lifestyle journey.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-primary-600" />
                <span>info@milletglow.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5 text-primary-600" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-primary-600" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary-800 mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-primary-800 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section (Moved Here) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h4 className="text-lg font-semibold text-primary-800 mb-4">Newsletter</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Join our community for millet recipes, nutrition tips, and exclusive offers.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-field w-full"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Social Links + Copyright */}
        <div className="border-t border-beige-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Millet Glow. All rights reserved.
            </div>


            <div className="flex space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
