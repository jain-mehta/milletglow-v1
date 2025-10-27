'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, queries } from '@/sanity/client'
import ProductCard from '@/components/ProductCard'
import LazyComponent from '@/components/LazyComponent'
import { CONTENT_LAZY_CONFIG } from '@/lib/performance'

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // 🔽 Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(queries.allProducts)
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-beige-50 to-white">
        <div className="container section-padding">
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-64 mx-auto mb-4"></div>
            <div className="skeleton h-6 w-96 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-6">
                <div className="skeleton h-48 w-full mb-4 rounded-lg"></div>
                <div className="skeleton h-6 w-32 mb-2"></div>
                <div className="skeleton h-4 w-full mb-4"></div>
                <div className="skeleton h-10 w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-beige-50 to-white">
      <div className="container section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title text-primary-900 mb-4">Our Products</h1>
          <p className="section-subtitle">
            Discover our premium collection of organic millet products, carefully crafted for your health and wellness.
          </p>
        </motion.div>

        {/* 🔽 Commented out: Search & Filter Section for future use */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-400"
          />
          <div className="flex gap-4">
            <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-400">
              <option value="">All Categories</option>
              <option value="Millets">Millets</option>
              <option value="Snacks">Snacks</option>
            </select>
            <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-400">
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </motion.div>
        */}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <LazyComponent
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="card p-6">
                    <div className="skeleton h-48 w-full mb-4 rounded-lg"></div>
                    <div className="skeleton h-6 w-32 mb-2"></div>
                    <div className="skeleton h-4 w-full mb-4"></div>
                    <div className="skeleton h-10 w-24"></div>
                  </div>
                ))}
              </div>
            }
            rootMargin={CONTENT_LAZY_CONFIG.CONTENT_SECTIONS}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          </LazyComponent>
        ) : (
          <div className="text-center text-gray-500 mt-16">
            No products found for your selection.
          </div>
        )}
      </div>
    </div>
  )
}
