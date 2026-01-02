import HeroSection from '@/components/ui/hero-section'
import FeaturedProducts from '@/components/sections/featured-products'
import ProductsSection from '@/components/sections/products-section'
import ContactSection from '@/components/sections/contact-section'
import Footer from '@/components/sections/footer'

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <FeaturedProducts />
      <ProductsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}