'use client'

import { X, Download, Eye, FileText } from 'lucide-react'

interface PdfItem {
  title: string
  fileUrl: string
  description?: string
}

interface PdfModalProps {
  isOpen: boolean
  onClose: () => void
  pdfs: PdfItem[]
  brandName: string
}

export default function PdfModal({ isOpen, onClose, pdfs, brandName }: PdfModalProps) {
  if (!isOpen) return null

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `${brandName}-${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#0B3059]">
            {brandName} Catalogues
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* PDF List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {pdfs.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No catalogues available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pdfs.map((pdf, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {pdf.title}
                      </h3>
                      {pdf.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {pdf.description}
                        </p>
                      )}
                    </div>
                    <FileText className="w-8 h-8 text-[#0B3059] ml-4 shrink-0" />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(pdf.fileUrl)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(pdf.fileUrl, pdf.title)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#0B3059] text-white rounded-md hover:bg-[#0B3059]/90 transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}