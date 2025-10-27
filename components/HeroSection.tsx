'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-beige-50 via-white to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>

      {/* Background SVGs - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {/* Top Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 right-8 w-28 h-28 md:right-10 md:w-32 md:h-32 lg:w-48 lg:h-48 xl:top-20"
        >
          <Image
            src="/images/productonly/1.png"
            alt="Millet grain decoration"
            fill
            className="object-contain animate-float"
          />
        </motion.div>

        {/* Bottom Left Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 left-8 w-20 h-20 md:left-10 md:w-24 md:h-24 lg:w-36 lg:h-36"
        >
          <Image
            src="/images/productonly/2.png"
            alt="Millet leaf decoration"
            fill
            className="object-contain animate-float animation-delay-400"
          />
        </motion.div>

        {/* Bottom Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute bottom-16 right-12 w-24 h-24 md:right-16 md:w-28 md:h-28 lg:w-40 lg:h-40"
        >
          <Image
            src="/images/productonly/3.png"
            alt="Millet leaf decoration"
            fill
            className="object-contain animate-float animation-delay-600"
          />
        </motion.div>

        {/* Top Left Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-14 left-10 w-20 h-20 md:top-16 md:left-14 md:w-28 md:h-28 lg:w-36 lg:h-36"
        >
          <Image
            src="/images/productonly/4.png"
            alt="Millet leaf decoration"
            fill
            className="object-contain animate-float animation-delay-800"
          />
        </motion.div>
      </div>

      {/* Main Content Container - Mobile Optimized */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen py-4 sm:py-12 lg:py-0">

          {/* Content Side - Mobile Compact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 xl:col-span-5 space-y-3 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge - Compact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start space-x-2 text-primary-600"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                Premium Millet Products
              </span>
            </motion.div>

            {/* Main Heading - Single line on mobile */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-primary-900"
            >
              <span className="block sm:inline">Ancient Grains.</span>{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent block sm:inline">
                Built for Modern Families.
              </span>
            </motion.h1>

            {/* Description - Compact on mobile */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-none lg:max-w-lg mx-auto lg:mx-0"
            >
              Refreshing millet drinks designed for everyday energy and healthier living.
            </motion.p>

            {/* Buttons - Single row on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start"
            >
              <Link href="/products" className="btn-primary group flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-xs sm:text-sm lg:text-base">
                Shop Now
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="btn-secondary px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-xs sm:text-sm lg:text-base text-center">
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image Side - Much smaller on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-7 relative order-1 lg:order-2"
          >
            <div className="relative w-full h-[150px] sm:h-[250px] md:h-[350px] lg:h-[500px] xl:h-[600px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:max-w-none">
              {/* Main product image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-10 w-full h-auto"
              >
                <Image
                  src="/images/productonly/hero.png"
                  alt="Premium Millet Products"
                  width={600}
                  height={600}
                  className="object-contain drop-shadow-2xl w-full h-auto"
                  priority
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 50vw, 45vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}