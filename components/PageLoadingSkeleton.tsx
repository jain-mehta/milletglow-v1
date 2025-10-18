'use client'

import { motion } from 'framer-motion'

interface PageLoadingSkeletonProps {
  type?: 'page' | 'products' | 'blog' | 'product-detail'
}

export default function PageLoadingSkeleton({ type = 'page' }: PageLoadingSkeletonProps) {
  const shimmer = {
    animate: {
      x: ['-100%', '100%'],
    },
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    },
  }

  if (type === 'products') {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-beige-50 to-white">
        <div className="container section-padding">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-64 mx-auto mb-4"></div>
            <div className="skeleton h-6 w-96 mx-auto"></div>
          </div>

          {/* Filters Skeleton */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="skeleton h-12 w-full mb-4"></div>
            <div className="flex gap-4">
              <div className="skeleton h-10 w-48"></div>
              <div className="skeleton h-10 w-48"></div>
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="relative overflow-hidden">
                  <div className="skeleton h-48 w-full mb-4 rounded-lg"></div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    {...shimmer}
                  />
                </div>
                <div className="skeleton h-6 w-32 mb-2"></div>
                <div className="skeleton h-4 w-full mb-4"></div>
                <div className="skeleton h-10 w-24"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'product-detail') {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="container section-padding">
          {/* Breadcrumb Skeleton */}
          <div className="skeleton h-4 w-64 mb-8"></div>

          {/* Product Details Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images Skeleton */}
            <div className="space-y-6">
              <div className="relative overflow-hidden">
                <div className="skeleton h-96 lg:h-[500px] w-full rounded-xl"></div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  {...shimmer}
                />
              </div>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton w-20 h-20 rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-8">
              <div>
                <div className="skeleton h-10 w-3/4 mb-4"></div>
                <div className="skeleton h-6 w-1/4 mb-6"></div>
                <div className="skeleton h-8 w-1/3 mb-6"></div>
              </div>
              <div className="space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-5/6"></div>
                <div className="skeleton h-4 w-4/5"></div>
              </div>
              <div className="skeleton h-12 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default page skeleton
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-beige-50 to-white">
      <div className="container section-padding">
        <div className="text-center mb-16">
          <div className="skeleton h-12 w-64 mx-auto mb-4"></div>
          <div className="skeleton h-6 w-96 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="card p-8"
            >
              <div className="skeleton h-6 w-48 mb-4"></div>
              <div className="space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-5/6"></div>
                <div className="skeleton h-4 w-4/5"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}