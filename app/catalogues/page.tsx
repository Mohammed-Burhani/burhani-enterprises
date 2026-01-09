import Image from 'next/image'
import { getBrands, urlFor, Brand } from '@/lib/sanity'
import { Download, FileText } from 'lucide-react'

const Brands = async () => {
  const brands: Brand[] = await getBrands()

  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-center text-4xl font-bold text-[#0B3059] mb-16 tracking-widest uppercase">
            Catalogues
          </h1>

          <div className="space-y-8">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Brand Header */}
                <div className="bg-white p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative h-12 w-32">
                      <Image
                        src={urlFor(brand.logo).url()}
                        alt={brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-right">
                      <h2 className="text-xl font-bold text-[#0B3059] mb-2">
                        {brand.name}
                      </h2>
                      {brand.description && (
                        <p className="text-sm text-gray-600 mb-3 max-w-md">
                          {brand.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Prominent Download Button */}
                  {brand.cataloguePdf && (
                    <div className="flex gap-3">
                      <a
                        href={brand.cataloguePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0B3059] text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors font-semibold text-sm uppercase tracking-wide shadow-md"
                      >
                        <FileText className="w-5 h-5" />
                        View Catalogue
                      </a>
                      <a
                        href={brand.cataloguePdf}
                        download
                        className="flex items-center justify-center gap-2 bg-white border-2 border-[#0B3059] text-[#0B3059] py-3 px-6 rounded-lg hover:bg-[#0B3059] hover:text-white transition-colors font-semibold text-sm uppercase tracking-wide"
                      >
                        <Download className="w-5 h-5" />
                        Download
                      </a>
                    </div>
                  )}
                </div>

                {/* Categories Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                    {brand.categories?.map((category, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-32 bg-gray-50">
                          <Image
                            src={urlFor(category.image).url()}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3 text-center">
                          <p className="text-sm font-medium text-gray-800">
                            {category.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Download Catalogue Button - Removed as it's now at the top */}
                </div>
              </div>
            ))}
          </div>

          {brands.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No brands available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Brands