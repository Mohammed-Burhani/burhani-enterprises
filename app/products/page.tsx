"use client"

import { useState, useMemo, useEffect } from "react"
import { Filter, X } from 'lucide-react'
import ProductFilters from '@/components/sections/product-filters'
import ProductGrid from '@/components/sections/product-grid'
import Pagination from '@/components/sections/pagination'
import { getProducts, Product, urlFor } from '@/lib/sanity'
import { ContactSection } from "@/components"

interface FilterState {
  brands: string[]
  categories: string[]
  materials: string[]
}

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    materials: []
  })
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const productsPerPage = 9

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts()
        setAllProducts(products)
      } catch (error) {
        console.error('Error fetching products:', error)
        // Fallback to dummy data if Sanity fails
        setAllProducts([
          {
            _id: '1',
            name: "Stanley Professional Drill Set",
            description: "High-performance drill set with multiple bits for professional use in industrial applications.",
            image: "/home/products/prod-1.png",
            brand: "Stanley",
            category: "Power Tools",
            material: "Steel",
            slug: { current: "stanley-drill-set" },
            inStock: true,
            featured: false
          },
          {
            _id: '2',
            name: "Bosch Impact Driver",
            description: "Powerful impact driver designed for heavy-duty fastening applications in construction.",
            image: "/home/products/prod-2.png",
            brand: "Bosch",
            category: "Power Tools",
            material: "Aluminum",
            slug: { current: "bosch-impact-driver" },
            inStock: true,
            featured: false
          },
          {
            _id: '3',
            name: "Addison Carbide End Mills",
            description: "Precision carbide end mills for high-speed machining and cutting applications.",
            image: "/home/products/prod-3.png",
            brand: "Addison",
            category: "Hand Tools",
            material: "Composite",
            slug: { current: "addison-end-mills" },
            inStock: true,
            featured: false
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Convert Sanity products to match the expected format for ProductGrid
  const formattedProducts = useMemo(() => {
    return allProducts.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description,
      image: product.image?.asset ? urlFor(product.image).width(400).height(300).url() : "/home/products/prod-1.png",
      brand: product.brand,
      category: product.category,
      material: product.material
    }))
  }, [allProducts])

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return formattedProducts.filter(product => {
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
      const materialMatch = filters.materials.length === 0 || filters.materials.includes(product.material)
      
      return brandMatch && categoryMatch && materialMatch
    })
  }, [formattedProducts, filters])

  // Paginate filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const activeFiltersCount = filters.brands.length + filters.categories.length + filters.materials.length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg sm:text-xl text-gray-600">Loading products...</div>
          </div>
        ) : (
          <>
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={toggleFilters}
                className="flex items-center gap-2 bg-[#0B3059] text-white px-4 py-2 rounded-lg hover:bg-[#2C5F7A] transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#92CFE9] text-[#0B3059] px-2 py-1 rounded-full text-xs font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              {/* Desktop Filters Sidebar */}
              <div className="hidden lg:block shrink-0">
                <ProductFilters onFilterChange={handleFilterChange} />
              </div>

              {/* Mobile Filters Overlay */}
              {showFilters && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                  <div className="bg-white h-full w-80 max-w-[85vw] overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="text-lg font-semibold text-[#0B3059]">Filters</h3>
                      <button
                        onClick={toggleFilters}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <ProductFilters onFilterChange={handleFilterChange} />
                    </div>
                  </div>
                </div>
              )}

              {/* Products Content */}
              <div className="flex-1 min-w-0">
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0B3059] mb-2">Our Products</h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Showing {paginatedProducts.length} of {filteredProducts.length} products
                  </p>
                </div>

                <ProductGrid products={paginatedProducts} />

                {totalPages > 1 && (
                  <div className="mt-6 sm:mt-8">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <ContactSection />
    </div>
  )
}

export default ProductsPage