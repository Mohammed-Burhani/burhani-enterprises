'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
      <div className='flex justify-between items-center gap-4 bg-[#92CFE9] w-full px-6 py-3 sticky top-0 z-50'>
        <div className='flex items-center gap-3'>
          <Image src={"/logo.svg"} alt="Burhani Enterprises" width={500} height={500} className="w-32 sm:w-48 md:w-64 h-8 sm:h-10 md:h-14" />
        </div>
        
        {/* Desktop Navigation */}
        <nav className='hidden md:block'>
          <ul className='flex gap-8'>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className='text-gray-800 hover:text-gray-900 font-medium text-sm'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Desktop Enquire Button */}
        <div className='hidden md:flex items-center gap-2'>
          <a 
            href="#enquirynow" 
            onClick={(e) => handleSmoothScroll(e, 'enquirynow')}
            className='text-gray-800 text-sm border border-white p-2 px-4 rounded-xl hover:bg-white/10 transition-colors'
          >
            Enquire Now!
          </a>
        </div>

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
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#92CFE9] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/20">
            <Image src={"/logo.svg"} alt="Burhani Enterprises" width={200} height={200} className="w-32 h-8" />
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
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={toggleDrawer}
                    className="block text-gray-800 hover:text-gray-900 font-medium text-lg py-2 border-b border-transparent hover:border-gray-800 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Enquire Button */}
          <div className="p-6 border-t border-white/20">
            <a 
              href="#enquirynow"
              onClick={(e) => {
                handleSmoothScroll(e, 'enquirynow')
                toggleDrawer()
              }}
              className="block w-full text-center text-gray-800 text-sm border border-white p-3 px-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Enquire Now!
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar