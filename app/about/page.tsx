import AboutBanner from '@/components/sections/about-banner'
import WhyChooseUs from '@/components/sections/why-choose-us'
import ExperienceSection from '@/components/sections/experience-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import Footer from '@/components/sections/footer'

export default function About() {
  return (
    <main className="">
      <AboutBanner />
      <WhyChooseUs />
      <ExperienceSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}