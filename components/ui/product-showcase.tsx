import Image from "next/image"
import Link from "next/link"

interface ProductShowcaseProps {
  title: string
  description: string
  buttonText: string
  image: string
  imagePosition: 'left' | 'right'
}

const ProductShowcase = ({ title, description, buttonText, imagePosition, image }: ProductShowcaseProps) => {
  return (
    <div className={`flex flex-wrap gap-8 items-center ${imagePosition === 'right' ? 'flex-row-reverse' : ''}`}>
      <div className="lg:flex-1">
        <Image width={500} height={500} src={image} alt={title} className="w-full h-64 bg-[#B8C8D1] rounded-lg flex items-center justify-center" />
      </div>
      <div className="lg:flex-1 w-full space-y-4">
        <h3 className="text-lg font-bold text-[#0B3059] uppercase">{title}</h3>
        <p className="text-[#0B3059]/70 text-sm leading-relaxed">{description}</p>
        <Link href="/products">
          <button className="bg-[#ABCCF0] text-[#0B3059] px-6 py-2 rounded text-sm font-medium hover:bg-[#6B97AC]">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ProductShowcase