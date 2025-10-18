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
      name: 'description',
      title: 'Product Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule: any) => Rule.max(100)
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
      of: [{ type: 'string' }]
    },
    {
      name: 'ingredients',
      title: 'Ingredients List',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'string',
      options: {
        list: [
          { title: 'Millet Flour/Powder', value: 'millet-flour' },
          { title: 'Whole Millet Grains', value: 'millet-grains' },
          { title: 'Millet Snacks', value: 'millet-snacks' },
          { title: 'Millet Mix/Blend', value: 'millet-mix' },
          { title: 'Ready-to-Cook', value: 'ready-to-cook' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'weight',
      title: 'Package Weight',
      type: 'string',
      placeholder: 'e.g., 1kg, 500g, 250g'
    },
    {
      name: 'shelfLife',
      title: 'Shelf Life',
      type: 'string',
      placeholder: 'e.g., 12 months, 6 months'
    },
    {
      name: 'origin',
      title: 'Origin',
      type: 'string',
      placeholder: 'e.g., Karnataka, Andhra Pradesh'
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
      subtitle: 'category'
    }
  }
}