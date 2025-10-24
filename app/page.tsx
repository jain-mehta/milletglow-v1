'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import WhyChooseUs from '@/components/WhyChooseUs'
import BenefitsSection from '@/components/BenefitsSection'
import Testimonials from '@/components/Testimonials'

export default function HomePage() {
  const marqueeText = "📦 For orders, click on the WhatsApp icon below! 💬 We’re happy to help you choose the best millet products!"

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Order Info Marquee */}
      <div className="bg-yellow-50 border-t border-b border-yellow-100 py-3 overflow-hidden relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          }}
        >
          {/* Create multiple copies for seamless scrolling */}
          {Array(6).fill(null).map((_, index) => (
            <span
              key={index}
              className="text-gray-800 font-medium text-base tracking-wide px-8 flex-shrink-0"
            >
              {marqueeText} •
            </span>
          ))}
        </motion.div>
      </div>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />
    </>
  )
}
