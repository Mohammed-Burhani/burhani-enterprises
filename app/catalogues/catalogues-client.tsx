'use client'

import Image from 'next/image'
import { urlFor, Brand } from '@/lib/sanity'
import { Download, FileText } from 'lucide-react'
import { useState } from 'react'
import PdfModal from '@/components/ui/pdf-modal'
import { ContactSection } from '@/components'

interface CataloguesClientProps {
  brands: Brand[]
}

export default function CataloguesClient({ brands }: CataloguesClientProps) {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCatalogueClick = (brand: Brand) => {
    if (brand.cataloguePdfs && brand.cataloguePdfs.length > 0) {
      setSelectedBrand(brand)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBrand(null)
  }

  return (
    <>
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
                  <div className="flex items-center justify-between bg-white p-6 border-b border-gray-300">
                    <div className="flex flex-wrap gap-2 items-center mx-auto xl:mx-0!">
                      <div className="relative h-12 w-32">
                        <Image
                          src={urlFor(brand.logo).url()}
                          alt={brand.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h2 className="text-3xl font-bold text-[#0B3059] mb-2">
                        - {brand.name}
                      </h2>
                    </div>

                    {/* Compact View Button Only */}
                    {/* {brand.cataloguePdfs && brand.cataloguePdfs.length > 0 && (
                      <button
                        onClick={() => handleCatalogueClick(brand)}
                        className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        View Catalogues ({brand.cataloguePdfs.length})
                      </button>
                    )} */}
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

                    {/* Big Download Button Below Categories */}
                    {brand.cataloguePdfs && brand.cataloguePdfs.length > 0 && (
                      <div className="border-t pt-6 mt-2 border-gray-400">
                        <button
                          onClick={() => handleCatalogueClick(brand)}
                          className="block w-full text-center bg-[#0B3059] text-white py-4 px-6 rounded-lg hover:bg-[#0B3059]/90 transition-colors font-bold text-base uppercase tracking-wide shadow-lg"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <Download className="w-6 h-6" />
                            View & Download Catalogues ({brand.cataloguePdfs.length})
                          </div>
                        </button>
                      </div>
                    )}
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
        
        <ContactSection />
      </main>

      {/* PDF Modal */}
      {selectedBrand && (
        <PdfModal
          isOpen={isModalOpen}
          onClose={closeModal}
          pdfs={selectedBrand.cataloguePdfs || []}
          brandName={selectedBrand.name}
        />
      )}

    </>
  )
}