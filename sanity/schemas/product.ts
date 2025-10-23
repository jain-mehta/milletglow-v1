export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Main Product Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Product Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive()
    },
    {
      name: 'discount',
      title: 'Discount Percentage',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(100),
      description: 'Enter discount percentage (0-100). Leave empty for no discount.'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100),
      description: 'Brief description shown on product cards'
    },
    {
      name: 'certifications',
      title: 'Certifications & Badges',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Add custom certifications and quality badges (type and press Enter)'
    },
    {
      name: 'nutritionFacts',
      title: 'Nutrition Facts (per 100g)',
      type: 'object',
      fields: [
        {
          name: 'energy',
          title: 'Energy (kcal)',
          type: 'number'
        },
        {
          name: 'protein',
          title: 'Protein (g)',
          type: 'number'
        },
        {
          name: 'carbohydrates',
          title: 'Carbohydrates (g)',
          type: 'number'
        },
        {
          name: 'fiber',
          title: 'Dietary Fiber (g)',
          type: 'number'
        },
        {
          name: 'fat',
          title: 'Total Fat (g)',
          type: 'number'
        },
        {
          name: 'sodium',
          title: 'Sodium (mg)',
          type: 'number'
        },
        {
          name: 'iron',
          title: 'Iron (mg)',
          type: 'number'
        },
        {
          name: 'calcium',
          title: 'Calcium (mg)',
          type: 'number'
        }
      ]
    },
    {
      name: 'benefits',
      title: 'Health Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List key health benefits of this product'
    },
    {
      name: 'isOutOfStock',
      title: 'Out of Stock',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
      discount: 'discount',
      isOutOfStock: 'isOutOfStock',
      isFeatured: 'isFeatured'
    },
    prepare(selection: any) {
      const { title, media, price, discount, isOutOfStock, isFeatured } = selection

      let subtitle = `₹${price}`
      if (discount) subtitle += ` (-${discount}%)`
      if (isOutOfStock) subtitle += ' • OUT OF STOCK'
      if (isFeatured) subtitle += ' • FEATURED'

      return {
        title,
        media,
        subtitle
      }
    }
  }
}