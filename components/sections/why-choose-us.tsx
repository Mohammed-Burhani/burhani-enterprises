'use client'
import Image from "next/image"
import { motion } from 'framer-motion'

const WhyChooseUs = () => {
  const features = [
    {
      title: "AUTHORIZED CHANNEL PARTNERSHIPS",
      description: "We are official channel partners for global leaders like Blue-Point Snap-on, Bipico, and Hukusson Sweden. This ensures every product you receive is genuine, warrantied, and of the highest industrial grade.",
      image: "/home/core-categories/cc-1.png"
    },
    {
      title: "SPECIALIZED \"CUTTING\" EXPERTISE", 
      description: "Our team is \"Cutting, Leave it to us.\" We specialize in HSS and Carbide Drills, Endmills, and Taps from brands like ADDISON and MIRANDA, providing precision solutions for heavy fabrication and engineering.",
      image: "/home/core-categories/cc-2.png"
    },
    {
      title: "COMPREHENSIVE MRO SOLUTIONS",
      description: "We serve as a single-source supplier for diverse needs, including Pneumatic valves (FESTO, JANATICS), high-tensile fasteners (Unbrako), and safety equipment (3M, KARAM) across ten major industrial sectors.",
      image: "/home/core-categories/cc-3.png"
    }
  ]

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('enquirynow')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-[#2C5F7A] mb-16 tracking-wide"
        >
          WHY CHOOSE US ?
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div 
                className="h-48 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Image 
                  src={feature.image} 
                  alt={feature.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#0B3059] mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToContact}
            className="bg-[#0B3059] text-white px-10 py-3 rounded font-medium hover:bg-[#2C5F7A] transition-all duration-300 uppercase tracking-wide"
          >
            JOIN WITH US
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs