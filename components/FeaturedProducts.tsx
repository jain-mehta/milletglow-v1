'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { client, queries } from '@/sanity/client'
import ProductCard from '@/components/ProductCard'

interface Product {
  _id: string
  name: string
  slug: { current: string }
  price: number
  discount?: number
  image: any
  shortDescription?: string
  benefits?: string[]
  certifications?: string[]
  isOutOfStock: boolean
  isFeatured: boolean
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Debug: Check all products first
        const allProducts = await client.fetch(`*[_type == "product"] { _id, name, isFeatured, isOutOfStock }`)
        console.log('All products in Sanity:', allProducts)

        // Debug: Check featured products (including out of stock)
        const featuredAll = await client.fetch(`*[_type == "product" && isFeatured == true] { _id, name, isFeatured, isOutOfStock }`)
        console.log('Featured products (all):', featuredAll)

        // Try without isOutOfStock filter first
        const featuredProducts = await client.fetch(`*[_type == "product" && isFeatured == true] | order(_createdAt desc)[0...6] {
          _id,
          name,
          slug,
          price,
          discount,
          image,
          shortDescription,
          benefits,
          certifications,
          isOutOfStock,
          isFeatured
        }`)
        console.log('Featured products query result:', featuredProducts)

        setProducts(featuredProducts || [])
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])



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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>

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