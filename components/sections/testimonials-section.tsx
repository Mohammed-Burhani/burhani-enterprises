"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

  // Auto-advance testimonials every 6 seconds
  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setInterval(nextTestimonial, 6000)
      return () => clearInterval(timer)
    }
  }, [testimonials.length])

  if (loading) {
    return (
      <section className="bg-gray-100 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#2C5F7A] mb-8 sm:mb-12 md:mb-16">
            CUSTOMER TESTIMONIALS
          </h2>
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-lg sm:text-xl text-gray-600">Loading testimonials...</div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-100 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#2C5F7A] mb-8 sm:mb-12 md:mb-16"
        >
          CUSTOMER TESTIMONIALS
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-6 sm:p-8 md:p-12 shadow-lg text-center mb-4 sm:mb-6"
            >
              <div className="max-w-3xl mx-auto">
                {testimonials[currentTestimonial].authorImage && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="mb-4 sm:mb-6 flex justify-center"
                  >
                    <Image 
                      src={urlFor(testimonials[currentTestimonial].authorImage).width(80).height(80).url()} 
                      alt={testimonials[currentTestimonial].author}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </motion.div>
                )}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8"
                >
                  "{testimonials[currentTestimonial].text}"
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-[#0B3059] font-semibold text-sm sm:text-base">
                    — {testimonials[currentTestimonial].author}
                  </p>
                  {testimonials[currentTestimonial].authorTitle && (
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
                      {testimonials[currentTestimonial].authorTitle}
                    </p>
                  )}
                  {testimonials[currentTestimonial].company && (
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {testimonials[currentTestimonial].company}
                    </p>
                  )}
                  {testimonials[currentTestimonial].rating && (
                    <div className="flex justify-center mt-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-base sm:text-lg">★</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls Below Card */}
          {testimonials.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center gap-4 sm:gap-6"
            >
              {/* Previous Button */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0B3059] hover:bg-[#2C5F7A] text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>

              {/* Slide Indicators */}
              <div className="flex gap-2 sm:gap-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-200 ${
                      index === currentTestimonial 
                        ? 'bg-[#0B3059] scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0B3059] hover:bg-[#2C5F7A] text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection