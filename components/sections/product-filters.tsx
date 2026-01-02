"use client"

import { useState } from "react"

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  brands: string[]
  categories: string[]
  materials: string[]
}

const ProductFilters = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    brands: ['Stanley'],
    categories: ['Power Tools'],
    materials: []
  })

  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    category: true,
    material: true
  })

  const filterOptions = {
    brands: ['Stanley', 'Bosch', 'Addison', 'Dewalt', 'Blue Point'],
    categories: ['Power Tools', 'Hand Tools', 'Fasteners'],
    materials: ['Steel', 'Aluminum', 'Iron', 'Composite']
  }

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    const newFilters = { ...filters }
    const currentArray = newFilters[type]
    
    if (currentArray.includes(value)) {
      newFilters[type] = currentArray.filter(item => item !== value)
    } else {
      newFilters[type] = [...currentArray, value]
    }
    
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border w-64">
      {/* Brand Filter */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-3"
        >
          <span>- BRAND</span>
          <span className="text-sm">{expandedSections.brand ? '−' : '+'}</span>
        </button>
        {expandedSections.brand && (
          <div className="space-y-2">
            {filterOptions.brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleFilterChange('brands', brand)}
                  className="w-4 h-4 text-[#0B3059] border-gray-300 rounded focus:ring-[#0B3059]"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-3"
        >
          <span>- CATEGORY</span>
          <span className="text-sm">{expandedSections.category ? '−' : '+'}</span>
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {filterOptions.categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleFilterChange('categories', category)}
                  className="w-4 h-4 text-[#0B3059] border-gray-300 rounded focus:ring-[#0B3059]"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('material')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-3"
        >
          <span>- MATERIAL</span>
          <span className="text-sm">{expandedSections.material ? '−' : '+'}</span>
        </button>
        {expandedSections.material && (
          <div className="space-y-2">
            {filterOptions.materials.map((material) => (
              <label key={material} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material)}
                  onChange={() => handleFilterChange('materials', material)}
                  className="w-4 h-4 text-[#0B3059] border-gray-300 rounded focus:ring-[#0B3059]"
                />
                <span className="text-sm text-gray-700">{material}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductFilters