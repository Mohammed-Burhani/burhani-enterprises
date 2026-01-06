"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'

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
    brands: ['Stanley', 'Bosch', 'Addison', 'Dewalt', 'Blue Point', "Other"],
    categories: ['Power Tools', 'Hand Tools', 'Fasteners', "Safety Equipment", "Cutting Tools", "Other"],
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

  const clearAllFilters = () => {
    const clearedFilters = {
      brands: [],
      categories: [],
      materials: []
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const activeFiltersCount = filters.brands.length + filters.categories.length + filters.materials.length

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border w-full lg:w-64 sticky top-5">
      {/* Clear Filters Button */}
      {activeFiltersCount > 0 && (
        <div className="mb-4 pb-4 border-b">
          <button
            onClick={clearAllFilters}
            className="text-sm text-[#0B3059] hover:text-[#2C5F7A] font-medium"
          >
            Clear All Filters ({activeFiltersCount})
          </button>
        </div>
      )}

      {/* Brand Filter */}
      <div className="mb-4 sm:mb-6">
        <button 
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-3 py-1"
        >
          <span className="text-sm sm:text-base">BRAND</span>
          {expandedSections.brand ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.brand && (
          <div className="space-y-2 sm:space-y-3">
            {filterOptions.brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleFilterChange('brands', brand)}
                  className="w-4 h-4 text-[#0B3059] border-gray-300 rounded focus:ring-[#0B3059] focus:ring-2"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-4 sm:mb-6">
        <button 
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-3 py-1"
        >
          <span className="text-sm sm:text-base">CATEGORY</span>
          {expandedSections.category ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.category && (
          <div className="space-y-2 sm:space-y-3">
            {filterOptions.categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleFilterChange('categories', category)}
                  className="w-4 h-4 text-[#0B3059] border-gray-300 rounded focus:ring-[#0B3059] focus:ring-2"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Material Filter */}
      {/* <div className="mb-4 sm:mb-6">
        <button 
          onClick={() => toggleSection('material')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-3 py-1"
        >
          <span className="text-sm sm:text-base">MATERIAL</span>
          {expandedSections.material ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {expandedSections.material && (
          <div className="space-y-2 sm:space-y-3">
            {filterOptions.materials.map((material) => (
              <label key={material} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material)}
                  onChange={() => handleFilterChange('materials', material)}
                  className="w-4 h-4 text-[#0B3059] border-gray-300 rounded focus:ring-[#0B3059] focus:ring-2"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{material}</span>
              </label>
            ))}
          </div>
        )}
      </div> */}
    </div>
  )
}

export default ProductFilters