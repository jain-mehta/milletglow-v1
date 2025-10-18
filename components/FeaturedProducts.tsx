'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star } from 'lucide-react'
import { client, queries, urlFor } from '@/sanity/client'
import { formatPrice } from '@/lib/utils'

interface Product {
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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Testing different queries...')

        // Test 1: All products
        const allProducts = await client.fetch(`*[_type == "product"] { _id, name, isFeatured, isOutOfStock }`)
        console.log('All products:', allProducts)

        // Test 2: Products with isFeatured true (ignoring stock)
        const featuredOnly = await client.fetch(`*[_type == "product" && isFeatured == true] { _id, name, isFeatured, isOutOfStock }`)
        console.log('Featured products (any stock):', featuredOnly)

        // Test 3: Original query
        const data = await client.fetch(queries.featuredProducts)
        console.log('Original featured query result:', data)

        if (data && data.length > 0) {
          setProducts(data)
        } else if (featuredOnly && featuredOnly.length > 0) {
          // Use featured products even if some are out of stock
          const featuredWithData = await client.fetch(`*[_type == "product" && isFeatured == true] | order(_createdAt desc)[0...6] {
            _id, name, slug, price, image, shortDescription, benefits[0...3], category, weight, isOutOfStock, isFeatured
          }`)
          console.log('Using featured products (including out of stock):', featuredWithData)
          setProducts(featuredWithData)
        } else {
          // Fallback to first 6 products
          const fallbackData = await client.fetch(`*[_type == "product"] | order(_createdAt desc)[0...6] {
            _id, name, slug, price, image, shortDescription, benefits[0...3], category, weight, isOutOfStock, isFeatured
          }`)
          console.log('Using fallback products:', fallbackData)
          setProducts(fallbackData)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  console.log('Component render - Loading:', loading, 'Products count:', products.length)

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="skeleton h-8 w-64 mx-auto mb-4"></div>
            <div className="skeleton h-20 w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="skeleton h-48 w-full mb-4 rounded-lg"></div>
                <div className="skeleton h-6 w-32 mb-2"></div>
                <div className="skeleton h-4 w-full mb-4"></div>
                <div className="skeleton h-10 w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show empty state if no products
  if (!loading && products.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-primary-900">
              Featured Products
            </h2>
            <p className="section-subtitle">
              Discover our most popular millet products, loved by health enthusiasts worldwide
            </p>
          </motion.div>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Featured Products Yet
            </h3>
            <p className="text-gray-600 mb-8">
              Our featured products will appear here soon. Check back later!
            </p>
            <div className="text-sm text-gray-500">
              Debug: Products array is empty. Check console for fetch details.
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-primary-900">
            Featured Products
          </h2>
          <p className="section-subtitle">
            Discover our most popular millet products, loved by health enthusiasts worldwide
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => {
            console.log('Rendering product:', product.name, 'Image:', product.image)
            return (
            <motion.div
              key={product._id}
              variants={itemVariants}
              className="card p-6 group"
            >
              {/* Product Image */}
              <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-gray-50">
                {product.image && (
                  <Image
                    src={urlFor(product.image).width(400).height(300).url()}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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

                {/* Rating Stars */}
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
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.shortDescription || 'Premium organic millet product'}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </div>
                  <Link
                    href={`/product/${product.slug.current}`}
                    className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                  >
                    <span>Learn More</span>
                    <ShoppingBag className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )
          })}
        </motion.div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products" className="btn-primary">
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}