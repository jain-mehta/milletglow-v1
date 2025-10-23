'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/client'
import { formatPrice, generateWhatsAppUrl } from '@/lib/utils'

interface ProductCardProps {
  product: {
    _id: string
    name: string
    slug: { current: string }
    price: number
    image: any
    shortDescription?: string
    category: string
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
    const message = `Hi! I'm interested in ${product.name}. Can you provide more details about pricing and availability?`
    const whatsappUrl = generateWhatsAppUrl(whatsappNumber, message, product.name)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  // Static 10% discount
  const discountPercentage = 10
  const discountedPrice = product.price - product.price * (discountPercentage / 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${product.slug.current}`} className="block h-full">
        <div className="bg-white rounded-2xl p-6 flex flex-col h-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          {/* Product Image Section */}
          <div className="relative h-48 flex items-center justify-center mb-6 overflow-hidden rounded-lg bg-white">
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                fill
                className="object-contain z-10 transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {product.shortDescription || 'Discover the goodness of millet in every bite'}
              </p>

              {/* Example Badges (static) */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-50 text-yellow-800 border border-yellow-100">
                  Gluten-Free
                </span>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-800 border border-green-100">
                  Organic
                </span>
              </div>
            </div>

            {/* Price + Discount */}
            <div className="mt-auto flex items-center gap-2">
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(product.price)}
              </span>
              <span className="text-primary-600 font-semibold text-sm bg-primary-50 px-2 py-0.5 rounded-md">
                -{discountPercentage}%
              </span>
            </div>
            <span className="text-primary-600 font-bold text-xl">
              {formatPrice(discountedPrice)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
