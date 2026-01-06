import HeroSection from '@/components/ui/hero-section'
import FeaturedProducts from '@/components/sections/featured-products'
import ProductsSection from '@/components/sections/products-section'
import ContactSection from '@/components/sections/contact-section'

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