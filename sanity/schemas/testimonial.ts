export default {
  name: 'testimonial',
  title: 'Customer Testimonial',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(2).max(50),
      description: 'Full name of the customer (2-50 characters)'
    },
    {
      name: 'customerImage',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Customer profile photo (optional but recommended for authenticity)'
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1 Star', value: 1 },
          { title: '⭐⭐ 2 Stars', value: 2 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 }
        ]
      },
      description: 'Customer satisfaction rating (1-5 stars)'
    },
    {
      name: 'reviewText',
      title: 'Review Content',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(20).max(500),
      description: 'Customer review text (20-500 characters for optimal display)'
    },

    // Customer Details
    {
      name: 'customerInfo',
      title: 'Customer Information',
      type: 'object',
      fields: [
        {
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'City, State, or Country (e.g., "Mumbai, Maharashtra")'
        }
      ],
      description: 'Additional customer demographics for credibility'
    },

    {
      name: 'purchaseDetails',
      title: 'Purchase Information',
      type: 'object',
      fields: [
        {
          name: 'purchaseDate',
          title: 'Purchase Date',
          type: 'date',
          description: 'When the customer purchased the product'
        },
        {
          name: 'usageDuration',
          title: 'Usage Duration',
          type: 'string',
          options: {
            list: [
              { title: '1 week', value: '1-week' },
              { title: '2-4 weeks', value: '2-4-weeks' },
              { title: '1-3 months', value: '1-3-months' },
              { title: '3-6 months', value: '3-6-months' },
              { title: '6+ months', value: '6-plus-months' }
            ]
          },
          description: 'How long they have been using the product'
        },
        {
          name: 'orderValue',
          title: 'Order Value Range',
          type: 'string',
          options: {
            list: [
              { title: '₹500-1000', value: '500-1000' },
              { title: '₹1000-2000', value: '1000-2000' },
              { title: '₹2000-5000', value: '2000-5000' },
              { title: '₹5000+', value: '5000-plus' }
            ]
          }
        }
      ]
    },


    // Moderation & Status
    {
      name: 'status',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ Approved', value: 'approved' },
          { title: '⏳ Pending Review', value: 'pending' },
          { title: '❌ Rejected', value: 'rejected' },
          { title: '🔄 Needs Changes', value: 'needs-changes' }
        ]
      },
      initialValue: 'pending',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isFeatured',
      title: 'Featured Review',
      type: 'boolean',
      description: 'Display this review prominently on homepage and product pages',
      initialValue: false
    },
    {
      name: 'isVerified',
      title: 'Verified Purchase',
      type: 'boolean',
      description: 'Confirmed as authentic purchase from verified customer',
      initialValue: false
    },
    {
      name: 'showOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Include in homepage testimonials carousel',
      initialValue: true
    },

    // Internal Notes
    {
      name: 'moderationNotes',
      title: 'Moderation Notes',
      type: 'text',
      description: 'Internal notes for review moderation (not visible to public)'
    },
    {
      name: 'submissionSource',
      title: 'Submission Source',
      type: 'string',
      options: {
        list: [
          { title: 'Website Contact Form', value: 'website-form' },
          { title: 'Email', value: 'email' },
          { title: 'Phone Call', value: 'phone' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'In-Person', value: 'in-person' }
        ]
      },
      description: 'How this testimonial was collected'
    },

    {
      name: 'approvedAt',
      title: 'Approval Date',
      type: 'datetime',
      description: 'When this testimonial was approved for publication'
    }
  ],

  preview: {
    select: {
      name: 'customerName',
      media: 'customerImage',
      rating: 'rating',
      review: 'reviewText',
      status: 'status',
      isFeatured: 'isFeatured',
      isVerified: 'isVerified'
    },
    prepare(selection: any) {
      const { name, media, rating, review, status, isFeatured, isVerified } = selection

      const stars = '⭐'.repeat(rating || 0)
      const statusIcon = status === 'approved' ? '✅' : status === 'pending' ? '⏳' : status === 'rejected' ? '❌' : '🔄'

      let subtitle = `${stars} • ${statusIcon} ${status?.toUpperCase()}`
      if (isVerified) subtitle += ' • VERIFIED'
      if (isFeatured) subtitle += ' • FEATURED'

      return {
        title: `${name}`,
        media,
        subtitle: subtitle + ` • "${review?.substring(0, 40)}..."`
      }
    }
  },

  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'rating', direction: 'desc' },
        { field: 'approvedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Highest Rated',
      name: 'highestRated',
      by: [
        { field: 'rating', direction: 'desc' },
        { field: 'approvedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Most Recent',
      name: 'mostRecent',
      by: [
        { field: 'approvedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Pending Review',
      name: 'pendingReview',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'approvedAt', direction: 'asc' }
      ]
    }
  ]
}