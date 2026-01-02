import Image from "next/image"

interface Product {
  id: number
  name: string
  description: string
  image: string
  brand: string
  category: string
  material: string
}

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-[#ABCCF0] rounded-lg overflow-hidden shadow-sm">
          <div className="bg-white h-48 flex items-center justify-center">
            <Image 
              src={product.image} 
              alt={product.name}
              width={200}
              height={150}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-[#0B3059] text-lg mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <button className="w-full bg-white text-[#0B3059] py-2 px-4 rounded font-semibold hover:bg-[#0B3059] hover:text-white transition-all duration-300 text-sm uppercase">
              DETAILS
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid