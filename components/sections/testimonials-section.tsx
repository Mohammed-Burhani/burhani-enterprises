"use client"

import { useState } from "react"

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const testimonials = [
    {
      text: "Burhani Enterprises has been our primary source for specialized torque tools and safety gear for over five years. Their authorized status gives us the quality assurance our aviation projects demand.",
      author: "Senior Procurement Manager, Aviation Sector"
    },
    {
      text: "The precision cutting tools and technical expertise from Burhani Enterprises have significantly improved our manufacturing efficiency. Their product knowledge is exceptional.",
      author: "Production Manager, Heavy Engineering"
    },
    {
      text: "Reliable supply chain and genuine products make Burhani Enterprises our go-to partner for critical MRO requirements across multiple industrial facilities.",
      author: "Operations Director, Oil & Gas"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#2C5F7A] mb-16">
          CUSTOMER TESTIMONIALS
        </h2>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-lg p-12 shadow-lg text-center relative">
            <button 
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#0B3059] text-white rounded-full flex items-center justify-center hover:bg-[#2C5F7A] transition-colors"
            >
              <span className="text-xl">‹</span>
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#0B3059] text-white rounded-full flex items-center justify-center hover:bg-[#2C5F7A] transition-colors"
            >
              <span className="text-xl">›</span>
            </button>

            <div className="px-16">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {testimonials[currentTestimonial].text}
              </p>
              <p className="text-[#0B3059] font-semibold">
                — {testimonials[currentTestimonial].author}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-[#0B3059]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection