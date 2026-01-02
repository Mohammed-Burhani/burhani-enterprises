"use client"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
          disabled={page === '...' || page === currentPage}
          className={`
            px-4 py-2 rounded border text-sm font-medium transition-colors
            ${page === currentPage 
              ? 'bg-[#0B3059] text-white border-[#0B3059]' 
              : page === '...'
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-default'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }
          `}
        >
          {page === totalPages && typeof page === 'number' ? 'Last' : page}
        </button>
      ))}
    </div>
  )
}

export default Pagination