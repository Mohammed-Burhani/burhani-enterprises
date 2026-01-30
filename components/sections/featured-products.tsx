"use client"

import { useState, useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { getProducts, Product, urlFor, getProductById } from '@/lib/sanity'
import ProductDetailsModal from '../ui/product-details-modal'

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<{
    _id: string
    name: string
    description: string
    image: string
    brand: string
    category: string
    material?: string
    price?: number
    inStock: boolean
    specifications?: Array<{ key: string; value: string }>
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [autoScrollStates, setAutoScrollStates] = useState<Record<string, boolean>>({})
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const autoScrollIntervals = useRef<Record<string, NodeJS.Timeout>>({})
  const [isDragging, setIsDragging] = useState<Record<string, boolean>>({})
  const [startX, setStartX] = useState<Record<string, number>>({})
  const [scrollLeft, setScrollLeft] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        if (data && data.length > 0) {
          setProducts(data)
        } else {
          // Fallback to dummy data only if no products exist
          setProducts([
            {
              _id: '1',
              name: "High-Precision Digital Caliper",
              description: "The ultimate in precision measurement for quality assurance and machining.",
              image: "/home/products/prod-2.png",
              brand: "Mitutoyo",
              category: "Measuring Tools",
              material: "Steel",
              slug: { current: "digital-caliper" },
              inStock: true,
              featured: true
            },
            {
              _id: '2',
              name: "Heavy-Duty Torque Wrench",
              description: "Essential for critical assembly in Aviation and Petrochemical sectors.",
              image: "/home/products/prod-1.png",
              brand: "Snap-on",
              category: "Hand Tools",
              material: "Steel",
              slug: { current: "torque-wrench" },
              inStock: true,
              featured: true
            },
            {
              _id: '3',
              name: "Bi-Metal Bandsaw Blade",
              description: "Designed for high-speed, durable cutting of various metals.",
              image: "/home/products/prod-3.png",
              brand: "BIPICO",
              category: "Cutting Tools",
              material: "Bi-Metal",
              slug: { current: "bandsaw-blade" },
              inStock: true,
              featured: true
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {}
    products.forEach(product => {
      const category = product.category || 'Other'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(product)
    })
    // Initialize auto-scroll states for all categories
    Object.keys(grouped).forEach(category => {
      if (autoScrollStates[category] === undefined) {
        setAutoScrollStates(prev => ({ ...prev, [category]: true }))
      }
    })
    return grouped
  }, [products, autoScrollStates])

  // Auto-scroll functionality
  useEffect(() => {
    Object.keys(productsByCategory).forEach(category => {
      if (autoScrollStates[category] && scrollRefs.current[category]) {
        autoScrollIntervals.current[category] = setInterval(() => {
          const container = scrollRefs.current[category]
          if (container) {
            const maxScroll = container.scrollWidth - container.clientWidth
            const currentScroll = container.scrollLeft
            
            if (currentScroll >= maxScroll) {
              container.scrollLeft = 0
            } else {
              container.scrollLeft += 1
            }
          }
        }, 30)
      } else {
        if (autoScrollIntervals.current[category]) {
          clearInterval(autoScrollIntervals.current[category])
        }
      }
    })

    return () => {
      Object.values(autoScrollIntervals.current).forEach(interval => clearInterval(interval))
    }
  }, [autoScrollStates, productsByCategory])

  const toggleAutoScroll = (category: string) => {
    setAutoScrollStates(prev => ({ ...prev, [category]: !prev[category] }))
  }

  const scroll = (category: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[category]
    if (container) {
      const scrollAmount = 280 // card width + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Drag to scroll functionality
  const handleMouseDown = (category: string, e: React.MouseEvent) => {
    const container = scrollRefs.current[category]
    if (container) {
      setIsDragging(prev => ({ ...prev, [category]: true }))
      setStartX(prev => ({ ...prev, [category]: e.pageX - container.offsetLeft }))
      setScrollLeft(prev => ({ ...prev, [category]: container.scrollLeft }))
      setAutoScrollStates(prev => ({ ...prev, [category]: false }))
    }
  }

  const handleMouseMove = (category: string, e: React.MouseEvent) => {
    if (!isDragging[category]) return
    e.preventDefault()
    const container = scrollRefs.current[category]
    if (container) {
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX[category]) * 2
      container.scrollLeft = scrollLeft[category] - walk
    }
  }

  const handleMouseUp = (category: string) => {
    setIsDragging(prev => ({ ...prev, [category]: false }))
  }

  const handleMouseLeave = (category: string) => {
    setIsDragging(prev => ({ ...prev, [category]: false }))
  }

  const handleDetailsClick = async (productId: string) => {
    setLoadingDetails(true)
    try {
      const fullProduct = await getProductById(productId)
      if (fullProduct) {
        const formattedProduct = {
          ...fullProduct,
          image: fullProduct.image?.asset 
            ? urlFor(fullProduct.image).width(800).height(800).url()
            : "/home/products/prod-1.png",
          specifications: fullProduct.specifications || []
        }
        setSelectedProduct(formattedProduct)
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  if (loading) {
    return (
      <section className="bg-[#D2E6FB] py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl text-[#0B3059] mb-8 tracking-widest">
            FEATURED PRODUCTS
          </h2>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#D2E6FB] py-12">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl text-[#0B3059] mb-12 tracking-widest"
        >
          FEATURED PRODUCTS
        </motion.h2>
        
        {/* Products grouped by category with carousel */}
        <div className="space-y-8">
          {Object.entries(productsByCategory).map(([category, categoryProducts], categoryIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="flex flex-col md:flex-row gap-4 md:gap-6 items-start"
            >
              {/* Category Label */}
              <div className="md:w-48 flex-shrink-0">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B3059] md:sticky md:top-24 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border-l-4 border-[#0B3059]">
                  {category}
                  <span className="block text-sm font-normal text-gray-600 mt-1">
                    {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </h3>
              </div>
              
              {/* Scrollable Products Carousel */}
              <div className="flex-1 overflow-hidden">
                <div className="relative group">
                  {/* Navigation Controls */}
                  <div className="flex items-center justify-end gap-2 mb-3">
                    <button
                      onClick={() => scroll(category, 'left')}
                      className="p-2 bg-white hover:bg-[#0B3059] text-[#0B3059] hover:text-white rounded-full shadow-md transition-all duration-200 z-10"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => toggleAutoScroll(category)}
                      className="p-2 bg-white hover:bg-[#0B3059] text-[#0B3059] hover:text-white rounded-full shadow-md transition-all duration-200 z-10"
                      aria-label={autoScrollStates[category] ? "Pause auto-scroll" : "Play auto-scroll"}
                    >
                      {autoScrollStates[category] ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => scroll(category, 'right')}
                      className="p-2 bg-white hover:bg-[#0B3059] text-[#0B3059] hover:text-white rounded-full shadow-md transition-all duration-200 z-10"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div 
                    ref={(el) => { scrollRefs.current[category] = el }}
                    className={`flex gap-4 overflow-x-auto scrollbar-hide pb-4 ${isDragging[category] ? 'cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={(e) => handleMouseDown(category, e)}
                    onMouseMove={(e) => handleMouseMove(category, e)}
                    onMouseUp={() => handleMouseUp(category)}
                    onMouseLeave={() => handleMouseLeave(category)}
                  >
                    {categoryProducts.map((product, index) => (
                      <motion.div 
                        key={product._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className="flex-shrink-0 w-64 bg-[#ABCCF0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 select-none"
                      >
                        <motion.div 
                          className="bg-white h-40 flex items-center justify-center p-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image 
                            src={product.image?.asset ? urlFor(product.image).url() : "/home/products/prod-1.png"}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="max-w-full max-h-full object-contain pointer-events-none"
                            draggable={false}
                          />
                        </motion.div>
                        <div className="p-3">
                          <h4 className="font-bold text-[#0B3059] text-base mb-2 line-clamp-2 min-h-[3rem]">
                            {product.name}
                          </h4>
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3 text-xs">
                            <span className="bg-white/50 text-[#0B3059] px-2 py-1 rounded text-xs font-medium">
                              {product.brand}
                            </span>
                          </div>
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDetailsClick(product._id)}
                            disabled={loadingDetails}
                            className="w-full bg-white text-[#0B3059] py-2 px-3 rounded font-semibold hover:bg-[#0B3059] hover:text-white transition-all duration-300 text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loadingDetails ? 'LOADING...' : 'DETAILS'}
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Scroll indicator */}
                  <div className="absolute right-0 top-12 bottom-4 w-16 bg-gradient-to-l from-[#D2E6FB] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

export default FeaturedProducts