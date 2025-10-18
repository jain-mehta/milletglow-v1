import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import WhyChooseUs from '@/components/WhyChooseUs'
import BenefitsSection from '@/components/BenefitsSection'
import Testimonials from '@/components/Testimonials'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Benefits of Millet */}
      <BenefitsSection />

      {/* Testimonials */}
      <Testimonials />
    </>
  )
}