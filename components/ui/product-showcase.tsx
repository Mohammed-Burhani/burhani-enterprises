'use client'
import Image from "next/image"
import Link from "next/link"
import { motion } from 'framer-motion'

interface ProductShowcaseProps {
  title: string
  description: string
  buttonText: string
  image: string
  imagePosition: 'left' | 'right'
}

const ProductShowcase = ({ title, description, buttonText, imagePosition, image }: ProductShowcaseProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-wrap gap-8 items-center ${imagePosition === 'right' ? 'flex-row-reverse' : ''}`}
    >
      <motion.div 
        initial={{ opacity: 0, x: imagePosition === 'right' ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="lg:flex-1"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image width={500} height={500} src={image} alt={title} className="w-full h-64 bg-[#B8C8D1] rounded-lg flex items-center justify-center" />
        </motion.div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: imagePosition === 'right' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="lg:flex-1 w-full space-y-4"
      >
        <h3 className="text-lg font-bold text-[#0B3059] uppercase">{title}</h3>
        <p className="text-[#0B3059]/70 text-sm leading-relaxed">{description}</p>
        <Link href="/products">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#ABCCF0] text-[#0B3059] px-6 py-2 rounded text-sm font-medium hover:bg-[#6B97AC]"
          >
            {buttonText}
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default ProductShowcase