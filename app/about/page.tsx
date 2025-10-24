'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import RelatedBlogs from '@/components/RelatedBlogs'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
              About
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
              Nourishing Wellness, <br /> One Sip at a Time
            </h1>
            <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
              At Millet Glow, we blend ancient grains with modern nutrition to create
              drinks that feed your body and brighten your glow. Clean ingredients,
              transparent sourcing, and recipes inspired by tradition.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-5 py-2.5 rounded-full transition-all flex items-center gap-2 inline-flex"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="border border-gray-300 hover:bg-gray-100 px-5 py-2.5 rounded-full text-gray-800 font-medium transition-all">
                Our Story
              </button>
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
              src="/images/banners/temp.png"
              alt="Millet Glow Product"
              width={400}
              height={400}
              className="rounded-xl object-contain"
            />
          </motion.div>
        </div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-white/70 rounded-2xl shadow-sm p-8 md:p-10 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What our Founder says
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Born from the idea of bringing millet’s natural goodness back to
              daily lives, Millet Glow started with farmers across India who’ve
              been growing grains for generations. We’re committed to embracing
              clean sourcing, sustainable processes, and real nutrition — one
              sip at a time.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              We believe real food should be simple, honest, and joyful. That belief
              guides every recipe and every connection we make — from field to cup.
            </p>
          </div>
        </motion.div>

        {/* Our Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
          <div className="bg-white/70 rounded-2xl shadow-sm p-8 md:p-10 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              From the love of sharing millet’s natural goodness back to daily
              life, we started Millet Glow with a mission to empower farmers and
              make healthy, wholesome drinks that celebrate India’s rich food
              heritage.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              We believe real food should be simple, honest, and joyful. That belief
              guides every recipe and every connection we make — from field to cup.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Related Blogs Section */}
      <RelatedBlogs
        currentBlogSlug=""
        title="Learn More About Millet"
        showViewAll={true}
      />
    </div>
  )
}
