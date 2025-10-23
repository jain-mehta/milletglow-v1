'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Award, Check, ChevronDown, Leaf } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client, queries, urlFor } from '@/sanity/client'
import RelatedProducts from '@/components/RelatedProducts'

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
  discount?: number
  image: any
  gallery?: any[]
  shortDescription: string
  benefits?: string[]
  nutritionFacts?: Record<string, any>
  certifications?: string[]
  isOutOfStock: boolean
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

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div className="bg-gray-100 h-96 w-full rounded-lg animate-pulse"></div>
      <div className="space-y-6">
        <div className="bg-gray-100 h-8 w-3/4 rounded animate-pulse"></div>
        <div className="bg-gray-100 h-6 w-1/4 rounded animate-pulse"></div>
        <div className="bg-gray-100 h-24 w-full rounded animate-pulse"></div>
        <div className="bg-gray-100 h-12 w-1/3 rounded animate-pulse"></div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="container section-padding">
          <SkeletonLoader />
        </div>
      </div>
    )
  }

  if (!product) return notFound()

  const allImages = product.gallery?.length ? product.gallery : [product.image]

  // Dynamic discount from Sanity
  const discountPercentage = product.discount || 0
  const discountedPrice = discountPercentage > 0
    ? product.price - (product.price * (discountPercentage / 100))
    : product.price

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container section-padding">
        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative h-[460px] bg-white rounded-xl overflow-hidden border ">
              {allImages[selectedImageIndex] && (
                <Image
                  src={urlFor(allImages[selectedImageIndex]).url()}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                />
              )}
            </div>

            {/* THUMBNAILS */}
            {allImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? 'border-yellow-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={urlFor(img).url()}
                      alt={`${product.name}-${idx}`}
                      width={80}
                      height={80}
                      className="object-contain w-auto h-auto"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold font-sans text-gray-900">{product.name}</h1>
            <p className="text-gray-600">{product.shortDescription}</p>

            {product.benefits && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-yellow-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nutrition Accordion */}
            {product.nutritionFacts && (
              <div className="mt-6">
                <button
                  onClick={() => setNutritionOpen(!nutritionOpen)}
                  className="flex justify-between items-center w-full bg-yellow-50 border border-yellow-100 rounded-md px-4 py-3 text-gray-800 hover:bg-yellow-100"
                >
                  <span className="font-semibold text-sm">Nutrition Facts</span>
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
                      className="overflow-hidden mt-2 bg-white border border-yellow-100 rounded-md p-3"
                    >
                      {Object.entries(product.nutritionFacts).map(([key, value], i) => (
                        <div
                          key={i}
                          className="flex justify-between text-gray-700 border-b py-1 last:border-none"
                        >
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* PRICE SECTION */}
            <div className="pt-4">
              {discountPercentage > 0 ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-lg">₹{product.price.toFixed(2)}</span>
                    <span className="text-sm bg-primary-50 text-primary-700 px-2 py-0.5 rounded font-medium">
                      -{discountPercentage}%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-primary-600">₹{discountedPrice.toFixed(2)}</div>
                </>
              ) : (
                <div className="text-3xl font-bold text-primary-600">₹{product.price.toFixed(2)}</div>
              )}
            </div>

            {/* Dynamic Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {product.certifications.map((cert, index) => {
                  // Generate consistent colors based on cert text (same logic as ProductCard)
                  const colorVariants = [
                    'bg-green-50 text-green-800 border-green-200',
                    'bg-blue-50 text-blue-800 border-blue-200',
                    'bg-purple-50 text-purple-800 border-purple-200',
                    'bg-yellow-50 text-yellow-800 border-yellow-200',
                    'bg-pink-50 text-pink-800 border-pink-200',
                    'bg-indigo-50 text-indigo-800 border-indigo-200',
                    'bg-orange-50 text-orange-800 border-orange-200',
                    'bg-emerald-50 text-emerald-800 border-emerald-200'
                  ]

                  const colorIndex = (cert.length + cert.charCodeAt(0)) % colorVariants.length
                  const colors = colorVariants[colorIndex]

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border ${colors}`}
                    >
                      <Award className="w-4 h-4" />
                      <span>{cert}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* RELATED PRODUCTS */}
        <RelatedProducts currentProductId={product._id} />
      </div>
    </div>
  )
}
