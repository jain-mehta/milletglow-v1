'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Star,
  MessageCircle,
  Check,
  Leaf,
  Award,
  ShoppingBag,
  ArrowLeft,
  Share2
} from 'lucide-react'
import { client, queries, urlFor } from '@/sanity/client'
import { formatPrice, generateWhatsAppUrl } from '@/lib/utils'
import ProductCard from '@/components/ProductCard'
import toast from 'react-hot-toast'

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
  nutritionFacts?: {
    energy?: number
    protein?: number
    carbohydrates?: number
    fiber?: number
    fat?: number
    saturatedFat?: number
    sodium?: number
    iron?: number
    calcium?: number
    additionalNutrients?: Array<{
      nutrient: string
      amount: string
      unit: string
    }>
  }
  category: string
  weight: string
  shelfLife?: string
  origin?: string
  certifications?: Array<{
    name: string
    image?: any
  }>
  isOutOfStock: boolean
  isFeatured: boolean
  whatsappMessage?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  relatedProducts?: Array<{
    _id: string
    name: string
    slug: { current: string }
    price: number
    image: any
    shortDescription: string
    benefits?: string[]
    category: string
    weight: string
    isOutOfStock: boolean
    isFeatured: boolean
  }>
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(queries.productBySlug, { slug: params.slug })

        if (!data) {
          notFound()
        }

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
    const message = product.whatsappMessage ||
      `Hi! I'm interested in ${product.name} (₹${product.price}). Can you provide more details about pricing and availability?`

    const whatsappUrl = generateWhatsAppUrl(whatsappNumber, message, product.name)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const handleShare = async () => {
    if (!product) return

    const shareData = {
      title: product.name,
      text: `Check out ${product.name} - ${product.description}`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Product link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
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

  if (!product) {
    return notFound()
  }

  const allImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : product.image
    ? [product.image]
    : []

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container section-padding">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary-600 transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-primary-600">{product.name}</span>
          </nav>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </Link>
        </motion.div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] bg-gray-50 rounded-xl overflow-hidden">
              {allImages[selectedImageIndex] && (
                <Image
                  src={urlFor(allImages[selectedImageIndex]).width(600).height(500).url()}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-primary-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={urlFor(image).width(80).height(80).url()}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
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
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title and Price */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900">
                  {product.name}
                </h1>

                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    !product.isOutOfStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {!product.isOutOfStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-gray-600 ml-2">(4.9)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-green-600">
                <Leaf className="w-5 h-5" />
                <span className="text-sm font-medium">100% Organic</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-600">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              {!product.isOutOfStock ? (
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full btn-whatsapp text-lg py-4 justify-center"
                >
                  <MessageCircle className="w-6 h-6" />
                  Order via WhatsApp
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 font-medium py-4 px-6 rounded-lg cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              <div className="text-center text-sm text-gray-600">
                <p>Questions? Contact us for personalized recommendations!</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-beige-50 to-primary-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Weight & Category Info */}
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  Product Details
                </h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-600">
                      Weight
                    </dt>
                    <dd className="text-gray-900">{product.weight}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">
                      Category
                    </dt>
                    <dd className="text-gray-900">{product.category}</dd>
                  </div>
                  {product.shelfLife && (
                    <div>
                      <dt className="text-sm font-medium text-gray-600">
                        Shelf Life
                      </dt>
                      <dd className="text-gray-900">{product.shelfLife}</dd>
                    </div>
                  )}
                  {product.origin && (
                    <div>
                      <dt className="text-sm font-medium text-gray-600">
                        Origin
                      </dt>
                      <dd className="text-gray-900">{product.origin}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">
                    Ingredients
                  </h3>
                  <ul className="space-y-1">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-700">
                        • {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition Facts */}
              {product.nutritionFacts && (
                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">
                    Nutrition Facts (per 100g)
                  </h3>
                  <div className="space-y-2">
                    {product.nutritionFacts.energy && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Energy</span>
                        <span className="font-medium">{product.nutritionFacts.energy} kcal</span>
                      </div>
                    )}
                    {product.nutritionFacts.protein && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Protein</span>
                        <span className="font-medium">{product.nutritionFacts.protein}g</span>
                      </div>
                    )}
                    {product.nutritionFacts.carbohydrates && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Carbohydrates</span>
                        <span className="font-medium">{product.nutritionFacts.carbohydrates}g</span>
                      </div>
                    )}
                    {product.nutritionFacts.fiber && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Fiber</span>
                        <span className="font-medium">{product.nutritionFacts.fiber}g</span>
                      </div>
                    )}
                    {product.nutritionFacts.fat && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Fat</span>
                        <span className="font-medium">{product.nutritionFacts.fat}g</span>
                      </div>
                    )}
                    {product.nutritionFacts.additionalNutrients && product.nutritionFacts.additionalNutrients.map((nutrient, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-700">{nutrient.nutrient}</span>
                        <span className="font-medium">{nutrient.amount}{nutrient.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold font-serif text-primary-900 text-center mb-12">
              Related Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={{
                    ...relatedProduct,
                    // Related products don't need these fields
                  }}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}