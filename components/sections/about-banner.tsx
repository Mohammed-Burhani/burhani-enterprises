'use client'
import Link from "next/link"
import { motion } from 'framer-motion'

const AboutBanner = () => {
  return (
    <section className="bg-white px-6 py-8">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[url(/about/banner.png)] bg-cover bg-center min-h-[400px] rounded-lg flex items-center justify-end relative"
        >
          <div className="bg-linear-to-r from-black/40 lg:from-transparent lg:via-transparent to-black/50 absolute inset-0 w-full h-full rounded-lg" />
          
          <div className="z-10 text-center lg:text-end py-12 lg:py-0 px-12">
            <motion.h1 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl font-bold text-white mb-6"
            >
              INDUSTRIAL SOLUTIONS - CHENNAI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed"
            >
              Since 2004, Burhani Enterprises has been a trusted partner for 
              India&apos;s most demanding industries. From our base in George Town, 
              Chennai, we provide authorized access to the world&apos;s leading hand 
              tools, cutting tools, and MRO solutions. We don&apos;t just supply tools; 
              we add value to your entire production chain.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link href="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0B3059] text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0B3059] transition-all duration-300"
                >
                  EXPLORE OUR PRODUCTS
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutBanner