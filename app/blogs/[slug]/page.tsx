'use client'
import React, { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { client, queries, urlFor } from '@/sanity/client'
import ProductCard from '@/components/ProductCard'

interface BlogProps {
  params: { slug: string }
}

interface Blog {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: any
  excerpt?: string
  body?: any[]
  publishedAt?: string
  author?: { name?: string; image?: any }
  seo?: { metaTitle?: string; metaDescription?: string }
  relatedProducts?: Array<{
    _id: string
    name: string
    slug: { current: string }
    price?: number
    image?: any
    shortDescription?: string
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
    <div className="min-h-screen pt-20 bg-white">
      <div className="container section-padding">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 text-sm text-gray-600 flex items-center gap-2"
        >
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">{post.title}</span>
        </motion.nav>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {post.author?.name && <span>By {post.author.name}</span>}
            {post.publishedAt && <span>· {new Date(post.publishedAt).toLocaleDateString()}</span>}
          </div>
        </motion.header>

        {/* Cover Image */}
        {post.coverImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mb-8 rounded-lg overflow-hidden relative w-full h-72 md:h-96 bg-gray-100">
            <img
              src={urlFor(post.coverImage).width(1200).height(600).url()}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </motion.div>
        )}

        {/* Blog Content */}
        <article className="prose max-w-none mb-12">
          {post.excerpt && <p className="text-lg text-gray-700 mb-4">{post.excerpt}</p>}
          {post.body ? <PortableText value={post.body} /> : <p className="text-gray-700">No content available.</p>}
        </article>

        {/* Related Products */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          </motion.section>
        )}
      </div>
    </div>
  )
}
