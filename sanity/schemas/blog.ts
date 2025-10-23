export default {
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100),
      description: 'Main title for the blog post (max 100 characters for SEO)'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required(),
      description: 'URL-friendly version of the title'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief summary for blog cards and social sharing (max 200 chars)',
      validation: (Rule: any) => Rule.required().min(50).max(200)
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Main image displayed in blog listing and detail page header'
    },

    // Content Section
    {
      name: 'content',
      title: 'Blog Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          type: 'object',
          name: 'video',
          title: 'Video Embed',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube, Vimeo, or direct video URL'
            },
            {
              name: 'caption',
              title: 'Video Caption',
              type: 'string'
            }
          ]
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Success', value: 'success' },
                  { title: 'Tip', value: 'tip' }
                ]
              }
            },
            {
              name: 'title',
              title: 'Callout Title',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Callout Content',
              type: 'text'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required(),
      description: 'Rich content with text, images, videos, and callout boxes'
    },

    // Blog Metadata
    {
      name: 'category',
      title: 'Blog Category',
      type: 'string',
      options: {
        list: [
          { title: 'Nutrition & Health', value: 'nutrition-health' },
          { title: 'Recipes & Cooking', value: 'recipes-cooking' },
          { title: 'Millet Benefits', value: 'millet-benefits' },
          { title: 'Lifestyle & Wellness', value: 'lifestyle-wellness' },
          { title: 'Company News', value: 'company-news' },
          { title: 'Farming & Sustainability', value: 'farming-sustainability' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Primary category for this blog post'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Keywords and topics covered in this post'
    },

    // Author Information
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Author Name',
          type: 'string',
          initialValue: 'Millet Glow Team'
        },
        {
          name: 'bio',
          title: 'Author Bio',
          type: 'text'
        },
        {
          name: 'image',
          title: 'Author Photo',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },

    // Publishing & Status
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to publish/unpublish this post',
      initialValue: false
    },
    {
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Display this post prominently on homepage and blog page',
      initialValue: false
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes'
    },

  ],

  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
      isPublished: 'isPublished',
      isFeatured: 'isFeatured',
      category: 'category'
    },
    prepare(selection: any) {
      const { title, media, publishedAt, isPublished, isFeatured, category } = selection

      let subtitle = category ? category.replace('-', ' ').toUpperCase() : 'UNCATEGORIZED'
      if (publishedAt) subtitle += ` • ${new Date(publishedAt).toLocaleDateString()}`
      if (!isPublished) subtitle += ' • DRAFT'
      if (isFeatured) subtitle += ' • FEATURED'

      return {
        title: `${isPublished ? '✅' : '📝'} ${title}`,
        media,
        subtitle
      }
    }
  },

  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
}