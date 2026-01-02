"use client"

import { useState, useMemo } from "react"
import ProductFilters from '@/components/sections/product-filters'
import ProductGrid from '@/components/sections/product-grid'
import Pagination from '@/components/sections/pagination'
import Footer from '@/components/sections/footer'

interface Product {
  id: number
  name: string
  description: string
  image: string
  brand: string
  category: string
  material: string
}

interface FilterState {
  brands: string[]
  categories: string[]
  materials: string[]
}

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    materials: []
  })
  
  const productsPerPage = 9

  // Dummy product data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Stanley Professional Drill Set",
      description: "High-performance drill set with multiple bits for professional use in industrial applications.",
      image: "/home/products/prod-1.png",
      brand: "Stanley",
      category: "Power Tools",
      material: "Steel"
    },
    {
      id: 2,
      name: "Bosch Impact Driver",
      description: "Powerful impact driver designed for heavy-duty fastening applications in construction.",
      image: "/home/products/prod-2.png",
      brand: "Bosch",
      category: "Power Tools",
      material: "Aluminum"
    },
    {
      id: 3,
      name: "Addison Carbide End Mills",
      description: "Precision carbide end mills for high-speed machining and cutting applications.",
      image: "/home/products/prod-3.png",
      brand: "Addison",
      category: "Hand Tools",
      material: "Composite"
    },
    {
      id: 4,
      name: "Stanley Hand Tool Kit",
      description: "Complete hand tool kit with wrenches, screwdrivers, and pliers for maintenance work.",
      image: "/home/products/prod-1.png",
      brand: "Stanley",
      category: "Hand Tools",
      material: "Steel"
    },
    {
      id: 5,
      name: "Dewalt Circular Saw",
      description: "Professional-grade circular saw with precision cutting capabilities for wood and metal.",
      image: "/home/products/prod-2.png",
      brand: "Dewalt",
      category: "Power Tools",
      material: "Aluminum"
    },
    {
      id: 6,
      name: "Blue Point Socket Set",
      description: "Premium socket set with various sizes for automotive and industrial applications.",
      image: "/home/products/prod-3.png",
      brand: "Blue Point",
      category: "Hand Tools",
      material: "Steel"
    },
    {
      id: 7,
      name: "Stanley Fastener Collection",
      description: "Comprehensive collection of bolts, nuts, and screws for various industrial needs.",
      image: "/home/products/prod-1.png",
      brand: "Stanley",
      category: "Fasteners",
      material: "Steel"
    },
    {
      id: 8,
      name: "Bosch Angle Grinder",
      description: "Heavy-duty angle grinder for cutting, grinding, and polishing metal surfaces.",
      image: "/home/products/prod-2.png",
      brand: "Bosch",
      category: "Power Tools",
      material: "Iron"
    },
    {
      id: 9,
      name: "Addison Drill Bits Set",
      description: "High-speed steel drill bits for precision drilling in various materials.",
      image: "/home/products/prod-3.png",
      brand: "Addison",
      category: "Hand Tools",
      material: "Steel"
    },
    {
      id: 10,
      name: "Dewalt Hammer Drill",
      description: "Powerful hammer drill for concrete and masonry drilling applications.",
      image: "/home/products/prod-1.png",
      brand: "Dewalt",
      category: "Power Tools",
      material: "Aluminum"
    },
    {
      id: 11,
      name: "Blue Point Torque Wrench",
      description: "Precision torque wrench for accurate fastening in critical applications.",
      image: "/home/products/prod-2.png",
      brand: "Blue Point",
      category: "Hand Tools",
      material: "Steel"
    },
    {
      id: 12,
      name: "Stanley Safety Equipment",
      description: "Complete safety gear including helmets, gloves, and protective eyewear.",
      image: "/home/products/prod-3.png",
      brand: "Stanley",
      category: "Hand Tools",
      material: "Composite"
    }
  ]

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
      const materialMatch = filters.materials.length === 0 || filters.materials.includes(product.material)
      
      return brandMatch && categoryMatch && materialMatch
    })
  }, [filters])

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="shrink-0">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Products Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#0B3059] mb-2">Our Products</h1>
              <p className="text-gray-600">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </p>
            </div>

            <ProductGrid products={paginatedProducts} />

            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductsPage