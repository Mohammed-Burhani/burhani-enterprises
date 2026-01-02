const HeroSection = () => {
  return (
    <section className="bg-white px-6 py-8">
      <div className="container mx-auto">
        <div className="bg-[url(/home/banner.png)] bg-cover bg-center min-h-150 rounded-lg flex items-center justify-center relative">
          <div className="bg-black/50 absolute inset-0 w-full h-full" />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg">
              <span className="text-gray-600 text-lg">‹</span>
            </button>
          </div>

          <div className="px-12 z-10">
            <h1 className="text-6xl font-bold text-white mb-4">
              Precision Tools for Industrial Power
            </h1>
            <p className="text-2xl text-gray-200 mb-6 max-w-3xl">
              Partner with Burhani Enterprises for reliable MRO solutions. We supply the high-performance Hand Tools, Cutting Tools, and Fluid Power Components that keep the Oil & Gas, Petrochemical, and Heavy Engineering sectors running smoothly.
            </p>
            <button className="bg-white text-[#0B3059] px-8 py-3 rounded-lg font-medium hover:bg-[#0B3059] hover:text-white transition-all duration-300">
              Explore Products
            </button>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg">
              <span className="text-gray-600 text-lg">›</span>
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection