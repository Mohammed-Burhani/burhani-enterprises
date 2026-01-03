"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getTestimonials, Testimonial, urlFor } from '@/lib/sanity'

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials()
        if (data && data.length > 0) {
          setTestimonials(data)
        } else {
          // Fallback to dummy data if no testimonials in Sanity
          setTestimonials([
            {
              _id: '1',
              text: "Burhani Enterprises has been our primary source for specialized torque tools and safety gear for over five years. Their authorized status gives us the quality assurance our aviation projects demand.",
              author: "Senior Procurement Manager",
              company: "Aviation Sector",
              rating: 5,
              featured: true,
              publishedAt: new Date().toISOString()
            },
            {
              _id: '2',
              text: "The precision cutting tools and technical expertise from Burhani Enterprises have significantly improved our manufacturing efficiency. Their product knowledge is exceptional.",
              author: "Production Manager",
              company: "Heavy Engineering",
              rating: 5,
              featured: true,
              publishedAt: new Date().toISOString()
            },
            {
              _id: '3',
              text: "Reliable supply chain and genuine products make Burhani Enterprises our go-to partner for critical MRO requirements across multiple industrial facilities.",
              author: "Operations Director",
              company: "Oil & Gas",
              rating: 5,
              featured: true,
              publishedAt: new Date().toISOString()
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        // Fallback to dummy data
        setTestimonials([
          {
            _id: '1',
            text: "Burhani Enterprises has been our primary source for specialized torque tools and safety gear for over five years. Their authorized status gives us the quality assurance our aviation projects demand.",
            author: "Senior Procurement Manager",
            company: "Aviation Sector",
            rating: 5,
            featured: true,
            publishedAt: new Date().toISOString()
          },
          {
            _id: '2',
            text: "The precision cutting tools and technical expertise from Burhani Enterprises have significantly improved our manufacturing efficiency. Their product knowledge is exceptional.",
            author: "Production Manager",
            company: "Heavy Engineering",
            rating: 5,
            featured: true,
            publishedAt: new Date().toISOString()
          },
          {
            _id: '3',
            text: "Reliable supply chain and genuine products make Burhani Enterprises our go-to partner for critical MRO requirements across multiple industrial facilities.",
            author: "Operations Director",
            company: "Oil & Gas",
            rating: 5,
            featured: true,
            publishedAt: new Date().toISOString()
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (loading) {
    return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#2C5F7A] mb-16">
            CUSTOMER TESTIMONIALS
          </h2>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-xl text-gray-600">Loading testimonials...</div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
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
              {testimonials[currentTestimonial].authorImage && (
                <div className="mb-6 flex justify-center">
                  <Image 
                    src={urlFor(testimonials[currentTestimonial].authorImage).width(80).height(80).url()} 
                    alt={testimonials[currentTestimonial].author}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {testimonials[currentTestimonial].text}
              </p>
              <div className="text-center">
                <p className="text-[#0B3059] font-semibold">
                  — {testimonials[currentTestimonial].author}
                </p>
                {testimonials[currentTestimonial].authorTitle && (
                  <p className="text-gray-600 text-sm mt-1">
                    {testimonials[currentTestimonial].authorTitle}
                  </p>
                )}
                {testimonials[currentTestimonial].company && (
                  <p className="text-gray-600 text-sm">
                    {testimonials[currentTestimonial].company}
                  </p>
                )}
                {testimonials[currentTestimonial].rating && (
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                )}
              </div>
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