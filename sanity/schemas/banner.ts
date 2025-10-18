export default {
  name: 'banner',
  title: 'Website Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100),
      description: 'Main headline for the banner (max 100 characters)'
    },
    {
      name: 'subtitle',
      title: 'Banner Subtitle',
      type: 'string',
      validation: (Rule: any) => Rule.max(200),
      description: 'Supporting text or description (max 200 characters)'
    },
    {
      name: 'slug',
      title: 'Banner Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Unique identifier for this banner'
    },

    // Visual Content
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Main background image for the banner (recommended: 1920x600px)'
    },
    {
      name: 'mobileImage',
      title: 'Mobile Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Optimized image for mobile devices (recommended: 768x600px)'
    },
    {
      name: 'overlayColor',
      title: 'Background Overlay',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Light Overlay', value: 'light' },
          { title: 'Dark Overlay', value: 'dark' },
          { title: 'Primary Color Overlay', value: 'primary' },
          { title: 'Secondary Color Overlay', value: 'secondary' }
        ]
      },
      initialValue: 'dark',
      description: 'Overlay to improve text readability'
    },

    // Content Positioning
    {
      name: 'contentPosition',
      title: 'Content Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' }
        ]
      },
      initialValue: 'center',
      description: 'Where to position the text content'
    },
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Dark', value: 'dark' },
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' }
        ]
      },
      initialValue: 'white',
      description: 'Color scheme for banner text'
    },

    // Call-to-Action
    {
      name: 'primaryCTA',
      title: 'Primary Call-to-Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule: any) => Rule.max(30)
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'URL or page path (e.g., /products, /contact)'
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary Button', value: 'primary' },
              { title: 'Secondary Button', value: 'secondary' },
              { title: 'Outline Button', value: 'outline' },
              { title: 'Link Style', value: 'link' }
            ]
          },
          initialValue: 'primary'
        }
      ]
    },
    {
      name: 'secondaryCTA',
      title: 'Secondary Call-to-Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule: any) => Rule.max(30)
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'URL or page path'
        },
        {
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary Button', value: 'primary' },
              { title: 'Secondary Button', value: 'secondary' },
              { title: 'Outline Button', value: 'outline' },
              { title: 'Link Style', value: 'link' }
            ]
          },
          initialValue: 'outline'
        }
      ]
    },

    // Banner Type & Placement
    {
      name: 'bannerType',
      title: 'Banner Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Banner', value: 'hero' },
          { title: 'Promotional Banner', value: 'promotional' },
          { title: 'Announcement Banner', value: 'announcement' },
          { title: 'Seasonal Campaign', value: 'seasonal' },
          { title: 'Product Launch', value: 'product-launch' },
          { title: 'Newsletter Signup', value: 'newsletter' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Type of banner for content management'
    },
    {
      name: 'placement',
      title: 'Banner Placement',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Homepage Hero', value: 'homepage-hero' },
          { title: 'Homepage Secondary', value: 'homepage-secondary' },
          { title: 'Products Page', value: 'products-page' },
          { title: 'Blog Page', value: 'blog-page' },
          { title: 'About Page', value: 'about-page' },
          { title: 'Contact Page', value: 'contact-page' },
          { title: 'Global Top Bar', value: 'global-top' },
          { title: 'Footer Banner', value: 'footer-banner' }
        ]
      },
      validation: (Rule: any) => Rule.min(1),
      description: 'Where this banner should appear on the website'
    },

    // Targeting & Scheduling
    {
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'All Visitors', value: 'all' },
          { title: 'New Visitors', value: 'new-visitors' },
          { title: 'Returning Customers', value: 'returning' },
          { title: 'Mobile Users', value: 'mobile' },
          { title: 'Desktop Users', value: 'desktop' },
          { title: 'Health Conscious', value: 'health-conscious' },
          { title: 'Fitness Enthusiasts', value: 'fitness' },
          { title: 'Families', value: 'families' }
        ]
      },
      description: 'Who should see this banner'
    },
    {
      name: 'schedule',
      title: 'Banner Schedule',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'datetime',
          description: 'When to start showing this banner'
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'datetime',
          description: 'When to stop showing this banner'
        },
        {
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          options: {
            list: [
              { title: 'India Standard Time (IST)', value: 'Asia/Kolkata' },
              { title: 'UTC', value: 'UTC' },
              { title: 'Eastern Time (EST)', value: 'America/New_York' },
              { title: 'Pacific Time (PST)', value: 'America/Los_Angeles' }
            ]
          },
          initialValue: 'Asia/Kolkata'
        }
      ]
    },

    // Analytics & Testing
    {
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(10),
      initialValue: 5,
      description: 'Priority when multiple banners are active (1 = lowest, 10 = highest)'
    },
    {
      name: 'trackingId',
      title: 'Analytics Tracking ID',
      type: 'string',
      description: 'Unique ID for tracking banner performance (e.g., "banner_summer_2024")'
    },
    {
      name: 'abTestVariant',
      title: 'A/B Test Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Control (A)', value: 'control' },
          { title: 'Variant B', value: 'variant-b' },
          { title: 'Variant C', value: 'variant-c' }
        ]
      },
      description: 'A/B testing variant identifier'
    },

    // Status & Publishing
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to activate/deactivate this banner',
      initialValue: false
    },
    {
      name: 'isPinned',
      title: 'Pinned',
      type: 'boolean',
      description: 'Pin this banner to always show (overrides scheduling)',
      initialValue: false
    },
    {
      name: 'showOnMobile',
      title: 'Show on Mobile',
      type: 'boolean',
      description: 'Display this banner on mobile devices',
      initialValue: true
    },
    {
      name: 'showOnDesktop',
      title: 'Show on Desktop',
      type: 'boolean',
      description: 'Display this banner on desktop devices',
      initialValue: true
    },

    // Performance & Optimization
    {
      name: 'lazyLoad',
      title: 'Lazy Load Images',
      type: 'boolean',
      description: 'Enable lazy loading for banner images',
      initialValue: true
    },
    {
      name: 'preloadImages',
      title: 'Preload Images',
      type: 'boolean',
      description: 'Preload banner images for faster display (use for critical banners)',
      initialValue: false
    },

    // SEO & Accessibility
    {
      name: 'altText',
      title: 'Alt Text for Image',
      type: 'string',
      validation: (Rule: any) => Rule.max(150),
      description: 'Descriptive text for screen readers and SEO (max 150 chars)'
    },
    {
      name: 'ariaLabel',
      title: 'ARIA Label',
      type: 'string',
      description: 'Accessibility label for the entire banner section'
    },

    // Internal Notes
    {
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes about this banner (not visible to public)'
    },
    {
      name: 'campaignName',
      title: 'Campaign Name',
      type: 'string',
      description: 'Internal campaign or project name'
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage',
      bannerType: 'bannerType',
      isActive: 'isActive',
      isPinned: 'isPinned',
      placement: 'placement',
      priority: 'priority'
    },
    prepare(selection: any) {
      const { title, media, bannerType, isActive, isPinned, placement, priority } = selection

      const statusIcon = isActive ? '✅' : '⏸️'
      const typeLabel = bannerType ? bannerType.replace('-', ' ').toUpperCase() : 'BANNER'

      let subtitle = `${statusIcon} ${typeLabel}`
      if (isPinned) subtitle += ' • 📌 PINNED'
      if (priority) subtitle += ` • Priority: ${priority}`
      if (placement && placement.length > 0) {
        subtitle += ` • ${placement[0]}`
        if (placement.length > 1) subtitle += ` +${placement.length - 1} more`
      }

      return {
        title,
        media,
        subtitle
      }
    }
  },

  orderings: [
    {
      title: 'Priority (Highest First)',
      name: 'priorityDesc',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Active First',
      name: 'activeFirst',
      by: [
        { field: 'isActive', direction: 'desc' },
        { field: 'priority', direction: 'desc' }
      ]
    },
    {
      title: 'Banner Type',
      name: 'bannerType',
      by: [
        { field: 'bannerType', direction: 'asc' },
        { field: 'priority', direction: 'desc' }
      ]
    },
    {
      title: 'Recently Created',
      name: 'recentlyCreated',
      by: [
        { field: '_createdAt', direction: 'desc' }
      ]
    }
  ]
}