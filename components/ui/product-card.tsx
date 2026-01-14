'use client'
import Image from "next/image"
import { motion } from 'framer-motion'

interface ProductCardProps {
  title: string
  description: string
  buttonText: string
  image: string
}

const ProductCard = ({ title, description, buttonText, image }: ProductCardProps) => {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById('enquirynow')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-[#ABCCF0] rounded-lg p-4 w-80"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image width={500} height={500} src={image} alt={title} className="w-full h-32 bg-white rounded-lg mb-4 flex items-center justify-center object-contain" />
      </motion.div>
      
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-gray-800 text-base">{title}</h3>
        <p className="text-gray-600 text-xs">{description}</p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScrollToContact}
          className="bg-white text-[#0B3059] px-5 py-1.5 rounded-md font-semibold hover:bg-[#0B3059] hover:text-white transition-all duration-300 text-xs flex-1 w-full uppercase"
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard