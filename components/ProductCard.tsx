'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingBag, MessageCircle } from 'lucide-react'
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
    benefits?: string[]
    category: string
    weight?: string
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${product.slug.current}`}>
        <div className="card p-6 h-full flex flex-col">
          {/* Product Image */}
          <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-gray-50">
            {product.image && (
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Stock Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  !product.isOutOfStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {!product.isOutOfStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Rating Stars - Placeholder */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-3 h-3 text-yellow-400 fill-current"
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">5.0</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {product.shortDescription || 'Premium organic millet product'}
              </p>
            </div>

            {/* Price and Actions */}
            <div className="space-y-4">
              <div className="text-2xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group/link flex-1">
                  <span>Learn More</span>
                  <ShoppingBag className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </div>

                {!product.isOutOfStock && (
                  <button
                    onClick={handleWhatsAppOrder}
                    className="btn-whatsapp text-sm py-2 px-4 flex-shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order via WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}