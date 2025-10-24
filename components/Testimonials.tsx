'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { client, queries, urlFor } from '@/sanity/client'
import LazyImage from '@/components/LazyImage'
import { IMAGE_CONFIG } from '@/lib/performance'

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
  const [currentIndex, setCurrentIndex] = useState(0)

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

  // Navigation functions for pairs (show 2 at a time on large screens)
  const itemsPerPage = 2
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (totalPages <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [totalPages])

  // Get testimonials for current page
  const getCurrentTestimonials = () => {
    const start = currentIndex * itemsPerPage
    return testimonials.slice(start, start + itemsPerPage)
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
            Celebrity Reviews
          </h2>
          <p className="section-subtitle">
            Real experiences from real people who have transformed their health with our millet products
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        {testimonials.length > 0 && (
          <div className="mt-12 relative">
            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </>
            )}

            {/* Testimonial Cards Container */}
            <div className="px-12 lg:px-16">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {getCurrentTestimonials().map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      {/* Customer Image/Avatar */}
                      <div className="flex-shrink-0">
                        {testimonial.customerImage ? (
                          <LazyImage
                            src={urlFor(testimonial.customerImage).width(80).height(80).url()}
                            alt={testimonial.customerName}
                            width={64}
                            height={64}
                            className="rounded-full object-cover w-16 h-16"
                            quality={IMAGE_CONFIG.THUMBNAIL_QUALITY}
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {testimonial.customerName.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Name, Rating & Location */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {testimonial.customerName}
                          </h4>
                          {testimonial.isVerified && (
                            <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          {renderStars(testimonial.rating)}
                          <span className="text-sm text-gray-500">{testimonial.rating}.0</span>
                        </div>

                        {testimonial.customerInfo?.location && (
                          <p className="text-sm text-gray-500">{testimonial.customerInfo.location}</p>
                        )}
                      </div>
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-gray-700 text-base leading-relaxed mb-4">
                      "{testimonial.reviewText}"
                    </blockquote>

                    {/* Quote decoration */}
                    <div className="flex justify-end">
                      <div className="w-8 h-8 text-primary-200 opacity-50">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Auto-advance indicator */}
            {totalPages > 1 && (
              <p className="text-center text-xs text-gray-500 mt-4">
                Auto-advances every 5 seconds • Shows {itemsPerPage} testimonials per page
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}