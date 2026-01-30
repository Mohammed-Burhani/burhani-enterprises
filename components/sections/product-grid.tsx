"use client"

import { useState } from "react"
import Image from "next/image"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-[#ABCCF0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="bg-white h-48 flex items-center justify-center p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="min-w-full! max-h-full object-contain"
            />
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-bold text-[#0B3059] text-base sm:text-lg mb-2 line-clamp-2">
              {product.name}
            </h3>
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

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default ProductGrid