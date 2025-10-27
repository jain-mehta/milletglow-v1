'use client'

import { motion } from 'framer-motion'
import { Leaf, Activity, TrendingDown, Sparkles, Scale, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

const benefits = [
  {
    icon: Leaf,
    title: 'High Nutritional Value',
    description: 'Millets are packed with protein, fiber, iron, calcium, and B vitamins for natural strength and sustained energy',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    icon: Activity,
    title: 'Promotes Digestive Health',
    description: 'Rich in dietary fiber, millets help prevent bloating and support gut wellness',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: TrendingDown,
    title: 'Keeps Blood Sugar Levels Low',
    description: 'The low glycemic index helps maintain steady glucose levels.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Sparkles,
    title: 'Acts as a Natural Antioxidant',
    description: 'Millets contain polyphenols and flavonoids that fight free radicals and inflammation.',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Scale,
    title: 'Aids in Weight Loss',
    description: 'High fiber keeps you full longer and helps control cravings.',
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    icon: ShieldCheck,
    title: '100 Percent Gluten-Free',
    description: 'Perfect for those with gluten intolerance or celiac disease.',
    gradient: 'from-blue-500 to-cyan-500'
  }
]

export default function BenefitsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-br from-beige-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 0.05, rotate: 0 }}
          transition={{ duration: 2 }}
          className="absolute -top-20 -right-20 w-96 h-96"
        >
          <Image
            src="/images/productonly/1.png"
            alt="Millet background pattern"
            fill
            className="object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: 0.05, rotate: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-20 -left-20 w-96 h-96"
        >
          <Image
          src="/images/productonly/3.png"
            alt="Millet background pattern"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-primary-900">
            Benefits of Millet
          </h2>
          <p className="section-subtitle">
            Discover why millets are a superfood built for modern wellness.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 h-full">
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full text-white" />
                    </div>

                    {/* Glow effect */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Decorative bottom border */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className={`h-1 w-0 bg-gradient-to-r ${benefit.gradient} rounded-full group-hover:w-full transition-all duration-500`}></div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}