'use client'

import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { Calendar, User, Clock, Tag } from 'lucide-react'
import { client, queries, urlFor } from '@/sanity/client'
import { formatDate } from '@/lib/utils'

interface BlogProps {
  params: { slug: string }
}

interface Blog {
  _id: string
  title: string
  slug: { current: string }
  featuredImage?: any
  excerpt?: string
  content?: any[]
  publishedAt?: string
  author?: { name?: string; image?: any; bio?: string }
  category?: string
  tags?: string[]
  readingTime?: number
  seo?: { metaTitle?: string; metaDescription?: string }
  relatedPosts?: Array<{
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    featuredImage?: any
    publishedAt?: string
    readingTime?: number
  }>
}

export default function BlogPage({ params }: BlogProps) {
  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchPost = async () => {
      try {
        const data = await client.fetch(queries.blogPostBySlug, { slug: params.slug })
        if (!data && mounted) return notFound()
        if (mounted) setPost(data)
      } catch (err) {
        console.error('Error fetching blog:', err)
        if (mounted) notFound()
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchPost()
    return () => {
      mounted = false
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="animate-pulse space-y-6 w-[90%] max-w-3xl">
          <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-64 w-full bg-gray-200 rounded"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) return notFound()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Blog Hero Section */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto mt-24 px-4 md:px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            {/* Blog Image */}
            <Image
              src={urlFor(post.featuredImage).width(1200).height(700).url()}
              alt={post.title}
              width={1200}
              height={700}
              className="w-full h-[420px] md:h-[480px] object-cover"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Overlay Text */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-2 drop-shadow-md">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-sm md:text-base text-gray-200 drop-shadow-sm">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="max-w-5xl mx-auto px-6 -mt-3 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Top meta (Published on • By author • reading time) */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            )}

            {post.author?.name && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
            )}

            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Category / Tags (optional) */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-gray-800">
            {post.content ? (
              <PortableText
                value={post.content}
                components={{
                  block: {
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-primary-900 mt-10 mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-primary-900 mt-8 mb-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-medium text-primary-800 mt-6 mb-2">
                        {children}
                      </h3>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary-500 pl-6 py-3 bg-gray-50 rounded-r-lg my-6 italic text-gray-700">
                        {children}
                      </blockquote>
                    ),
                  },
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        href={value.href}
                        className="text-primary-600 hover:text-primary-700 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            ) : (
              <p className="text-gray-500 text-center py-10">
                No content available for this blog post.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
