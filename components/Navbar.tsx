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
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between w-full mt-1 px-4 sm:px-8 h-16 md:h-20">
        {/* ✅ Logo — shifted left and large */}
        <Link href="/" className="flex items-left justify-start flex-shrink-0 relative">
          <div className="relative w-36 h-14 md:w-44 md:h-12 lg:w-52 lg:h-24 ml-[-40px]">
            <Image
              src={LogoImage}
              alt="Millet Glow Logo"
              fill
              className="object-cover mt-1 lg:h-20"
              priority
            />
          </div>
        </Link>

        {/* ✅ Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between">
          {/* Left Group — close to Logo */}
          <div className="flex items-center space-x-6 lg:space-x-8 ml-6">
            {navigation.slice(0, 2).map((item) => {
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

          {/* Right Group — near Contact */}
          <div className="flex items-center space-x-6 lg:space-x-8 mr-6">
            {navigation.slice(2, 4).map((item) => {
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
        </div>

        {/* ✅ Contact Button — brown theme consistent */}
        <div className="hidden md:flex">
          <Link
            href="/contact"
            className={`px-5 py-2 font-medium rounded-full border transition-all duration-300 ${
              isScrolled
                ? 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
                : 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white backdrop-blur-sm'
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
                className="block px-3 py-2 mt-2 rounded-full text-base font-medium border border-primary-600 text-primary-600 text-center hover:bg-primary-600 hover:text-white transition-all"
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
