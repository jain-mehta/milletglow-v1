'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { client } from '@/sanity/client'
import BlogCard from '@/components/BlogCard'
import { BlogPost } from '@/types/global'

interface RelatedBlogsProps {
  currentBlogSlug: string
  title?: string
  showViewAll?: boolean
}

export default function RelatedBlogs({
  currentBlogSlug,
  title = "Related Articles",
  showViewAll = true
}: RelatedBlogsProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        // Fetch random blog posts excluding the current one
        const data = await client.fetch(`
          *[_type == "blog" && slug.current != $currentBlogSlug && isPublished == true] | order(publishedAt desc)[0...12] {
            _id,
            title,
            slug,
            excerpt,
            featuredImage,
            publishedAt,
            author {
              name,
              image
            },
            tags[0...3],
            readingTime
          }
        `, { currentBlogSlug })

        // Randomly shuffle and take first 3 blog posts
        const shuffled = data.sort(() => 0.5 - Math.random())
        setBlogPosts(shuffled.slice(0, 3))
      } catch (error) {
        console.error('Error fetching related blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedBlogs()
  }, [currentBlogSlug])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="skeleton h-8 w-48 mx-auto mb-4"></div>
            <div className="skeleton h-16 w-80 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="skeleton h-48 w-full mb-4 rounded-lg"></div>
                <div className="skeleton h-5 w-32 mb-2"></div>
                <div className="skeleton h-4 w-full mb-2"></div>
                <div className="skeleton h-4 w-3/4 mb-4"></div>
                <div className="skeleton h-8 w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show message if no blog posts found
  if (!loading && blogPosts.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              {title}
            </h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Related Articles Available
              </h3>
              <p className="text-gray-600 mb-8">
                Check out our complete blog collection instead
              </p>
              <Link href="/blog" className="btn-primary">
                View All Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    )
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
            Discover more insights about millet nutrition, healthy living, and wellness tips
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post._id}
              post={post}
              index={index}
            />
          ))}
        </div>

        {/* View All Blog Posts Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/blog" className="btn-primary">
              View All Articles
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}