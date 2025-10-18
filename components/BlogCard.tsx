'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { urlFor } from '@/sanity/client'
import { formatDate, truncateText } from '@/lib/utils'

interface BlogCardProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    image: any
    publishedAt: string
    author: string
    tags?: string[]
  }
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const readingTime = Math.max(1, Math.ceil(post.excerpt.length / 200)) // Rough estimate

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/blog/${post.slug.current}`}>
        <div className="card overflow-hidden h-full flex flex-col">
          {/* Featured Image */}
          <div className="relative h-48 overflow-hidden">
            {post.image && (
              <Image
                src={urlFor(post.image).width(400).height(300).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Reading Time Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 flex items-center space-x-1">
              <Clock className="w-3 h-3 text-gray-600" />
              <span className="text-xs text-gray-600">{readingTime} min read</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="absolute top-4 right-4">
                <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-md">
                  {post.tags[0]}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Meta Information */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-primary-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
              {truncateText(post.excerpt, 150)}
            </p>

            {/* Read More Link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group/link">
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </div>

              {/* Additional Tags */}
              {post.tags && post.tags.length > 1 && (
                <div className="flex space-x-1">
                  {post.tags.slice(1, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}