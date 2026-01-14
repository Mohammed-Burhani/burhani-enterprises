'use client'
import ProductShowcase from '../ui/product-showcase'
import { motion } from 'framer-motion'

const ProductsSection = () => {
  const products = [
    {
      title: "Tool Sourcing & Kits",
      description: "Curated Tool Kits for Every Industry: We streamline your procurement process by providing complete, pre-configured tool kits for new plant setups, scheduled turnarounds, and specialized technical teams. Custom kitting is available for Railway, Aviation, and Construction needs.",
      buttonText: "EXPLORE",
      image: "/home/core-categories/cc-1.png",
      imagePosition: 'right' as const
    },
    {
      title: "The Reliable Supply Chain", 
      description: "Fluid Power & Control Components: Your operation demands zero downtime. We stock and supply high-quality Hydraulic and Pneumatic Valves & Fittings from industry leaders like FESTO, SMC, YUKEN, and REXROTH.",
      buttonText: "EXPLORE",
      image: "/home/core-categories/cc-3.png",
      imagePosition: 'left' as const
    },
    {
      title: "Precision Cutting Equipment",
      description: "Engineered for Performance and Durability: Our range includes HSS, Carbide, and TCT cutting tools, abrasives, and files designed to meet the rigorous demands of heavy fabrication and continuous production environments. Get the right tool for the job, every time.",
      buttonText: "EXPLORE", 
      image: "/home/core-categories/cc-2.png",
      imagePosition: 'right' as const
    }
  ]

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl text-[#0B3059] mb-8 uppercase tracking-widest"
        >
          Core Categories
        </motion.h2>
        <div className="flex flex-col gap-y-12 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <ProductShowcase
              key={index}
              title={product.title}
              description={product.description}
              buttonText={product.buttonText}
              image={product.image}
              imagePosition={product.imagePosition}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsSection