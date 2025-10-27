'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-beige-50 via-white to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>

      {/* Background SVGs - Responsive positioning */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-16 right-4 w-20 h-20 sm:top-20 sm:right-8 sm:w-28 sm:h-28 md:right-10 md:w-32 md:h-32 lg:w-48 lg:h-48 xl:top-20"
        >
          <Image
            src="/svgs/img5.svg"
            alt="Millet grain decoration"
            fill
            className="object-contain animate-float"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-16 left-4 w-16 h-16 sm:bottom-20 sm:left-8 sm:w-20 sm:h-20 md:left-10 md:w-24 md:h-24 lg:w-36 lg:h-36"
        >
          <Image
            src="/svgs/img6.svg"
            alt="Millet leaf decoration"
            fill
            className="object-contain animate-float animation-delay-400"
          />
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-0">

          {/* Content Side - Mobile First */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 xl:col-span-5 space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start space-x-2 text-primary-600"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                Premium Millet Products
              </span>
            </motion.div>

            {/* Main Heading - Responsive Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-primary-900"
            >
              Nourish Your Body with the{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Power of Millet
              </span>
            </motion.h1>

            {/* Description - Responsive sizing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-none lg:max-w-lg mx-auto lg:mx-0"
            >
              Discover our premium collection of organic millet products,
              carefully crafted to bring you nature's most nutritious superfood
              in its purest form.
            </motion.p>

            {/* Buttons - Responsive layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link href="/products" className="btn-primary group flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
                Shop Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="btn-secondary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-center">
                Learn More
              </Link>
            </motion.div>

            {/* Stats - Responsive grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-gray-200 max-w-md mx-auto lg:max-w-none"
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">100%</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Organic</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">1000+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">5★</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Reviews</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image Side - Responsive sizing */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-7 relative order-1 lg:order-2"
          >
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] xl:h-[600px] max-w-lg mx-auto lg:max-w-none">
              {/* Main product image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 z-10"
              >
                <Image
                  src="/svgs/img1.svg"
                  alt="Premium Millet Products"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 45vw"
                />
              </motion.div>

              {/* Floating elements - Responsive positioning */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-primary-100 rounded-full flex items-center justify-center animate-pulse-gentle shadow-lg"
              >
                <span className="text-primary-600 font-bold text-xs sm:text-sm">NEW</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 lg:bottom-10 lg:left-10 bg-white rounded-lg shadow-xl p-3 sm:p-4 animate-float max-w-[140px] sm:max-w-none"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
                    Fresh & Organic
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}