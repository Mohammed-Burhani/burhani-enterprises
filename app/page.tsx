import HeroSection from '@/components/ui/hero-section'
import FeaturedProducts from '@/components/sections/featured-products'
import ProductsSection from '@/components/sections/products-section'
import ContactSection from '@/components/sections/contact-section'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <FeaturedProducts />
      <ProductsSection />
      <ContactSection />
    </main>
  )
}