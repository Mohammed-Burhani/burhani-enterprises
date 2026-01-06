import ContactInfoSection from '@/components/sections/contact-info-section'
import LocationMapSection from '@/components/sections/location-map-section'
import { ContactSection } from '@/components'

export default function Contact() {
  return (
    <main className="">
      <ContactInfoSection />
      <LocationMapSection />
      <ContactSection />
    </main>
  )
}