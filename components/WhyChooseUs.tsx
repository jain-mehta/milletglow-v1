'use client'

import { motion } from 'framer-motion'
import { Leaf, Award, Truck, Shield } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: '100 Percent Natural Ingredients',
    description: 'Grown without harmful pesticides or chemicals, ensuring pure nutrition',
    color: 'text-green-600',
  },
  {
    icon: Award,
    title: 'Premium Quality Millets',
    description: 'Carefully selected and processed to maintain highest nutritional value',
    color: 'text-yellow-600',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to get fresh products to your doorstep',
    color: 'text-blue-600',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Rigorous testing and quality control for your peace of mind',
    color: 'text-purple-600',
  },
]

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-beige-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Why Choose Millet Glow
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the difference with our commitment to quality, sustainability, and your wellbeing
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="relative bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-12 h-12" />
                  </div>

                  <h3 className="text-lg font-semibold text-primary-900">{feature.title}</h3>

                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary-200 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
