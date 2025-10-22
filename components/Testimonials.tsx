'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { client, queries, urlFor } from '@/sanity/client'

interface Testimonial {
  _id: string
  customerName: string
  customerImage?: any
  rating: number
  reviewText: string
  reviewTitle?: string
  customerInfo?: {
    location?: string
  }
  benefitsExperienced?: string[]
  isVerified: boolean
  relatedProducts?: {
    name: string
  }[]
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await client.fetch(queries.featuredTestimonials)
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
      />
    ))
  }

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-50 to-beige-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="skeleton h-8 w-64 mx-auto mb-4"></div>
            <div className="skeleton h-20 w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="skeleton w-12 h-12 rounded-full mr-4"></div>
                  <div>
                    <div className="skeleton h-4 w-24 mb-2"></div>
                    <div className="skeleton h-3 w-16"></div>
                  </div>
                </div>
                <div className="skeleton h-20 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-beige-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-20"></div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-primary-900">
            What Our Customers Say
          </h2>
          <p className="section-subtitle">
            Real experiences from real people who have transformed their health with our millet products
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              variants={itemVariants}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative group flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              {/* Left Side - Image, Name & Rating */}
              <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
                {/* Customer Image */}
                <div className="relative w-16 h-16 mb-4">
                  {testimonial.customerImage ? (
                    <Image
                      src={urlFor(testimonial.customerImage).width(100).height(100).url()}
                      alt={testimonial.customerName}
                      fill
                      className="rounded-xl object-cotain"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.customerName.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name & Location */}
                <div className="text-center md:text-left">
                  <h4 className="font-semibold text-primary-900 flex items-center gap-2 justify-center md:justify-start">
                    {testimonial.customerName}
                    {testimonial.isVerified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </h4>
                  {testimonial.customerInfo?.location && (
                    <p className="text-gray-500 text-sm">{testimonial.customerInfo.location}</p>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center mt-3">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600">{testimonial.rating}.0</span>
                </div>
              </div>

              {/* Right Side - Review Text */}
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.reviewText}"
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary-200 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </motion.div>


        {/* Auto-scrolling testimonials for mobile */}
        <div className="mt-16 md:hidden">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [-1000, 0] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex space-x-6"
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial._id}-${index}`}
                  className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900 text-sm">
                        {testimonial.customerName}
                      </h4>
                      <div className="flex items-center">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm italic">
                    "{testimonial.reviewText}"
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}