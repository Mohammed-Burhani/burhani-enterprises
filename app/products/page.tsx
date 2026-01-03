"use client"

import { useState, useMemo, useEffect } from "react"
import ProductFilters from '@/components/sections/product-filters'
import ProductGrid from '@/components/sections/product-grid'
import Pagination from '@/components/sections/pagination'
import Footer from '@/components/sections/footer'
import { getProducts, Product, urlFor } from '@/lib/sanity'

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-xl text-gray-600">Loading products...</div>
          </div>
        ) : (
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
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProductsPage