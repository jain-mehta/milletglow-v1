'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import RelatedBlogs from '@/components/RelatedBlogs'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-primary-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20">
        
        {/* 🌾 Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-wide text-primary-600 mb-2">
              The Glow Philosophy <br/>Where wellness meets conscious energy

            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 leading-tight">
              Ancient Grains. Built<br /> for Modern Families.
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
              At <span className="font-semibold text-primary-700">Millet Glow</span>, we bring the natural goodness of millets into a refreshing, modern drink. 
              Our beverages are crafted to provide clean, balanced nutrition that keeps you energized throughout the day.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 rounded-full transition-all flex items-center gap-2 inline-flex shadow-sm hover:shadow-md"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/images/banners/About us page.png"
              alt="Millet Glow Product"
              width={520}
              height={420}
              className="object-contain shadow-md"
            />
          </motion.div>
        </div>

        {/* 🌱 Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              What Our Founder Says
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-semibold text-primary-700">Millet Glow</span> began with a belief that the superfoods India has relied on for generations 
              should be part of everyday life again. Millets are wholesome, sustainable, and deeply rooted in our food culture.
            </p>
          </div>
        </motion.div>

        {/* 🌾 Our Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 ">
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our journey started with a mission to create drinks that nourish people and the planet. 
              We celebrate India’s rich food heritage while making health simple and enjoyable for modern families.
            </p>

            <div className="mt-6 space-y-2 text-gray-700 leading-relaxed text-lg">
              <p className="font-semibold text-primary-700">Why People Trust Millet Glow</p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Made from premium millets</li>
                <li>Rich in protein, fiber, and essential minerals</li>
                <li>Naturally gluten-free</li>
                <li>Sustainably sourced</li>
                <li>Great taste with everyday convenience</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 📖 Related Blogs Section */}
      <RelatedBlogs
        currentBlogSlug=""
        title="Learn More About Millet"
        showViewAll={true}
      />
    </div>
  )
}
