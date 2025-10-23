'use client'
import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react'
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
      <div className="min-h-screen pt-20 bg-white">
        <div className="container section-padding">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-64 w-full bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) return notFound()

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-beige-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Category */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Tag className="w-3 h-3 mr-1" />
                {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            {post.author?.name && (
              <div className="flex items-center space-x-2">
                {post.author.image ? (
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span>By {post.author.name}</span>
              </div>
            )}

            {post.publishedAt && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            )}

            {post.readingTime && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Tags */}
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
        </motion.header>

        {/* Featured Image */}
        {post.featuredImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={urlFor(post.featuredImage).width(1200).height(600).url()}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg max-w-none mb-12"
        >
          {post.excerpt && (
            <div className="not-prose mb-8 p-6 bg-primary-50 border-l-4 border-primary-600 rounded-r-lg">
              <p className="text-lg text-gray-700 italic leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}

          {post.content ? (
            <PortableText
              value={post.content}
              components={{
                block: {
                  h1: ({children}) => <h1 className="text-3xl font-bold text-primary-900 mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-semibold text-primary-900 mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-medium text-primary-900 mt-4 mb-2">{children}</h3>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-primary-300 pl-6 py-2 bg-gray-50 rounded-r-lg my-6 italic">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  link: ({children, value}) => (
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
            <div className="text-center py-8 text-gray-500">
              <p>No content available for this blog post.</p>
            </div>
          )}
        </motion.article>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-primary-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/blogs/${relatedPost.slug.current}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    {relatedPost.featuredImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={urlFor(relatedPost.featuredImage).width(400).height(300).url()}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-primary-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        {relatedPost.publishedAt && (
                          <span>{formatDate(relatedPost.publishedAt)}</span>
                        )}
                        {relatedPost.readingTime && (
                          <span>{relatedPost.readingTime} min read</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
