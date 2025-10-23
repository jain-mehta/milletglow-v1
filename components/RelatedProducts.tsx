'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { client } from '@/sanity/client'
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

interface RelatedProductsProps {
  currentProductId: string
  title?: string
  showViewAll?: boolean
}

export default function RelatedProducts({
  currentProductId,
  title = "Related Products",
  showViewAll = true
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Fetch random products excluding the current one
        const data = await client.fetch(`
          *[_type == "product" && _id != $currentProductId && !isOutOfStock] | order(_createdAt desc)[0...12] {
            _id,
            name,
            slug,
            price,
            discount,
            image,
            shortDescription,
            benefits[0...3],
            certifications,
            isOutOfStock,
            isFeatured
          }
        `, { currentProductId })

        // Randomly shuffle and take first 4 products
        const shuffled = data.sort(() => 0.5 - Math.random())
        setProducts(shuffled.slice(0, 4))
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="skeleton h-8 w-48 mx-auto mb-4"></div>
            <div className="skeleton h-16 w-80 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="skeleton h-40 w-full mb-4 rounded-lg"></div>
                <div className="skeleton h-5 w-32 mb-2"></div>
                <div className="skeleton h-4 w-full mb-4"></div>
                <div className="skeleton h-8 w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Don't show section if no products
  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover more premium millet products that might interest you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* View All Products Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/products" className="btn-primary">
              View All Products
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}