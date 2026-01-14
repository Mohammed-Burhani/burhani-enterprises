'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Catalogues', href: '/catalogues' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ]

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-between items-center gap-4 bg-[#92CFE9] w-full px-6 py-3 sticky top-0 z-50'
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='flex items-center gap-3'
        >
          <Image src={"/logo.svg"} alt="Burhani Enterprises" width={500} height={500} className="w-36 sm:w-56 md:w-72 xl:w-96 h-9 sm:h-12 md:h-16" />
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='hidden md:block'
        >
          <ul className='flex gap-8'>
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                className="relative group"
              >
                <Link
                  href={link.href}
                  className='text-gray-800 hover:text-gray-900 font-medium text-sm relative inline-block'
                >
                  {link.name}
                  {/* Underline animation - bolt/screw style */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300 ease-out"></span>
                  {/* Bolt head effect */}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100"></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
        
        {/* Desktop Enquire Button */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='hidden md:flex items-center gap-2'
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#enquirynow" 
            onClick={(e) => handleSmoothScroll(e, 'enquirynow')}
            className='text-gray-800 text-sm border border-white p-2 px-4 rounded-xl hover:bg-white/10 transition-colors'
          >
            Enquire Now!
          </motion.a>
        </motion.div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleDrawer}
          className='md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1'
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isDrawerOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isDrawerOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </motion.div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-[#92CFE9] z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/20">
                <Image src={"/logo.svg"} alt="Burhani Enterprises" width={200} height={200} className="w-36 h-9" />
                <button 
                  onClick={toggleDrawer}
                  className="w-8 h-8 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <span className="block w-6 h-0.5 bg-gray-800 rotate-45 absolute"></span>
                  <span className="block w-6 h-0.5 bg-gray-800 -rotate-45 absolute"></span>
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.li 
                      key={link.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={toggleDrawer}
                        className="block text-gray-800 hover:text-gray-900 font-medium text-lg py-2 border-b border-transparent hover:border-gray-800 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              {/* Mobile Enquire Button */}
              <div className="p-6 border-t border-white/20">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#enquirynow"
                  onClick={(e) => {
                    handleSmoothScroll(e, 'enquirynow')
                    toggleDrawer()
                  }}
                  className="block w-full text-center text-gray-800 text-sm border border-white p-3 px-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Enquire Now!
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar