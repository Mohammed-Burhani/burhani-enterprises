"use client"

import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface Specification {
  key: string
  value: string
}

interface ProductDetails {
  _id: string
  name: string
  description: string
  image: string
  brand: string
  category: string
  material?: string
  price?: number
  inStock: boolean
  specifications?: Specification[]
}

interface ProductDetailsModalProps {
  product: ProductDetails
  isOpen: boolean
  onClose: () => void
}

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0B3059] text-white p-4 sm:p-6 flex justify-between items-start rounded-t-xl">
          <h2 className="text-xl sm:text-2xl font-bold pr-8">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Image Section */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="max-w-full h-auto object-contain"
              />
            </div>

            {/* Basic Info Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Brand</h3>
                  <span className="inline-block bg-[#ABCCF0] text-[#0B3059] px-3 py-1.5 rounded-lg font-medium">
                    {product.brand}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Category</h3>
                  <span className="inline-block bg-[#92CFE9] text-[#0B3059] px-3 py-1.5 rounded-lg font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              {product.material && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Material</h3>
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                    {product.material}
                  </span>
                </div>
              )}

              {product.price !== undefined && product.price !== null && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Price</h3>
                  <p className="text-2xl font-bold text-[#0B3059]">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Availability</h3>
                <span className={`inline-block px-3 py-1.5 rounded-lg font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          {product.specifications && product.specifications.length > 0 ? (
            <div className="border-t pt-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#0B3059] mb-4">Technical Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specifications.map((spec, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-3 rounded-lg border border-gray-200"
                    >
                      <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        {spec.key}
                      </dt>
                      <dd className="text-sm text-gray-800 font-medium">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border-t pt-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#0B3059] mb-4">Technical Specifications</h3>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
                <p className="text-gray-500">No specifications available for this product.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-4 sm:p-6 rounded-b-xl border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#0B3059] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2C5F7A] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsModal
