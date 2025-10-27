'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Package, CheckCircle } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const steps = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "Browse Drinks",
    description: "Explore our range of millet beverages and choose your favorite flavors.",
    color: "bg-blue-500"
  },
  {
    id: 2,
    icon: FaWhatsapp,
    title: "Click WhatsApp Icon",
    description: "Begin your order instantly through WhatsApp.",
    color: "bg-green-500"
  },
  {
    id: 3,
    icon: Package,
    title: " Share Your Details",
    description: "Send your preferred drink, quantity, and delivery address.",
    color: "bg-orange-500"
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Complete Purchase",
    description: "We confirm your order and deliver fast to your doorstep",
    color: "bg-purple-500"
  }
]

export default function HowToBuy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-primary-900">
            How to Buy Our Drinks
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Getting your favorite Millet Glow drinks is simple and convenient.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon

            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {step.description}
                  </p>
                </div>

                {/* Connector Arrow (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary-300 to-primary-500"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary-500 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}