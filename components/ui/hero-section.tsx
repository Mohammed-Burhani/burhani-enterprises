'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Precision Tools for Industrial Power",
      description: "Partner with Burhani Enterprises for reliable MRO solutions. We supply the high-performance Hand Tools, Cutting Tools, and Fluid Power Components that keep the Oil & Gas, Petrochemical, and Heavy Engineering sectors running smoothly.",
      image: "/home/banner.png",
      buttonText: "Explore Products"
    },
    {
      id: 2,
      title: "Advanced Cutting Solutions",
      description: "Discover our comprehensive range of cutting tools designed for precision and durability. From carbide inserts to specialized drilling equipment, we provide the tools that enhance your operational efficiency.",
      image: "/home/banner.png",
      buttonText: "View Cutting Tools"
    },
    {
      id: 3,
      title: "Fluid Power Excellence",
      description: "Complete hydraulic and pneumatic solutions for industrial applications. Our fluid power components ensure reliable performance in the most demanding environments.",
      image: "/home/banner.png",
      buttonText: "Discover Solutions"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-white px-3 sm:px-6 py-4 sm:py-8">
      <div className="container mx-auto">
        {/* Hero Card */}
        <div className="relative rounded-lg overflow-hidden mb-4 sm:mb-6">
          {/* Slides Container */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div 
                  className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                  style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                >
                  <div className="bg-black/60 absolute inset-0 w-full h-full" />
                  
                  {/* Content */}
                  <div className="px-4 sm:px-8 md:px-12 z-10 text-center max-w-4xl mx-auto">
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
                    >
                      {slides[currentSlide].title}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                      {slides[currentSlide].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <Link href="/products">
                        <button className="bg-white text-[#0B3059] px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#0B3059] hover:text-white transition-all duration-300 text-sm sm:text-base">
                          {slides[currentSlide].buttonText}
                        </button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Controls Below Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-4 sm:gap-6"
        >
          {/* Previous Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#92CFE9] hover:bg-[#7BC4E6] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" />
          </motion.button>

          {/* Slide Indicators */}
          <div className="flex gap-2 sm:gap-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-[#0B3059] scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#92CFE9] hover:bg-[#7BC4E6] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection