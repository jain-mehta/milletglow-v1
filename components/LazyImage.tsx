'use client'

import { useState, useEffect, useRef } from 'react'
import Image, { ImageProps } from 'next/image'
import { LAZY_LOADING_CONFIG, CONTENT_LAZY_CONFIG, IMAGE_CONFIG } from '@/lib/performance'

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  src: string
  alt: string
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  fill,
  className = '',
  priority = false,
  quality = IMAGE_CONFIG.PRODUCT_QUALITY,
  sizes,
  placeholder = 'blur',
  blurDataURL = IMAGE_CONFIG.BLUR_DATA_URL,
  ...props
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsInView(true)
          setHasLoaded(true)
        }
      },
      {
        rootMargin: CONTENT_LAZY_CONFIG.PRODUCT_IMAGES,
        threshold: CONTENT_LAZY_CONFIG.THRESHOLD_VISIBLE
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, hasLoaded])

  return (
    <div ref={imgRef} className={fill ? 'relative' : ''}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={className}
          quality={quality}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          {...props}
        />
      ) : (
        <div
          className={`bg-gray-100 animate-pulse ${className}`}
          style={
            fill
              ? { position: 'absolute', inset: 0 }
              : { width: width || 'auto', height: height || 'auto' }
          }
        />
      )}
    </div>
  )
}