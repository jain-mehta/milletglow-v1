'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/client'
import { formatPrice, generateWhatsAppUrl } from '@/lib/utils'
import { trackProductInterest } from '@/lib/gtag'

interface ProductCardProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    price: number
    discount?: number
    image: any
    shortDescription?: string
    certifications?: string[]
    isOutOfStock: boolean
    isFeatured: boolean
  }
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210'

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Track product interest in Google Analytics
    trackProductInterest(product.name)

    const message = `Hi! I'm interested in ${product.name}. Can you provide more details about pricing and availability?`
    const whatsappUrl = generateWhatsAppUrl(whatsappNumber, message, product.name)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  // Dynamic discount from Sanity
  const discountPercentage = product.discount || 0
  const discountedPrice = discountPercentage > 0
    ? product.price - (product.price * (discountPercentage / 100))
    : product.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${product.slug.current}`} className="block h-full">
        <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col h-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          {/* Product Image Section */}
          <div className="relative h-40 sm:h-48 flex items-center justify-center mb-4 sm:mb-6 overflow-hidden rounded-lg bg-white">
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                fill
                className="object-cover z-10 transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">
                {product.shortDescription || 'Discover the goodness of millet in every bite'}
              </p>

              {/* Custom Certifications & Badges */}
              {product.certifications && product.certifications.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                  {product.certifications.slice(0, 2).map((cert, index) => {
                    // Generate consistent colors based on cert text
                    const colorVariants = [
                      'bg-green-50 text-green-800 border-green-100',
                      'bg-blue-50 text-blue-800 border-blue-100',
                      'bg-purple-50 text-purple-800 border-purple-100',
                      'bg-yellow-50 text-yellow-800 border-yellow-100',
                      'bg-pink-50 text-pink-800 border-pink-100',
                      'bg-indigo-50 text-indigo-800 border-indigo-100',
                      'bg-orange-50 text-orange-800 border-orange-100',
                      'bg-emerald-50 text-emerald-800 border-emerald-100'
                    ]

                    // Use cert length and first character to determine color consistently
                    const colorIndex = (cert.length + cert.charCodeAt(0)) % colorVariants.length
                    const colors = colorVariants[colorIndex]

                    return (
                      <span
                        key={index}
                        className={`px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full border ${colors}`}
                      >
                        {cert}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Price + Discount */}
            {discountPercentage > 0 ? (
              <>
                <div className="mt-auto flex items-center gap-2">
                  <span className="text-gray-400 line-through text-xs sm:text-sm">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-primary-600 font-semibold text-xs sm:text-sm bg-primary-50 px-1.5 sm:px-2 py-0.5 rounded-md">
                    -{discountPercentage}%
                  </span>
                </div>
                <span className="text-primary-600 font-bold text-lg sm:text-xl">
                  {formatPrice(discountedPrice)}
                </span>
              </>
            ) : (
              <span className="text-primary-600 font-bold text-lg sm:text-xl mt-auto">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
