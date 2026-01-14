"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        if (data && data.length > 0) {
          setProducts(data.slice(0, 12))
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
          className="text-center text-3xl text-[#0B3059] mb-8 tracking-widest"
        >
          FEATURED PRODUCTS
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div 
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-[#ABCCF0] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <motion.div 
                className="bg-white h-48 flex items-center justify-center p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src={product.image?.asset ? urlFor(product.image).width(400).height(300).url() : "/home/products/prod-1.png"}
                  alt={product.name}
                  width={200}
                  height={150}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
              <div className="p-4">
                <h3 className="font-bold text-[#0B3059] text-lg mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
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
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDetailsClick(product._id)}
                  disabled={loadingDetails}
                  className="w-full bg-white text-[#0B3059] py-2 px-4 rounded font-semibold hover:bg-[#0B3059] hover:text-white transition-all duration-300 text-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingDetails ? 'LOADING...' : 'DETAILS'}
                </motion.button>
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
    </section>
  )
}

export default FeaturedProducts