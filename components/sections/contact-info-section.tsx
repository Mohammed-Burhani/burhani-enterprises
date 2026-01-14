'use client'
import { motion } from 'framer-motion'

const ContactInfoSection = () => {
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
          CONTACT US
        </motion.h2>
        
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Phone Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Phone
            </h3>
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg py-4 px-6 shadow-sm"
            >
              <p className="text-[#0B3059] font-medium text-base lg:text-lg">
                +91 98413 47052 / +91 98415 30723
              </p>
            </motion.div>
          </motion.div>

          {/* Email Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Email
            </h3>
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg py-4 px-6 shadow-sm"
            >
              <p className="text-[#0B3059] font-medium text-base lg:text-lg">
                burhanienterprises.hussain@yahoo.com
              </p>
            </motion.div>
          </motion.div>

          {/* Address Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Address
            </h3>
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg py-4 px-6 shadow-sm"
            >
              <p className="text-[#0B3059] font-medium text-base lg:text-lg">
                No 7/9, Perianna Maistry Street, Parrys, Chennai - 01
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfoSection