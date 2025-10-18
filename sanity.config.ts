import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'millet-glow',
  title: 'Millet Glow CMS',

  projectId: 'z3uea27k',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content Management')
          .items([
            // Products section
            S.listItem()
              .title('🌾 Products')
              .child(
                S.list()
                  .title('Product Management')
                  .items([
                    S.listItem()
                      .title('All Products')
                      .child(S.documentTypeList('product').title('All Products')),
                    S.listItem()
                      .title('Featured Products')
                      .child(
                        S.documentList()
                          .title('Featured Products')
                          .filter('_type == "product" && isFeatured == true')
                          .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Out of Stock')
                      .child(
                        S.documentList()
                          .title('Out of Stock Products')
                          .filter('_type == "product" && isOutOfStock == true')
                          .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('By Category')
                      .child(
                        S.list()
                          .title('Products by Category')
                          .items([
                            S.listItem()
                              .title('Millet Flour/Powder')
                              .child(
                                S.documentList()
                                  .title('Millet Flour Products')
                                  .filter('_type == "product" && category == "millet-flour"')
                              ),
                            S.listItem()
                              .title('Whole Millet Grains')
                              .child(
                                S.documentList()
                                  .title('Whole Grain Products')
                                  .filter('_type == "product" && category == "millet-grains"')
                              ),
                            S.listItem()
                              .title('Millet Snacks')
                              .child(
                                S.documentList()
                                  .title('Millet Snack Products')
                                  .filter('_type == "product" && category == "millet-snacks"')
                              ),
                            S.listItem()
                              .title('Millet Mix/Blend')
                              .child(
                                S.documentList()
                                  .title('Millet Mix Products')
                                  .filter('_type == "product" && category == "millet-mix"')
                              ),
                            S.listItem()
                              .title('Ready-to-Cook')
                              .child(
                                S.documentList()
                                  .title('Ready-to-Cook Products')
                                  .filter('_type == "product" && category == "ready-to-cook"')
                              ),
                          ])
                      ),
                  ])
              ),

            // Blog section
            S.listItem()
              .title('📝 Blog')
              .child(
                S.list()
                  .title('Blog Management')
                  .items([
                    S.listItem()
                      .title('All Posts')
                      .child(S.documentTypeList('blog').title('All Blog Posts')),
                    S.listItem()
                      .title('Published Posts')
                      .child(
                        S.documentList()
                          .title('Published Posts')
                          .filter('_type == "blog" && isPublished == true')
                          .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Draft Posts')
                      .child(
                        S.documentList()
                          .title('Draft Posts')
                          .filter('_type == "blog" && isPublished == false')
                          .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Featured Posts')
                      .child(
                        S.documentList()
                          .title('Featured Blog Posts')
                          .filter('_type == "blog" && isFeatured == true')
                          .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('By Category')
                      .child(
                        S.list()
                          .title('Posts by Category')
                          .items([
                            S.listItem()
                              .title('Nutrition & Health')
                              .child(
                                S.documentList()
                                  .title('Nutrition & Health Posts')
                                  .filter('_type == "blog" && category == "nutrition-health"')
                              ),
                            S.listItem()
                              .title('Recipes & Cooking')
                              .child(
                                S.documentList()
                                  .title('Recipes & Cooking Posts')
                                  .filter('_type == "blog" && category == "recipes-cooking"')
                              ),
                            S.listItem()
                              .title('Millet Benefits')
                              .child(
                                S.documentList()
                                  .title('Millet Benefits Posts')
                                  .filter('_type == "blog" && category == "millet-benefits"')
                              ),
                            S.listItem()
                              .title('Lifestyle & Wellness')
                              .child(
                                S.documentList()
                                  .title('Lifestyle & Wellness Posts')
                                  .filter('_type == "blog" && category == "lifestyle-wellness"')
                              ),
                          ])
                      ),
                  ])
              ),

            // Testimonials section
            S.listItem()
              .title('⭐ Testimonials')
              .child(
                S.list()
                  .title('Customer Reviews')
                  .items([
                    S.listItem()
                      .title('All Testimonials')
                      .child(S.documentTypeList('testimonial').title('All Testimonials')),
                    S.listItem()
                      .title('Approved Reviews')
                      .child(
                        S.documentList()
                          .title('Approved Testimonials')
                          .filter('_type == "testimonial" && status == "approved"')
                          .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Pending Review')
                      .child(
                        S.documentList()
                          .title('Pending Testimonials')
                          .filter('_type == "testimonial" && status == "pending"')
                          .defaultOrdering([{field: 'submittedAt', direction: 'asc'}])
                      ),
                    S.listItem()
                      .title('Featured Reviews')
                      .child(
                        S.documentList()
                          .title('Featured Testimonials')
                          .filter('_type == "testimonial" && isFeatured == true')
                          .defaultOrdering([{field: 'rating', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Verified Purchases')
                      .child(
                        S.documentList()
                          .title('Verified Testimonials')
                          .filter('_type == "testimonial" && isVerified == true')
                          .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                      ),
                  ])
              ),

            // Banners section
            S.listItem()
              .title('🎯 Banners')
              .child(
                S.list()
                  .title('Banner Management')
                  .items([
                    S.listItem()
                      .title('All Banners')
                      .child(S.documentTypeList('banner').title('All Banners')),
                    S.listItem()
                      .title('Active Banners')
                      .child(
                        S.documentList()
                          .title('Active Banners')
                          .filter('_type == "banner" && isActive == true')
                          .defaultOrdering([{field: 'priority', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Hero Banners')
                      .child(
                        S.documentList()
                          .title('Hero Banners')
                          .filter('_type == "banner" && bannerType == "hero"')
                          .defaultOrdering([{field: 'priority', direction: 'desc'}])
                      ),
                    S.listItem()
                      .title('Promotional Banners')
                      .child(
                        S.documentList()
                          .title('Promotional Banners')
                          .filter('_type == "banner" && bannerType == "promotional"')
                          .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                      ),
                  ])
              ),

            S.divider(),

            // Analytics Dashboard
            S.listItem()
              .title('📊 Analytics Overview')
              .child(
                S.list()
                  .title('Content Analytics')
                  .items([
                    S.listItem()
                      .title('Featured Content')
                      .child(
                        S.list()
                          .title('Featured Content Overview')
                          .items([
                            S.listItem()
                              .title('Featured Products')
                              .child(
                                S.documentList()
                                  .title('Featured Products')
                                  .filter('_type == "product" && isFeatured == true')
                              ),
                            S.listItem()
                              .title('Featured Blog Posts')
                              .child(
                                S.documentList()
                                  .title('Featured Blog Posts')
                                  .filter('_type == "blog" && isFeatured == true')
                              ),
                            S.listItem()
                              .title('Featured Testimonials')
                              .child(
                                S.documentList()
                                  .title('Featured Testimonials')
                                  .filter('_type == "testimonial" && isFeatured == true')
                              ),
                          ])
                      ),
                    S.listItem()
                      .title('Recent Activity')
                      .child(
                        S.list()
                          .title('Recent Content Activity')
                          .items([
                            S.listItem()
                              .title('Recently Updated Products')
                              .child(
                                S.documentList()
                                  .title('Recently Updated Products')
                                  .filter('_type == "product"')
                                  .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
                              ),
                            S.listItem()
                              .title('Recent Blog Posts')
                              .child(
                                S.documentList()
                                  .title('Recent Blog Posts')
                                  .filter('_type == "blog"')
                                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                              ),
                            S.listItem()
                              .title('Recent Testimonials')
                              .child(
                                S.documentList()
                                  .title('Recent Testimonials')
                                  .filter('_type == "testimonial"')
                                  .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
                              ),
                          ])
                      ),
                  ])
              ),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})