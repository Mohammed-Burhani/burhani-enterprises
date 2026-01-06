"use client"

import { useState, useEffect } from 'react'
import ProductCard from '../ui/product-card'
import { getFeaturedProducts, Product, urlFor } from '@/lib/sanity'

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getFeaturedProducts()
        if (data && data.length > 0) {
          setProducts(data)
        } else {
          // Fallback to dummy data only if no products exist
          setProducts([
            {
              _id: '1',
              name: "High-Precision Digital Caliper",
              description: "The ultimate in precision measurement for quality assurance and machining. We stock instruments from Mitutoyo and BAKER for guaranteed accuracy.",
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
              description: "Essential for critical assembly in Aviation and Petrochemical sectors. We supply calibrated tools from Snap-on and Blue-Point to ensure superior joint integrity.",
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
              description: "Designed for high-speed, durable cutting of various metals. Our blades from BIPICO and Hakanson offer extended life and cleaner cuts in heavy fabrication.",
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
        console.error('Error fetching featured products:', error)
        // Use fallback data on error
        setProducts([
          {
            _id: '1',
            name: "High-Precision Digital Caliper",
            description: "The ultimate in precision measurement for quality assurance and machining. We stock instruments from Mitutoyo and BAKER for guaranteed accuracy.",
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
            description: "Essential for critical assembly in Aviation and Petrochemical sectors. We supply calibrated tools from Snap-on and Blue-Point to ensure superior joint integrity.",
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
            description: "Designed for high-speed, durable cutting of various metals. Our blades from BIPICO and Hakanson offer extended life and cleaner cuts in heavy fabrication.",
            image: "/home/products/prod-3.png",
            brand: "BIPICO",
            category: "Cutting Tools",
            material: "Bi-Metal",
            slug: { current: "bandsaw-blade" },
            inStock: true,
            featured: true
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
        <h2 className="text-center text-3xl text-[#0B3059] mb-8 tracking-widest">
          FEATURED PRODUCTS
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product._id}
              title={product.name}
              description={product.description}
              buttonText="Get Quote"
              image={product.image?.asset ? urlFor(product.image).width(400).height(300).url() : "/home/products/prod-1.png"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts