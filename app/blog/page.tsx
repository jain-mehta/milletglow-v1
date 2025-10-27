'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { client, queries } from '@/sanity/client'
import BlogCard from '@/components/BlogCard'
import LazyComponent from '@/components/LazyComponent'
import { CONTENT_LAZY_CONFIG } from '@/lib/performance'
import { BlogPost } from '@/types/global'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(queries.allBlogPosts)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
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
              <div key={i} className="card">
                <div className="skeleton h-48 w-full mb-4"></div>
                <div className="p-6">
                  <div className="skeleton h-6 w-32 mb-2"></div>
                  <div className="skeleton h-4 w-full mb-4"></div>
                  <div className="skeleton h-10 w-24"></div>
                </div>
              </div>
            ))}ac
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-beige-50 to-white">
      {/* Header */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="section-title text-primary-900 mb-4">
              Millet Wisdom
            </h1>
            <p className="section-subtitle">
              Discover the latest insights on millet nutrition, recipes, and healthy living from our experts
            </p>
          </motion.div>
        </div>
      </section>


      {/* Blog Posts Grid */}
      <section className="pb-16">
        <div className="container">
          {posts.length > 0 ? (
            <LazyComponent
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="card">
                      <div className="skeleton h-48 w-full mb-4"></div>
                      <div className="p-6">
                        <div className="skeleton h-6 w-32 mb-2"></div>
                        <div className="skeleton h-4 w-full mb-4"></div>
                        <div className="skeleton h-10 w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              }
              rootMargin={CONTENT_LAZY_CONFIG.CONTENT_SECTIONS}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <BlogCard
                    key={post._id}
                    post={post}
                    index={index}
                  />
                ))}
              </div>
            </LazyComponent>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-8">
                Add some blog posts in Sanity CMS to see them here.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}