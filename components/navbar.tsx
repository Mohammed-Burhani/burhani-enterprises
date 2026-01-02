import Image from "next/image"

const Navbar = () => {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <div className='flex justify-between items-center gap-4 bg-[#92CFE9] w-full px-6 py-3'>
      <div className='flex items-center gap-3'>
        <Image src={"/logo.svg"} alt="Burhani Enterprises" width={500} height={500} className="w-64 h-14" />
      </div>
      <nav>
        <ul className='flex gap-8'>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className='text-gray-800 hover:text-gray-900 font-medium text-sm'
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex items-center gap-2'>
        <span className='text-gray-800 text-sm border border-white p-2 px-4 rounded-xl'>Enquire Now!</span>
        {/* <div className='text-gray-800'>
        
        </div> */}
      </div>
    </div>
  )
}

export default Navbar