'use client'
import Image from "next/image"

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
    <div className="bg-[#ABCCF0] rounded-lg p-4 w-80">
      <Image width={500} height={500} src={image} alt={title} className="w-full h-32 bg-white rounded-lg mb-4 flex items-center justify-center object-contain" />
      
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-gray-800 text-base">{title}</h3>
        <p className="text-gray-600 text-xs">{description}</p>

        <button 
          onClick={handleScrollToContact}
          className="bg-white text-[#0B3059] px-5 py-1.5 rounded-md font-semibold hover:bg-[#0B3059] hover:text-white transition-all duration-300 text-xs flex-1 w-full uppercase"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default ProductCard