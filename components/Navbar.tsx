'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoImage from '@/public/images/banners/logo.png'

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Where to Buy', href: '/products' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="relative w-24 h-8 sm:w-28 sm:h-10 md:w-48 md:h-24">
              <Image
                src={LogoImage}
                alt="Millet Glow Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* ✅ Center Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium text-sm lg:text-base transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-600'
                      : isScrolled
                      ? 'text-gray-800 hover:text-primary-600'
                      : 'text-gray-800 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                      isActive
                        ? 'w-full bg-primary-600'
                        : 'w-0 group-hover:w-full bg-primary-600'
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          {/* ✅ Contact Button */}
          <div className="hidden md:flex">
            <Link
              href="/contact"
              className={`px-5 py-2 font-medium rounded-md transition-all duration-300 ${
                isScrolled
                  ? 'border border-primary-600 text-primary-600 hover:bg-primary-50'
                  : 'border border-white/20 bg-white/10 backdrop-blur-sm text-primary-700 hover:bg-white/20'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* ✅ Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                  : 'text-gray-800 hover:text-primary-600 hover:bg-white/10 backdrop-blur-sm'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-800 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-2 rounded-md text-base font-medium border border-amber-500 text-amber-600 text-center hover:bg-amber-50 transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
