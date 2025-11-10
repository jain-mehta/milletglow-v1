'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useMemo, useCallback } from 'react'
import { urlFor } from '@/sanity/client'
import { formatPrice, generateWhatsAppUrl } from '@/lib/utils'
import { trackProductInterest } from '@/lib/gtag'
import { Product } from '@/types/global'

interface ProductCardProps {
  product: Product
  index?: number
  priority?: boolean
  sizes?: string
}

// ✅ Constants
const DEFAULT_DESCRIPTION = 'Discover the goodness of millet in every bite'
const MAX_CERTIFICATIONS = 2
const ANIMATION_DURATION = 0.6

const CERTIFICATION_COLORS = [
  'bg-green-50 text-green-800 border-green-100',
  'bg-blue-50 text-blue-800 border-blue-100',
  'bg-purple-50 text-purple-800 border-purple-100',
  'bg-yellow-50 text-yellow-800 border-yellow-100',
  'bg-pink-50 text-pink-800 border-pink-100',
  'bg-indigo-50 text-indigo-800 border-indigo-100',
  'bg-orange-50 text-orange-800 border-orange-100',
  'bg-emerald-50 text-emerald-800 border-emerald-100',
] as const

function ProductCardComponent({
  product,
  index = 0,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ProductCardProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210'

  // ✅ Price handling
  const pricing = useMemo(() => {
    const discountPercentage = product.discount || 0
    const discountedPrice =
      discountPercentage > 0
        ? product.price - product.price * (discountPercentage / 100)
        : product.price
    return { discountPercentage, discountedPrice, hasDiscount: discountPercentage > 0 }
  }, [product.price, product.discount])

  // ✅ Sanity image URL with 4:3 ratio
  const imageUrl = useMemo(() => {
    if (!product.image) return null
    return urlFor(product.image)
      .width(600)
      .height(450) // maintain 4:3 ratio
      .format('webp')
      .quality(90)
      .url()
  }, [product.image])

  // ✅ Certification badges
  const certificationBadges = useMemo(() => {
    if (!product.certifications?.length) return []
    return product.certifications.slice(0, MAX_CERTIFICATIONS).map((cert, idx) => {
      const colorIndex = (cert.length + cert.charCodeAt(0)) % CERTIFICATION_COLORS.length
      return {
        text: cert,
        colors: CERTIFICATION_COLORS[colorIndex],
        key: `${cert}-${idx}`,
      }
    })
  }, [product.certifications])

  // ✅ WhatsApp click
  const handleWhatsAppOrder = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      trackProductInterest(product.name)
      const message = `Hi! I'm interested in ${product.name}. Can you provide more details about pricing and availability?`
      const whatsappUrl = generateWhatsAppUrl(whatsappNumber, message, product.name)
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    },
    [product.name, whatsappNumber]
  )

  // ✅ Animation variants
  const animationVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: ANIMATION_DURATION, delay: index * 0.1 },
    }),
    [index]
  )

  if (product.isOutOfStock) return null

  return (
    <motion.div
      {...animationVariants}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      <Link
        href={`/product/${product.slug.current}`}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-2xl"
        aria-label={`View details for ${product.name}`}
      >
        <article className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col h-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          
          {/* ✅ Image Section (4:3 ratio, full visible image) */}
          <div className="relative aspect-[4/3] flex items-center justify-center mb-4 sm:mb-6 overflow-hidden rounded-lg bg-gray-50">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${product.name} - Premium millet product`}
                fill
                priority={priority}
                sizes={sizes}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No image available</span>
              </div>
            )}

            {product.isFeatured && (
              <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
                Featured
              </div>
            )}
          </div>

          {/* ✅ Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">
                {product.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 min-h-[2rem]">
                {product.shortDescription || DEFAULT_DESCRIPTION}
              </p>

              {certificationBadges.length > 0 && (
                <div
                  className="flex flex-wrap gap-1 sm:gap-2 mb-3"
                  role="list"
                  aria-label="Product certifications"
                >
                  {certificationBadges.map((badge) => (
                    <span
                      key={badge.key}
                      className={`px-1.5 sm:px-2 py-0.5 text-xs font-medium rounded-full border ${badge.colors}`}
                      role="listitem"
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ Price Section */}
            <div className="mt-auto">
              {pricing.hasDiscount ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 line-through text-xs sm:text-sm">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-primary-600 font-semibold text-xs sm:text-sm bg-primary-50 px-1.5 sm:px-2 py-0.5 rounded-md">
                      -{pricing.discountPercentage}%
                    </span>
                  </div>
                  <span className="text-primary-600 font-bold text-lg sm:text-xl">
                    {formatPrice(pricing.discountedPrice)}
                  </span>
                </>
              ) : (
                <span className="text-primary-600 font-bold text-lg sm:text-xl">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

const ProductCard = memo(ProductCardComponent)
ProductCard.displayName = 'ProductCard'

export default ProductCard
