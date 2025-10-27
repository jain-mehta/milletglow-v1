'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { urlFor } from '@/sanity/client'
import { formatDate, truncateText } from '@/lib/utils'
import { BlogPost } from '@/types/global'

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const readingTime = post.readingTime || Math.max(1, Math.ceil(post.excerpt.length / 200)) // Use provided or estimate

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/blogs/${post.slug.current}`}>
        <div className="card overflow-hidden h-full flex flex-col">
          {/* Featured Image */}
          <div className="relative h-48 overflow-hidden">
            {post.featuredImage && (
              <Image
                src={urlFor(post.featuredImage).width(400).height(300).url()}
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
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{post.author.name}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 flex-1 line-clamp-3">
              {truncateText(post.excerpt, 120)}
            </p>

            {/* Read More Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-1 sm:space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base transition-colors group/link">
                <span>Read More</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
              </div>

              {/* Additional Tags */}
              {post.tags && post.tags.length > 1 && (
                <div className="flex space-x-1">
                  {post.tags.slice(1, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-1 rounded-md"
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