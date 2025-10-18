import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Client for frontend use (no token, public access)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-10-18',
  perspective: 'published', // Only fetch published content
})

// Server-side client with token for admin operations
export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Don't use CDN for server-side requests
  apiVersion: '2023-10-18',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Optimized GROQ queries for core schemas
export const queries = {
  // Products
  allProducts: `*[_type == "product"] | order(isFeatured desc, _createdAt desc) {
    _id,
    name,
    slug,
    price,
    image,
    shortDescription,
    description,
    benefits,
    category,
    isFeatured,
    isOutOfStock,
    weight,
    nutritionFacts {
      energy,
      protein,
      carbohydrates,
      fiber,
      fat
    }
  }`,

  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    image,
    gallery,
    description,
    shortDescription,
    benefits,
    ingredients,
    nutritionFacts,
    category,
    isFeatured,
    isOutOfStock,
    weight,
    shelfLife,
    origin,
    certifications,
    seo,
    "relatedProducts": *[_type == "product" && slug.current != $slug && category == ^.category && !isOutOfStock][0...4] {
      _id,
      name,
      slug,
      price,
      image,
      shortDescription,
      benefits[0...3],
      category,
      weight,
      isOutOfStock,
      isFeatured
    }
  }`,

  featuredProducts: `*[_type == "product" && isFeatured == true && !isOutOfStock] | order(_createdAt desc)[0...6] {
    _id,
    name,
    slug,
    price,
    image,
    description,
    shortDescription,
    benefits,
    category,
    weight,
    isOutOfStock,
    isFeatured
  }`,

  productsByCategory: `*[_type == "product" && category == $category && !isOutOfStock] | order(isFeatured desc, _createdAt desc) {
    _id,
    name,
    slug,
    price,
    image,
    shortDescription,
    benefits[0...2],
    isFeatured,
    weight
  }`,

  // Blog posts
  allBlogPosts: `*[_type == "blog" && isPublished == true] | order(isFeatured desc, publishedAt desc) {
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
    category,
    readingTime,
    isFeatured,
    "tags": tags[0...3]
  }`,

  blogPostBySlug: `*[_type == "blog" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    gallery,
    content,
    publishedAt,
    author,
    category,
    tags,
    readingTime,
    relatedProducts[]-> {
      _id,
      name,
      slug,
      price,
      image,
      shortDescription
    },
    seo,
    "relatedPosts": *[_type == "blog" && slug.current != $slug && isPublished == true && category == ^.category][0...3] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      readingTime
    }
  }`,

  featuredBlogPosts: `*[_type == "blog" && isPublished == true && isFeatured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author {
      name
    },
    category,
    readingTime
  }`,

  blogPostsByCategory: `*[_type == "blog" && isPublished == true && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author {
      name
    },
    readingTime
  }`,

  // Testimonials
  allTestimonials: `*[_type == "testimonial" && status == "approved"] | order(isFeatured desc, submittedAt desc) {
    _id,
    customerName,
    customerImage,
    rating,
    reviewText,
    reviewTitle,
    customerInfo {
      location,
      age
    },
    relatedProducts[]-> {
      name,
      slug
    },
    benefitsExperienced,
    isFeatured,
    isVerified,
    submittedAt
  }`,

  featuredTestimonials: `*[_type == "testimonial" && status == "approved" && isFeatured == true && showOnHomepage == true] | order(rating desc, submittedAt desc)[0...6] {
    _id,
    customerName,
    customerImage,
    rating,
    reviewText,
    reviewTitle,
    customerInfo {
      location
    },
    benefitsExperienced[0...3],
    isVerified,
    relatedProducts[]-> {
      name
    }
  }`,

  testimonialsByProduct: `*[_type == "testimonial" && status == "approved" && references($productId)] | order(rating desc, submittedAt desc) {
    _id,
    customerName,
    customerImage,
    rating,
    reviewText,
    customerInfo {
      location
    },
    benefitsExperienced,
    isVerified,
    submittedAt
  }`,

  // Banners
  activeBanners: `*[_type == "banner" && isActive == true &&
    (!defined(schedule.startDate) || schedule.startDate <= now()) &&
    (!defined(schedule.endDate) || schedule.endDate >= now())] | order(priority desc, _createdAt desc) {
    _id,
    title,
    subtitle,
    backgroundImage,
    mobileImage,
    overlayColor,
    contentPosition,
    textColor,
    primaryCTA,
    secondaryCTA,
    bannerType,
    placement,
    targetAudience,
    priority,
    showOnMobile,
    showOnDesktop,
    altText,
    trackingId
  }`,

  bannersByPlacement: `*[_type == "banner" && isActive == true && $placement in placement &&
    (!defined(schedule.startDate) || schedule.startDate <= now()) &&
    (!defined(schedule.endDate) || schedule.endDate >= now())] | order(priority desc, _createdAt desc) {
    _id,
    title,
    subtitle,
    backgroundImage,
    mobileImage,
    overlayColor,
    contentPosition,
    textColor,
    primaryCTA,
    secondaryCTA,
    bannerType,
    priority,
    showOnMobile,
    showOnDesktop,
    altText,
    trackingId
  }`,

  heroBanner: `*[_type == "banner" && isActive == true && "homepage-hero" in placement &&
    (!defined(schedule.startDate) || schedule.startDate <= now()) &&
    (!defined(schedule.endDate) || schedule.endDate >= now())] | order(priority desc)[0] {
    _id,
    title,
    subtitle,
    backgroundImage,
    mobileImage,
    overlayColor,
    contentPosition,
    textColor,
    primaryCTA,
    secondaryCTA,
    showOnMobile,
    showOnDesktop,
    altText,
    trackingId
  }`,

}