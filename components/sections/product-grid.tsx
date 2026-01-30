"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import ProductDetailsModal from "@/components/ui/product-details-modal"
import { getProductById, urlFor } from "@/lib/sanity"

interface Product {
  id: string | number
  name: string
  description: string
  image: string
  brand: string
  category: string
  material: string
}

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
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
  const [loading, setLoading] = useState(false)
  const [autoScrollStates, setAutoScrollStates] = useState<Record<string, boolean>>({})
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const autoScrollIntervals = useRef<Record<string, NodeJS.Timeout>>({})
  const [isDragging, setIsDragging] = useState<Record<string, boolean>>({})
  const [startX, setStartX] = useState<Record<string, number>>({})
  const [scrollLeft, setScrollLeft] = useState<Record<string, number>>({})

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

  const handleDetailsClick = async (productId: string | number) => {
    setLoading(true)
    try {
      const fullProduct = await getProductById(productId.toString())
      if (fullProduct) {
        // Format the product data for the modal
        const formattedProduct = {
          ...fullProduct,
          image: fullProduct.image?.asset
            ? urlFor(fullProduct.image).url()
            : "/home/products/prod-1.png",
          specifications: fullProduct.specifications || []
        }
        setSelectedProduct(formattedProduct)
        setIsModalOpen(true)
      } else {
        console.error('Product not found')
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }
  
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">No products found</h3>
        <p className="text-gray-500 text-sm">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <div key={category}>
          {/* Category Header with Navigation Controls */}
          <div className="flex items-center justify-between mb-6 border-b-2 border-[#0B3059] pb-2">
            <h3 className="text-2xl font-bold text-[#0B3059]">
              {category}
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({categoryProducts.length})
              </span>
            </h3>
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll(category, 'left')}
                disabled={autoScrollStates[category]}
                className="p-2 bg-white hover:bg-[#0B3059] text-[#0B3059] hover:text-white rounded-full shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#0B3059]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleAutoScroll(category)}
                className="p-2 bg-white hover:bg-[#0B3059] text-[#0B3059] hover:text-white rounded-full shadow-md transition-all duration-200"
                aria-label={autoScrollStates[category] ? "Pause auto-scroll" : "Play auto-scroll"}
              >
                {autoScrollStates[category] ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={() => scroll(category, 'right')}
                disabled={autoScrollStates[category]}
                className="p-2 bg-white hover:bg-[#0B3059] text-[#0B3059] hover:text-white rounded-full shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#0B3059]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Scrollable Grid */}
          <div className="relative group">
            <div 
              ref={(el) => { scrollRefs.current[category] = el }}
              className={`flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 ${isDragging[category] ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={(e) => handleMouseDown(category, e)}
              onMouseMove={(e) => handleMouseMove(category, e)}
              onMouseUp={() => handleMouseUp(category)}
              onMouseLeave={() => handleMouseLeave(category)}
            >
              {categoryProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-shrink-0 w-72 bg-[#ABCCF0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-2 select-none"
                >
                  <div className="bg-white h-48 flex items-center justify-center p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="max-w-full max-h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="font-bold text-[#0B3059] text-base sm:text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3 text-xs">
                      <span className="bg-white/50 text-[#0B3059] px-2 py-1 rounded text-xs font-medium">
                        {product.brand}
                      </span>
                      <span className="bg-white/50 text-[#0B3059] px-2 py-1 rounded text-xs font-medium">
                        {product.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDetailsClick(product.id)}
                      disabled={loading}
                      className="w-full bg-white text-[#0B3059] py-2 px-4 rounded font-semibold hover:bg-[#0B3059] hover:text-white transition-all duration-300 text-xs sm:text-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'LOADING...' : 'DETAILS'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      ))}

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
    </div>
  )
}

export default ProductGrid