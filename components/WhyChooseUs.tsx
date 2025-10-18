'use client'

import { motion } from 'framer-motion'
import { Leaf, Award, Truck, Shield, Users, Heart } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'Grown without harmful pesticides or chemicals, ensuring pure nutrition',
    color: 'text-green-600'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Carefully selected and processed to maintain highest nutritional value',
    color: 'text-yellow-600'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to get fresh products to your doorstep',
    color: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Rigorous testing and quality control for your peace of mind',
    color: 'text-purple-600'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Dedicated customer service and nutrition guidance from our experts',
    color: 'text-indigo-600'
  },
  {
    icon: Heart,
    title: 'Health Focused',
    description: 'Products designed with your wellness and healthy lifestyle in mind',
    color: 'text-red-600'
  }
]

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-beige-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-primary-900">
            Why Choose Millet Glow
          </h2>
          <p className="section-subtitle">
            Experience the difference with our commitment to quality, sustainability, and your wellbeing
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className={`${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-12 h-12" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-primary-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary-200 transition-colors duration-300"></div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Health?
            </h3>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made the switch to our premium millet products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                Shop Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}