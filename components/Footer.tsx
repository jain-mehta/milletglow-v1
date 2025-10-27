'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import toast from 'react-hot-toast'
import LogoImage from '@/public/images/banners/logo.png'
import { subscribeToNewsletter } from '@/lib/mailchimp'

const footerLinks = {
  explore: [
     { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ],
}

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/milletglow' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return toast.error('Please enter your email')

    setIsSubscribing(true)
    try {
      const result = await subscribeToNewsletter({ email, source: 'footer' })
      if (result.success) {
        toast.success('Subscribed successfully!')
        setEmail('')
      } else toast.error(result.error || 'Subscription failed')
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-[#1C170F] text-gray-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Tagline */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-32 h-12 md:w-48 md:h-24">
                <Image
                  src={LogoImage}
                  alt="Millet Glow Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Ancient Grains. Built for Modern Families.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4">Sign up for Newsletter</h4>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-center border border-amber-500 rounded-md overflow-hidden mb-6"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-gray-100 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="bg-amber-500 text-white px-4 py-2 text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-60"
              >
                {isSubscribing ? '...' : 'Subscribe'}
              </button>
            </form>

            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">Follow Us</h5>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2A2417] mt-12 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Millet Glow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
