import AboutBanner from '@/components/sections/about-banner'
import WhyChooseUs from '@/components/sections/why-choose-us'
import ExperienceSection from '@/components/sections/experience-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import { ContactSection } from '@/components'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function About() {
  return (
    <main className="">
      <AboutBanner />
      <WhyChooseUs />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  )
}