'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/banners/temp1.jpg"
          alt="Millet Glow Products"
          fill
          priority
          className="object-cover opacity-70"
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/30 to-white/70"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm"
        >
          Nourish Your Body with <br />
          <span className="text-primary-600">the Power of Millet</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 max-w-2xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed"
        >
          Discover the ancient grain that’s revolutionizing modern nutrition.
          Millet Glow offers a range of delicious, health-boosting products
          crafted with care and expertise.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-full flex items-center justify-center gap-2 hover:bg-primary-700 transition-all duration-300 group shadow-md"
          >
            Shop Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/about"
            className="px-6 py-3 border border-primary-600 text-primary-600 font-medium rounded-full hover:bg-primary-50 transition-all duration-300 shadow-sm"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
