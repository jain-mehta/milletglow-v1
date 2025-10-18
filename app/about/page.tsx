'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Users, Heart, Leaf, Target, Eye } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-beige-50 to-white">
      <div className="container section-padding">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title text-primary-900 mb-4">
            About MiletGlow
          </h1>
          <p className="section-subtitle max-w-3xl mx-auto">
            Bringing you the finest organic millets from traditional farms to your modern kitchen,
            preserving ancient wisdom for contemporary wellness.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-serif text-primary-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  MiletGlow was born from a simple yet powerful vision: to revive the nutritional
                  treasures of our ancestors and make them accessible to modern families seeking
                  healthier lifestyle choices.
                </p>
                <p>
                  Founded with deep respect for traditional farming practices, we work directly
                  with organic farmers who have been cultivating millets for generations. Every
                  grain tells a story of sustainable agriculture and authentic nutrition.
                </p>
                <p>
                  Our journey began when we realized that despite millets being a superfood,
                  they were becoming forgotten in our daily diets. We made it our mission to
                  change that narrative.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-beige-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-24 h-24 text-primary-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="card p-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold font-serif text-primary-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To make premium organic millets accessible to every household, promoting healthier
                eating habits while supporting sustainable farming communities and preserving
                traditional agricultural wisdom.
              </p>
            </div>
            <div className="card p-8">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold font-serif text-primary-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the leading bridge between ancient nutritional wisdom and modern
                wellness needs, creating a world where healthy eating is accessible, sustainable,
                and deeply rooted in tradition.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold font-serif text-primary-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="card p-8 h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Organic Purity</h3>
                <p className="text-gray-700">
                  100% organic, chemical-free millets sourced directly from certified organic farms
                  using traditional farming methods.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="card p-8 h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Community Support</h3>
                <p className="text-gray-700">
                  Empowering small-scale farmers and rural communities through fair trade practices
                  and sustainable partnerships.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="card p-8 h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Quality Excellence</h3>
                <p className="text-gray-700">
                  Rigorous quality control and testing to ensure every product meets the highest
                  standards of nutrition and purity.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold font-serif text-primary-900 text-center mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2020
              </div>
              <div className="card p-6 flex-1">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Foundation</h3>
                <p className="text-gray-700">
                  Started MiletGlow with a vision to revive ancient grains and make them accessible
                  to modern families seeking healthier alternatives.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2021
              </div>
              <div className="card p-6 flex-1">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Partnerships</h3>
                <p className="text-gray-700">
                  Established direct partnerships with organic farmers across India, ensuring
                  fair trade and sustainable sourcing practices.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2022
              </div>
              <div className="card p-6 flex-1">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Product Range</h3>
                <p className="text-gray-700">
                  Expanded our product line to include various millet types, flours, and
                  ready-to-cook options, all maintaining our quality standards.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                2023
              </div>
              <div className="card p-6 flex-1">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Community Impact</h3>
                <p className="text-gray-700">
                  Reached over 10,000 families and supported 50+ farming communities, creating
                  a positive impact on health and livelihoods.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Founder's Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card p-12 bg-gradient-to-r from-primary-50 to-beige-50">
              <Heart className="w-12 h-12 text-primary-600 mx-auto mb-6" />
              <blockquote className="text-2xl font-medium text-primary-900 mb-6 italic">
                "Every grain of millet carries within it the wisdom of generations and the promise
                of a healthier future. Our role is simply to be the bridge between this ancient
                wisdom and modern wellness."
              </blockquote>
              <cite className="text-primary-700 font-semibold">
                — MiletGlow Founders
              </cite>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}