/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-icons',
      '@radix-ui/react-accordion',
      '@radix-ui/react-tooltip'
    ],
  },


  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Redirect and rewrites
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/adminpanel',
        permanent: true,
      },
    ]
  },

  // Compression
  compress: true,

  // Power by header removal
  poweredByHeader: false,

  // Strict mode
  reactStrictMode: true,

  // SWC minification
  swcMinify: true,

  // Disable ESLint during builds (for production deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Exclude admin panel from production builds completely
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Safely remove console.log in production
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((minimizer) => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            if (minimizer.options && minimizer.options.terserOptions) {
              minimizer.options.terserOptions.compress = {
                ...minimizer.options.terserOptions.compress,
                drop_console: true,
              }
            }
          }
        })
      }
    }

    // Exclude Sanity dependencies in production builds
    if (!dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@sanity/vision': false,
        'sanity/desk': false,
        'next-sanity/studio': false,
      }
    }

    return config
  },

  // Environment-based configurations
  env: {
    SKIP_ADMIN_PANEL: (process.env.NODE_ENV === 'production' && process.env.ENABLE_ADMIN_PANEL !== 'true') ? 'true' : 'false'
  },

  // Exclude admin panel pages from build
  async redirects() {
    const redirects = [
      {
        source: '/admin',
        destination: '/adminpanel',
        permanent: true,
      },
    ]

    // In production, redirect admin panel to 404
    if (process.env.NODE_ENV === 'production') {
      redirects.push({
        source: '/adminpanel/:path*',
        destination: '/404',
        permanent: false,
      })
    }

    return redirects
  },
}

module.exports = nextConfig