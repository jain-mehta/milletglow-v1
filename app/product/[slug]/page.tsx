'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Star,
  MessageCircle,
  Check,
  Leaf,
  Award,
  ArrowLeft,
  Share2,
  ChevronDown
} from 'lucide-react'
import { client, queries, urlFor } from '@/sanity/client'
import { formatPrice, generateWhatsAppUrl } from '@/lib/utils'
import toast from 'react-hot-toast'
import FeaturedProducts from '@/components/FeaturedProducts'

interface ProductDetailProps {
  params: {
    slug: string
  }
}

interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: number
  image: any
  gallery?: any[]
  description: string
  shortDescription: string
  benefits?: string[]
  ingredients?: string[]
  nutritionFacts?: Record<string, any>
  category: string
  weight: string
  shelfLife?: string
  origin?: string
  certifications?: Array<{ name: string; image?: any }>
  isOutOfStock: boolean
  isFeatured: boolean
  whatsappMessage?: string
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [nutritionOpen, setNutritionOpen] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(queries.productBySlug, { slug: params.slug })
        if (!data) notFound()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.slug])

  const handleWhatsAppOrder = () => {
    if (!product) return
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210'
    const message =
      product.whatsappMessage ||
      `Hi! I'm interested in ${product.name} (₹${product.price}). Can you provide more details?`
    const whatsappUrl = generateWhatsAppUrl(whatsappNumber, message, product.name)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const handleShare = async () => {
    if (!product) return
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} - ${product.shortDescription}`,
      url: window.location.href
    }
    try {
      if (navigator.share) await navigator.share(shareData)
      else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Product link copied to clipboard!')
      }
    } catch {
      toast.error('Failed to share product')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="skeleton h-96 w-full rounded-lg"></div>
            <div className="space-y-6">
              <div className="skeleton h-8 w-3/4"></div>
              <div className="skeleton h-6 w-1/4"></div>
              <div className="skeleton h-24 w-full"></div>
              <div className="skeleton h-12 w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) return notFound()

  const allImages = product.gallery?.length ? product.gallery : [product.image]

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container section-padding">

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-sm text-gray-600 flex items-center space-x-2"
        >
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <span className="text-primary-600">{product.name}</span>
        </motion.nav>

        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </Link>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative h-96 lg:h-[500px] bg-gray-50 rounded-xl overflow-hidden">
              {allImages[selectedImageIndex] && (
                <Image
                  src={urlFor(allImages[selectedImageIndex]).url()}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              )}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow hover:bg-white"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? 'border-primary-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={urlFor(img).url()}
                      alt={`${product.name}-${idx}`}
                      className="object-contain w-auto h-auto"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold font-serif text-primary-900">{product.name}</h1>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  product.isOutOfStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}
              >
                {product.isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary-900">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center text-green-600 space-x-2">
                <Leaf className="w-5 h-5" /> <span>100% Organic</span>
              </div>
              <div className="flex items-center text-yellow-600 space-x-2">
                <Award className="w-5 h-5" /> <span>Premium Quality</span>
              </div>
            </div>

            <div className="space-y-3">
              {!product.isOutOfStock ? (
                <button onClick={handleWhatsAppOrder} className="w-full btn-whatsapp py-4 text-lg">
                  <MessageCircle className="w-6 h-6" /> Order via WhatsApp
                </button>
              ) : (
                <button disabled className="w-full bg-gray-300 text-gray-500 py-4 rounded-lg cursor-not-allowed">
                  Out of Stock
                </button>
              )}
              <p className="text-center text-sm text-gray-600">
                Questions? Contact us for personalized recommendations!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Accordion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-gradient-to-r from-beige-50 to-primary-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-primary-900">Product Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Details */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-primary-900">Product Details</h4>
              <ul className="space-y-1 text-gray-700">
                <li><b>Weight:</b> {product.weight}</li>
                <li><b>Category:</b> {product.category}</li>
                {product.shelfLife && <li><b>Shelf Life:</b> {product.shelfLife}</li>}
                {product.origin && <li><b>Origin:</b> {product.origin}</li>}
              </ul>
            </div>

            {/* Ingredients */}
            {Array.isArray(product.ingredients) && product.ingredients.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-3 text-primary-900">Ingredients</h4>
                <ul className="space-y-1 text-gray-700">
                  {product.ingredients.map((i, idx) => (
                    <li key={idx}>• {i}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutrition Accordion */}
            {product.nutritionFacts && (
              <div>
                <button
                  onClick={() => setNutritionOpen(!nutritionOpen)}
                  className="flex justify-between items-center w-full bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50"
                >
                  <span className="font-semibold text-primary-900 text-lg">Nutrition Facts (per 100g)</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${nutritionOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {nutritionOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 bg-white border border-gray-100 rounded-lg p-4"
                    >
                      {Object.entries(product.nutritionFacts).map(([key, value], i) => (
                        <div key={i} className="flex justify-between text-gray-700 border-b py-1 last:border-none">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* Featured Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <FeaturedProducts />
        </motion.div>
      </div>
    </div>
  )
}
